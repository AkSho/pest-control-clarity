export type Species = "rat" | "mouse" | "not-sure";
export type Setting =
  | "kitchen"
  | "restaurant"
  | "trash"
  | "multifamily"
  | "garage"
  | "basement"
  | "crawlspace"
  | "attic"
  | "yard"
  | "not-sure";
export type Sign =
  | "droppings"
  | "scratching"
  | "gnaw"
  | "food"
  | "smell"
  | "burrows"
  | "sighting"
  | "dead";
export type Frequency = "once" | "few" | "weekly" | "daily" | "nightly";
export type Duration = "week" | "two-weeks" | "month" | "two-months" | "not-sure";
export type Access = "low" | "medium" | "high" | "not-sure";
export type ActivityBand = "low" | "moderate" | "high" | "severe";
export type Confidence = "low" | "medium" | "high";

export type CalculatorInput = {
  species: Species;
  setting: Setting;
  signs: Sign[];
  frequency: Frequency;
  duration: Duration;
  food: Access;
  shelter: Access;
  localPressure?: ActivityBand;
  seasonality?: "lower" | "shoulder" | "peak" | "general";
};

export type CalculatorResult = {
  score: number;
  band: ActivityBand;
  confidence: Confidence;
  hiddenRange: string;
  headline: string;
  summary: string;
  drivers: string[];
  growth: Record<"30" | "60" | "90", string>;
};

const settingScores: Record<Setting, number> = {
  kitchen: 12,
  restaurant: 18,
  trash: 18,
  multifamily: 14,
  garage: 10,
  basement: 10,
  crawlspace: 12,
  attic: 9,
  yard: 10,
  "not-sure": 6,
};

const signScores: Record<Sign, number> = {
  droppings: 12,
  scratching: 9,
  gnaw: 10,
  food: 11,
  smell: 10,
  burrows: 13,
  sighting: 12,
  dead: 8,
};

const frequencyScores: Record<Frequency, number> = {
  once: 3,
  few: 8,
  weekly: 13,
  daily: 19,
  nightly: 24,
};

const durationScores: Record<Duration, number> = {
  week: 4,
  "two-weeks": 9,
  month: 16,
  "two-months": 23,
  "not-sure": 8,
};

const accessScores: Record<Access, number> = {
  low: 2,
  medium: 8,
  high: 15,
  "not-sure": 7,
};

const seasonalityScores = {
  lower: 0,
  shoulder: 4,
  peak: 8,
  general: 3,
};

const localPressureScores: Record<ActivityBand, number> = {
  low: 0,
  moderate: 4,
  high: 8,
  severe: 12,
};

