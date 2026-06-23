export const ABOUT_STATS = [
  { id: 'location', label: 'Based In', value: 'Peshawar, Pakistan' },
  { id: 'experience', label: 'Years of Experience', value: '5+', highlight: true },
  { id: 'projects', label: 'Projects Completed', value: '30+', highlight: true },
]

export const ABOUT_BIO = {
  greeting: "Hello! I'm Haider Ghauri,",
  title: 'Product Designer',
  paragraphs: [
    'A Product Designer, with a passion for designing impactful digital products and high-performing landing pages. With 5+ years of experience, I specialize in transforming ideas into seamless, user-friendly experiences that balance aesthetics with functionality.',
    'My approach to design is rooted in understanding user needs and business goals, then bridging the two with creative, problem-solving solutions. From shaping complete product experiences for startups to crafting conversion-driven landing pages for established brands, I focus on delivering designs that engage, inspire, and deliver measurable results.',
  ],
}

export const WORK_EXPERIENCE = [
  {
    id: 'productbox',
    company: 'Productbox',
    location: 'On-site',
    type: 'Full Time',
    period: 'July 2025 - Present',
    role: 'Principal Product Designer',
    description:
      'As Principal Product Designer at ProductBox, I lead end-to-end design strategy and execution across multiple product lines—partnering closely with clients to understand their goals, uncover user needs, and co-create impactful solutions. I drive the design vision, build scalable design systems, and collaborate with product, engineering, and business stakeholders to deliver high-quality experiences. Alongside designing, I mentor team members and foster a culture of creativity and excellence, ensuring our products not only meet client expectations but also deliver measurable value to users and the business.',
  },
  {
    id: 'ff-steel',
    company: 'FF STEEL',
    location: 'On-site',
    type: 'Full Time',
    period: 'March 2024 - June 2025',
    role: 'Sr Executive - UX/UI Designer',
    description:
      'In my role as a Sr. Executive UX/UI Designer at FF Steel, I led design initiatives to create intuitive and engaging user interfaces for various products. I collaborated with teams to ensure user-centered design principles were implemented, resulting in enhanced user experiences. Additionally, I developed skills in UX/UI design, prototyping, and user research, contributing to the success of design projects.',
  },
  {
    id: 'goaccelovate',
    company: 'GoAccelovate',
    location: 'Remote',
    type: 'Part Time',
    period: 'Feb 2025 - Sept 2025',
    role: 'UX/UI Designer',
    description:
      'Led UX/UI design for GoAccelovate’s flagship products, MyMentro (AI career guidance platform) and Sapphire (HR management system). Owned end-to-end design—from research and wireframing to high-fidelity UI. Collaborated with cross-functional teams to build intuitive, scalable interfaces and established cohesive design systems.',
  },
  {
    id: 'techkor',
    company: 'Techkor',
    location: 'On-site',
    type: 'Full Time',
    period: 'Dec 2021 - March 2024',
    role: 'Jr. UX/UI Designer',
    description:
      'As a Product Designer, I oversee end-to-end UX/UI design initiatives, ensuring seamless integration of user needs with business objectives. Collaborating closely with diverse teams, I lead the conceptualization and development of user-centric digital products.',
  },
  {
    id: 'freelance',
    company: 'Freelance',
    location: 'On-site',
    type: 'Full Time',
    period: '2021 - 2023',
    role: 'Wordpress Designer',
    description:
      'I designed user-centered interfaces and conducted usability testing to ensure optimal user experiences.',
  },
]

export const STACK_TOOLS = [
  { id: 'figma', name: 'Figma', category: 'General Design' },
  { id: 'framer', name: 'Framer', category: 'Portfolio/Web' },
  { id: 'notion', name: 'Notion', category: 'Documentation' },
  { id: 'jira', name: 'Jira', category: 'Project Tracking' },
  { id: 'protopie', name: 'ProtoPie', category: 'Interactions' },
  { id: 'chatgpt', name: 'ChatGPT', category: 'Ideas & Research' },
]

export const EDUCATION = {
  degree: 'Bachelor in Software Engineering',
  school: 'City University of Science and Information Technology',
  period: '2017 - 2021',
}

export function aboutPath() {
  return '/about'
}
