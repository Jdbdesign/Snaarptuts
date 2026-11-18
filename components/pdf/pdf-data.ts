export interface PdfFileItem {
  id: string;
  name: string;
  size: string;
  updated: string;
  type: "pdf" | "jpg" | "png";
}

export const INITIAL_FILES: PdfFileItem[] = [
  {
    id: "f-1",
    name: "Acme Logos (1).pdf",
    size: "244.4 KB",
    updated: "09/11/2026",
    type: "pdf",
  },
];

export const FILE_STEP3_PDF: PdfFileItem = {
  id: "f-2",
  name: "Acme Project Brief.pdf",
  size: "172.6 KB",
  updated: "Just now",
  type: "pdf",
};

export const FILE_STEP3_JPG: PdfFileItem = {
  id: "f-3",
  name: "Site Photo.jpg",
  size: "79.4 KB",
  updated: "Just now",
  type: "jpg",
};

export const FILE_STEP12_RESUME: PdfFileItem = {
  id: "f-4",
  name: "Acme Resume.pdf",
  size: "312.0 KB",
  updated: "Just now",
  type: "pdf",
};

export interface QuickCard {
  id: string;
  title: string;
  bgColor: string;
  borderColor: string;
  iconBg: string;
  iconType: "convert" | "edit" | "translate" | "sign";
}

export const QUICK_CARDS: QuickCard[] = [
  {
    id: "qc-convert",
    title: "Convert PDF",
    bgColor: "#F0F7FF",
    borderColor: "#E0F2FE",
    iconBg: "#38BDF8",
    iconType: "convert",
  },
  {
    id: "qc-edit",
    title: "Edit PDF",
    bgColor: "#ECFDF5",
    borderColor: "#D1FAE5",
    iconBg: "#34D399",
    iconType: "edit",
  },
  {
    id: "qc-translate",
    title: "Translate PDF",
    bgColor: "#FAF5FF",
    borderColor: "#F3E8FF",
    iconBg: "#A855F7",
    iconType: "translate",
  },
  {
    id: "qc-sign",
    title: "Sign PDF",
    bgColor: "#FFF1F2",
    borderColor: "#FFE4E6",
    iconBg: "#FB7185",
    iconType: "sign",
  },
];

export interface PickerFile {
  id: string;
  name: string;
  size: string;
  type: "pdf" | "jpg" | "png";
}

export const PICKER_FILES: PickerFile[] = [
  { id: "pf-brief", name: "Acme Brief.pdf", size: "172.6 KB", type: "pdf" },
  { id: "pf-resume", name: "Acme Resume.pdf", size: "280.0 KB", type: "pdf" },
  { id: "pf-project-brief", name: "Acme Project Brief.pdf", size: "172.6 KB", type: "pdf" },
  { id: "pf-q3", name: "Q3 Report.pdf", size: "410.2 KB", type: "pdf" },
  { id: "pf-photo", name: "Site Photo.jpg", size: "79.4 KB", type: "jpg" },
  { id: "pf-sig", name: "Signature.png", size: "45.2 KB", type: "png" },
  { id: "pf-design", name: "Design Doc.pdf", size: "520.1 KB", type: "pdf" },
  { id: "pf-notes", name: "Meeting Notes.pdf", size: "110.5 KB", type: "pdf" },
];

export type EditorToolId =
  | "pages"
  | "select"
  | "move"
  | "undo"
  | "redo"
  | "addText"
  | "editText"
  | "eraser"
  | "redact"
  | "highlight"
  | "pencil"
  | "image"
  | "ellipse"
  | "cross"
  | "check"
  | "sign"
  | "annotations"
  | "links"
  | "pageLayout"
  | "managePages"
  | "watermark"
  | "share"
  | "translate";

export interface ToolDef {
  id: EditorToolId;
  label: string;
  isAction?: boolean;
}

export const EDITOR_TOOLS: ToolDef[] = [
  { id: "pages", label: "Pages" },
  { id: "select", label: "Select" },
  { id: "move", label: "Move" },
  { id: "undo", label: "Undo", isAction: true },
  { id: "redo", label: "Redo", isAction: true },
  { id: "addText", label: "Add Text" },
  { id: "editText", label: "Edit Text" },
  { id: "eraser", label: "Eraser" },
  { id: "redact", label: "Redact" },
  { id: "highlight", label: "Highlight" },
  { id: "pencil", label: "Pencil" },
  { id: "image", label: "Image" },
  { id: "ellipse", label: "Ellipse" },
  { id: "cross", label: "Cross" },
  { id: "check", label: "Check" },
  { id: "sign", label: "Sign" },
  { id: "annotations", label: "Annotations" },
  { id: "links", label: "Links" },
  { id: "pageLayout", label: "Page Layout" },
  { id: "managePages", label: "Manage Pages" },
  { id: "watermark", label: "Watermark" },
  { id: "share", label: "Share" },
  { id: "translate", label: "Translate" },
];

