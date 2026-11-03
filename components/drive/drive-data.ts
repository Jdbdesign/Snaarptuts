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

export const SAMPLE_PHOTOS = [
  { id: "p1", title: "Coffee cup on red table", color: "#EF4444", accent: "#991B1B", aspect: "aspect-[4/3]" },
  { id: "p2", title: "Sunset over peaceful lake", color: "#F59E0B", accent: "#B45309", aspect: "aspect-[3/4]" },
  { id: "p3", title: "Skater at sunset park", color: "#6B7280", accent: "#374151", aspect: "aspect-[4/3]" },
  { id: "p4", title: "Heart silhouette against sun", color: "#F97316", accent: "#C2410C", aspect: "aspect-[4/3]" },
  { id: "p5", title: "Woman inside subway train", color: "#E5E7EB", accent: "#4B5563", aspect: "aspect-[3/4]" },
  { id: "p6", title: "Photographer in pine forest", color: "#10B981", accent: "#047857", aspect: "aspect-[3/4]" },
  { id: "p7", title: "Green rustic doorway and windows", color: "#14B8A6", accent: "#0F766E", aspect: "aspect-[4/3]" },
  { id: "p8", title: "Canoe gliding on turquoise lake", color: "#06B6D4", accent: "#0E7490", aspect: "aspect-[4/3]" },
  { id: "p9", title: "Classic white offroader by cabin", color: "#FBBF24", accent: "#92400E", aspect: "aspect-[4/3]" },
  { id: "p10", title: "Relaxing on sunny park lawn", color: "#84CC16", accent: "#4D7C0F", aspect: "aspect-[4/3]" },
];
