// Mirrors tools/generate-location-pages.pl's loc_vars()/expand() so location + service
// copy can be interpolated at render time instead of pre-rendered to static files.

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
