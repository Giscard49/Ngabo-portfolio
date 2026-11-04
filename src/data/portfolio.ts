export type WebsiteProject = {
  id: string
  name: string
  category: "Websites"
  discipline: string
  summary: string
  description: string
  image: string
  imageAlt: string
  url: string
  displayUrl: string
  tags: string[]
  featured?: boolean
}

export type AppProject = {
  id: string
  name: string
  category: "Mobile Apps"
  discipline: string
  summary: string
  description: string
  icon: string
  screen: string
  screenAlt: string
  storeUrl: string
  tags: string[]
  accent: string
}

export type Poster = {
  src: string
  alt: string
  title: string
  type: string
}

export type CreativeBrand = {
  id: string
  name: string
  shortName: string
  years: string
  handle: string
  instagram: string
  logo: string
  description: string
  focus: string[]
  accent: string
  accentDark: string
  posters: Poster[]
}

export const websiteProjects: WebsiteProject[] = [
  {
    id: "xana-health",
    name: "Xana Health",
    category: "Websites",
    discipline: "Healthcare platform · Front-end",
    summary: "Care, without the paperwork.",
    description:
      "Front-end contributions to a web-based EMR platform — shaping patient check-in, billing and insurance workflows for faster, paperless clinics.",
    image: "/work/web/xana.jpg",
    imageAlt:
      "Xana Health website presenting an electronic medical records platform for modern clinics",
    url: "https://xanahealth.io",
    displayUrl: "xanahealth.io",
    tags: ["EMR", "Front-end", "Product UI"],
    featured: true,
  },
  {
    id: "nj-talents",
    name: "NJ Talents Center",
    category: "Websites",
    discipline: "Art marketplace · Full-stack",
    summary: "Where art transcends reality.",
    description:
      "An end-to-end build for an online art gallery and marketplace — interface design, front-end, back-end and database, unified into one considered experience.",
    image: "/work/web/njtalents.jpg",
    imageAlt:
      "NJ Talents Center website hero featuring a colourful art marketplace and gallery",
    url: "https://njtalentscenter.com",
    displayUrl: "njtalentscenter.com",
    tags: ["Full-stack", "Marketplace", "Commerce"],
  },
  {
    id: "nextline-homes",
    name: "Nextline Homes",
    category: "Websites",
    discipline: "Real estate marketplace · Product",
    summary: "Your next home starts here.",
    description:
      "A property discovery experience for buying, renting and short stays across Rwanda — combining smart search, curated listings and simple agent workflows.",
    image: "/work/web/nextline.jpg",
    imageAlt:
      "Nextline Homes website with property search and listings for homes in Rwanda",
    url: "https://www.nextlinehomes.com",
    displayUrl: "nextlinehomes.com",
    tags: ["Marketplace", "Search", "UX"],
  },
  {
    id: "coomiac",
    name: "Coomiac",
    category: "Websites",
    discipline: "Bilingual brand site · Design & build",
    summary: "The Congo's minerals, prepared for the world.",
    description:
      "A bilingual digital home for a responsible-sourcing cooperative — mineral catalogue, certifications, field gallery and a direct enquiry path for qualified buyers.",
    image: "/work/web/coomiac.jpg",
    imageAlt:
      "Coomiac website with a dark editorial hero about responsibly sourced minerals from Walikale",
    url: "https://coomiac.com",
    displayUrl: "coomiac.com",
    tags: ["Bilingual", "Brand site", "CMS"],
    featured: true,
  },
]

export const appProjects: AppProject[] = [
  {
    id: "ziramba",
    name: "Ziramba",
    category: "Mobile Apps",
    discipline: "Multi-role marketplace · iOS",
    summary: "One app. Every project.",
    description:
      "A marketplace connecting shoppers, contractors and suppliers. Browse products, hire services, manage orders and move between roles from one clear interface.",
    icon: "/work/apps/ziramba-icon.png",
    screen: "/work/apps/ziramba-screen.jpg",
    screenAlt:
      "Ziramba iOS app home screen with eco-friendly paver promotion and product discovery",
    storeUrl: "https://apps.apple.com/us/app/ziramba/id6740089219",
    tags: ["Marketplace", "Product", "iOS"],
    accent: "#dd2027",
  },
  {
    id: "kilimall",
    name: "Kilimall",
    category: "Mobile Apps",
    discipline: "E-commerce app · iOS",
    summary: "Affordable shopping, delivered.",
    description:
      "A shopping experience built around everyday essentials, electronics, fashion and home goods — with category browsing and checkout designed to feel effortless.",
    icon: "/work/apps/kilimall-icon.png",
    screen: "/work/apps/kilimall-screen.jpg",
    screenAlt:
      "Kilimall iOS app category screen with brand sale and product departments",
    storeUrl:
      "https://apps.apple.com/us/app/kilimall-affordable-shopping/id6470137287",
    tags: ["E-commerce", "Mobile UI", "iOS"],
    accent: "#f04d3c",
  },
]

