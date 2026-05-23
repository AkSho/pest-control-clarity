import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  ClipboardList,
  Gauge,
  Home,
  Info,
  LineChart,
  MousePointer2,
  RefreshCw,
  Share2,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  type Access,
  type ActivityBand,
  type Duration,
  type Frequency,
  type Setting,
  type Sign,
  type Species,
  activityBandLabels,
  calculateRodentPressure,
} from "@/lib/rodentRadar";

const TITLE = "Rodent Population Calculator: Mouse & Rat Infestation Estimator | Rodent Radar";
const DESCRIPTION =
  "Use this mouse and rat infestation calculator to estimate rodent activity pressure from droppings, scratching, gnaw marks, sightings, food access, shelter, and timing.";
const CANONICAL_URL = "https://cloakd-removals.cloud/rodent-radar/rodent-population-calculator";

export const Route = createFileRoute("/rodent-radar_/rodent-population-calculator")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: CANONICAL_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "@id": `${CANONICAL_URL}#calculator`,
              name: "Rodent Population Calculator",
              alternateName: [
                "Mouse Infestation Calculator",
                "Rat Infestation Calculator",
                "Rodent Colony Estimator",
              ],
              url: CANONICAL_URL,
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any",
              description: DESCRIPTION,
              provider: {
                "@type": "Organization",
                name: "Cloakd Removals",
                url: "https://cloakd-removals.cloud",
              },
            },
            {
              "@type": "FAQPage",
              "@id": `${CANONICAL_URL}#faq`,
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: RodentPopulationCalculator,
});

type StepId = "species" | "setting" | "signs" | "frequency" | "duration" | "access" | "location";

const STEPS: { id: StepId; label: string }[] = [
  { id: "species", label: "Species" },
  { id: "setting", label: "Setting" },
  { id: "signs", label: "Signs" },
  { id: "frequency", label: "Frequency" },
  { id: "duration", label: "Duration" },
  { id: "access", label: "Food and shelter" },
  { id: "location", label: "Location" },
];

const speciesOptions: { value: Species; label: string; helper: string }[] = [
  { value: "rat", label: "Rat", helper: "Larger droppings, burrows, exterior runs, trash areas." },
  { value: "mouse", label: "Mouse", helper: "Smaller droppings, kitchens, walls, garages, storage." },
  { value: "not-sure", label: "Not sure", helper: "Use the signs first. You can narrow it down later." },
];

const settingOptions: { value: Setting; label: string }[] = [
  { value: "kitchen", label: "Kitchen" },
  { value: "garage", label: "Garage" },
  { value: "attic", label: "Attic" },
  { value: "basement", label: "Basement" },
  { value: "crawlspace", label: "Crawlspace" },
  { value: "yard", label: "Yard" },
  { value: "trash", label: "Dumpster or trash area" },
  { value: "restaurant", label: "Restaurant or food business" },
  { value: "multifamily", label: "Apartment or multifamily" },
  { value: "not-sure", label: "Not sure" },
];

const signOptions: { value: Sign; label: string }[] = [
  { value: "droppings", label: "Droppings" },
  { value: "scratching", label: "Scratching sounds" },
  { value: "gnaw", label: "Gnaw marks" },
  { value: "food", label: "Food damage" },
  { value: "smell", label: "Urine or musty smell" },
  { value: "burrows", label: "Burrows or holes" },
  { value: "sighting", label: "Live sighting" },
  { value: "dead", label: "Dead rodent" },
];

const frequencyOptions: { value: Frequency; label: string }[] = [
  { value: "once", label: "Once" },
  { value: "few", label: "A few times" },
  { value: "weekly", label: "Weekly" },
  { value: "daily", label: "Daily" },
  { value: "nightly", label: "Most nights" },
];

const durationOptions: { value: Duration; label: string }[] = [
  { value: "week", label: "Less than a week" },
  { value: "two-weeks", label: "1-2 weeks" },
  { value: "month", label: "About a month" },
  { value: "two-months", label: "2+ months" },
  { value: "not-sure", label: "Not sure" },
];

const accessOptions: { value: Access; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "not-sure", label: "Not sure" },
];