const signLabels: Record<Sign, string> = {
  droppings: "Droppings",
  scratching: "Scratching sounds",
  gnaw: "Gnaw marks",
  food: "Food damage",
  smell: "Urine or musty smell",
  burrows: "Burrows or holes",
  sighting: "Live sighting",
  dead: "Dead rodent",
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getBand(score: number): ActivityBand {
  if (score >= 75) return "severe";
  if (score >= 50) return "high";
  if (score >= 25) return "moderate";
  return "low";
}

function getMultiSignModifier(count: number) {
  if (count >= 4) return 13;
  if (count === 3) return 9;
  if (count === 2) return 5;
  return 0;
}

function getSpeciesMultiplier(species: Species) {
  return species === "rat" ? 1.1 : 1;
}

function getSpeciesSettingModifier(input: CalculatorInput) {
  if (input.species === "rat" && ["yard", "trash"].includes(input.setting)) return 4;
  if (input.species === "mouse" && ["kitchen", "garage", "multifamily"].includes(input.setting)) return 4;
  return 0;
}

function getConfidence(input: CalculatorInput): Confidence {
  const mediumOrHighAccess = input.food !== "low" || input.shelter !== "low";
  if (
    input.signs.length >= 3 &&
    ["daily", "nightly"].includes(input.frequency) &&
    ["month", "two-months"].includes(input.duration) &&
    mediumOrHighAccess
  ) {
    return "high";
  }

  if (
    input.signs.length >= 2 &&
    ["weekly", "daily", "nightly"].includes(input.frequency) &&
    ["two-weeks", "month", "two-months"].includes(input.duration)
  ) {
    return "medium";
  }

  return "low";
}

function getHiddenRange(species: Species, band: ActivityBand) {
  const ranges: Record<Species, Record<ActivityBand, string>> = {
    mouse: {
      low: "1-3",
      moderate: "4-12",
      high: "13-30+",
      severe: "30+",
    },
    rat: {
      low: "1-2",
      moderate: "3-8",
      high: "9-20+",
      severe: "20+",
    },
    "not-sure": {
      low: "1-3",
      moderate: "3-10",
      high: "10-25+",
      severe: "25+",
    },
  };

  return ranges[species][band];
}

function speciesName(species: Species) {
  if (species === "rat") return "rat";
  if (species === "mouse") return "mouse";
  return "rodent";
}

function getCopy(species: Species, band: ActivityBand) {
  const name = speciesName(species);
  const copy: Record<ActivityBand, { headline: string; summary: string }> = {
    low: {
      headline: "This looks like low activity.",
      summary: `Your answers point to low ${name} activity. This may be a one-off sign or early activity. Clean safely, remove easy food, and close entry points now.`,
    },
    moderate: {
      headline: "This may be more than a one-off.",
      summary: `Your answers point to moderate ${name} activity. This may be more than a one-off, especially if signs have lasted more than a week.`,
    },
    high: {
      headline: "These signs point to high activity.",
      summary: `Your answers point to high ${name} activity. Multiple signs, frequent activity, or easy food and shelter can mean the problem is established.`,
    },
    severe: {
      headline: "This looks like heavy pressure.",
      summary: `Your answers point to severe ${name} pressure. Frequent signs over time, especially near food, trash, burrows, or shared walls, can point to a larger pattern.`,
    },
  };

  return copy[band];
}

function getGrowthCopy(band: ActivityBand): CalculatorResult["growth"] {
  const growth: Record<ActivityBand, CalculatorResult["growth"]> = {
    low: {
      "30": "Stable if food and entry points are fixed.",
      "60": "May stay low with monitoring.",
      "90": "Could rise if signs continue.",
    },
    moderate: {
      "30": "Activity may become more regular.",
      "60": "Nest or travel routes may become established.",
      "90": "Repeat sightings become more likely.",
    },
    high: {
      "30": "Activity may spread to nearby food or shelter.",
      "60": "Replacement pressure can keep the problem active.",
      "90": "A recurring pattern is likely without deeper control.",
    },
    severe: {
      "30": "Pressure is already heavy.",
      "60": "New activity may keep replacing removed rodents.",
      "90": "Multiple control layers are usually needed.",
    },
  };

  return growth[band];
}

function getDrivers(input: CalculatorInput) {
  const drivers: string[] = [];

  if (["daily", "nightly"].includes(input.frequency)) drivers.push("Frequent signs");
  if (input.signs.length >= 2) drivers.push("Multiple sign types");
  if (input.duration === "month" || input.duration === "two-months") drivers.push("Activity lasting more than a few weeks");
  if (input.food === "high") drivers.push("High food access");
  if (input.shelter === "high") drivers.push("High shelter access");
  if (input.setting === "trash" || input.setting === "restaurant") drivers.push("Food or trash pressure nearby");
  if (input.signs.includes("burrows")) drivers.push("Burrows or exterior shelter");
  if (input.seasonality === "peak") drivers.push("Peak seasonal pressure");
  if (input.localPressure === "high" || input.localPressure === "severe") drivers.push("Elevated local pressure");

  if (drivers.length === 0 && input.signs.length > 0) {
    drivers.push(...input.signs.slice(0, 2).map((sign) => signLabels[sign]));
  }

  return drivers.slice(0, 6);
}

export function calculateRodentPressure(input: CalculatorInput): CalculatorResult {
  const rawScore =
    settingScores[input.setting] +
    input.signs.reduce((sum, sign) => sum + signScores[sign], 0) +
    getMultiSignModifier(input.signs.length) +
    frequencyScores[input.frequency] +
    durationScores[input.duration] +
    accessScores[input.food] +
    accessScores[input.shelter] +
    seasonalityScores[input.seasonality ?? "general"] +
    (input.localPressure ? localPressureScores[input.localPressure] : 0) +
    getSpeciesSettingModifier(input);

  const score = clamp(Math.round(rawScore * getSpeciesMultiplier(input.species)), 0, 100);
  const band = getBand(score);
  const copy = getCopy(input.species, band);

  return {
    score,
    band,
    confidence: getConfidence(input),
    hiddenRange: getHiddenRange(input.species, band),
    headline: copy.headline,
    summary: copy.summary,
    drivers: getDrivers(input),
    growth: getGrowthCopy(band),
  };
}

export const activityBandLabels: Record<ActivityBand, string> = {
  low: "Low",
  moderate: "Moderate",
  high: "High",
  severe: "Severe",
};
