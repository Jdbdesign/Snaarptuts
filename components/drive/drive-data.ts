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

// Part 3: Item menus, nested folders, sharing, moving, copying, pinning
export const WORKSPACES_FOLDER: FileItem = {
  id: "folder-workspaces",
  name: "Workspaces",
  subtitle: "Folder",
  isFolder: true,
  folderItems: 1,
  opened: "Just now",
  modified: "Today",
  owner: "Sam Taylor",
  size: "1 item",
  sharing: "Shared",
  color: "#F59E0B",
};

export const SOCIAL_MEDIA_FOLDER: FileItem = {
  id: "folder-social-media",
  name: "Social media Resources",
  subtitle: "Folder",
  isFolder: true,
  folderItems: 2,
  opened: "Just now",
  modified: "Today",
  owner: "Sam Taylor",
  size: "2 items",
  sharing: "Shared",
  color: "#F59E0B",
};

export const VIDEOS_FOLDER: FileItem = {
  id: "folder-videos",
  name: "Videos",
  subtitle: "Folder",
  isFolder: true,
  folderItems: 6,
  opened: "Just now",
  modified: "Today",
  owner: "Sam Taylor",
  size: "6 items",
  sharing: "Shared",
  color: "#F59E0B",
};

export const IMAGES_FOLDER: FileItem = {
  id: "folder-images",
  name: "Images",
  subtitle: "Folder",
  isFolder: true,
  folderItems: 9,
  opened: "Just now",
  modified: "Today",
  owner: "Sam Taylor",
  size: "9 items",
  sharing: "Shared",
  color: "#F59E0B",
};

export const VIDEOS_FILES: FileItem[] = [
  { id: "vid-1", name: "promo-01.mp4", subtitle: "own", modified: "Today", size: "18.4 MB", format: "video", sharing: "Shared" },
  { id: "vid-2", name: "promo-02.mp4", subtitle: "own", modified: "Today", size: "24.1 MB", format: "video", sharing: "Shared" },
  { id: "vid-3", name: "promo-03.mp4", subtitle: "own", modified: "Today", size: "12.8 MB", format: "video", sharing: "Shared" },
  { id: "vid-4", name: "promo-04.mp4", subtitle: "own", modified: "Today", size: "31.0 MB", format: "video", sharing: "Shared" },
  { id: "vid-5", name: "promo-05.mp4", subtitle: "own", modified: "Today", size: "15.6 MB", format: "video", sharing: "Shared" },
  { id: "vid-6", name: "promo-06.mp4", subtitle: "own", modified: "Today", size: "22.2 MB", format: "video", sharing: "Shared" },
];

export const IMAGES_FILES: FileItem[] = [
  { id: "img-1", name: "Social 1.png", subtitle: "own", modified: "Today", size: "1.2 MB", format: "image", sharing: "Shared", thumbnailColor: "#FDE68A" },
  { id: "img-2", name: "Social 2.png", subtitle: "own", modified: "Today", size: "1.5 MB", format: "image", sharing: "Shared", thumbnailColor: "#BAE6FD" },
  { id: "img-3", name: "Social 3.png", subtitle: "own", modified: "Today", size: "980 KB", format: "image", sharing: "Shared", thumbnailColor: "#FBCFE8" },
  { id: "img-4", name: "Social 4.png", subtitle: "own", modified: "Today", size: "2.1 MB", format: "image", sharing: "Shared", thumbnailColor: "#C7D2FE" },
  { id: "img-5", name: "Social 5.png", subtitle: "own", modified: "Today", size: "1.4 MB", format: "image", sharing: "Shared", thumbnailColor: "#A7F3D0" },
  { id: "img-6", name: "Social 6.png", subtitle: "own", modified: "Today", size: "1.8 MB", format: "image", sharing: "Shared", thumbnailColor: "#FED7AA" },
  { id: "img-7", name: "Social 7.png", subtitle: "own", modified: "Today", size: "1.1 MB", format: "image", sharing: "Shared", thumbnailColor: "#E9D5FF" },
  { id: "img-8", name: "Social 8.png", subtitle: "own", modified: "Today", size: "2.3 MB", format: "image", sharing: "Shared", thumbnailColor: "#FECDD3" },
  { id: "img-9", name: "Social 9.png", subtitle: "own", modified: "Today", size: "1.7 MB", format: "image", sharing: "Shared", thumbnailColor: "#DDD6FE" },
];

