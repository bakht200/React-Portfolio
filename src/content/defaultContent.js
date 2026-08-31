/** Default portfolio content — editable via /admin builder. */

export const STORAGE_KEY = 'haider-portfolio-content-v1'

export const defaultContent = {
  theme: {
    primary: '#ff6321',
    primaryHover: '#e5551a',
    background: '#f4f4f3',
    textHeading: '#060612',
    textBody: '#3a3a45',
    textMuted: '#8a8a93',
    fontFamily: 'Geist',
  },

  site: {
    name: 'Haider Ghauri',
    logoAsset: 'HG icon.svg',
    title: 'haiderportfolio',
  },

  hero: {
    badge: 'Open to Remote Work',
    line1: "Hi, I'm Haider Ghauri",
    accent: 'Design Products',
    line3: 'People Love to Use.',
    subheading:
      "I'm a Senior Product Designer with 5+ years of experience building AI platforms, healthcare tools, fintech apps, and enterprise SaaS from first wireframe to final handoff. Available for full-time remote roles and freelance projects across the US, EU, and worldwide.",
    primaryCta: "Let's Connect",
    secondaryCta: 'Explore My Work',
  },

  trusted: {
    label: 'Proudly worked with:',
    logos: [
      { id: 'healthcare', label: 'Healthcare & HIPAA' },
      { id: 'ai-products', label: 'AI Products' },
      { id: 'hrms', label: 'HRMS & HCM' },
      { id: 'fintech', label: 'Fintech' },
      { id: 'ecommerce', label: 'E-Commerce' },
      { id: 'inventory', label: 'Inventory & Ops' },
    ],
  },

  categories: [
    { id: 'healthcare', label: 'Healthcare & HIPAA' },
    { id: 'ai-products', label: 'AI Products' },
    { id: 'hrms', label: 'HRMS & HCM' },
    { id: 'fintech', label: 'Fintech' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'inventory', label: 'Inventory & Ops' },
  ],

  collapsedItemCount: 3,

  projects: [
    {
      id: 'creative-studio',
      title: 'Creative Studio',
      categoryId: 'ai-products',
      tool: 'Figma',
      year: '2026',
      yearDisplay: '/2026',
      image: 'project-1.jpg',
      content: [
        'Creative Studio is a brand identity project built for a boutique design agency launching a fresh visual presence.',
        'I led discovery workshops, defined the visual language, and delivered a scalable design system.',
      ],
    },
    {
      id: 'ecommerce-product',
      title: 'E-commerce Product',
      categoryId: 'ecommerce',
      tool: 'Framer',
      year: '2026',
      yearDisplay: '/2026',
      image: 'project-2.jpg',
      content: [
        'This e-commerce product experience focuses on reducing friction from browse to checkout.',
        'The work included user flow mapping, high-fidelity UI, and interactive prototypes.',
      ],
    },
    {
      id: 'brand-identity',
      title: 'Brand Identity',
      categoryId: 'hrms',
      tool: 'Adobe XD',
      year: '2026',
      yearDisplay: '/2026',
      image: 'bento-3.jpg',
      content: [
        'Brand Identity is a comprehensive redesign for an enterprise team managing multiple product lines.',
        'I created a modular UI kit and documented patterns for engineering handoff.',
      ],
    },
    {
      id: 'count-meds',
      title: 'Count Meds',
      categoryId: 'healthcare',
      tool: 'Figma',
      year: '2025',
      yearDisplay: '/2025',
      image: 'bento-1.jpg',
      content: [
        'Count Meds is a healthcare dashboard for tracking medication inventory and compliance workflows.',
        'The interface prioritizes scan-friendly tables and role-based views.',
      ],
    },
    {
      id: 'mymentro-ai',
      title: 'MyMentro.ai',
      categoryId: 'ai-products',
      tool: 'Framer',
      year: '2025',
      yearDisplay: '/2025',
      image: 'bento-2.jpg',
      content: [
        'MyMentro.ai is an AI coaching platform that turns unstructured notes into actionable growth plans.',
        'I designed conversational flows and insight cards.',
      ],
    },
    {
      id: 'inventra',
      title: 'Inventra – Inventory Management System',
      categoryId: 'inventory',
      tool: 'Figma',
      year: '2025',
      yearDisplay: '/2025',
      image: 'project-1.jpg',
      content: [
        'Inventra streamlines warehouse operations with real-time stock levels and supplier management.',
        'The design system supports dense data tables on desktop and tablet.',
      ],
    },
    {
      id: 'payment-flow',
      title: 'Payment Flow',
      categoryId: 'fintech',
      tool: 'Figma',
      year: '2024',
      yearDisplay: '/2024',
      image: 'project-2.jpg',
      content: [
        'Payment Flow is a fintech onboarding experience for a digital wallet.',
        'I simplified KYC steps and designed error recovery patterns.',
      ],
    },
    {
      id: 'shopfront-redesign',
      title: 'Shopfront Redesign',
      categoryId: 'ecommerce',
      tool: 'Adobe XD',
      year: '2024',
      yearDisplay: '/2024',
      image: 'bento-3.jpg',
      content: [
        'Shopfront Redesign modernizes a multi-vendor marketplace with improved discovery and checkout.',
        'The project included a full responsive grid system.',
      ],
    },
    {
      id: 'workforce-hub',
      title: 'Workforce Hub',
      categoryId: 'hrms',
      tool: 'Figma',
      year: '2024',
      yearDisplay: '/2024',
      image: 'bento-1.jpg',
      content: [
        'Workforce Hub unifies leave management, payroll summaries, and employee self-service.',
        'I focused on clear status tracking and manager approvals.',
      ],
    },
  ],

  caseStudies: [
    {
      id: 'ff-galaxy-hrms',
      title: 'Galaxy HCM — Enterprise HR Redesign',
      date: '2024',
      dateTime: '2024',
      time: '9:30 AM',
      image: 'bento-1.jpg',
      pdf: 'case-studies/pomhealthcasestudy.pdf',
      excerpt:
        'How I redesigned an enterprise HR platform used by 500+ employees — end-to-end, as the sole designer.',
      featured: true,
    },
    {
      id: 'designer-developer-collab',
      title: 'Bridging the Gap: Collaboration Between Designers and Developers',
      date: 'Jun 15, 2024',
      dateTime: '2024-06-15',
      time: '2:00 PM',
      image: 'bento-2.jpg',
      pdf: 'case-studies/pomhealthcasestudy.pdf',
    },
    {
      id: 'user-centered-design',
      title: 'User-Centered Design: Why It Matters and How to Implement It',
      date: 'Jun 13, 2024',
      dateTime: '2024-06-13',
      time: '11:15 AM',
      image: 'project-1.jpg',
      pdf: 'case-studies/pomhealthcasestudy.pdf',
    },
    {
      id: 'pom-health-platform',
      title: 'POM Health Platform',
      date: 'Oct 22, 2024',
      dateTime: '2024-10-22',
      time: '11:00 AM',
      image: 'bento-3.jpg',
      pdf: 'case-studies/pomhealthcasestudy.pdf',
    },
    {
      id: 'ai-product-discovery',
      title: 'AI Product Discovery Framework',
      date: 'Sep 5, 2024',
      dateTime: '2024-09-05',
      time: '3:45 PM',
      image: 'project-2.jpg',
      pdf: 'case-studies/pomhealthcasestudy.pdf',
    },
    {
      id: 'fintech-onboarding',
      title: 'Fintech Onboarding at Scale',
      date: 'Aug 18, 2024',
      dateTime: '2024-08-18',
      time: '10:20 AM',
      image: 'bento-1.jpg',
      pdf: 'case-studies/pomhealthcasestudy.pdf',
    },
    {
      id: 'ecommerce-conversion',
      title: 'E-Commerce Conversion Optimization',
      date: 'Jul 8, 2024',
      dateTime: '2024-07-08',
      time: '4:00 PM',
      image: 'project-1.jpg',
      pdf: 'case-studies/pomhealthcasestudy.pdf',
    },
    {
      id: 'enterprise-hcm-rollout',
      title: 'Enterprise HCM Rollout Strategy',
      date: 'Jun 1, 2024',
      dateTime: '2024-06-01',
      time: '9:00 AM',
      image: 'bento-3.jpg',
      pdf: 'case-studies/pomhealthcasestudy.pdf',
    },
  ],

  about: {
    stats: [
      { id: 'location', label: 'Based In', value: 'Peshawar, Pakistan' },
      { id: 'experience', label: 'Years of Experience', value: '5+', highlight: true },
      { id: 'projects', label: 'Projects Completed', value: '30+', highlight: true },
    ],
    bio: {
      greeting: "Hello! I'm Haider Ghauri,",
      title: 'Product Designer',
      paragraphs: [
        'A Product Designer, with a passion for designing impactful digital products and high-performing landing pages.',
        'My approach to design is rooted in understanding user needs and business goals.',
      ],
    },
    workExperience: [
      {
        id: 'productbox',
        company: 'Productbox',
        location: 'On-site',
        type: 'Full Time',
        period: 'July 2025 - Present',
        role: 'Principal Product Designer',
        description: 'Lead end-to-end design strategy across multiple product lines.',
      },
    ],
    stackTools: [
      { id: 'figma', name: 'Figma', category: 'General Design' },
      { id: 'framer', name: 'Framer', category: 'Portfolio/Web' },
      { id: 'notion', name: 'Notion', category: 'Documentation' },
    ],
    education: {
      degree: 'Bachelor in Software Engineering',
      school: 'City University of Science and Information Technology',
      period: '2017 - 2021',
    },
    profilePhoto: 'profile-photo.jpg',
    profileRole: 'UI/UX Design & Framer Development',
  },

  faq: {
    badge: '> GOT QUESTIONS <',
    heading: "We've got answers",
    note: "Let's clear things up",
    footerTitle: 'Still have questions?',
    footerCta: "Let's talk",
    items: [
      {
        id: 'timeline',
        question: 'How long does a typical project take?',
        answer:
          'Most product design engagements run 4–8 weeks depending on scope.',
      },
      {
        id: 'clients',
        question: 'Do you work with startups or only large brands?',
        answer: 'Both. I work with early-stage startups and enterprise organizations.',
      },
    ],
  },

  cta: {
    eyebrow: "Let's build something great",
    heading: 'Ready to start your next project?',
    button: 'Get started',
    bookingStatus: 'Available for projects',
    bookingTitle: 'Quick 15-minute call',
    bookingText: 'Pick a time that works for you.',
    bookingButton: 'Book a free call',
    profilePhoto: 'profile-photo.jpg',
  },

  footer: {
    tagline: 'Designing products people love to use.',
    newsletterPlaceholder: 'Enter your email',
    phone: '+1 (555) 123-4567',
    email: 'hello@haiderghauri.com',
    addressLine1: 'San Francisco, CA',
    addressLine2: 'United States',
    copyright: '© 2026 Haider Ghauri. All rights reserved.',
    designedBy: 'Haider Ghauri',
    poweredBy: 'Framer',
    poweredByUrl: 'https://www.framer.com',
    social: { facebook: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },

  nav: {
    links: [
      { label: 'Home', href: '#home' },
      { label: 'Projects', href: '#projects' },
      { label: 'Case Studies', href: '#case-studies' },
    ],
  },

  orbit: {
    leftIcons: ['figma', 'framer', 'notion', 'paintBoard', 'penTool', 'dashboard', 'idea', 'photoshop', 'aiWeb'],
    rightIcons: ['chatgpt', 'claude', 'css', 'tailwind', 'behance', 'dribbble', 'pinterest', 'smartphone', 'aiAudio'],
    durationMs: 55000,
  },
}

export const FONT_OPTIONS = ['Geist', 'Inter', 'system-ui']
