import { useId, type CSSProperties, type ReactNode, type SVGProps } from "react";

/*
 * Every icon in the project lives here. To swap in the real Snaarp icons,
 * replace the body of an entry below (24x24 viewBox, colour via currentColor).
 */
const bodies = {
  // Product icons
  p360: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="4" fill="currentColor" />
      <path d="M7 9h10M7 12h10M7 15h6" stroke="var(--accent, #fff)" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3.5" fill="currentColor" />
      <path d="M5.5 8.5 12 13l6.5-4.5" stroke="var(--accent, #fff)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  me: (
    <>
      <path d="M3.5 6.5 5 3.5h14l1.5 3a3 3 0 0 1-5.2 1.6 3 3 0 0 1-4.6 0 3 3 0 0 1-4.6 0A3 3 0 0 1 3.5 6.5Z" fill="currentColor" />
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" fill="currentColor" />
      <path d="M13.6 13.4c-.4-.5-1-.7-1.6-.7-.9 0-1.5.5-1.5 1.2 0 1.7 3.2.9 3.2 2.6 0 .8-.7 1.3-1.7 1.3-.7 0-1.3-.3-1.7-.8" stroke="var(--accent, #fff)" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </>
  ),
  workforce: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="currentColor" />
      <circle cx="12" cy="9.8" r="2.6" fill="var(--accent, #fff)" />
      <path d="M7 17c.6-2.4 2.6-3.6 5-3.6s4.4 1.2 5 3.6" fill="var(--accent, #fff)" />
    </>
  ),
  projects: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="m8.5 12.2 2.4 2.4 4.6-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  drive: (
    <>
      <path d="M12 2.8 20 7v10l-8 4.2L4 17V7l8-4.2Z" fill="currentColor" />
      <path d="M4.5 7.3 12 11.4l7.5-4.1M12 11.4v9.3" stroke="var(--accent, #fff)" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    </>
  ),
  lock: (
    <>
      <circle cx="12" cy="12" r="9.3" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="8.2" y="11" width="7.6" height="6" rx="1.6" fill="currentColor" />
      <path d="M9.8 11V9.6a2.2 2.2 0 0 1 4.4 0V11" stroke="currentColor" strokeWidth="1.7" fill="none" />
    </>
  ),
  sendrit: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="m16.5 8-8 3.2 3 1.4 1.4 3 3.6-7.6Z" fill="currentColor" />
    </>
  ),
  verifyrit: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3.5" fill="currentColor" />
      <path d="m8.4 12.2 2.5 2.5 4.8-5" stroke="var(--accent, #fff)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  crm: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="currentColor" />
      <path d="M15.3 9.6a4 4 0 1 0 0 4.8" stroke="var(--accent, #fff)" strokeWidth="1.9" strokeLinecap="round" fill="none" />
    </>
  ),
  zeus: <path d="M4.5 3.5h14.2l-9 8h8.8L5.3 20.5l4.1-7H4.5l9-9H4.5Z" fill="currentColor" />,
  books: <path d="M7 3.5h8.6a2 2 0 0 1 2 2V20l-3-1.8-1.6 1.8-1.7-1.8L9.7 20V3.7A2 2 0 0 0 7 3.5Z" fill="currentColor" />,
  onecard: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M9 8h4a4 4 0 0 1 0 8H9V8Z" fill="currentColor" />
    </>
  ),
  pdf: (
    <>
      <path d="M8.5 20.5V9.2a4.6 4.6 0 1 1 4.6 4.6H9.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </>
  ),
  sign: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="currentColor" />
      <path d="m8 16.5 1-3.2 5.6-5.6a1.3 1.3 0 0 1 1.8 1.8l-5.6 5.6-2.8 1.4Z" fill="var(--accent, #fff)" />
    </>
  ),
  chat: (
    <>
      <path d="M13.5 3.5h4a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-1.2l-2.3 2.3v-2.3" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
      <path d="M6.5 8.5h6a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H10l-3.2 3v-3H6.5a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
    </>
  ),
  video: (
    <>
      <rect x="2.5" y="6.5" width="13" height="11" rx="3" fill="currentColor" />
      <path d="m16.5 10.5 5-2.6v8.2l-5-2.6v-3Z" fill="currentColor" />
    </>
  ),
  shield: (
    <path d="M12 3.2 19 6v5.6c0 4.3-2.8 7.4-7 9.2-4.2-1.8-7-4.9-7-9.2V6l7-2.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
  ),

  // Interface icons
  chevronDown: <path d="m6 9.5 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9S14.6 18.4 12 21c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3Z" stroke="currentColor" strokeWidth="1.4" fill="none" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  sidebar: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="3" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M9.5 4.5v15" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
  x: <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  replay: (
    <>
      <path d="M4.5 12a7.5 7.5 0 1 0 2.4-5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M4.5 4.5v4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  pause: <path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />,
  play: <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  logoMark: (
    <>
      <rect x="1" y="1" width="22" height="22" rx="6.5" fill="currentColor" />
      <path d="M6.5 13.4c1.2-3.6 3.4-5 5-3.2 1.4 1.7 1.4 3.9 3 4.2 1.4.3 2.3-.8 2.9-2.6" stroke="var(--accent, #fff)" strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ),

  // Sign-up scene: big logo, orbit tiles, form icons
  logoLoop: (
    <>
      <path d="M5.8 13.2C5 9.3 8 6 12 6c2.3 0 4 1 5 2.6M17.4 4.8v4.2h-4.2" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M18.2 10.8c.8 3.9-2.2 7.2-6.2 7.2-2.3 0-4-1-5-2.6M6.6 19.2V15h4.2" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  oMail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3.2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="m4.5 8.5 7.5 5.2 7.5-5.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  oStack: (
    <>
      <rect x="5" y="3.8" width="14" height="4.4" rx="2.2" fill="currentColor" />
      <rect x="3.5" y="9.8" width="17" height="4.4" rx="2.2" fill="currentColor" />
      <rect x="5" y="15.8" width="14" height="4.4" rx="2.2" fill="currentColor" />
    </>
  ),
  oShop: (
    <>
      <path d="M4 8.6 5.4 4.5h13.2L20 8.6a2.6 2.6 0 0 1-4.7 1.2 2.6 2.6 0 0 1-4.6 0A2.6 2.6 0 0 1 4 8.6Z" fill="currentColor" />
      <path d="M5.5 12v7a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5v-7" stroke="currentColor" strokeWidth="1.9" fill="none" />
      <path d="M14 14.4c-.5-.6-1.2-.8-2-.8-1 0-1.7.5-1.7 1.3 0 1.9 3.8 1 3.8 2.9 0 .9-.8 1.4-1.9 1.4-.8 0-1.5-.3-2-.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </>
  ),
  oCycle: (
    <>
      <circle cx="12" cy="12" r="8.6" stroke="currentColor" strokeWidth="1.9" fill="none" />
      <path d="M15.6 9.2a4.2 4.2 0 1 0 0 5.6" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" fill="none" />
    </>
  ),
  oDoc: (
    <>
      <path d="M6.5 3.5h7.8L19.5 8.7V18a2.5 2.5 0 0 1-2.5 2.5H6.5A2.5 2.5 0 0 1 4 18V6a2.5 2.5 0 0 1 2.5-2.5Z" fill="currentColor" />
      <path d="M9 14.5h6M9 11h3.2" stroke="#8a4cf0" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  sparkle: <path d="M12 3.5 13.8 10 20.5 12 13.8 14 12 20.5 10.2 14 3.5 12 10.2 10 12 3.5Z" fill="currentColor" />,
  magic: (
    <>
      <path d="m4.8 19.2 9.2-9.2" stroke="#C9822B" strokeWidth="2.6" strokeLinecap="round" />
      <path d="m15.4 3.8.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" fill="#F5B93B" />
      <path d="m19.6 12.2.5 1.2 1.2.5-1.2.5-.5 1.2-.5-1.2-1.2-.5 1.2-.5.5-1.2Z" fill="#9B5CF6" />
      <circle cx="8.2" cy="6.2" r="1.2" fill="#E5598B" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
      <circle cx="12" cy="12" r="2.7" stroke="currentColor" strokeWidth="1.7" fill="none" />
    </>
  ),
  grid4: (
    <>
      <rect x="4.5" y="4.5" width="6" height="6" rx="1.7" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <rect x="13.5" y="4.5" width="6" height="6" rx="1.7" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <rect x="4.5" y="13.5" width="6" height="6" rx="1.7" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <rect x="13.5" y="13.5" width="6" height="6" rx="1.7" stroke="currentColor" strokeWidth="1.7" fill="none" />
    </>
  ),
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="m8 12.4 2.6 2.6 5.4-5.6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  // Products home: glyphs for white-on-purple tiles (set --accent for the cut-outs)
  sheets: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="3.2" fill="currentColor" />
      <path d="M4 9h16M10 9v11.5M4 14.7h16" stroke="var(--accent, #fff)" strokeWidth="1.5" />
    </>
  ),
  slides: (
    <>
      <rect x="3.5" y="4.5" width="17" height="12" rx="2.6" fill="currentColor" />
      <path d="M12 16.5v3.2M8.5 20h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m10 8 5 2.5-5 2.5Z" fill="var(--accent, #fff)" />
    </>
  ),
  docsStack: (
    <>
      <path d="M4.5 6.5 10.5 5v14l-6 1.5Z" fill="currentColor" opacity=".45" />
      <path d="M8.2 5.7 14.2 4.2v14.2l-6 1.5Z" fill="currentColor" opacity=".72" />
      <path d="M11.8 5 19.5 3.5v14L11.8 19Z" fill="currentColor" />
    </>
  ),
  meCal: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3.6" fill="currentColor" />
      <path d="M8 3v3.2M16 3v3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M3.5 9.2h17" stroke="var(--accent, #fff)" strokeWidth="1.4" />
      <path d="M14.2 12.9c-.5-.6-1.2-.9-2.1-.9-1.1 0-1.9.6-1.9 1.4 0 2.2 4.2 1.1 4.2 3.3 0 1-.9 1.6-2.3 1.6-.9 0-1.7-.3-2.2-1" stroke="var(--accent, #fff)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </>
  ),

  // Admin portal (outline icons, colour via currentColor)
  menu: <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />,
  users: (
    <>
      <circle cx="9" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
      <circle cx="17" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M16.2 14.4c2.4 0 3.9 1.4 4.5 4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2.2" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M9 8h2M13 8h2M9 12h2M13 12h2M10.2 20.5v-4h3.6v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </>
  ),
  layers: (
    <>
      <path d="m12 4 8.5 4.5L12 13 3.5 8.5 12 4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
      <path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.6" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
  bug: (
    <path d="M9 7.5a3 3 0 0 1 6 0M7 11h10v3a5 5 0 0 1-10 0v-3ZM12 11v8M4 11l3 1M20 11l-3 1M4.5 18l2.8-1.5M19.5 18l-2.8-1.5M5 7l2.5 2M19 7l-2.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  bell: <path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 1.5h-15L6 16.5ZM10 20.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  help: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M9.6 9.6a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1.1.9-1.1 1.7M12 16.9h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15.5" r="3.5" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="m10.6 12.9 8-8M15.6 7.9l2.5 2.5M13.2 10.3l2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </>
  ),
  inbox: (
    <>
      <path d="M4 13.5 6.5 5.5h11L20 13.5V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18v-4.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
      <path d="M4 13.5h4.5a3.5 3.5 0 0 0 7 0H20" stroke="currentColor" strokeWidth="1.7" fill="none" />
    </>
  ),
  padlock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
    </>
  ),
  storage: (
    <>
      <rect x="3.5" y="14" width="17" height="6.5" rx="2" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="m5.5 14 2-9h9l2 9" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
    </>
  ),
  // Domain management
  plus: <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  download: <path d="M12 4v11M7.5 11 12 15.5 16.5 11M5 19.5h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  refresh: (
    <>
      <path d="M20 12a8 8 0 1 1-2.5-5.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M20 4.2v4.3h-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  send: <path d="M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5 21 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  warning: <path d="M12 4 21.5 20h-19L12 4ZM12 10v4.5M12 17.4h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2.2" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M15.5 8.5V6.2a2.2 2.2 0 0 0-2.2-2.2H6.2A2.2 2.2 0 0 0 4 6.2v7.1a2.2 2.2 0 0 0 2.2 2.2h2.3" stroke="currentColor" strokeWidth="1.7" fill="none" />
    </>
  ),
  dots: (
    <>
      <circle cx="12" cy="5.5" r="1.7" fill="currentColor" />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" />
      <circle cx="12" cy="18.5" r="1.7" fill="currentColor" />
    </>
  ),
  pencil: <path d="M4 20h4L19.2 8.8a2.8 2.8 0 0 0-4-4L4 16v4ZM13.5 6.5l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  cloud: <path d="M7 18a4.5 4.5 0 0 1-.6-9 5.5 5.5 0 0 1 10.6 1.2A3.9 3.9 0 0 1 17 18H7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />,
  star: <path d="m12 3.8 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.2 6.8 19.9l1-5.8-4.3-4.1 5.9-.9L12 3.8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />,
  trash: <path d="M5 7h14M10 7V4.5h4V7M7 7l1 13h8l1-13M10.5 11v5.5M13.5 11v5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  // User management
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.4" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M5 20c.7-3.6 3.5-5.6 7-5.6s6.3 2 7 5.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </>
  ),
  userX: (
    <>
      <circle cx="9.5" cy="8.5" r="3.2" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M3.5 19.5c.6-3.3 2.9-5.1 6-5.1 1.2 0 2.2.3 3.1.7M16.5 10.5l4.5 4.5M21 10.5 16.5 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </>
  ),
  userCheck: (
    <>
      <circle cx="9.5" cy="8.5" r="3.2" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M3.5 19.5c.6-3.3 2.9-5.1 6-5.1 1.2 0 2.2.3 3.1.7M15.5 13.2l2 2 3.6-3.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  upload: <path d="M12 15.5V4.5M7.5 9 12 4.5 16.5 9M5 19.5h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  ban: (
    <>
      <circle cx="12" cy="12" r="8.8" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="m6 6 12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.8" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M5 6v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6M5 12v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6" stroke="currentColor" strokeWidth="1.7" fill="none" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3M6 6l2.1 2.1M15.9 15.9 18 18M18 6l-2.1 2.1M8.1 15.9 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  orgChart: (
    <>
      <rect x="9" y="3.5" width="6" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <rect x="2.8" y="15.5" width="6" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <rect x="15.2" y="15.5" width="6" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M12 8.5v3.5M5.8 15.5V12h12.4v3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  userPlus: (
    <>
      <circle cx="9.5" cy="8.5" r="3.2" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M3.5 19.5c.6-3.3 2.9-5.1 6-5.1 1.2 0 2.2.3 3.1.7M18 10v6M15 13h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </>
  ),
  circleTick: (
    <>
      <path d="M20.6 11.2A8.8 8.8 0 1 1 15.8 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
      <path d="m8.5 11.6 3.4 3.4L20.5 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </>
  ),
  circleX: (
    <>
      <circle cx="12" cy="12" r="8.8" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="m9 9 6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </>
  ),
  circleCheck: (
    <>
      <circle cx="12" cy="12" r="8.8" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="m8.2 12.3 2.6 2.6 5-5.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  arrowUpCircle: (
    <>
      <circle cx="12" cy="12" r="8.8" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M12 16.5v-9M8.3 11 12 7.3l3.7 3.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  // Cloudflare dashboard illustration (our own simple outline icons, not Cloudflare's artwork)
  csvFile: (
    <>
      <path d="M7 3.5h7l4.5 4.5v11.5a1 1 0 0 1-1 1h-10.5a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" fill="currentColor" />
      <text x="12" y="17.2" fontSize="5" fontWeight="700" textAnchor="middle" fill="var(--accent, #fff)">CSV</text>
    </>
  ),
  googleG: <path d="M19 12.3h-6.7M18.6 12.3c0 3.7-2.6 6.4-6.4 6.4a6.7 6.7 0 1 1 4.6-11.6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" fill="none" />,
  cfCloud: <path d="M7.2 18.5a4.2 4.2 0 0 1-.4-8.4 5.6 5.6 0 0 1 10.7 1.6 3.4 3.4 0 0 1-.5 6.8H7.2Z" fill="currentColor" />,
  cfOverview: (
    <>
      <rect x="4.5" y="5.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M9 5.5V4h6v1.5M8.5 11h7M8.5 14.5h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  cfAnalytics: (
    <>
      <path d="M11 5a8 8 0 1 0 8 8h-8V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <path d="M14 3.5A7.5 7.5 0 0 1 20.5 10H14V3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
    </>
  ),
  cfDns: (
    <>
      <rect x="9.5" y="3.5" width="5" height="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="3" y="16.5" width="5" height="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="9.5" y="16.5" width="5" height="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="16" y="16.5" width="5" height="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M12 7.5v9M5.5 16.5V12h13v4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </>
  ),
  cfEmail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="m4 7.5 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  cfSsl: (
    <>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </>
  ),
  cfFirewall: <path d="M12 3.5 5 6v5.5c0 4.2 2.8 7.4 7 9 4.2-1.6 7-4.8 7-9V6l-7-2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />,
  cfAccess: <path d="M3.5 12h10M10 8l4 4-4 4M16.5 5.5h4v13h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  cfSpeed: <path d="M13 3.5 6 13h5l-1 7.5 7-9.5h-5l1-7.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />,
  cfCaching: (
    <>
      <rect x="4" y="4.5" width="16" height="6" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <rect x="4" y="13.5" width="16" height="6" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M7.5 7.5h.01M7.5 16.5h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  cfWorkers: <path d="M9 7.5 4.5 12 9 16.5M15 7.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  cfRules: <path d="M4 5.5h16l-6 7v6l-4-2v-4l-6-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />,
  cfNetwork: (
    <>
      <path d="M12 21s6-5.4 6-10.5a6 6 0 1 0-12 0C6 15.6 12 21 12 21Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <circle cx="12" cy="10.5" r="2.2" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </>
  ),
  cfTraffic: (
    <>
      <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="18" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="18" cy="17.5" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="m7.8 11 8.4-3.5M7.8 13l8.4 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </>
  ),
  cfPages: <path d="M14.5 5.5a4 4 0 0 0-5 5l-5 5a1.8 1.8 0 0 0 2.5 2.5l5-5a4 4 0 0 0 5-5l-2.5 2.5-2.5-.5-.5-2.5 2.5-2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />,
  cfApps: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <circle cx="12" cy="12" r="3.3" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </>
  ),
  cfPlusCircle: (
    <>
      <circle cx="12" cy="12" r="8.5" fill="currentColor" />
      <path d="M12 8v8M8 12h8" stroke="var(--accent, #fff)" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  cfList: <path d="M9 7h10M9 12h10M9 17h10M5 7h.01M5 12h.01M5 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  cfUser: (
    <>
      <circle cx="12" cy="12" r="9" fill="currentColor" />
      <circle cx="12" cy="9.8" r="3" fill="var(--accent, #fff)" />
      <path d="M6.3 18c.9-2.4 3-3.6 5.7-3.6s4.8 1.2 5.7 3.6" fill="var(--accent, #fff)" />
    </>
  ),
  // Snaarp Doc
  sun: (
    <>
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.5 1.5M16.5 16.5 18 18M18 6l-1.5 1.5M7.5 16.5 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  docFile: (
    <>
      <path d="M7 3.5h6.5L18 8v11.5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <path d="M13.5 3.5V8H18M9 12.5h6M9 15.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  folder: <path d="M3.5 6.5a1.5 1.5 0 0 1 1.5-1.5h4l2 2.5h8a1.5 1.5 0 0 1 1.5 1.5v8.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />,
  listView: <path d="M9 7h11M9 12h11M9 17h11M4.5 7h.01M4.5 12h.01M4.5 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  restore: (
    <>
      <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M4 4.5v4.2h4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  logout: <path d="M9 4.5H6a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 6 19.5h3M14 8l4 4-4 4M18 12H9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  chevronLeft: <path d="m14.5 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  adminSquare: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor" />
      <path d="m9 12.2 2.2 2.2 4-4.4" stroke="var(--accent, #fff)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  // Snaarp Doc editor
  hexMark: (
    <>
      <path d="M5.5 7.8 12.2 4v13.2L5.5 14V7.8Z" fill="#6D1FD9" />
      <path d="M8.5 7.4 15 3.8v13.2l-6.5-3.3V7.4Z" fill="#B9A0F2" />
      <path d="M11.6 7 18.5 4.3v13.4L12 21l-.4-.2V7Z" fill="#DDD1FA" />
    </>
  ),
  edUndo: <path d="M9 4 4.5 8.5 9 13M5 8.5h8.5a5 5 0 0 1 0 10H10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  edRedo: <path d="m15 4 4.5 4.5L15 13M19 8.5h-8.5a5 5 0 0 0 0 10H14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  edPrint: (
    <>
      <path d="M7 9V4h10v5M7 17H4.5v-8h15v8H17" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
      <rect x="7" y="14" width="10" height="6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
    </>
  ),
  edPaintFormat: <path d="m5 18.5 3.5.5L20 7.5 16.5 4 5 15.5v3ZM13 7.5l3.5 3.5M12 20h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  edZoom: (
    <>
      <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="m15 15 5 5M10.5 8v5M8 10.5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  edMinus: <path d="M7 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  edBold: <path d="M7 4.5h5.5a3.5 3.5 0 0 1 0 7H7M7 11.5h6.5a3.5 3.5 0 0 1 0 8H7v-15Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" fill="none" />,
  edItalic: <path d="M10 4.5h8M6 19.5h8M14.5 4.5l-5 15" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" fill="none" />,
  edUnderline: <path d="M7 4.5v7a5 5 0 0 0 10 0v-7M5 20h14" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" fill="none" />,
  edTextColor: <path d="m6 15 6-12 6 12M8.2 11h7.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  edHighlight: <path d="m5 13 8-9 5 4.5-7.5 8.5H7.5L5 13ZM13 4l5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  edLink: <path d="M10 14a4 4 0 0 0 5.7 0l3.3-3.3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0L5 13.3A4 4 0 0 0 10.7 19l1-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />,
  edImage: (
    <>
      <rect x="4" y="4.5" width="16" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <circle cx="9" cy="9.5" r="1.5" fill="currentColor" />
      <path d="m5 17 4.5-4.5 3 3 2.5-2.5L19.5 17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  edAlignL: <path d="M5 6.5h14M5 10.5h9M5 14.5h14M5 18.5h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  edAlignC: <path d="M5 6.5h14M7.5 10.5h9M5 14.5h14M7.5 18.5h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  edAlignR: <path d="M5 6.5h14M10 10.5h9M5 14.5h14M10 18.5h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  edAlignJ: <path d="M5 6.5h14M5 10.5h14M5 14.5h14M5 18.5h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  edLineSpacing: <path d="M8 5v14M5 8l3-3 3 3M5 16l3 3 3-3M14 7h6M14 12h6M14 17h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  edBullets: <path d="M10 7h10M10 12h10M10 17h10M5 7h.01M5 12h.01M5 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  edNumbers: <path d="M11 7h9M11 12h9M11 17h9M4.5 6l1.5-1v4M4.5 14.5h3l-3 3h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  edIndent: <path d="M4.5 5.5h15M12 10h7.5M12 14.5h7.5M4.5 19h15M4.5 9l3 3-3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  edOutdent: <path d="M4.5 5.5h15M12 10h7.5M12 14.5h7.5M4.5 19h15M7.5 9l-3 3 3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  edStrike: <path d="M5 12h14M16.5 7a4.5 3.2 0 0 0-4.5-2.2c-2.5 0-4 1.2-4 2.9 0 1.4 1 2.2 4 2.8M8 17a4.5 3.2 0 0 0 4.5 2.2c2.5 0 4-1.2 4-2.9 0-.7-.3-1.2-.8-1.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />,
  edSup: <path d="m4.5 9 8 9M12.5 9l-8 9M16 4.5c1-.9 3.5-.9 3.5.8 0 1.3-3.5 2.2-3.5 3.7h3.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  edSub: <path d="m4.5 6 8 9M12.5 6l-8 9M16 14c1-.9 3.5-.9 3.5.8 0 1.3-3.5 2.2-3.5 3.7h3.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  edQuote: <path d="M5 6h5.5v6c0 3-1.5 5-4.5 5.5M13.5 6H19v6c0 3-1.5 5-4.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  edHr: <path d="M6 12h12" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />,
  edTable: (
    <>
      <rect x="4" y="4.5" width="16" height="15" rx="1.8" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M4 9.5h16M4 14.5h16M9.5 4.5v15M14.5 4.5v15" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  edFullscreen: <path d="M4.5 9V4.5H9M15 4.5h4.5V9M19.5 15v4.5H15M9 19.5H4.5V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  edPen: <path d="m15 5.5 3.5 3.5L8 19.5l-4.5 1 1-4.5L15 5.5ZM13.5 7l3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  edPenTag: (
    <>
      <path d="m13.5 4.5 3.5 3.5-8 8-4 .5.5-4 8-8Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="m14 15 3-.5 3.5 3.5-3 3-3.5-3.5L14 15Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
    </>
  ),
  edEmoji: (
    <>
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M9 14.2a4 4 0 0 0 6 0M9.2 9.8h.01M14.8 9.8h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  edSignature: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M7 15.5c1.5-3 3-3 3.5-1s1.5 1 2.5-1M15 15.5h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </>
  ),
  edComment: <path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 3.5V16.5H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />,
  edHistory: (
    <>
      <path d="M4.5 12a7.5 7.5 0 1 0 2.4-5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
      <path d="M4.5 4.5v4h4M12 8v4.5l3 1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  edCamera: (
    <>
      <rect x="3.5" y="7" width="12" height="10" rx="2.2" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="m15.5 11 5-2.5v7L15.5 13" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
    </>
  ),
  edSave: (
    <>
      <path d="M5 4.5h11l3.5 3.5v10.5a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <path d="M8 4.5v4.5h7V4.5M8 19.5v-6h8v6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
    </>
  ),
  edShare: (
    <>
      <circle cx="17.5" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <circle cx="6.5" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <circle cx="17.5" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="m8.6 10.8 6.8-3.6M8.6 13.2l6.8 3.6" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </>
  ),
  edSuggest: (
    <>
      <rect x="4" y="4.5" width="16" height="15" rx="2.2" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M12 8.5v7M8.5 12h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  // Snaarp Doc file menu
  chevronRight: <path d="m9.5 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  fmNew: (
    <>
      <path d="M7 3.5h6.5L18 8v11.5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <path d="M12 11v6M9 14h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  fmOpen: <path d="M3.5 7a1.5 1.5 0 0 1 1.5-1.5h4l2 2.5h7.5A1.5 1.5 0 0 1 20 9.5V10M3.5 7v10.5A1.5 1.5 0 0 0 5 19h12.5l2.4-7.5a1 1 0 0 0-1-1.3H8.2L5.5 19" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" fill="none" />,
  fmEmail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="m4 7.5 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  fmDrive: (
    <>
      <path d="M4 14.5 6.5 6h11L20 14.5v3.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <path d="M4 14.5h16M16 16.7h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  fmMove: (
    <>
      <path d="M3.5 7a1.5 1.5 0 0 1 1.5-1.5h4l2 2.5h8A1.5 1.5 0 0 1 20.5 9.5v8A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5V7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <path d="M9 13.5h6M12.5 11l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  fmInfo: (
    <>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  // Snaarp Doc Edit menu
  emCut: (
    <>
      <circle cx="7" cy="17.5" r="2.6" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <circle cx="17" cy="17.5" r="2.6" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="m8.5 15.3 8-11M15.5 15.3l-8-11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  emPaste: (
    <>
      <path d="M8.5 5.5h-2a1.5 1.5 0 0 0-1.5 1.5v11.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V7a1.5 1.5 0 0 0-1.5-1.5h-2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <rect x="8.5" y="3.5" width="7" height="4" rx="1.2" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </>
  ),
  emPastePlain: (
    <>
      <path d="M8.5 5.5h-2a1.5 1.5 0 0 0-1.5 1.5v11.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V7a1.5 1.5 0 0 0-1.5-1.5h-2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <rect x="8.5" y="3.5" width="7" height="4" rx="1.2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M8.5 12h7M12 12v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  emSelectAll: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2.4" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="m8.5 12.2 2.6 2.6 4.6-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  // Snaarp Doc View menu, Comments and Outline panels
  vmOutline: (
    <>
      <rect x="4" y="4.5" width="16" height="15" rx="2.2" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M9.5 4.5v15" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
  vmRuler: (
    <>
      <path d="m4.5 15.5 10-10 4 4-10 10-4-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <path d="m8 12 1.6 1.6M10.5 9.5l1.6 1.6M13 7l1.6 1.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  cmEmpty: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M7.5 10h9M7.5 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  // Snaarp Doc Insert menu
  imBreak: (
    <>
      <path d="M7 3.5h6.5L18 8v2.5M6 10.5v-6M18 14v5.5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M13.5 3.5V8H18M3.5 12.2h2M9 12.2h2M13 12.2h2M18.5 12.2h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  imBookmark: <path d="M7 4.5h10a1 1 0 0 1 1 1v14l-6-4.2-6 4.2v-14a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />,
  imChecklist: (
    <>
      <path d="M19.5 12v5.5a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2H14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
      <path d="m8.5 11.5 3 3 8-8.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  imCode: <path d="m8.5 7.5-5 4.5 5 4.5M15.5 7.5l5 4.5-5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  imDrawing: (
    <>
      <path d="m14.5 4.5 5 5-9 9H5.5v-5l9-9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <path d="M4 20.5c2-1 3.5-1 4.5 0s2.5 1 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </>
  ),
  // Snaarp Doc Format menu
  fmText: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M9.5 8h3.2a2 2 0 0 1 0 4H9.5M9.5 12h3.7a2 2 0 0 1 0 4H9.5V8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" fill="none" />
    </>
  ),
  fmHeading: <path d="M6 5v14M18 5v14M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  fmAlign: <path d="M4.5 6.5h15M4.5 11h9M4.5 15.5h15M4.5 20h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />,
  fmList: <path d="M9 6.5h11M9 12h11M9 17.5h11M4 6.5h1.5M4 12h1.5M4 17.5h1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  fmHeaderFooter: (
    <>
      <path d="M7 3.5h6.5L18.5 8.5v10a1.5 1.5 0 0 1-1.5 1.5H7a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 7 3.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
      <path d="M8.5 11h7M8.5 16h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  fmHash: <path d="M9.5 4 8 20M16 4l-1.5 16M4.5 9h15M4 15h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  fmOrientation: <rect x="3.5" y="7" width="17" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />,
  fmColumns: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
  // Tools menu
  tlSpell: (
    <>
      <path d="m3.5 15.5 4.2-10.5 4.2 10.5M5.2 11.5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="m13.5 17 3 3 5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  tlWordCount: (
    <>
      <path d="M6 10.5V4.5A1.5 1.5 0 0 1 7.5 3H14l4.5 4.5v11a1.5 1.5 0 0 1-1.5 1.5h-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <ellipse cx="7.3" cy="16" rx="1.9" ry="2.7" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M12.5 13.5v5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  tlDictionary: (
    <path
      d="M12 6.5C10 5 7 4.5 3.5 5v12.5c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5ZM12 6.5V19"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  tlAccess: (
    <>
      <circle cx="12" cy="4.8" r="1.8" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M5 8.5c4.5 1.5 9.5 1.5 14 0M12 9.5v4M12 13.5 8.5 20M12 13.5l3.5 6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  // eSignature menu
  esHistory: (
    <>
      <path d="M6.5 11.5V4.5A1.5 1.5 0 0 1 8 3h6.5L19 7.5V10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="14.5" cy="16.8" r="4.3" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="M14.5 14.6v2.4l1.5 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M6.5 14.5h3M6.5 17.5h1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  // Snaarp Slides: toolbar tools, right-hand rail, home and dialogs
  slHome: (
    <path d="M4 11 12 4l8 7v8.2a.8.8 0 0 1-.8.8H15v-5.5H9V20H4.8a.8.8 0 0 1-.8-.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
  ),
  slSelect: (
    <path d="M5 4.5 19 10.2l-6.2 2.2-2.4 6.3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
  ),
  slText: <path d="M5 6.5V5h14v1.5M12 5v14M9 19h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  slShape: <rect x="5" y="5" width="14" height="14" rx="2.4" stroke="currentColor" strokeWidth="1.8" fill="none" />,
  slLine: <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  slRailImage: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2.4" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <circle cx="9" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="m5 17 4.5-4.5 3.2 3 2.3-2.2L19 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  slRailTemplates: (
    <>
      <rect x="4" y="4.5" width="16" height="4.5" rx="1.3" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <rect x="4" y="11.5" width="7" height="8" rx="1.3" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <rect x="13.5" y="11.5" width="6.5" height="8" rx="1.3" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </>
  ),
  slRailBlocks: (
    <>
      <rect x="4" y="9" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M8.5 6V5a1.5 1.5 0 0 1 1.5-1.5h8A1.5 1.5 0 0 1 19.5 5v8a1.5 1.5 0 0 1-1.5 1.5h-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </>
  ),
  slRailMedia: (
    <>
      <rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M5 9h14M5 15h14M9.5 4v16" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
  slRailUpload: (
    <>
      <path d="M5 15v3a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 18v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M12 15V5m-3.5 3.5L12 5l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  slRailConvert: (
    <>
      <rect x="4" y="6" width="16" height="12" rx="2.2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="m10 9.5 4.5 2.5-4.5 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    </>
  ),
  slDrive: (
    <>
      <path d="M4.5 13.5 7 6.5a1.5 1.5 0 0 1 1.4-1h7.2a1.5 1.5 0 0 1 1.4 1l2.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <rect x="3.5" y="13.5" width="17" height="5.5" rx="1.8" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M7.5 16.3h.01M10.5 16.3h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  slMonitor: (
    <>
      <rect x="3.5" y="4.5" width="17" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M9 20h6M12 16v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  slFilePptx: (
    <>
      <path d="M6.5 3.5h7L18 8v11.5a1 1 0 0 1-1 1H6.5a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <path d="M13.5 3.5V8H18" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M9.5 17v-5h2a1.6 1.6 0 0 1 0 3.2h-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  slPublish: (
    <>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 3.4 5.2 3.4 8.5s-1 6.1-3.4 8.5c-2.4-2.4-3.4-5.2-3.4-8.5S9.6 5.9 12 3.5Z" stroke="currentColor" strokeWidth="1.4" fill="none" />
    </>
  ),
  // Snaarp Sheets (File menu, toolbar, header)
  shImport: <path d="M4 12h11M11.5 7.5 16 12l-4.5 4.5M20 5v14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  shShare: (
    <>
      <circle cx="9.5" cy="8.5" r="3.2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M3.5 19c.4-3 2.7-4.8 6-4.8M17.5 12v6M14.5 15h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </>
  ),
  shShortcut: <path d="M7 4.5h10a1 1 0 0 1 1 1v14l-6-3.8L6 19.5v-14a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />,
  shOffline: (
    <>
      <path d="M7 17.5a4.2 4.2 0 0 1-.4-8.4 5.4 5.4 0 0 1 10.3 1.3A3.6 3.6 0 0 1 17 17.5H7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <path d="m9.5 12.5 1.8 1.8 3.2-3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  shGear: (
    <>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  shHelp: (
    <>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M9.6 9.6a2.5 2.5 0 1 1 3.6 2.2c-.8.5-1.2 1-1.2 1.9M12 16.6h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </>
  ),
  shGrid: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M4 9.3h16M4 14.7h16M9.3 4v16M14.7 4v16" stroke="currentColor" strokeWidth="1.3" />
    </>
  ),
  shSearch: (
    <>
      <circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path d="m15 15 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  shFilter: <path d="M4.5 5.5h15L14 12.5v6l-4-2v-4l-5.5-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />,
  shSigma: <path d="M17.5 5.5h-11l5.5 6.5-5.5 6.5h11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  shChart: <path d="M5 19.5v-6M10 19.5v-11M15 19.5v-8M20 19.5V6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />,
  shAlignV: <path d="M5 5.5h14M5 18.5h14M8.5 15V9M12 15V9M15.5 15V9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />,
  shWrap: <path d="M4.5 6.5h15M4.5 12h11a2.5 2.5 0 0 1 0 5H12M14 14.8 11.8 17l2.2 2.2M4.5 17.5H8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  shRotate: <path d="M18.5 12a6.5 6.5 0 1 1-2-4.7M18.5 5v3.6h-3.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  shMerge: <path d="M4.5 6.5v11M19.5 6.5v11M8 12h8M10.2 9.8 8 12l2.2 2.2M13.8 9.8 16 12l-2.2 2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  shFile: (
    <>
      <path d="M7 3.5h7l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <path d="M9 12h6M9 15.5h6M12 10v7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  shFolderOutline: <path d="M3.5 7a1.5 1.5 0 0 1 1.5-1.5h4l2 2.5h8A1.5 1.5 0 0 1 20.5 9.5v8A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5V7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />,
  shSharedDrive: (
    <>
      <rect x="4" y="9" width="16" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M8 9V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M8 14h.01M12 14h.01M16 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </>
  ),
  shComputer: (
    <>
      <rect x="3.5" y="5" width="17" height="11" rx="1.6" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M9 20h6M12 16v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  shLink: <path d="M10 14a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-.8.8M14 10a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l.8-.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />,
  shGlobe: (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M4 12h16M12 4c2.2 2.2 3.2 4.9 3.2 8s-1 5.8-3.2 8c-2.2-2.2-3.2-4.9-3.2-8S9.8 6.2 12 4Z" stroke="currentColor" strokeWidth="1.3" fill="none" />
    </>
  ),
  shSheetFile: (
    <>
      <path d="M7 3.5h7l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M9 12.5h6M9 16h6M12 10v8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof bodies;

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 20, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {bodies[name]}
    </svg>
  );
}

/*
 * Real Snaarp product logos (purple tiles with a white glyph), served from /public/logos.
 * To change a logo, replace its file there. Used where the real logo should show, e.g. the pricing page.
 */
export const PRODUCT_LOGOS = [
  "360", "mail", "me", "workforce", "projects", "drive", "lock", "sendrit", "verifyrit", "crm",
  "zeus", "books", "onecard", "pdf", "sign", "teams", "meet", "sheet", "presentation", "docs", "snaarp",
] as const;
export type LogoName = (typeof PRODUCT_LOGOS)[number];

export function ProductLogo({
  name,
  size = 24,
  className = "",
  style,
}: {
  name: LogoName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/logos/${name}.svg`} width={size} height={size} alt="" draggable={false} className={`block shrink-0 ${className}`} style={style} />
  );
}

/** Dark arrow with a white outline. The tip sits at the svg's top-left corner. */
export function CursorArrow({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 20 24" aria-hidden="true" style={{ display: "block", overflow: "visible" }}>
      <path
        d="M1.2 1.2v17.4l4.6-4.3 3.1 7.2 3.4-1.5-3.1-7 6.3-.2L1.2 1.2Z"
        fill="#111"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** United Kingdom flag (Union Jack), drawn on a 3:2 box so it sits where the old flag did. */
export function FlagGB({ width = 18 }: { width?: number }) {
  const id = useId();
  const box = `${id}-box`;
  const cross = `${id}-cross`;
  return (
    <svg width={width} height={width * 0.67} viewBox="0 0 60 40" aria-hidden="true" style={{ display: "block", borderRadius: 2 }}>
      <clipPath id={box}>
        <path d="M0 0h60v40H0z" />
      </clipPath>
      <clipPath id={cross}>
        <path d="M30 20h30v20zv20H0V20zH0V0h30zV0h30z" />
      </clipPath>
      <g clipPath={`url(#${box})`}>
        <path d="M0 0h60v40H0z" fill="#012169" />
        <path d="M0 0l60 40M60 0L0 40" stroke="#fff" strokeWidth="8" />
        <path d="M0 0l60 40M60 0L0 40" clipPath={`url(#${cross})`} stroke="#C8102E" strokeWidth="5" />
        <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="13" />
        <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="8" />
      </g>
    </svg>
  );
}
