export const ZEUS_URLS = {
  people: "zeus.snaarp.com/people",
  billing: "zeus.snaarp.com/billing",
  lists: "zeus.snaarp.com/lists",
  companies: "zeus.snaarp.com/companies",
  exports: "zeus.snaarp.com/exports",
  integrations: "zeus.snaarp.com/integrations",
} as const;

export type ZeusView = "people" | "billing" | "lists" | "companies" | "exports" | "integrations";

export interface ZeusContact {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  title: string;
  company: string;
  companyDomain: string;
  maskedEmail: string;
  revealedEmail: string;
  phone: string;
  location: string;
  isCSuite?: boolean;
  isVP?: boolean;
  isDirector?: boolean;
  isManager?: boolean;
  hasEmail?: boolean;
}

export interface ZeusList {
  id: string;
  name: string;
  type: "Static" | "Dynamic";
  membersCount: number;
  date: string;
  contacts: ZeusContact[];
}

export interface ZeusCompanyEmployee {
  name: string;
  title: string;
}

export interface ZeusCompany {
  id: string;
  name: string;
  domain: string;
  industry: string;
  location: string;
  employees: string;
  revenue: string;
  website?: string;
  people?: ZeusCompanyEmployee[];
}

export interface ZeusExport {
  id: string;
  listName: string;
  contactsCount: number;
  date: string;
  status: "completed" | "processing";
}

export interface ZeusApiKey {
  id: string;
  name: string;
  keyMasked: string;
  createdAt: string;
  status: "active" | "revoked";
}

export interface ZeusWebhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: "active" | "inactive";
  createdAt: string;
}

export const CEO_CONTACT_ELENA: ZeusContact = {
  id: "c-ceo-1",
  name: "Elena Marsh",
  initials: "EM",
  avatarBg: "bg-emerald-600",
  title: "Managing Director",
  company: "Glassmere Ltd",
  companyDomain: "glassmere.example",
  maskedEmail: "••••••@••••.com",
  revealedEmail: "elena.marsh@example.com",
  phone: "Unavailable",
  location: "London, United Kingdom",
  isCSuite: true,
  hasEmail: true,
};

export const CEO_CONTACT_RAVI: ZeusContact = {
  id: "c-ceo-2",
  name: "Ravi Menon",
  initials: "RM",
  avatarBg: "bg-blue-600",
  title: "VP of Technology",
  company: "Deepwater Studios",
  companyDomain: "deepwater.example",
  maskedEmail: "••••••@••••.com",
  revealedEmail: "ravi.menon@example.com",
  phone: "Unavailable",
  location: "Edinburgh, United Kingdom",
  isCSuite: true,
  hasEmail: true,
};

