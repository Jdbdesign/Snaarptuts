export const DRIVE_URLS = {
  dashboard: "drive.snaarp.com/dashboard",
  photos: "drive.snaarp.com/photos",
  photosMoments: "drive.snaarp.com/photos?tab=moments",
  photosAlbums: "drive.snaarp.com/photos?tab=albums",
  photosFavorites: "drive.snaarp.com/photos?tab=favorites",
  files: "drive.snaarp.com/files",
  meetings: "drive.snaarp.com/meetings",
  shared: "drive.snaarp.com/shared",
  favorites: "drive.snaarp.com/favorites",
  trash: "drive.snaarp.com/trash",
  workspaces: "drive.snaarp.com/workspaces",
};

export type DriveNavId =
  | "home"
  | "files"
  | "meetings"
  | "photos"
  | "shared"
  | "favorites"
  | "trash"
  | "workspaces"
  | "bug"
  | "admin";

export type DrivePage =
  | "home"
  | "photos"
  | "files"
  | "meetings"
  | "shared"
  | "favorites"
  | "trash"
  | "workspaces";

export const SAMPLE_USER = {
  name: "Sam Taylor",
  email: "sam.taylor@snaarp.com",
  avatar: "S",
};

export const DRIVE_STORAGE = {
  used: "1.7 GB",
  total: "20.0 GB",
  pct: 9,
};

export const SUITE_RAIL = [
  { id: "mail", label: "Mail", icon: "mail" },
  { id: "meets", label: "Meets", icon: "meets" },
  { id: "teams", label: "Teams", icon: "teams" },
  { id: "onecard", label: "One Cardx", icon: "onecard" },
  { id: "sheets", label: "Sheets", icon: "sheet" },
  { id: "docs", label: "Docs", icon: "docs" },
  { id: "slides", label: "Slides", icon: "presentation" },
  { id: "pdf", label: "PDF", icon: "pdf" },
  { id: "lock", label: "Lock", icon: "lock" },
  { id: "sign", label: "Sign", icon: "sign" },
  { id: "drive", label: "Drive", icon: "drive", active: true },
];

export interface FileItem {
  id: string;
  name: string;
  subtitle?: string;
  isFolder?: boolean;
  folderItems?: number;
  opened?: string;
  modified?: string;
  owner?: string;
  size?: string;
  sharing?: string;
  format?: string;
  date?: string;
  duration?: string;
  status?: string;
  thumbnailColor?: string;
  color?: string;
}