export interface SharedPerson {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Can view" | "Can edit";
  avatar: string;
  avatarBg?: string;
}

export const DEFAULT_SHARE_PEOPLE: SharedPerson[] = [
  {
    id: "p-owner",
    name: "Sam Taylor",
    email: "sam.taylor@snaarp.com",
    role: "Owner",
    avatar: "S",
    avatarBg: "bg-purple-100 text-purple-700",
  },
];

export const SHARE_PEOPLE_ALREADY_SHARED: SharedPerson[] = [
  {
    id: "p-owner",
    name: "Sam Taylor",
    email: "sam.taylor@snaarp.com",
    role: "Owner",
    avatar: "S",
    avatarBg: "bg-purple-100 text-purple-700",
  },
  {
    id: "p-alex",
    name: "Alex Morgan",
    email: "alex.morgan@acme.example",
    role: "Can view",
    avatar: "A",
    avatarBg: "bg-blue-100 text-blue-700",
  },
  {
    id: "p-casey",
    name: "Casey Brown",
    email: "casey.brown@acme.example",
    role: "Can view",
    avatar: "C",
    avatarBg: "bg-emerald-100 text-emerald-700",
  },
];

export const SHARE_PEOPLE_BUDGET: SharedPerson[] = [
  {
    id: "p-owner",
    name: "Sam Taylor",
    email: "sam.taylor@snaarp.com",
    role: "Owner",
    avatar: "S",
    avatarBg: "bg-purple-100 text-purple-700",
  },
  {
    id: "p-casey",
    name: "Casey Brown",
    email: "casey.brown@acme.example",
    role: "Can view",
    avatar: "C",
    avatarBg: "bg-emerald-100 text-emerald-700",
  },
];

export const SHARE_PEOPLE_INITIAL: SharedPerson[] = DEFAULT_SHARE_PEOPLE;

export const PALETTE_COLORS_4X2 = [
  { id: "red", hex: "#EF4444", label: "Red" },
  { id: "orange", hex: "#F97316", label: "Orange" },
  { id: "yellow", hex: "#EAB308", label: "Yellow" },
  { id: "green", hex: "#22C55E", label: "Green" },
  { id: "blue", hex: "#3B82F6", label: "Blue" },
  { id: "purple", hex: "#A855F7", label: "Purple" },
  { id: "pink", hex: "#EC4899", label: "Pink" },
  { id: "slate", hex: "#64748B", label: "Slate" },
];


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

// Part 4 Entities: Bulk actions, Trash, Meetings, Shared, Favorites, Workspaces
export interface BulkFileItem {
  id: string;
  name: string;
  type: "pdf" | "docx" | "xlsx" | "html" | "folder";
  date: string;
  size: string;
}

export const BULK_SAMPLE_FILES: BulkFileItem[] = [
  { id: "bulk-1", name: "Payslip sample.pdf", type: "pdf", date: "Sep 27", size: "204.8 KB" },
  { id: "bulk-2", name: "Meeting notes.docx", type: "docx", date: "Sep 21", size: "1.2 KB" },
  { id: "bulk-3", name: "Project brief.docx", type: "docx", date: "Sep 18", size: "1.2 KB" },
];

export interface TrashItem {
  id: string;
  name: string;
  type: "docx" | "pdf" | "xlsx";
  originalLocation: string;
  deletedDate: string;
  size: string;
}