export const SAMPLE_CONTACTS: ZeusContact[] = [
  {
    id: "c-1",
    name: "Jordan Lee",
    initials: "JL",
    avatarBg: "bg-indigo-600",
    title: "Managing Director",
    company: "Northwind Labs",
    companyDomain: "northwindlabs.com",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "jordan.lee@example.com",
    phone: "Unavailable",
    location: "London, United Kingdom",
    isCSuite: true,
    hasEmail: true,
  },
  {
    id: "c-2",
    name: "Alex Morgan",
    initials: "AM",
    avatarBg: "bg-purple-600",
    title: "Chief Executive Officer",
    company: "Acme Studio",
    companyDomain: "acme-studio.com",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "alex.morgan@example.com",
    phone: "Unavailable",
    location: "Manchester, United Kingdom",
    isCSuite: true,
    hasEmail: true,
  },
  {
    id: "c-3",
    name: "Elena Rostova",
    initials: "ER",
    avatarBg: "bg-emerald-600",
    title: "Chief Technology Officer",
    company: "Brightwave Media",
    companyDomain: "brightwave.io",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "elena.rostova@example.com",
    phone: "Unavailable",
    location: "Edinburgh, United Kingdom",
    isCSuite: true,
    hasEmail: true,
  },
  {
    id: "c-4",
    name: "Marcus Vance",
    initials: "MV",
    avatarBg: "bg-blue-600",
    title: "VP of Engineering",
    company: "Harbor & Pine",
    companyDomain: "harborpine.com",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "marcus.vance@example.com",
    phone: "Unavailable",
    location: "Bristol, United Kingdom",
    isVP: true,
    hasEmail: true,
  },
  {
    id: "c-5",
    name: "Sarah Chen",
    initials: "SC",
    avatarBg: "bg-amber-600",
    title: "Chief Financial Officer",
    company: "Lumen Retail",
    companyDomain: "lumenretail.co.uk",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "sarah.chen@example.com",
    phone: "Unavailable",
    location: "London, United Kingdom",
    isCSuite: true,
    hasEmail: true,
  },
  {
    id: "c-6",
    name: "David Kim",
    initials: "DK",
    avatarBg: "bg-rose-600",
    title: "VP of Product Management",
    company: "Orbit Foods",
    companyDomain: "orbitfoods.com",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "david.kim@example.com",
    phone: "Unavailable",
    location: "Leeds, United Kingdom",
    isVP: true,
    hasEmail: true,
  },
  {
    id: "c-7",
    name: "Hannah Davies",
    initials: "HD",
    avatarBg: "bg-teal-600",
    title: "Chief Operating Officer",
    company: "Apex Global Logistics",
    companyDomain: "apexlogistic.com",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "hannah.davies@example.com",
    phone: "Unavailable",
    location: "Birmingham, United Kingdom",
    isCSuite: true,
    hasEmail: true,
  },
  {
    id: "c-8",
    name: "Liam O'Connor",
    initials: "LO",
    avatarBg: "bg-cyan-600",
    title: "VP of Sales & Growth",
    company: "Vertex Cloud Systems",
    companyDomain: "vertexcloud.io",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "liam.oconnor@example.com",
    phone: "Unavailable",
    location: "Belfast, United Kingdom",
    isVP: true,
    hasEmail: true,
  },
  {
    id: "c-9",
    name: "Sophia Martinez",
    initials: "SM",
    avatarBg: "bg-violet-600",
    title: "Chief Marketing Officer",
    company: "Solaris Analytics",
    companyDomain: "solarisdata.com",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "sophia.martinez@example.com",
    phone: "Unavailable",
    location: "Cambridge, United Kingdom",
    isCSuite: true,
    hasEmail: true,
  },
  {
    id: "c-10",
    name: "Oliver Wright",
    initials: "OW",
    avatarBg: "bg-fuchsia-600",
    title: "Chief Information Officer",
    company: "Stratosphere Security",
    companyDomain: "stratospheresec.com",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "oliver.wright@example.com",
    phone: "Unavailable",
    location: "Oxford, United Kingdom",
    isCSuite: true,
    hasEmail: true,
  },
  {
    id: "c-11",
    name: "Chloe Bennett",
    initials: "CB",
    avatarBg: "bg-sky-600",
    title: "VP of Infrastructure",
    company: "Krypton Telecom",
    companyDomain: "kryptontelecom.com",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "chloe.bennett@example.com",
    phone: "Unavailable",
    location: "Newcastle, United Kingdom",
    isVP: true,
    hasEmail: true,
  },
  {
    id: "c-12",
    name: "Benjamin Taylor",
    initials: "BT",
    avatarBg: "bg-orange-600",
    title: "Chief Product Officer",
    company: "Hyperion Digital",
    companyDomain: "hyperiondigital.co",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "benjamin.taylor@example.com",
    phone: "Unavailable",
    location: "Glasgow, United Kingdom",
    isCSuite: true,
    hasEmail: true,
  },
  {
    id: "c-13",
    name: "Amara Patel",
    initials: "AP",
    avatarBg: "bg-lime-600",
    title: "VP of Strategic Partnerships",
    company: "Crestview Media",
    companyDomain: "crestviewmedia.com",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "amara.patel@example.com",
    phone: "Unavailable",
    location: "London, United Kingdom",
    isVP: true,
    hasEmail: true,
  },
  {
    id: "c-14",
    name: "Lucas Silva",
    initials: "LS",
    avatarBg: "bg-pink-600",
    title: "Chief Revenue Officer",
    company: "Vanguard Payment Solutions",
    companyDomain: "vanguardpay.com",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "lucas.silva@example.com",
    phone: "Unavailable",
    location: "Cardiff, United Kingdom",
    isCSuite: true,
    hasEmail: true,
  },
  {
    id: "c-15",
    name: "Grace Wilson",
    initials: "GW",
    avatarBg: "bg-indigo-500",
    title: "Director of Engineering",
    company: "Zephyr Energy Labs",
    companyDomain: "zephyrlabs.io",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "grace.wilson@example.com",
    phone: "Unavailable",
    location: "Southampton, United Kingdom",
    isDirector: true,
    hasEmail: true,
  },
  {
    id: "c-16",
    name: "Ethan Clarke",
    initials: "EC",
    avatarBg: "bg-purple-500",
    title: "Chief Strategy Officer",
    company: "OmniCorp Tech",
    companyDomain: "omnicorp.co.uk",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "ethan.clarke@example.com",
    phone: "Unavailable",
    location: "London, United Kingdom",
    isCSuite: true,
    hasEmail: true,
  },
  {
    id: "c-17",
    name: "Isabella Rossi",
    initials: "IR",
    avatarBg: "bg-emerald-500",
    title: "VP of People & Talent",
    company: "Pinnacle Capital",
    companyDomain: "pinnaclecap.com",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "isabella.rossi@example.com",
    phone: "Unavailable",
    location: "Liverpool, United Kingdom",
    isVP: true,
    hasEmail: true,
  },
  {
    id: "c-18",
    name: "Daniel Evans",
    initials: "DE",
    avatarBg: "bg-blue-500",
    title: "Chief Legal Officer",
    company: "Silverline Advisors",
    companyDomain: "silverlineadv.com",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "daniel.evans@example.com",
    phone: "Unavailable",
    location: "London, United Kingdom",
    isCSuite: true,
    hasEmail: true,
  },
  {
    id: "c-19",
    name: "Mia Kowalski",
    initials: "MK",
    avatarBg: "bg-amber-500",
    title: "VP of Design",
    company: "Prism Creative Studios",
    companyDomain: "prismstudios.design",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "mia.kowalski@example.com",
    phone: "Unavailable",
    location: "Brighton, United Kingdom",
    isVP: true,
    hasEmail: true,
  },
  {
    id: "c-20",
    name: "Noah Walker",
    initials: "NW",
    avatarBg: "bg-rose-500",
    title: "Managing Director",
    company: "Cobalt Health Informatics",
    companyDomain: "cobalthealth.io",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "noah.walker@example.com",
    phone: "Unavailable",
    location: "Sheffield, United Kingdom",
    isCSuite: true,
    hasEmail: true,
  },
  {
    id: "c-21",
    name: "Zoe Campbell",
    initials: "ZC",
    avatarBg: "bg-teal-500",
    title: "VP of Customer Success",
    company: "Beacon CRM",
    companyDomain: "beaconcrm.com",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "zoe.campbell@example.com",
    phone: "Unavailable",
    location: "York, United Kingdom",
    isVP: true,
    hasEmail: true,
  },
  {
    id: "c-22",
    name: "Jack Robinson",
    initials: "JR",
    avatarBg: "bg-cyan-500",
    title: "Chief Architect",
    company: "Aether Grid Systems",
    companyDomain: "aethergrid.io",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "jack.robinson@example.com",
    phone: "Unavailable",
    location: "Exeter, United Kingdom",
    isCSuite: true,
    hasEmail: true,
  },
  {
    id: "c-23",
    name: "Lily Dubois",
    initials: "LD",
    avatarBg: "bg-violet-500",
    title: "VP of Corporate Development",
    company: "Terra BioPharma",
    companyDomain: "terrabio.com",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "lily.dubois@example.com",
    phone: "Unavailable",
    location: "London, United Kingdom",
    isVP: true,
    hasEmail: true,
  },
  {
    id: "c-24",
    name: "Ryan Murphy",
    initials: "RM",
    avatarBg: "bg-fuchsia-500",
    title: "Chief Information Security Officer",
    company: "Sentinel Defense Cyber",
    companyDomain: "sentinelcyber.co.uk",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "ryan.murphy@example.com",
    phone: "Unavailable",
    location: "Norwich, United Kingdom",
    isCSuite: true,
    hasEmail: true,
  },
  {
    id: "c-25",
    name: "Emily Hughes",
    initials: "EH",
    avatarBg: "bg-sky-500",
    title: "VP of Supply Chain",
    company: "Meridian Global",
    companyDomain: "meridianglobal.com",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "emily.hughes@example.com",
    phone: "Unavailable",
    location: "Aberdeen, United Kingdom",
    isVP: true,
    hasEmail: true,
  },
  {
    id: "c-26",
    name: "James Anderson",
    initials: "JA",
    avatarBg: "bg-orange-500",
    title: "Chief Executive Officer",
    company: "Novus Robotics",
    companyDomain: "novusrobotics.com",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "james.anderson@example.com",
    phone: "Unavailable",
    location: "Cambridge, United Kingdom",
    isCSuite: true,
    hasEmail: true,
  },
  {
    id: "c-27",
    name: "Aria Thorne",
    initials: "AT",
    avatarBg: "bg-pink-500",
    title: "Chief Innovation Officer",
    company: "Pulse Therapeutics",
    companyDomain: "pulsetherapeutics.com",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "aria.thorne@example.com",
    phone: "Unavailable",
    location: "Oxford, United Kingdom",
    isCSuite: true,
    hasEmail: true,
  },
  {
    id: "c-28",
    name: "Leo Hashimoto",
    initials: "LH",
    avatarBg: "bg-indigo-700",
    title: "VP of Global Operations",
    company: "Atlas Mobility",
    companyDomain: "atlasmobility.co",
    maskedEmail: "••••••@••••.com",
    revealedEmail: "leo.hashimoto@example.com",
    phone: "Unavailable",
    location: "London, United Kingdom",
    isVP: true,
    hasEmail: true,
  },
];


