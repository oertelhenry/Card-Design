import React, { useMemo, useState } from 'react';

/*
  Showroom Studio — Virtual Showroom Builder & Panorama Stitching
  Pixel-for-pixel React template rebuilt from the 360.mp4 walkthrough.

  Self-contained: no UI packages, no external assets. Every photo slot is a
  tinted placeholder driven by the `tone` key — drop a real URL into the
  `src` field of any record in the DATA block below and it renders instead.

  Reference geometry (the recording was captured at a 1434px-wide viewport):
    sidebar 263px · topbar 73px · content padding 32px · card radius 14px
    stat card 259x196 with an 18px gutter · content gutter 24px
*/

/* ----------------------------------------------------------------- icons */

const PATHS = {
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2.6" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5Z" /></>,
  grid: <><rect x="3" y="3" width="18" height="18" rx="2.5" /><path d="M3 9h18M9 9v12" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="m3 16 5-4 4 3 3-2 6 5" /><circle cx="8.5" cy="9" r="1.4" /></>,
  chart: <><path d="M3 20h18" /><path d="m5 15 4-5 3.5 3L20 6" /></>,
  users: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-1.5a6 6 0 0 1 12 0V20M16.5 5.3a3 3 0 0 1 0 5.4M18 14.4a5 5 0 0 1 3 4.6V20" /></>,
  gear: <><circle cx="12" cy="12" r="3.2" /><path d="M19.4 14.6a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z" /></>,
  database: <><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>,
  layers: <><path d="m12 3 9 4.5-9 4.5-9-4.5Z" /><path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 2.5 15 0 18-2.5-3-2.5-15.4 0-18Z" /></>,
  eye: <><path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12Z" /><circle cx="12" cy="12" r="2.8" /></>,
  timer: <><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.6 1.6M9 2h6" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  chevronRight: <path d="m9 5 7 7-7 7" />,
  chevronLeft: <path d="m15 5-7 7 7 7" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  selector: <path d="m8 9 4-4 4 4M8 15l4 4 4-4" />,
  arrowRight: <><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></>,
  arrowLeft: <><path d="M20 12H5" /><path d="m11 6-6 6 6 6" /></>,
  arrowUp: <><path d="M12 20V5" /><path d="m6 11 6-6 6 6" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></>,
  bell: <><path d="M18 9a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7" /><path d="M13.7 20a2 2 0 0 1-3.4 0" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.6 9.4a2.5 2.5 0 1 1 3.3 2.4c-.6.3-.9.8-.9 1.4v.4" /><circle cx="12" cy="17" r="0.7" fill="currentColor" /></>,
  more: <><circle cx="12" cy="5" r="1.4" fill="currentColor" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /><circle cx="12" cy="19" r="1.4" fill="currentColor" /></>,
  edit: <><path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17v3Z" /><path d="m14.5 6.5 3 3" /></>,
  play: <path d="M8 5.5v13l11-6.5Z" />,
  send: <><path d="M21.5 3 2.5 10.5 10 13l2.5 7.5Z" /><path d="M21.5 3 10 13" /></>,
  doc: <><path d="M6 2h8l5 5v15H6Z" /><path d="M14 2v6h5M9.5 13h6M9.5 17h4" /></>,
  sparkle: <><path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9-5.7-1.8L10.2 9Z" /><path d="M19 3v3M20.5 4.5h-3" /></>,
  cursor: <path d="m6 3 13 7.5-5.8 1.6-2.3 5.6Z" />,
  tag: <><path d="M3 11V4h7l10 10-7 7Z" /><circle cx="7.5" cy="7.5" r="1.4" fill="currentColor" /></>,
  swap: <><path d="M4 8h13l-3-3M20 16H7l3 3" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5.5" /><circle cx="12" cy="7.8" r="0.8" fill="currentColor" /></>,
  zoomIn: <><circle cx="11" cy="11" r="6.5" /><path d="M11 8.5v5M8.5 11h5M16 16l5 5" /></>,
  zoomOut: <><circle cx="11" cy="11" r="6.5" /><path d="M8.5 11h5M16 16l5 5" /></>,
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  move: <path d="M12 3v18M3 12h18M12 3 9.5 5.5M12 3l2.5 2.5M12 21l-2.5-2.5M12 21l2.5-2.5M3 12l2.5-2.5M3 12l2.5 2.5M21 12l-2.5-2.5M21 12l-2.5 2.5" />,
  pin: <><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.4" /></>,
  flag: <path d="M5 21V4h12l-2.5 4L17 12H5" />,
  link: <><path d="M10 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7L11.5 6" /><path d="M14 10.5a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 0 0 5.7 5.7l1.3-1.3" /></>,
  copy: <><rect x="9" y="9" width="11" height="11" rx="2.2" /><path d="M15 6.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h1.5" /></>,
  trash: <><path d="M4 7h16M10 11v6M14 11v6" /><path d="M6 7h12l-1 13H7Z" /><path d="M9 7V4h6v3" /></>,
  upload: <><path d="M12 16V4m-5 5 5-5 5 5" /><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></>,
  download: <><path d="M12 4v12m-5-5 5 5 5-5" /><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></>,
  imagePlus: <><rect x="3" y="4" width="14" height="13" rx="2.5" /><path d="m3 14 4-3 3 2" /><path d="M18 14v6M15 17h6" /></>,
  refresh: <><path d="M20 5v5h-5" /><path d="M20 10a8 8 0 1 0-1.5 7" /></>,
  shield: <><path d="m12 2.5 8 3.2v6c0 5-8 9.8-8 9.8S4 16.7 4 11.7v-6Z" /><path d="M12 9v3.5" /><circle cx="12" cy="15.6" r="0.8" fill="currentColor" /></>,
  lock: <><rect x="4.5" y="10" width="15" height="10.5" rx="2.4" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  eyeOff: <><path d="m3 3 18 18" /><path d="M10 5.8A8.9 8.9 0 0 1 12 5.5c6.2 0 10 6.5 10 6.5a18 18 0 0 1-3.6 4.3M6.5 7.6A17.6 17.6 0 0 0 2 12s3.8 6.5 10 6.5a9.6 9.6 0 0 0 3.6-.7" /><path d="M9.7 10.2a2.8 2.8 0 0 0 3.9 3.9" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2.4" /><path d="m3.5 7 8.5 6 8.5-6" /></>,
  card: <><rect x="2.5" y="5" width="19" height="14" rx="2.4" /><path d="M2.5 10h19M6 15h4" /></>,
  signOut: <><path d="M10 20H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" /><path d="M16 8.5 19.5 12 16 15.5M19 12H9.5" /></>,
  userPlus: <><circle cx="9.5" cy="8" r="3.2" /><path d="M3.5 20v-1.3a6 6 0 0 1 12 0V20" /><path d="M18.5 7v6M21.5 10h-6" /></>,
  bulb: <><path d="M9.2 17h5.6M10 20.5h4" /><path d="M12 3a6 6 0 0 0-3.4 10.9c.5.4.9 1 .9 1.6h5c0-.6.4-1.2.9-1.6A6 6 0 0 0 12 3Z" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M19.1 4.9l-1.5 1.5M6.4 17.6l-1.5 1.5" /></>,
  focus: <><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" /><path d="M12 5.5V3M12 21v-2.5M5.5 12H3M21 12h-2.5" /></>,
  pen: <path d="M3 21l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L7 20l-4 1Z" />,
  monitor: <><rect x="2.5" y="4" width="19" height="13" rx="2.2" /><path d="M9 21h6M12 17v4" /></>,
  phone: <><rect x="7" y="2.5" width="10" height="19" rx="2.6" /><path d="M11 5.5h2" /></>,
  share: <><circle cx="18" cy="6" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" /></>,
  external: <><path d="M14 4h6v6" /><path d="M20 4 11 13" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>,
  undo: <><path d="M4 9h11a5 5 0 0 1 0 10h-5" /><path d="m8 5-4 4 4 4" /></>,
  redo: <><path d="M20 9H9a5 5 0 0 0 0 10h5" /><path d="m16 5 4 4-4 4" /></>,
  save: <><path d="M5 3h11l3 3v15H5Z" /><path d="M8 3v6h7V3M8 15h8v6H8Z" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  warn: <><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5" /><circle cx="12" cy="16.3" r="0.8" fill="currentColor" /></>,
  blur: <><circle cx="12" cy="12" r="9" /><path d="M12 3v18" /></>,
  list: <path d="M4 6h2M4 12h2M4 18h2M9 6h11M9 12h11M9 18h11" />,
};

