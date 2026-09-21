#!/usr/bin/perl
# Build-time generator for /service-areas/:locationId/(:serviceId)/ pages.
# Not served to browsers -- run this locally whenever LOCATIONS/SERVICES change,
# then commit the generated index.html files under service-areas/.
#
# Usage: perl tools/generate-location-pages.pl

use strict;
use warnings;
use utf8;
use File::Path qw(make_path);
use File::Basename qw(dirname);
use FindBin qw($RealBin);

my $root = "$RealBin/..";

# ---------------------------------------------------------------------------
# Locations
# ---------------------------------------------------------------------------
my @LOCATIONS = (
  {
    slug => 'denver-co', city => 'Denver', state_abbr => 'CO', state => 'Colorado',
    climate_tag => 'Heavy Snow, Hail & Pine Debris',
    climate_tag_lower => 'heavy snow, hail, and pine debris',
    climate_sentence => "Denver's Front Range weather swings from spring hailstorms to heavy winter snowpack, while ponderosa pine and blue spruce trees shed needles onto rooflines year-round.",
    risk1 => 'ice dams that build up along the eaves every winter',
    risk2 => 'hail-driven granule and pine-needle buildup each spring',
    risk2_cap => 'Hail-driven granule and pine-needle buildup',
    risk3 => 'sudden freeze-thaw cycles that crack gutters already clogged with debris',
    neighborhoods => 'Cherry Creek, Washington Park, and the Highlands',
    hero_image => '730c4e1e84772581919d981b0be78070.jpg',
    hero_alt => 'A Gutter Guard Experts technician on a ladder installing gutter guard mesh in Denver, CO',
    heat_relevance => "Denver's freeze-thaw winters are exactly the pattern that forms ice dams \x{2014} melted snow refreezing at the eaves overnight. 2.0 PRO HEAT\x{2122} is one of our most-requested add-ons here.",
  },
  {
    slug => 'sacramento-ca', city => 'Sacramento', state_abbr => 'CA', state => 'California',
    climate_tag => 'Valley Oak Litter & Atmospheric River Storms',
    climate_tag_lower => 'valley oak litter and atmospheric river storms',
    climate_sentence => "Sacramento's long, dry season bakes valley oak and sycamore leaf litter into a hardened crust, then atmospheric river storms can dump months of rain in a matter of days.",
    risk1 => 'valley oak litter that bakes into a hard crust each dry summer',
    risk2 => 'fine Delta dust and grit packed into open channels',
    risk2_cap => 'Fine Delta dust and grit',
    risk3 => 'atmospheric river storms that overwhelm clogged systems in a matter of hours',
    neighborhoods => 'Land Park, East Sacramento, and the Pocket',
    hero_image => 'b6ac7988de6850f6b598a932816b390b.jpg',
    hero_alt => 'A man cleaning years of leaves and debris out of an unprotected roof gutter by hand in Sacramento, CA',
    heat_relevance => "Sacramento's valley floor rarely sees a hard freeze, so most homes here skip it \x{2014} but it's available for higher-elevation properties in our Sacramento service area that do see occasional freezing nights.",
  },
  {
    slug => 'aurora-co', city => 'Aurora', state_abbr => 'CO', state => 'Colorado',
    climate_tag => 'Hail Alley Storms & High-Plains Wind Debris',
    climate_tag_lower => 'hail alley storms and high-plains wind',
    climate_sentence => "Aurora sits in the heart of \x{2018}Hail Alley,\x{2019} where wind-driven High Plains storms and drifting cottonwood seed overload open gutters every season.",
    risk1 => 'severe hailstorms that dent and clog unprotected gutters each summer',
    risk2 => 'wind-driven cottonwood seed and prairie debris that packs in during dry spells',
    risk2_cap => 'Wind-driven cottonwood seed and prairie debris',
    risk3 => 'rapid freeze-thaw cycles common to the High Plains that stress waterlogged systems',
    neighborhoods => 'Southlands, Saddle Rock, and Heather Ridge',
    hero_image => 'c5447f9286fa25d88c4567b4382d4a5a.jpg',
    hero_alt => 'Pine needles resting harmlessly on top of 2.0 PRO gutter guard mesh on a home in Aurora, CO',
    heat_relevance => "Aurora's High Plains winters bring the same freeze-thaw swings that cause ice dams along the eaves, which is why 2.0 PRO HEAT\x{2122} is a popular add-on for Aurora roofs.",
  },
);