const actionItems = [
  "Remove easy food sources.",
  "Seal gaps larger than 1/4 inch for mice or 1/2 inch for rats.",
  "Clean droppings safely before disturbing dust.",
  "Set traps where activity is visible.",
  "Check burrows, wall gaps, and travel paths.",
  "If activity keeps returning, address reproduction and replacement.",
];

const faq = [
  {
    q: "Does seeing one mouse mean there are more?",
    a: "Not always, but repeated signs usually matter more than one sighting. Fresh droppings, food damage, sounds, and signs lasting more than a week can point to ongoing activity.",
  },
  {
    q: "How fast do mice reproduce?",
    a: "Mice can reproduce quickly when food and shelter are available. That is why the calculator focuses on pressure, duration, and repeat signs instead of one exact count.",
  },
  {
    q: "How do I know if I have rats or mice?",
    a: "Mice usually leave smaller droppings and often show up in kitchens, walls, garages, and storage areas. Rats tend to leave larger droppings, burrows, rub marks, and activity near trash, yards, crawlspaces, or exterior paths.",
  },
  {
    q: "Can this calculator tell me exactly how many rodents I have?",
    a: "No. A public calculator should not promise an exact count. It estimates activity pressure from visible signs, timing, food access, shelter, and species clues.",
  },
  {
    q: "What is rat birth control?",
    a: "Rat birth control is the common search phrase for rodent fertility control. It is meant to reduce the replacement cycle when used with sanitation, exclusion, trapping, and consistent station placement.",
  },
  {
    q: "Does fertility control replace traps?",
    a: "No. Traps handle visible activity. Fertility control is a longer-term layer for repeat pressure and replacement.",
  },
];

function trackRodentRadarEvent(name: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const event = {
    event: name,
    module: "rodent_population_calculator",
    ...payload,
  };
  window.dispatchEvent(new CustomEvent("rodent-radar", { detail: event }));
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer?.push(event);
}

function getShareUrl(result: ReturnType<typeof calculateRodentPressure>, species: Species) {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("species", species);
  url.searchParams.set("band", result.band);
  url.searchParams.set("score", String(result.score));
  return url.toString();
}

