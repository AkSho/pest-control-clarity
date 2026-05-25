import fs from "node:fs/promises";
import path from "node:path";

const SNAPSHOT_DATE = "2026-05-24";
const START_DATE = "2024-05-24";
const END_DATE = "2026-05-24";
const OUT_DIR = path.join(process.cwd(), "src/data/rodent-context");

function hash(value) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function jitterCoord(id, lat, lng) {
  const h1 = hash(`${id}:lat`);
  const h2 = hash(`${id}:lng`);
  const latOffset = ((h1 % 2001) - 1000) / 1000 / 1600;
  const lngOffset = ((h2 % 2001) - 1000) / 1000 / 1600;
  return {
    lat: Number((lat + latOffset).toFixed(6)),
    lng: Number((lng + lngOffset).toFixed(6)),
  };
}

function blockLabel(address, fallback) {
  const raw = String(address || fallback || "Area not specified").replace(/&amp;/g, "&").trim();
  const withoutUnit = raw.replace(/\s+(APT|UNIT|#)\s+.*$/i, "");
  const withoutNumber = withoutUnit.replace(/^\d+(?:-\d+)?[A-Z]?\s+/, "");
  return `${withoutNumber || fallback || "Area"} block`;
}

function cleanViolationText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .replace(/\s+\|\s+/g, " | ")
    .trim();
}

function chicagoViolation38(value) {
  const text = cleanViolationText(value);
  const match = text.match(/38\.\s*INSECTS,\s*RODENTS,\s*&\s*ANIMALS\s*NOT\s*PRESENT\s*-\s*Comments:\s*([^|]+)/i);
  return match ? `38. INSECTS, RODENTS, & ANIMALS NOT PRESENT - Comments: ${match[1].trim()}` : text;
}

function iso(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  if (date > new Date(`${END_DATE}T23:59:59Z`)) return null;
  return date.toISOString();
}

function validPoint(lat, lng) {
  return Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) > 1 && Math.abs(lng) > 1;
}