# ---------------------------------------------------------------------------
# Services
# ---------------------------------------------------------------------------
my @SERVICES = (
  {
    slug => '2-0-pro-installation', name => "2.0 PRO\x{ae} Guard Installation",
    tagline => "Patented Triple-Rib\x{2122} micro-mesh protection, custom-fit to your gutters",
    thumb => '730c4e1e84772581919d981b0be78070.jpg',
    thumb_alt => 'A Gutter Guard Experts technician on a ladder installing gutter guard mesh',
    header_template => 'Why {CLIMATE_TAG} Make Gutter Guards Essential in {CITY}, {STATE_ABBR}',
    intro_template => "If you own a home in {CITY}, you already know what {RISK1} does to an unprotected gutter. 2.0 PRO\x{ae} Guard Installation solves it at the source: a patented Triple-Rib\x{2122} micro-mesh, fastened to an aircraft-grade frame, that keeps debris out for good.",
    benefits => [
      "Blocks 440-micron debris \x{2014} pine needles, roof grit, and shingle particles never make it into the gutter.",
      'Aircraft-grade T5 aluminum frame holds its shape through {CLIMATE_TAG_LOWER} without warping or sagging.',
      "Installs directly onto your existing gutters \x{2014} no tear-off, no reroofing required.",
      'Backed by a fully transferable Triple-Lifetime Warranty on materials, workmanship, and clog protection.',
    ],
    process => [
      { title => 'Free Inspection', desc => 'We measure your roofline and gutters on-site in {CITY} and confirm your free estimate on the spot.' },
      { title => 'Clean & Tune-Up', desc => 'Full gutter flush, hanger re-securing, and pitch correction before anything is installed.' },
      { title => 'Custom-Fit Install', desc => "2.0 PRO\x{ae} guards are cut and fastened to your exact gutter line." },
      { title => 'Seal & Secure', desc => 'Every corner and end cap sealed with 50-year tri-polymer sealant.' },
    ],
    faq_generic => [
      { q => "Will 2.0 PRO\x{ae} guards work with my existing gutters?", a => "Yes. The system is designed to fasten directly onto standard 5- and 6-inch K-style gutters, so there's no need to replace your gutters first." },
      { q => 'How long does installation take?', a => 'Most single-family homes are completed in a single day, start to finish, including the pre-install cleaning and tune-up.' },
    ],
    faq_city_q => "Does 2.0 PRO\x{ae} hold up to {CITY}'s {CLIMATE_TAG}?",
    faq_city_a => "Yes \x{2014} the T5 aluminum frame and 440-micron mesh are built for {RISK1}, and every install is backed by a fully transferable Triple-Lifetime Warranty.",
  },
  {
    slug => 'gutter-cleaning', name => 'Gutter Cleaning',
    tagline => "The last hand-cleaning you'll ever need to schedule",
    thumb => 'b6ac7988de6850f6b598a932816b390b.jpg',
    thumb_alt => 'A man cleaning years of leaves and debris out of an unprotected roof gutter by hand',
    header_template => 'Why {CITY} Homes Need Professional Gutter Cleaning Before {CLIMATE_TAG}',
    intro_template => "In {CITY}, {RISK1} fills an open gutter faster than most homeowners expect. Our gutter cleaning service clears every run by hand, tests the downspouts, and leaves you with a clean baseline before we ever talk about guards.",
    benefits => [
      'Full hand-cleaning of leaves, grit, and standing debris from every gutter run and downspout.',
      'Downspout flow test to confirm water is actually leaving the roofline, not backing up behind {CLIMATE_TAG_LOWER}.',
      'Minor hanger re-securing and pitch check included at no extra charge.',
      'Photo before/after report so you can see exactly what came out of your gutters.',
    ],
    process => [
      { title => 'Schedule Visit', desc => "Pick a time that works \x{2014} most {CITY} appointments are booked within the week." },
      { title => 'Full Gutter Flush', desc => 'Every run is hand-cleared of leaves, grit, and standing debris, not just blown out.' },
      { title => 'Hanger & Pitch Check', desc => 'Loose hangers are re-secured and pitch is checked so water actually reaches the downspout.' },
      { title => 'Downspout Flow Test', desc => 'We run water through the system before we leave to confirm it drains clean.' },
    ],
    faq_generic => [
      { q => 'How often should I have my gutters cleaned?', a => "Most homes need cleaning twice a year \x{2014} once in late spring and once in late fall \x{2014} though heavy tree cover can mean more often." },
      { q => 'Do you clean gutters that already have guards installed?', a => "Yes. Guarded systems still benefit from an occasional flush, and we can inspect the guards for damage while we're up there." },
    ],
    faq_city_q => 'Why do {CITY} gutters clog so fast?',
    faq_city_a => "{RISK1} and {RISK2} combine fast here \x{2014} that pairing is what turns an open gutter into a clogged one within a single season.",
  },
  {
    slug => 'repair-tune-up', name => 'Repair & Tune-Up',
    tagline => 'Reseal, re-secure, and re-pitch before small problems become fascia rot',
    thumb => 'ec00d0196c5012ef9df3f0dd977b19b2.png',
    thumb_alt => 'Before and after comparison of a roof valley gutter area, showing debris-fouled surface replaced with a clean guard-protected surface',
    header_template => "When {CITY} Gutters Need Repair, Not Replacement \x{2014} Signs to Watch For",
    intro_template => "{CLIMATE_SENTENCE} In {CITY}, that usually shows up as sagging hangers, leaking seams, or gutters that no longer drain toward the downspout. A repair and tune-up fixes the specific problem instead of replacing gutters that still have years of life left in them.",
    benefits => [
      'Reseal leaking seams and end caps with 50-year tri-polymer sealant.',
      'Re-secure sagging hangers and brackets loosened by {CLIMATE_TAG_LOWER}.',
      'Correct negative pitch so water reaches the downspout instead of pooling.',
      'Spot-repair damaged sections without a full gutter replacement.',
    ],
    process => [
      { title => 'Diagnostic Inspection', desc => 'We walk the roofline in {CITY} and identify every leak, sag, and pitch issue.' },
      { title => 'Hanger & Bracket Repair', desc => 'Loose or failed hangers are replaced and re-secured to the fascia.' },
      { title => 'Pitch Correction', desc => 'Gutters are re-leveled so water flows to the downspout instead of standing.' },
      { title => 'Seal & Test', desc => 'Seams and end caps are resealed, then tested with running water before we leave.' },
    ],
    faq_generic => [
      { q => 'How do I know if my gutters need repair instead of full replacement?', a => "If the gutter material itself is still sound \x{2014} no rust-through or cracked runs \x{2014} a repair and tune-up is almost always faster and less expensive than a full replacement." },
      { q => "Can you repair gutters that weren't originally installed by your team?", a => 'Yes. We service and repair most standard aluminum and steel gutter systems, regardless of who installed them.' },
    ],
    faq_city_q => "What's the most common gutter problem you see in {CITY}?",
    faq_city_a => "{RISK2_CAP} is the biggest culprit \x{2014} it works hangers loose and pulls seams apart faster than most homeowners expect.",
  },
  {
    slug => 'seamless-gutters', name => 'Seamless Gutters',
    tagline => 'Custom K-style gutters, roll-formed on-site to your exact roofline',
    thumb => 'ae395ef07fa5fe74ebb6b7c028460d8a.png',
    thumb_alt => 'Technician measuring a section of seamless gutter with a tape measure before installation',
    header_template => 'Why {CITY} Homes Are Switching to Seamless Gutters',
    intro_template => "Sectional gutters give {RISK1} a seam to work loose. Seamless gutters remove that weak point entirely \x{2014} each run is roll-formed on-site to your exact roofline, in a color matched to your trim or siding, with no seams for {CITY}'s weather to exploit.",
    benefits => [
      "Formed on-site in one continuous run \x{2014} no seams for {CLIMATE_TAG_LOWER} to work loose over time.",
      'Matched to your trim, roofline, or siding, including specialty metals and 30+ colors.',
      'Heavier-gauge aluminum resists denting and sagging better than sectional gutters.',
      "Ready to pair with 2.0 PRO\x{ae} guards for a fully protected, guard-topped system.",
    ],
    process => [
      { title => 'Measure & Match Color', desc => 'We measure your exact roofline in {CITY} and match trim or siding color on-site.' },
      { title => 'On-Site Roll-Forming', desc => 'Gutter stock is roll-formed into one seamless run right at your home.' },
      { title => 'Install & Level', desc => 'Sections are hung, leveled, and pitched to the downspout in a single day.' },
      { title => 'Guard-Ready Finish', desc => "Every run is finished ready to accept 2.0 PRO\x{ae} guards if you add them later." },
    ],
    faq_generic => [
      { q => 'Are seamless gutters actually seamless?', a => 'Each run is roll-formed on-site as one continuous piece, so the only seams are at inside/outside corners and downspout connections.' },
      { q => 'What colors are available?', a => 'We stock 30+ factory finishes and can match most trim and siding colors, including specialty metals like copper and zinc.' },
    ],
    faq_city_q => "Do seamless gutters help with {CITY}'s {CLIMATE_TAG}?",
    faq_city_a => "Yes \x{2014} fewer seams mean fewer places for {RISK1} to force a leak, which is exactly where sectional gutters tend to fail first.",
  },
  {
    slug => '2-0-pro-heat', name => "2.0 PRO HEAT\x{2122}",
    tagline => 'Integrated ice-melt cable built into the guard system',
    thumb => 'c5447f9286fa25d88c4567b4382d4a5a.jpg',
    thumb_alt => 'Pine needles resting harmlessly on top of 2.0 PRO gutter guard mesh instead of clogging the gutter',
    header_template => "Do {CITY} Roofs Need Ice-Dam Protection? Here's How 2.0 PRO HEAT\x{2122} Helps",
    intro_template => "{HEAT_RELEVANCE} 2.0 PRO HEAT\x{2122} integrates a self-regulating heat cable directly into the 2.0 PRO\x{ae} guard system, so meltwater keeps moving through the downspout instead of refreezing at the eaves.",
    benefits => [
      "Self-regulating heat cable is integrated directly into the 2.0 PRO\x{ae} guard, not just draped over the gutter.",
      'Keeps meltwater moving through the downspout instead of refreezing into ice dams.',
      'Controlled by a weather-sensing thermostat, so it only runs when conditions call for it.',
      "Layers onto any 2.0 PRO\x{ae} installation without changing the look of your roofline.",
    ],
    process => [
      { title => 'Ice-Dam Risk Assessment', desc => 'We walk the roofline in {CITY} and flag the valleys and eaves most prone to ice buildup.' },
      { title => 'Cable Routing', desc => 'Self-regulating heat cable is routed along the guard and into vulnerable valleys and downspouts.' },
      { title => 'Thermostat Setup', desc => 'A weather-sensing controller is wired in so the system runs only when temperature and moisture call for it.' },
      { title => 'Test & Handoff', desc => 'We test the full circuit before we leave and walk you through the controls.' },
    ],
    faq_generic => [
      { q => "Does 2.0 PRO HEAT\x{2122} run all winter?", a => 'No. The thermostat only activates the cable when temperature and moisture conditions actually risk ice formation, which keeps energy use down.' },
      { q => 'Can it be added to guards I already have installed?', a => "In most cases, yes \x{2014} we can retrofit heat cable onto an existing 2.0 PRO\x{ae} installation without replacing the guards themselves." },
    ],
    faq_city_q => 'Do I really need ice-melt protection in {CITY}?',
    faq_city_a => "It depends on your roofline's specific ice-dam history. Book a free inspection and we'll give you a straight answer for your home, not a blanket sales pitch.",
  },
  {
    slug => 'commercial', name => 'Commercial Protection',
    tagline => 'Multi-unit and commercial-grade gutter protection with minimal downtime',
    thumb => '37f592363d1f32953f39d47a78c1cbc8.png',
    thumb_alt => 'Certified Gutter Guard Experts technician installing a copper downspout, wearing a branded company shirt',
    header_template => 'Commercial & Multi-Unit Gutter Protection Built for {CITY} Properties',
    intro_template => "Larger roof systems catch more debris, and in {CITY} that means {RISK2}. Our commercial division fabricates heavier-gauge guards and gutter stock sized for multi-unit buildings, HOA common areas, and low-slope commercial roof lines \x{2014} with phased scheduling that keeps tenants undisturbed.",
    benefits => [
      'Custom-fabricated for low-slope commercial roof lines, multi-unit buildings, and HOA common areas.',
      'Phased installation scheduling keeps tenants and foot traffic largely undisturbed.',
      'Heavier-gauge materials built for the debris load {CLIMATE_TAG_LOWER} puts on larger roof systems.',
      'One ongoing maintenance plan covers every building on the property.',
    ],
    process => [
      { title => 'Site Walkthrough & Assessment', desc => 'We assess every roofline on the {CITY} property and scope material needs building-by-building.' },
      { title => 'Custom Commercial-Grade Fabrication', desc => 'Guards and gutter stock are fabricated to match your specific roof and drainage system.' },
      { title => 'Phased Installation', desc => 'Work is scheduled building-by-building to minimize downtime for tenants and property staff.' },
      { title => 'Ongoing Maintenance Plan', desc => 'A single scheduled maintenance plan keeps every building on the property covered.' },
    ],
    faq_generic => [
      { q => 'Do you work with property managers and HOAs directly?', a => 'Yes. We regularly coordinate directly with property managers and HOA boards on scheduling, billing, and multi-building scopes of work.' },
      { q => 'Can you handle multiple buildings on one property?', a => "Yes \x{2014} we scope and phase installs across an entire property so every building is covered under one plan and one warranty." },
    ],
    faq_city_q => 'What makes commercial gutter protection different in {CITY}?',
    faq_city_a => 'Larger roof systems catch more {RISK2}, so we fabricate heavier-gauge guards and gutter stock sized for the debris load {CITY} commercial roofs actually see.',
  },
);

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