function RodentPopulationCalculator() {
  const [stepIndex, setStepIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [species, setSpecies] = useState<Species>("not-sure");
  const [setting, setSetting] = useState<Setting>("not-sure");
  const [signs, setSigns] = useState<Sign[]>([]);
  const [frequency, setFrequency] = useState<Frequency>("once");
  const [duration, setDuration] = useState<Duration>("week");
  const [food, setFood] = useState<Access>("not-sure");
  const [shelter, setShelter] = useState<Access>("not-sure");
  const [location, setLocation] = useState("");
  const [hasStations, setHasStations] = useState<"yes" | "no" | "not-sure">("no");

  const result = useMemo(
    () =>
      calculateRodentPressure({
        species,
        setting,
        signs,
        frequency,
        duration,
        food,
        shelter,
        seasonality: location ? "shoulder" : "general",
      }),
    [species, setting, signs, frequency, duration, food, shelter, location],
  );

  const currentStep = STEPS[stepIndex];
  const progress = ((stepIndex + 1) / STEPS.length) * 100;
  const hasEnoughSignal = signs.length > 0 && stepIndex >= 2;

  useEffect(() => {
    trackRodentRadarEvent("calculator_viewed");
  }, []);

  function nextStep() {
    trackRodentRadarEvent("calculator_step_completed", {
      step: currentStep.id,
      stepIndex: stepIndex + 1,
      species,
      signsCount: signs.length,
    });

    if (stepIndex === STEPS.length - 1) {
      setShowResults(true);
      trackRodentRadarEvent("calculator_completed", {
        species,
        score: result.score,
        band: result.band,
        confidence: result.confidence,
      });
      return;
    }
    setStepIndex((index) => Math.min(index + 1, STEPS.length - 1));
  }

  function previousStep() {
    if (showResults) {
      setShowResults(false);
      return;
    }
    setStepIndex((index) => Math.max(index - 1, 0));
  }

  function toggleSign(sign: Sign) {
    setSigns((current) =>
      current.includes(sign)
        ? current.filter((item) => item !== sign)
        : [...current, sign],
    );
  }

  return (
    <div className="bg-background">
      <section className="bg-surface py-8 md:py-12">
        <div className="container-site">
          <Link
            to="/rodent-radar"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Rodent Radar
          </Link>
          <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand">
                <BarChart3 className="h-3.5 w-3.5" />
                Colony Calculator
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Rodent Population Calculator
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                A simple mouse and rat infestation calculator for estimating activity pressure from the signs you can see.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
              <div className="flex gap-3">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <p>
                  This is an estimate, not a count. Rodents hide well, and signs can
                  overlap with other pests. It does not replace an inspection, medical
                  advice, or a guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container-site grid gap-6 lg:grid-cols-[0.95fr_0.7fr]">
          <div className="rounded-3xl border border-border bg-card p-4 shadow-sm md:p-6">
            {!showResults ? (
              <>
                <div className="mb-6">
                  <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    <span>
                      Step {stepIndex + 1} of {STEPS.length}
                    </span>
                    <span>{currentStep.label}</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface">
                    <div
                      className="h-full rounded-full bg-brand transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <QuestionStep
                  step={currentStep.id}
                  species={species}
                  setSpecies={setSpecies}
                  setting={setting}
                  setSetting={setSetting}
                  signs={signs}
                  toggleSign={toggleSign}
                  frequency={frequency}
                  setFrequency={setFrequency}
                  duration={duration}
                  setDuration={setDuration}
                  food={food}
                  setFood={setFood}
                  shelter={shelter}
                  setShelter={setShelter}
                  location={location}
                  setLocation={setLocation}
                />

                <div className="mt-8 flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 flex-1 rounded-full"
                    onClick={previousStep}
                    disabled={stepIndex === 0}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="h-12 flex-1 rounded-full"
                    onClick={nextStep}
                    disabled={currentStep.id === "signs" && signs.length === 0}
                  >
                    {stepIndex === STEPS.length - 1 ? "Show my estimate" : "Next"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <Results
                result={result}
                species={species}
                inputSummary={{ signsCount: signs.length, setting, frequency, duration }}
                hasStations={hasStations}
                setHasStations={setHasStations}
                onBack={previousStep}
              />
            )}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <LivePreview result={result} species={species} isReady={hasEnoughSignal} />
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                What raises pressure?
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {[
                  "Repeated signs over time",
                  "Food access like trash, pet food, bird seed, or pantry goods",
                  "Shelter like clutter, wall gaps, crawlspaces, or dense plants",
                  "Burrows, gnaw marks, or nightly sounds",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <SeoContent />
    </div>
  );
}

function QuestionStep(props: {
  step: StepId;
  species: Species;
  setSpecies: (value: Species) => void;
  setting: Setting;
  setSetting: (value: Setting) => void;
  signs: Sign[];
  toggleSign: (value: Sign) => void;
  frequency: Frequency;
  setFrequency: (value: Frequency) => void;
  duration: Duration;
  setDuration: (value: Duration) => void;
  food: Access;
  setFood: (value: Access) => void;
  shelter: Access;
  setShelter: (value: Access) => void;
  location: string;
  setLocation: (value: string) => void;
}) {
  switch (props.step) {
    case "species":
      return (
        <div>
          <QuestionHeader
            icon={MousePointer2}
            title="What did you see?"
            helper="Rats and mice leave different clues. If you are not sure, choose that and keep going."
          />
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {speciesOptions.map((option) => (
              <OptionCard
                key={option.value}
                selected={props.species === option.value}
                label={option.label}
                helper={option.helper}
                onClick={() => props.setSpecies(option.value)}
                trackName="species_selected"
                trackPayload={{ species: option.value }}
              />
            ))}
          </div>
        </div>
      );
    case "setting":
      return (
        <div>
          <QuestionHeader
            icon={Home}
            title="Where are the signs showing up?"
            helper="Setting matters because food, shelter, and travel paths change by property type."
          />
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {settingOptions.map((option) => (
              <ChipOption
                key={option.value}
                selected={props.setting === option.value}
                label={option.label}
                onClick={() => {
                  trackRodentRadarEvent("setting_selected", { setting: option.value });
                  props.setSetting(option.value);
                }}
              />
            ))}
          </div>
        </div>
      );
    case "signs":
      return (
        <div>
          <QuestionHeader
            icon={ClipboardList}
            title="Which signs have you noticed?"
            helper="More than one sign usually means the activity has been going on longer than a single visit."
          />
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {signOptions.map((option) => (
              <ChipOption
                key={option.value}
                selected={props.signs.includes(option.value)}
                label={option.label}
                onClick={() => {
                  trackRodentRadarEvent("sign_toggled", { sign: option.value });
                  props.toggleSign(option.value);
                }}
              />
            ))}
          </div>
        </div>
      );
    case "frequency":
      return (
        <div>
          <QuestionHeader
            icon={RefreshCw}
            title="How often are you noticing signs?"
            helper="Fresh signs that repeat are more important than one old clue."
          />
          <div className="mt-5 grid gap-2">
            {frequencyOptions.map((option) => (
              <ChipOption
                key={option.value}
                selected={props.frequency === option.value}
                label={option.label}
                onClick={() => {
                  trackRodentRadarEvent("frequency_selected", { frequency: option.value });
                  props.setFrequency(option.value);
                }}
              />
            ))}
          </div>
        </div>
      );
    case "duration":
      return (
        <div>
          <QuestionHeader
            icon={LineChart}
            title="How long has this been happening?"
            helper="Timing helps separate a one-off visitor from an active pattern."
          />
          <div className="mt-5 grid gap-2">
            {durationOptions.map((option) => (
              <ChipOption
                key={option.value}
                selected={props.duration === option.value}
                label={option.label}
                onClick={() => {
                  trackRodentRadarEvent("duration_selected", { duration: option.value });
                  props.setDuration(option.value);
                }}
              />
            ))}
          </div>
        </div>
      );
    case "access":
      return (
        <div>
          <QuestionHeader
            icon={Gauge}
            title="How easy is food or shelter nearby?"
            helper="Trash, pet food, bird seed, clutter, gaps, crawlspaces, and dense plants can all raise pressure."
          />
          <AccessPicker
            title="Food access"
            value={props.food}
            onChange={props.setFood}
          />
          <AccessPicker
            title="Shelter access"
            value={props.shelter}
            onChange={props.setShelter}
          />
        </div>
      );
    case "location":
      return (
        <div>
          <QuestionHeader
            icon={Sparkles}
            title="Want to include local seasonality?"
            helper="You can skip this. Location helps adjust for seasonality and city pressure where data is available."
          />
          <label className="mt-5 block">
            <span className="text-sm font-bold text-foreground">ZIP code or city</span>
            <input
              value={props.location}
              onChange={(event) => props.setLocation(event.target.value)}
              className="mt-2 h-12 w-full rounded-xl border border-input bg-background px-4 text-sm font-semibold outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
              placeholder="New York, Jersey City, Oakland..."
            />
          </label>
        </div>
      );
  }
}

function QuestionHeader({
  icon: Icon,
  title,
  helper,
}: {
  icon: typeof BarChart3;
  title: string;
  helper: string;
}) {
  return (
    <div>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
        {helper}
      </p>
    </div>
  );
}

function OptionCard({
  selected,
  label,
  helper,
  onClick,
  trackName,
  trackPayload,
}: {
  selected: boolean;
  label: string;
  helper: string;
  onClick: () => void;
  trackName?: string;
  trackPayload?: Record<string, unknown>;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (trackName) trackRodentRadarEvent(trackName, trackPayload ?? {});
        onClick();
      }}
      className={`min-h-[150px] rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-brand bg-brand text-brand-foreground shadow-[var(--shadow-card-hard)]"
          : "border-border bg-background text-foreground hover:border-brand/40"
      }`}
    >
      <div className="text-lg font-bold">{label}</div>
      <p className={`mt-2 text-sm leading-relaxed ${selected ? "text-brand-foreground/80" : "text-muted-foreground"}`}>
        {helper}
      </p>
    </button>
  );
}

function ChipOption({
  selected,
  label,
  onClick,
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-12 items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
        selected
          ? "border-brand bg-brand text-brand-foreground"
          : "border-border bg-background text-foreground hover:border-brand/40"
      }`}
    >
      <span>{label}</span>
      {selected ? <Check className="h-4 w-4" /> : null}
    </button>
  );
}

function AccessPicker({
  title,
  value,
  onChange,
}: {
  title: string;
  value: Access;
  onChange: (value: Access) => void;
}) {
  return (
    <div className="mt-5">
      <div className="text-sm font-bold text-foreground">{title}</div>
      <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
        {accessOptions.map((option) => (
          <ChipOption
            key={option.value}
            selected={value === option.value}
            label={option.label}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
}

function LivePreview({
  result,
  species,
  isReady,
}: {
  result: ReturnType<typeof calculateRodentPressure>;
  species: Species;
  isReady: boolean;
}) {
  if (!isReady) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Live estimate
        </div>
        <div className="mt-3 text-2xl font-bold tracking-tight text-foreground">
          Answer a few questions first.
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The score appears after you choose signs and timing. We do not pre-score a property from one click.
        </p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface">
          <div className="h-full w-1/5 rounded-full bg-brand/30" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Live estimate
          </div>
          <div className="mt-1 text-3xl font-bold text-foreground">{result.score}</div>
        </div>
        <div className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${bandClass(result.band)}`}>
          {activityBandLabels[result.band]}
        </div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface">
        <div className="h-full rounded-full bg-brand" style={{ width: `${result.score}%` }} />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Possible hidden activity range for {species === "not-sure" ? "rodents" : `${species}s`}:{" "}
        <span className="font-bold text-foreground">{result.hiddenRange}</span>
      </p>
    </div>
  );
}

