
export const projects = {
  all: [
    {
      slug: "ecommerce-platform",
      title: "E-commerce Platform",
      description: "A scalable online marketplace for a major retail brand.",
      longDescription: "<p>We developed a comprehensive, feature-rich e-commerce platform designed to handle high traffic and a large volume of transactions. The platform includes a custom content management system, a secure payment gateway integration, and an advanced inventory management system. The user interface was designed to be intuitive and mobile-first, providing a seamless shopping experience across all devices.</p><p>Key challenges included migrating over 1 million products from a legacy system and ensuring 99.99% uptime during peak shopping seasons. Our solution resulted in a 40% increase in conversion rates and a 25% decrease in page load times.</p>",
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
    },
    {
      slug: "fintech-mobile-app",
      title: "Fintech Mobile App",
      description: "A secure mobile banking application with biometric authentication.",
      longDescription: "<p>This mobile banking application provides users with a secure and convenient way to manage their finances on the go. We implemented multi-factor authentication, including biometric login (Face ID and Touch ID), to ensure the highest level of security. The app features real-time transaction history, peer-to-peer payments, and a personal finance management dashboard with spending analytics.</p><p>We built the app natively for both iOS and Android to deliver the best possible performance and user experience. The backend was built on a microservices architecture to ensure scalability and resilience.</p>",
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
    },
    {
      slug: "healthcare-management-system",
      title: "Healthcare Management System",
      description: "An EHR system for hospitals to manage patient data efficiently.",
      longDescription: "<p>We created a comprehensive Electronic Health Record (EHR) system to help hospitals and clinics streamline their operations and improve patient care. The system includes modules for patient registration, appointment scheduling, clinical charting, e-prescribing, and billing. It is fully compliant with industry standards like HIPAA.</p><p>The system is a web-based application built with a modern, responsive interface, making it accessible on desktops, tablets, and mobile devices. A key feature is its powerful reporting and analytics module, which helps hospital administrators make data-driven decisions.</p>",
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
    },
    {
      slug: "logistics-supply-chain-portal",
      title: "Logistics & Supply Chain Portal",
      description: "A real-time tracking and management portal for a global logistics company.",
      image: "https://placehold.co/600x400.png",
      dataAiHint: "logistics truck",
      longDescription: "<p>This portal provides a centralized platform for managing all aspects of the supply chain, from warehousing and inventory management to shipping and final delivery. Key features include real-time GPS tracking of shipments, automated route optimization, and a predictive analytics engine to forecast delivery times and potential delays.</p><p>The platform integrates with various third-party services, including mapping APIs and weather services, to provide a comprehensive view of the logistics network. The solution helped our client reduce shipping costs by 15% and improve on-time delivery rates by 20%.</p>",
      gallery: [
          { src: "https://placehold.co/1200x800.png", dataAiHint: "map tracking dashboard" },
          { src: "https://placehold.co/1200x800.png", dataAiHint: "inventory list" },
          { src: "https://placehold.co/1200x800.png", dataAiHint: "logistics analytics" }
      ],
      tags: ["Vue.js", "Python/Django", "AWS", "Maps API"],
      link: "#",
      category: "web",
    },
    {
        slug: "ai-powered-chatbot",
        title: "AI-Powered Chatbot",
        description: "A customer service chatbot that understands natural language.",
        image: "https://placehold.co/600x400.png",
        dataAiHint: "robot chatbot",
        longDescription: "<p>We built an intelligent, conversational AI chatbot to automate customer support for a large telecommunications company. The chatbot can understand and respond to complex user queries in natural language, handling tasks such as billing inquiries, service changes, and technical troubleshooting.</p><p>Using advanced Natural Language Processing (NLP) and machine learning models, the chatbot's accuracy improves over time as it learns from interactions. It was integrated with the company's website and mobile app, and successfully deflected over 60% of incoming support requests from human agents, leading to significant cost savings.</p>",
        gallery: [
          { src: "https://placehold.co/1200x800.png", dataAiHint: "chatbot conversation" },
          { src: "https://placehold.co/1200x800.png", dataAiHint: "chatbot interface" },
          { src: "https://placehold.co/1200x800.png", dataAiHint: "customer support" }
        ],
        tags: ["Python", "TensorFlow", "NLP", "Dialogflow"],
        link: "#",
        category: "ai",
    },
    {
        slug: "ride-sharing-app",
        title: "Ride-Sharing App",
        description: "A mobile application for booking and sharing rides.",
        image: "https://placehold.co/600x400.png",
        dataAiHint: "person using phone",
        longDescription: "<p>This ride-sharing application, similar to popular services, allows users to book rides, track drivers in real-time, and pay seamlessly through the app. We developed separate, feature-rich apps for both riders and drivers.</p><p>The system includes a sophisticated dispatch algorithm to match riders with the nearest available drivers efficiently. We also implemented a dynamic pricing model and a rating and review system to ensure service quality and trust. The app was built using React Native for cross-platform compatibility without compromising on performance.</p>",
        gallery: [
          { src: "https://placehold.co/1200x800.png", dataAiHint: "ride booking map" },
          { src: "https://placehold.co/1200x800.png", dataAiHint: "driver profile" },
          { src: "https://placehold.co/1200x800.png", dataAiHint: "payment options" }
        ],
        tags: ["React Native", "GraphQL", "Maps API", "Node.js"],
        link: "#",
        category: "mobile",
    }
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