sub loc_vars {
  my ($loc, $svc_name) = @_;
  return (
    '{CITY}' => $loc->{city},
    '{STATE}' => $loc->{state},
    '{STATE_ABBR}' => $loc->{state_abbr},
    '{CLIMATE_TAG}' => $loc->{climate_tag},
    '{CLIMATE_TAG_LOWER}' => $loc->{climate_tag_lower},
    '{CLIMATE_SENTENCE}' => $loc->{climate_sentence},
    '{RISK1}' => $loc->{risk1},
    '{RISK2}' => $loc->{risk2},
    '{RISK2_CAP}' => $loc->{risk2_cap},
    '{RISK3}' => $loc->{risk3},
    '{NEIGHBORHOODS}' => $loc->{neighborhoods},
    '{HEAT_RELEVANCE}' => $loc->{heat_relevance},
    '{SERVICE_NAME}' => (defined $svc_name ? $svc_name : ''),
  );
}

sub expand {
  my ($text, %vars) = @_;
  return '' unless defined $text;
  for my $key (sort { length($b) <=> length($a) } keys %vars) {
    my $val = $vars{$key};
    $text =~ s/\Q$key\E/$val/g;
  }
  return $text;
}

sub word_count {
  my ($text) = @_;
  my $plain = $text;
  $plain =~ s/<[^>]+>/ /g;
  my @words = grep { length $_ } split /\s+/, $plain;
  return scalar @words;
}