export interface ResumeData {
  name: string;
  subtitle: string;
  email: string;
  links: { label: string; url: string }[];
  summary: string;
  experience: {
    role: string;
    company: string;
    period: string;
    bullets: string[];
  }[];
  projects: {
    title: string;
    tags: string;
    date: string;
    bullets: string[];
  }[];
  skills: {
    category: string;
    items: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  };
  portfolio: {
    label: string;
    url: string;
  }[];
}

export const RESUME_DATA: ResumeData = {
  name: "JANE DOE",
  subtitle: "Product Designer | UI/UX Designer | Motion & Graphics Designer",
  email: "jane@example.com",
  links: [
    { label: "LinkedIn", url: "https://linkedin.com/in/jane-doe-sample" },
    { label: "Portfolio website", url: "https://example.com/jane-portfolio" },
    { label: "Behance", url: "https://behance.net/janedoe" },
  ],
  summary:
    "Multidisciplinary Product Designer with 5+ years of experience crafting intuitive, user-centered digital products across web, mobile, and design systems. Transitioned into UX/UI design from a background in Accounting and Visual Design, bringing a uniquely analytical approach to design problems. Proven ability to deliver end-to-end product experiences from user research and wireframing through to polished, production-ready interfaces. Experienced across B2B SaaS, fintech, logistics, and data privacy verticals. Skilled at bridging business goals, user needs, and technical constraints to create products that connect, engage, and drive measurable results.",
  experience: [
    {
      role: "Lead Product Designer",
      company: "Acme Studio | Remote",
      period: "2025 – Present",
      bullets: [
        "Led end-to-end product design for Acme's suite of B2B SaaS tools, owning the full design lifecycle from discovery through delivery.",
        "Defined and maintained the design system and component library used across multiple product lines.",
        "Collaborated closely with product and engineering teams to translate business requirements into intuitive, scalable interfaces.",
        "Conducted user research sessions and synthesized insights to inform product roadmap decisions.",
      ],
    },
    {
      role: "UX Designer",
      company: "Orbit Agency | Remote",
      period: "2024 – 2025",
      bullets: [
        "Designed end-to-end user experiences for client digital products, covering user flows, wireframes, and high-fidelity prototypes.",
        "Contributed to pitch decks and design presentations, communicating design rationale clearly to stakeholders.",
        "Worked within agile sprint cycles, delivering design assets on schedule for developer handoff.",
      ],
    },
    {
      role: "Product Design Mentor",
      company: "Design Guild | Remote",
      period: "2024 – Present",
      bullets: [
        "Completed design tasks under tight deadlines in one of the guild's largest internship programs.",
        "Delivered UI/UX design solutions for real-world project briefs, receiving structured peer and mentor feedback.",
      ],
    },
    {
      role: "UI Designer / Visual Designer",
      company: "Northwind Labs | Remote",
      period: "2021 – 2024",
      bullets: [
        "Designed and iterated on data-driven dashboards and analytics interfaces, prioritizing clarity and usability for non-technical users.",
        "Built and maintained a consistent visual language across product surfaces, improving brand coherence.",
        "Partnered with developers to ensure pixel-accurate implementation of designs.",
      ],
    },
  ],
  projects: [
    {
      title: "Taskly – SaaS Project Management Platform",
      tags: "Web App • SaaS • Productivity • B2B",
      date: "June 2026",
      bullets: [
        "Designed a centralized SaaS workspace that unifies task management, real-time collaboration, and data analytics into a single interface.",
        "Solved context-switching fatigue by designing native integrations with Slack, GitHub, Figma, and Notion keeping teams within one ecosystem.",
        "Applied a dark-mode-first aesthetic with high-contrast accessible accent colors to reduce eye strain for power users handling dense data.",
        "Key outcomes: 90% faster onboarding, 85% reduction in context switching, 50% increase in task completion, and 30% boost in overall team productivity.",
      ],
    },
    {
      title: "Tutify – Cross-Border Peer-to-Peer Delivery Network",
      tags: "Mobile App • Logistics • P2P Platform",
      date: "January 2026",
      bullets: [
        "Designed a dual-sided mobile platform connecting senders with verified travelers to enable affordable international package delivery.",
        "Built trust and safety mechanisms: biometric KYC verification, package inspection checklist, escrow payment system, OTP handoff protocol, and real-time GPS tracking.",
        "Created an interactive travel-route matching algorithm UI allowing travelers to monetize spare luggage capacity and reduce unused payload emissions.",
        "Key outcomes: 94% task success rate in usability testing, 4.8/5 satisfaction rating on escrow flow, and 40% reduction in average parcel delivery costs.",
      ],
    },
    {
      title: "MetricHub – Executive Analytics & Revenue Dashboard",
      tags: "Web Dashboard • FinTech • Enterprise",
      date: "November 2025",
      bullets: [
        "Architected interactive data visualization components for recurring revenue metrics, churn predictions, and cohort analysis.",
        "Designed responsive data tables with custom filtering, column sorting, CSV exports, and granular permission controls.",
      ],
    },
  ],
  skills: [
    {
      category: "Product & UX Design",
      items: "User Research • Wireframing • Prototyping • Interaction Design • Information Architecture • Usability Testing • Design Systems",
    },
    {
      category: "Visual & Motion Design",
      items: "Brand Identity • Typography • Motion Graphics • Animated Explainers • Illustration • Art Direction",
    },
    {
      category: "Tools",
      items: "Figma • Adobe XD • After Effects • Adobe Illustrator • Photoshop • Framer • CapCut • Miro • Notion",
    },
    {
      category: "Methodologies",
      items: "Design Thinking • Agile / Scrum • Jobs-to-be-Done • Lean UX • Accessibility (WCAG) • Responsive Design",
    },
    {
      category: "Soft Skills",
      items: "Stakeholder Communication • Cross-functional Collaboration • Data-Informed Decision Making • Creative Problem Solving",
    },
  ],
  education: {
    degree: "B.Sc. Accounting",
    institution: "Sample University",
    year: "2024",
  },
  portfolio: [
    { label: "Portfolio", url: "https://example.com/jane-portfolio" },
    { label: "LinkedIn", url: "https://linkedin.com/in/jane-doe-sample" },
    { label: "Behance", url: "https://behance.net/janedoe" },
    { label: "Dribbble", url: "https://dribbble.com/janedoe" },
  ],
};