export const RECENT_FILES: FileItem[] = [
  { id: "f-1", name: "team-photo-01.jpg", subtitle: "own", opened: "Just now", modified: "-10 minutes ago", owner: "Sam Taylor", size: "882.2 KB", sharing: "Private", thumbnailColor: "#FDE68A" },
  { id: "f-2", name: "product-shot-02.jpg", subtitle: "own", opened: "Just now", modified: "-10 minutes ago", owner: "Sam Taylor", size: "619.1 KB", sharing: "Private", thumbnailColor: "#BAE6FD" },
  { id: "f-3", name: "event-banner.jpg", subtitle: "own", opened: "Just now", modified: "-10 minutes ago", owner: "Sam Taylor", size: "234.8 KB", sharing: "Private", thumbnailColor: "#FBCFE8" },
  { id: "f-4", name: "brand-guide.jpg", subtitle: "own", opened: "Just now", modified: "-10 minutes ago", owner: "Sam Taylor", size: "811.9 KB", sharing: "Private", thumbnailColor: "#C7D2FE" },
  { id: "f-5", name: "office-exterior.jpg", subtitle: "own", opened: "Just now", modified: "-10 minutes ago", owner: "Sam Taylor", size: "677.3 KB", sharing: "Private", thumbnailColor: "#A7F3D0" },
  { id: "f-6", name: "hero-background.jpg", subtitle: "own", opened: "Just now", modified: "-10 minutes ago", owner: "Sam Taylor", size: "646.3 KB", sharing: "Private", thumbnailColor: "#FED7AA" },
  { id: "f-7", name: "campaign-draft.jpg", subtitle: "own", opened: "Just now", modified: "-10 minutes ago", owner: "Sam Taylor", size: "466.1 KB", sharing: "Private", thumbnailColor: "#E9D5FF" },
  { id: "f-8", name: "wireframes-v1.jpg", subtitle: "own", opened: "Just now", modified: "-10 minutes ago", owner: "Sam Taylor", size: "213.1 KB", sharing: "Private", thumbnailColor: "#FECDD3" },
  { id: "f-9", name: "app-preview.jpg", subtitle: "own", opened: "Just now", modified: "-10 minutes ago", owner: "Sam Taylor", size: "362.2 KB", sharing: "Private", thumbnailColor: "#DDD6FE" },
  { id: "f-10", name: "user-journey.jpg", subtitle: "own", opened: "Just now", modified: "-10 minutes ago", owner: "Sam Taylor", size: "228.0 KB", sharing: "Private", thumbnailColor: "#FEF08A" },
  { id: "f-11", name: "logo-variations.jpg", subtitle: "own", opened: "Just now", modified: "-10 minutes ago", owner: "Sam Taylor", size: "123.5 KB", sharing: "Private", thumbnailColor: "#CFFAFE" },
  { id: "f-12", name: "keynote-deck.jpg", subtitle: "own", opened: "Just now", modified: "-10 minutes ago", owner: "Sam Taylor", size: "619.1 KB", sharing: "Private", thumbnailColor: "#F5D0FE" },
];

export const FOLDER_ITEMS: FileItem[] = [
  { id: "folder-1", name: "Brand assets", subtitle: "Folder", isFolder: true, folderItems: 0, opened: "Thu at 12:57 PM", modified: "Thu 12:57 PM", owner: "Sam Taylor", size: "0 items", sharing: "Private" },
  { id: "folder-2", name: "Brand assets (copy)", subtitle: "Folder", isFolder: true, folderItems: 0, opened: "Thu at 4:10 AM", modified: "Thu 4:10 AM", owner: "Sam Taylor", size: "0 items", sharing: "Private" },
  { id: "folder-3", name: "Favicons", subtitle: "Folder", isFolder: true, folderItems: 0, opened: "Thu at 4:09 AM", modified: "Thu 4:09 AM", owner: "Sam Taylor", size: "0 items", sharing: "Private" },
  { id: "folder-4", name: "Icons", subtitle: "Folder", isFolder: true, folderItems: 2, opened: "Thu at 4:08 AM", modified: "Thu 4:08 AM", owner: "Sam Taylor", size: "2 items", sharing: "Private" },
];

export const MEETING_RECORDING: FileItem = {
  id: "meet-1",
  name: "Untitled Meeting",
  subtitle: "ysp-xqsx-wmh",
  date: "Oct 21, 2026 · 3:45 PM",
  duration: "—",
  size: "53.0 MB",
  format: "MP4",
  status: "Completed",
};

export const TRASH_ITEM: FileItem = {
  id: "trash-1",
  name: "Budget draft.xlsx",
  subtitle: "My Files",
  modified: "Aug 5, 2026",
  size: "5.9 KB",
};

// Part 2: Folder, file, and document entities
export const FOLDER_COLOR_SWATCHES = [
  { id: "red", hex: "#EF4444", label: "Red" },
  { id: "orange", hex: "#F97316", label: "Orange" },
  { id: "yellow", hex: "#FACC15", label: "Yellow" },
  { id: "green", hex: "#22C55E", label: "Green" },
  { id: "blue", hex: "#3B82F6", label: "Blue" },
  { id: "violet", hex: "#6366F1", label: "Violet" },
  { id: "pink", hex: "#EC4899", label: "Pink" },
  { id: "slate", hex: "#94A3B8", label: "Slate" },
  { id: "lavender", hex: "#A855F7", label: "Lavender" },
  { id: "magenta", hex: "#D946EF", label: "Magenta" },
  { id: "amber", hex: "#F59E0B", label: "Amber" },
];

