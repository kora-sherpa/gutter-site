// Ported from service-areas/index.html's CO_CITIES / CA_CITIES arrays.
// Only the 3 primary markets have real location pages; every other city is a
// "coming soon" entry that keeps its hover styling but doesn't navigate.
const LIVE_SLUGS = new Set(["denver-co", "sacramento-ca", "aurora-co"]);

function build(entries) {
  return entries.map(([slug, name]) => ({
    slug,
    name,
    live: LIVE_SLUGS.has(slug),
  }));
}

export const CO_CITIES = build([
  ["denver-co", "Denver"], ["aurora-co", "Aurora"], ["lakewood-co", "Lakewood"], ["arvada-co", "Arvada"],
  ["boulder-co", "Boulder"], ["fort-collins-co", "Fort Collins"], ["westminster-co", "Westminster"],
  ["thornton-co", "Thornton"], ["centennial-co", "Centennial"], ["highlands-ranch-co", "Highlands Ranch"],
  ["parker-co", "Parker"], ["castle-rock-co", "Castle Rock"], ["littleton-co", "Littleton"],
  ["broomfield-co", "Broomfield"], ["longmont-co", "Longmont"], ["loveland-co", "Loveland"],
  ["greeley-co", "Greeley"], ["golden-co", "Golden"], ["wheat-ridge-co", "Wheat Ridge"],
  ["englewood-co", "Englewood"], ["commerce-city-co", "Commerce City"], ["brighton-co", "Brighton"],
  ["erie-co", "Erie"], ["superior-co", "Superior"], ["northglenn-co", "Northglenn"],
  ["federal-heights-co", "Federal Heights"], ["louisville-co", "Louisville"], ["lafayette-co", "Lafayette"],
  ["windsor-co", "Windsor"], ["firestone-co", "Firestone"], ["frederick-co", "Frederick"],
  ["johnstown-co", "Johnstown"], ["berthoud-co", "Berthoud"], ["evans-co", "Evans"],
  ["milliken-co", "Milliken"], ["wellington-co", "Wellington"], ["timnath-co", "Timnath"],
  ["severance-co", "Severance"], ["sheridan-co", "Sheridan"], ["edgewater-co", "Edgewater"],
]);

export const CA_CITIES = build([
  ["sacramento-ca", "Sacramento"], ["roseville-ca", "Roseville"], ["folsom-ca", "Folsom"],
  ["elk-grove-ca", "Elk Grove"], ["citrus-heights-ca", "Citrus Heights"], ["rocklin-ca", "Rocklin"],
  ["rancho-cordova-ca", "Rancho Cordova"], ["davis-ca", "Davis"], ["woodland-ca", "Woodland"],
  ["lincoln-ca", "Lincoln"], ["el-dorado-hills-ca", "El Dorado Hills"], ["carmichael-ca", "Carmichael"],
  ["fair-oaks-ca", "Fair Oaks"], ["orangevale-ca", "Orangevale"], ["antelope-ca", "Antelope"],
  ["north-highlands-ca", "North Highlands"], ["vacaville-ca", "Vacaville"], ["dixon-ca", "Dixon"],
  ["auburn-ca", "Auburn"], ["loomis-ca", "Loomis"], ["galt-ca", "Galt"], ["wilton-ca", "Wilton"],
  ["rio-linda-ca", "Rio Linda"], ["west-sacramento-ca", "West Sacramento"], ["placerville-ca", "Placerville"],
  ["cameron-park-ca", "Cameron Park"], ["shingle-springs-ca", "Shingle Springs"], ["herald-ca", "Herald"],
]);