function Results({
  result,
  species,
  inputSummary,
  hasStations,
  setHasStations,
  onBack,
}: {
  result: ReturnType<typeof calculateRodentPressure>;
  species: Species;
  inputSummary: {
    signsCount: number;
    setting: Setting;
    frequency: Frequency;
    duration: Duration;
  };
  hasStations: "yes" | "no" | "not-sure";
  setHasStations: (value: "yes" | "no" | "not-sure") => void;
  onBack: () => void;
}) {
  const [shareStatus, setShareStatus] = useState("");
  const [showManualShare, setShowManualShare] = useState(false);
  const shareTitle = `Rodent Radar estimate: ${activityBandLabels[result.band]} activity`;
  const shareText = `${shareTitle}. Score band: ${result.score}/100. This is an estimate, not a count.`;
  const shareUrl = getShareUrl(result, species);

  async function copyShareLink() {
    let didCopy = false;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        didCopy = true;
      }
    } catch {}

    if (!didCopy) {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();

      try {
        didCopy = document.execCommand("copy");
      } catch {}

      document.body.removeChild(textArea);
    }

    if (!didCopy) {
      setShowManualShare(true);
      setShareStatus("Copy was blocked. You can copy the link below.");
      return;
    }

    setShowManualShare(false);
    setShareStatus("Link copied.");
    trackRodentRadarEvent("share_clicked", {
      action: "copy_link",
      species,
      score: result.score,
      band: result.band,
    });
  }

  async function nativeShare() {
    if (!navigator.share) {
      await copyShareLink();
      return;
    }

    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      });
      setShareStatus("Shared.");
      trackRodentRadarEvent("share_clicked", {
        action: "native_share",
        species,
        score: result.score,
        band: result.band,
      });
    } catch {
      setShareStatus("");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Edit answers
      </button>

      <div className="rounded-3xl border border-brand/20 bg-brand/5 p-5 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${bandClass(result.band)}`}>
              {activityBandLabels[result.band]} activity
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
              {result.headline}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              {result.summary}
            </p>
          </div>
          <div className="shrink-0 rounded-2xl border border-border bg-card p-4 text-center sm:min-w-[132px]">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Activity score
            </div>
            <div className="mt-1 text-4xl font-bold text-brand">{result.score}</div>
            <div className="text-xs font-bold text-muted-foreground">/ 100</div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 rounded-2xl border border-border bg-surface p-4 text-sm text-muted-foreground md:grid-cols-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Signs
          </div>
          <div className="mt-1 font-bold text-foreground">{inputSummary.signsCount}</div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Setting
          </div>
          <div className="mt-1 font-bold capitalize text-foreground">
            {inputSummary.setting.replace("-", " ")}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Frequency
          </div>
          <div className="mt-1 font-bold capitalize text-foreground">
            {inputSummary.frequency}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Duration
          </div>
          <div className="mt-1 font-bold capitalize text-foreground">
            {inputSummary.duration.replace("-", " ")}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <ResultCard title="Possible hidden activity" icon={Gauge}>
          <div className="text-3xl font-bold text-foreground">{result.hiddenRange}</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            This is a range, not a count. Rodents nest out of sight, and signs can overlap.
          </p>
        </ResultCard>
        <ResultCard title="Confidence" icon={ShieldAlert}>
          <div className="text-3xl font-bold capitalize text-foreground">{result.confidence}</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Confidence reflects how many signs line up with timing and frequency.
          </p>
        </ResultCard>
      </div>

      <ResultCard title="Why timing matters" icon={LineChart} className="mt-4">
        <div className="grid gap-3 md:grid-cols-3">
          {(["30", "60", "90"] as const).map((days) => (
            <div key={days} className="rounded-2xl bg-surface p-4">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                {days} days
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {result.growth[days]}
              </p>
            </div>
          ))}
        </div>
      </ResultCard>

      <ResultCard title="What raised your score" icon={BarChart3} className="mt-4">
        <div className="flex flex-wrap gap-2">
          {result.drivers.map((driver) => (
            <span key={driver} className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-bold text-foreground">
              {driver}
            </span>
          ))}
        </div>
      </ResultCard>

      <ResultCard title="What to do next" icon={ClipboardList} className="mt-4">
        <ul className="grid gap-2 md:grid-cols-2">
          {actionItems.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </ResultCard>

      <ProductCta
        band={result.band}
        species={species}
        score={result.score}
        hasStations={hasStations}
        setHasStations={setHasStations}
      />

      <ResultCard title="Share this estimate" icon={Share2} className="mt-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Share the activity band and score range without making an exact population claim.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" variant="outline" className="rounded-full" onClick={copyShareLink}>
            Copy link
          </Button>
          <Button type="button" className="rounded-full" onClick={nativeShare}>
            Share
          </Button>
          <Button type="button" variant="outline" className="rounded-full" disabled>
            Embed coming soon
          </Button>
        </div>
        {shareStatus ? (
          <p className="mt-3 text-sm font-bold text-brand">{shareStatus}</p>
        ) : null}
        {showManualShare ? (
          <input
            type="text"
            value={shareUrl}
            readOnly
            aria-label="Share link"
            className="mt-3 w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm font-medium text-foreground"
            onFocus={(event) => event.currentTarget.select()}
          />
        ) : null}
      </ResultCard>
    </div>
  );
}