my $ICON_CHECK = '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 17.01"></polyline>';
my $ICON_CHEVRON = '<polyline points="6 9 12 15 18 9"></polyline>';
my $ICON_SHIELD = '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>';
my $ICON_ARROW = '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>';
my $ICON_PHONE = '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path>';

sub svg {
  my ($path, $w, $h) = @_;
  $w ||= 18; $h ||= 18;
  return qq{<svg width="$w" height="$h" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">$path</svg>};
}

sub page_head {
  my (%p) = @_;
  return <<"HEAD";
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>$p{title}</title>
<meta name="description" content="$p{description}">
<link rel="canonical" href="$p{canonical}">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght\@500;600;700&family=Manrope:wght\@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="/assets/css/site-base.css">
<link rel="stylesheet" href="/assets/css/location-service.css">
<script src="/scripts/site-include.js" defer></script>
</head>
<body>
<div id="navbar-root"></div>
<main>
HEAD
}

sub page_foot {
  return <<'FOOT';
</main>
<div id="footer-root"></div>
</body>
</html>
FOOT
}

sub benefits_section {
  my (@benefits) = @_;
  my $cards = '';
  for my $b (@benefits) {
    $cards .= qq{
      <div class="card">
        <div class="icon-wrap icon-wrap-sm" style="margin-bottom:14px;">} . svg($ICON_CHECK, 18, 18) . qq{</div>
        <p style="font-size:14.5px;line-height:1.55;color:var(--muted);">$b</p>
      </div>};
  }
  return qq{
<section class="section-tight">
  <div class="container">
    <div class="section-head left"><div class="eyebrow">Key Benefits</div></div>
    <div class="lp-benefits-grid">$cards
    </div>
  </div>
</section>};
}

sub why_us_section {
  my (%p) = @_;
  return qq{
<section class="section-tight" style="background:var(--surface);">
  <div class="container">
    <div class="lp-why-us">
      <div class="eyebrow">Why Us</div>
      <h2 class="h-lg">Local Expertise, Backed for Life</h2>
      <p class="lede">$p{why_us_text}</p>
      <div class="badge-row" style="margin-top:8px;">
        <div class="badge">} . svg($ICON_SHIELD, 16, 16) . qq{Triple-Lifetime Warranty</div>
        <div class="badge">} . svg($ICON_CHECK, 16, 16) . qq{50-Year Tri-Polymer Sealant</div>
        <div class="badge">} . svg($ICON_SHIELD, 16, 16) . qq{Licensed &amp; Insured in $p{state_abbr}</div>
      </div>
    </div>
  </div>
</section>};
}

sub process_section {
  my (@steps) = @_;
  my $i = 0;
  my $cards = '';
  for my $s (@steps) {
    $i++;
    $cards .= qq{
      <div class="lp-step">
        <div class="lp-step-num">$i</div>
        <h3>$s->{title}</h3>
        <p>$s->{desc}</p>
      </div>};
  }
  return qq{
<section class="section-tight">
  <div class="container">
    <div class="section-head"><div class="eyebrow">Process</div><h2 class="h-lg">How It Works</h2></div>
    <div class="lp-process-grid">$cards
    </div>
  </div>
</section>};
}

sub faq_section {
  my (@items) = @_;
  my $rows = '';
  for my $it (@items) {
    $rows .= qq{
      <div class="faq-item">
        <button class="faq-trigger" type="button" aria-expanded="false">
          <span>$it->{q}</span>
          } . svg($ICON_CHEVRON, 16, 16) . qq{
        </button>
        <div class="faq-panel" style="display:none;">
          <p>$it->{a}</p>
        </div>
      </div>};
  }
  return qq{
<section class="section-tight" style="background:var(--surface);">
  <div class="container" style="max-width:820px;">
    <div class="section-head"><div class="eyebrow">FAQ</div><h2 class="h-lg">Common Questions</h2></div>
    <div class="lp-faq-list">$rows
    </div>
  </div>
</section>};
}

sub more_services_section {
  my ($loc, $heading, @cards) = @_;
  my $grid = '';
  for my $c (@cards) {
    $grid .= qq{
      <a class="lp-more-card card-lift" href="$c->{href}">
        <div class="lp-more-thumb"><img src="$c->{img}" alt="$c->{alt}" loading="lazy"></div>
        <div class="lp-more-body">
          <h3>$c->{name}</h3>
          <span class="lp-more-link">View service \x{2192}</span>
        </div>
      </a>};
  }
  return qq{
<section class="section-tight">
  <div class="container">
    <div class="section-head left"><div class="eyebrow">More Services</div><h2 class="h-lg">$heading</h2></div>
    <div class="lp-more-grid">$grid
    </div>
  </div>
</section>};
}

sub cta_section {
  my (%p) = @_;
  return qq{
<section class="section-tight" style="background:linear-gradient(135deg,var(--navy),#152230);">
  <div class="container" style="text-align:center;">
    <h2 class="h-lg" style="color:#fff;">Ready for Gutter Protection $p{city}, $p{state_abbr} Homeowners Trust?</h2>
    <p class="lede-light" style="margin:16px auto 28px;max-width:520px;">Book your free, no-obligation estimate today.</p>
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
      <a href="/3-step-booking/" class="btn btn-primary">Get an Estimate } . svg($ICON_ARROW, 16, 16) . qq{</a>
      <a href="tel:+17207091681" class="btn btn-outline">} . svg($ICON_PHONE, 16, 16) . qq{ Call (720) 709-1681</a>
    </div>
  </div>
</section>};
}

sub hero_section {
  my (%p) = @_;
  return qq{
<section class="lp-hero">
  <div class="lp-hero-bg"><img src="$p{hero_image}" alt="$p{hero_alt}" loading="eager"></div>
  <div class="lp-hero-overlay"></div>
  <div class="container lp-hero-inner">
    <div class="lp-breadcrumb">
      <a href="/">Home</a><span>/</span><a href="/service-areas/">Service Areas</a>$p{crumb_extra}
    </div>
    <div class="eyebrow eyebrow-light">$p{eyebrow}</div>
    <h1 class="h-hero">$p{header}</h1>
    <p class="lede-light" style="margin-top:18px;max-width:640px;">$p{intro}</p>
    <div class="lp-hero-cta-row">
      <a href="/3-step-booking/" class="btn btn-primary">Get an Estimate } . svg($ICON_ARROW, 16, 16) . qq{</a>
      <a href="tel:+17207091681" class="btn btn-outline">} . svg($ICON_PHONE, 16, 16) . qq{ Call (720) 709-1681</a>
    </div>
  </div>
</section>};
}

# ---------------------------------------------------------------------------
# Combo page renderer: /service-areas/:locationId/:serviceId/
# ---------------------------------------------------------------------------
sub render_combo_page {
  my ($loc, $svc) = @_;
  my %vars = loc_vars($loc, $svc->{name});

  my $header = expand($svc->{header_template}, %vars);
  my $intro = expand($svc->{intro_template}, %vars);
  my @benefits = map { expand($_, %vars) } @{ $svc->{benefits} };
  my @process = map { { title => $_->{title}, desc => expand($_->{desc}, %vars) } } @{ $svc->{process} };

  my @faq = map { { q => $_->{q}, a => $_->{a} } } @{ $svc->{faq_generic} };
  push @faq, { q => expand($svc->{faq_city_q}, %vars), a => expand($svc->{faq_city_a}, %vars) };

  my $why_us_text = expand(
    "Our $loc->{city} crew works {NEIGHBORHOODS} and the rest of the metro every week. Every {SERVICE_NAME} job is backed by a fully transferable Triple-Lifetime Warranty, 50-year tri-polymer sealant, and a licensed, insured local team \x{2014} never a subcontractor.",
    %vars
  );

  my @other_services = grep { $_->{slug} ne $svc->{slug} } @SERVICES;
  my @cards = map {
    { href => "/service-areas/$loc->{slug}/$_->{slug}/", img => "/assets/$_->{thumb}", alt => $_->{thumb_alt}, name => $_->{name} }
  } @other_services;

  my $title = "$svc->{name} in $loc->{city}, $loc->{state_abbr} | Gutter Guard Experts";
  my $description = "$svc->{name} for $loc->{city}, $loc->{state_abbr} homes \x{2014} built for $loc->{climate_tag_lower}. Free estimates, Triple-Lifetime Warranty.";
  my $canonical = "https://www.gutterguardexperts.com/service-areas/$loc->{slug}/$svc->{slug}/";

  my $html = page_head(title => $title, description => $description, canonical => $canonical);
  $html .= hero_section(
    hero_image => "/assets/$loc->{hero_image}",
    hero_alt => $loc->{hero_alt},
    eyebrow => "$loc->{city}, $loc->{state_abbr} \x{00b7} $svc->{name}",
    header => $header,
    intro => $intro,
    crumb_extra => qq{<span>/</span><a href="/service-areas/$loc->{slug}/">$loc->{city}, $loc->{state_abbr}</a><span>/</span><span>$svc->{name}</span>},
  );
  $html .= benefits_section(@benefits);
  $html .= why_us_section(why_us_text => $why_us_text, state_abbr => $loc->{state_abbr});
  $html .= process_section(@process);
  $html .= faq_section(@faq);
  $html .= more_services_section($loc, "Other Ways We Protect $loc->{city} Homes", @cards);
  $html .= cta_section(city => $loc->{city}, state_abbr => $loc->{state_abbr});
  $html .= page_foot();

  my $word_total = word_count($intro) + word_count(join(' ', @benefits))
    + word_count($why_us_text) + word_count(join(' ', map { $_->{desc} } @process))
    + word_count(join(' ', map { $_->{a} } @faq));

  my $dir = "$root/service-areas/$loc->{slug}/$svc->{slug}";
  make_path($dir);
  open(my $fh, '>:encoding(UTF-8)', "$dir/index.html") or die "cannot write $dir/index.html: $!";
  print $fh $html;
  close $fh;

  return $word_total;
}

# ---------------------------------------------------------------------------
# Location hub renderer: /service-areas/:locationId/
# ---------------------------------------------------------------------------
sub render_hub_page {
  my ($loc) = @_;
  my %vars = loc_vars($loc, undef);

  my $header = "$loc->{city}, $loc->{state_abbr} Gutter Guard &amp; Gutter Services";
  my $intro = expand(
    "$loc->{city} homeowners deal with {RISK1}. {CLIMATE_SENTENCE} Gutter Guard Experts runs a local $loc->{city} crew that installs, cleans, repairs, and maintains gutter systems built for this climate.",
    %vars
  );

  my @benefits = (
    "Six services under one local crew \x{2014} installation, cleaning, repair, seamless gutters, heat cable, and commercial \x{2014} all serving $loc->{city}.",
    "Every install is sized for {CLIMATE_TAG_LOWER}, not a generic national spec.",
    'Free, no-obligation in-home estimates with same-week scheduling in most cases.',
    'A fully transferable Triple-Lifetime Warranty on every job, backed by a licensed, insured local team.',
  );
  @benefits = map { expand($_, %vars) } @benefits;

  my @process = (
    { title => 'Free Inspection', desc => "We walk your roofline in $loc->{city} and confirm your free estimate on the spot." },
    { title => 'Pick Your Service', desc => "Installation, cleaning, repair, seamless gutters, heat cable, or commercial \x{2014} scoped to your property." },
    { title => 'Scheduled Install', desc => 'Most single-family jobs are completed in a single day, start to finish.' },
    { title => 'Lifetime Backing', desc => 'Every job is backed by a fully transferable Triple-Lifetime Warranty.' },
  );

  my @faq = (
    { q => "What areas of $loc->{city} do you serve?", a => "We serve $loc->{city} and the surrounding metro, including $loc->{neighborhoods}. If you're unsure whether your address is covered, a free estimate call will confirm it." },
    { q => 'Do you offer free estimates?', a => "Yes \x{2014} every $loc->{city} estimate is free and no-obligation, typically scheduled within the week." },
    { q => expand('Why do {CITY} gutters need extra protection compared to other climates?', %vars), a => 'A generic, nationally-sized guard misses what this specific climate does to a roofline. We size every install for it instead.' },
  );

  my @cards = map {
    { href => "/service-areas/$loc->{slug}/$_->{slug}/", img => "/assets/$_->{thumb}", alt => $_->{thumb_alt}, name => $_->{name}, tagline => $_->{tagline} }
  } @SERVICES;

  my $why_us_text = expand(
    "Our $loc->{city} crew works {NEIGHBORHOODS} and the rest of the metro every week. Every job here is backed by a fully transferable Triple-Lifetime Warranty, 50-year tri-polymer sealant, and a licensed, insured local team \x{2014} never a subcontractor.",
    %vars
  );

  my $title = "$loc->{city}, $loc->{state_abbr} Gutter Guards & Gutter Services | Gutter Guard Experts";
  my $description = "Gutter guard installation, cleaning, repair, and seamless gutters for $loc->{city}, $loc->{state_abbr}. Free estimates, Triple-Lifetime Warranty.";
  my $canonical = "https://www.gutterguardexperts.com/service-areas/$loc->{slug}/";

  my $html = page_head(title => $title, description => $description, canonical => $canonical);
  $html .= hero_section(
    hero_image => "/assets/$loc->{hero_image}",
    hero_alt => $loc->{hero_alt},
    eyebrow => "$loc->{city}, $loc->{state_abbr} \x{00b7} Service Area",
    header => $header,
    intro => $intro,
    crumb_extra => qq{<span>/</span><span>$loc->{city}, $loc->{state_abbr}</span>},
  );
  $html .= benefits_section(@benefits);
  $html .= why_us_section(why_us_text => $why_us_text, state_abbr => $loc->{state_abbr});
  $html .= process_section(@process);
  $html .= faq_section(@faq);

  my $services_grid = '';
  for my $c (@cards) {
    $services_grid .= qq{
      <a class="lp-service-card card-lift" href="$c->{href}">
        <div class="lp-service-thumb"><img src="$c->{img}" alt="$c->{alt}" loading="lazy"></div>
        <div class="lp-service-body">
          <h3>$c->{name}</h3>
          <p>$c->{tagline}</p>
          <span class="lp-service-link">View in $loc->{city} \x{2192}</span>
        </div>
      </a>};
  }
  $html .= qq{
<section class="section-tight">
  <div class="container">
    <div class="section-head left"><div class="eyebrow">More Services</div><h2 class="h-lg">All Services in $loc->{city}, $loc->{state_abbr}</h2></div>
    <div class="lp-services-grid">$services_grid
    </div>
  </div>
</section>};

  $html .= cta_section(city => $loc->{city}, state_abbr => $loc->{state_abbr});
  $html .= page_foot();

  my $word_total = word_count($intro) + word_count(join(' ', @benefits))
    + word_count($why_us_text) + word_count(join(' ', map { $_->{desc} } @process))
    + word_count(join(' ', map { $_->{a} } @faq));

  my $dir = "$root/service-areas/$loc->{slug}";
  make_path($dir);
  open(my $fh, '>:encoding(UTF-8)', "$dir/index.html") or die "cannot write $dir/index.html: $!";
  print $fh $html;
  close $fh;

  return $word_total;
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
my $count = 0;
for my $loc (@LOCATIONS) {
  my $hub_words = render_hub_page($loc);
  printf "hub   %-14s %3d words -> service-areas/%s/index.html\n", $loc->{slug}, $hub_words, $loc->{slug};
  $count++;

  for my $svc (@SERVICES) {
    my $words = render_combo_page($loc, $svc);
    printf "combo %-14s / %-22s %3d words -> service-areas/%s/%s/index.html\n",
      $loc->{slug}, $svc->{slug}, $words, $loc->{slug}, $svc->{slug};
    $count++;
  }
}
print "\nGenerated $count pages.\n";
