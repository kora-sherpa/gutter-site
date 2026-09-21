// SEO content engine for the location + service dynamic pages.
// Builds on locVars()/expand() (a JS port of tools/generate-location-pages.pl's
// helpers) by composing longer, state-aware paragraphs from real data instead of
// short single-sentence templates, and by deriving cross-link data (nearby
// cities, other services) for internal link equity.

import { CO_CITIES, CA_CITIES } from "./serviceAreaCities";

export function locVars(location, serviceName) {
  return {
    "{CITY}": location.city,
    "{STATE}": location.state,
    "{STATE_ABBR}": location.stateAbbr,
    "{CLIMATE_TAG}": location.climateTag,
    "{CLIMATE_TAG_LOWER}": location.climateTagLower,
    "{CLIMATE_SENTENCE}": location.climateSentence,
    "{RISK1}": location.risk1,
    "{RISK2}": location.risk2,
    "{RISK2_CAP}": location.risk2Cap,
    "{RISK3}": location.risk3,
    "{NEIGHBORHOODS}": location.neighborhoods,
    "{HEAT_RELEVANCE}": location.heatRelevance,
    "{SERVICE_NAME}": serviceName || "",
  };
}

export function expand(text, vars) {
  if (!text) return "";
  let out = text;
  for (const key of Object.keys(vars).sort((a, b) => b.length - a.length)) {
    out = out.split(key).join(vars[key]);
  }
  return out;
}

export function wordCount(text) {
  return (text || "").trim().split(/\s+/).filter(Boolean).length;
}

// Region-specific climate factors called out explicitly for each state, used to
// seed the "Why It Matters" copy regardless of what's already in a given
// location's risk1/risk2/risk3 fields.
export const CLIMATE_FACTORS = {
  Colorado: [
    "heavy Front Range snow loads that stress unguarded gutters every winter",
    "sharp freeze-thaw cycles that turn trapped meltwater into ice dams along the eaves overnight",
    "hail impact from spring and summer storms that dents and clogs open channels in minutes",
    "high-altitude UV exposure that breaks down lower-grade plastics and finishes faster than at sea level",
    "ponderosa pine needle debris that packs into open gutters year-round",
  ],
  California: [
    "atmospheric river storms that can dump months of rain onto a roofline in a matter of days",
    "heavy valley oak leaf buildup that hardens into a dense mat every fall",
    "dry summer dust accumulation that cakes onto open channels for months at a stretch",
    "wildfire ash that blankets rooflines during fire season and has to be kept out of the system",
  ],
};

// Generic vars for pages with no specific city selected (the /services/:serviceId
// overview page) — lets the same {CITY}/{CLIMATE_TAG_LOWER}-driven templates in
// services.json render sensibly without a location.
export const GENERIC_VARS = {
  "{CITY}": "your area",
  "{STATE}": "",
  "{STATE_ABBR}": "",
  "{CLIMATE_TAG}": "your local climate",
  "{CLIMATE_TAG_LOWER}": "your local climate",
  "{CLIMATE_SENTENCE}": "",
  "{RISK1}": "seasonal debris and storm exposure",
  "{RISK2}": "seasonal debris buildup",
  "{RISK2_CAP}": "Seasonal debris buildup",
  "{RISK3}": "temperature swings",
  "{NEIGHBORHOODS}": "Denver, Sacramento, and Aurora",
  "{HEAT_RELEVANCE}": "",
};

// Section 1 — "Why [Service] Matters in [City]": 80-100 words combining the
// state's climate factors with the specific service being viewed.
export function buildWhyItMatters(location, service) {
  const factors = CLIMATE_FACTORS[location.state] || [];
  const vars = locVars(location, service.name);
  const [f1, f2, f3] = factors;
  const sentences = [
    `${location.city}, ${location.stateAbbr} homes face a combination of seasonal stress that most nationally-sized gutter systems were never engineered to handle.`,
    f1 && f2 ? `Locally, that means ${f1}, layered on top of ${f2}.` : "",
    f3 ? `Add ${f3}, and it's easy to see why so many ${location.city} roofs develop problems within a season or two of neglect.` : "",
    expand(service.introTemplate, vars),
    `Homeowners throughout ${location.neighborhoods} trust our local crew because every ${service.name} job is sized to this climate, not a generic national spec.`,
  ].filter(Boolean);
  return sentences.join(" ");
}

// Hub-page ("all services in this city") variant of the same section, used
// when no specific service is selected.
export function buildWhyItMattersHub(location) {
  const factors = CLIMATE_FACTORS[location.state] || [];
  const [f1, f2, f3, f4] = factors;
  const sentences = [
    `${location.city}, ${location.stateAbbr} homeowners deal with ${location.risk1}, and it rarely stops there.`,
    location.climateSentence,
    f1 ? `On top of that, ${location.city} roofs also contend with ${f1}${f2 ? `, ${f2}` : ""}${f3 ? `, and ${f3}` : ""}.` : "",
    f4 ? `Even ${f4} plays a role in how fast an unprotected gutter fails here.` : "",
    `Gutter Guard Experts runs a local ${location.city} crew that installs, cleans, repairs, and maintains gutter systems built for exactly this combination of conditions — not a one-size-fits-all national spec.`,
  ].filter(Boolean);
  return sentences.join(" ");
}

// Section 4 — 4-5 localized FAQ items: the service's own generic + city pair,
// plus two additional location-aware questions (codes/timeline) common to every
// combination so the section reliably reaches 4-5 entries.
export function buildLocalFaqs(location, service) {
  const vars = locVars(location, service.name);
  const faqs = [...service.faqGeneric];
  faqs.push({
    q: expand(service.faqCityQ, vars),
    a: expand(service.faqCityA, vars),
  });
  faqs.push({
    q: `Do I need a permit for ${service.name.toLowerCase()} in ${location.city}?`,
    a: `In most cases, no — ${service.name} attaches to your existing gutters and roofline rather than altering the structure itself, so it typically falls outside ${location.city}'s building permit requirements. We'll flag it during your free inspection if your specific property is an exception.`,
  });
  faqs.push({
    q: `How soon can you schedule ${service.name.toLowerCase()} in ${location.city}?`,
    a: `Most ${location.city} estimates are scheduled within the week, and once you approve the quote, a single-day install is typical for most homes. We prioritize ${location.climateTagLower} season so your gutters are protected before it hits.`,
  });
  return faqs;
}

// Section 6 — nearby cities in the same state, prioritizing other live
// location pages first (real internal links) before falling back to directory
// entries (which still reinforce topical relevance even without their own page
// yet).
export function getNearbyCities(location, limit = 6) {
  const pool = location.stateAbbr === "CO" ? CO_CITIES : CA_CITIES;
  const others = pool.filter((c) => c.slug !== location.slug);
  const live = others.filter((c) => c.live);
  const rest = others.filter((c) => !c.live);
  return [...live, ...rest].slice(0, limit);
}
