import fs from "node:fs/promises";
import path from "node:path";

const SNAPSHOT_DATE = "2026-05-24";
const START_DATE = "2024-05-24";
const END_DATE = "2026-05-24";
const OUT_DIR = path.join(process.cwd(), "src/data/rodent-reports");

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
  const latOffset = ((h1 % 2001) - 1000) / 1000 / 1200;
  const lngOffset = ((h2 % 2001) - 1000) / 1000 / 1200;
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

async function fetchNyc() {
  const url = new URL("https://data.cityofnewyork.us/resource/p937-wjvj.json");
  url.searchParams.set("$limit", "350");
  url.searchParams.set("$order", "inspection_date DESC");
  url.searchParams.set(
    "$select",
    "job_ticket_or_work_order_id,inspection_date,result,borough,latitude,longitude,house_number,street_name,zip_code",
  );
  url.searchParams.set(
    "$where",
    `inspection_date between '${START_DATE}T00:00:00' and '${END_DATE}T23:59:59' AND result='Failed for Rat Activity' AND latitude IS NOT NULL AND longitude IS NOT NULL AND latitude!='0.00000000000000000000'`,
  );
  const rows = await getJson(url);
  return rows
    .map((r, i) => {
      const id = `nyc-${r.job_ticket_or_work_order_id || i}`;
      const recordedAt = iso(r.inspection_date);
      const lat = Number(r.latitude);
      const lng = Number(r.longitude);
      if (!recordedAt || !validPoint(lat, lng)) return null;
      const point = jitterCoord(id, lat, lng);
      return {
        id,
        source: "NYC Open Data Rodent Inspection",
        sourceUrl: "https://data.cityofnewyork.us/Health/Rodent-Inspection/p937-wjvj",
        sourceDatasetId: "p937-wjvj",
        snapshotDate: SNAPSHOT_DATE,
        confidence: "high",
        category: "Rodent inspection",
        lat: point.lat,
        lng: point.lng,
        reportedAt: recordedAt,
        status: r.result || "Failed for Rat Activity",
        addressLabel: blockLabel(`${r.house_number || ""} ${r.street_name || ""}`, r.borough),
        neighborhood: r.borough || "New York City",
      };
    })
    .filter(Boolean);
}

async function fetchChicago() {
  const url = new URL("https://data.cityofchicago.org/resource/v6vf-nfxy.json");
  url.searchParams.set("$limit", "350");
  url.searchParams.set("$order", "created_date DESC");
  url.searchParams.set(
    "$select",
    "sr_number,created_date,sr_type,status,street_address,zip_code,latitude,longitude",
  );
  url.searchParams.set(
    "$where",
    `sr_type='Rodent Baiting/Rat Complaint' AND created_date between '${START_DATE}T00:00:00' and '${END_DATE}T23:59:59' AND latitude IS NOT NULL AND longitude IS NOT NULL`,
  );
  const rows = await getJson(url);
  return rows
    .map((r, i) => {
      const id = `chicago-${r.sr_number || i}`;
      const recordedAt = iso(r.created_date);
      const lat = Number(r.latitude);
      const lng = Number(r.longitude);
      if (!recordedAt || !validPoint(lat, lng)) return null;
      const point = jitterCoord(id, lat, lng);
      return {
        id,
        source: "Chicago 311 Rodent Baiting/Rat Complaint",
        sourceUrl: "https://data.cityofchicago.org/Service-Requests/311-Service-Requests/v6vf-nfxy",
        sourceDatasetId: "v6vf-nfxy",
        snapshotDate: SNAPSHOT_DATE,
        confidence: "high",
        category: "Rodent complaint",
        lat: point.lat,
        lng: point.lng,
        reportedAt: recordedAt,
        status: r.status || "Filed",
        addressLabel: blockLabel(r.street_address, r.zip_code ? `ZIP ${r.zip_code}` : "Chicago"),
        neighborhood: r.zip_code ? `ZIP ${r.zip_code}` : "Chicago",
      };
    })
    .filter(Boolean);
}

async function fetchBoston() {
  const sql = `
    SELECT "case_enquiry_id","open_dt","type","case_status","location_street_name","latitude","longitude"
    FROM "1a0b420d-99f1-4887-9851-990b2a5a6e17"
    WHERE lower("type") LIKE '%rodent%'
      AND "open_dt" >= '${START_DATE}T00:00:00'
      AND "open_dt" <= '${END_DATE}T23:59:59'
      AND "latitude" IS NOT NULL
      AND "longitude" IS NOT NULL
    ORDER BY "open_dt" DESC
    LIMIT 200
  `;
  const url = new URL("https://data.boston.gov/api/3/action/datastore_search_sql");
  url.searchParams.set("sql", sql);
  const data = await getJson(url);
  return data.result.records
    .map((r, i) => {
      const id = `boston-${r.case_enquiry_id || i}`;
      const recordedAt = iso(r.open_dt);
      const lat = Number(r.latitude);
      const lng = Number(r.longitude);
      if (!recordedAt || !validPoint(lat, lng)) return null;
      const point = jitterCoord(id, lat, lng);
      return {
        id,
        source: "Boston 311 Service Requests",
        sourceUrl: "https://data.boston.gov/dataset/311-service-requests",
        sourceDatasetId: "1a0b420d-99f1-4887-9851-990b2a5a6e17",
        snapshotDate: SNAPSHOT_DATE,
        confidence: "high",
        category: r.type || "Rodent Activity",
        lat: point.lat,
        lng: point.lng,
        reportedAt: recordedAt,
        status: r.case_status || "Filed",
        addressLabel: blockLabel(r.location_street_name, "Boston"),
        neighborhood: "Boston",
      };
    })
    .filter(Boolean);
}