export const INITIAL_TRASH_ITEMS: TrashItem[] = [
  {
    id: "trash-1",
    name: "Meeting notes.docx",
    type: "docx",
    originalLocation: "My Files",
    deletedDate: "Nov 4, 2026",
    size: "1.2 KB",
  },
  {
    id: "trash-2",
    name: "Project brief.docx",
    type: "docx",
    originalLocation: "My Files",
    deletedDate: "Nov 4, 2026",
    size: "1.2 KB",
  },
  {
    id: "trash-3",
    name: "Budget draft.xlsx",
    type: "xlsx",
    originalLocation: "My Files",
    deletedDate: "Oct 28, 2026",
    size: "5.9 KB",
  },
];

export interface MeetingItem {
  id: string;
  name: string;
  code: string;
  date: string;
  duration: string;
  size: string;
  format: string;
  status: "Completed" | "Failed";
}

export const MEETINGS_RECORDINGS: MeetingItem[] = [
  { id: "m-1", name: "Morning Meeting", code: "vlo-qgua-dds", date: "Nov 4, 2026 · 10:06 AM", duration: "—", size: "21.2 MB", format: "MP4", status: "Completed" },
  { id: "m-2", name: "Morning Meeting", code: "vlo-qgua-dds", date: "Nov 4, 2026 · 9:53 AM", duration: "—", size: "13.6 MB", format: "MP4", status: "Completed" },
  { id: "m-3", name: "Morning Meeting", code: "vlo-qgua-dds", date: "Nov 3, 2026 · 4:14 PM", duration: "—", size: "11.8 MB", format: "MP4", status: "Completed" },
  { id: "m-4", name: "Morning Meeting", code: "vlo-qgua-dds", date: "Nov 3, 2026 · 4:07 PM", duration: "—", size: "15.5 MB", format: "MP4", status: "Completed" },
  { id: "m-5", name: "Morning Meeting", code: "vlo-qgua-dds", date: "Nov 3, 2026 · 9:09 AM", duration: "—", size: "2.4 MB", format: "MP4", status: "Completed" },
  { id: "m-6", name: "Morning Meeting", code: "vlo-qgua-dds", date: "Oct 30, 2026 · 9:26 AM", duration: "—", size: "4.7 MB", format: "MP4", status: "Completed" },
  { id: "m-7", name: "Morning Meeting", code: "vlo-qgua-dds", date: "Oct 29, 2026 · 10:20 AM", duration: "—", size: "8.8 MB", format: "MP4", status: "Completed" },
  { id: "m-8", name: "Morning Meeting", code: "vlo-qgua-dds", date: "Oct 23, 2026 · 9:02 AM", duration: "—", size: "23.7 MB", format: "MP4", status: "Completed" },
  { id: "m-9", name: "Morning Meeting", code: "vlo-qgua-dds", date: "Oct 20, 2026 · 9:24 AM", duration: "—", size: "28.7 MB", format: "MP4", status: "Completed" },
  { id: "m-10", name: "Morning Meeting", code: "vlo-qgua-dds", date: "Oct 15, 2026 · 2:46 PM", duration: "—", size: "18.1 MB", format: "MP4", status: "Completed" },
  { id: "m-11", name: "Morning Meeting", code: "vlo-qgua-dds", date: "Oct 15, 2026 · 10:04 AM", duration: "—", size: "22.0 MB", format: "MP4", status: "Completed" },
  { id: "m-12", name: "Morning Meeting", code: "vlo-qgua-dds", date: "Oct 15, 2026 · 9:57 AM", duration: "—", size: "—", format: "MP4", status: "Failed" },
  { id: "m-13", name: "Morning Meeting", code: "vlo-qgua-dds", date: "Oct 15, 2026 · 9:32 AM", duration: "—", size: "—", format: "MP4", status: "Failed" },
  { id: "m-14", name: "Morning Meeting", code: "vlo-qgua-dds", date: "Oct 13, 2026 · 1:59 PM", duration: "—", size: "13.3 MB", format: "MP4", status: "Completed" },
];