export const INITIAL_LISTS: ZeusList[] = [
  {
    id: "list-1",
    name: "Tech CEO",
    type: "Static",
    membersCount: 0,
    date: "09/10/2026",
    contacts: [],
  },
];

export const PLANS_DATA = [
  {
    id: "free",
    name: "Free",
    price: 0,
    credits: "50 credits/month",
    description: "Essential discovery for individuals",
    current: true,
  },
  {
    id: "basic",
    name: "Basic",
    price: 49,
    credits: "500 credits/month",
    description: "Growing teams needing verified emails",
    current: false,
  },
  {
    id: "pro",
    name: "Professional",
    price: 99,
    credits: "2,000 credits/month",
    description: "Scale outbound sales pipelines",
    current: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 249,
    credits: "10,000 credits/month",
    description: "Full API and bulk export capability",
    current: false,
  },
];


export const ZEUS_COMPANIES: ZeusCompany[] = [
  {
    "id": "comp-1",
    "name": "Brightwave Systems GmbH",
    "domain": "www.brightwave.example",
    "industry": "Technology; Information and Internet",
    "location": "Zurich, Switzerland",
    "employees": "31",
    "revenue": "\u00a310M-\u00a350M",
    "website": "https://www.brightwave.example",
    "people": [
      {
        "name": "Lukas Weber",
        "title": "Managing Director"
      },
      {
        "name": "Sophie Keller",
        "title": "Head of Engineering"
      },
      {
        "name": "Marc Steiner",
        "title": "Product Lead"
      }
    ]
  },
  {
    "id": "comp-2",
    "name": "Veloce Cloud AG",
    "domain": "www.velocecloud.example",
    "industry": "Technology; Cloud Infrastructure",
    "location": "Geneva, Switzerland",
    "employees": "140",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.velocecloud.example",
    "people": [
      {
        "name": "Julien Blanc",
        "title": "Chief Technology Officer"
      },
      {
        "name": "Claire Favre",
        "title": "VP Product"
      }
    ]
  },
  {
    "id": "comp-3",
    "name": "Kinetiq Data Ltd",
    "domain": "www.kinetiqdata.example",
    "industry": "Technology; Data Analytics",
    "location": "London, United Kingdom",
    "employees": "85",
    "revenue": "\u00a310M-\u00a320M",
    "website": "https://www.kinetiqdata.example",
    "people": [
      {
        "name": "Oliver Twist",
        "title": "Chief Data Officer"
      }
    ]
  },
  {
    "id": "comp-4",
    "name": "Hyperion Security BV",
    "domain": "www.hyperionsec.example",
    "industry": "Technology; Cyber Security",
    "location": "Amsterdam, Netherlands",
    "employees": "210",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.hyperionsec.example",
    "people": [
      {
        "name": "Jan van Dijk",
        "title": "Chief Information Security Officer"
      }
    ]
  },
  {
    "id": "comp-5",
    "name": "Stratum AI Labs",
    "domain": "www.stratumai.example",
    "industry": "Technology; Artificial Intelligence",
    "location": "Cambridge, United Kingdom",
    "employees": "45",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.stratumai.example",
    "people": [
      {
        "name": "Dr. Aris Thorne",
        "title": "Head of AI Research"
      }
    ]
  },
  {
    "id": "comp-6",
    "name": "Nexus Logic Oyj",
    "domain": "www.nexuslogic.example",
    "industry": "Technology; HealthTech",
    "location": "Zurich, Switzerland",
    "employees": "260",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.nexuslogic.example",
    "people": [
      {
        "name": "Executive 6",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-7",
    "name": "Nexus Dynamics SE",
    "domain": "www.nexusdynamics.example",
    "industry": "Technology; Mobile Applications",
    "location": "Edinburgh, United Kingdom",
    "employees": "420",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.nexusdynamics.example",
    "people": [
      {
        "name": "Executive 7",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-8",
    "name": "Nexus Network Ltd",
    "domain": "www.nexusnetwork.example",
    "industry": "Technology; Developer Tools",
    "location": "Munich, Germany",
    "employees": "650",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.nexusnetwork.example",
    "people": [
      {
        "name": "Executive 8",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-9",
    "name": "Nexus Systems GmbH",
    "domain": "www.nexussystems.example",
    "industry": "Technology; eCommerce Solutions",
    "location": "Copenhagen, Denmark",
    "employees": "1,200",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.nexussystems.example",
    "people": [
      {
        "name": "Executive 9",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-10",
    "name": "Nexus Computing AG",
    "domain": "www.nexuscomputing.example",
    "industry": "Technology; Software & SaaS",
    "location": "Helsinki, Finland",
    "employees": "2,400",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.nexuscomputing.example",
    "people": [
      {
        "name": "Executive 10",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-11",
    "name": "Nexus Ventures BV",
    "domain": "www.nexusventures.example",
    "industry": "Technology; Cloud Platforms",
    "location": "Oslo, Norway",
    "employees": "12",
    "revenue": "\u00a3100M+",
    "website": "https://www.nexusventures.example",
    "people": [
      {
        "name": "Executive 11",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-12",
    "name": "Nexus Digital SAS",
    "domain": "www.nexusdigital.example",
    "industry": "Technology; Cybersecurity",
    "location": "Brussels, Belgium",
    "employees": "28",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.nexusdigital.example",
    "people": [
      {
        "name": "Executive 12",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-13",
    "name": "Nexus Solutions AB",
    "domain": "www.nexussolutions.example",
    "industry": "Technology; Data & Analytics",
    "location": "Vienna, Austria",
    "employees": "45",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.nexussolutions.example",
    "people": [
      {
        "name": "Executive 13",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-14",
    "name": "Nexus Matrix Oyj",
    "domain": "www.nexusmatrix.example",
    "industry": "Technology; Artificial Intelligence",
    "location": "Madrid, Spain",
    "employees": "72",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.nexusmatrix.example",
    "people": [
      {
        "name": "Executive 14",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-15",
    "name": "Nexus Interactive SE",
    "domain": "www.nexusinteractive.example",
    "industry": "Technology; Financial Software",
    "location": "Barcelona, Spain",
    "employees": "110",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.nexusinteractive.example",
    "people": [
      {
        "name": "Executive 15",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-16",
    "name": "Nexus Technologies Ltd",
    "domain": "www.nexustechnologies.example",
    "industry": "Technology; HealthTech",
    "location": "Milan, Italy",
    "employees": "180",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.nexustechnologies.example",
    "people": [
      {
        "name": "Executive 16",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-17",
    "name": "Nexus Labs GmbH",
    "domain": "www.nexuslabs.example",
    "industry": "Technology; Mobile Applications",
    "location": "Warsaw, Poland",
    "employees": "260",
    "revenue": "\u00a3100M+",
    "website": "https://www.nexuslabs.example",
    "people": [
      {
        "name": "Executive 17",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-18",
    "name": "Nexus Analytics AG",
    "domain": "www.nexusanalytics.example",
    "industry": "Technology; Developer Tools",
    "location": "Manchester, United Kingdom",
    "employees": "420",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.nexusanalytics.example",
    "people": [
      {
        "name": "Executive 18",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-19",
    "name": "Nexus Platform BV",
    "domain": "www.nexusplatform.example",
    "industry": "Technology; eCommerce Solutions",
    "location": "Bristol, United Kingdom",
    "employees": "650",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.nexusplatform.example",
    "people": [
      {
        "name": "Executive 19",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-20",
    "name": "Nexus Security SAS",
    "domain": "www.nexussecurity.example",
    "industry": "Technology; Software & SaaS",
    "location": "London, United Kingdom",
    "employees": "1,200",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.nexussecurity.example",
    "people": [
      {
        "name": "Executive 20",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-21",
    "name": "Aether Logic AB",
    "domain": "www.aetherlogic.example",
    "industry": "Technology; Cloud Platforms",
    "location": "Berlin, Germany",
    "employees": "2,400",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.aetherlogic.example",
    "people": [
      {
        "name": "Executive 21",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-22",
    "name": "Aether Dynamics Oyj",
    "domain": "www.aetherdynamics.example",
    "industry": "Technology; Cybersecurity",
    "location": "Paris, France",
    "employees": "12",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.aetherdynamics.example",
    "people": [
      {
        "name": "Executive 22",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-23",
    "name": "Aether Network SE",
    "domain": "www.aethernetwork.example",
    "industry": "Technology; Data & Analytics",
    "location": "Dublin, Ireland",
    "employees": "28",
    "revenue": "\u00a3100M+",
    "website": "https://www.aethernetwork.example",
    "people": [
      {
        "name": "Executive 23",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-24",
    "name": "Aether Systems Ltd",
    "domain": "www.aethersystems.example",
    "industry": "Technology; Artificial Intelligence",
    "location": "Amsterdam, Netherlands",
    "employees": "45",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.aethersystems.example",
    "people": [
      {
        "name": "Executive 24",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-25",
    "name": "Aether Computing GmbH",
    "domain": "www.aethercomputing.example",
    "industry": "Technology; Financial Software",
    "location": "Stockholm, Sweden",
    "employees": "72",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.aethercomputing.example",
    "people": [
      {
        "name": "Executive 25",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-26",
    "name": "Aether Ventures AG",
    "domain": "www.aetherventures.example",
    "industry": "Technology; HealthTech",
    "location": "Zurich, Switzerland",
    "employees": "110",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.aetherventures.example",
    "people": [
      {
        "name": "Executive 26",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-27",
    "name": "Aether Digital BV",
    "domain": "www.aetherdigital.example",
    "industry": "Technology; Mobile Applications",
    "location": "Edinburgh, United Kingdom",
    "employees": "180",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.aetherdigital.example",
    "people": [
      {
        "name": "Executive 27",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-28",
    "name": "Aether Solutions SAS",
    "domain": "www.aethersolutions.example",
    "industry": "Technology; Developer Tools",
    "location": "Munich, Germany",
    "employees": "260",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.aethersolutions.example",
    "people": [
      {
        "name": "Executive 28",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-29",
    "name": "Aether Matrix AB",
    "domain": "www.aethermatrix.example",
    "industry": "Technology; eCommerce Solutions",
    "location": "Copenhagen, Denmark",
    "employees": "420",
    "revenue": "\u00a3100M+",
    "website": "https://www.aethermatrix.example",
    "people": [
      {
        "name": "Executive 29",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-30",
    "name": "Aether Interactive Oyj",
    "domain": "www.aetherinteractive.example",
    "industry": "Technology; Software & SaaS",
    "location": "Helsinki, Finland",
    "employees": "650",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.aetherinteractive.example",
    "people": [
      {
        "name": "Executive 30",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-31",
    "name": "Aether Technologies SE",
    "domain": "www.aethertechnologies.example",
    "industry": "Technology; Cloud Platforms",
    "location": "Oslo, Norway",
    "employees": "1,200",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.aethertechnologies.example",
    "people": [
      {
        "name": "Executive 31",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-32",
    "name": "Aether Labs Ltd",
    "domain": "www.aetherlabs.example",
    "industry": "Technology; Cybersecurity",
    "location": "Brussels, Belgium",
    "employees": "2,400",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.aetherlabs.example",
    "people": [
      {
        "name": "Executive 32",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-33",
    "name": "Aether Analytics GmbH",
    "domain": "www.aetheranalytics.example",
    "industry": "Technology; Data & Analytics",
    "location": "Vienna, Austria",
    "employees": "12",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.aetheranalytics.example",
    "people": [
      {
        "name": "Executive 33",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-34",
    "name": "Aether Platform AG",
    "domain": "www.aetherplatform.example",
    "industry": "Technology; Artificial Intelligence",
    "location": "Madrid, Spain",
    "employees": "28",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.aetherplatform.example",
    "people": [
      {
        "name": "Executive 34",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-35",
    "name": "Aether Security BV",
    "domain": "www.aethersecurity.example",
    "industry": "Technology; Financial Software",
    "location": "Barcelona, Spain",
    "employees": "45",
    "revenue": "\u00a3100M+",
    "website": "https://www.aethersecurity.example",
    "people": [
      {
        "name": "Executive 35",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-36",
    "name": "Omni Logic SAS",
    "domain": "www.omnilogic.example",
    "industry": "Technology; HealthTech",
    "location": "Milan, Italy",
    "employees": "72",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.omnilogic.example",
    "people": [
      {
        "name": "Executive 36",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-37",
    "name": "Omni Dynamics AB",
    "domain": "www.omnidynamics.example",
    "industry": "Technology; Mobile Applications",
    "location": "Warsaw, Poland",
    "employees": "110",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.omnidynamics.example",
    "people": [
      {
        "name": "Executive 37",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-38",
    "name": "Omni Network Oyj",
    "domain": "www.omninetwork.example",
    "industry": "Technology; Developer Tools",
    "location": "Manchester, United Kingdom",
    "employees": "180",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.omninetwork.example",
    "people": [
      {
        "name": "Executive 38",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-39",
    "name": "Omni Systems SE",
    "domain": "www.omnisystems.example",
    "industry": "Technology; eCommerce Solutions",
    "location": "Bristol, United Kingdom",
    "employees": "260",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.omnisystems.example",
    "people": [
      {
        "name": "Executive 39",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-40",
    "name": "Omni Computing Ltd",
    "domain": "www.omnicomputing.example",
    "industry": "Technology; Software & SaaS",
    "location": "London, United Kingdom",
    "employees": "420",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.omnicomputing.example",
    "people": [
      {
        "name": "Executive 40",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-41",
    "name": "Omni Ventures GmbH",
    "domain": "www.omniventures.example",
    "industry": "Technology; Cloud Platforms",
    "location": "Berlin, Germany",
    "employees": "650",
    "revenue": "\u00a3100M+",
    "website": "https://www.omniventures.example",
    "people": [
      {
        "name": "Executive 41",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-42",
    "name": "Omni Digital AG",
    "domain": "www.omnidigital.example",
    "industry": "Technology; Cybersecurity",
    "location": "Paris, France",
    "employees": "1,200",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.omnidigital.example",
    "people": [
      {
        "name": "Executive 42",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-43",
    "name": "Omni Solutions BV",
    "domain": "www.omnisolutions.example",
    "industry": "Technology; Data & Analytics",
    "location": "Dublin, Ireland",
    "employees": "2,400",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.omnisolutions.example",
    "people": [
      {
        "name": "Executive 43",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-44",
    "name": "Omni Matrix SAS",
    "domain": "www.omnimatrix.example",
    "industry": "Technology; Artificial Intelligence",
    "location": "Amsterdam, Netherlands",
    "employees": "12",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.omnimatrix.example",
    "people": [
      {
        "name": "Executive 44",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-45",
    "name": "Omni Interactive AB",
    "domain": "www.omniinteractive.example",
    "industry": "Technology; Financial Software",
    "location": "Stockholm, Sweden",
    "employees": "28",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.omniinteractive.example",
    "people": [
      {
        "name": "Executive 45",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-46",
    "name": "Omni Technologies Oyj",
    "domain": "www.omnitechnologies.example",
    "industry": "Technology; HealthTech",
    "location": "Zurich, Switzerland",
    "employees": "45",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.omnitechnologies.example",
    "people": [
      {
        "name": "Executive 46",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-47",
    "name": "Omni Labs SE",
    "domain": "www.omnilabs.example",
    "industry": "Technology; Mobile Applications",
    "location": "Edinburgh, United Kingdom",
    "employees": "72",
    "revenue": "\u00a3100M+",
    "website": "https://www.omnilabs.example",
    "people": [
      {
        "name": "Executive 47",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-48",
    "name": "Omni Analytics Ltd",
    "domain": "www.omnianalytics.example",
    "industry": "Technology; Developer Tools",
    "location": "Munich, Germany",
    "employees": "110",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.omnianalytics.example",
    "people": [
      {
        "name": "Executive 48",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-49",
    "name": "Omni Platform GmbH",
    "domain": "www.omniplatform.example",
    "industry": "Technology; eCommerce Solutions",
    "location": "Copenhagen, Denmark",
    "employees": "180",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.omniplatform.example",
    "people": [
      {
        "name": "Executive 49",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-50",
    "name": "Omni Security AG",
    "domain": "www.omnisecurity.example",
    "industry": "Technology; Software & SaaS",
    "location": "Helsinki, Finland",
    "employees": "260",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.omnisecurity.example",
    "people": [
      {
        "name": "Executive 50",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-51",
    "name": "Synapse Logic BV",
    "domain": "www.synapselogic.example",
    "industry": "Technology; Cloud Platforms",
    "location": "Oslo, Norway",
    "employees": "420",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.synapselogic.example",
    "people": [
      {
        "name": "Executive 51",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-52",
    "name": "Synapse Dynamics SAS",
    "domain": "www.synapsedynamics.example",
    "industry": "Technology; Cybersecurity",
    "location": "Brussels, Belgium",
    "employees": "650",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.synapsedynamics.example",
    "people": [
      {
        "name": "Executive 52",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-53",
    "name": "Synapse Network AB",
    "domain": "www.synapsenetwork.example",
    "industry": "Technology; Data & Analytics",
    "location": "Vienna, Austria",
    "employees": "1,200",
    "revenue": "\u00a3100M+",
    "website": "https://www.synapsenetwork.example",
    "people": [
      {
        "name": "Executive 53",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-54",
    "name": "Synapse Systems Oyj",
    "domain": "www.synapsesystems.example",
    "industry": "Technology; Artificial Intelligence",
    "location": "Madrid, Spain",
    "employees": "2,400",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.synapsesystems.example",
    "people": [
      {
        "name": "Executive 54",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-55",
    "name": "Synapse Computing SE",
    "domain": "www.synapsecomputing.example",
    "industry": "Technology; Financial Software",
    "location": "Barcelona, Spain",
    "employees": "12",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.synapsecomputing.example",
    "people": [
      {
        "name": "Executive 55",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-56",
    "name": "Synapse Ventures Ltd",
    "domain": "www.synapseventures.example",
    "industry": "Technology; HealthTech",
    "location": "Milan, Italy",
    "employees": "28",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.synapseventures.example",
    "people": [
      {
        "name": "Executive 56",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-57",
    "name": "Synapse Digital GmbH",
    "domain": "www.synapsedigital.example",
    "industry": "Technology; Mobile Applications",
    "location": "Warsaw, Poland",
    "employees": "45",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.synapsedigital.example",
    "people": [
      {
        "name": "Executive 57",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-58",
    "name": "Synapse Solutions AG",
    "domain": "www.synapsesolutions.example",
    "industry": "Technology; Developer Tools",
    "location": "Manchester, United Kingdom",
    "employees": "72",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.synapsesolutions.example",
    "people": [
      {
        "name": "Executive 58",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-59",
    "name": "Synapse Matrix BV",
    "domain": "www.synapsematrix.example",
    "industry": "Technology; eCommerce Solutions",
    "location": "Bristol, United Kingdom",
    "employees": "110",
    "revenue": "\u00a3100M+",
    "website": "https://www.synapsematrix.example",
    "people": [
      {
        "name": "Executive 59",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-60",
    "name": "Synapse Interactive SAS",
    "domain": "www.synapseinteractive.example",
    "industry": "Technology; Software & SaaS",
    "location": "London, United Kingdom",
    "employees": "180",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.synapseinteractive.example",
    "people": [
      {
        "name": "Executive 60",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-61",
    "name": "Synapse Technologies AB",
    "domain": "www.synapsetechnologies.example",
    "industry": "Technology; Cloud Platforms",
    "location": "Berlin, Germany",
    "employees": "260",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.synapsetechnologies.example",
    "people": [
      {
        "name": "Executive 61",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-62",
    "name": "Synapse Labs Oyj",
    "domain": "www.synapselabs.example",
    "industry": "Technology; Cybersecurity",
    "location": "Paris, France",
    "employees": "420",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.synapselabs.example",
    "people": [
      {
        "name": "Executive 62",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-63",
    "name": "Synapse Analytics SE",
    "domain": "www.synapseanalytics.example",
    "industry": "Technology; Data & Analytics",
    "location": "Dublin, Ireland",
    "employees": "650",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.synapseanalytics.example",
    "people": [
      {
        "name": "Executive 63",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-64",
    "name": "Synapse Platform Ltd",
    "domain": "www.synapseplatform.example",
    "industry": "Technology; Artificial Intelligence",
    "location": "Amsterdam, Netherlands",
    "employees": "1,200",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.synapseplatform.example",
    "people": [
      {
        "name": "Executive 64",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-65",
    "name": "Synapse Security GmbH",
    "domain": "www.synapsesecurity.example",
    "industry": "Technology; Financial Software",
    "location": "Stockholm, Sweden",
    "employees": "2,400",
    "revenue": "\u00a3100M+",
    "website": "https://www.synapsesecurity.example",
    "people": [
      {
        "name": "Executive 65",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-66",
    "name": "Cobalt Logic AG",
    "domain": "www.cobaltlogic.example",
    "industry": "Technology; HealthTech",
    "location": "Zurich, Switzerland",
    "employees": "12",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.cobaltlogic.example",
    "people": [
      {
        "name": "Executive 66",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-67",
    "name": "Cobalt Dynamics BV",
    "domain": "www.cobaltdynamics.example",
    "industry": "Technology; Mobile Applications",
    "location": "Edinburgh, United Kingdom",
    "employees": "28",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.cobaltdynamics.example",
    "people": [
      {
        "name": "Executive 67",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-68",
    "name": "Cobalt Network SAS",
    "domain": "www.cobaltnetwork.example",
    "industry": "Technology; Developer Tools",
    "location": "Munich, Germany",
    "employees": "45",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.cobaltnetwork.example",
    "people": [
      {
        "name": "Executive 68",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-69",
    "name": "Cobalt Systems AB",
    "domain": "www.cobaltsystems.example",
    "industry": "Technology; eCommerce Solutions",
    "location": "Copenhagen, Denmark",
    "employees": "72",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.cobaltsystems.example",
    "people": [
      {
        "name": "Executive 69",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-70",
    "name": "Cobalt Computing Oyj",
    "domain": "www.cobaltcomputing.example",
    "industry": "Technology; Software & SaaS",
    "location": "Helsinki, Finland",
    "employees": "110",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.cobaltcomputing.example",
    "people": [
      {
        "name": "Executive 70",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-71",
    "name": "Cobalt Ventures SE",
    "domain": "www.cobaltventures.example",
    "industry": "Technology; Cloud Platforms",
    "location": "Oslo, Norway",
    "employees": "180",
    "revenue": "\u00a3100M+",
    "website": "https://www.cobaltventures.example",
    "people": [
      {
        "name": "Executive 71",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-72",
    "name": "Cobalt Digital Ltd",
    "domain": "www.cobaltdigital.example",
    "industry": "Technology; Cybersecurity",
    "location": "Brussels, Belgium",
    "employees": "260",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.cobaltdigital.example",
    "people": [
      {
        "name": "Executive 72",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-73",
    "name": "Cobalt Solutions GmbH",
    "domain": "www.cobaltsolutions.example",
    "industry": "Technology; Data & Analytics",
    "location": "Vienna, Austria",
    "employees": "420",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.cobaltsolutions.example",
    "people": [
      {
        "name": "Executive 73",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-74",
    "name": "Cobalt Matrix AG",
    "domain": "www.cobaltmatrix.example",
    "industry": "Technology; Artificial Intelligence",
    "location": "Madrid, Spain",
    "employees": "650",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.cobaltmatrix.example",
    "people": [
      {
        "name": "Executive 74",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-75",
    "name": "Cobalt Interactive BV",
    "domain": "www.cobaltinteractive.example",
    "industry": "Technology; Financial Software",
    "location": "Barcelona, Spain",
    "employees": "1,200",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.cobaltinteractive.example",
    "people": [
      {
        "name": "Executive 75",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-76",
    "name": "Cobalt Technologies SAS",
    "domain": "www.cobalttechnologies.example",
    "industry": "Technology; HealthTech",
    "location": "Milan, Italy",
    "employees": "2,400",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.cobalttechnologies.example",
    "people": [
      {
        "name": "Executive 76",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-77",
    "name": "Cobalt Labs AB",
    "domain": "www.cobaltlabs.example",
    "industry": "Technology; Mobile Applications",
    "location": "Warsaw, Poland",
    "employees": "12",
    "revenue": "\u00a3100M+",
    "website": "https://www.cobaltlabs.example",
    "people": [
      {
        "name": "Executive 77",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-78",
    "name": "Cobalt Analytics Oyj",
    "domain": "www.cobaltanalytics.example",
    "industry": "Technology; Developer Tools",
    "location": "Manchester, United Kingdom",
    "employees": "28",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.cobaltanalytics.example",
    "people": [
      {
        "name": "Executive 78",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-79",
    "name": "Cobalt Platform SE",
    "domain": "www.cobaltplatform.example",
    "industry": "Technology; eCommerce Solutions",
    "location": "Bristol, United Kingdom",
    "employees": "45",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.cobaltplatform.example",
    "people": [
      {
        "name": "Executive 79",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-80",
    "name": "Cobalt Security Ltd",
    "domain": "www.cobaltsecurity.example",
    "industry": "Technology; Software & SaaS",
    "location": "London, United Kingdom",
    "employees": "72",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.cobaltsecurity.example",
    "people": [
      {
        "name": "Executive 80",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-81",
    "name": "Apex Logic GmbH",
    "domain": "www.apexlogic.example",
    "industry": "Technology; Cloud Platforms",
    "location": "Berlin, Germany",
    "employees": "110",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.apexlogic.example",
    "people": [
      {
        "name": "Executive 81",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-82",
    "name": "Apex Dynamics AG",
    "domain": "www.apexdynamics.example",
    "industry": "Technology; Cybersecurity",
    "location": "Paris, France",
    "employees": "180",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.apexdynamics.example",
    "people": [
      {
        "name": "Executive 82",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-83",
    "name": "Apex Network BV",
    "domain": "www.apexnetwork.example",
    "industry": "Technology; Data & Analytics",
    "location": "Dublin, Ireland",
    "employees": "260",
    "revenue": "\u00a3100M+",
    "website": "https://www.apexnetwork.example",
    "people": [
      {
        "name": "Executive 83",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-84",
    "name": "Apex Systems SAS",
    "domain": "www.apexsystems.example",
    "industry": "Technology; Artificial Intelligence",
    "location": "Amsterdam, Netherlands",
    "employees": "420",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.apexsystems.example",
    "people": [
      {
        "name": "Executive 84",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-85",
    "name": "Apex Computing AB",
    "domain": "www.apexcomputing.example",
    "industry": "Technology; Financial Software",
    "location": "Stockholm, Sweden",
    "employees": "650",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.apexcomputing.example",
    "people": [
      {
        "name": "Executive 85",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-86",
    "name": "Apex Ventures Oyj",
    "domain": "www.apexventures.example",
    "industry": "Technology; HealthTech",
    "location": "Zurich, Switzerland",
    "employees": "1,200",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.apexventures.example",
    "people": [
      {
        "name": "Executive 86",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-87",
    "name": "Apex Digital SE",
    "domain": "www.apexdigital.example",
    "industry": "Technology; Mobile Applications",
    "location": "Edinburgh, United Kingdom",
    "employees": "2,400",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.apexdigital.example",
    "people": [
      {
        "name": "Executive 87",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-88",
    "name": "Apex Solutions Ltd",
    "domain": "www.apexsolutions.example",
    "industry": "Technology; Developer Tools",
    "location": "Munich, Germany",
    "employees": "12",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.apexsolutions.example",
    "people": [
      {
        "name": "Executive 88",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-89",
    "name": "Apex Matrix GmbH",
    "domain": "www.apexmatrix.example",
    "industry": "Technology; eCommerce Solutions",
    "location": "Copenhagen, Denmark",
    "employees": "28",
    "revenue": "\u00a3100M+",
    "website": "https://www.apexmatrix.example",
    "people": [
      {
        "name": "Executive 89",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-90",
    "name": "Apex Interactive AG",
    "domain": "www.apexinteractive.example",
    "industry": "Technology; Software & SaaS",
    "location": "Helsinki, Finland",
    "employees": "45",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.apexinteractive.example",
    "people": [
      {
        "name": "Executive 90",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-91",
    "name": "Apex Technologies BV",
    "domain": "www.apextechnologies.example",
    "industry": "Technology; Cloud Platforms",
    "location": "Oslo, Norway",
    "employees": "72",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.apextechnologies.example",
    "people": [
      {
        "name": "Executive 91",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-92",
    "name": "Apex Labs SAS",
    "domain": "www.apexlabs.example",
    "industry": "Technology; Cybersecurity",
    "location": "Brussels, Belgium",
    "employees": "110",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.apexlabs.example",
    "people": [
      {
        "name": "Executive 92",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-93",
    "name": "Apex Analytics AB",
    "domain": "www.apexanalytics.example",
    "industry": "Technology; Data & Analytics",
    "location": "Vienna, Austria",
    "employees": "180",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.apexanalytics.example",
    "people": [
      {
        "name": "Executive 93",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-94",
    "name": "Apex Platform Oyj",
    "domain": "www.apexplatform.example",
    "industry": "Technology; Artificial Intelligence",
    "location": "Madrid, Spain",
    "employees": "260",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.apexplatform.example",
    "people": [
      {
        "name": "Executive 94",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-95",
    "name": "Apex Security SE",
    "domain": "www.apexsecurity.example",
    "industry": "Technology; Financial Software",
    "location": "Barcelona, Spain",
    "employees": "420",
    "revenue": "\u00a3100M+",
    "website": "https://www.apexsecurity.example",
    "people": [
      {
        "name": "Executive 95",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-96",
    "name": "Vanguard Logic Ltd",
    "domain": "www.vanguardlogic.example",
    "industry": "Technology; HealthTech",
    "location": "Milan, Italy",
    "employees": "650",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.vanguardlogic.example",
    "people": [
      {
        "name": "Executive 96",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-97",
    "name": "Vanguard Dynamics GmbH",
    "domain": "www.vanguarddynamics.example",
    "industry": "Technology; Mobile Applications",
    "location": "Warsaw, Poland",
    "employees": "1,200",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.vanguarddynamics.example",
    "people": [
      {
        "name": "Executive 97",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-98",
    "name": "Vanguard Network AG",
    "domain": "www.vanguardnetwork.example",
    "industry": "Technology; Developer Tools",
    "location": "Manchester, United Kingdom",
    "employees": "2,400",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.vanguardnetwork.example",
    "people": [
      {
        "name": "Executive 98",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-99",
    "name": "Vanguard Systems BV",
    "domain": "www.vanguardsystems.example",
    "industry": "Technology; eCommerce Solutions",
    "location": "Bristol, United Kingdom",
    "employees": "12",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.vanguardsystems.example",
    "people": [
      {
        "name": "Executive 99",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-100",
    "name": "Vanguard Computing SAS",
    "domain": "www.vanguardcomputing.example",
    "industry": "Technology; Software & SaaS",
    "location": "London, United Kingdom",
    "employees": "28",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.vanguardcomputing.example",
    "people": [
      {
        "name": "Executive 100",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-101",
    "name": "Vanguard Ventures AB",
    "domain": "www.vanguardventures.example",
    "industry": "Technology; Cloud Platforms",
    "location": "Berlin, Germany",
    "employees": "45",
    "revenue": "\u00a3100M+",
    "website": "https://www.vanguardventures.example",
    "people": [
      {
        "name": "Executive 101",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-102",
    "name": "Vanguard Digital Oyj",
    "domain": "www.vanguarddigital.example",
    "industry": "Technology; Cybersecurity",
    "location": "Paris, France",
    "employees": "72",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.vanguarddigital.example",
    "people": [
      {
        "name": "Executive 102",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-103",
    "name": "Vanguard Solutions SE",
    "domain": "www.vanguardsolutions.example",
    "industry": "Technology; Data & Analytics",
    "location": "Dublin, Ireland",
    "employees": "110",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.vanguardsolutions.example",
    "people": [
      {
        "name": "Executive 103",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-104",
    "name": "Vanguard Matrix Ltd",
    "domain": "www.vanguardmatrix.example",
    "industry": "Technology; Artificial Intelligence",
    "location": "Amsterdam, Netherlands",
    "employees": "180",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.vanguardmatrix.example",
    "people": [
      {
        "name": "Executive 104",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-105",
    "name": "Vanguard Interactive GmbH",
    "domain": "www.vanguardinteractive.example",
    "industry": "Technology; Financial Software",
    "location": "Stockholm, Sweden",
    "employees": "260",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.vanguardinteractive.example",
    "people": [
      {
        "name": "Executive 105",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-106",
    "name": "Vanguard Technologies AG",
    "domain": "www.vanguardtechnologies.example",
    "industry": "Technology; HealthTech",
    "location": "Zurich, Switzerland",
    "employees": "420",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.vanguardtechnologies.example",
    "people": [
      {
        "name": "Executive 106",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-107",
    "name": "Vanguard Labs BV",
    "domain": "www.vanguardlabs.example",
    "industry": "Technology; Mobile Applications",
    "location": "Edinburgh, United Kingdom",
    "employees": "650",
    "revenue": "\u00a3100M+",
    "website": "https://www.vanguardlabs.example",
    "people": [
      {
        "name": "Executive 107",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-108",
    "name": "Vanguard Analytics SAS",
    "domain": "www.vanguardanalytics.example",
    "industry": "Technology; Developer Tools",
    "location": "Munich, Germany",
    "employees": "1,200",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.vanguardanalytics.example",
    "people": [
      {
        "name": "Executive 108",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-109",
    "name": "Vanguard Platform AB",
    "domain": "www.vanguardplatform.example",
    "industry": "Technology; eCommerce Solutions",
    "location": "Copenhagen, Denmark",
    "employees": "2,400",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.vanguardplatform.example",
    "people": [
      {
        "name": "Executive 109",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-110",
    "name": "Vanguard Security Oyj",
    "domain": "www.vanguardsecurity.example",
    "industry": "Technology; Software & SaaS",
    "location": "Helsinki, Finland",
    "employees": "12",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.vanguardsecurity.example",
    "people": [
      {
        "name": "Executive 110",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-111",
    "name": "Prism Logic SE",
    "domain": "www.prismlogic.example",
    "industry": "Technology; Cloud Platforms",
    "location": "Oslo, Norway",
    "employees": "28",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.prismlogic.example",
    "people": [
      {
        "name": "Executive 111",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-112",
    "name": "Prism Dynamics Ltd",
    "domain": "www.prismdynamics.example",
    "industry": "Technology; Cybersecurity",
    "location": "Brussels, Belgium",
    "employees": "45",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.prismdynamics.example",
    "people": [
      {
        "name": "Executive 112",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-113",
    "name": "Prism Network GmbH",
    "domain": "www.prismnetwork.example",
    "industry": "Technology; Data & Analytics",
    "location": "Vienna, Austria",
    "employees": "72",
    "revenue": "\u00a3100M+",
    "website": "https://www.prismnetwork.example",
    "people": [
      {
        "name": "Executive 113",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-114",
    "name": "Prism Systems AG",
    "domain": "www.prismsystems.example",
    "industry": "Technology; Artificial Intelligence",
    "location": "Madrid, Spain",
    "employees": "110",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.prismsystems.example",
    "people": [
      {
        "name": "Executive 114",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-115",
    "name": "Prism Computing BV",
    "domain": "www.prismcomputing.example",
    "industry": "Technology; Financial Software",
    "location": "Barcelona, Spain",
    "employees": "180",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.prismcomputing.example",
    "people": [
      {
        "name": "Executive 115",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-116",
    "name": "Prism Ventures SAS",
    "domain": "www.prismventures.example",
    "industry": "Technology; HealthTech",
    "location": "Milan, Italy",
    "employees": "260",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.prismventures.example",
    "people": [
      {
        "name": "Executive 116",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-117",
    "name": "Prism Digital AB",
    "domain": "www.prismdigital.example",
    "industry": "Technology; Mobile Applications",
    "location": "Warsaw, Poland",
    "employees": "420",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.prismdigital.example",
    "people": [
      {
        "name": "Executive 117",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-118",
    "name": "Prism Solutions Oyj",
    "domain": "www.prismsolutions.example",
    "industry": "Technology; Developer Tools",
    "location": "Manchester, United Kingdom",
    "employees": "650",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.prismsolutions.example",
    "people": [
      {
        "name": "Executive 118",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-119",
    "name": "Prism Matrix SE",
    "domain": "www.prismmatrix.example",
    "industry": "Technology; eCommerce Solutions",
    "location": "Bristol, United Kingdom",
    "employees": "1,200",
    "revenue": "\u00a3100M+",
    "website": "https://www.prismmatrix.example",
    "people": [
      {
        "name": "Executive 119",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-120",
    "name": "Prism Interactive Ltd",
    "domain": "www.prisminteractive.example",
    "industry": "Technology; Software & SaaS",
    "location": "London, United Kingdom",
    "employees": "2,400",
    "revenue": "\u00a31M-\u00a35M",
    "website": "https://www.prisminteractive.example",
    "people": [
      {
        "name": "Executive 120",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-121",
    "name": "Prism Technologies GmbH",
    "domain": "www.prismtechnologies.example",
    "industry": "Technology; Cloud Platforms",
    "location": "Berlin, Germany",
    "employees": "12",
    "revenue": "\u00a35M-\u00a310M",
    "website": "https://www.prismtechnologies.example",
    "people": [
      {
        "name": "Executive 121",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-122",
    "name": "Prism Labs AG",
    "domain": "www.prismlabs.example",
    "industry": "Technology; Cybersecurity",
    "location": "Paris, France",
    "employees": "28",
    "revenue": "\u00a310M-\u00a325M",
    "website": "https://www.prismlabs.example",
    "people": [
      {
        "name": "Executive 122",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-123",
    "name": "Prism Analytics BV",
    "domain": "www.prismanalytics.example",
    "industry": "Technology; Data & Analytics",
    "location": "Dublin, Ireland",
    "employees": "45",
    "revenue": "\u00a325M-\u00a350M",
    "website": "https://www.prismanalytics.example",
    "people": [
      {
        "name": "Executive 123",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-124",
    "name": "Prism Platform SAS",
    "domain": "www.prismplatform.example",
    "industry": "Technology; Artificial Intelligence",
    "location": "Amsterdam, Netherlands",
    "employees": "72",
    "revenue": "\u00a350M-\u00a3100M",
    "website": "https://www.prismplatform.example",
    "people": [
      {
        "name": "Executive 124",
        "title": "Managing Director"
      }
    ]
  },
  {
    "id": "comp-125",
    "name": "Prism Security AB",
    "domain": "www.prismsecurity.example",
    "industry": "Technology; Financial Software",
    "location": "Stockholm, Sweden",
    "employees": "110",
    "revenue": "\u00a3100M+",
    "website": "https://www.prismsecurity.example",
    "people": [
      {
        "name": "Executive 125",
        "title": "Managing Director"
      }
    ]
  }
];
