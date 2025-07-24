import { Aperture, Code, Gamepad2, GitBranch, ShieldCheck, Cpu } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

interface ServicePoint {
    title: string;
    icon: LucideIcon;
    description: string;
}

interface Service {
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    link: string;
    image: string;
    imageHint: string;
    isChart: boolean;
    points: ServicePoint[];
}

export const services: Service[] = [
  {
    slug: "e-governance",
    title: "e-Governance Solutions",
    description: "Digital platforms to streamline government operations, enhance public services, and increase transparency.",
    longDescription: "Our e-Governance solutions are designed to bridge the gap between governments and citizens. We build secure, scalable, and user-friendly digital platforms that transform public service delivery. From digital document management to online citizen portals, we empower governments to become more efficient, transparent, and responsive to the needs of their people.",
    link: "/services/e-governance",
    image: "/images/e_gov.jpeg",
    imageHint: "government building",
    isChart: true,
    points: [
        { title: "Digital Transformation", icon: GitBranch, description: "Modernize legacy systems and processes for enhanced efficiency and accessibility." },
        { title: "Citizen Engagement", icon: Code, description: "Improve communication and access to services through intuitive online platforms." },
        { title: "Operational Efficiency", icon: Aperture, description: "Automate workflows, reduce paperwork, and optimize resource allocation." },
        { title: "Data Security", icon: ShieldCheck, description: "Protect sensitive government and citizen data with robust security measures." }
    ],
  },
  {
    slug: "business-automation",
    title: "Business Automation with AI",
    description: "Leverage AI to automate complex business processes, improve efficiency, and drive innovation across your organization.",
    longDescription: "Unlock the potential of your business with our AI-powered automation solutions. We help you identify opportunities for automation, from routine administrative tasks to complex decision-making processes. Our solutions integrate seamlessly with your existing systems to reduce costs, minimize errors, and free up your team to focus on strategic initiatives.",
    link: "/services/business-automation",
    image: "https://placehold.co/800x600.png",
    imageHint: "artificial intelligence",
    isChart: true,
    points: [
        { title: "Workflow Automation", icon: GitBranch, description: "Streamline and automate repetitive tasks to boost productivity and reduce manual effort." },
        { title: "Actionable Insights", icon: Cpu, description: "Gain data-driven insights for better decision-making and strategic planning." },
        { title: "Cost Savings", icon: Aperture, description: "Reduce operational costs, improve resource allocation, and maximize your return on investment." },
        { title: "Reduced Errors", icon: ShieldCheck, description: "Minimize human error in critical processes to ensure accuracy and compliance." }
    ],
  },
  {
    slug: "custom-software",
    title: "Custom Software Development",
    description: "Tailored software solutions, including web and mobile apps, designed to meet your unique business requirements.",
    longDescription: "We build bespoke software solutions from the ground up, tailored to your specific needs. Our team works closely with you to understand your goals and challenges, delivering high-quality, scalable, and secure applications. Whether you need a complex enterprise system or a user-friendly mobile app, we have the expertise to bring your vision to life.",
    link: "/services/custom-software",
    image: "https://placehold.co/800x600.png",
    imageHint: "custom software",
    isChart: true,
    points: [
        { title: "Responsive Web Design", icon: Code, description: "Engaging and intuitive websites that provide a seamless experience on any device." },
        { title: "Native Mobile Apps", icon: Aperture, description: "High-performance, feature-rich mobile applications for both iOS and Android platforms." },
        { title: "Scalable Architecture", icon: GitBranch, description: "Flexible and robust solutions that are designed to grow with your business." },
        { title: "High Performance", icon: Cpu, description: "Fast, reliable, and efficient applications that deliver an exceptional user experience." }
    ],
  },
  {
    slug: "game-development",
    title: "Game Development",
    description: "Developing immersive and interactive games for mobile and web platforms that captivate and entertain.",
    longDescription: "We create engaging and memorable gaming experiences for players around the world. Our game development services cover everything from initial concept and design to development, testing, and launch. We specialize in creating games for mobile and web platforms, with a focus on compelling gameplay, stunning visuals, and robust monetization strategies.",
    link: "/services/game-development",
    image: "https://placehold.co/800x600.png",
    imageHint: "video game",
    isChart: true,
    points: [
        { title: "Cross-Platform Support", icon: Gamepad2, description: "Reach a wider audience with games that run seamlessly on both web and mobile devices." },
        { title: "Engaging Gameplay", icon: Aperture, description: "Create fun, addictive, and memorable game mechanics that keep players coming back." },
        { title: "Monetization Strategy", icon: GitBranch, description: "Maximize revenue with effective and player-friendly in-game monetization strategies." },
        { title: "Multiplayer Functionality", icon: Code, description: "Build real-time, interactive, and social experiences with robust multiplayer features." }
    ],
  }
];

export const chartData = {
    eGovernance: [
      { name: 'Projects', value: 120, fill: 'hsl(var(--chart-1))' },
      { name: 'Success Rate', value: 98, fill: 'hsl(var(--chart-2))'  },
      { name: 'Satisfaction', value: 95, fill: 'hsl(var(--chart-3))'  },
    ],
    aiAutomation: [
      { year: '2021', costSavings: 50, efficiencyGain: 20 },
      { year: '2022', costSavings: 75, efficiencyGain: 35 },
      { year: '2023', costSavings: 120, efficiencyGain: 50 },
      { year: '2024', costSavings: 200, efficiencyGain: 65 },
    ],
    customSoftware: [
      { month: 'Jan', web: 4, mobile: 2 },
      { month: 'Feb', web: 3, mobile: 3 },
      { month: 'Mar', web: 5, mobile: 4 },
      { month: 'Apr', web: 6, mobile: 4 },
      { month: 'May', web: 7, mobile: 5 },
      { month: 'Jun', web: 8, mobile: 6 },
    ],
    gameDev: [
      { name: 'Mobile', projects: 15, fill: 'hsl(var(--chart-1))' },
      { name: 'Web', projects: 8, fill: 'hsl(var(--chart-2))' },
      { name: 'PC', projects: 4, fill: 'hsl(var(--chart-3))' }
    ]
};