async function getJson(url) {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${url}`);
  return res.json();
}

async function fetchNycFoodPest() {
  const url = new URL("https://data.cityofnewyork.us/resource/43nn-pn8j.json");
  url.searchParams.set("$limit", "350");
  url.searchParams.set("$order", "inspection_date DESC");
  url.searchParams.set(
    "$select",
    "camis,dba,boro,building,street,zipcode,inspection_date,violation_code,violation_description,latitude,longitude,action",
  );
  url.searchParams.set(
    "$where",
    `inspection_date between '${START_DATE}T00:00:00' and '${END_DATE}T23:59:59' ` +
      "AND latitude IS NOT NULL AND longitude IS NOT NULL AND latitude!='0' AND longitude!='0' " +
      "AND (violation_code in('04K','04L','08A') OR " +
      "lower(violation_description) like '%evidence%mice%' OR " +
      "lower(violation_description) like '%evidence%rat%' OR " +
      "lower(violation_description) like '%conditions%conducive%rodent%')",
  );
  const rows = await getJson(url);
  return rows
    .map((r, i) => {
      const id = `nyc-food-pest-${r.camis || "est"}-${r.inspection_date || "date"}-${r.violation_code || i}`;
      const observedAt = iso(r.inspection_date);
      const lat = Number(r.latitude);
      const lng = Number(r.longitude);
      if (!observedAt || !validPoint(lat, lng)) return null;
      const point = jitterCoord(id, lat, lng);
      return {
        id,
        source: "NYC DOHMH Restaurant Inspection Results",
        sourceUrl: "https://data.cityofnewyork.us/Health/DOHMH-New-York-City-Restaurant-Inspection-Results/43nn-pn8j",
        sourceDatasetId: "43nn-pn8j",
        snapshotDate: SNAPSHOT_DATE,
        confidence: "high",
        contextType: "food-inspection-pest-evidence",
        establishmentName: r.dba || "Food establishment",
        category: r.violation_code || "Food inspection violation",
        description: r.violation_description || "Pest-related food inspection violation",
        lat: point.lat,
        lng: point.lng,
        observedAt,
        status: r.action || "Violation cited",
        addressLabel: blockLabel(`${r.building || ""} ${r.street || ""}`, r.boro),
        neighborhood: r.boro || "New York City",
      };
    })
    .filter(Boolean);
}

async function fetchChicagoFoodPest() {
  const url = new URL("https://data.cityofchicago.org/resource/4ijn-s7e5.json");
  url.searchParams.set("$limit", "350");
  url.searchParams.set("$order", "inspection_date DESC");
  url.searchParams.set(
    "$select",
    "inspection_id,dba_name,aka_name,facility_type,address,zip,inspection_date,inspection_type,results,violations,latitude,longitude",
  );
  url.searchParams.set(
    "$where",
    `inspection_date between '${START_DATE}T00:00:00' and '${END_DATE}T23:59:59' ` +
      "AND latitude IS NOT NULL AND longitude IS NOT NULL " +
      "AND lower(violations) like '%38.%insects%rodents%animals%not%present%'",
  );
  const rows = await getJson(url);
  return rows
    .map((r, i) => {
      const id = `chicago-food-pest-${r.inspection_id || i}`;
      const observedAt = iso(r.inspection_date);
      const lat = Number(r.latitude);
      const lng = Number(r.longitude);
      if (!observedAt || !validPoint(lat, lng)) return null;
      const point = jitterCoord(id, lat, lng);
      return {
        id,
        source: "Chicago Food Inspections",
        sourceUrl: "https://data.cityofchicago.org/Health-Human-Services/Food-Inspections/4ijn-s7e5",
        sourceDatasetId: "4ijn-s7e5",
        snapshotDate: SNAPSHOT_DATE,
        confidence: "medium",
        contextType: "food-inspection-pest-evidence",
        establishmentName: r.dba_name || r.aka_name || "Food establishment",
        category: "38. Insects, rodents, & animals not present",
        description: chicagoViolation38(r.violations),
        lat: point.lat,
        lng: point.lng,
        observedAt,
        status: r.results || r.inspection_type || "Inspection record",
        addressLabel: blockLabel(r.address, "Chicago"),
        neighborhood: r.zip ? `ZIP ${r.zip}` : "Chicago",
      };
    })
    .filter(Boolean);
}

async function fetchNycSanitationContext() {
  const url = new URL("https://data.cityofnewyork.us/resource/erm2-nwe9.json");
  url.searchParams.set("$limit", "350");
  url.searchParams.set("$order", "created_date DESC");
  url.searchParams.set(
    "$select",
    "unique_key,created_date,agency,complaint_type,descriptor,incident_zip,incident_address,borough,latitude,longitude,status",
  );
  url.searchParams.set(
    "$where",
    `created_date between '${START_DATE}T00:00:00' and '${END_DATE}T23:59:59' ` +
      "AND agency='DSNY' AND latitude IS NOT NULL AND longitude IS NOT NULL " +
      "AND (complaint_type='Dirty Condition' OR complaint_type='Illegal Dumping' OR complaint_type='Missed Collection')",
  );
  const rows = await getJson(url);
  return rows
    .map((r, i) => {
      const id = `nyc-sanitation-${r.unique_key || i}`;
      const observedAt = iso(r.created_date);
      const lat = Number(r.latitude);
      const lng = Number(r.longitude);
      if (!observedAt || !validPoint(lat, lng)) return null;
      const point = jitterCoord(id, lat, lng);
      return {
        id,
        source: "NYC 311 Service Requests - DSNY sanitation context",
        sourceUrl: "https://data.cityofnewyork.us/Social-Services/311-Service-Requests/erm2-nwe9",
        sourceDatasetId: "erm2-nwe9",
        snapshotDate: SNAPSHOT_DATE,
        confidence: "medium",
        contextType: "sanitation-condition",
        establishmentName: r.complaint_type || "Sanitation condition",
        category: r.complaint_type || "Sanitation context",
        description: r.descriptor || r.complaint_type || "Sanitation-related 311 service request",
        lat: point.lat,
        lng: point.lng,
        observedAt,
        status: r.status || "311 service request",
        addressLabel: blockLabel(r.incident_address, r.incident_zip || r.borough),
        neighborhood: r.borough || (r.incident_zip ? `ZIP ${r.incident_zip}` : "New York City"),
      };
    })
    .filter(Boolean);
}

const jobs = {
  "nyc-food-pest": fetchNycFoodPest,
  "chicago-food-pest": fetchChicagoFoodPest,
  "nyc-sanitation-context": fetchNycSanitationContext,
};

await fs.mkdir(OUT_DIR, { recursive: true });
for (const [name, job] of Object.entries(jobs)) {
  const rows = await job();
  await fs.writeFile(path.join(OUT_DIR, `${name}.json`), `${JSON.stringify(rows, null, 2)}\n`);
  console.log(`${name}: ${rows.length}`);
}