function Icon({ name, size = 18, strokeWidth = 1.7, className = '', ...rest }) {
  return (
    <svg className={`ss-icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" {...rest}>
      {PATHS[name] || PATHS.doc}
    </svg>
  );
}

/* ------------------------------------------------------------------ data */

// Photo slots. Swap `src` for a real URL and the gradient placeholder steps aside.
const TONES = {
  lounge: 'linear-gradient(145deg,#efe7dc 0%,#e2d5c4 42%,#cdb99f 100%)',
  loungeAlt: 'linear-gradient(160deg,#f3ece2 0%,#e5dac9 50%,#cbb8a0 100%)',
  dining: 'linear-gradient(150deg,#f0e6d7 0%,#decbb0 55%,#c2a784 100%)',
  materials: 'linear-gradient(155deg,#8a6442 0%,#6d4c31 48%,#4a3220 100%)',
  auto: 'linear-gradient(150deg,#e4e8ec 0%,#c3cbd3 50%,#8e99a4 100%)',
  retail: 'linear-gradient(150deg,#d9b887 0%,#b98f5c 52%,#7d5c37 100%)',
  gallery: 'linear-gradient(150deg,#f6f5f2 0%,#e8e6e0 55%,#d2cfc6 100%)',
  sofa: 'linear-gradient(150deg,#efe4d6 0%,#dcc9b1 50%,#bb9c7c 100%)',
  optics: 'linear-gradient(150deg,#c9a775 0%,#9d7549 55%,#6a4b2c 100%)',
  pano: 'linear-gradient(100deg,#f2ece3 0%,#e6dbc9 30%,#d9c9b0 62%,#c0a98c 100%)',
};

const USER = { name: 'Maja Lind', email: 'maja@showroomstudio.co', role: 'Owner', seat: 'Studio owner', initials: 'ML' };
const WORKSPACE = { name: 'Aarhus Line Group', kind: 'Studio workspace', initials: 'AL' };

const NAV_WORKSPACE = [
  { id: 'overview', label: 'Overview', icon: 'compass' },
  { id: 'showrooms', label: 'My Showrooms', icon: 'grid' },
  { id: 'media', label: 'Media Library', icon: 'image' },
  { id: 'analytics', label: 'Analytics', icon: 'chart' },
];
const NAV_MANAGE = [
  { id: 'team', label: 'Team', icon: 'users' },
  { id: 'settings', label: 'Settings', icon: 'gear' },
];

const STATS = [
  { icon: 'layers', pill: '+2 this month', up: true, label: 'Total showrooms', value: '12', foot: 'Across 4 venues', spark: [3, 4, 4, 5, 6, 5, 7, 8, 7, 9, 12] },
  { icon: 'globe', pill: '58% of total', label: 'Published showrooms', value: '7', foot: '3 shared externally', spark: [2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7] },
  { icon: 'eye', pill: '+18.4%', up: true, label: 'Total views', value: '48.2k', foot: 'Last 30 days', spark: [4, 5, 5, 6, 7, 6, 8, 9, 9, 10, 12] },
  { icon: 'timer', pill: '+24s vs. last month', up: true, label: 'Avg. visit duration', value: '3m 48s', foot: 'Across published tours', spark: [5, 5, 6, 6, 7, 7, 8, 8, 9, 10, 11] },
];

const GETTING_STARTED = [
  { label: 'Name your first showroom', done: true },
  { label: 'Upload overlapping photos', done: true },
  { label: 'Review one stitched scene', done: false },
  { label: 'Add a product hotspot and publish', done: false },
];

const PROJECTS = [
  { id: 'aarhus-line', org: 'AARHUS LINE FURNITURE', title: 'Aarhus Line — Flagship Showroom', status: 'Published', category: 'Furniture', edited: 'Edited 2 hours ago', views: '12,480', scenes: 3, tone: 'lounge', src: null },
  { id: 'northgate', org: 'NORTHGATE MOTORS', title: 'Northgate Motors — EV Experience', status: 'Published', category: 'Automotive', edited: 'Edited yesterday', views: '9,310', scenes: 2, tone: 'auto', src: null },
  { id: 'atelier-nove', org: 'ATELIER NOVE', title: 'Atelier Nove — Concept Store', status: 'Processing', category: 'Retail', edited: 'Edited 3 hours ago', views: '0', scenes: 2, tone: 'retail', src: null },
  { id: 'halden', org: 'HALDEN LIVING', title: 'Halden Living — Sofa Studio', status: 'Draft', category: 'Furniture', edited: 'Edited 3 days ago', views: '0', scenes: 1, tone: 'sofa', src: null },
  { id: 'vela', org: 'VELA OPTICS', title: 'Vela Optics — Boutique', status: 'Published', category: 'Retail', edited: 'Edited 5 days ago', views: '6,480', scenes: 2, tone: 'optics', src: null },
  { id: 'brookfield', org: 'BROOKFIELD INTERIORS', title: 'Brookfield Interiors — Design Gall…', status: 'Draft', category: 'Furniture', edited: 'Edited 1 week ago', views: '0', scenes: 1, tone: 'gallery', src: null },
];

const TOP_PERFORMING = [
  { title: 'Aarhus Line — Flagship Showroom', views: '12,480 views', avg: '4m 12s', pct: 100, tone: 'lounge' },
  { title: 'Northgate Motors — EV Experience', views: '9,310 views', avg: '3m 28s', pct: 78, tone: 'auto' },
  { title: 'Vela Optics — Boutique', views: '6,480 views', avg: '2m 51s', pct: 54, tone: 'optics' },
];

const MEDIA = [
  { name: 'aarhus-lounge-01.jpg', scene: 'Living Lounge', size: '8.4 MB', tone: 'lounge' },
  { name: 'aarhus-lounge-02.jpg', scene: 'Living Lounge', size: '7.9 MB', tone: 'loungeAlt' },
  { name: 'aarhus-dining-01.jpg', scene: 'Dining Hall', size: '9.1 MB', tone: 'dining' },
  { name: 'northgate-hall-01.jpg', scene: 'Main Hall', size: '6.7 MB', tone: 'auto' },
  { name: 'northgate-lounge-01.jpg', scene: 'Customer Lounge', size: '5.4 MB', tone: 'gallery' },
  { name: 'atelier-main-01.jpg', scene: 'Main Floor', size: '7.2 MB', tone: 'retail' },
  { name: 'atelier-aisle-01.jpg', scene: 'Accessory Aisle', size: '6.1 MB', tone: 'materials' },
  { name: 'vela-fitting-bar.jpg', scene: 'Fitting Bar', size: '4.8 MB', tone: 'optics' },
  { name: 'aarhus-lounge-pano.jpg', scene: 'Living Lounge', size: '14.2 MB', tone: 'pano', badge: 'PANO' },
];

const PHOTO_CHECKLIST = [
  { icon: 'focus', label: 'Stand in one spot and turn slowly' },
  { icon: 'grid', label: 'Keep 40% overlap between frames' },
  { icon: 'sun', label: 'Match exposure — avoid auto-flash' },
  { icon: 'pen', label: 'Keep the camera level at chest height' },
];

const MEMBERS = [
  { name: 'Maja Lind', email: 'maja@showroomstudio.co', initials: 'ML', color: '#2a7f6a', projects: '6 projects', state: 'Active', role: 'Owner' },
  { name: 'Daniel Okafor', email: 'daniel@northgate.example', initials: 'DO', color: '#bc7e53', projects: '4 projects', state: 'Active', role: 'Admin' },
  { name: 'Ines Duarte', email: 'ines@ateliernove.example', initials: 'ID', color: '#5b7471', projects: '3 projects', state: 'Active', role: 'Editor' },
  { name: 'Tomas Berg', email: 'tomas@brookfield.example', initials: 'TB', color: '#3b4449', projects: '2 projects', state: 'Active', role: 'Editor' },
  { name: 'Priya Raman', email: 'priya@velaoptics.example', initials: 'PR', color: '#9c6644', projects: '0 projects', state: 'Invited', role: 'Viewer', invited: true },
];

const ROLES = [
  { name: 'Owner', tag: 'FULL ACCESS', detail: 'Billing, workspace deletion, every showroom.' },
  { name: 'Admin', tag: 'MANAGE', detail: 'Publish, invite members, manage branding.' },
  { name: 'Editor', tag: 'CREATE', detail: 'Upload photos, stitch scenes, edit hotspots.' },
  { name: 'Viewer', tag: 'READ ONLY', detail: 'Preview tours and read analytics.' },
];

const NOTIFICATIONS = [
  { icon: 'send', title: 'Showroom published', body: 'Maja Lind shared the flagship tour with 3 clients.', time: '2H AGO' },
  { icon: 'sparkle', title: 'Stitching completed', body: 'Atelier Nove — Main Floor is ready to review.', time: '3H AGO' },
  { icon: 'tag', title: 'Hotspot added', body: 'Fold Bouclé Sofa product link updated in Living Lounge.', time: 'YESTERDAY' },
  { icon: 'userPlus', title: 'New team member', body: 'Ines Duarte joined as Editor.', time: '2D AGO' },
];

const SCENES = [
  { n: '01', name: 'Living Lounge', hotspots: 4, tone: 'lounge', start: true },
  { n: '02', name: 'Dining Hall', hotspots: 3, tone: 'dining' },
  { n: '03', name: 'Materials Library', hotspots: 2, tone: 'materials' },
];

const HOTSPOTS = {
  'Living Lounge': [
    { id: 'sofa', kind: 'Product', label: 'Fold Bouclé Sofa', price: '$2,480', x: 29, y: 64, pos: '34% · 62% of panorama', description: 'Three-seat sofa in undyed wool bouclé with oak legs.', link: 'https://example.com/fold-sofa' },
    { id: 'table', kind: 'Product', label: 'Hald Oak Coffee Table', price: '$940', x: 62, y: 60, pos: '58% · 60% of panorama', description: 'Solid oak, hand-oiled, 110 cm round top.', link: 'https://example.com/hald-table' },
    { id: 'walk', kind: 'Navigation', label: 'Walk to Dining Hall', x: 84, y: 48, pos: '84% · 48% of panorama', description: '', target: 'Dining Hall' },
    { id: 'light', kind: 'Info', label: 'Natural daylight studio', x: 16, y: 34, pos: '16% · 34% of panorama', description: 'This corner is lit entirely by north-facing windows, so colours read true all day.' },
  ],
  'Dining Hall': [
    { id: 'dtable', kind: 'Product', label: 'Line Dining Table', price: '$3,150', x: 44, y: 58, pos: '44% · 58% of panorama', description: 'Extendable oak table, seats eight.', link: 'https://example.com/line-table' },
    { id: 'back', kind: 'Navigation', label: 'Back to Lounge', x: 14, y: 50, pos: '14% · 50% of panorama', target: 'Living Lounge' },
    { id: 'mats', kind: 'Navigation', label: 'Materials Library', x: 78, y: 52, pos: '78% · 52% of panorama', target: 'Materials Library' },
  ],
  'Materials Library': [
    { id: 'samples', kind: 'Info', label: 'Order free samples', x: 52, y: 42, pos: '52% · 42% of panorama', description: 'Any six swatches ship free within Denmark.' },
    { id: 'todining', kind: 'Navigation', label: 'Back to Dining Hall', x: 24, y: 55, pos: '24% · 55% of panorama', target: 'Dining Hall' },
  ],
};

const HOTSPOT_META = {
  Product: { icon: 'tag', tint: 'green' },
  Navigation: { icon: 'swap', tint: 'green' },
  Info: { icon: 'info', tint: 'clay' },
};

const ACCENTS = ['#2a7f6a', '#bc7e53', '#5b7471', '#121619', '#ddd9cf'];

const WIZARD_STEPS = [
  { n: 1, label: 'Project details', icon: 'doc' },
  { n: 2, label: 'Upload photos', icon: 'image' },
  { n: 3, label: 'Stitch & review', icon: 'sparkle' },
  { n: 4, label: 'Build tour', icon: 'cursor' },
  { n: 5, label: 'Publish', icon: 'send' },
];

const UPLOAD_PHOTOS = [
  { name: 'aarhus-lounge-01.jpg', scene: 'Living Lounge', tone: 'lounge' },
  { name: 'aarhus-lounge-02.jpg', scene: 'Living Lounge', tone: 'loungeAlt' },
  { name: 'aarhus-lounge-03.jpg', scene: 'Living Lounge', tone: 'sofa' },
  { name: 'aarhus-lounge-04.jpg', scene: 'Living Lounge', tone: 'gallery' },
  { name: 'aarhus-lounge-05.jpg', scene: 'Living Lounge', tone: 'pano' },
  { name: 'aarhus-dining-01.jpg', scene: 'Dining Hall', tone: 'dining' },
];

const STITCH_FRAMES = [
  { n: 1, name: 'aarhus-lounge-01.jpg', state: 'ok', note: 'Looks good', tone: 'lounge' },
  { n: 2, name: 'aarhus-lounge-03.jpg', state: 'ok', note: 'Looks good', tone: 'sofa' },
  { n: 3, name: 'aarhus-lounge-02.jpg', state: 'ok', note: 'Looks good', tone: 'loungeAlt' },
  { n: 4, name: 'aarhus-lounge-04.jpg', state: 'warn', note: 'Low overlap', tone: 'gallery' },
  { n: 5, name: 'aarhus-lounge-05.jpg', state: 'ok', note: 'Looks good', tone: 'pano' },
];

const PROCESSING_STAGES = [
  { state: 'ok', title: 'Checking photos', body: 'Resolution, exposure and duplicates' },
  { state: 'fail', title: 'Aligning images', body: 'Matching shared features between frames' },
  { state: 'ok', title: 'Blending panorama', body: 'Seams, colour and perspective correction' },
];

const REVIEW_NOTES = [
  { icon: 'warn', tone: 'warn', title: 'Frame 4 couldn’t be aligned', body: 'Only 18% overlap with frame 3 — below the 30% minimum. Replace it with a photo that captures more of the same corner.', action: 'Replace frame 4' },
  { icon: 'blur', tone: 'plain', title: 'Frame 5 looks soft', body: 'Slight motion blur near the window. Acceptable at 100% zoom, but a sharper frame would help.' },
  { icon: 'sun', tone: 'plain', title: 'Visible seam near the right window', body: 'Exposure changed between frames. You can hide it with a product hotspot or re-shoot at the same aperture.' },
];

const HOTSPOT_INTERACTIONS = [
  { n: '01', label: 'Fold Bouclé Sofa', kind: 'PRODUCT', scene: 'Living Lounge', count: '642', ctr: 'CTR 13.2%' },
  { n: '02', label: 'Walk to Dining Hall', kind: 'NAVIGATION', scene: 'Living Lounge', count: '418', ctr: 'CTR 8.7%' },
  { n: '03', label: 'Hald Oak Coffee Table', kind: 'PRODUCT', scene: 'Living Lounge', count: '386', ctr: 'CTR 7.9%' },
  { n: '04', label: 'Order free samples', kind: 'INFO', scene: 'Materials Library', count: '291', ctr: 'CTR 6.0%' },
  { n: '05', label: 'Line Dining Table', kind: 'PRODUCT', scene: 'Dining Hall', count: '254', ctr: 'CTR 5.2%' },
];

const SCENE_ENGAGEMENT = [
  { scene: 'Living Lounge', visits: 4820, clicks: 1420 },
  { scene: 'Dining Hall', visits: 3160, clicks: 870 },
  { scene: 'Materials Library', visits: 2140, clicks: 1010 },
];

const MOST_VISITED = [
  { scene: 'Living Lounge', count: '4,820', pct: 100, tone: 'lounge' },
  { scene: 'Dining Hall', count: '3,160', pct: 66, tone: 'dining' },
  { scene: 'Materials Library', count: '2,140', pct: 44, tone: 'materials' },
];

const VIEWS_SERIES = [430, 410, 455, 470, 520, 505, 560, 545, 585, 640, 690, 665, 705, 690, 745, 760, 820, 805, 860, 900, 940, 915, 980, 1010, 1065, 1110, 1150, 1190];
const UNIQUE_SERIES = [185, 180, 196, 205, 215, 210, 232, 228, 245, 262, 278, 270, 288, 282, 305, 312, 330, 326, 348, 362, 422, 398, 418, 432, 455, 470, 488, 505];
const VIEWS_TICKS = ['Sep 27', 'Sep 30', 'Oct 03', 'Oct 06', 'Oct 09', 'Oct 12', 'Oct 15', 'Oct 18', 'Oct 21', 'Oct 24'];

const SETTINGS_TABS = ['Workspace', 'Branding', 'Notifications', 'Plan'];

const VISIBILITY = [
  { id: 'anyone', icon: 'globe', title: 'Anyone with the link', body: 'No sign-in needed. Search engines may index the tour.' },
  { id: 'password', icon: 'lock', title: 'Password protected', body: 'Visitors enter a shared password before the tour opens.' },
  { id: 'private', icon: 'eyeOff', title: 'Private — team only', body: 'Only workspace members can open this showroom.' },
];

const PUBLISHING_DEFAULTS = [
  { id: 'anyone', title: 'Anyone with the link', body: 'Search engines can index published tours.' },
  { id: 'password', title: 'Password protected', body: 'Visitors enter a shared password before viewing.' },
  { id: 'private', title: 'Private — team only', body: 'Only signed-in workspace members can open the tour.' },
];

const EMAIL_PREFS = [
  { id: 'published', title: 'Showroom published', body: 'Email me when a teammate publishes a tour.', on: true },
  { id: 'stitch', title: 'Stitching needs attention', body: 'Alert me when photos cannot be aligned.', on: true },
  { id: 'digest', title: 'Weekly performance digest', body: 'Views, dwell time and hotspot clicks every Monday.', on: false },
  { id: 'comments', title: 'Hotspot comments', body: 'When a client comments on a product hotspot.', on: true },
];

const SPACE_TYPES = [
  { id: 'furniture', icon: 'layers', title: 'Furniture', body: 'Showrooms, studios, galleries' },
  { id: 'automotive', icon: 'card', title: 'Automotive', body: 'Dealerships, garages' },
  { id: 'retail', icon: 'grid', title: 'Retail', body: 'Boutiques, concept stores' },
];

/* ------------------------------------------------------------ primitives */

function Photo({ tone = 'lounge', src, className = '', children, style }) {
  return (
    <div className={`ss-photo ${className}`} style={{ background: TONES[tone] || TONES.lounge, ...style }}>
      {src && <img src={src} alt="" />}
      <span className="ss-photo-grain" />
      {children}
    </div>
  );
}

function Avatar({ initials, color = '#2a7f6a', size = 36, radius }) {
  return (
    <span className="ss-avatar" style={{ background: color, width: size, height: size, borderRadius: radius ?? '50%', fontSize: Math.round(size * 0.33) }}>
      {initials}
    </span>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button type="button" className={`ss-toggle ${on ? 'on' : ''}`} role="switch" aria-checked={!!on}
      onClick={() => onChange && onChange(!on)}>
      <span />
    </button>
  );
}

function Radio({ checked }) {
  return <span className={`ss-radio ${checked ? 'on' : ''}`} />;
}

function Sparkline({ data, w = 56, h = 22 }) {
  const max = Math.max(...data);
  return (
    <span className="ss-spark" style={{ width: w, height: h }}>
      {data.map((v, i) => (
        <i key={i} style={{ height: `${(v / max) * 100}%` }} className={i === data.length - 1 ? 'lead' : ''} />
      ))}
    </span>
  );
}

function Ring({ pct, size = 44 }) {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg className="ss-ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e8f3ee" strokeWidth="5" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#2a7f6a" strokeWidth="5" strokeLinecap="round"
        strokeDasharray={`${(c * pct) / 100} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y="50%" dy="3.5" textAnchor="middle" className="ss-ring-text">{pct}%</text>
    </svg>
  );
}

function Pill({ children, tone = 'mint', icon }) {
  return <span className={`ss-pill ss-pill-${tone}`}>{icon && <Icon name={icon} size={11} strokeWidth={2.2} />}{children}</span>;
}

function StatusDot({ status }) {
  const tone = status === 'Published' ? 'green' : status === 'Processing' ? 'clay' : 'grey';
  return <span className={`ss-status ss-status-${tone}`}><i />{status}</span>;
}

function Field({ label, hint, children, counter }) {
  return (
    <label className="ss-field">
      {(label || hint || counter) && (
        <span className="ss-field-top">
          <span className="ss-field-label">{label}</span>
          {(hint || counter) && <span className="ss-field-hint">{hint || counter}</span>}
        </span>
      )}
      {children}
    </label>
  );
}

function Select({ value, onChange, options, small }) {
  return (
    <span className={`ss-select ${small ? 'small' : ''}`}>
      <select value={value} onChange={e => onChange && onChange(e.target.value)}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <Icon name="chevronDown" size={small ? 13 : 16} />
    </span>
  );
}

function SectionHead({ title, sub, children }) {
  return (
    <div className="ss-section-head">
      <div>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {children}
    </div>
  );
}

function PageHead({ eyebrow, title, blurb, children }) {
  return (
    <header className="ss-page-head">
      <div className="ss-page-head-text">
        <span className="ss-eyebrow"><i />{eyebrow}</span>
        <h1>{title}</h1>
        {blurb && <p>{blurb}</p>}
      </div>
      {children && <div className="ss-page-head-actions">{children}</div>}
    </header>
  );
}

function Footer() {
  return (
    <footer className="ss-footer">
      <span>© 2026 Showroom Studio. Stitching preview is simulated in this prototype.</span>
      <nav><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#support">Support</a></nav>
    </footer>
  );
}

/* ---------------------------------------------------------------- sidebar */

function Sidebar({ route, go, open, onClose }) {
  const item = n => (
    <button key={n.id} className={`ss-nav-item ${route === n.id ? 'active' : ''}`}
      aria-current={route === n.id ? 'page' : undefined}
      onClick={() => { go(n.id); onClose && onClose(); }}>
      <Icon name={n.icon} size={19} />
      <span>{n.label}</span>
      {route === n.id && <i className="ss-nav-dot" />}
    </button>
  );
  return (
    <aside className={`ss-sidebar ${open ? 'open' : ''}`}>
      <div className="ss-brand">
        <span className="ss-brand-tile"><Icon name="target" size={20} strokeWidth={1.9} /></span>
        <span className="ss-brand-text">
          <strong>Showroom Studio</strong>
          <small>VIRTUAL TOURS</small>
        </span>
        {onClose && <button className="ss-drawer-close" onClick={onClose} aria-label="Close menu"><Icon name="close" size={18} /></button>}
      </div>

      <div className="ss-sidebar-body">
        <button className="ss-workspace">
          <Avatar initials={WORKSPACE.initials} color="#121619" size={32} radius={9} />
          <span>
            <strong>{WORKSPACE.name}</strong>
            <small>{WORKSPACE.kind}</small>
          </span>
          <Icon name="selector" size={16} />
        </button>

        <span className="ss-nav-label">WORKSPACE</span>
        <nav>{NAV_WORKSPACE.map(item)}</nav>

        <span className="ss-nav-label">MANAGE</span>
        <nav>{NAV_MANAGE.map(item)}</nav>

        <div className="ss-storage">
          <div className="ss-storage-top">
            <strong>Panorama storage</strong>
            <Icon name="database" size={16} />
          </div>
          <div className="ss-storage-bar"><i style={{ width: '31%' }} /></div>
          <small>6.2 GB of 20 GB used</small>
          <a href="#plan">Manage plan <Icon name="external" size={12} strokeWidth={2} /></a>
        </div>
      </div>

      <div className="ss-sidebar-foot">
        <div className="ss-profile">
          <Avatar initials={USER.initials} color="#2a7f6a" size={36} />
          <span><strong>{USER.name}</strong><small>{USER.seat}</small></span>
          <button className="ss-icon-btn plain" aria-label="Account options"><Icon name="more" size={17} /></button>
        </div>
        <button className="ss-btn primary block"><Icon name="plus" size={17} strokeWidth={2.2} />Create Showroom</button>
      </div>
    </aside>
  );
}

/* ----------------------------------------------------------------- topbar */

function Topbar({ go, onMenu }) {
  const [menu, setMenu] = useState(null);
  return (
    <header className="ss-topbar">
      <button className="ss-icon-btn boxed ss-only-mobile" onClick={onMenu} aria-label="Open menu"><Icon name="menu" size={19} /></button>

      <label className="ss-search">
        <Icon name="search" size={17} />
        <input placeholder="Search showrooms, scenes, media" />
        <kbd>⌘K</kbd>
      </label>

      <div className="ss-topbar-right">
        <button className="ss-ghost-link ss-hide-sm"><Icon name="help" size={17} />Help</button>

        <div className="ss-pop-wrap">
          <button className={`ss-icon-btn boxed ${menu === 'bell' ? 'is-open' : ''}`} aria-label="Notifications"
            onClick={() => setMenu(menu === 'bell' ? null : 'bell')}>
            <Icon name="bell" size={18} /><i className="ss-badge-dot" />
          </button>
          {menu === 'bell' && (
            <div className="ss-pop ss-pop-notifications">
              <div className="ss-pop-head"><strong>Notifications</strong><button>Mark all read</button></div>
              <ul>
                {NOTIFICATIONS.map(n => (
                  <li key={n.title}>
                    <span className="ss-note-icon"><Icon name={n.icon} size={16} /></span>
                    <span className="ss-note-body">
                      <strong>{n.title}</strong>
                      <small>{n.body}</small>
                      <em>{n.time}</em>
                    </span>
                    <i className="ss-note-dot" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="ss-pop-wrap">
          <button className="ss-account" onClick={() => setMenu(menu === 'acct' ? null : 'acct')}>
            <Avatar initials={USER.initials} color="#121619" size={30} />
            <span className="ss-hide-sm"><strong>{USER.name}</strong><small>{USER.role}</small></span>
            <Icon name="chevronDown" size={15} className="ss-hide-sm" />
          </button>
          {menu === 'acct' && (
            <div className="ss-pop ss-pop-account">
              <div className="ss-pop-id"><strong>{USER.name}</strong><small>{USER.email}</small></div>
              <button><Icon name="users" size={16} />Account settings</button>
              <button onClick={() => { setMenu(null); go('team'); }}><Icon name="userPlus" size={16} />Invite teammates</button>
              <button onClick={() => { setMenu(null); go('settings'); }}><Icon name="card" size={16} />Plan &amp; billing</button>
              <hr />
              <button><Icon name="signOut" size={16} />Sign out</button>
            </div>
          )}
        </div>

        <button className="ss-btn primary ss-hide-sm" onClick={() => go('create')}>
          <Icon name="plus" size={17} strokeWidth={2.2} />Create Showroom
        </button>
      </div>
      {menu && <button className="ss-pop-scrim" aria-label="Close" onClick={() => setMenu(null)} />}
    </header>
  );
}

/* --------------------------------------------------------------- overview */

function Overview({ go }) {
  return (
    <div className="ss-page">
      <PageHead eyebrow="WORKSPACE OVERVIEW" title="Welcome back, Maja"
        blurb="Your showrooms had a strong week — 18% more views than last month. Two scenes are waiting for review.">
        <button className="ss-btn" onClick={() => go('team')}><Icon name="userPlus" size={17} />Invite team</button>
        <button className="ss-btn primary" onClick={() => go('create')}><Icon name="plus" size={17} strokeWidth={2.2} />Create Showroom</button>
      </PageHead>

      <div className="ss-stat-row">
        {STATS.map(s => (
          <article className="ss-card ss-stat" key={s.label}>
            <div className="ss-stat-top">
              <span className="ss-stat-icon"><Icon name={s.icon} size={19} /></span>
              <Pill icon={s.up ? 'arrowUp' : undefined}>{s.pill}</Pill>
            </div>
            <span className="ss-stat-label">{s.label}</span>
            <strong className="ss-stat-value">{s.value}</strong>
            <div className="ss-stat-foot">
              <small>{s.foot}</small>
              <Sparkline data={s.spark} />
            </div>
          </article>
        ))}
      </div>

      <div className="ss-grid-724">
        <article className="ss-feature">
          <Photo tone="lounge" className="ss-feature-photo">
            <span className="ss-feature-scrim" />
            <span className="ss-chip dark top-left"><i className="ss-chip-dot" />Continue editing</span>
            <span className="ss-chip light top-right">Published</span>
            <div className="ss-feature-body">
              <span className="ss-feature-eyebrow">FLAGSHIP · 3 SCENES</span>
              <h2>Aarhus Line — Flagship Showroom</h2>
              <div className="ss-feature-row">
                <ul className="ss-feature-meta">
                  <li><Icon name="eye" size={14} />12,480 views</li>
                  <li><Icon name="timer" size={14} />4m 12s average</li>
                  <li><Icon name="pin" size={14} />9 hotspots</li>
                </ul>
                <div className="ss-feature-actions">
                  <button className="ss-btn dark" onClick={() => go('preview')}><Icon name="play" size={15} />Preview</button>
                  <button className="ss-btn primary" onClick={() => go('editor')}><Icon name="edit" size={16} />Open editor</button>
                </div>
              </div>
            </div>
          </Photo>
        </article>

        <article className="ss-card ss-getting">
          <div className="ss-getting-top">
            <div>
              <h2>Getting started</h2>
              <p>2 of 4 steps complete</p>
            </div>
            <Ring pct={50} />
          </div>
          <ul className="ss-getting-list">
            {GETTING_STARTED.map(s => (
              <li key={s.label} className={s.done ? 'done' : ''}>
                <span className="ss-check">{s.done && <Icon name="check" size={12} strokeWidth={3} />}</span>
                <span>{s.label}</span>
                <Icon name="chevronRight" size={14} />
              </li>
            ))}
          </ul>
          <button className="ss-btn block">Continue setup</button>
        </article>
      </div>

      <SectionHead title="Recent showroom projects" sub="Pick up where you left off, or start something new.">
        <button className="ss-link-btn" onClick={() => go('showrooms')}>View all <Icon name="arrowRight" size={15} /></button>
      </SectionHead>

      <div className="ss-grid-724 ss-grid-top">
        <div className="ss-recent-grid">
          {PROJECTS.slice(3, 5).map(p => <ProjectCard key={p.id} project={p} go={go} compact />)}
          <button className="ss-create-tile" onClick={() => go('create')}>
            <span className="ss-create-plus"><Icon name="plus" size={20} strokeWidth={2} /></span>
            <strong>Create showroom</strong>
            <p>Upload overlapping photos and stitch your first panorama.</p>
            <em>Start now <Icon name="arrowRight" size={14} /></em>
          </button>
        </div>

        <article className="ss-card ss-recent-media">
          <div className="ss-card-head">
            <h2>Recent media</h2>
            <button className="ss-link-btn sm" onClick={() => go('media')}>Library</button>
          </div>
          <div className="ss-media-mini">
            {MEDIA.slice(0, 6).map(m => <Photo key={m.name} tone={m.tone} src={m.src} className="ss-media-thumb" />)}
          </div>
          <small>9 new photos added this week across 3 projects.</small>
        </article>
      </div>

      <article className="ss-card ss-top-performing">
        <div className="ss-card-head">
          <div>
            <h2>Top performing showrooms</h2>
            <p>Views and dwell time across published tours · last 30 days</p>
          </div>
          <button className="ss-btn sm" onClick={() => go('analytics')}><Icon name="chart" size={15} />Open analytics</button>
        </div>
        <ul className="ss-rank-list">
          {TOP_PERFORMING.map((t, i) => (
            <li key={t.title}>
              <span className="ss-rank-n">{String(i + 1).padStart(2, '0')}</span>
              <Photo tone={t.tone} className="ss-rank-thumb" />
              <div className="ss-rank-main">
                <div className="ss-rank-title">
                  <strong>{t.title}</strong>
                  <StatusDot status="Published" />
                </div>
                <div className="ss-rank-bar">
                  <i style={{ width: `${t.pct}%` }} />
                  <small>{t.views}</small>
                </div>
              </div>
              <div className="ss-rank-avg"><strong>{t.avg}</strong><small>AVG. VISIT</small></div>
            </li>
          ))}
        </ul>
      </article>

      <article className="ss-cta">
        <Photo tone="lounge" className="ss-cta-photo" />
        <div className="ss-cta-body">
          <span className="ss-cta-eyebrow">READY WHEN YOU ARE</span>
          <h2>Shoot a room. Stitch it. Share the whole space.</h2>
          <p>Overlapping photos become one seamless panorama in about two minutes. No camera rig, no specialist software.</p>
        </div>
        <div className="ss-cta-actions">
          <button className="ss-btn primary" onClick={() => go('create')}><Icon name="plus" size={17} strokeWidth={2.2} />Create Showroom</button>
          <button className="ss-btn dark" onClick={() => go('preview')}><Icon name="play" size={15} />See a live tour</button>
        </div>
      </article>

      <Footer />
    </div>
  );
}

/* ----------------------------------------------------------- showroom card */

function ProjectCard({ project, go, compact }) {
  return (
    <article className={`ss-card ss-project ${compact ? 'compact' : ''}`}>
      <Photo tone={project.tone} src={project.src} className="ss-project-photo">
        <span className={`ss-chip ${project.status === 'Published' ? 'light' : project.status === 'Processing' ? 'light clay' : 'light grey'} top-left`}>
          <i className="ss-chip-dot" />{project.status}
        </span>
        <span className="ss-chip dark top-right">{project.category}</span>
        <span className="ss-project-hover">
          <small>{project.scenes} scenes · {project.views} views</small>
          <button className="ss-round-btn" onClick={() => go(project.status === 'Draft' ? 'create' : 'editor')} aria-label="Open">
            <Icon name="arrowRight" size={15} strokeWidth={2} />
          </button>
        </span>
      </Photo>
      <div className="ss-project-body">
        <div className="ss-project-title">
          <div>
            <span className="ss-project-org">{project.org}</span>
            <h3>{project.title}</h3>
          </div>
          <button className="ss-icon-btn plain" aria-label="More"><Icon name="more" size={17} /></button>
        </div>
        <div className="ss-project-meta">
          <span><Icon name="timer" size={14} />{project.edited}</span>
          <span><Icon name="eye" size={14} />{project.views}</span>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------- showrooms */

function Showrooms({ go }) {
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState('grid');
  const counts = useMemo(() => ({
    All: PROJECTS.length,
    Draft: PROJECTS.filter(p => p.status === 'Draft').length,
    Processing: PROJECTS.filter(p => p.status === 'Processing').length,
    Published: PROJECTS.filter(p => p.status === 'Published').length,
  }), []);
  const list = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.status === filter);

  return (
    <div className="ss-page">
      <PageHead eyebrow="LIBRARY" title="My Showrooms"
        blurb="Every space you’ve captured, from first upload to published tour. Drafts stay private until you share them.">
        <button className="ss-btn primary" onClick={() => go('create')}><Icon name="plus" size={17} strokeWidth={2.2} />Create Showroom</button>
      </PageHead>

      <div className="ss-card ss-filterbar">
        <div className="ss-tabs">
          {['All', 'Draft', 'Processing', 'Published'].map(f => (
            <button key={f} className={`ss-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f}<em>{counts[f]}</em>
            </button>
          ))}
        </div>
        <div className="ss-filterbar-right">
          <label className="ss-search sm">
            <Icon name="search" size={16} />
            <input placeholder="Search projects" />
          </label>
          <Select value="Recently edited" options={['Recently edited', 'Most viewed', 'Name A–Z']} onChange={() => {}} />
          <div className="ss-viewtoggle">
            <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} aria-label="Grid view"><Icon name="grid" size={16} /></button>
            <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-label="List view"><Icon name="list" size={16} /></button>
          </div>
        </div>
      </div>

      <div className={`ss-project-grid ${view === 'list' ? 'as-list' : ''}`}>
        {list.map(p => <ProjectCard key={p.id} project={p} go={go} />)}
      </div>

      <div className="ss-tipbar">
        <span className="ss-tip-icon"><Icon name="bulb" size={17} /></span>
        <p><strong>Quick tip:</strong> shooting photos with 40% overlap gives the cleanest stitch. Aim for 8–12 photos per room.</p>
        <button className="ss-link-btn" onClick={() => go('media')}>Browse media library <Icon name="arrowRight" size={14} /></button>
      </div>

      <Footer />
    </div>
  );
}

/* ----------------------------------------------------------- media library */

function MediaLibrary() {
  const [tab, setTab] = useState('All assets');
  const list = tab === 'Panoramas' ? MEDIA.filter(m => m.badge) : tab === 'Source photos' ? MEDIA.filter(m => !m.badge) : MEDIA;

  return (
    <div className="ss-page">
      <PageHead eyebrow="LIBRARY" title="Media Library"
        blurb="Every source photo and stitched panorama across your workspace. Reuse assets between scenes without re-uploading.">
        <button className="ss-btn"><Icon name="upload" size={16} />Upload files</button>
        <button className="ss-btn primary"><Icon name="refresh" size={16} />Sync library</button>
      </PageHead>

      <div className="ss-grid-main-rail">
        <div className="ss-col">
          <div className="ss-filterbar bare">
            <div className="ss-tabs">
              {['All assets', 'Source photos', 'Panoramas'].map(t => (
                <button key={t} className={`ss-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>
              ))}
            </div>
            <label className="ss-search sm">
              <Icon name="search" size={16} />
              <input placeholder="Search files" />
            </label>
          </div>

          <div className="ss-asset-grid">
            {list.map(m => (
              <article className="ss-card ss-asset" key={m.name}>
                <Photo tone={m.tone} src={m.src} className="ss-asset-photo">
                  <span className="ss-asset-check" />
                  {m.badge && <span className="ss-chip dark top-right sm">{m.badge}</span>}
                </Photo>
                <div className="ss-asset-body">
                  <strong>{m.name}</strong>
                  <small>{m.scene} · {m.size}</small>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="ss-rail">
          <article className="ss-card ss-storage-card">
            <h2>Storage</h2>
            <p>6.2 GB of 20 GB used</p>
            <ul className="ss-storage-rows">
              {[
                { label: 'Source photos', val: '4.1 GB', pct: 66 },
                { label: 'Panoramas', val: '1.8 GB', pct: 29 },
                { label: 'Covers & exports', val: '0.3 GB', pct: 5 },
              ].map(r => (
                <li key={r.label}>
                  <span>{r.label}</span>
                  <i className="ss-mini-bar"><b style={{ width: `${r.pct}%` }} /></i>
                  <small>{r.val}</small>
                </li>
              ))}
            </ul>
          </article>

          <article className="ss-card">
            <h2 className="ss-card-title">Photo checklist</h2>
            <ul className="ss-check-list">
              {PHOTO_CHECKLIST.map(c => (
                <li key={c.label}><span className="ss-tint-icon"><Icon name={c.icon} size={15} /></span>{c.label}</li>
              ))}
            </ul>
          </article>
        </aside>
      </div>

      <Footer />
    </div>
  );
}

/* -------------------------------------------------------------- analytics */

function AreaChart() {
  const W = 700, H = 200, MAX = 1200;
  const pt = (arr, i) => [(i / (arr.length - 1)) * W, H - (arr[i] / MAX) * H];
  const line = arr => arr.map((_, i) => pt(arr, i).join(',')).join(' ');
  const area = `0,${H} ${line(VIEWS_SERIES)} ${W},${H}`;
  const hiX = (20 / (VIEWS_SERIES.length - 1)) * W;

  return (
    <div className="ss-area">
      <div className="ss-area-y">{[1200, 900, 600, 300, 0].map(v => <span key={v}>{v}</span>)}</div>
      <div className="ss-area-plot">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="ss-area-svg">
          {[0, 0.25, 0.5, 0.75, 1].map(g => <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} className="ss-grid-line" />)}
          <polygon points={area} className="ss-area-fill" />
          <polyline points={line(VIEWS_SERIES)} className="ss-area-line" />
          <polyline points={line(UNIQUE_SERIES)} className="ss-area-line dashed" />
          <line x1={hiX} x2={hiX} y1="0" y2={H} className="ss-area-cursor" />
        </svg>
        <span className="ss-area-dot green" style={{ left: `${(20 / (VIEWS_SERIES.length - 1)) * 100}%`, bottom: `${(VIEWS_SERIES[20] / MAX) * 100}%` }} />
        <span className="ss-area-dot clay" style={{ left: `${(20 / (VIEWS_SERIES.length - 1)) * 100}%`, bottom: `${(UNIQUE_SERIES[20] / MAX) * 100}%` }} />
        <div className="ss-area-tip" style={{ left: `${(20 / (VIEWS_SERIES.length - 1)) * 100}%` }}>
          <strong>Oct 21</strong>
          <span className="clay">Unique visitors : 422</span>
          <span className="green">Views : 940</span>
        </div>
        <div className="ss-area-x">{VIEWS_TICKS.map(t => <span key={t}>{t}</span>)}</div>
      </div>
    </div>
  );
}

function Analytics() {
  const [range, setRange] = useState('Last 30 days');
  const max = 6000;
  return (
    <div className="ss-page">
      <PageHead eyebrow="PERFORMANCE" title="Showroom analytics"
        blurb="How visitors move through your published tours — views, dwell time and which hotspots earn the most attention.">
        <button className="ss-btn"><Icon name="download" size={16} />Export report</button>
      </PageHead>

      <div className="ss-card ss-filterbar">
        <div className="ss-tabs pill">
          {['Last 7 days', 'Last 30 days', 'Last 90 days'].map(r => (
            <button key={r} className={`ss-tab ${range === r ? 'active' : ''}`} onClick={() => setRange(r)}>{r}</button>
          ))}
        </div>
        <div className="ss-legend">
          <span><i className="dot green" />Views</span>
          <span><i className="dot clay" />Unique visitors</span>
          <em>|</em>
          <button className="ss-link-btn sm">Aarhus Line — Flagship</button>
        </div>
      </div>

      <div className="ss-stat-row">
        {[
          { icon: 'eye', label: 'Total views', value: '7.0k', foot: '+18.4% vs. previous period' },
          { icon: 'timer', label: 'Avg. visit duration', value: '3m 48s', foot: '+24s vs. previous period' },
          { icon: 'swap', label: 'Scene completion', value: '62%', foot: 'Visitors see 2+ scenes' },
          { icon: 'cursor', label: 'Hotspot click rate', value: '8.7%', foot: '+1.2 pts this period' },
        ].map(s => (
          <article className="ss-card ss-stat" key={s.label}>
            <div className="ss-stat-top">
              <span className="ss-stat-icon"><Icon name={s.icon} size={19} /></span>
              <Icon name="arrowUp" size={16} className="ss-up" />
            </div>
            <span className="ss-stat-label">{s.label}</span>
            <strong className="ss-stat-value">{s.value}</strong>
            <div className="ss-stat-foot"><small>{s.foot}</small></div>
          </article>
        ))}
      </div>

      <div className="ss-grid-main-rail">
        <article className="ss-card ss-chart-card">
          <div className="ss-card-head">
            <div>
              <h2>Views over time</h2>
              <p>7,050 views · 3,138 unique visitors</p>
            </div>
            <Pill>+18.4%</Pill>
          </div>
          <AreaChart />
        </article>

        <aside className="ss-rail">
          <article className="ss-card">
            <h2 className="ss-card-title">Devices</h2>
            <p className="ss-card-sub">How visitors open the tour</p>
            <div className="ss-devices">
              <div className="ss-donut">
                <svg viewBox="0 0 42 42">
                  <circle className="ss-donut-seg" cx="21" cy="21" r="15.9" stroke="#2a7f6a" strokeDasharray="58 42" strokeDashoffset="25" />
                  <circle className="ss-donut-seg" cx="21" cy="21" r="15.9" stroke="#bc7e53" strokeDasharray="36 64" strokeDashoffset="-33" />
                  <circle className="ss-donut-seg" cx="21" cy="21" r="15.9" stroke="#c9ccc5" strokeDasharray="6 94" strokeDashoffset="-69" />
                </svg>
                <span className="ss-donut-center"><strong>58%</strong><small>DESKTOP</small></span>
              </div>
              <ul className="ss-device-list">
                <li><i className="dot green" />Desktop<em>58%</em></li>
                <li><i className="dot clay" />Mobile<em>36%</em></li>
                <li><i className="dot grey" />Tablet<em>6%</em></li>
              </ul>
            </div>
          </article>

          <article className="ss-card">
            <h2 className="ss-card-title">Most visited scenes</h2>
            <ul className="ss-visited">
              {MOST_VISITED.map(s => (
                <li key={s.scene}>
                  <Photo tone={s.tone} className="ss-visited-thumb" />
                  <div>
                    <div className="ss-visited-row"><strong>{s.scene}</strong><small>{s.count}</small></div>
                    <i className="ss-mini-bar"><b style={{ width: `${s.pct}%` }} /></i>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </aside>
      </div>

      <div className="ss-grid-equal">
        <article className="ss-card">
          <div className="ss-card-head">
            <div>
              <h2>Scene engagement</h2>
              <p>Visits and hotspot clicks per scene</p>
            </div>
            <div className="ss-legend sm">
              <span><i className="sq green" />Visits</span>
              <span><i className="sq clay" />Hotspot clicks</span>
            </div>
          </div>
          <div className="ss-bars">
            {SCENE_ENGAGEMENT.map(s => (
              <div className="ss-bar-group" key={s.scene}>
                <span className="ss-bar-label">{s.scene}</span>
                <div className="ss-bar-stack">
                  <i className="green" style={{ width: `${(s.visits / max) * 100}%` }} />
                  <i className="clay" style={{ width: `${(s.clicks / max) * 100}%` }} />
                </div>
              </div>
            ))}
            <div className="ss-bar-axis">{[0, 1500, 3000, 4500, 6000].map(t => <span key={t}>{t}</span>)}</div>
          </div>
        </article>

        <article className="ss-card">
          <div className="ss-card-head">
            <div>
              <h2>Product hotspot interactions</h2>
              <p>Most clicked hotspots this period</p>
            </div>
            <button className="ss-link-btn sm">View all</button>
          </div>
          <ul className="ss-interactions">
            {HOTSPOT_INTERACTIONS.map(h => (
              <li key={h.n}>
                <span className="ss-rank-n">{h.n}</span>
                <div className="ss-interaction-main">
                  <div><strong>{h.label}</strong><span className={`ss-kindtag ${h.kind.toLowerCase()}`}>{h.kind}</span></div>
                  <small>{h.scene}</small>
                </div>
                <div className="ss-interaction-num"><strong>{h.count}</strong><small>{h.ctr}</small></div>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="ss-insight">
        <span className="ss-tip-icon"><Icon name="bulb" size={17} /></span>
        <p><strong>Insight:</strong> visitors who click the Sofa hotspot spend 46 seconds longer in the lounge. Consider adding a matching rug hotspot nearby.</p>
        <button className="ss-btn sm">Add to to-do</button>
      </div>

      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------- team */

function Team() {
  return (
    <div className="ss-page">
      <PageHead eyebrow="WORKSPACE" title="Team"
        blurb="Bring in the people who photograph, stitch and publish your spaces. Roles control who can change a tour.">
        <button className="ss-btn primary"><Icon name="userPlus" size={17} />Invite member</button>
      </PageHead>

      <div className="ss-grid-main-rail">
        <div className="ss-col">
          <article className="ss-card">
            <div className="ss-card-head">
              <div>
                <h2>Members</h2>
                <p>5 people in {WORKSPACE.name}</p>
              </div>
              <Pill>3 seats left</Pill>
            </div>
            <ul className="ss-member-list">
              {MEMBERS.map(m => (
                <li key={m.email}>
                  <Avatar initials={m.initials} color={m.color} size={38} />
                  <div className="ss-member-id">
                    <strong>{m.name}{m.invited && <span className="ss-kindtag invited">INVITED</span>}</strong>
                    <small>{m.email}</small>
                  </div>
                  <div className="ss-member-stat"><span>{m.projects}</span><small>{m.state}</small></div>
                  <Select small value={m.role} options={['Owner', 'Admin', 'Editor', 'Viewer']} onChange={() => {}} />
                </li>
              ))}
            </ul>
          </article>

          <article className="ss-card">
            <h2 className="ss-card-title">Pending invites</h2>
            <p className="ss-card-sub">Invites expire after 14 days. Resend if someone missed it.</p>
            <ul className="ss-invite-list">
              <li>
                <Avatar initials="PR" color="#9c6644" size={34} />
                <div className="ss-member-id"><strong>Priya Raman</strong><small>priya@velaoptics.example · Viewer</small></div>
                <button className="ss-btn sm">Resend</button>
                <button className="ss-icon-btn plain" aria-label="Revoke"><Icon name="close" size={16} /></button>
              </li>
            </ul>
          </article>
        </div>

        <aside className="ss-rail">
          <article className="ss-card">
            <h2 className="ss-card-title">Roles &amp; permissions</h2>
            <ul className="ss-role-list">
              {ROLES.map(r => (
                <li key={r.name}>
                  <div><strong>{r.name}</strong><em>{r.tag}</em></div>
                  <small>{r.detail}</small>
                </li>
              ))}
            </ul>
          </article>

          <article className="ss-card mint ss-client-links">
            <span className="ss-tile-icon"><Icon name="shield" size={17} /></span>
            <h2 className="ss-card-title">Client access links</h2>
            <p className="ss-card-sub">Share a read-only tour without adding someone to the workspace. Password protection lives in publishing settings.</p>
            <button className="ss-btn block"><Icon name="link" size={15} />Copy client link</button>
          </article>
        </aside>
      </div>

      <Footer />
    </div>
  );
}

/* --------------------------------------------------------------- settings */

function Settings() {
  const [tab, setTab] = useState('Workspace');
  const [visibility, setVisibility] = useState('anyone');
  const [accent, setAccent] = useState(0);
  const [badge, setBadge] = useState(true);
  const [watermark, setWatermark] = useState(true);
  const [prefs, setPrefs] = useState(() => EMAIL_PREFS.reduce((a, p) => ({ ...a, [p.id]: p.on }), {}));

  const archive = (
    <article className="ss-card warnbox">
      <div>
        <strong>Archive this workspace</strong>
        <small>Tours go offline immediately. Data is recoverable for 30 days.</small>
      </div>
      <button className="ss-btn clay">Archive workspace</button>
    </article>
  );

  return (
    <div className="ss-page">
      <PageHead eyebrow="WORKSPACE" title="Settings"
        blurb="Control how your studio looks, who gets notified, and how new showrooms behave by default.">
        <button className="ss-btn primary"><Icon name="save" size={16} />Save changes</button>
      </PageHead>

      <div className="ss-settings">
        <nav className="ss-settings-nav">
          {SETTINGS_TABS.map(t => (
            <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t}</button>
          ))}
        </nav>

        <div className="ss-settings-body">
          {tab === 'Workspace' && <>
            <article className="ss-card">
              <h2 className="ss-card-title">Studio details</h2>
              <p className="ss-card-sub">Shown on share links and in the visitor information panel.</p>
              <div className="ss-field-grid">
                <Field label="Workspace name"><input defaultValue="Aarhus Line Group" /></Field>
                <Field label="Workspace URL">
                  <span className="ss-input-group"><em>showroom.studio/</em><input defaultValue="aarhus-line" /></span>
                </Field>
                <Field label="Contact email"><input defaultValue="studio@aarhusline.example" /></Field>
                <Field label="Time zone">
                  <Select value="Europe/Copenhagen (GMT+2)" options={['Europe/Copenhagen (GMT+2)', 'Europe/London (GMT+1)', 'UTC']} onChange={() => {}} />
                </Field>
              </div>
            </article>

            <article className="ss-card">
              <h2 className="ss-card-title">Publishing defaults</h2>
              <p className="ss-card-sub">Applied to every new showroom until you change it in the publish step.</p>
              <div className="ss-radio-list">
                {PUBLISHING_DEFAULTS.map(v => (
                  <button key={v.id} className={`ss-radio-row ${visibility === v.id ? 'on' : ''}`} onClick={() => setVisibility(v.id)}>
                    <Radio checked={visibility === v.id} />
                    <span><strong>{v.title}</strong><small>{v.body}</small></span>
                  </button>
                ))}
              </div>
            </article>
            {archive}
          </>}

          {tab === 'Branding' && <>
            <article className="ss-card">
              <h2 className="ss-card-title">Showroom branding</h2>
              <p className="ss-card-sub">Applied to viewer chrome, hotspot labels and the loading screen.</p>
              <div className="ss-branding-row">
                <button className="ss-logo-drop"><Icon name="imagePlus" size={20} /><small>LOGO</small></button>
                <div className="ss-branding-fields">
                  <Field label="Display name"><input defaultValue="Aarhus Line" /></Field>
                  <Field label="Accent colour">
                    <div className="ss-swatches">
                      {ACCENTS.map((c, i) => (
                        <button key={c} className={`ss-swatch ${accent === i ? 'on' : ''}`} style={{ background: c }} onClick={() => setAccent(i)} aria-label={c} />
                      ))}
                    </div>
                  </Field>
                </div>
              </div>
              <div className="ss-toggle-row">
                <div><strong>Show “Made with Showroom Studio”</strong><small>Small badge in the visitor toolbar.</small></div>
                <Toggle on={badge} onChange={setBadge} />
              </div>
              <div className="ss-toggle-row">
                <div><strong>Watermark panoramas</strong><small>Prevents screenshots from being reused off-site.</small></div>
                <Toggle on={watermark} onChange={setWatermark} />
              </div>
            </article>

            <article className="ss-card">
              <h2 className="ss-card-title">Viewer preview</h2>
              <div className="ss-viewer-preview">
                <div className="ss-viewer-bar"><strong>Aarhus Line</strong><span><Icon name="expand" size={13} />Fullscreen</span></div>
                <div className="ss-viewer-card"><span>Fold Bouclé Sofa</span><em>$2,480</em></div>
              </div>
            </article>
            {archive}
          </>}

          {tab === 'Notifications' && <>
            <article className="ss-card">
              <h2 className="ss-card-title">Email notifications</h2>
              <p className="ss-card-sub">Delivered to {USER.email}</p>
              <div className="ss-pref-list">
                {EMAIL_PREFS.map(p => (
                  <div className="ss-toggle-row" key={p.id}>
                    <div><strong>{p.title}</strong><small>{p.body}</small></div>
                    <Toggle on={prefs[p.id]} onChange={v => setPrefs({ ...prefs, [p.id]: v })} />
                  </div>
                ))}
              </div>
              <button className="ss-btn"><Icon name="mail" size={16} />Update preferences</button>
            </article>
            {archive}
          </>}

          {tab === 'Plan' && <>
            <article className="ss-plan">
              <span className="ss-plan-eyebrow">STUDIO PLAN</span>
              <h2>Growth · 20 GB panoramas</h2>
              <p>Unlimited scenes, 48 photo stitches per month, password-protected tours and client analytics.</p>
              <div className="ss-plan-actions">
                <button className="ss-btn primary">Compare plans</button>
                <button className="ss-btn dark">Billing history</button>
              </div>
            </article>

            <article className="ss-card">
              <h2 className="ss-card-title">Usage this month</h2>
              <div className="ss-usage">
                {[
                  { label: 'Panorama storage', value: '6.2 GB', foot: '31% of 20 GB' },
                  { label: 'Photo stitches', value: '18 / 48', foot: '38% of quota' },
                  { label: 'Published tours', value: '7', foot: 'Unlimited' },
                ].map(u => (
                  <div className="ss-usage-tile" key={u.label}>
                    <small>{u.label}</small>
                    <strong>{u.value}</strong>
                    <em>{u.foot}</em>
                  </div>
                ))}
              </div>
            </article>
            {archive}
          </>}
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ----------------------------------------------------------- create wizard */

function Stepper({ step, onStep }) {
  return (
    <ol className="ss-stepper">
      {WIZARD_STEPS.map(s => {
        const state = s.n < step ? 'done' : s.n === step ? 'current' : 'todo';
        return (
          <li key={s.n} className={state}>
            <button onClick={() => onStep(s.n)}>
              <span className="ss-step-n">{state === 'done' ? <Icon name="check" size={13} strokeWidth={3} /> : s.n}</span>
              <span className="ss-step-label">{s.label}</span>
              <Icon name={s.icon} size={16} className="ss-step-icon" />
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function CreateWizard({ go }) {
  const [step, setStep] = useState(1);
  const [uploaded, setUploaded] = useState(false);
  const [space, setSpace] = useState('furniture');
  const [visibility, setVisibility] = useState('anyone');
  const [adding, setAdding] = useState(false);
  const [preview, setPreview] = useState(null);
  const [toast, setToast] = useState(null);

  const photos = uploaded ? UPLOAD_PHOTOS : [];
  const sceneNames = ['Living Lounge', 'Dining Hall'];

  return (
    <div className="ss-page">
      <button className="ss-backlink" onClick={() => go('showrooms')}><Icon name="arrowLeft" size={15} />Back to My Showrooms</button>

      <header className="ss-wizard-head">
        <div>
          <h1>Create a showroom <span className="ss-chip outline">DRAFT</span></h1>
          <p>Aarhus Line — Flagship Showroom · {photos.length} photos · {uploaded ? 2 : 0} scenes</p>
        </div>
        <div className="ss-wizard-head-actions">
          <span className="ss-saved"><Icon name="refresh" size={14} />Draft saved just now</span>
          <button className="ss-btn" onClick={() => go('showrooms')}><Icon name="save" size={16} />Save &amp; exit</button>
        </div>
      </header>

      <Stepper step={step} onStep={setStep} />

      {step === 1 && (
        <div className="ss-grid-main-rail">
          <article className="ss-card ss-pad">
            <div className="ss-step-head">
              <span className="ss-tile-icon"><Icon name="doc" size={18} /></span>
              <div><h2>Project details</h2><p>You can rename everything later.</p></div>
            </div>
            <Field label="Showroom name *" hint="Visible to visitors"><input defaultValue="Aarhus Line — Flagship Showroom" /></Field>
            <Field label="Business or venue name" hint="Optional"><input defaultValue="Aarhus Line Furniture" /></Field>
            <Field label="Short description" counter="139/280">
              <textarea rows={3} defaultValue="A slow walk through our Copenhagen flagship: the lounge, the dining hall and the materials library where every finish can be felt up close." />
            </Field>
            <Field label="Space type">
              <div className="ss-choice-row">
                {SPACE_TYPES.map(s => (
                  <button key={s.id} className={`ss-choice ${space === s.id ? 'on' : ''}`} onClick={() => setSpace(s.id)}>
                    <span className="ss-choice-icon"><Icon name={s.icon} size={17} /></span>
                    <strong>{s.title}</strong>
                    <small>{s.body}</small>
                  </button>
                ))}
              </div>
            </Field>
            <div className="ss-card-foot">
              <span className="ss-muted-row"><Icon name="timer" size={14} />About 10 minutes for a 3-scene showroom</span>
              <button className="ss-btn primary lg" onClick={() => setStep(2)}>Continue to photos <Icon name="arrowRight" size={16} /></button>
            </div>
          </article>

          <aside className="ss-rail">
            <article className="ss-card ss-tip-card">
              <Photo tone="lounge" className="ss-tip-photo"><span className="ss-chip light top-left sm">Good scene example</span></Photo>
              <div className="ss-pad-sm">
                <h2 className="ss-card-title">A scene is one room, one viewpoint</h2>
                <p className="ss-card-sub">A group of overlapping photos becomes a scene. Link several scenes together and you have a virtual showroom.</p>
                <ol className="ss-numbered">
                  <li><em>1</em>Name the project</li>
                  <li><em>2</em>Upload 6–12 photos per room</li>
                  <li><em>3</em>Stitch, review, and link scenes</li>
                </ol>
              </div>
            </article>

            <article className="ss-card mint">
              <h2 className="ss-card-title"><Icon name="bulb" size={16} /> Not sure what to shoot?</h2>
              <p className="ss-card-sub">Start with the widest view of the room, then turn slightly right for each photo. Keep the camera at chest height and don’t change zoom.</p>
            </article>
          </aside>
        </div>
      )}

      {step === 2 && (
        <div className="ss-grid-main-rail">
          <div className="ss-col">
            <article className="ss-card ss-pad">
              <div className="ss-card-head">
                <div><h2>Upload photos</h2><p>Drag files in, or add sample photos to try the flow.</p></div>
                <button className="ss-btn" onClick={() => setUploaded(true)}><Icon name="sparkle" size={16} />Add sample photos</button>
              </div>
              <button className="ss-dropzone" onClick={() => setUploaded(true)}>
                <span className="ss-drop-icon"><Icon name="imagePlus" size={22} /></span>
                <strong>Drop overlapping photos here</strong>
                <small>Or <u>choose files</u> from your device. JPEG, PNG or HEIC · up to 40 MB each.</small>
              </button>
              {uploaded && (
                <div className="ss-upload-progress">
                  <Icon name="upload" size={17} />
                  <div>
                    <div className="ss-upload-row"><span>Uploading photos — 6 of 6 ready</span><em>100%</em></div>
                    <i className="ss-mini-bar"><b style={{ width: '100%' }} /></i>
                  </div>
                </div>
              )}
            </article>

            {sceneNames.map((sceneName, si) => {
              const group = photos.filter(p => p.scene === sceneName);
              return (
                <article className="ss-card ss-pad" key={sceneName}>
                  <div className="ss-card-head">
                    <div className="ss-step-head tight">
                      <span className="ss-tile-icon"><Icon name="grid" size={16} /></span>
                      <div><h2>{sceneName}</h2><p>{group.length} photos · not stitched yet</p></div>
                    </div>
                    <span className="ss-chip outline">Scene {si + 1}</span>
                  </div>
                  {group.length === 0
                    ? <div className="ss-empty-strip">No photos assigned to this scene yet.</div>
                    : <div className="ss-upload-grid">
                      {group.map(p => (
                        <div className="ss-upload-tile" key={p.name}>
                          <Photo tone={p.tone} className="ss-upload-photo">
                            <span className="ss-tick"><Icon name="check" size={11} strokeWidth={3} /></span>
                            <span className="ss-upload-tools">
                              <button aria-label="Move left"><Icon name="arrowLeft" size={13} /></button>
                              <button aria-label="Move right"><Icon name="arrowRight" size={13} /></button>
                              <button className="ss-push" aria-label="Remove"><Icon name="trash" size={13} /></button>
                            </span>
                          </Photo>
                          <small>{p.name}</small>
                          <Select small value={p.scene} options={sceneNames} onChange={() => {}} />
                        </div>
                      ))}
                    </div>}
                </article>
              );
            })}

            {adding
              ? <div className="ss-inline-add">
                <input autoFocus placeholder="Scene name, e.g. Dining Hall" />
                <button className="ss-btn primary" onClick={() => setAdding(false)}>Add</button>
                <button className="ss-btn ghost" onClick={() => setAdding(false)}>Cancel</button>
              </div>
              : <button className="ss-dashed-btn" onClick={() => setAdding(true)}><Icon name="plus" size={16} />Add another scene</button>}

            <div className="ss-wizard-foot">
              <button className="ss-btn" onClick={() => setStep(1)}><Icon name="arrowLeft" size={15} />Back</button>
              <button className="ss-btn primary lg" disabled={!uploaded} onClick={() => setStep(3)}>
                Stitch {photos.length} photos <Icon name="sparkle" size={16} />
              </button>
            </div>
          </div>

          <aside className="ss-rail">
            <article className="ss-card">
              <h2 className="ss-card-title">Overlap guide</h2>
              <p className="ss-card-sub">Aim for 40% shared content.</p>
              <div className="ss-overlap">
                <span className="ss-overlap-frame" />
                <span className="ss-overlap-frame mid" />
                <span className="ss-overlap-frame" />
              </div>
              <div className="ss-overlap-legend"><small>Frame 1</small><em>40% overlap</em><small>Frame 2</small></div>
            </article>

            <article className="ss-card">
              <h2 className="ss-card-title">Photo quality checklist</h2>
              <ul className="ss-check-list">
                <li><span className="ss-tint-icon"><Icon name="sun" size={15} /></span>Even, natural lighting</li>
                <li><span className="ss-tint-icon"><Icon name="focus" size={15} /></span>Sharp focus across the frame</li>
                <li><span className="ss-tint-icon"><Icon name="eyeOff" size={15} /></span>No people or moving objects</li>
                <li><span className="ss-tint-icon"><Icon name="pen" size={15} /></span>Camera level, same height each shot</li>
              </ul>
            </article>

            <article className="ss-card clay">
              <h2 className="ss-card-title"><Icon name="info" size={16} /> Grouping matters</h2>
              <p className="ss-card-sub">Each group of photos is stitched into its own scene. Furnishing a full showroom? Plan 3–5 scenes, one per room or display zone.</p>
            </article>
          </aside>
        </div>
      )}

      {step === 3 && (
        <div className="ss-col">
          <article className="ss-card ss-pad ss-stitch-head">
            <div>
              <h2>Stitching “Living Lounge” <span className="ss-chip outline">SIMULATED</span></h2>
              <p>5 overlapping photos → one panoramic scene. Review before moving on.</p>
            </div>
            <div className="ss-wizard-head-actions">
              <button className="ss-btn"><Icon name="imagePlus" size={16} />Add more photos</button>
              <button className="ss-btn"><Icon name="refresh" size={16} />Retry stitching</button>
            </div>
          </article>

          <div className="ss-stitch-grid">
            <div className="ss-col">
              <article className="ss-card ss-pad-sm">
                <div className="ss-mini-head"><span>SELECTED PHOTOS</span><em>5</em></div>
                <ul className="ss-frame-list">
                  {STITCH_FRAMES.map(f => (
                    <li key={f.n} className={f.state === 'warn' ? 'warn' : ''}>
                      <Photo tone={f.tone} className="ss-frame-thumb"><span className="ss-frame-n">{f.n}</span></Photo>
                      <div>
                        <strong>{f.name}</strong>
                        <small className={f.state}><Icon name={f.state === 'warn' ? 'warn' : 'check'} size={12} strokeWidth={2.4} />{f.note}</small>
                      </div>
                    </li>
                  ))}
                </ul>
                <button className="ss-dashed-btn sm"><Icon name="imagePlus" size={15} />Replace an image</button>
              </article>

              <article className="ss-card mint">
                <h2 className="ss-card-title"><Icon name="info" size={16} /> Scene = one panorama</h2>
                <p className="ss-card-sub">This photo group becomes one navigable scene. Repeat the process for each room, then link them together.</p>
              </article>
            </div>

            <div className="ss-col">
              <Photo tone="pano" className="ss-stitch-preview">
                <span className="ss-chip clay top-left"><i className="ss-chip-dot" />Needs attention</span>
                <span className="ss-stitch-foot">
                  <small><Icon name="image" size={13} />Preview 9216 × 3456 · full resolution kept</small>
                  <small><Icon name="zoomIn" size={13} />Scroll to inspect seams</small>
                </span>
              </Photo>

              <article className="ss-card ss-pad-sm">
                <div className="ss-mini-head"><span>PROCESSING STAGES</span><em>72%</em></div>
                <i className="ss-mini-bar tall"><b className="clay" style={{ width: '72%' }} /></i>
                <div className="ss-stage-row">
                  {PROCESSING_STAGES.map(s => (
                    <div className={`ss-stage ${s.state}`} key={s.title}>
                      <span className="ss-stage-icon"><Icon name={s.state === 'ok' ? 'check' : 'close'} size={12} strokeWidth={3} /></span>
                      <div><strong>{s.title}</strong><small>{s.body}</small></div>
                    </div>
                  ))}
                </div>
              </article>

              <div className="ss-review-grid">
                <article className="ss-card ss-pad-sm">
                  <div className="ss-mini-head"><span>REVIEW NOTES</span><span className="ss-chip clay sm">1 blocking issue</span></div>
                  <ul className="ss-note-list">
                    {REVIEW_NOTES.map(n => (
                      <li key={n.title} className={n.tone}>
                        <Icon name={n.icon} size={16} />
                        <div>
                          <strong>{n.title}</strong>
                          <small>{n.body}</small>
                          {n.action && <button className="ss-link-btn sm">{n.action}</button>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="ss-card ss-pad-sm ss-next-card">
                  <div className="ss-mini-head"><span>NEXT</span></div>
                  <strong>Accept this panorama to build the tour</strong>
                  <p>You can re-stitch any scene later from the editor.</p>
                  <button className="ss-btn primary block" onClick={() => setStep(4)}><Icon name="check" size={16} />Accept anyway</button>
                  <button className="ss-btn block" onClick={() => setStep(2)}><Icon name="arrowLeft" size={15} />Back to photos</button>
                </article>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="ss-col">
          <article className="ss-card ss-pad ss-stitch-head">
            <div>
              <h2>Build your tour</h2>
              <p>Link scenes, drop product and navigation hotspots, then preview the visitor experience. You can refine everything later in the full editor.</p>
            </div>
            <div className="ss-wizard-head-actions">
              <button className="ss-btn" onClick={() => setStep(3)}><Icon name="arrowLeft" size={15} />Back</button>
              <button className="ss-btn" onClick={() => setPreview('Living Lounge')}><Icon name="play" size={15} />Preview</button>
              <button className="ss-btn primary lg" onClick={() => setStep(5)}>Continue to publish <Icon name="arrowRight" size={16} /></button>
            </div>
          </article>

          <div className="ss-build-grid">
            <article className="ss-card ss-pad-sm">
              <div className="ss-mini-head"><span>SCENES · 2</span></div>
              <ul className="ss-scene-list">
                {SCENES.slice(0, 2).map((s, i) => (
                  <li key={s.name} className={i === 0 ? 'active' : ''}>
                    <Photo tone={s.tone} className="ss-scene-thumb">
                      <span className="ss-scene-n">{i + 1}</span>
                      {i === 0 && <span className="ss-chip dark top-right sm"><Icon name="play" size={9} />START</span>}
                    </Photo>
                    <div><strong>{s.name}</strong><small>0 hotspots</small></div>
                  </li>
                ))}
              </ul>
              <button className="ss-dashed-btn sm"><Icon name="plus" size={15} />Add scene</button>
            </article>

            <article className="ss-card ss-pad-sm">
              <div className="ss-build-toolbar">
                <div className="ss-build-title"><strong>Living Lounge</strong><span className="ss-chip outline sm">0 hotspots</span></div>
                <div className="ss-toolgroup">
                  <button className="ss-tool"><Icon name="tag" size={14} />Product</button>
                  <button className="ss-tool"><Icon name="swap" size={14} />Navigation</button>
                  <button className="ss-tool"><Icon name="info" size={14} />Info label</button>
                </div>
              </div>
              <Photo tone="pano" className="ss-build-stage">
                <span className="ss-stage-hint left"><Icon name="move" size={13} />Drag to look around</span>
                <span className="ss-stage-hint right"><Icon name="zoomIn" size={13} />100%</span>
              </Photo>
              <div className="ss-mint-strip"><Icon name="info" size={14} />Navigation hotspots connect scenes. Add one on each doorway.</div>
            </article>

            <article className="ss-card ss-pad-sm">
              <h2 className="ss-card-title">Tour settings</h2>
              <p className="ss-card-sub">Choose where visitors begin.</p>
              <Field label="Starting scene">
                <Select value="Living Lounge" options={sceneNames} onChange={() => {}} />
              </Field>
              <div className="ss-soft-note">
                <strong>Starting direction</strong>
                <small>The preview opens facing the centre of the panorama. Fine-tune the yaw in the full editor.</small>
              </div>
              <div className="ss-mini-head"><span>HOTSPOTS IN THIS SCENE</span></div>
              <div className="ss-empty-strip">None yet. Use the toolbar above the panorama to add one.</div>
              <div className="ss-dark-summary">
                <strong>Total tour</strong>
                <small>2 scenes · 0 hotspots · starts at Living Lounge</small>
              </div>
            </article>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="ss-grid-main-rail">
          <article className="ss-card ss-pad">
            <div className="ss-step-head">
              <span className="ss-tile-icon"><Icon name="send" size={18} /></span>
              <div><h2>Publish showroom</h2><p>Last step — decide how it looks and who sees it.</p></div>
            </div>

            <Field label="Public title" hint=""><input defaultValue="Aarhus Line — Flagship Showroom" /></Field>
            <small className="ss-under-hint">Appears in the visitor toolbar and share previews.</small>

            <Field label="Cover image">
              <div className="ss-cover-row">
                <button className="ss-cover on">
                  <Photo tone="lounge" />
                  <span className="ss-tick"><Icon name="check" size={11} strokeWidth={3} /></span>
                </button>
                <button className="ss-cover"><Photo tone="dining" /></button>
                <button className="ss-cover"><Photo tone="materials" /></button>
              </div>
            </Field>

            <Field label="Visibility">
              <div className="ss-radio-list">
                {VISIBILITY.map(v => (
                  <button key={v.id} className={`ss-radio-row icon ${visibility === v.id ? 'on' : ''}`} onClick={() => setVisibility(v.id)}>
                    <span className="ss-vis-icon"><Icon name={v.icon} size={16} /></span>
                    <span><strong>{v.title}</strong><small>{v.body}</small></span>
                    <Radio checked={visibility === v.id} />
                  </button>
                ))}
              </div>
            </Field>

            <div className="ss-card-foot">
              <button className="ss-btn" onClick={() => setStep(4)}><Icon name="arrowLeft" size={15} />Back to tour</button>
              <button className="ss-btn primary lg" onClick={() => { setToast('Showroom published.'); go('editor'); }}>
                <Icon name="globe" size={16} />Publish showroom
              </button>
            </div>
          </article>

          <aside className="ss-rail">
            <article className="ss-card ss-visitor-card">
              <Photo tone="lounge" className="ss-visitor-photo"><span className="ss-chip light top-left sm">Visitor card preview</span></Photo>
              <div className="ss-pad-sm">
                <span className="ss-project-org">RETAIL · AARHUS LINE FURNITURE</span>
                <h2 className="ss-card-title">Aarhus Line — Flagship Showroom</h2>
                <p className="ss-card-sub">A slow walk through our Copenhagen flagship: the lounge, the dining hall and the materials library where every finish…</p>
                <div className="ss-visitor-meta">
                  <span><Icon name="grid" size={13} />2 scenes</span>
                  <span><Icon name="cursor" size={13} />0 hotspots</span>
                  <span><Icon name="lock" size={13} />Anyone</span>
                </div>
              </div>
            </article>

            <article className="ss-card">
              <h2 className="ss-card-title">Before you publish</h2>
              <ul className="ss-prepublish">
                <li className="done"><span className="ss-check"><Icon name="check" size={11} strokeWidth={3} /></span>Start scene is set</li>
                <li className="done"><span className="ss-check"><Icon name="check" size={11} strokeWidth={3} /></span>Cover image selected</li>
                <li><span className="ss-check" />At least one product hotspot</li>
                <li><span className="ss-check" />Team has reviewed the tour</li>
              </ul>
            </article>
          </aside>
        </div>
      )}

      {preview && <VisitorPreviewModal scene={preview} onScene={setPreview} onClose={() => setPreview(null)} scenes={sceneNames} />}
      {toast && <Toast text={toast} onClose={() => setToast(null)} />}

      <Footer />
    </div>
  );
}

function VisitorPreviewModal({ scene, scenes, onScene, onClose }) {
  const tone = scene === 'Dining Hall' ? 'dining' : 'pano';
  return (
    <div className="ss-modal-scrim" onClick={onClose}>
      <div className="ss-preview-modal" onClick={e => e.stopPropagation()}>
        <header>
          <span className="ss-brand-tile sm"><Icon name="target" size={15} /></span>
          <span><strong>Visitor preview</strong><small>{scene}</small></span>
          <button className="ss-btn ghost light" onClick={onClose}><Icon name="close" size={15} />Close preview</button>
        </header>
        <Photo tone={tone} className="ss-preview-stage">
          <span className="ss-toast inline"><Icon name="cursor" size={13} />Click hotspots to explore</span>
        </Photo>
        <footer>
          {scenes.map((s, i) => (
            <button key={s} className={scene === s ? 'active' : ''} onClick={() => onScene(s)}>{i + 1}. {s}</button>
          ))}
        </footer>
      </div>
    </div>
  );
}

function Toast({ text, onClose }) {
  return (
    <div className="ss-toast floating">
      <span className="ss-toast-tick"><Icon name="check" size={11} strokeWidth={3} /></span>
      {text}
      <button onClick={onClose} aria-label="Dismiss"><Icon name="close" size={14} /></button>
    </div>
  );
}

/* ----------------------------------------------------------------- editor */

function HotspotMarker({ h, active, onClick, label }) {
  const meta = HOTSPOT_META[h.kind];
  return (
    <button className={`ss-hotspot ${meta.tint} ${active ? 'active' : ''} ${h.kind === 'Navigation' ? 'nav' : ''}`}
      style={{ left: `${h.x}%`, top: `${h.y}%` }} onClick={onClick} title={h.label}>
      <Icon name={h.kind === 'Navigation' ? 'arrowRight' : meta.icon} size={14} strokeWidth={2} />
      {label && <span className="ss-hotspot-label">{h.label}</span>}
    </button>
  );
}

function Editor({ go }) {
  const [sceneName, setSceneName] = useState('Living Lounge');
  const [tab, setTab] = useState('Hotspot');
  const [selected, setSelected] = useState(null);
  const [placing, setPlacing] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [published, setPublished] = useState(false);
  const [dim, setDim] = useState(15);
  const [accent, setAccent] = useState(0);
  const [badge, setBadge] = useState(true);
  const [pulse, setPulse] = useState(true);

  const scene = SCENES.find(s => s.name === sceneName);
  const spots = HOTSPOTS[sceneName];
  const active = spots.find(s => s.id === selected) || null;

  return (
    <div className="ss-editor">
      <header className="ss-editor-top">
        <button className="ss-icon-btn boxed" onClick={() => go('showrooms')} aria-label="Back"><Icon name="arrowLeft" size={17} /></button>
        <div className="ss-editor-title">
          <h1>Aarhus Line — Flagship Showroom <span className="ss-chip mint sm"><i className="ss-chip-dot" />Published</span></h1>
          <p>Aarhus Line Furniture · 3 scenes · 9 hotspots</p>
        </div>
        <div className="ss-editor-actions">
          <div className="ss-undo">
            <button className="ss-icon-btn plain" disabled aria-label="Undo"><Icon name="undo" size={17} /></button>
            <button className="ss-icon-btn plain" disabled aria-label="Redo"><Icon name="redo" size={17} /></button>
          </div>
          <button className="ss-btn"><Icon name="save" size={16} />Save draft</button>
          <button className="ss-btn outline-green" onClick={() => go('preview')}><Icon name="play" size={15} />Preview</button>
          <button className="ss-btn primary" onClick={() => setPublished(true)}><Icon name="send" size={15} />Publish</button>
        </div>
      </header>

      <div className="ss-editor-body">
        <aside className="ss-editor-scenes">
          <div className="ss-mini-head"><span>SCENES · 3</span><button className="ss-icon-btn plain" aria-label="Add scene"><Icon name="plus" size={16} /></button></div>
          <ul className="ss-scene-list">
            {SCENES.map(s => (
              <li key={s.name} className={s.name === sceneName ? 'active' : ''} onClick={() => { setSceneName(s.name); setSelected(null); }}>
                <Photo tone={s.tone} className="ss-scene-thumb">
                  <span className="ss-scene-n">{s.n}</span>
                  {s.start && <span className="ss-chip dark top-right sm"><Icon name="play" size={9} />START</span>}
                </Photo>
                <div className="ss-scene-meta">
                  <div><strong>{s.name}</strong><small>{s.hotspots} hotspots</small></div>
                  <Icon name="flag" size={14} className={s.start ? 'ss-flag on' : 'ss-flag'} />
                </div>
              </li>
            ))}
          </ul>
          <button className="ss-dashed-btn"><Icon name="plus" size={16} />Add scene</button>
          <div className="ss-editor-note">
            <strong><Icon name="link" size={14} />Scene links</strong>
            <small>Add navigation hotspots at doorways so visitors can move between rooms.</small>
          </div>
        </aside>

        <section className="ss-editor-stage">
          <div className="ss-stage-toolbar">
            <div className="ss-stage-title">
              <Icon name="grid" size={17} />
              <strong>{sceneName}</strong>
              {scene.start && <span className="ss-start-tag"><Icon name="play" size={10} />Start scene</span>}
            </div>
            <div className="ss-stage-tools">
              <div className="ss-toolgroup">
                {['Product', 'Navigation', 'Info'].map(k => (
                  <button key={k} className={`ss-tool ${placing === k ? 'on' : ''}`} onClick={() => setPlacing(placing === k ? null : k)}>
                    <Icon name={HOTSPOT_META[k].icon} size={14} />{k}
                  </button>
                ))}
              </div>
              <div className="ss-zoom">
                <button onClick={() => setZoom(Math.max(80, zoom - 20))} aria-label="Zoom out"><Icon name="zoomOut" size={16} /></button>
                <span>{zoom}%</span>
                <button onClick={() => setZoom(Math.min(240, zoom + 20))} aria-label="Zoom in"><Icon name="zoomIn" size={16} /></button>
                <button onClick={() => setZoom(100)} aria-label="Reset view"><Icon name="refresh" size={16} /></button>
              </div>
            </div>
          </div>

          <Photo tone={scene.tone} className="ss-canvas">
            {placing && <span className="ss-place-hint">Click the panorama to place a {placing.toLowerCase()} hotspot · Esc to cancel</span>}
            {spots.map(h => (
              <HotspotMarker key={h.id} h={h} active={selected === h.id} label={selected === h.id}
                onClick={() => { setSelected(h.id); setTab('Hotspot'); }} />
            ))}
            <span className="ss-stage-hint left"><Icon name="move" size={13} />{zoom > 100 ? 'Drag to explore' : 'Zoom in to pan'}</span>
            <span className="ss-stage-hint right"><Icon name="pin" size={13} />{spots.length} hotspots · 3 scenes</span>
          </Photo>

          <div className="ss-pan">
            <div className="ss-pan-track"><i style={{ left: `${Math.min(80, (zoom - 100) / 2)}%` }} /></div>
            <small><Icon name="zoomIn" size={13} />Scroll to zoom</small>
          </div>
        </section>

        <aside className="ss-editor-panel">
          <div className="ss-panel-tabs">
            {['Hotspot', 'Scene', 'Branding'].map(t => (
              <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>
                {t}{t === 'Hotspot' && <em>{spots.length}</em>}
              </button>
            ))}
          </div>

          <div className="ss-panel-body">
            {tab === 'Hotspot' && !active && <>
              <div className="ss-panel-empty">
                <span className="ss-tile-icon"><Icon name="cursor" size={17} /></span>
                <strong>No hotspot selected</strong>
                <small>Pick one from the panorama or the list below, or use the toolbar to add a new one.</small>
              </div>
              <div className="ss-mini-head"><span>ALL HOTSPOTS IN THIS SCENE</span></div>
              <ul className="ss-hotspot-list">
                {spots.map(h => (
                  <li key={h.id} onClick={() => setSelected(h.id)}>
                    <span className={`ss-hs-icon ${HOTSPOT_META[h.kind].tint}`}><Icon name={HOTSPOT_META[h.kind].icon} size={14} /></span>
                    <div><strong>{h.label}</strong><small>{h.kind}</small></div>
                    {h.price && <em>{h.price}</em>}
                  </li>
                ))}
              </ul>
            </>}

            {tab === 'Hotspot' && active && <>
              <div className="ss-panel-head">
                <span className={`ss-kind-line ${HOTSPOT_META[active.kind].tint}`}>
                  <Icon name={HOTSPOT_META[active.kind].icon} size={13} />{active.kind.toUpperCase()}
                </span>
                <button className="ss-icon-btn plain" aria-label="Delete hotspot"><Icon name="trash" size={16} /></button>
              </div>
              <small className="ss-panel-pos">{active.pos}</small>

              {active.kind === 'Product' && (
                <div className="ss-product-row">
                  <Photo tone="sofa" className="ss-product-thumb" />
                  <div><strong>Product photo</strong><button className="ss-link-btn sm">Replace image</button></div>
                </div>
              )}

              <Field label="Label"><input key={active.id + 'l'} defaultValue={active.label} /></Field>
              <Field label="Description"><textarea key={active.id + 'd'} rows={3} defaultValue={active.description || ''} /></Field>

              {active.kind === 'Product' && <>
                <Field label="Price" hint="optional"><input key={active.id + 'p'} defaultValue={active.price} /></Field>
                <Field label="Product link"><input key={active.id + 'u'} defaultValue={active.link} /></Field>
              </>}

              {active.kind === 'Navigation' && (
                <Field label="Links to scene">
                  <Select value={active.target} options={SCENES.map(s => s.name)} onChange={() => {}} />
                </Field>
              )}

              <div className="ss-toggle-row inset">
                <div><strong>Pulse animation</strong><small>Draws attention to the hotspot</small></div>
                <Toggle on={pulse} onChange={setPulse} />
              </div>
              <button className="ss-btn block" onClick={() => setSelected(null)}>Deselect hotspot</button>
            </>}

            {tab === 'Scene' && <>
              <Field label="Scene name"><input key={sceneName} defaultValue={sceneName} /></Field>
              <div className="ss-soft-note row">
                <div><strong>Starting scene</strong><small>Visitor entry point</small></div>
                <em>{scene.start ? 'Set' : 'Not set'}</em>
              </div>
              <Field label="Starting direction" counter="0°">
                <input type="range" className="ss-range" min="-180" max="180" defaultValue="0" />
              </Field>
              <small className="ss-under-hint">Turns the initial view left or right when the scene opens.</small>
              <div className="ss-soft-note">
                <div className="ss-soft-head">
                  <div><strong>Panorama source</strong><small>{scene.hotspots} hotspots · stitched preview</small></div>
                  <button className="ss-btn sm"><Icon name="sparkle" size={14} />Re-stitch</button>
                </div>
                <Photo tone={scene.tone} className="ss-source-thumb" />
              </div>
              <div className="ss-soft-note">
                <strong>Scene order</strong>
                <small>Scene {SCENES.indexOf(scene) + 1} of {SCENES.length} in the tour</small>
              </div>
              <button className="ss-btn danger block"><Icon name="trash" size={15} />Delete scene</button>
            </>}

            {tab === 'Branding' && <>
              <Field label="Showroom name"><input defaultValue="Aarhus Line — Flagship Showroom" /></Field>
              <Field label="Accent colour">
                <div className="ss-swatches">
                  {ACCENTS.slice(0, 4).map((c, i) => (
                    <button key={c} className={`ss-swatch ${accent === i ? 'on' : ''}`} style={{ background: c }} onClick={() => setAccent(i)} aria-label={c} />
                  ))}
                </div>
              </Field>
              <Field label="Panorama dimming" counter={`${dim}%`}>
                <input type="range" className="ss-range" min="0" max="60" value={dim} onChange={e => setDim(+e.target.value)} />
              </Field>
              <div className="ss-toggle-row inset">
                <div><strong>Studio badge</strong><small>Shown in visitor toolbar</small></div>
                <Toggle on={badge} onChange={setBadge} />
              </div>
              <div className="ss-dark-summary">
                <span className="ss-dark-eyebrow">VISITOR HEADER PREVIEW</span>
                <strong>Aarhus Line — Flagship Showroom</strong>
              </div>
              <button className="ss-btn dark block">Apply branding</button>
            </>}
          </div>

          <div className="ss-panel-foot">
            <Icon name="list" size={14} />
            <small>Shortcuts: ⌘Z undo · Delete removes selected hotspot · Esc deselects</small>
          </div>
        </aside>
      </div>

      {published && (
        <div className="ss-modal-scrim" onClick={() => setPublished(false)}>
          <div className="ss-modal" onClick={e => e.stopPropagation()}>
            <div className="ss-modal-head">
              <div>
                <h2>Showroom is live</h2>
                <p>Share the link, embed it on your site, or open the visitor view.</p>
              </div>
              <button className="ss-icon-btn plain" onClick={() => setPublished(false)} aria-label="Close"><Icon name="close" size={18} /></button>
            </div>
            <div className="ss-modal-success">
              <span className="ss-success-tick"><Icon name="check" size={14} strokeWidth={3} /></span>
              3 scenes are now viewable at showroom.studio/aarhus-line
            </div>
            <div className="ss-sharebox">
              <span className="ss-mini-head"><span>SHARE LINK</span></span>
              <div className="ss-share-input">
                <input readOnly value="https://showroom.studio/aarhus-line" />
                <button className="ss-icon-btn plain" aria-label="Copy link"><Icon name="copy" size={16} /></button>
              </div>
            </div>
            <div className="ss-modal-actions">
              <button className="ss-btn primary" onClick={() => { setPublished(false); go('preview'); }}><Icon name="external" size={15} />Open Showroom</button>
              <button className="ss-btn" onClick={() => setPublished(false)}>Keep editing</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- preview */

function PreviewPage({ go }) {
  const [sceneName, setSceneName] = useState('Living Lounge');
  const [device, setDevice] = useState('desktop');
  const [open, setOpen] = useState(null);
  const [hint, setHint] = useState(true);
  const [toast, setToast] = useState(null);

  const scene = SCENES.find(s => s.name === sceneName);
  const spots = HOTSPOTS[sceneName];
  const card = spots.find(s => s.id === open) || null;
  const index = SCENES.indexOf(scene);

  return (
    <div className="ss-preview">
      <header className="ss-preview-top">
        <button className="ss-icon-btn dark" onClick={() => go('overview')} aria-label="Close preview"><Icon name="close" size={17} /></button>
        <span className="ss-brand-tile sm"><Icon name="target" size={16} /></span>
        <div className="ss-preview-title">
          <strong>Aarhus Line — Flagship Showroom</strong>
          <small><i className="ss-chip-dot" />Visitor preview · {sceneName}</small>
        </div>
        <div className="ss-preview-actions">
          <div className="ss-devtoggle">
            <button className={device === 'desktop' ? 'active' : ''} onClick={() => setDevice('desktop')} aria-label="Desktop"><Icon name="monitor" size={16} /></button>
            <button className={device === 'mobile' ? 'active' : ''} onClick={() => setDevice('mobile')} aria-label="Mobile"><Icon name="phone" size={16} /></button>
          </div>
          <button className="ss-btn ghost light" onClick={() => setToast('Visitor link copied.')}><Icon name="share" size={15} />Share</button>
          <button className="ss-btn primary" onClick={() => go('editor')}><Icon name="edit" size={15} />Edit showroom</button>
        </div>
      </header>

      <div className={`ss-preview-body ${device}`}>
        <Photo tone={scene.tone} className="ss-preview-canvas">
          <span className="ss-viewer-brand">
            <Avatar initials="AL" color="#2a7f6a" size={26} radius={7} />
            <span><strong>Aarhus Line Furniture</strong><small>{sceneName}</small></span>
          </span>
          <span className="ss-viewer-zoom">
            <button aria-label="Zoom out"><Icon name="zoomOut" size={16} /></button>
            <button aria-label="Zoom in"><Icon name="zoomIn" size={16} /></button>
            <button aria-label="Fullscreen"><Icon name="expand" size={16} /></button>
          </span>

          {spots.map(h => (
            <HotspotMarker key={h.id} h={h} active={open === h.id} onClick={() => { setOpen(h.id); setHint(false); }} />
          ))}

          {card && (
            <div className="ss-viewer-popup" style={{ left: `${Math.min(70, card.x)}%`, top: `${Math.min(66, card.y)}%` }}>
              <button className="ss-popup-close" onClick={() => setOpen(null)} aria-label="Close"><Icon name="close" size={14} /></button>
              {card.kind === 'Product' && <Photo tone="sofa" className="ss-popup-photo" />}
              <div className="ss-popup-body">
                <span className={`ss-kind-line ${HOTSPOT_META[card.kind].tint}`}>
                  <Icon name={HOTSPOT_META[card.kind].icon} size={12} />{card.kind.toUpperCase()}
                </span>
                <strong>{card.label}</strong>
                {card.description && <p>{card.description}</p>}
                {card.price && <div className="ss-popup-foot"><em>{card.price}</em><button className="ss-btn primary sm">View product</button></div>}
                {card.target && <button className="ss-btn primary sm block" onClick={() => { setSceneName(card.target); setOpen(null); }}>
                  Go to {card.target} <Icon name="arrowRight" size={14} />
                </button>}
              </div>
            </div>
          )}

          {hint && (
            <span className="ss-toast inline">
              <Icon name="cursor" size={13} />Click a hotspot to explore
              <button onClick={() => setHint(false)} aria-label="Dismiss"><Icon name="close" size={12} /></button>
            </span>
          )}
        </Photo>

        <div className="ss-preview-scenes">
          <div className="ss-scene-strip">
            {SCENES.map((s, i) => (
              <button key={s.name} className={s.name === sceneName ? 'active' : ''} onClick={() => { setSceneName(s.name); setOpen(null); }}>
                <Photo tone={s.tone} className="ss-strip-thumb" />
                <span><strong>{s.name}</strong><small>Scene {i + 1}</small></span>
              </button>
            ))}
          </div>
          <div className="ss-strip-nav">
            <button disabled={index === 0} onClick={() => setSceneName(SCENES[index - 1].name)} aria-label="Previous scene"><Icon name="chevronLeft" size={16} /></button>
            <button disabled={index === SCENES.length - 1} onClick={() => setSceneName(SCENES[index + 1].name)} aria-label="Next scene"><Icon name="chevronRight" size={16} /></button>
          </div>
        </div>

        <footer className="ss-preview-foot">
          <span>Aarhus Line — Flagship Showroom · 3 scenes · Made with Showroom Studio</span>
          <small>This is a visitor preview. Interactions are simulated in the prototype.</small>
        </footer>
      </div>

      {toast && <Toast text={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

/* ------------------------------------------------------------------- root */

// initialRoute: overview | showrooms | media | analytics | team | settings | create | editor | preview
function ShowroomStudio({ initialRoute = 'overview' }) {
  const [route, setRoute] = useState(initialRoute);
  const [drawer, setDrawer] = useState(false);
  const go = r => { setRoute(r); setDrawer(false); window.scrollTo?.({ top: 0 }); };

  if (route === 'editor') return <div className="ss-root"><style>{CSS}</style><Editor go={go} /></div>;
  if (route === 'preview') return <div className="ss-root"><style>{CSS}</style><PreviewPage go={go} /></div>;

  return (
    <div className="ss-root">
      <style>{CSS}</style>
      <div className="ss-shell">
        <Sidebar route={route} go={go} />
        {drawer && <>
          <button className="ss-drawer-scrim" aria-label="Close menu" onClick={() => setDrawer(false)} />
          <div className="ss-drawer"><Sidebar route={route} go={go} open onClose={() => setDrawer(false)} /></div>
        </>}
        <div className="ss-main">
          <Topbar go={go} onMenu={() => setDrawer(true)} />
          <main className="ss-content">
            {route === 'overview' && <Overview go={go} />}
            {route === 'showrooms' && <Showrooms go={go} />}
            {route === 'media' && <MediaLibrary />}
            {route === 'analytics' && <Analytics />}
            {route === 'team' && <Team />}
            {route === 'settings' && <Settings />}
            {route === 'create' && <CreateWizard go={go} />}
          </main>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- css */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap');

.ss-root{
  /* swap --ss-font for the studio's own face — everything else keys off these */
  --ss-font:'Figtree','Plus Jakarta Sans','Hanken Grotesk',system-ui,-apple-system,'Segoe UI',sans-serif;
  --ss-green:#2a7f6a;
  --ss-green-deep:#1d6b58;
  --ss-mint:#edfcf7;
  --ss-mint-line:#cfeade;
  --ss-clay:#bc7e53;
  --ss-clay-soft:#fdf4ec;
  --ss-clay-line:#ecd9c5;
  --ss-ink:#111817;
  --ss-ink-soft:#3b4449;
  --ss-muted:#6b6f68;
  --ss-faint:#9a9e97;
  --ss-bg:#f8f7f3;
  --ss-card:#fdfdfd;
  --ss-line:#e9e8e3;
  --ss-line-soft:#f0efea;
  --ss-dark:#121619;
  --ss-dark-2:#1b2124;
  --ss-r:14px;
  --ss-r-sm:10px;

  font-family:var(--ss-font);
  color:var(--ss-ink);
  background:var(--ss-bg);
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  font-size:15px;
  line-height:1.5;
  letter-spacing:-0.004em;
  width:100%;
  min-height:100vh;
  text-align:left;
}
.ss-root *,.ss-root *::before,.ss-root *::after{box-sizing:border-box;}
.ss-root h1,.ss-root h2,.ss-root h3,.ss-root p,.ss-root ul,.ss-root ol,.ss-root figure{margin:0;padding:0;}
.ss-root ul,.ss-root ol{list-style:none;}
/* :where() keeps these resets at zero specificity so single-class rules below win */
:where(.ss-root button){font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer;letter-spacing:inherit;text-align:inherit;}
:where(.ss-root input,.ss-root textarea,.ss-root select){font:inherit;color:inherit;letter-spacing:inherit;}
:where(.ss-root a){color:var(--ss-green);text-decoration:none;}
.ss-icon{flex:none;display:block;}

/* ------------------------------------------------------------ app shell */
.ss-shell{display:flex;min-height:100vh;width:100%;background:var(--ss-bg);}
.ss-main{flex:1;min-width:0;display:flex;flex-direction:column;}
.ss-content{flex:1;min-width:0;}
.ss-page{padding:32px;display:flex;flex-direction:column;gap:24px;max-width:1700px;}
.ss-col{display:flex;flex-direction:column;gap:24px;min-width:0;}

/* -------------------------------------------------------------- sidebar */
.ss-sidebar{
  width:263px;flex:none;background:var(--ss-card);border-right:1px solid var(--ss-line);
  display:flex;flex-direction:column;position:sticky;top:0;height:100vh;
}
.ss-brand{height:73px;flex:none;display:flex;align-items:center;gap:11px;padding:0 20px;border-bottom:1px solid var(--ss-line);}
.ss-brand-tile{width:36px;height:36px;border-radius:11px;background:var(--ss-green);color:#fff;display:grid;place-items:center;flex:none;}
.ss-brand-tile.sm{width:28px;height:28px;border-radius:8px;}
.ss-brand-text{display:flex;flex-direction:column;min-width:0;}
.ss-brand-text strong{font-size:16px;font-weight:700;letter-spacing:-0.02em;line-height:1.15;}
.ss-brand-text small{font-size:10px;font-weight:600;letter-spacing:.15em;color:var(--ss-faint);}
.ss-drawer-close{margin-left:auto;color:var(--ss-muted);}

.ss-sidebar-body{flex:1;overflow:auto;padding:18px 13px 10px;display:flex;flex-direction:column;}
.ss-workspace{
  display:flex;align-items:center;gap:11px;width:100%;padding:10px;border:1px solid var(--ss-line);
  border-radius:12px;background:var(--ss-card);text-align:left;
}
.ss-workspace:hover{background:#faf9f5;}
.ss-workspace > span:not(.ss-avatar){flex:1;min-width:0;display:flex;flex-direction:column;}
.ss-workspace strong{font-size:13.5px;font-weight:700;letter-spacing:-0.015em;}
.ss-workspace small{font-size:11.5px;color:var(--ss-muted);}
.ss-workspace .ss-icon{color:var(--ss-faint);}

.ss-nav-label{font-size:10px;font-weight:700;letter-spacing:.14em;color:var(--ss-faint);padding:0 10px;margin:24px 0 8px;}
.ss-sidebar nav{display:flex;flex-direction:column;gap:2px;}
.ss-nav-item{
  display:flex;align-items:center;gap:12px;height:42px;padding:0 11px;border-radius:10px;
  font-size:14.5px;font-weight:500;color:var(--ss-ink-soft);position:relative;
}
.ss-nav-item .ss-icon{color:var(--ss-muted);}
.ss-nav-item:hover{background:#f4f3ee;}
.ss-nav-item.active{background:var(--ss-mint);color:var(--ss-green);font-weight:600;}
.ss-nav-item.active .ss-icon{color:var(--ss-green);}
.ss-nav-dot{width:6px;height:6px;border-radius:50%;background:var(--ss-green);margin-left:auto;}

.ss-storage{margin-top:24px;background:#f6f5f0;border:1px solid var(--ss-line-soft);border-radius:12px;padding:14px;}
.ss-storage-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.ss-storage-top strong{font-size:13px;font-weight:600;}
.ss-storage-top .ss-icon{color:var(--ss-faint);}
.ss-storage-bar{height:5px;border-radius:99px;background:#e4e2db;overflow:hidden;}
.ss-storage-bar i{display:block;height:100%;background:var(--ss-green);border-radius:99px;}
.ss-storage small{display:block;font-size:11.5px;color:var(--ss-muted);margin-top:9px;}
.ss-storage a{display:inline-flex;align-items:center;gap:4px;font-size:12.5px;font-weight:600;margin-top:8px;}

.ss-sidebar-foot{flex:none;border-top:1px solid var(--ss-line);padding:13px;}
.ss-profile{display:flex;align-items:center;gap:11px;margin-bottom:12px;}
.ss-profile > span:not(.ss-avatar){flex:1;min-width:0;display:flex;flex-direction:column;}
.ss-profile strong{font-size:13.5px;font-weight:600;}
.ss-profile small{font-size:11.5px;color:var(--ss-muted);}

.ss-avatar{display:inline-grid;place-items:center;color:#fff;font-weight:700;letter-spacing:.01em;line-height:1;
  flex:0 0 auto;align-self:center;overflow:hidden;}

/* --------------------------------------------------------------- topbar */
.ss-topbar{
  height:73px;flex:none;display:flex;align-items:center;gap:16px;padding:0 32px;
  background:var(--ss-card);border-bottom:1px solid var(--ss-line);position:sticky;top:0;z-index:30;
}
.ss-search{
  display:flex;align-items:center;gap:10px;height:36px;width:518px;max-width:100%;padding:0 14px;
  border:1px solid var(--ss-line);border-radius:999px;background:var(--ss-bg);color:var(--ss-muted);
}
.ss-search.sm{height:34px;width:240px;}
.ss-search input{flex:1;min-width:0;border:0;background:none;outline:none;font-size:14px;color:var(--ss-ink);}
.ss-search input::placeholder{color:var(--ss-muted);}
.ss-search kbd{font:inherit;font-size:11px;font-weight:600;color:var(--ss-faint);background:#fff;border:1px solid var(--ss-line);border-radius:5px;padding:1px 5px;}
.ss-topbar-right{margin-left:auto;display:flex;align-items:center;gap:12px;}
.ss-ghost-link{display:inline-flex;align-items:center;gap:7px;font-size:14px;color:var(--ss-ink-soft);}
.ss-ghost-link:hover{color:var(--ss-ink);}
.ss-account{display:flex;align-items:center;gap:9px;}
.ss-account > span:not(.ss-avatar){display:flex;flex-direction:column;text-align:left;}
.ss-account strong{font-size:13.5px;font-weight:600;line-height:1.2;}
.ss-account small{font-size:11.5px;color:var(--ss-muted);line-height:1.2;}
.ss-account .ss-icon{color:var(--ss-faint);}
.ss-badge-dot{position:absolute;top:7px;right:8px;width:7px;height:7px;border-radius:50%;background:var(--ss-clay);border:1.5px solid #fff;}

/* ------------------------------------------------------- icon + buttons */
.ss-icon-btn{display:grid;place-items:center;width:36px;height:36px;border-radius:10px;color:var(--ss-ink-soft);position:relative;}
.ss-icon-btn.boxed{border:1px solid var(--ss-line);background:var(--ss-card);}
.ss-icon-btn.boxed:hover,.ss-icon-btn.is-open{background:var(--ss-bg);}
.ss-icon-btn.plain{color:var(--ss-muted);}
.ss-icon-btn.plain:hover{color:var(--ss-ink);background:var(--ss-bg);}
.ss-icon-btn.plain:disabled{opacity:.4;cursor:default;}
.ss-icon-btn.dark{background:#232a2d;color:#e8ece9;}
.ss-icon-btn.dark:hover{background:#2e3639;}
.ss-round-btn{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#fff;color:var(--ss-ink);box-shadow:0 2px 8px rgba(0,0,0,.18);}

.ss-btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;height:36px;padding:0 15px;
  border-radius:10px;border:1px solid var(--ss-line);background:var(--ss-card);
  font-size:14px;font-weight:600;letter-spacing:-0.01em;color:var(--ss-ink);white-space:nowrap;
}
.ss-btn:hover{background:var(--ss-bg);}
.ss-btn.lg{height:44px;padding:0 20px;border-radius:11px;font-size:15px;}
.ss-btn.sm{height:32px;padding:0 12px;font-size:13px;border-radius:9px;}
.ss-btn.block{width:100%;}
.ss-btn.primary{background:var(--ss-green);border-color:var(--ss-green);color:#fff;}
.ss-btn.primary:hover{background:#246d5b;border-color:#246d5b;}
.ss-btn.primary:disabled{opacity:.45;cursor:default;}
.ss-btn.dark{background:var(--ss-dark);border-color:var(--ss-dark);color:#fff;}
.ss-btn.dark:hover{background:#1d2427;}
.ss-btn.clay{background:var(--ss-clay);border-color:var(--ss-clay);color:#fff;}
.ss-btn.clay:hover{background:#a96f46;}
.ss-btn.outline-green{color:var(--ss-green);border-color:var(--ss-green);}
.ss-btn.outline-green:hover{background:var(--ss-mint);}
.ss-btn.danger{color:#a4543a;border-color:var(--ss-clay-line);background:var(--ss-clay-soft);}
.ss-btn.ghost{border-color:transparent;background:transparent;}
.ss-btn.ghost.light{color:#e8ece9;border-color:#39413f;background:transparent;}
.ss-btn.ghost.light:hover{background:#232a2d;}
.ss-link-btn{display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:600;color:var(--ss-green);}
.ss-link-btn.sm{font-size:12.5px;}
.ss-link-btn:hover{text-decoration:underline;}
.ss-backlink{display:inline-flex;align-items:center;gap:7px;font-size:13.5px;font-weight:500;color:var(--ss-muted);}
.ss-backlink:hover{color:var(--ss-ink);}

/* ---------------------------------------------------------------- cards */
.ss-card{background:var(--ss-card);border:1px solid var(--ss-line);border-radius:var(--ss-r);padding:22px;}
.ss-card.ss-pad{padding:26px;}
.ss-card.ss-pad-sm{padding:16px;}
.ss-card.mint{background:var(--ss-mint);border-color:var(--ss-mint-line);}
.ss-card.clay{background:var(--ss-clay-soft);border-color:var(--ss-clay-line);}
.ss-card-title{font-size:16px;font-weight:700;letter-spacing:-0.02em;display:flex;align-items:center;gap:7px;}
.ss-card-sub{font-size:13px;color:var(--ss-muted);margin-top:5px !important;line-height:1.5;}
.ss-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:16px;}
.ss-card-head h2{font-size:16.5px;font-weight:700;letter-spacing:-0.02em;}
.ss-card-head p{font-size:13px;color:var(--ss-muted);margin-top:4px !important;}
.ss-card-foot{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:22px;padding-top:20px;border-top:1px solid var(--ss-line-soft);}
.ss-muted-row{display:inline-flex;align-items:center;gap:7px;font-size:13px;color:var(--ss-muted);}
.ss-card.warnbox{display:flex;align-items:center;justify-content:space-between;gap:20px;background:var(--ss-clay-soft);border-color:var(--ss-clay-line);}
.ss-card.warnbox strong{display:block;font-size:14.5px;font-weight:600;color:#8a5433;}
.ss-card.warnbox small{display:block;font-size:13px;color:#9b7152;margin-top:3px;}

.ss-section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-top:4px;}
.ss-section-head h2{font-size:21px;font-weight:700;letter-spacing:-0.025em;}
.ss-section-head p{font-size:14px;color:var(--ss-muted);margin-top:4px !important;}

.ss-page-head{display:flex;align-items:flex-start;justify-content:space-between;gap:28px;flex-wrap:wrap;}
.ss-page-head-text{max-width:660px;}
.ss-page-head-actions{display:flex;align-items:center;gap:12px;flex-wrap:wrap;}
.ss-eyebrow{display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:700;letter-spacing:.13em;color:var(--ss-green);}
.ss-eyebrow i{width:5px;height:5px;border-radius:50%;background:var(--ss-green);}
.ss-page-head h1{font-size:34px;font-weight:700;letter-spacing:-0.035em;line-height:1.1;margin-top:9px !important;}
.ss-page-head p{font-size:15px;color:var(--ss-muted);margin-top:11px !important;line-height:1.55;}

.ss-footer{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;
  padding-top:22px;border-top:1px solid var(--ss-line);font-size:12.5px;color:var(--ss-faint);margin-top:8px;}
.ss-footer nav{display:flex;gap:20px;}
.ss-footer a{color:var(--ss-faint);}
.ss-footer a:hover{color:var(--ss-ink-soft);}

/* ------------------------------------------------------------- chips etc */
.ss-chip{
  display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 9px;border-radius:999px;
  font-size:11.5px;font-weight:600;letter-spacing:-0.005em;white-space:nowrap;
}
.ss-chip.sm{height:20px;font-size:10px;padding:0 7px;gap:4px;letter-spacing:.04em;}
.ss-chip.dark{background:rgba(16,20,22,.74);color:#fff;backdrop-filter:blur(6px);}
.ss-chip.light{background:rgba(255,255,255,.92);color:var(--ss-ink);backdrop-filter:blur(6px);}
.ss-chip.outline{background:var(--ss-bg);border:1px solid var(--ss-line);color:var(--ss-muted);letter-spacing:.06em;font-size:10.5px;}
.ss-chip.mint{background:var(--ss-mint);color:var(--ss-green);}
.ss-chip.clay{background:var(--ss-clay);color:#fff;}
.ss-chip-dot{width:6px;height:6px;border-radius:50%;background:var(--ss-green);}
.ss-chip.clay .ss-chip-dot{background:#fff;}
.ss-chip.light.clay{background:rgba(255,255,255,.92);color:var(--ss-ink);}
.ss-chip.light.clay .ss-chip-dot{background:var(--ss-clay);}
.ss-chip.light.grey .ss-chip-dot{background:#9aa09c;}
.ss-chip.top-left{position:absolute;top:12px;left:12px;z-index:3;}
.ss-chip.top-right{position:absolute;top:12px;right:12px;z-index:3;}

.ss-pill{display:inline-flex;align-items:center;gap:4px;height:23px;padding:0 9px;border-radius:999px;
  background:var(--ss-mint);color:var(--ss-green);font-size:11.5px;font-weight:600;white-space:nowrap;}
.ss-pill-clay{background:var(--ss-clay-soft);color:#9b6236;}
.ss-up{color:var(--ss-green);}

.ss-status{display:inline-flex;align-items:center;gap:6px;height:22px;padding:0 9px;border-radius:999px;
  font-size:11.5px;font-weight:600;background:var(--ss-mint);color:var(--ss-green);}
.ss-status i{width:6px;height:6px;border-radius:50%;background:currentColor;}
.ss-status-clay{background:var(--ss-clay-soft);color:#9b6236;}
.ss-status-grey{background:#f1f0ec;color:var(--ss-muted);}

.ss-kindtag{display:inline-block;margin-left:7px;padding:2px 6px;border-radius:5px;font-size:9.5px;font-weight:700;letter-spacing:.07em;
  background:var(--ss-mint);color:var(--ss-green);vertical-align:middle;}
.ss-kindtag.navigation{background:#eef2f1;color:#51706a;}
.ss-kindtag.info{background:var(--ss-clay-soft);color:#9b6236;}
.ss-kindtag.invited{background:var(--ss-clay-soft);color:#9b6236;}

.ss-tile-icon{display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:var(--ss-mint);color:var(--ss-green);flex:none;}
.ss-tint-icon{display:grid;place-items:center;width:26px;height:26px;border-radius:8px;background:var(--ss-mint);color:var(--ss-green);flex:none;}
.ss-tip-icon{display:grid;place-items:center;width:32px;height:32px;border-radius:10px;background:var(--ss-mint);color:var(--ss-green);flex:none;}

/* ---------------------------------------------------------------- photo */
.ss-photo{position:relative;overflow:hidden;background-size:cover;background-position:center;}
.ss-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.ss-photo-grain{position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(115deg,rgba(255,255,255,.22) 0%,rgba(255,255,255,0) 38%,rgba(0,0,0,.08) 100%);}

/* -------------------------------------------------------------- toggles */
.ss-toggle{width:42px;height:24px;border-radius:999px;background:#e1e0db;padding:3px;display:flex;flex:none;transition:background .15s;}
.ss-toggle span{width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:transform .15s;}
.ss-toggle.on{background:var(--ss-green);}
.ss-toggle.on span{transform:translateX(18px);}
.ss-radio{width:18px;height:18px;border-radius:50%;border:1.6px solid #d3d2cc;flex:none;display:block;position:relative;background:#fff;}
.ss-radio.on{border-color:var(--ss-green);border-width:5px;}

/* ---------------------------------------------------------------- forms */
.ss-field{display:block;margin-top:18px;}
.ss-field:first-child{margin-top:0;}
.ss-field-top{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:7px;}
.ss-field-label{font-size:13px;font-weight:600;color:var(--ss-ink-soft);}
.ss-field-hint{font-size:12px;color:var(--ss-faint);}
.ss-field input[type=text],.ss-field input:not([type]),.ss-field textarea,.ss-root .ss-field input{
  width:100%;height:46px;padding:0 14px;border:1px solid var(--ss-line);border-radius:10px;
  background:var(--ss-card);font-size:15px;outline:none;
}
.ss-field textarea{height:auto;padding:13px 14px;line-height:1.55;resize:vertical;}
.ss-field input:focus,.ss-field textarea:focus{border-color:var(--ss-green);box-shadow:0 0 0 3px rgba(42,127,106,.12);}
.ss-field-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px 22px;margin-top:18px;}
.ss-field-grid .ss-field{margin-top:0;}
.ss-under-hint{display:block;font-size:12px;color:var(--ss-faint);margin-top:7px;}
.ss-input-group{display:flex;align-items:center;height:46px;border:1px solid var(--ss-line);border-radius:10px;background:var(--ss-card);overflow:hidden;}
.ss-input-group em{padding:0 12px;font-style:normal;font-size:14px;color:var(--ss-faint);background:var(--ss-bg);align-self:stretch;display:flex;align-items:center;border-right:1px solid var(--ss-line);}
.ss-root .ss-input-group input{border:0 !important;height:100%;box-shadow:none !important;}

.ss-select{position:relative;display:block;}
.ss-select select{
  width:100%;height:46px;padding:0 38px 0 14px;border:1px solid var(--ss-line);border-radius:10px;
  background:var(--ss-card);font-size:15px;appearance:none;outline:none;cursor:pointer;
}
.ss-select .ss-icon{position:absolute;right:13px;top:50%;transform:translateY(-50%);color:var(--ss-muted);pointer-events:none;}
.ss-select.small select{height:32px;font-size:12.5px;padding:0 28px 0 10px;border-radius:8px;}
.ss-select.small .ss-icon{right:9px;}
.ss-range{width:100%;height:4px;appearance:none;background:#e4e2db;border-radius:99px;outline:none;}
.ss-range::-webkit-slider-thumb{appearance:none;width:13px;height:13px;border-radius:3px;background:var(--ss-dark);cursor:pointer;}
.ss-range::-moz-range-thumb{width:13px;height:13px;border:0;border-radius:3px;background:var(--ss-dark);cursor:pointer;}

/* ------------------------------------------------------------- popovers */
.ss-pop-wrap{position:relative;}
.ss-pop-scrim{position:fixed;inset:0;z-index:40;cursor:default;}
.ss-pop{position:absolute;top:calc(100% + 10px);right:0;z-index:50;background:#fff;border:1px solid var(--ss-line);
  border-radius:12px;box-shadow:0 18px 44px rgba(17,24,23,.14);overflow:hidden;}
.ss-pop-account{width:242px;padding:6px;}
.ss-pop-id{padding:12px 12px 13px;border-bottom:1px solid var(--ss-line-soft);margin-bottom:6px;}
.ss-pop-id strong{display:block;font-size:14px;font-weight:600;}
.ss-pop-id small{display:block;font-size:12.5px;color:var(--ss-muted);margin-top:2px;}
.ss-pop-account button{display:flex;align-items:center;gap:11px;width:100%;height:38px;padding:0 12px;border-radius:9px;font-size:14px;text-align:left;}
.ss-pop-account button:hover{background:var(--ss-bg);}
.ss-pop-account button .ss-icon{color:var(--ss-muted);}
.ss-pop-account hr{border:0;border-top:1px solid var(--ss-line-soft);margin:6px 0;}
.ss-pop-notifications{width:320px;}
.ss-pop-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid var(--ss-line-soft);}
.ss-pop-head strong{font-size:15px;font-weight:700;}
.ss-pop-head button{font-size:12.5px;font-weight:600;color:var(--ss-green);}
.ss-pop-notifications li{display:flex;gap:12px;padding:13px 16px;border-bottom:1px solid var(--ss-line-soft);}
.ss-pop-notifications li:last-child{border-bottom:0;}
.ss-pop-notifications li:hover{background:#fafaf7;}
.ss-note-icon{display:grid;place-items:center;width:30px;height:30px;border-radius:9px;background:var(--ss-mint);color:var(--ss-green);flex:none;}
.ss-note-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px;}
.ss-note-body strong{font-size:13.5px;font-weight:600;}
.ss-note-body small{font-size:12.5px;color:var(--ss-muted);line-height:1.45;}
.ss-note-body em{font-style:normal;font-size:10px;font-weight:600;letter-spacing:.1em;color:var(--ss-faint);margin-top:3px;}
.ss-note-dot{width:6px;height:6px;border-radius:50%;background:var(--ss-clay);flex:none;margin-top:5px;}

/* ---------------------------------------------------------------- grids */
.ss-stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
.ss-grid-724{display:grid;grid-template-columns:minmax(0,724fr) minmax(0,340fr);gap:24px;align-items:stretch;}
.ss-grid-724.ss-grid-top{align-items:start;}
.ss-grid-main-rail{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:24px;align-items:start;}
.ss-grid-equal{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start;}
.ss-rail{display:flex;flex-direction:column;gap:20px;min-width:0;}

/* ----------------------------------------------------------- stat cards */
.ss-stat{display:flex;flex-direction:column;min-height:196px;padding:20px;}
.ss-stat-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:28px;}
.ss-stat-icon{display:grid;place-items:center;width:38px;height:38px;border-radius:11px;background:var(--ss-mint);color:var(--ss-green);}
.ss-stat-label{font-size:13.5px;color:var(--ss-muted);}
.ss-stat-value{display:block;font-size:31px;font-weight:700;letter-spacing:-0.04em;line-height:1.15;margin-top:4px;}
.ss-stat-foot{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-top:auto;padding-top:18px;}
.ss-stat-foot small{font-size:12px;color:var(--ss-faint);}
.ss-spark{display:flex;align-items:flex-end;gap:2px;flex:none;}
.ss-spark i{flex:1;min-width:3px;background:#e7e6e0;border-radius:1px;}
.ss-spark i.lead{background:var(--ss-green);}
.ss-ring-text{font-size:11px;font-weight:700;fill:var(--ss-green);font-family:var(--ss-font);}

/* ------------------------------------------------------ feature + hero */
.ss-feature{border-radius:var(--ss-r);overflow:hidden;position:relative;min-height:236px;display:flex;}
.ss-feature-photo{flex:1;min-height:236px;display:flex;align-items:flex-end;}
.ss-feature-scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,14,13,.18) 0%,rgba(10,14,13,.1) 38%,rgba(10,14,13,.82) 100%);}
.ss-feature-body{position:relative;z-index:2;width:100%;padding:22px;color:#fff;}
.ss-feature-eyebrow{font-size:10.5px;font-weight:700;letter-spacing:.13em;color:rgba(255,255,255,.76);}
.ss-feature-body h2{font-size:25px;font-weight:700;letter-spacing:-0.035em;margin-top:7px !important;}
.ss-feature-row{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-top:13px;}
.ss-feature-meta{display:flex;gap:18px;flex-wrap:wrap;}
.ss-feature-meta li{display:flex;align-items:center;gap:6px;font-size:12.5px;color:rgba(255,255,255,.82);}
.ss-feature-actions{display:flex;gap:10px;}
.ss-feature-actions .ss-btn.dark{background:rgba(18,22,25,.82);border-color:rgba(255,255,255,.14);backdrop-filter:blur(6px);}

.ss-getting{display:flex;flex-direction:column;}
.ss-getting-top{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;}
.ss-getting-top h2{font-size:17px;font-weight:700;letter-spacing:-0.025em;}
.ss-getting-top p{font-size:12.5px;color:var(--ss-muted);margin-top:4px !important;}
.ss-getting-list{margin:18px 0;display:flex;flex-direction:column;}
.ss-getting-list li{display:flex;align-items:center;gap:11px;padding:9px 0;font-size:13.5px;}
.ss-getting-list li .ss-icon:last-child{margin-left:auto;color:var(--ss-faint);}
.ss-getting-list li.done{color:var(--ss-faint);text-decoration:line-through;}
.ss-check{display:grid;place-items:center;width:20px;height:20px;border-radius:50%;border:1.6px solid #d8d7d1;background:#fff;color:#fff;flex:none;}
.ss-getting-list li.done .ss-check,.ss-prepublish li.done .ss-check{background:var(--ss-green);border-color:var(--ss-green);}
.ss-getting .ss-btn{margin-top:auto;}

.ss-recent-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;align-items:start;}
.ss-create-tile{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;
  min-height:100%;padding:28px 22px;border:1.5px dashed #d9d7d0;border-radius:var(--ss-r);background:transparent;}
.ss-create-tile:hover{border-color:var(--ss-green);background:var(--ss-mint);}
.ss-create-plus{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:var(--ss-card);border:1px solid var(--ss-line);color:var(--ss-ink);}
.ss-create-tile strong{font-size:16px;font-weight:700;letter-spacing:-0.02em;}
.ss-create-tile p{font-size:13px;color:var(--ss-muted);max-width:210px;line-height:1.5;}
.ss-create-tile em{display:inline-flex;align-items:center;gap:5px;font-style:normal;font-size:13px;font-weight:600;color:var(--ss-green);margin-top:4px;}

.ss-recent-media .ss-card-head{margin-bottom:14px;align-items:center;}
.ss-media-mini{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.ss-media-thumb{aspect-ratio:4/3;border-radius:9px;}
.ss-recent-media small{display:block;font-size:12.5px;color:var(--ss-muted);margin-top:14px;}

.ss-top-performing .ss-card-head{align-items:center;}
.ss-rank-list{display:flex;flex-direction:column;gap:10px;}
.ss-rank-list li{display:flex;align-items:center;gap:14px;padding:12px;border:1px solid var(--ss-line-soft);border-radius:11px;}
.ss-rank-n{font-size:12px;font-weight:700;color:var(--ss-faint);flex:none;width:18px;}
.ss-rank-thumb{width:56px;height:38px;border-radius:7px;flex:none;}
.ss-rank-main{flex:1;min-width:0;}
.ss-rank-title{display:flex;align-items:center;gap:10px;}
.ss-rank-title strong{font-size:14.5px;font-weight:600;letter-spacing:-0.015em;}
.ss-rank-bar{display:flex;align-items:center;gap:12px;margin-top:8px;}
.ss-rank-bar i{height:6px;border-radius:99px;background:var(--ss-green);max-width:60%;flex:none;min-width:40px;}
.ss-rank-bar small{font-size:12px;color:var(--ss-muted);}
.ss-rank-avg{text-align:right;flex:none;}
.ss-rank-avg strong{display:block;font-size:15px;font-weight:700;letter-spacing:-0.02em;}
.ss-rank-avg small{display:block;font-size:9.5px;font-weight:600;letter-spacing:.1em;color:var(--ss-faint);margin-top:2px;}

.ss-cta{position:relative;overflow:hidden;border-radius:var(--ss-r);background:var(--ss-dark);color:#fff;
  display:flex;align-items:center;justify-content:space-between;gap:28px;flex-wrap:wrap;padding:34px 38px;}
.ss-cta-photo{position:absolute;inset:0;opacity:.3;}
.ss-cta-body{position:relative;z-index:2;max-width:620px;}
.ss-cta-eyebrow{font-size:10.5px;font-weight:700;letter-spacing:.13em;color:rgba(255,255,255,.64);}
.ss-cta-body h2{font-size:27px;font-weight:700;letter-spacing:-0.035em;margin-top:9px !important;}
.ss-cta-body p{font-size:14px;color:rgba(255,255,255,.72);margin-top:10px !important;line-height:1.55;}
.ss-cta-actions{position:relative;z-index:2;display:flex;gap:12px;flex-wrap:wrap;}
.ss-cta-actions .ss-btn.dark{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.18);color:#fff;}

/* ------------------------------------------------------ project / cards */
.ss-filterbar{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;padding:14px 16px;}
.ss-filterbar.bare{background:none;border:0;padding:0;}
.ss-filterbar-right{display:flex;align-items:center;gap:12px;flex-wrap:wrap;}
.ss-tabs{display:flex;align-items:center;gap:4px;}
.ss-tab{display:inline-flex;align-items:center;gap:7px;height:34px;padding:0 14px;border-radius:999px;font-size:13.5px;font-weight:600;color:var(--ss-ink-soft);}
.ss-tab:hover{background:var(--ss-bg);}
.ss-tab.active{background:var(--ss-dark);color:#fff;}
.ss-tab em{font-style:normal;font-size:11px;font-weight:600;opacity:.6;}
.ss-tab.active em{opacity:.75;}
.ss-viewtoggle{display:flex;border:1px solid var(--ss-line);border-radius:9px;overflow:hidden;}
.ss-viewtoggle button{display:grid;place-items:center;width:32px;height:32px;color:var(--ss-muted);}
.ss-viewtoggle button.active{background:var(--ss-bg);color:var(--ss-ink);}

.ss-project-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;align-items:start;}
.ss-project-grid.as-list{grid-template-columns:1fr;}
.ss-project{padding:0;overflow:hidden;}
.ss-project-photo{aspect-ratio:16/10;}
.ss-project.compact .ss-project-photo{aspect-ratio:16/9;}
.ss-project-hover{position:absolute;inset:auto 0 0 0;padding:12px;display:flex;align-items:center;justify-content:space-between;gap:12px;
  background:linear-gradient(180deg,rgba(10,14,13,0),rgba(10,14,13,.72));opacity:0;transition:opacity .16s;z-index:3;}
.ss-project:hover .ss-project-hover{opacity:1;}
.ss-project-hover small{font-size:12px;font-weight:600;color:#fff;}
.ss-project-body{padding:16px 18px 18px;}
.ss-project-title{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}
.ss-project-org{display:block;font-size:10.5px;font-weight:700;letter-spacing:.11em;color:var(--ss-faint);}
.ss-project-title h3{font-size:17px;font-weight:700;letter-spacing:-0.025em;margin-top:5px;line-height:1.25;}
.ss-project-meta{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:14px;
  padding-top:13px;border-top:1px solid var(--ss-line-soft);}
.ss-project-meta span{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;color:var(--ss-muted);}

.ss-tipbar,.ss-insight{display:flex;align-items:center;gap:14px;padding:16px 20px;border-radius:var(--ss-r);
  background:var(--ss-mint);border:1px solid var(--ss-mint-line);}
.ss-tipbar{background:var(--ss-card);border-color:var(--ss-line);}
.ss-tipbar p,.ss-insight p{flex:1;min-width:0;font-size:13.5px;color:var(--ss-ink-soft);line-height:1.5;}
.ss-insight .ss-tip-icon{background:#fff;}

/* ---------------------------------------------------------------- media */
.ss-asset-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.ss-asset{padding:0;overflow:hidden;}
.ss-asset-photo{aspect-ratio:16/11;}
.ss-asset-check{position:absolute;top:10px;left:10px;width:19px;height:19px;border-radius:6px;background:rgba(255,255,255,.88);
  border:1.4px solid rgba(17,24,23,.22);z-index:3;}
.ss-asset-body{padding:12px 13px 14px;}
.ss-asset-body strong{display:block;font-size:13.5px;font-weight:600;letter-spacing:-0.012em;}
.ss-asset-body small{display:block;font-size:11.5px;color:var(--ss-muted);margin-top:4px;}
.ss-storage-card h2{font-size:16px;font-weight:700;letter-spacing:-0.02em;}
.ss-storage-card p{font-size:12.5px;color:var(--ss-muted);margin-top:4px !important;}
.ss-storage-rows{display:flex;flex-direction:column;gap:12px;margin-top:16px;}
.ss-storage-rows li{display:grid;grid-template-columns:1fr 64px auto;align-items:center;gap:10px;font-size:12.5px;color:var(--ss-ink-soft);}
.ss-storage-rows small{color:var(--ss-muted);font-size:12px;text-align:right;}
.ss-mini-bar{display:block;height:5px;border-radius:99px;background:#eceae4;overflow:hidden;}
.ss-mini-bar.tall{height:7px;margin:10px 0 14px;}
.ss-mini-bar b{display:block;height:100%;background:var(--ss-green);border-radius:99px;}
.ss-mini-bar b.clay{background:var(--ss-clay);}
.ss-check-list{display:flex;flex-direction:column;gap:13px;margin-top:16px;}
.ss-check-list li{display:flex;align-items:center;gap:11px;font-size:13px;color:var(--ss-ink-soft);}

/* ------------------------------------------------------------ analytics */
.ss-legend{display:flex;align-items:center;gap:14px;font-size:12.5px;color:var(--ss-muted);}
.ss-legend span{display:inline-flex;align-items:center;gap:6px;}
.ss-legend em{font-style:normal;color:var(--ss-line);}
.ss-legend .dot{width:7px;height:7px;border-radius:50%;}
.ss-legend .sq{width:9px;height:9px;border-radius:2px;}
.dot.green,.sq.green{background:var(--ss-green);}
.dot.clay,.sq.clay{background:var(--ss-clay);}
.dot.grey{background:#c9ccc5;}
.ss-tabs.pill .ss-tab{height:32px;}

.ss-area{display:flex;gap:12px;margin-top:8px;}
.ss-area-y{display:flex;flex-direction:column;justify-content:space-between;height:200px;font-size:11px;color:var(--ss-faint);text-align:right;width:34px;flex:none;}
.ss-area-plot{position:relative;flex:1;min-width:0;}
.ss-area-svg{width:100%;height:200px;display:block;overflow:visible;}
.ss-grid-line{stroke:var(--ss-line-soft);stroke-width:1;vector-effect:non-scaling-stroke;}
.ss-area-fill{fill:rgba(42,127,106,.1);}
.ss-area-line{fill:none;stroke:var(--ss-green);stroke-width:2;vector-effect:non-scaling-stroke;stroke-linejoin:round;}
.ss-area-line.dashed{stroke:var(--ss-clay);stroke-dasharray:4 4;}
.ss-area-cursor{stroke:#cfd2cb;stroke-width:1;vector-effect:non-scaling-stroke;}
.ss-area-dot{position:absolute;width:9px;height:9px;border-radius:50%;border:2px solid #fff;transform:translate(-50%,50%);}
.ss-area-dot.green{background:var(--ss-green);}
.ss-area-dot.clay{background:var(--ss-clay);}
.ss-area-tip{position:absolute;top:22%;transform:translateX(-108%);background:#fff;border:1px solid var(--ss-line);
  border-radius:10px;padding:10px 12px;box-shadow:0 10px 26px rgba(17,24,23,.12);display:flex;flex-direction:column;gap:5px;white-space:nowrap;}
.ss-area-tip strong{font-size:12.5px;font-weight:700;}
.ss-area-tip span{font-size:12px;}
.ss-area-tip .green{color:var(--ss-green);}
.ss-area-tip .clay{color:var(--ss-clay);}
.ss-area-x{display:flex;justify-content:space-between;font-size:11px;color:var(--ss-faint);margin-top:9px;}

.ss-devices{display:flex;align-items:center;gap:18px;margin-top:16px;}
.ss-donut{position:relative;width:98px;height:98px;flex:none;}
.ss-donut svg{width:100%;height:100%;transform:rotate(-90deg);}
.ss-donut-seg{fill:none;stroke-width:5;}
.ss-donut-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
.ss-donut-center strong{font-size:17px;font-weight:700;letter-spacing:-0.03em;}
.ss-donut-center small{font-size:8.5px;font-weight:600;letter-spacing:.1em;color:var(--ss-faint);}
.ss-device-list{flex:1;display:flex;flex-direction:column;gap:11px;}
.ss-device-list li{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--ss-ink-soft);}
.ss-device-list em{margin-left:auto;font-style:normal;font-weight:600;font-size:13px;}

.ss-visited{display:flex;flex-direction:column;gap:14px;margin-top:16px;}
.ss-visited li{display:flex;align-items:center;gap:11px;}
.ss-visited li > div{flex:1;min-width:0;}
.ss-visited-thumb{width:46px;height:34px;border-radius:7px;flex:none;}
.ss-visited-row{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:6px;}
.ss-visited-row strong{font-size:13px;font-weight:600;}
.ss-visited-row small{font-size:12px;color:var(--ss-muted);}

.ss-bars{margin-top:8px;}
.ss-bar-group{display:flex;align-items:center;gap:14px;margin-bottom:18px;}
.ss-bar-label{width:88px;flex:none;font-size:12px;color:var(--ss-ink-soft);text-align:right;line-height:1.25;}
.ss-bar-stack{flex:1;min-width:0;display:flex;flex-direction:column;gap:5px;}
.ss-bar-stack i{height:13px;border-radius:0 3px 3px 0;}
.ss-bar-stack i.green{background:var(--ss-green);}
.ss-bar-stack i.clay{background:var(--ss-clay);}
.ss-bar-axis{display:flex;justify-content:space-between;font-size:11px;color:var(--ss-faint);margin-left:102px;}

.ss-interactions{display:flex;flex-direction:column;}
.ss-interactions li{display:flex;align-items:center;gap:14px;padding:13px 0;border-bottom:1px solid var(--ss-line-soft);}
.ss-interactions li:last-child{border-bottom:0;}
.ss-interaction-main{flex:1;min-width:0;}
.ss-interaction-main strong{font-size:13.5px;font-weight:600;}
.ss-interaction-main small{display:block;font-size:12px;color:var(--ss-muted);margin-top:3px;}
.ss-interaction-num{text-align:right;flex:none;}
.ss-interaction-num strong{display:block;font-size:14.5px;font-weight:700;letter-spacing:-0.02em;}
.ss-interaction-num small{display:block;font-size:11px;color:var(--ss-faint);margin-top:2px;}

/* ----------------------------------------------------------------- team */
.ss-member-list li{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid var(--ss-line-soft);}
.ss-member-list li:last-child{border-bottom:0;}
.ss-member-id{flex:1;min-width:0;}
.ss-member-id strong{display:flex;align-items:center;gap:0;font-size:14.5px;font-weight:600;letter-spacing:-0.015em;}
.ss-member-id small{display:block;font-size:12.5px;color:var(--ss-muted);margin-top:3px;}
.ss-member-stat{text-align:right;flex:none;}
.ss-member-stat span{display:block;font-size:12.5px;color:var(--ss-muted);}
.ss-member-stat small{display:block;font-size:11.5px;color:var(--ss-faint);margin-top:2px;}
.ss-invite-list{margin-top:14px;}
.ss-invite-list li{display:flex;align-items:center;gap:13px;}
.ss-role-list{display:flex;flex-direction:column;gap:10px;margin-top:16px;}
.ss-role-list li{background:var(--ss-bg);border-radius:10px;padding:12px 13px;}
.ss-role-list li > div{display:flex;align-items:baseline;justify-content:space-between;gap:10px;}
.ss-role-list strong{font-size:13.5px;font-weight:600;}
.ss-role-list em{font-style:normal;font-size:9.5px;font-weight:700;letter-spacing:.1em;color:var(--ss-green);}
.ss-role-list small{display:block;font-size:12px;color:var(--ss-muted);margin-top:4px;line-height:1.45;}
.ss-client-links .ss-tile-icon{background:#fff;margin-bottom:14px;}
.ss-client-links .ss-btn{margin-top:16px;background:#fff;}

/* ------------------------------------------------------------- settings */
.ss-settings{display:grid;grid-template-columns:220px minmax(0,1fr);gap:28px;align-items:start;}
.ss-settings-nav{display:flex;flex-direction:column;gap:3px;}
.ss-settings-nav button{height:44px;padding:0 16px;border-radius:10px;text-align:left;font-size:14px;color:var(--ss-muted);}
.ss-settings-nav button:hover{color:var(--ss-ink);}
.ss-settings-nav button.active{background:var(--ss-card);border:1px solid var(--ss-line);color:var(--ss-ink);font-weight:600;}
.ss-settings-body{display:flex;flex-direction:column;gap:22px;min-width:0;}
.ss-radio-list{display:flex;flex-direction:column;gap:10px;margin-top:14px;}
.ss-radio-row{display:flex;align-items:center;gap:14px;width:100%;padding:15px 16px;border:1px solid var(--ss-line);
  border-radius:11px;background:var(--ss-card);text-align:left;}
.ss-radio-row:hover{background:var(--ss-bg);}
.ss-radio-row.on{border-color:var(--ss-green);background:var(--ss-mint);}
.ss-radio-row > span:not(.ss-vis-icon):not(.ss-radio){flex:1;min-width:0;}
.ss-radio-row strong{display:block;font-size:14px;font-weight:600;}
.ss-radio-row small{display:block;font-size:12.5px;color:var(--ss-muted);margin-top:3px;}
.ss-radio-row.icon .ss-radio{order:3;}
.ss-vis-icon{display:grid;place-items:center;width:34px;height:34px;border-radius:9px;background:var(--ss-bg);color:var(--ss-muted);flex:none;}
.ss-radio-row.on .ss-vis-icon{background:var(--ss-green);color:#fff;}
.ss-toggle-row{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:15px 16px;
  border:1px solid var(--ss-line);border-radius:11px;margin-top:12px;}
.ss-toggle-row.inset{background:var(--ss-bg);border-color:var(--ss-line-soft);}
.ss-toggle-row strong{display:block;font-size:14px;font-weight:600;}
.ss-toggle-row small{display:block;font-size:12.5px;color:var(--ss-muted);margin-top:3px;}
.ss-pref-list{margin-bottom:20px;}
.ss-branding-row{display:flex;gap:20px;margin-top:18px;}
.ss-branding-fields{flex:1;min-width:0;}
.ss-logo-drop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;width:78px;height:78px;flex:none;
  border:1.5px dashed #d9d7d0;border-radius:11px;color:var(--ss-muted);}
.ss-logo-drop small{font-size:9px;font-weight:700;letter-spacing:.11em;}
.ss-swatches{display:flex;gap:11px;}
.ss-swatch{width:32px;height:32px;border-radius:50%;border:2px solid transparent;box-shadow:0 0 0 1px rgba(17,24,23,.1) inset;}
.ss-swatch.on{border-color:var(--ss-ink);box-shadow:0 0 0 2px #fff inset;}
.ss-viewer-preview{background:var(--ss-dark);border-radius:11px;padding:12px;margin-top:16px;}
.ss-viewer-bar{display:flex;align-items:center;justify-content:space-between;color:#fff;padding:2px 4px 12px;}
.ss-viewer-bar strong{font-size:13.5px;font-weight:600;}
.ss-viewer-bar span{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:rgba(255,255,255,.66);}
.ss-viewer-card{display:flex;align-items:center;justify-content:space-between;gap:12px;background:#fff;border-radius:9px;padding:10px 12px;}
.ss-viewer-card span{font-size:13.5px;font-weight:600;}
.ss-viewer-card em{font-style:normal;font-size:11.5px;font-weight:700;color:#fff;background:var(--ss-green);border-radius:999px;padding:3px 9px;}
.ss-plan{background:var(--ss-dark);color:#fff;border-radius:var(--ss-r);padding:30px 32px;}
.ss-plan-eyebrow{font-size:10.5px;font-weight:700;letter-spacing:.13em;color:rgba(255,255,255,.6);}
.ss-plan h2{font-size:26px;font-weight:700;letter-spacing:-0.035em;margin-top:9px !important;}
.ss-plan p{font-size:14px;color:rgba(255,255,255,.72);margin-top:10px !important;max-width:520px;line-height:1.55;}
.ss-plan-actions{display:flex;gap:12px;margin-top:22px;flex-wrap:wrap;}
.ss-plan-actions .ss-btn.dark{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.18);color:#fff;}
.ss-usage{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:16px;}
.ss-usage-tile{background:var(--ss-bg);border-radius:11px;padding:16px;}
.ss-usage-tile small{display:block;font-size:12.5px;color:var(--ss-muted);}
.ss-usage-tile strong{display:block;font-size:22px;font-weight:700;letter-spacing:-0.035em;margin-top:7px;}
.ss-usage-tile em{display:block;font-style:normal;font-size:11.5px;color:var(--ss-faint);margin-top:5px;}

/* --------------------------------------------------------- create wizard */
.ss-wizard-head{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;flex-wrap:wrap;margin-top:-8px;}
.ss-wizard-head h1{display:flex;align-items:center;gap:12px;font-size:31px;font-weight:700;letter-spacing:-0.035em;line-height:1.1;}
.ss-wizard-head p{font-size:13.5px;color:var(--ss-muted);margin-top:8px !important;}
.ss-wizard-head-actions{display:flex;align-items:center;gap:12px;flex-wrap:wrap;}
.ss-saved{display:inline-flex;align-items:center;gap:7px;font-size:12.5px;color:var(--ss-faint);}

.ss-stepper{display:flex;background:var(--ss-card);border:1px solid var(--ss-line);border-radius:var(--ss-r);overflow:hidden;}
.ss-stepper li{flex:1;min-width:0;border-right:1px solid var(--ss-line-soft);}
.ss-stepper li:last-child{border-right:0;}
.ss-stepper button{display:flex;align-items:center;gap:11px;width:100%;height:60px;padding:0 18px;text-align:left;}
.ss-step-n{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;flex:none;
  font-size:12.5px;font-weight:700;border:1.5px solid var(--ss-line);color:var(--ss-faint);background:var(--ss-card);}
.ss-step-label{flex:1;min-width:0;font-size:14px;font-weight:600;color:var(--ss-faint);letter-spacing:-0.015em;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.ss-step-icon{color:#dad8d2;}
.ss-stepper li.done .ss-step-n{background:var(--ss-green);border-color:var(--ss-green);color:#fff;}
.ss-stepper li.done .ss-step-label{color:var(--ss-ink);}
.ss-stepper li.done .ss-step-icon{color:var(--ss-faint);}
.ss-stepper li.current{background:var(--ss-mint);}
.ss-stepper li.current .ss-step-n{background:var(--ss-green);border-color:var(--ss-green);color:#fff;}
.ss-stepper li.current .ss-step-label{color:var(--ss-green);}
.ss-stepper li.current .ss-step-icon{color:var(--ss-green);}

.ss-step-head{display:flex;align-items:center;gap:13px;margin-bottom:22px;}
.ss-step-head.tight{margin-bottom:0;}
.ss-step-head h2{font-size:17.5px;font-weight:700;letter-spacing:-0.025em;}
.ss-step-head p{font-size:13px;color:var(--ss-muted);margin-top:3px !important;}
.ss-choice-row{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.ss-choice{padding:16px;border:1px solid var(--ss-line);border-radius:12px;text-align:left;background:var(--ss-card);}
.ss-choice:hover{background:var(--ss-bg);}
.ss-choice.on{border-color:var(--ss-green);background:var(--ss-mint);}
.ss-choice-icon{display:grid;place-items:center;width:32px;height:32px;border-radius:9px;background:var(--ss-bg);color:var(--ss-muted);margin-bottom:12px;}
.ss-choice.on .ss-choice-icon{background:var(--ss-green);color:#fff;}
.ss-choice strong{display:block;font-size:14.5px;font-weight:600;}
.ss-choice small{display:block;font-size:12px;color:var(--ss-muted);margin-top:4px;}

.ss-tip-card{padding:0;overflow:hidden;}
.ss-tip-photo{aspect-ratio:16/9;}
.ss-numbered{display:flex;flex-direction:column;gap:9px;margin-top:14px;}
.ss-numbered li{display:flex;align-items:center;gap:11px;font-size:13px;color:var(--ss-ink-soft);}
.ss-numbered em{display:grid;place-items:center;width:21px;height:21px;border-radius:50%;flex:none;
  background:var(--ss-bg);font-style:normal;font-size:11px;font-weight:700;color:var(--ss-muted);}

.ss-dropzone{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;width:100%;
  min-height:168px;padding:26px;border:1.5px dashed #d9d7d0;border-radius:12px;background:#fcfbf7;}
.ss-dropzone:hover{border-color:var(--ss-green);background:var(--ss-mint);}
.ss-drop-icon{display:grid;place-items:center;width:44px;height:44px;border-radius:12px;background:var(--ss-card);border:1px solid var(--ss-line);color:var(--ss-green);}
.ss-dropzone strong{font-size:15.5px;font-weight:600;letter-spacing:-0.02em;}
.ss-dropzone small{font-size:12.5px;color:var(--ss-muted);text-align:center;}
.ss-dropzone u{color:var(--ss-green);font-weight:600;}
.ss-upload-progress{display:flex;align-items:center;gap:13px;margin-top:16px;padding:14px 16px;border:1px solid var(--ss-line-soft);border-radius:11px;color:var(--ss-green);}
.ss-upload-progress > div{flex:1;min-width:0;}
.ss-upload-row{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:8px;font-size:13px;color:var(--ss-ink-soft);}
.ss-upload-row em{font-style:normal;font-size:12.5px;font-weight:600;color:var(--ss-muted);}

.ss-upload-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:16px;}
.ss-upload-tile small{display:block;font-size:12px;color:var(--ss-ink-soft);margin:9px 0 7px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.ss-upload-photo{aspect-ratio:16/11;border-radius:10px;}
.ss-tick{position:absolute;top:8px;right:8px;z-index:3;display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:var(--ss-green);color:#fff;}
.ss-upload-tools{position:absolute;left:8px;right:8px;bottom:8px;z-index:3;display:flex;gap:5px;}
.ss-upload-tools button{display:grid;place-items:center;width:24px;height:24px;border-radius:7px;background:rgba(255,255,255,.9);color:var(--ss-ink);}
.ss-upload-tools .ss-push{margin-left:auto;}
.ss-empty-strip{padding:22px;text-align:center;font-size:13px;color:var(--ss-muted);background:var(--ss-bg);border-radius:10px;margin-top:16px;}
.ss-dashed-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;height:46px;
  border:1.5px dashed #d9d7d0;border-radius:11px;font-size:14px;font-weight:600;color:var(--ss-ink-soft);}
.ss-dashed-btn.sm{height:38px;font-size:13px;margin-top:12px;}
.ss-dashed-btn:hover{border-color:var(--ss-green);color:var(--ss-green);background:var(--ss-mint);}
.ss-inline-add{display:flex;gap:10px;padding:12px;border:1px solid var(--ss-green);border-radius:12px;background:var(--ss-card);}
.ss-root .ss-inline-add input{flex:1;min-width:0;height:38px;padding:0 12px;border:1px solid var(--ss-line);border-radius:9px;outline:none;font-size:14px;}
.ss-inline-add .ss-btn{height:38px;}
.ss-wizard-foot{display:flex;align-items:center;justify-content:space-between;gap:16px;}
.ss-overlap{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:16px;}
.ss-overlap-frame{height:62px;border:1px solid var(--ss-line);background:var(--ss-bg);}
.ss-overlap-frame:first-child{border-radius:9px 0 0 9px;}
.ss-overlap-frame:last-child{border-radius:0 9px 9px 0;}
.ss-overlap-frame.mid{background:var(--ss-mint);border-color:var(--ss-green);}
.ss-overlap-legend{display:flex;align-items:center;justify-content:space-between;margin-top:8px;font-size:11px;color:var(--ss-faint);}
.ss-overlap-legend em{font-style:normal;font-weight:600;color:var(--ss-green);}

.ss-stitch-head{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;flex-wrap:wrap;}
.ss-stitch-head h2{display:flex;align-items:center;gap:11px;font-size:21px;font-weight:700;letter-spacing:-0.03em;}
.ss-stitch-head p{font-size:13.5px;color:var(--ss-muted);margin-top:7px !important;max-width:620px;line-height:1.5;}
.ss-stitch-grid{display:grid;grid-template-columns:256px minmax(0,1fr);gap:24px;align-items:start;}
.ss-mini-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;
  font-size:10.5px;font-weight:700;letter-spacing:.11em;color:var(--ss-faint);}
.ss-mini-head em{font-style:normal;}
.ss-frame-list{display:flex;flex-direction:column;gap:8px;}
.ss-frame-list li{display:flex;align-items:center;gap:11px;padding:8px;border:1px solid var(--ss-line-soft);border-radius:10px;}
.ss-frame-list li.warn{border-color:var(--ss-clay-line);background:var(--ss-clay-soft);}
.ss-frame-thumb{width:52px;height:38px;border-radius:7px;flex:none;}
.ss-frame-n{position:absolute;top:3px;left:3px;z-index:3;display:grid;place-items:center;width:15px;height:15px;
  border-radius:4px;background:rgba(16,20,22,.76);color:#fff;font-size:9px;font-weight:700;}
.ss-frame-list strong{display:block;font-size:12.5px;font-weight:600;}
.ss-frame-list small{display:flex;align-items:center;gap:5px;font-size:11.5px;color:var(--ss-green);margin-top:3px;}
.ss-frame-list small.warn{color:#9b6236;}
.ss-stitch-preview{aspect-ratio:21/9;border-radius:var(--ss-r);}
.ss-stitch-foot{position:absolute;left:14px;right:14px;bottom:12px;z-index:3;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}
.ss-stitch-foot small{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,.5);}
.ss-stage-row{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
.ss-stage{display:flex;align-items:flex-start;gap:10px;padding:12px;border:1px solid var(--ss-line-soft);border-radius:10px;}
.ss-stage.fail{border-color:var(--ss-clay-line);background:var(--ss-clay-soft);}
.ss-stage-icon{display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:var(--ss-green);color:#fff;flex:none;margin-top:1px;}
.ss-stage.fail .ss-stage-icon{background:var(--ss-clay);}
.ss-stage strong{display:block;font-size:13px;font-weight:600;}
.ss-stage small{display:block;font-size:11.5px;color:var(--ss-muted);margin-top:3px;line-height:1.4;}
.ss-review-grid{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:24px;align-items:start;}
.ss-note-list{display:flex;flex-direction:column;gap:10px;}
.ss-note-list li{display:flex;gap:11px;padding:13px;border:1px solid var(--ss-line-soft);border-radius:11px;color:var(--ss-muted);}
.ss-note-list li.warn{border-color:var(--ss-clay-line);background:var(--ss-clay-soft);color:var(--ss-clay);}
.ss-note-list strong{display:block;font-size:13.5px;font-weight:600;color:var(--ss-ink);}
.ss-note-list li.warn strong{color:#8a5433;}
.ss-note-list small{display:block;font-size:12.5px;color:var(--ss-muted);margin-top:4px;line-height:1.5;}
.ss-note-list .ss-link-btn{margin-top:7px;text-decoration:underline;}
.ss-next-card strong{display:block;font-size:14.5px;font-weight:700;letter-spacing:-0.02em;}
.ss-next-card p{font-size:12.5px;color:var(--ss-muted);margin-top:6px !important;line-height:1.5;}
.ss-next-card .ss-btn{margin-top:12px;}
.ss-next-card .ss-btn.primary{margin-top:22px;}

.ss-build-grid{display:grid;grid-template-columns:200px minmax(0,1fr) 300px;gap:24px;align-items:start;}
.ss-build-toolbar{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:14px;}
.ss-build-title{display:flex;align-items:center;gap:10px;}
.ss-build-title strong{font-size:15px;font-weight:600;}
.ss-build-stage{aspect-ratio:16/10;border-radius:11px;}
.ss-mint-strip{display:flex;align-items:center;gap:8px;margin-top:12px;padding:9px 12px;border-radius:9px;
  background:var(--ss-mint);color:var(--ss-green);font-size:12px;font-weight:500;}
.ss-soft-note{background:var(--ss-bg);border-radius:10px;padding:13px;margin-top:16px;}
.ss-soft-note.row{display:flex;align-items:center;justify-content:space-between;gap:12px;}
.ss-soft-note strong{display:block;font-size:13px;font-weight:600;}
.ss-soft-note small{display:block;font-size:12px;color:var(--ss-muted);margin-top:4px;line-height:1.45;}
.ss-soft-note em{font-style:normal;font-size:12px;color:var(--ss-faint);}
.ss-soft-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:11px;}
.ss-source-thumb{aspect-ratio:21/9;border-radius:8px;}
.ss-dark-summary{background:var(--ss-dark);color:#fff;border-radius:11px;padding:14px;margin-top:16px;}
.ss-dark-summary strong{display:block;font-size:13.5px;font-weight:600;}
.ss-dark-summary small{display:block;font-size:12px;color:rgba(255,255,255,.66);margin-top:4px;}
.ss-dark-eyebrow{display:block;font-size:9.5px;font-weight:700;letter-spacing:.12em;color:rgba(255,255,255,.55);margin-bottom:7px;}

.ss-cover-row{display:flex;gap:14px;}
.ss-cover{position:relative;width:122px;height:78px;border-radius:10px;overflow:hidden;border:2px solid transparent;}
.ss-cover .ss-photo{width:100%;height:100%;}
.ss-cover.on{border-color:var(--ss-green);}
.ss-visitor-card{padding:0;overflow:hidden;}
.ss-visitor-photo{aspect-ratio:16/9;}
.ss-visitor-meta{display:flex;gap:14px;flex-wrap:wrap;margin-top:14px;padding-top:12px;border-top:1px solid var(--ss-line-soft);}
.ss-visitor-meta span{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;color:var(--ss-muted);}
.ss-prepublish{display:flex;flex-direction:column;gap:12px;margin-top:16px;}
.ss-prepublish li{display:flex;align-items:center;gap:11px;font-size:13px;color:var(--ss-faint);}
.ss-prepublish li.done{color:var(--ss-ink-soft);}

/* --------------------------------------------------------------- modals */
.ss-modal-scrim{position:fixed;inset:0;z-index:200;background:rgba(14,18,17,.5);backdrop-filter:blur(2px);
  display:grid;place-items:center;padding:24px;}
.ss-modal{width:100%;max-width:510px;background:#fff;border-radius:16px;padding:28px;box-shadow:0 30px 70px rgba(10,14,13,.3);}
.ss-modal-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;}
.ss-modal-head h2{font-size:22px;font-weight:700;letter-spacing:-0.03em;}
.ss-modal-head p{font-size:13.5px;color:var(--ss-muted);margin-top:7px !important;}
.ss-modal-success{display:flex;align-items:center;gap:12px;margin-top:22px;padding:14px 16px;border-radius:11px;
  background:var(--ss-mint);border:1px solid var(--ss-mint-line);font-size:13px;color:var(--ss-ink-soft);}
.ss-success-tick{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:var(--ss-green);color:#fff;flex:none;}
.ss-sharebox{margin-top:14px;padding:14px 16px;border:1px solid var(--ss-line);border-radius:11px;background:var(--ss-bg);}
.ss-share-input{display:flex;align-items:center;gap:8px;}
.ss-root .ss-share-input input{flex:1;min-width:0;border:0;background:none;outline:none;font-size:13.5px;color:var(--ss-muted);}
.ss-modal-actions{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px;}
.ss-modal-actions .ss-btn{height:44px;border-radius:11px;}

.ss-preview-modal{width:100%;max-width:1024px;background:var(--ss-dark);border-radius:14px;overflow:hidden;}
.ss-preview-modal header{display:flex;align-items:center;gap:11px;padding:14px 16px;color:#fff;}
.ss-preview-modal header > span:not(.ss-brand-tile){display:flex;flex-direction:column;}
.ss-preview-modal header strong{font-size:14px;font-weight:600;}
.ss-preview-modal header small{font-size:11.5px;color:rgba(255,255,255,.6);}
.ss-preview-modal header .ss-btn{margin-left:auto;}
.ss-preview-stage{aspect-ratio:16/9;}
.ss-preview-modal footer{display:flex;gap:10px;padding:12px 16px;}
.ss-preview-modal footer button{height:30px;padding:0 13px;border-radius:8px;font-size:12.5px;font-weight:600;color:rgba(255,255,255,.66);}
.ss-preview-modal footer button.active{background:var(--ss-green);color:#fff;}

.ss-toast{display:inline-flex;align-items:center;gap:9px;padding:10px 14px;border-radius:999px;
  background:#fff;border:1px solid var(--ss-line);font-size:12.5px;font-weight:500;color:var(--ss-ink-soft);
  box-shadow:0 8px 24px rgba(10,14,13,.14);}
.ss-toast.inline{position:absolute;right:18px;bottom:18px;z-index:5;}
.ss-toast.floating{position:fixed;right:28px;bottom:28px;z-index:300;padding:14px 18px;border-radius:12px;font-size:13.5px;}
.ss-toast button{color:var(--ss-faint);display:grid;place-items:center;}
.ss-toast-tick{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--ss-green);color:#fff;flex:none;}

/* --------------------------------------------------------------- editor */
.ss-editor{display:flex;flex-direction:column;height:100vh;background:var(--ss-bg);}
.ss-editor-top{display:flex;align-items:center;gap:14px;flex:none;height:73px;padding:0 18px;
  background:var(--ss-card);border-bottom:1px solid var(--ss-line);}
.ss-editor-title{flex:1;min-width:0;}
.ss-editor-title h1{display:flex;align-items:center;gap:10px;font-size:17px;font-weight:700;letter-spacing:-0.025em;}
.ss-editor-title p{font-size:12px;color:var(--ss-muted);margin-top:3px !important;}
.ss-editor-actions{display:flex;align-items:center;gap:10px;}
.ss-undo{display:flex;gap:2px;border:1px solid var(--ss-line);border-radius:10px;padding:1px;}
.ss-editor-body{flex:1;min-height:0;display:grid;grid-template-columns:234px minmax(0,1fr) 306px;}
.ss-editor-scenes{border-right:1px solid var(--ss-line);background:var(--ss-card);padding:16px;overflow:auto;display:flex;flex-direction:column;}
.ss-scene-list{display:flex;flex-direction:column;gap:10px;}
.ss-scene-list li{border:1px solid var(--ss-line);border-radius:11px;overflow:hidden;cursor:pointer;background:var(--ss-card);}
.ss-scene-list li:hover{border-color:#d7d5ce;}
.ss-scene-list li.active{border-color:var(--ss-green);background:var(--ss-mint);}
.ss-scene-thumb{aspect-ratio:16/8;}
.ss-scene-n{position:absolute;top:7px;left:7px;z-index:3;display:grid;place-items:center;min-width:19px;height:19px;padding:0 5px;
  border-radius:5px;background:rgba(16,20,22,.74);color:#fff;font-size:10px;font-weight:700;}
.ss-scene-list li > div:not(.ss-photo){padding:9px 11px 11px;}
.ss-scene-meta{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;}
.ss-scene-list strong{display:block;font-size:13px;font-weight:600;letter-spacing:-0.015em;}
.ss-scene-list small{display:block;font-size:11.5px;color:var(--ss-muted);margin-top:2px;}
.ss-flag{color:#d5d3cc;}
.ss-flag.on{color:var(--ss-green);}
.ss-editor-scenes .ss-dashed-btn{margin-top:12px;}
.ss-editor-note{margin-top:auto;padding-top:20px;}
.ss-editor-note strong{display:flex;align-items:center;gap:7px;font-size:12.5px;font-weight:600;color:var(--ss-green);}
.ss-editor-note small{display:block;font-size:12px;color:var(--ss-muted);margin-top:7px;line-height:1.5;}

.ss-editor-stage{display:flex;flex-direction:column;min-width:0;padding:16px;gap:12px;}
.ss-stage-toolbar{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;
  background:var(--ss-card);border:1px solid var(--ss-line);border-radius:12px;padding:9px 12px;}
.ss-stage-title{display:flex;align-items:center;gap:10px;}
.ss-stage-title strong{font-size:15px;font-weight:600;letter-spacing:-0.02em;}
.ss-stage-title .ss-icon{color:var(--ss-green);}
.ss-start-tag{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:600;color:var(--ss-green);}
.ss-stage-tools{display:flex;align-items:center;gap:14px;flex-wrap:wrap;}
.ss-toolgroup{display:flex;gap:8px;}
.ss-tool{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 11px;border-radius:9px;
  border:1px solid var(--ss-line);font-size:12.5px;font-weight:600;color:var(--ss-ink-soft);background:var(--ss-card);}
.ss-tool:hover{background:var(--ss-bg);}
.ss-tool.on{background:var(--ss-green);border-color:var(--ss-green);color:#fff;}
.ss-zoom{display:flex;align-items:center;gap:4px;}
.ss-zoom button{display:grid;place-items:center;width:30px;height:30px;border-radius:8px;color:var(--ss-muted);}
.ss-zoom button:hover{background:var(--ss-bg);color:var(--ss-ink);}
.ss-zoom span{font-size:12.5px;font-weight:600;color:var(--ss-ink-soft);min-width:38px;text-align:center;}
.ss-canvas{flex:1;min-height:0;border-radius:12px;}
.ss-stage-hint{position:absolute;bottom:12px;z-index:4;display:inline-flex;align-items:center;gap:6px;
  font-size:11.5px;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,.55);}
.ss-stage-hint.left{left:14px;}
.ss-stage-hint.right{right:14px;}
.ss-place-hint{position:absolute;top:16px;left:50%;transform:translateX(-50%);z-index:6;
  background:#fff;border-radius:999px;padding:7px 14px;font-size:12px;font-weight:500;box-shadow:0 6px 18px rgba(0,0,0,.18);}
.ss-pan{display:flex;align-items:center;gap:14px;background:var(--ss-card);border:1px solid var(--ss-line);border-radius:11px;padding:10px 12px;}
.ss-pan-track{flex:1;height:5px;border-radius:99px;background:#e8e6e0;position:relative;}
.ss-pan-track i{position:absolute;top:50%;transform:translateY(-50%);width:13px;height:13px;border-radius:3px;background:var(--ss-dark);}
.ss-pan small{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--ss-muted);}

.ss-hotspot{position:absolute;transform:translate(-50%,-50%);z-index:5;display:grid;place-items:center;
  width:34px;height:34px;border-radius:50%;background:var(--ss-green);color:#fff;border:2px solid rgba(255,255,255,.85);
  box-shadow:0 3px 10px rgba(0,0,0,.28);}
.ss-hotspot.clay{background:var(--ss-clay);}
.ss-hotspot.nav{background:#fff;color:var(--ss-ink);}
.ss-hotspot.active{outline:5px solid rgba(255,255,255,.4);}
.ss-hotspot-label{position:absolute;top:calc(100% + 9px);left:50%;transform:translateX(-50%);white-space:nowrap;
  background:#fff;color:var(--ss-ink);border-radius:8px;padding:5px 10px;font-size:11.5px;font-weight:600;box-shadow:0 4px 14px rgba(0,0,0,.2);}

.ss-editor-panel{border-left:1px solid var(--ss-line);background:var(--ss-card);display:flex;flex-direction:column;min-height:0;}
.ss-panel-tabs{display:flex;flex:none;border-bottom:1px solid var(--ss-line);}
.ss-panel-tabs button{flex:1;height:46px;display:inline-flex;align-items:center;justify-content:center;gap:7px;
  font-size:13.5px;font-weight:600;color:var(--ss-muted);border-bottom:2px solid transparent;}
.ss-panel-tabs button.active{color:var(--ss-ink);border-bottom-color:var(--ss-ink);background:var(--ss-bg);}
.ss-panel-tabs em{font-style:normal;font-size:11px;color:var(--ss-faint);}
.ss-panel-body{flex:1;min-height:0;overflow:auto;padding:16px;}
.ss-panel-empty{display:flex;flex-direction:column;align-items:center;gap:9px;text-align:center;
  padding:26px 18px;border:1.5px dashed #e2e0da;border-radius:12px;margin-bottom:18px;}
.ss-panel-empty strong{font-size:13.5px;font-weight:600;}
.ss-panel-empty small{font-size:12px;color:var(--ss-muted);line-height:1.5;}
.ss-hotspot-list{display:flex;flex-direction:column;}
.ss-hotspot-list li{display:flex;align-items:center;gap:11px;padding:11px 0;border-bottom:1px solid var(--ss-line-soft);cursor:pointer;}
.ss-hotspot-list li:last-child{border-bottom:0;}
.ss-hotspot-list li > div{flex:1;min-width:0;}
.ss-hotspot-list strong{display:block;font-size:13px;font-weight:600;letter-spacing:-0.015em;}
.ss-hotspot-list small{display:block;font-size:11.5px;color:var(--ss-muted);margin-top:2px;}
.ss-hotspot-list em{font-style:normal;font-size:12px;color:var(--ss-muted);}
.ss-hs-icon{display:grid;place-items:center;width:28px;height:28px;border-radius:8px;background:var(--ss-mint);color:var(--ss-green);flex:none;}
.ss-hs-icon.clay{background:var(--ss-clay-soft);color:var(--ss-clay);}
.ss-panel-head{display:flex;align-items:center;justify-content:space-between;gap:10px;}
.ss-kind-line{display:inline-flex;align-items:center;gap:6px;font-size:10.5px;font-weight:700;letter-spacing:.1em;color:var(--ss-green);}
.ss-kind-line.clay{color:var(--ss-clay);}
.ss-panel-pos{display:block;font-size:11.5px;color:var(--ss-faint);margin:6px 0 16px;}
.ss-product-row{display:flex;align-items:center;gap:12px;padding:11px;border:1px solid var(--ss-line-soft);border-radius:10px;margin-bottom:16px;}
.ss-product-thumb{width:52px;height:40px;border-radius:7px;flex:none;}
.ss-product-row strong{display:block;font-size:12.5px;font-weight:600;}
.ss-panel-foot{flex:none;display:flex;gap:9px;padding:12px 16px;border-top:1px solid var(--ss-line);color:var(--ss-faint);}
.ss-panel-foot small{font-size:11px;line-height:1.45;}

/* -------------------------------------------------------------- preview */
.ss-preview{min-height:100vh;background:var(--ss-dark);display:flex;flex-direction:column;}
.ss-preview-top{display:flex;align-items:center;gap:12px;flex:none;height:62px;padding:0 16px;color:#fff;}
.ss-preview-title{flex:1;min-width:0;}
.ss-preview-title strong{display:block;font-size:15px;font-weight:700;letter-spacing:-0.02em;}
.ss-preview-title small{display:flex;align-items:center;gap:6px;font-size:11.5px;color:rgba(255,255,255,.6);margin-top:2px;}
.ss-preview-actions{display:flex;align-items:center;gap:10px;}
.ss-devtoggle{display:flex;gap:2px;background:#232a2d;border-radius:9px;padding:3px;}
.ss-devtoggle button{display:grid;place-items:center;width:30px;height:28px;border-radius:7px;color:rgba(255,255,255,.6);}
.ss-devtoggle button.active{background:#39413f;color:#fff;}
.ss-preview-body{flex:1;display:flex;flex-direction:column;gap:14px;padding:0 16px 16px;}
.ss-preview-body.mobile{max-width:430px;margin:0 auto;width:100%;}
.ss-preview-canvas{flex:1;min-height:420px;border-radius:12px;}
.ss-viewer-brand{position:absolute;top:14px;left:14px;z-index:5;display:flex;align-items:center;gap:9px;
  background:rgba(16,20,22,.72);backdrop-filter:blur(8px);border-radius:10px;padding:7px 11px 7px 7px;}
.ss-viewer-brand > span:not(.ss-avatar){display:flex;flex-direction:column;}
.ss-viewer-brand strong{font-size:12px;font-weight:700;color:#fff;}
.ss-viewer-brand small{font-size:10.5px;color:rgba(255,255,255,.66);}
.ss-viewer-zoom{position:absolute;top:14px;right:14px;z-index:5;display:flex;gap:4px;}
.ss-viewer-zoom button{display:grid;place-items:center;width:30px;height:30px;border-radius:8px;
  background:rgba(16,20,22,.6);backdrop-filter:blur(8px);color:#fff;}
.ss-viewer-popup{position:absolute;z-index:8;width:260px;background:#fff;border-radius:13px;overflow:hidden;
  box-shadow:0 18px 44px rgba(0,0,0,.34);transform:translate(-50%,16px);}
.ss-popup-close{position:absolute;top:8px;right:8px;z-index:3;display:grid;place-items:center;width:24px;height:24px;
  border-radius:50%;background:rgba(255,255,255,.9);color:var(--ss-ink);}
.ss-popup-photo{aspect-ratio:16/10;}
.ss-popup-body{padding:13px 14px 14px;}
.ss-popup-body strong{display:block;font-size:15px;font-weight:700;letter-spacing:-0.025em;margin-top:7px;}
.ss-popup-body p{font-size:12.5px;color:var(--ss-muted);margin-top:6px !important;line-height:1.5;}
.ss-popup-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:13px;}
.ss-popup-foot em{font-style:normal;font-size:16px;font-weight:700;letter-spacing:-0.025em;}
.ss-popup-body .ss-btn.block{margin-top:12px;}

.ss-preview-scenes{display:flex;align-items:center;justify-content:space-between;gap:16px;}
.ss-scene-strip{display:flex;gap:10px;overflow-x:auto;}
.ss-scene-strip button{display:flex;align-items:center;gap:10px;padding:7px 14px 7px 7px;border-radius:10px;
  border:1px solid transparent;background:#1b2124;flex:none;}
.ss-scene-strip button.active{border-color:var(--ss-green);background:#1d2b27;}
.ss-scene-strip span{display:flex;flex-direction:column;text-align:left;}
.ss-scene-strip strong{font-size:12.5px;font-weight:700;color:#fff;}
.ss-scene-strip small{font-size:10.5px;color:rgba(255,255,255,.55);}
.ss-strip-thumb{width:48px;height:34px;border-radius:7px;flex:none;}
.ss-strip-nav{display:flex;gap:7px;flex:none;}
.ss-strip-nav button{display:grid;place-items:center;width:32px;height:32px;border-radius:9px;background:#1b2124;color:rgba(255,255,255,.72);}
.ss-strip-nav button:disabled{opacity:.35;cursor:default;}
.ss-preview-foot{text-align:center;padding:4px 0 2px;}
.ss-preview-foot span{display:block;font-size:12px;color:rgba(255,255,255,.5);}
.ss-preview-foot small{display:block;font-size:11px;color:rgba(255,255,255,.3);margin-top:4px;}

/* ------------------------------------------------------------ responsive */
.ss-only-mobile{display:none !important;}
.ss-drawer,.ss-drawer-scrim{display:none;}

@media (max-width:1380px){
  .ss-stat-row{grid-template-columns:repeat(2,1fr);}
  .ss-build-grid{grid-template-columns:180px minmax(0,1fr);}
  .ss-build-grid > :last-child{grid-column:1 / -1;}
}
@media (max-width:1180px){
  .ss-grid-724,.ss-grid-main-rail,.ss-grid-equal,.ss-stitch-grid,.ss-review-grid{grid-template-columns:minmax(0,1fr);}
  .ss-project-grid,.ss-asset-grid{grid-template-columns:repeat(2,1fr);}
  .ss-editor-body{grid-template-columns:200px minmax(0,1fr) 280px;}
}
@media (max-width:980px){
  .ss-sidebar{display:none;}
  .ss-only-mobile{display:grid !important;}
  .ss-hide-sm{display:none !important;}
  .ss-topbar{padding:0 16px;gap:12px;}
  .ss-search{width:auto;flex:1;}
  .ss-page{padding:20px 16px;gap:20px;}
  .ss-page-head h1,.ss-wizard-head h1{font-size:27px;}
  .ss-drawer{display:block;position:fixed;inset:0 auto 0 0;z-index:120;width:263px;box-shadow:0 0 60px rgba(0,0,0,.2);}
  .ss-drawer .ss-sidebar{display:flex;height:100%;}
  .ss-drawer-scrim{display:block;position:fixed;inset:0;z-index:110;background:rgba(14,18,17,.4);}
  .ss-settings{grid-template-columns:minmax(0,1fr);}
  .ss-settings-nav{flex-direction:row;overflow-x:auto;gap:6px;}
  .ss-settings-nav button{height:38px;flex:none;}
  .ss-field-grid,.ss-usage,.ss-stage-row,.ss-choice-row,.ss-upload-grid{grid-template-columns:minmax(0,1fr);}
  .ss-stepper{flex-direction:column;}
  .ss-stepper li{border-right:0;border-bottom:1px solid var(--ss-line-soft);}
  .ss-editor-body{grid-template-columns:minmax(0,1fr);grid-template-rows:auto auto auto;}
  .ss-editor-scenes,.ss-editor-panel{border:0;border-bottom:1px solid var(--ss-line);}
  .ss-editor{height:auto;min-height:100vh;}
  .ss-canvas{min-height:320px;}
  .ss-editor-actions .ss-btn span,.ss-editor-actions .ss-undo{display:none;}
}
@media (max-width:720px){
  .ss-project-grid,.ss-asset-grid,.ss-recent-grid,.ss-media-mini{grid-template-columns:minmax(0,1fr);}
  .ss-media-mini{grid-template-columns:repeat(3,1fr);}
  .ss-modal-actions{grid-template-columns:1fr;}
  .ss-cta{padding:26px 22px;}
  .ss-cta-body h2{font-size:22px;}
  .ss-cover-row{flex-wrap:wrap;}
  .ss-page-head-actions{width:100%;}
  .ss-toast.floating{left:16px;right:16px;bottom:16px;}
}
`;

export default ShowroomStudio;