export const FOLDER_PROJECT_FILES: FileItem = {
  id: "folder-project-files",
  name: "Project Files",
  subtitle: "Folder",
  isFolder: true,
  folderItems: 0,
  opened: "Just now",
  modified: "Today",
  owner: "Sam Taylor",
  size: "0 items",
  sharing: "Private",
  color: "#EF4444",
};

export const FOLDER_BRAND_LOGOS: FileItem = {
  id: "folder-brand-logos",
  name: "Brand Logos",
  subtitle: "Folder",
  isFolder: true,
  folderItems: 6,
  opened: "Just now",
  modified: "Today",
  owner: "Sam Taylor",
  size: "6 items",
  sharing: "Private",
  color: "#F59E0B",
};

export const BRAND_LOGOS_FILES: FileItem[] = [
  { id: "logo-office", name: "Microsoft_365.svg", subtitle: "own", modified: "Today", size: "12 KB", sharing: "Private" },
  { id: "logo-teams", name: "Microsoft Teams.svg", subtitle: "own", modified: "Today", size: "14 KB", sharing: "Private" },
  { id: "logo-outlook", name: "Microsoft Outlook.svg", subtitle: "own", modified: "Today", size: "11 KB", sharing: "Private" },
  { id: "logo-drive", name: "Google Workspace Drive.svg", subtitle: "own", modified: "Today", size: "15 KB", sharing: "Private" },
  { id: "logo-meet", name: "Google Meet.svg", subtitle: "own", modified: "Today", size: "13 KB", sharing: "Private" },
  { id: "logo-calendar", name: "Google Calendar.svg", subtitle: "own", modified: "Today", size: "10 KB", sharing: "Private" },
];

export const FILE_QUARTERLY_REPORT: FileItem = {
  id: "file-quarterly-report",
  name: "Quarterly report.png",
  subtitle: "own",
  opened: "Just now",
  modified: "Today",
  owner: "Sam Taylor",
  size: "2.4 MB",
  sharing: "Private",
  thumbnailColor: "#BAE6FD",
};

export const FILE_MEETING_NOTES_MD: FileItem = {
  id: "file-meeting-notes-md",
  name: "Meeting notes.md",
  subtitle: "own",
  opened: "Just now",
  modified: "Today",
  owner: "Sam Taylor",
  size: "1.2 KB",
  sharing: "Private",
  format: "markdown",
};

export const FILE_SAMPLE_TXT: FileItem = {
  id: "file-sample-txt",
  name: "Sample.txt",
  subtitle: "own",
  opened: "Just now",
  modified: "Today",
  owner: "Sam Taylor",
  size: "840 B",
  sharing: "Private",
  format: "text",
};

export const INITIAL_MARKDOWN_TEMPLATE = `# Title goes here

_A short description of what this document is about._

---

## Overview

Briefly explain the purpose of this document. What problem does it address? Who is it for?

## Key Points

- Point one
- Point two
- Point three

_Last updated: 2026-11-03_`;

export const SAMPLE_MARKDOWN_CONTENT = `# Project Kickoff & Roadmap

_Quarterly deliverables and technical milestone overview._

---

## Objectives
- Launch Snaarp Drive public beta
- Finalise enterprise storage quotas
- Implement cross-drive cloud import

## Key Points
- Point one: Verified permissions
- Point two: Integrated cloud sync
- Point three: Document markdown editing

_Last updated: 2026-11-03_`;

export const SAMPLE_TXT_CONTENT = `Snaarp Drive - Team Notes

- Storage sync verified
- Permissions updated for Acme Studio
- Project files organized in My Files`;


export interface DrivePhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  color: string;
  accent: string;
  gallerySpan?: string;
  aspect?: string;
  photographer: string;
  unsplashUrl: string;
}