function ResultCard({
  title,
  icon: Icon,
  className = "",
  children,
}: {
  title: string;
  icon: typeof BarChart3;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-5 ${className}`}>
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="text-base font-bold tracking-tight text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ProductCta({
  band,
  species,
  score,
  hasStations,
  setHasStations,
}: {
  band: ActivityBand;
  species: Species;
  score: number;
  hasStations: "yes" | "no" | "not-sure";
  setHasStations: (value: "yes" | "no" | "not-sure") => void;
}) {
  if (band === "low") {
    return (
      <ResultCard title="Start with prevention" icon={Info} className="mt-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Low activity does not need a product push. Start by sealing gaps, removing food, and watching for fresh signs.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/why-it-keeps-coming-back">Learn what signs to watch</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/rodent-radar">Back to Rodent Radar</Link>
          </Button>
        </div>
      </ResultCard>
    );
  }

  if (species === "not-sure") {
    return (
      <ResultCard title="Not sure what you have?" icon={Info} className="mt-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Start with the signs. Droppings, burrows, noise patterns, and gnaw marks can help narrow it down before choosing a control path.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild className="rounded-full">
            <Link
              to="/rodent-fertility-control"
              onClick={() =>
                trackRodentRadarEvent("cta_education_clicked", {
                  species,
                  band,
                  score,
                  target: "/rodent-fertility-control",
                })
              }
            >
              Learn how fertility control works
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/why-it-keeps-coming-back">Compare signs</Link>
          </Button>
        </div>
      </ResultCard>
    );
  }

  const isRat = species === "rat";
  const starterVariant = isRat ? "starter-kit-rat-6lb" : "starter-kit-mouse-6lb";
  const refillVariant = isRat ? "refill-rat-6lb" : "refill-mouse-6lb";
  const animal = isRat ? "rat" : "mouse";

  return (
    <ResultCard title={`Ongoing ${animal} activity?`} icon={Sparkles} className="mt-4">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Fertility control can help reduce the replacement cycle when used with sanitation, exclusion, and trapping.
      </p>
      <div className="mt-5">
        <div className="text-sm font-bold text-foreground">Do you already have Evolve stations?</div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {(["no", "yes", "not-sure"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setHasStations(option);
                trackRodentRadarEvent("stations_prompt_selected", {
                  species,
                  band,
                  score,
                  hasStations: option,
                });
              }}
              className={`rounded-xl border px-3 py-2 text-sm font-bold capitalize transition ${
                hasStations === option
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-background text-foreground hover:border-brand/40"
              }`}
            >
              {option.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {hasStations === "yes" ? (
          <Button asChild className="rounded-full">
            <Link
              to="/products/refill"
              search={{ variant: refillVariant }}
              onClick={() =>
                trackRodentRadarEvent("cta_product_clicked", {
                  species,
                  band,
                  score,
                  target: "/products/refill",
                  variant: refillVariant,
                })
              }
            >
              View {animal} refills
            </Link>
          </Button>
        ) : (
          <Button asChild className="rounded-full">
            <Link
              to="/products/starter-kit"
              search={{ variant: starterVariant }}
              onClick={() =>
                trackRodentRadarEvent("cta_product_clicked", {
                  species,
                  band,
                  score,
                  target: "/products/starter-kit",
                  variant: starterVariant,
                })
              }
            >
              View {animal} starter kit
            </Link>
          </Button>
        )}
        <Button asChild variant="outline" className="rounded-full">
          <Link
            to={isRat ? "/evolve-rodent-birth-control" : "/rodent-fertility-control"}
            onClick={() =>
              trackRodentRadarEvent("cta_education_clicked", {
                species,
                band,
                score,
                target: isRat ? "/evolve-rodent-birth-control" : "/rodent-fertility-control",
              })
            }
          >
            How it works
          </Link>
        </Button>
      </div>
    </ResultCard>
  );
}

function SeoContent() {
  return (
    <section className="bg-surface py-16">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Methodology
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              How this rodent infestation calculator works
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Rodent Radar scores visible signs, frequency, duration, food access,
              shelter access, species, seasonality, and local pressure where available.
              It does not count rodents or replace an inspection. The score is meant
              to help you decide what to check next.
            </p>
            <div className="mt-6 rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-bold text-foreground">
                Use it as a pressure estimate, not a head count.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A mouse infestation calculator or rat infestation calculator can only work from
                clues: droppings, sounds, gnaw marks, burrows, sightings, food access, and how
                long the signs have been around. Rodents nest out of sight, so the useful answer
                is usually a pressure band, not an exact number.
              </p>
            </div>
            <div className="mt-4 rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-bold text-foreground">
                Why repeat activity matters
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                One old dropping is different from fresh droppings every morning. The calculator
                weighs repeat signs, duration, and easy food or shelter because those clues are
                more likely to point to ongoing rodent pressure.
              </p>
            </div>
          </div>
          <div className="grid gap-3">
            {faq.map((item) => (
              <div key={item.q} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-bold text-foreground">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Link
            to="/rodent-radar"
            className="rounded-2xl border border-border bg-card p-5 transition hover:border-brand/40"
          >
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
              Tool hub
            </div>
            <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground">
              Rodent Radar
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              See the full set of rodent control tools, including maps and public-health checkers.
            </p>
          </Link>
          <Link
            to="/rodent-radar/rat-pressure-map"
            className="rounded-2xl border border-border bg-card p-5 transition hover:border-brand/40"
          >
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
              Coming next
            </div>
            <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground">
              Rat Pressure Map
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Track city-level rodent pressure and seasonal activity where public data is useful.
            </p>
          </Link>
          <Link
            to="/why-it-keeps-coming-back"
            className="rounded-2xl border border-border bg-card p-5 transition hover:border-brand/40"
          >
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
              Learn
            </div>
            <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground">
              Why rodents keep coming back
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Understand the replacement cycle behind repeat mouse and rat activity.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

function bandClass(band: ActivityBand) {
  switch (band) {
    case "low":
      return "bg-emerald-100 text-emerald-900";
    case "moderate":
      return "bg-yellow-100 text-yellow-900";
    case "high":
      return "bg-orange-100 text-orange-900";
    case "severe":
      return "bg-red-100 text-red-900";
  }
}
