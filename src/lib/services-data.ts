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
        { title: "Digital Transformation", icon: GitBranch, description: "Modernize legacy systems and processes." },
        { title: "Citizen Engagement", icon: Code, description: "Improve communication and access to services." },
        { title: "Operational Efficiency", icon: Aperture, description: "Automate workflows and reduce paperwork." },
        { title: "Data Security", icon: ShieldCheck, description: "Protect sensitive government and citizen data." }
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
        { title: "Workflow Automation", icon: GitBranch, description: "Streamline and automate repetitive tasks." },
        { title: "Actionable Insights", icon: Cpu, description: "Gain data-driven insights for better decisions." },
        { title: "Cost Savings", icon: Aperture, description: "Reduce operational costs and improve ROI." },
        { title: "Reduced Errors", icon: ShieldCheck, description: "Minimize human error in critical processes." }
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
        { title: "Responsive Web Design", icon: Code, description: "Engaging websites that work on any device." },
        { title: "Native Mobile Apps", icon: Aperture, description: "High-performance apps for iOS and Android." },
        { title: "Scalable Architecture", icon: GitBranch, description: "Solutions that grow with your business." },
        { title: "High Performance", icon: Cpu, description: "Fast, reliable, and efficient applications." }
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
        { title: "Cross-Platform Support", icon: Gamepad2, description: "Reach a wider audience on web and mobile." },
        { title: "Engaging Gameplay", icon: Aperture, description: "Create fun and addictive game mechanics." },
        { title: "Monetization Strategy", icon: GitBranch, description: "Maximize revenue with effective strategies." },
        { title: "Multiplayer Functionality", icon: Code, description: "Build real-time, interactive experiences." }
    ],
  }
];

export const chartData = {
    eGovernance: [
      { year: '2021', projects: 12, satisfaction: 92 },
      { year: '2022', projects: 18, satisfaction: 95 },
      { year: '2023', projects: 25, satisfaction: 97 },
      { year: '2024', projects: 32, satisfaction: 98 },
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

export const chartConfig = {
  projects: { label: 'Projects Completed', color: 'hsl(var(--chart-2))' },
  satisfaction: { label: 'Satisfaction Rate (%)', color: 'hsl(var(--chart-1))' },
  costSavings: { label: 'Cost Savings ($k)', color: 'hsl(var(--chart-1))' },
  efficiencyGain: { label: 'Efficiency Gain (%)', color: 'hsl(var(--chart-2))' },
  web: { label: 'Web Projects', color: 'hsl(var(--chart-1))' },
  mobile: { label: 'Mobile Projects', color: 'hsl(var(--chart-2))' },
  pc: { label: 'PC Projects', color: 'hsl(var(--chart-3))' }
};