export const creativeBrands: CreativeBrand[] = [
  {
    id: "kfc-rwanda",
    name: "KFC Rwanda",
    shortName: "KFC",
    years: "2018—2021",
    handle: "@kfcrwanda",
    instagram: "https://www.instagram.com/kfcrwanda",
    logo: "/work/brands/kfc.png",
    description:
      "Designed campaign graphics and social content for KFC Rwanda, translating product launches, offers and everyday brand moments into a bold, appetite-driven feed.",
    focus: ["Campaign graphics", "Product launches", "Social content"],
    accent: "#e4002b",
    accentDark: "#31030b",
    posters: [],
  },
  {
    id: "inyange",
    name: "Inyange",
    shortName: "Inyange",
    years: "2021—2026",
    handle: "@alwaysinyange",
    instagram: "https://www.instagram.com/alwaysinyange",
    logo: "/work/brands/inyange.png",
    description:
      "Visual content and social storytelling for Inyange's everyday dairy and beverage range — from product moments to seasonal campaigns, published with one consistent brand voice.",
    focus: ["Brand content", "Product storytelling", "Social management"],
    accent: "#2e8fc4",
    accentDark: "#062435",
    posters: [],
  },
  {
    id: "la-racine",
    name: "École Internationale La Racine",
    shortName: "La Racine",
    years: "2021—2026",
    handle: "@ecole_internationale_la_racine",
    instagram:
      "https://www.instagram.com/ecole_internationale_la_racine",
    logo: "/work/brands/laracine.png",
    description:
      "Day-to-day social media management and graphic design for an international school — admissions, national days, staff milestones and the stories that hold a community together.",
    focus: ["Social media management", "Campaign design", "Community storytelling"],
    accent: "#2f7d4a",
    accentDark: "#0b2414",
    posters: [
      {
        src: "/work/creative/lr-back-to-school.jpg",
        alt: "Back to School campaign artwork for École Internationale La Racine",
        title: "Back to school",
        type: "Admissions campaign",
      },
      {
        src: "/work/creative/lr-kwibuka.jpg",
        alt: "Kwibuka 32 commemorative artwork for École Internationale La Racine",
        title: "Kwibuka 32",
        type: "National commemoration",
      },
      {
        src: "/work/creative/lr-may.jpg",
        alt: "Happy New Month May social media artwork for École Internationale La Racine",
        title: "A new month",
        type: "Monthly social card",
      },
      {
        src: "/work/creative/lr-admission.jpg",
        alt: "Admissions announcement artwork for École Internationale La Racine",
        title: "Admissions open",
        type: "Enrolment campaign",
      },
      {
        src: "/work/creative/lr-quote-1.jpg",
        alt: "Education quote card designed for École Internationale La Racine",
        title: "Clarity",
        type: "Editorial quote card",
      },
      {
        src: "/work/creative/lr-quote-2.jpg",
        alt: "Motivational education quote card for École Internationale La Racine",
        title: "Strength",
        type: "Editorial quote card",
      },
      {
        src: "/work/creative/lr-mothers-day.jpg",
        alt: "Mother's Day campaign artwork for École Internationale La Racine",
        title: "Mother's Day",
        type: "Seasonal campaign",
      },
      {
        src: "/work/creative/lr-labour.jpg",
        alt: "Labour Day artwork for École Internationale La Racine",
        title: "Labour Day",
        type: "Seasonal campaign",
      },
    ],
  },
  {
    id: "danza-del-alma",
    name: "Danza Del Alma Kigali",
    shortName: "Danza Del Alma",
    years: "2024—2026",
    handle: "@danza_del_alma_kigali",
    instagram: "https://www.instagram.com/danza_del_alma_kigali",
    logo: "/work/brands/danza.png",
    description:
      "Creative direction and social content for Kigali's salsa and kizomba community — class announcements, event campaigns and the energy between the steps.",
    focus: ["Event campaigns", "Class promotions", "Content creation"],
    accent: "#8e2346",
    accentDark: "#22060f",
    posters: [
      {
        src: "/work/creative/danza-afrosoul.jpg",
        alt: "Afrosoul Connection silent party event poster for Danza Del Alma Kigali",
        title: "Afrosoul Connection",
        type: "Event campaign",
      },
      {
        src: "/work/creative/danza-gatunzi.jpg",
        alt: "Salsa and kizomba summer intake poster for Danza Del Alma Kigali",
        title: "Summer intake",
        type: "Class promotion",
      },
      {
        src: "/work/creative/danza-dance-day.jpg",
        alt: "International Dance Day artwork for Danza Del Alma Kigali",
        title: "International Dance Day",
        type: "Brand moment",
      },
      {
        src: "/work/creative/danza-kwibuka.jpg",
        alt: "Kwibuka 32 commemorative artwork for Danza Del Alma Kigali",
        title: "Kwibuka 32",
        type: "National commemoration",
      },
      {
        src: "/work/creative/danza-energy.jpg",
        alt: "Energy, passion, rhythm editorial quote card for Danza Del Alma Kigali",
        title: "Energy, passion, rhythm",
        type: "Editorial quote card",
      },
      {
        src: "/work/creative/danza-friday.jpg",
        alt: "Friday social dance night artwork for Danza Del Alma Kigali",
        title: "Friday nights",
        type: "Event announcement",
      },
      {
        src: "/work/creative/danza-notice.jpg",
        alt: "Important schedule update notice for Danza Del Alma Kigali",
        title: "Community update",
        type: "Announcement",
      },
      {
        src: "/work/creative/danza-sa.jpg",
        alt: "African dance classes poster for Danza Del Alma Kigali",
        title: "Movement",
        type: "Class promotion",
      },
    ],
  },
]

