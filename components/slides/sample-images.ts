/*
 * The three sample pictures in the Insert > Image picker. They are simple neutral illustrations drawn as SVG data URIs
 * (no photographs, no people), so nothing real is ever shown. Each is 600 x 400.
 */

const uri = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const wrap = (body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">${body}</svg>`;

const DESK = wrap(`
<rect width="600" height="400" fill="#EAF0FB"/>
<rect y="300" width="600" height="100" fill="#D9E3F5"/>
<rect x="40" y="40" width="130" height="150" rx="6" fill="#FFFFFF" stroke="#C5D2EC" stroke-width="3"/>
<rect x="52" y="54" width="106" height="52" rx="3" fill="#BFD3F7"/>
<rect x="52" y="116" width="70" height="8" rx="4" fill="#C5D2EC"/>
<rect x="52" y="134" width="90" height="8" rx="4" fill="#C5D2EC"/>
<rect x="50" y="268" width="500" height="26" rx="8" fill="#8B6B4A"/>
<rect x="76" y="294" width="16" height="106" fill="#6F543A"/>
<rect x="508" y="294" width="16" height="106" fill="#6F543A"/>
<rect x="190" y="96" width="220" height="140" rx="10" fill="#1F2430"/>
<rect x="200" y="106" width="200" height="118" rx="4" fill="#2B6FEB"/>
<rect x="214" y="122" width="90" height="12" rx="6" fill="#FFFFFF" opacity="0.9"/>
<rect x="214" y="144" width="140" height="8" rx="4" fill="#FFFFFF" opacity="0.6"/>
<rect x="214" y="162" width="110" height="8" rx="4" fill="#FFFFFF" opacity="0.6"/>
<rect x="288" y="236" width="24" height="32" fill="#1F2430"/>
<rect x="256" y="262" width="88" height="8" rx="4" fill="#1F2430"/>
<path d="M470 268 L486 190 L520 150" stroke="#1F2430" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M500 140 L546 156 L530 188 Z" fill="#F5B400"/>
<rect x="456" y="262" width="52" height="8" rx="4" fill="#1F2430"/>
<rect x="100" y="228" width="38" height="40" rx="6" fill="#F4F4F6" stroke="#C9CCD6" stroke-width="3"/>
<path d="M138 240 q16 0 16 12 q0 12 -16 12" stroke="#C9CCD6" stroke-width="4" fill="none"/>
<path d="M330 90 q10 -34 -6 -50 M330 90 q-12 -20 -34 -20" stroke="#4E9F6B" stroke-width="0" fill="none"/>
<rect x="430" y="224" width="34" height="44" rx="5" fill="#C98B5A"/>
<path d="M447 224 q-26 -22 -10 -48 q14 18 10 48 M447 224 q22 -20 12 -44 q-18 14 -12 44" fill="#4E9F6B"/>
`);

const MOODBOARD = wrap(`
<rect width="600" height="400" fill="#F6F3EE"/>
<rect x="30" y="30" width="250" height="170" rx="10" fill="#2B6FEB"/>
<circle cx="155" cy="115" r="48" fill="#FFFFFF" opacity="0.9"/>
<rect x="300" y="30" width="130" height="80" rx="10" fill="#F5B400"/>
<rect x="446" y="30" width="124" height="80" rx="10" fill="#1F2430"/>
<rect x="300" y="126" width="270" height="74" rx="10" fill="#E8573D"/>
<rect x="30" y="216" width="150" height="154" rx="10" fill="#4E9F6B"/>
<rect x="196" y="216" width="190" height="72" rx="10" fill="#BFD3F7"/>
<rect x="196" y="298" width="190" height="72" rx="10" fill="#FFFFFF" stroke="#D9D6CF" stroke-width="3"/>
<rect x="402" y="216" width="168" height="154" rx="10" fill="#8B6B4A"/>
<path d="M430 340 L486 250 L542 340 Z" fill="#F6F3EE"/>
`);

const SKETCHBOOK = wrap(`
<rect width="600" height="400" fill="#E7E9EE"/>
<rect x="80" y="40" width="440" height="320" rx="10" fill="#FFFFFF" stroke="#C9CCD6" stroke-width="3"/>
<line x1="300" y1="40" x2="300" y2="360" stroke="#E1E3EA" stroke-width="4"/>
<rect x="116" y="82" width="150" height="100" rx="6" fill="none" stroke="#2B6FEB" stroke-width="5"/>
<path d="M130 170 L180 120 L215 150 L240 112 L252 170" stroke="#2B6FEB" stroke-width="5" fill="none" stroke-linejoin="round"/>
<line x1="116" y1="214" x2="262" y2="214" stroke="#C9CCD6" stroke-width="6" stroke-linecap="round"/>
<line x1="116" y1="240" x2="230" y2="240" stroke="#C9CCD6" stroke-width="6" stroke-linecap="round"/>
<line x1="116" y1="266" x2="250" y2="266" stroke="#C9CCD6" stroke-width="6" stroke-linecap="round"/>
<circle cx="390" cy="150" r="56" fill="none" stroke="#E8573D" stroke-width="5"/>
<path d="M356 150 Q390 100 424 150" stroke="#E8573D" stroke-width="5" fill="none"/>
<rect x="340" y="236" width="140" height="80" rx="8" fill="none" stroke="#1F2430" stroke-width="5" stroke-dasharray="14 10"/>
<path d="M470 330 L560 250 L574 264 L484 344 L462 348 Z" fill="#F5B400" stroke="#1F2430" stroke-width="4" stroke-linejoin="round"/>
`);

export const SAMPLE_IMAGES = {
  desk: uri(DESK),
  moodboard: uri(MOODBOARD),
  sketchbook: uri(SKETCHBOOK),
};