async function fetchDc() {
  const url = new URL("https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/ServiceRequests/MapServer/13/query");
  url.searchParams.set("where", `SERVICECODE='S0301' AND ADDDATE >= DATE '${START_DATE}' AND ADDDATE <= DATE '${END_DATE}'`);
  url.searchParams.set("outFields", "OBJECTID,ADDDATE,SERVICECODE,SERVICEORDERSTATUS,ZIPCODE");
  url.searchParams.set("returnGeometry", "true");
  url.searchParams.set("outSR", "4326");
  url.searchParams.set("f", "json");
  url.searchParams.set("resultRecordCount", "200");
  url.searchParams.set("orderByFields", "ADDDATE DESC");
  const data = await getJson(url);
  return data.features
    .map((f, i) => {
      const a = f.attributes || {};
      const id = `dc-${a.OBJECTID || i}`;
      const recordedAt = iso(a.ADDDATE);
      const lat = Number(f.geometry?.y);
      const lng = Number(f.geometry?.x);
      if (!recordedAt || !validPoint(lat, lng)) return null;
      const point = jitterCoord(id, lat, lng);
      return {
        id,
        source: "DC 311 Rodent Inspection and Treatment",
        sourceUrl: "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/ServiceRequests/MapServer/13",
        sourceDatasetId: "DCGIS_DATA/ServiceRequests/13",
        snapshotDate: SNAPSHOT_DATE,
        confidence: "high",
        category: "Rodent inspection/treatment request",
        lat: point.lat,
        lng: point.lng,
        reportedAt: recordedAt,
        status: a.SERVICEORDERSTATUS || "Filed",
        addressLabel: a.ZIPCODE ? `ZIP ${a.ZIPCODE}` : "Washington, DC",
        neighborhood: a.ZIPCODE ? `ZIP ${a.ZIPCODE}` : "Washington, DC",
      };
    })
    .filter(Boolean);
}

async function fetchSf() {
  const url = new URL("https://data.sfgov.org/resource/vw6y-z8j6.json");
  url.searchParams.set("$limit", "250");
  url.searchParams.set("$order", "requested_datetime DESC");
  url.searchParams.set(
    "$select",
    "service_request_id,requested_datetime,status_description,service_name,service_subtype,service_details,address,analysis_neighborhood,lat,long",
  );
  url.searchParams.set(
    "$where",
    `requested_datetime between '${START_DATE}T00:00:00' and '${END_DATE}T23:59:59' AND lat IS NOT NULL AND long IS NOT NULL AND (` +
      "lower(service_subtype) like '%infestation_rodent_insect%' OR " +
      "lower(service_details) like '%infestation_rodent_insect%' OR " +
      "lower(service_subtype) like '%infestation%rodent%insect%' OR " +
      "lower(service_details) like '%infestation%rodent%insect%'" +
      ")",
  );
  const rows = await getJson(url);
  return rows
    .map((r, i) => {
      const id = `sf-${r.service_request_id || i}`;
      const recordedAt = iso(r.requested_datetime);
      const lat = Number(r.lat);
      const lng = Number(r.long);
      if (!recordedAt || !validPoint(lat, lng)) return null;
      const point = jitterCoord(id, lat, lng);
      return {
        id,
        source: "DataSF 311 Residential Building Infestation",
        sourceUrl: "https://data.sfgov.org/City-Infrastructure/311-Cases/vw6y-z8j6",
        sourceDatasetId: "vw6y-z8j6",
        snapshotDate: SNAPSHOT_DATE,
        confidence: "medium",
        category: r.service_subtype || r.service_details || "Infestation rodent/insect",
        lat: point.lat,
        lng: point.lng,
        reportedAt: recordedAt,
        status: r.status_description || "Filed",
        addressLabel: blockLabel(r.address, "San Francisco"),
        neighborhood: r.analysis_neighborhood || "San Francisco",
      };
    })
    .filter(Boolean);
}

const jobs = {
  nyc: fetchNyc,
  chicago: fetchChicago,
  sf: fetchSf,
  boston: fetchBoston,
  dc: fetchDc,
  philly: async () => [],
};

await fs.mkdir(OUT_DIR, { recursive: true });
for (const [city, fn] of Object.entries(jobs)) {
  const records = await fn();
  await fs.writeFile(path.join(OUT_DIR, `${city}.json`), `${JSON.stringify(records, null, 2)}\n`);
  console.log(`${city}: ${records.length}`);
}