export type SharedCategory = "folders" | "documents" | "images" | "videos" | "other";

export interface SharedItem {
  id: string;
  name: string;
  permission: "Can edit" | "Can view";
  dateShared: string;
  sharedBy?: string;
  sharedWith?: string;
  isFolder?: boolean;
  category: SharedCategory;
  fileType?: "docx" | "pptx" | "png" | "mp4" | "zip" | "pdf" | "xlsx" | "folder";
}

export const SHARED_WITH_YOU_ITEMS: SharedItem[] = [
  {
    id: "sw-1",
    name: "Project brief.docx",
    permission: "Can edit",
    dateShared: "03/11/2026",
    sharedBy: "Alex Morgan",
    category: "documents",
    fileType: "docx",
  },
  {
    id: "sw-2",
    name: "Roadmap.pptx",
    permission: "Can view",
    dateShared: "28/10/2026",
    sharedBy: "Jordan Lee",
    category: "documents",
    fileType: "pptx",
  },
  {
    id: "sw-3",
    name: "Design Assets",
    permission: "Can view",
    dateShared: "21/10/2026",
    sharedBy: "Casey Brown",
    isFolder: true,
    category: "folders",
    fileType: "folder",
  },
  {
    id: "sw-4",
    name: "Team photo.png",
    permission: "Can view",
    dateShared: "18/10/2026",
    sharedBy: "Taylor Reed",
    category: "images",
    fileType: "png",
  },
  {
    id: "sw-5",
    name: "Launch video.mp4",
    permission: "Can view",
    dateShared: "12/10/2026",
    sharedBy: "Morgan Blake",
    category: "videos",
    fileType: "mp4",
  },
  {
    id: "sw-6",
    name: "Brand colours.zip",
    permission: "Can view",
    dateShared: "10/10/2026",
    sharedBy: "Riley Cole",
    category: "other",
    fileType: "zip",
  },
];

export const SHARED_BY_YOU_ITEMS: SharedItem[] = [
  {
    id: "sb-1",
    name: "Q3 report.pdf",
    permission: "Can edit",
    dateShared: "22m ago",
    sharedWith: "alex.morgan@acme.example",
    category: "documents",
    fileType: "pdf",
  },
  {
    id: "sb-2",
    name: "Client Files",
    permission: "Can view",
    dateShared: "5h ago",
    sharedWith: "jordan.lee@acme.example",
    isFolder: true,
    category: "folders",
    fileType: "folder",
  },
  {
    id: "sb-3",
    name: "Budget.xlsx",
    permission: "Can view",
    dateShared: "25/10/2026",
    sharedWith: "casey.brown@acme.example",
    category: "documents",
    fileType: "xlsx",
  },
];

export interface OrgMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "owner" | "admin" | "member" | "viewer";
}

export const ORG_MEMBERS: OrgMember[] = [
  { id: "mem-1", name: "Sam Taylor", email: "sam.taylor@snaarp.com", avatar: "S", role: "owner" },
  { id: "mem-2", name: "Alex Morgan", email: "alex.morgan@acme.example", avatar: "A", role: "viewer" },
  { id: "mem-3", name: "Jordan Lee", email: "jordan.lee@acme.example", avatar: "J", role: "viewer" },
  { id: "mem-4", name: "Casey Brown", email: "casey.brown@acme.example", avatar: "C", role: "viewer" },
  { id: "mem-5", name: "Taylor Reed", email: "taylor.reed@acme.example", avatar: "T", role: "viewer" },
  { id: "mem-6", name: "Morgan Blake", email: "morgan.blake@acme.example", avatar: "M", role: "viewer" },
  { id: "mem-7", name: "Riley Cole", email: "riley.cole@acme.example", avatar: "R", role: "viewer" },
  { id: "mem-8", name: "Drew Hart", email: "drew.hart@acme.example", avatar: "D", role: "viewer" },
];
