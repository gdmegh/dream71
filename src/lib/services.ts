import { Code, Smartphone, Palette, ShieldCheck, Rocket, BrainCircuit } from 'lucide-react';

export const services = [
    {
        slug: "web-development",
        icon: Code,
        title: "Web Development",
        description: "Building modern, responsive, and scalable web applications.",
        longDescription: "We craft beautiful and functional web experiences, from simple landing pages to complex enterprise applications. Our team uses the latest technologies to ensure your project is fast, secure, and ready to scale.",
        image: "https://placehold.co/800x600.png",
        imageHint: "web development code",
        imageUrl: "https://placehold.co/1920x1080.png",
        points: [
            { title: "Frontend", description: "Utilizing modern frameworks like React and Next.js to build dynamic and responsive user interfaces." },
            { title: "Backend", description: "Developing robust server-side applications with Node.js, Python, and other powerful technologies." },
            { title: "Databases", description: "Managing and modeling data with both SQL (PostgreSQL) and NoSQL (MongoDB) databases." },
            { title: "DevOps", description: "Streamlining deployment and scaling with Docker, Kubernetes, and CI/CD pipelines." },
        ]
    },
    {
        slug: "mobile-app-development",
        icon: Smartphone,
        title: "Mobile App Development",
        description: "Native and cross-platform mobile apps that deliver seamless user experiences on iOS and Android.",
        longDescription: "From concept to launch, we create compelling mobile applications that connect with users. Whether you need a native iOS or Android app or a cross-platform solution, we deliver performance, usability, and style.",
        image: "https://placehold.co/800x600.png",
        imageHint: "mobile app design",
        imageUrl: "https://placehold.co/1920x1081.png",
        points: [
            { title: "iOS Development", description: "Building high-performance, native applications for the Apple ecosystem using Swift and SwiftUI." },
            { title: "Android Development", description: "Creating versatile and reliable native Android apps using Kotlin and Java." },
            { title: "Cross-Platform", description: "Efficiently building for both platforms with frameworks like React Native and Flutter." },
            { title: "UI/UX for Mobile", description: "Designing intuitive and engaging interfaces optimized for mobile devices." },
        ]
    },
    {
        slug: "ui-ux-design",
        icon: Palette,
        title: "UI/UX Design",
        description: "Intuitive and beautiful user interfaces that are a joy to use, enhancing user engagement and satisfaction.",
        longDescription: "Our design process is centered around the user. We conduct in-depth research to understand your audience, creating wireframes, prototypes, and final designs that are not only visually stunning but also highly functional and intuitive.",
        image: "https://placehold.co/800x600.png",
        imageHint: "ui design tools",
        imageUrl: "https://placehold.co/1920x1082.png",
        points: [
            { title: "User Research", description: "Gathering insights through interviews, surveys, and analysis to inform design decisions." },
            { title: "Wireframing & Prototyping", description: "Creating interactive blueprints to define layout, structure, and user flow." },
            { title: "Visual Design", description: "Crafting a compelling visual identity with typography, color theory, and iconography." },
            { title: "Usability Testing", description: "Validating designs with real users to ensure an optimal user experience." },
        ]
    },
    {
        slug: "qa-testing",
        icon: ShieldCheck,
        title: "QA & Testing",
        description: "Rigorous quality assurance processes to ensure your software is reliable, secure, and bug-free.",
        longDescription: "Quality is at the core of our development process. Our dedicated QA team employs a combination of manual and automated testing strategies to ensure your application is secure, reliable, and performs flawlessly.",
        image: "https://placehold.co/800x600.png",
        imageHint: "testing checklist",
        imageUrl: "https://placehold.co/1920x1083.png",
        points: [
            { title: "Manual Testing", description: "Executing detailed test cases to identify bugs and usability issues from a user's perspective." },
            { title: "Automated Testing", description: "Developing scripts to automate repetitive tests, ensuring consistency and efficiency." },
            { title: "Performance Testing", description: "Analyzing application speed, scalability, and stability under various load conditions." },
            { title: "Security Testing", description: "Identifying and mitigating vulnerabilities to protect your application and user data." },
        ]
    },
    {
        slug: "devops",
        icon: Rocket,
        title: "DevOps",
        description: "Streamlining development and operations to deliver high-quality software faster and more reliably.",
        longDescription: "We implement DevOps best practices to bridge the gap between development and operations. Our goal is to automate your infrastructure, streamline workflows, and foster a culture of collaboration to accelerate your release cycles.",
        image: "https://placehold.co/800x600.png",
        imageHint: "devops pipeline",
        imageUrl: "https://placehold.co/1920x1084.png",
        points: [
            { title: "CI/CD", description: "Implementing Continuous Integration and Continuous Delivery pipelines for faster, reliable releases." },
            { title: "Infrastructure as Code", description: "Managing and provisioning infrastructure through code for consistency and scalability." },
            { title: "Monitoring & Logging", description: "Setting up robust monitoring and logging to ensure system health and quick troubleshooting." },
            { title: "Cloud Services", description: "Leveraging AWS, Google Cloud, and Azure to build scalable and resilient infrastructure." },
        ]
    },
    {
        slug: "ai-ml-solutions",
        icon: BrainCircuit,
        title: "AI & ML Solutions",
        description: "Integrating artificial intelligence and machine learning to build intelligent, data-driven applications.",
        longDescription: "Unlock the power of your data with our AI and Machine Learning solutions. We help you build intelligent systems that can automate processes, predict outcomes, and provide valuable insights to drive your business forward.",
        image: "https://placehold.co/800x600.png",
        imageHint: "neural network",
        imageUrl: "https://placehold.co/1920x1085.png",
        points: [
            { title: "Data Analysis", description: "Processing and analyzing large datasets to uncover patterns and trends." },
            { title: "Predictive Modeling", description: "Building models that forecast future events and behaviors with high accuracy." },
            { title: "Natural Language Processing", description: "Enabling applications to understand and process human language." },
            { title: "Computer Vision", description: "Developing systems that can 'see' and interpret visual information from images and videos." },
        ]
    }
];