export const SAMPLE_PHOTOS: DrivePhoto[] = [
  {
    id: "p1",
    src: "/drive-photos/photo-01.jpg",
    alt: "Top-down view of a white ceramic coffee cup on a vibrant red table",
    title: "Coffee cup on red table",
    color: "#EF4444",
    accent: "#991B1B",
    gallerySpan: "col-span-2 row-span-2",
    aspect: "aspect-square",
    photographer: "Zhao YuTing",
    unsplashUrl: "https://unsplash.com/photos/a-cup-of-coffee-on-a-red-table-hrEFY4sV1VE",
  },
  {
    id: "p2",
    src: "/drive-photos/photo-02.jpg",
    alt: "Silhouette of a person sitting peacefully on coastal rocks at sunset",
    title: "Person sitting at sunset by water",
    color: "#F59E0B",
    accent: "#B45309",
    gallerySpan: "col-span-1 aspect-square",
    aspect: "aspect-square",
    photographer: "Nikolay Dukov",
    unsplashUrl: "https://unsplash.com/photos/silhouette-of-woman-sitting-on-rock-near-body-of-water-during-sunset-6cx9GuDKW2k",
  },
  {
    id: "p3",
    src: "/drive-photos/photo-03.jpg",
    alt: "Skateboarder performing an aerial trick on a ramp against a golden sunset",
    title: "Skater at sunset park",
    color: "#6B7280",
    accent: "#374151",
    gallerySpan: "col-span-1 aspect-square",
    aspect: "aspect-square",
    photographer: "Maxime Doré",
    unsplashUrl: "https://unsplash.com/photos/skateboarder-rides-a-ramp-at-sunset-Ls7X4c46PYI",
  },
  {
    id: "p4",
    src: "/drive-photos/photo-04.jpg",
    alt: "Hands forming a heart shape framing the glowing sun at sunset",
    title: "Heart shape made by hands against the sun",
    color: "#F97316",
    accent: "#C2410C",
    gallerySpan: "col-span-1 aspect-square",
    aspect: "aspect-square",
    photographer: "Liana S",
    unsplashUrl: "https://unsplash.com/photos/hands-forming-a-heart-shape-silhouetted-against-a-beautiful-sunset-fwCYqUMp5-8",
  },
  {
    id: "p5",
    src: "/drive-photos/photo-05.jpg",
    alt: "Woman looking out the window of a city subway train in motion",
    title: "Woman by window on subway train",
    color: "#E5E7EB",
    accent: "#4B5563",
    gallerySpan: "col-span-1 aspect-square",
    aspect: "aspect-square",
    photographer: "Patrik Jensen",
    unsplashUrl: "https://unsplash.com/photos/a-woman-is-looking-out-the-window-of-a-subway-train-4fsGY093L5g",
  },
  {
    id: "p6",
    src: "/drive-photos/photo-06.jpg",
    alt: "Photographer with a camera standing among tall pine trees in a forest",
    title: "Photographer in pine forest holding camera",
    color: "#10B981",
    accent: "#047857",
    gallerySpan: "col-span-2 aspect-[2/1]",
    aspect: "aspect-[2/1]",
    photographer: "2H Media",
    unsplashUrl: "https://unsplash.com/photos/a-woman-in-a-hat-is-taking-a-picture-in-the-woods-tHnFTFf2GB0",
  },
  {
    id: "p7",
    src: "/drive-photos/photo-07.jpg",
    alt: "Rustic green wooden doorway and matching green window on a white wall",
    title: "Green rustic doorway with windows",
    color: "#14B8A6",
    accent: "#0F766E",
    gallerySpan: "col-span-1 aspect-square",
    aspect: "aspect-square",
    photographer: "Shane Monarc",
    unsplashUrl: "https://unsplash.com/photos/green-wooden-door-on-white-wall-HyRaNMzXzuA",
  },
  {
    id: "p8",
    src: "/drive-photos/photo-08.jpg",
    alt: "Canoe gliding peacefully across a calm turquoise alpine lake",
    title: "Canoe on turquoise lake",
    color: "#06B6D4",
    accent: "#0E7490",
    gallerySpan: "col-span-1 aspect-square",
    aspect: "aspect-square",
    photographer: "Shana Van Roosbroek",
    unsplashUrl: "https://unsplash.com/photos/canoeists-paddle-on-a-turquoise-lake-near-mountains-Mgj3Bybsvdc",
  },
  {
    id: "p9",
    src: "/drive-photos/photo-09.jpg",
    alt: "Classic white off-road 4x4 vehicle parked beside a rustic wooden cabin",
    title: "White classic off-road vehicle by cabin",
    color: "#FBBF24",
    accent: "#92400E",
    gallerySpan: "col-span-2 aspect-[2/1]",
    aspect: "aspect-[2/1]",
    photographer: "Haberdoedas",
    unsplashUrl: "https://unsplash.com/photos/land-rover-defender-parked-near-house-H1TxDMaZ5L0",
  },
  {
    id: "p10",
    src: "/drive-photos/photo-10.jpg",
    alt: "First-person view of legs with classic sneakers resting on a sunny green lawn",
    title: "Person relaxing on sunny park lawn",
    color: "#84CC16",
    accent: "#4D7C0F",
    gallerySpan: "col-span-1 aspect-square",
    aspect: "aspect-square",
    photographer: "Ilham Rahmansyah",
    unsplashUrl: "https://unsplash.com/photos/person-wearing-blue-and-white-converse-all-star-shoes-while-sitting-on-brown-grass-photo-at-daytime-DwTZwZYi9Ww",
  },
  {
    id: "p11",
    src: "/drive-photos/photo-11.jpg",
    alt: "Majestic misty mountain peaks emerging through morning clouds at sunrise",
    title: "Misty mountain peaks at sunrise",
    color: "#6366F1",
    accent: "#4338CA",
    gallerySpan: "col-span-1 aspect-square",
    aspect: "aspect-square",
    photographer: "Marek Piwnicki",
    unsplashUrl: "https://unsplash.com/photos/misty-mountain-peaks-at-sunrise-with-soft-pastel-sky-A1IoRfRQHuk",
  },
  {
    id: "p12",
    src: "/drive-photos/photo-12.jpg",
    alt: "Charming historic cobblestone street with glowing lanterns at twilight",
    title: "Cobblestone city street at dusk",
    color: "#8B5CF6",
    accent: "#6D28D9",
    gallerySpan: "col-span-1 aspect-square",
    aspect: "aspect-square",
    photographer: "Art Lasovsky",
    unsplashUrl: "https://unsplash.com/photos/cobblestone-street-with-buildings-and-hanging-lanterns-at-dusk-YVV1n83rjBo",
  },
  {
    id: "p13",
    src: "/drive-photos/photo-13.jpg",
    alt: "Overhead flat-lay of a cup of coffee and fresh golden croissant on a cafe table",
    title: "Coffee and flaky croissant breakfast",
    color: "#EC4899",
    accent: "#BE185D",
    gallerySpan: "col-span-1 aspect-square",
    aspect: "aspect-square",
    photographer: "Rhamely",
    unsplashUrl: "https://unsplash.com/photos/a-cup-of-coffee-and-a-croissant-on-a-table-caJQzqe-dyQ",
  },
  {
    id: "p14",
    src: "/drive-photos/photo-14.jpg",
    alt: "Minimalist top-down geometric view of an architectural spiral staircase",
    title: "Modern geometric spiral staircase",
    color: "#64748B",
    accent: "#334155",
    gallerySpan: "col-span-2 aspect-[2/1]",
    aspect: "aspect-[2/1]",
    photographer: "Matthieu Joannon",
    unsplashUrl: "https://unsplash.com/photos/top-view-photography-of-spiral-staircase-W-KRXdgh_u0",
  },
];
