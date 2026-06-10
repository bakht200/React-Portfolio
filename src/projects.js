import projectOne from './assets/project-1.jpg'
import projectTwo from './assets/project-2.jpg'
import bentoOne from './assets/bento-1.jpg'
import bentoTwo from './assets/bento-2.jpg'
import bentoThree from './assets/bento-3.jpg'

export const PROJECTS = [
  {
    id: 'creative-studio',
    title: 'Creative Studio',
    categoryId: 'ai-products',
    tool: 'Figma',
    year: '2026',
    yearDisplay: '/2026',
    image: projectOne,
    content: [
      'Creative Studio is a brand identity project built for a boutique design agency launching a fresh visual presence. The goal was to create a system that feels bold yet approachable across web, social, and print.',
      'I led discovery workshops, defined the visual language, and delivered a scalable design system with typography, color, and component guidelines.',
    ],
  },
  {
    id: 'ecommerce-product',
    title: 'E-commerce Product',
    categoryId: 'ecommerce',
    tool: 'Framer',
    year: '2026',
    yearDisplay: '/2026',
    image: projectTwo,
    content: [
      'This e-commerce product experience focuses on reducing friction from browse to checkout. I redesigned the product detail flow, cart interactions, and mobile navigation.',
      'The work included user flow mapping, high-fidelity UI, and interactive prototypes used for stakeholder review.',
    ],
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    categoryId: 'hrms',
    tool: 'Adobe XD',
    year: '2026',
    yearDisplay: '/2026',
    image: bentoThree,
    content: [
      'Brand Identity is a comprehensive redesign for an enterprise team managing multiple product lines under one coherent visual system.',
      'I created a modular UI kit, refined information hierarchy across dashboards, and documented patterns for engineering handoff.',
    ],
  },
  {
    id: 'count-meds',
    title: 'Count Meds',
    categoryId: 'healthcare',
    tool: 'Figma',
    year: '2025',
    yearDisplay: '/2025',
    image: bentoOne,
    content: [
      'Count Meds is a healthcare dashboard for tracking medication inventory and compliance workflows across clinical teams.',
      'The interface prioritizes scan-friendly tables, alert states, and role-based views for administrators and floor staff.',
    ],
  },
  {
    id: 'mymentro-ai',
    title: 'MyMentro.ai',
    categoryId: 'ai-products',
    tool: 'Framer',
    year: '2025',
    yearDisplay: '/2025',
    image: bentoTwo,
    content: [
      'MyMentro.ai is an AI coaching platform that turns unstructured notes into actionable growth plans for professionals.',
      'I designed conversational flows, insight cards, and a content editor that keeps AI suggestions transparent and editable.',
    ],
  },
  {
    id: 'inventra',
    title: 'Inventra – Inventory Management System',
    categoryId: 'inventory',
    tool: 'Figma',
    year: '2025',
    yearDisplay: '/2025',
    image: projectOne,
    content: [
      'Inventra streamlines warehouse operations with real-time stock levels, transfer requests, and supplier management.',
      'The design system supports dense data tables on desktop while remaining usable on tablet devices used on the warehouse floor.',
    ],
  },
  {
    id: 'payment-flow',
    title: 'Payment Flow',
    categoryId: 'fintech',
    tool: 'Figma',
    year: '2024',
    yearDisplay: '/2024',
    image: projectTwo,
    content: [
      'Payment Flow is a fintech onboarding experience for a digital wallet launching in multiple markets.',
      'I simplified KYC steps, clarified fee disclosures, and designed error recovery patterns that reduce drop-off.',
    ],
  },
  {
    id: 'shopfront-redesign',
    title: 'Shopfront Redesign',
    categoryId: 'ecommerce',
    tool: 'Adobe XD',
    year: '2024',
    yearDisplay: '/2024',
    image: bentoThree,
    content: [
      'Shopfront Redesign modernizes a multi-vendor marketplace with improved discovery, seller profiles, and checkout.',
      'The project included a full responsive grid system and promotional modules for seasonal campaigns.',
    ],
  },
  {
    id: 'workforce-hub',
    title: 'Workforce Hub',
    categoryId: 'hrms',
    tool: 'Figma',
    year: '2024',
    yearDisplay: '/2024',
    image: bentoOne,
    content: [
      'Workforce Hub unifies leave management, payroll summaries, and employee self-service in one HRMS portal.',
      'I focused on clear status tracking, manager approvals, and accessible forms for distributed teams.',
    ],
  },
]

export function getProjectById(id) {
  return PROJECTS.find((project) => project.id === id)
}

export function projectPath(id) {
  return `/projects/${id}`
}