export interface StampItem {
  id: string;
  label: string;
  category: "icon" | "text";
  color: string;
  borderColor?: string;
  bgColor?: string;
}

export const STAMP_ITEMS: StampItem[] = [
  // Icon stamps
  { id: "arrow", label: "Arrow", category: "icon", color: "#EF4444" },
  { id: "question", label: "Question Mark", category: "icon", color: "#F59E0B" },
  { id: "star", label: "Star", category: "icon", color: "#F59E0B" },
  // Text stamps
  { id: "approved", label: "APPROVED", category: "text", color: "#16A34A", borderColor: "#16A34A", bgColor: "#F0FDF4" },
  { id: "draft", label: "DRAFT", category: "text", color: "#D97706", borderColor: "#D97706", bgColor: "#FFFBEB" },
  { id: "confidential", label: "CONFIDENTIAL", category: "text", color: "#2563EB", borderColor: "#2563EB", bgColor: "#EFF6FF" },
  { id: "rejected", label: "REJECTED", category: "text", color: "#DC2626", borderColor: "#DC2626", bgColor: "#FEF2F2" },
  { id: "final", label: "FINAL", category: "text", color: "#7C3AED", borderColor: "#7C3AED", bgColor: "#F5F3FF" },
  { id: "copy", label: "COPY", category: "text", color: "#4B5563", borderColor: "#4B5563", bgColor: "#F9FAFB" },
];

export interface ShapeItem {
  id: string;
  label: string;
  icon: string;
}

export const ANNOTATION_SHAPES: ShapeItem[] = [
  { id: "box", label: "Box", icon: "box" },
  { id: "circle", label: "Circle", icon: "circle-filled" },
  { id: "circle-stroke", label: "Circle Stroke", icon: "circle-outline" },
  { id: "cross", label: "Cross", icon: "cross" },
  { id: "check", label: "Check", icon: "check" },
];

export interface ExportFormatItem {
  id: string;
  label: string;
  ext: string;
  color: string;
}

export const EXPORT_FORMATS: ExportFormatItem[] = [
  { id: "pdf", label: "PDF", ext: ".pdf", color: "#DC2626" },
  { id: "png", label: "PNG", ext: ".png", color: "#16A34A" },
  { id: "word", label: "Word", ext: ".docx", color: "#2563EB" },
  { id: "excel", label: "Excel", ext: ".xlsx", color: "#16A34A" },
  { id: "jpg", label: "JPG", ext: ".jpg", color: "#EA580C" },
  { id: "pptx", label: "PPTX", ext: ".pptx", color: "#EA580C" },
];

