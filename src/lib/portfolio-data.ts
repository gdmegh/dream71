
export const projects = {
  all: [
    {
      slug: "ecommerce-platform",
      title: "E-commerce Platform",
      description: "A scalable online marketplace for a major retail brand.",
      longDescription: "<p>We developed a comprehensive, feature-rich e-commerce platform designed to handle high traffic and a large volume of transactions. The platform includes a custom content management system, a secure payment gateway integration, and an advanced inventory management system. The user interface was designed to be intuitive and mobile-first, providing a seamless shopping experience across all devices.</p>",
      image: "https://placehold.co/600x400.png",
      dataAiHint: "ecommerce shopping",
      gallery: [
          { src: "https://placehold.co/1200x800.png", dataAiHint: "ecommerce product page" },
          { src: "https://placehold.co/1200x800.png", dataAiHint: "shopping cart" },
          { src: "https://placehold.co/1200x800.png", dataAiHint: "checkout process" }
      ],
      tags: ["React", "Node.js", "PostgreSQL", "AWS", "Stripe"],
      link: "#",
      category: "web",
      client: "Global Retail Inc.",
      timeline: "6 Months",
      testimonial: {
        text: "Dream71 transformed our online presence. Their expertise in e-commerce is unmatched, and the results speak for themselves. Our sales have increased dramatically since the new platform launch.",
        author: "Retail CEO",
        title: "CEO, Global Retail Inc."
      },
      problemStatement: "The client's legacy e-commerce system was outdated, slow, and unable to handle increasing traffic, leading to poor user experience and lost sales.",
      coreObjective: "To build a modern, scalable, and high-performance e-commerce platform that increases conversion rates and improves customer satisfaction.",
      solutionMethodology: "We opted for a headless architecture using React for the frontend and Node.js for the backend. This allowed for greater flexibility and performance. We conducted extensive user testing and iterative development sprints to ensure the final product met all business and user needs.",
      impact: {
        summary: "The new platform resulted in a 40% increase in conversion rates and a 25% decrease in page load times, significantly boosting revenue and customer engagement.",
        chartData: [
            { name: 'Before', 'Conversion Rate': 2.5, 'Page Load (s)': 4.2 },
            { name: 'After', 'Conversion Rate': 3.5, 'Page Load (s)': 2.1 },
        ]
      }
    },
    {
      slug: "fintech-mobile-app",
      title: "Fintech Mobile App",
      description: "A secure mobile banking application with biometric authentication.",
      longDescription: "<p>This mobile banking application provides users with a secure and convenient way to manage their finances on the go. We implemented multi-factor authentication, including biometric login (Face ID and Touch ID), to ensure the highest level of security. The app features real-time transaction history, peer-to-peer payments, and a personal finance management dashboard with spending analytics.</p>",
      image: "https://placehold.co/600x400.png",
      dataAiHint: "finance app",
      gallery: [
        { src: "https://placehold.co/1200x800.png", dataAiHint: "mobile banking dashboard" },
        { src: "https://placehold.co/1200x800.png", dataAiHint: "transaction list" },
        { src: "https://placehold.co/1200x800.png", dataAiHint: "payment screen" }
      ],
      tags: ["Flutter", "Firebase", "Biometrics", "Android", "iOS"],
      link: "#",
      category: "mobile",
      client: "SecureBank",
      timeline: "8 Months",
      testimonial: {
        text: "The security and user experience of our new mobile app, developed by Dream71, has been a game-changer for our customers. Highly professional and skilled team.",
        author: "CTO, SecureBank",
        title: "CTO, SecureBank"
      },
      problemStatement: "Customers needed a secure and user-friendly mobile app to perform banking transactions and manage their finances without visiting a physical branch.",
      coreObjective: "To develop a top-tier native mobile banking app for both iOS and Android with a strong focus on security, performance, and an intuitive user interface.",
      solutionMethodology: "We built the app natively for both iOS (Swift) and Android (Kotlin) to deliver the best possible performance. The backend was built on a microservices architecture to ensure scalability and resilience. Security was prioritized at every stage of development.",
      impact: {
        summary: "The app achieved a 4.8-star rating on both app stores within 3 months of launch and led to a 30% increase in mobile transaction volume.",
        chartData: [
          { name: 'Q1', 'User Adoption': 10000, 'Transaction Volume': 50000 },
          { name: 'Q2', 'User Adoption': 50000, 'Transaction Volume': 250000 },
          { name: 'Q3', 'User Adoption': 120000, 'Transaction Volume': 700000 },
        ]
      }
    },
    {
      slug: "healthcare-management-system",
      title: "Healthcare Management System",
      description: "An EHR system for hospitals to manage patient data efficiently.",
      longDescription: "<p>We created a comprehensive Electronic Health Record (EHR) system to help hospitals and clinics streamline their operations and improve patient care. The system includes modules for patient registration, appointment scheduling, clinical charting, e-prescribing, and billing. It is fully compliant with industry standards like HIPAA.</p>",
      image: "https://placehold.co/600x400.png",
      dataAiHint: "healthcare system",
      gallery: [
          { src: "https://placehold.co/1200x800.png", dataAiHint: "patient dashboard" },
          { src: "https://placehold.co/1200x800.png", dataAiHint: "appointment schedule" },
          { src: "https://placehold.co/1200x800.png", dataAiHint: "medical chart" }
      ],
      tags: ["Angular", ".NET Core", "Azure", "SQL Server"],
      link: "#",
      category: "web",
      client: "Healthe-Connect Hospitals",
      timeline: "12 Months",
       testimonial: {
        text: "This EHR system has revolutionized how we manage patient care. It's intuitive, efficient, and the support from Dream71 has been exceptional.",
        author: "Hospital Administrator",
        title: "Admin, Healthe-Connect"
      },
      problemStatement: "Hospitals were using disparate, paper-based systems, leading to inefficiencies, data silos, and an increased risk of medical errors.",
      coreObjective: "To create a centralized, secure, and HIPAA-compliant EHR system that improves clinical workflows, enhances data accessibility, and reduces administrative overhead.",
      solutionMethodology: "We developed a web-based application using Angular and .NET Core, hosted on Azure for scalability and security. The system was designed in close collaboration with medical professionals to ensure it met the complex needs of a hospital environment.",
      impact: {
        summary: "The system reduced patient record retrieval time by 75% and decreased administrative errors by 40%, allowing medical staff to focus more on patient care.",
        chartData: [
            { name: 'Paper-based', 'Retrieval Time (min)': 20, 'Admin Errors (%)': 8 },
            { name: 'EHR System', 'Retrieval Time (min)': 5, 'Admin Errors (%)': 1.5 },
        ]
      }
    },
    {
      slug: "ai-powered-chatbot",
      title: "AI-Powered Chatbot",
      description: "A customer service chatbot that understands natural language.",
      image: "https://placehold.co/600x400.png",
      dataAiHint: "robot chatbot",
      longDescription: "<p>We built an intelligent, conversational AI chatbot to automate customer support for a large telecommunications company. The chatbot can understand and respond to complex user queries in natural language, handling tasks such as billing inquiries, service changes, and technical troubleshooting.</p>",
      gallery: [
        { src: "https://placehold.co/1200x800.png", dataAiHint: "chatbot conversation" },
        { src: "https://placehold.co/1200x800.png", dataAiHint: "chatbot interface" },
        { src: "https://placehold.co/1200x800.png", dataAiHint: "customer support" }
      ],
      tags: ["Python", "TensorFlow", "NLP", "Dialogflow"],
      link: "#",
      category: "ai",
      client: "ConnectSphere Telecom",
      timeline: "5 Months",
      testimonial: {
        text: "The AI chatbot from Dream71 has significantly reduced our support costs while improving customer satisfaction. It's like having a 24/7 super-agent.",
        author: "Support Lead",
        title: "Head of Support, ConnectSphere"
      },
      problemStatement: "High volume of repetitive customer support queries overwhelmed human agents, leading to long wait times and high operational costs.",
      coreObjective: "To develop an AI-powered chatbot that can handle over 50% of customer inquiries automatically, providing instant support and reducing the load on human agents.",
      solutionMethodology: "Using Google's Dialogflow for NLU and a custom Python backend, we trained the chatbot on historical support data. The bot was integrated with the company's CRM and billing systems to perform real-time actions for users.",
      impact: {
        summary: "The chatbot successfully handled 60% of all incoming customer queries, leading to a 45% reduction in customer support operational costs.",
        chartData: [
            { name: 'Human Agents', 'Resolution Time (min)': 15, 'Cost per query ($)': 5 },
            { name: 'AI Chatbot', 'Resolution Time (min)': 1, 'Cost per query ($)': 0.5 },
        ]
      }
    },
  ],
  web() {
    return this.all.filter(project => project.category === 'web');
  },
  mobile() {
    return this.all.filter(project => project.category === 'mobile');
  },
  ai() {
    return this.all.filter(project => project.category === 'ai');
  }
};