export const services = [
  {
    number: "01",
    name: "Software, Web & App Development",
    description:
      "Robust digital products engineered for scale — high-performing websites, web platforms and native mobile experiences.",
  },
  {
    number: "02",
    name: "UI/UX & Product Design",
    description:
      "Research-led interfaces that make complex interactions feel clear, natural and memorable.",
  },
  {
    number: "03",
    name: "Graphic Design & Social Media",
    description:
      "Social-first visual identities, campaign graphics and content systems — from art direction to publishing and community management.",
  },
  {
    number: "04",
    name: "Branding & Art Direction",
    description:
      "Distinctive identities, campaigns and visual systems that give a brand an unmistakable voice.",
  },
  {
    number: "05",
    name: "Digital Marketing & Content Strategy",
    description:
      "Editorial thinking and data-informed campaigns designed to reach the right audience and turn attention into growth.",
  },
  {
    number: "06",
    name: "IT Consulting",
    description:
      "Practical technology guidance that aligns systems, teams and tools with real business goals.",
  },
]

export const experience = [
  {
    date: "2018 — Present",
    company: "Independent Practice",
    role: "Graphic Designer & Social Media Manager",
    description:
      "Long-term creative partnerships with KFC Rwanda, Inyange, École Internationale La Racine and Danza Del Alma Kigali — designing the work and managing the channels that carry it.",
  },
  {
    date: "2025 — Present",
    company: "Sixcode",
    role: "Senior Software Engineer",
    description:
      "Building scalable product systems and leading engineering delivery.",
  },
  {
    date: "2024 — 2025",
    company: "DStv Kenya",
    role: "Graphic Designer",
    description:
      "Creating campaign identities and cross-market visual communications.",
  },
  {
    date: "2022 — 2024",
    company: "Scaled Inc",
    role: "IT Consultant",
    description:
      "Translating business needs into resilient digital solutions.",
  },
  {
    date: "2020 — 2023",
    company: "DP World",
    role: "Digital Reporting",
    description:
      "Transforming operational data into clear, actionable reporting.",
  },
]

export const skillGroups = [
  {
    label: "Build",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind",
      "PHP",
      "Python",
      "MySQL",
      "Swift",
      "Kotlin",
      "Dart",
      "Git",
    ],
  },
  {
    label: "Design",
    skills: [
      "Figma",
      "Adobe Photoshop",
      "Illustrator",
      "Premiere Pro",
      "Art direction",
      "Typography",
    ],
  },
  {
    label: "Grow",
    skills: [
      "Meta Business Suite",
      "Instagram",
      "Content strategy",
      "Community management",
      "WordPress",
      "Analytics",
    ],
  },
]

export const education = [
  {
    type: "Degree",
    title: "BSc, Information Technology",
    institution: "University of Rwanda",
    detail: "Kigali, Rwanda",
  },
  {
    type: "Certificate",
    title: "Google UX Design",
    institution: "Professional Certificate",
    detail: "Interaction & product design",
  },
  {
    type: "Certificate",
    title: "Meta Front-End Developer",
    institution: "Professional Certificate",
    detail: "Advanced React development",
  },
]
