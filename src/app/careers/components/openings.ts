export interface JobOpening {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  salary?: string;
  experience: string;
  linkedinUrl?: string;
  indeedUrl?: string;
  applyEmail: string;
}

export const openings: JobOpening[] = [
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    type: "Full-Time",
    location: "Remote",
    department: "Engineering",
    description:
      "We're looking for a talented Frontend Engineer to join our engineering team. You'll work on building beautiful, performant user interfaces for our quantitative investment platform using React, Next.js, and TypeScript.",
    responsibilities: [
      "Build and maintain responsive, accessible user interfaces",
      "Collaborate with designers and backend engineers to implement features",
      "Optimize application performance and user experience",
      "Write clean, maintainable, and well-tested code",
      "Participate in code reviews and technical discussions",
      "Contribute to architectural decisions and best practices",
    ],
    requirements: [
      "3+ years of experience with React and TypeScript",
      "Strong proficiency in Next.js and modern frontend tooling",
      "Experience with state management (Redux, Zustand, or similar)",
      "Familiarity with Tailwind CSS and component libraries",
      "Understanding of RESTful APIs and GraphQL",
      "Experience with testing frameworks (Jest, React Testing Library)",
      "Strong problem-solving and debugging skills",
    ],
    niceToHave: [
      "Experience with financial or fintech applications",
      "Knowledge of WebSocket connections and real-time data",
      "Familiarity with data visualization libraries (Chart.js, D3.js)",
      "Experience with animation libraries (Framer Motion)",
      "Understanding of accessibility standards (WCAG)",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Remote-first work environment",
      "Health, dental, and vision insurance",
      "Flexible PTO and paid holidays",
      "Professional development budget",
      "Top-tier equipment and home office setup",
    ],
    salary: "$90,000 - $130,000",
    experience: "Mid-Level",
    linkedinUrl: "https://www.linkedin.com/jobs/view/1234567890",
    indeedUrl: "https://www.indeed.com/viewjob?jk=abc123def456",
    applyEmail: "careers@evermount.co",
  },
  {
    id: "quantitative-analyst",
    title: "Quantitative Analyst",
    type: "Full-Time",
    location: "Nairobi, Kenya",
    department: "Research",
    description:
      "Join our quantitative research team to develop and implement systematic trading strategies. You'll work with large datasets, build predictive models, and contribute to our proprietary trading algorithms.",
    responsibilities: [
      "Research and develop quantitative trading strategies",
      "Analyze market data and identify alpha opportunities",
      "Build and backtest statistical models",
      "Collaborate with engineering team to implement strategies",
      "Monitor strategy performance and risk metrics",
      "Contribute to research publications and documentation",
    ],
    requirements: [
      "Master's degree or PhD in Quantitative Finance, Mathematics, Statistics, or related field",
      "2+ years of experience in quantitative research or trading",
      "Strong programming skills in Python or R",
      "Experience with statistical modeling and machine learning",
      "Knowledge of financial markets and instruments",
      "Familiarity with backtesting frameworks",
      "Strong analytical and problem-solving skills",
    ],
    niceToHave: [
      "Experience with alternative data sources",
      "Knowledge of high-frequency trading",
      "Publications in quantitative finance",
      "CFA or FRM certification",
      "Experience with cloud computing platforms",
    ],
    benefits: [
      "Competitive salary and performance bonuses",
      "Hybrid work model (office + remote)",
      "Health insurance and wellness programs",
      "Research conference attendance",
      "Access to premium data sources and tools",
      "Collaborative research environment",
    ],
    salary: "$80,000 - $120,000",
    experience: "Mid to Senior",
    linkedinUrl: "https://www.linkedin.com/jobs/view/1234567891",
    indeedUrl: "https://www.indeed.com/viewjob?jk=abc123def457",
    applyEmail: "careers@evermount.co",
  },
  {
    id: "product-designer",
    title: "Product Designer",
    type: "Contract",
    location: "Hybrid - London",
    department: "Design",
    description:
      "We're seeking a creative Product Designer to shape the user experience of our investment platform. You'll work closely with product managers and engineers to design intuitive, data-rich interfaces for sophisticated financial tools.",
    responsibilities: [
      "Design user interfaces for complex financial dashboards",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and usability testing",
      "Collaborate with cross-functional teams",
      "Maintain and evolve design system",
      "Ensure designs are accessible and responsive",
    ],
    requirements: [
      "4+ years of product design experience",
      "Strong portfolio showcasing complex data visualization",
      "Proficiency in Figma, Sketch, or similar design tools",
      "Experience designing for financial or B2B SaaS products",
      "Understanding of user research methodologies",
      "Strong communication and presentation skills",
    ],
    niceToHave: [
      "Experience with design systems",
      "Knowledge of frontend development (HTML/CSS)",
      "Experience with animation and micro-interactions",
      "Understanding of quantitative finance concepts",
    ],
    benefits: [
      "Competitive contract rate",
      "Flexible working hours",
      "Remote work options",
      "Creative freedom and ownership",
      "Collaborative team environment",
    ],
    salary: "$70 - $100/hour",
    experience: "Senior",
    linkedinUrl: "https://www.linkedin.com/jobs/view/1234567892",
    indeedUrl: "https://www.indeed.com/viewjob?jk=abc123def458",
    applyEmail: "careers@evermount.co",
  },
  {
    id: "marketing-strategist",
    title: "Marketing Strategist",
    type: "Part-Time",
    location: "Remote",
    department: "Marketing",
    description:
      "Join our marketing team to develop and execute growth strategies for our quantitative investment platform. You'll work on content marketing, digital campaigns, and brand positioning in the fintech space.",
    responsibilities: [
      "Develop and execute marketing strategies",
      "Create content for blog, social media, and email campaigns",
      "Manage digital marketing channels (SEO, SEM, social media)",
      "Analyze marketing metrics and optimize campaigns",
      "Collaborate with sales team on lead generation",
      "Attend industry events and build partnerships",
    ],
    requirements: [
      "3+ years of marketing experience, preferably in fintech",
      "Strong writing and content creation skills",
      "Experience with marketing analytics tools",
      "Knowledge of SEO and digital marketing best practices",
      "Familiarity with CRM and marketing automation platforms",
      "Strong analytical and creative thinking",
    ],
    niceToHave: [
      "Experience with financial services marketing",
      "Knowledge of quantitative finance concepts",
      "Experience with video production",
      "Graphic design skills",
    ],
    benefits: [
      "Competitive hourly rate",
      "Flexible schedule",
      "Remote work",
      "Creative autonomy",
      "Growth opportunities",
    ],
    salary: "$40 - $60/hour",
    experience: "Mid-Level",
    linkedinUrl: "https://www.linkedin.com/jobs/view/1234567893",
    indeedUrl: "https://www.indeed.com/viewjob?jk=abc123def459",
    applyEmail: "careers@evermount.co",
  },
];
