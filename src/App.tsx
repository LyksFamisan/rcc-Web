import { useState, useEffect, useRef } from 'react'

const assetUrl = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`
const robotRabbit = assetUrl('public_rabbit.png')
const logoImg = assetUrl('Content-Creator-Project.png')
const heroVideo = assetUrl('hero-video.mp4')

/* ─── RCC ROYAL BLUE THEME ─────────────────────────────── */
const C = {
  orange:      '#f97316',
  orangeDeep:  '#ea580c',
  orangeLight: '#fdba74',
  royal:       '#15317d',
  royalDark:   '#102766',
  royalDeep:   '#15317d',
  bgDark:      '#15317d',
  bgDeep:      '#15317d',
}

/* ─── RCC.Ai KNOWLEDGE BASE ─────────────────────────────── */
const AI_RESPONSES: { keywords: string[]; answer: string }[] = [
  { keywords: ['hello','hi','hey','musta','kumusta','good morning','good afternoon'],
    answer: "Hello! I'm **RCC.Ai** 👋 Your AI assistant for RCC Colab Solutions. Ask me about our services, location, pricing, or how to get started!" },
  { keywords: ['services','offer','what do you do','solutions','provide'],
    answer: "RCC Colab Solutions offers:\n\n• Application Modernization\n• Custom Software Development\n• Staff Augmentation\n• IT Consulting & Solution Architecture\n• Robotic Process Automation (RPA)\n• Cloud Solutions & Migration\n• System Integration\n• Managed IT Services\n• QA & Software Testing\n• POS & Kiosk Software Systems\n• Data Analytics & Business Intelligence\n\nWould you like details on any specific service?" },
  { keywords: ['location','address','where','office','makati','find'],
    answer: "Our office is at:\n\n📍 **7/F Ascott Makati Glorietta 4**\nAyala Center San Lorenzo\nMakati City, Philippines\n\nBusiness Hours: Mon–Fri, 8:00 AM – 7:00 PM" },
  { keywords: ['contact','phone','email','reach','call'],
    answer: "You can reach us:\n\n📞 **+632 8651 6572**\n📧 **info@rcccolabsolutions.com**\n🌐 **rcccolabsolutions.com**\n\nOr use the contact form — we reply within 24 hours." },
  { keywords: ['cloud','aws','azure','google cloud','migration'],
    answer: "Our **Cloud Solutions & Migration** covers:\n\n• Cloud strategy and readiness assessment\n• Migration to AWS, Azure, or Google Cloud\n• Cost optimization and right-sizing\n• Ongoing cloud management\n\nContact us for a free consultation!" },
  { keywords: ['rpa','automation','robot','automate'],
    answer: "Our **RPA** service helps you:\n\n• Automate repetitive, rule-based tasks\n• Reduce human error and costs\n• Free your team for higher-value work\n• Integrate bots with existing systems" },
  { keywords: ['software','development','app','custom','build'],
    answer: "We build **Custom Software** including:\n\n• Web applications (React, Angular, Vue)\n• Mobile apps (iOS & Android)\n• Enterprise systems and portals\n• API design and microservices\n\nEvery solution is tailored to your needs." },
  { keywords: ['price','cost','quote','how much','pricing'],
    answer: "Pricing is customized based on project scope. We offer:\n\n• **Project-based** – fixed scope & cost\n• **Time & Material** – flexible & iterative\n• **Staff Augmentation** – dedicated resources\n\nContact us for a free quote!" },
  { keywords: ['about','company','who','rcc','colab','history'],
    answer: "**RCC Colab Solutions Inc.** offers end-to-end personalized business solutions, helping businesses unlock their full potential through emerging and cutting-edge technology.\n\nWe collaborate with your team to identify the best IT services that create significant value for your organization." },
  { keywords: ['ceo','founder','leader','leadership'],
    answer: "RCC Colab Solutions is led by a team committed to helping businesses simplify complexity through practical, innovative technology solutions. Ask us how we can help your organization grow." },
  { keywords: ['hours','open','schedule','time','available'],
    answer: "We're open:\n\n🕗 **Monday to Friday**\n⏰ **8:00 AM – 7:00 PM**\n\nFor after-hours inquiries, email info@rcccolabsolutions.com" },
  { keywords: ['cybersecurity','security','cyber','hack','protect'],
    answer: "Our **Cybersecurity** solutions include:\n\n• Security audits & vulnerability assessments\n• Threat monitoring & incident response\n• Compliance (ISO 27001, GDPR)\n• Data backup & disaster recovery" },
  { keywords: ['start','get started','begin','project','partner'],
    answer: "Getting started is easy:\n\n1. **Reach out** via our contact form or call +632 8651 6572\n2. **Discovery call** – we learn your goals\n3. **Proposal** – tailored solution & timeline\n4. **Kickoff** – we start collaborating!\n\nReady? Use the contact form below!" },
]

function getAiReply(input: string): string {
  const lower = input.toLowerCase()
  for (const item of AI_RESPONSES) {
    if (item.keywords.some(k => lower.includes(k))) return item.answer
  }
  return "Thanks for your message! For detailed assistance, reach us at **info@rcccolabsolutions.com** or **+632 8651 6572**. You can also use the contact form on this page and we'll respond within 24 hours."
}

/* ─── SERVICES WITH IMAGES + DETAIL CONTENT ─────────────── */
type Expertise = { icon: string; title: string; body: string }
type Solution  = {
  img: string; title: string; desc: string
  intro: string
  whyTitle: string
  whyPoints: { bold: string; text: string }[]
  expertise: Expertise[]
}

function getExpertiseImage(title: string): string {
  const images: Record<string, string> = {
    Refactoring: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=220&fit=crop&auto=format',
    Replatforming: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&h=220&fit=crop&auto=format',
    Replacing: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=220&fit=crop&auto=format',
    'Web Development': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=220&fit=crop&auto=format',
    'Mobile Development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=220&fit=crop&auto=format',
    'API & Integrations': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=220&fit=crop&auto=format',
    'Dedicated Teams': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=220&fit=crop&auto=format',
    'Project-Based': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=220&fit=crop&auto=format',
    'On-Demand': 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=220&fit=crop&auto=format',
    'Architecture Design': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=220&fit=crop&auto=format',
    'Technology Roadmap': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=220&fit=crop&auto=format',
    'Digital Transformation': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=220&fit=crop&auto=format',
    'Process Discovery': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=220&fit=crop&auto=format',
    'Bot Development': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=220&fit=crop&auto=format',
    'Support & Optimization': 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500&h=220&fit=crop&auto=format',
  }
  return images[title] || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=220&fit=crop&auto=format'
}

const SOLUTIONS: Solution[] = [
  {
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=180&fit=crop&auto=format',
    title: 'Application Modernization',
    desc: 'Migrate legacy systems into scalable, cloud-native architectures that accelerate delivery and reduce technical debt.',
    intro: 'Moving legacy applications onto a modern infrastructure empowers businesses to reduce IT spending and convert savings into a competitive advantage. Our team will use the following strategy to modernize the application depending on each client\'s current and future business needs.',
    whyTitle: 'Why Modernize Your Applications?',
    whyPoints: [
      { bold: 'Reduced Costs:', text: 'Modernized applications typically reduce operational costs by 30–50% through efficient resource utilization and lower maintenance requirements.' },
      { bold: 'Enhanced Security:', text: 'Legacy systems often lack critical security features, making them vulnerable to modern threats and compliance issues.' },
      { bold: 'Improved Performance:', text: 'Modern applications deliver better performance, supporting growing workloads and user expectations.' },
    ],
    expertise: [
      { icon: '☁️', title: 'Refactoring', body: 'With this strategy, businesses can reduce code complexity and increase speed and efficiency. It helps developers save time and improve flexibility without changing the system\'s external behavior.' },
      { icon: '</>', title: 'Replatforming', body: 'This approach does not require major changes in code or architecture. However, it involves complementary updates that allow the legacy system to leverage cloud capabilities.' },
      { icon: '🔧', title: 'Replacing', body: 'If no modernization approach suits your business goals, replacement is a viable solution. This method can be faster than rebuilding and free your team from outdated constraints.' },
    ],
  },
  {
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=180&fit=crop&auto=format',
    title: 'Custom Software Development',
    desc: 'Bespoke web, mobile, and enterprise software designed around your exact workflows and business goals.',
    intro: 'Every business is unique, and off-the-shelf software rarely fits perfectly. We design and build custom solutions from the ground up — tailored to your processes, your users, and your growth trajectory.',
    whyTitle: 'Why Choose Custom Software?',
    whyPoints: [
      { bold: 'Perfect Fit:', text: 'Software built around your exact workflows eliminates workarounds and boosts team productivity from day one.' },
      { bold: 'Scalability:', text: 'Custom solutions grow with your business — no licensing bottlenecks, no feature gaps, no vendor lock-in.' },
      { bold: 'Competitive Edge:', text: 'Proprietary software becomes a strategic asset that competitors simply cannot replicate.' },
    ],
    expertise: [
      { icon: '🌐', title: 'Web Development', body: 'From dynamic web apps to enterprise portals, we build responsive, high-performance web solutions using React, Angular, Vue, and modern backend frameworks.' },
      { icon: '📱', title: 'Mobile Development', body: 'Native iOS and Android apps, plus cross-platform solutions with React Native and Flutter — built for performance and delightful user experiences.' },
      { icon: '🔗', title: 'API & Integrations', body: 'We design robust RESTful and GraphQL APIs and integrate third-party services to unify your technology ecosystem.' },
    ],
  },
  {
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=180&fit=crop&auto=format',
    title: 'Staff Augmentation',
    desc: 'Extend your team with vetted senior engineers, QA specialists, and solution architects on demand.',
    intro: 'Scale your technology team quickly and cost-effectively with pre-vetted professionals who integrate seamlessly into your workflows. Our staff augmentation model gives you the talent you need, exactly when you need it.',
    whyTitle: 'Why Staff Augmentation?',
    whyPoints: [
      { bold: 'Speed to Hire:', text: 'Bypass lengthy recruitment cycles. Our pre-vetted talent pool means you can onboard skilled professionals within days.' },
      { bold: 'Cost Efficiency:', text: 'Avoid full-time overhead costs while still accessing senior-level expertise on a flexible engagement basis.' },
      { bold: 'Seamless Integration:', text: 'Our professionals work within your tools, culture, and processes as natural extensions of your existing team.' },
    ],
    expertise: [
      { icon: '👥', title: 'Dedicated Teams', body: 'Full cross-functional teams — developers, QA, designers, and project managers — dedicated exclusively to your project for as long as you need.' },
      { icon: '📋', title: 'Project-Based', body: 'Bring in specialized experts for a defined scope and timeline. Ideal for product launches, migrations, and critical feature releases.' },
      { icon: '⚡', title: 'On-Demand', body: 'Flexible resource allocation that scales up or down based on your current sprint demands and business priorities.' },
    ],
  },
  {
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=180&fit=crop&auto=format',
    title: 'IT Consulting & Solution Architecture',
    desc: 'Strategic advisory that aligns your technology roadmap with your long-term business objectives.',
    intro: 'Our IT consultants bring deep domain expertise across industries to help you make informed technology decisions. From architectural blueprints to digital transformation strategies, we guide you from vision to execution.',
    whyTitle: 'Why Invest in IT Consulting?',
    whyPoints: [
      { bold: 'Strategic Alignment:', text: 'Ensure every technology investment supports your core business goals and delivers measurable ROI.' },
      { bold: 'Risk Reduction:', text: 'Identify potential pitfalls before they become costly problems through expert assessment and planning.' },
      { bold: 'Future-Proofing:', text: 'Build scalable, flexible architectures that evolve alongside your business and emerging technologies.' },
    ],
    expertise: [
      { icon: '🏗️', title: 'Architecture Design', body: 'We design robust, scalable system architectures — microservices, event-driven, serverless — tailored to your performance and reliability requirements.' },
      { icon: '🗺️', title: 'Technology Roadmap', body: 'A clear, prioritized plan that bridges the gap between your current state and your desired technology future, with milestones and resource planning.' },
      { icon: '🔄', title: 'Digital Transformation', body: 'End-to-end guidance for transforming legacy processes and systems into modern, agile digital operations that compete in today\'s market.' },
    ],
  },
  {
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=180&fit=crop&auto=format',
    title: 'Robotic Process Automation (RPA)',
    desc: 'Automate repetitive tasks to free your team for higher-value work and cut operational costs.',
    intro: 'RPA uses software robots to replicate human interactions with digital systems — completing repetitive, rule-based tasks faster, more accurately, and around the clock. We help you identify, design, deploy, and manage automation at scale.',
    whyTitle: 'Why Implement RPA?',
    whyPoints: [
      { bold: 'Dramatic Efficiency Gains:', text: 'Software bots complete tasks up to 10× faster than manual processing, dramatically increasing throughput without adding headcount.' },
      { bold: 'Near-Zero Error Rate:', text: 'Eliminate human error in data entry, processing, and reporting — ensuring consistent, accurate outputs every time.' },
      { bold: 'Rapid ROI:', text: 'Most RPA implementations achieve full return on investment within 6–12 months through labor savings and error reduction.' },
    ],
    expertise: [
      { icon: '🔍', title: 'Process Discovery', body: 'We analyze your operations to identify the highest-value automation candidates using process mining and task analysis techniques.' },
      { icon: '🤖', title: 'Bot Development', body: 'Our engineers build, test, and deploy attended and unattended bots using leading RPA platforms including UiPath, Automation Anywhere, and Power Automate.' },
      { icon: '🛡️', title: 'Support & Optimization', body: 'Ongoing bot monitoring, maintenance, and continuous improvement to ensure your automations stay reliable and efficient as your processes evolve.' },
    ],
  },
  {
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=180&fit=crop&auto=format',
    title: 'Cloud Solutions & Migration',
    desc: 'Seamless cloud strategy, migration, and optimization across AWS, Azure, and Google Cloud.',
    intro: 'The cloud unlocks agility, resilience, and cost savings that on-premise infrastructure simply cannot match. We guide your organization through every phase — from assessing readiness to migrating workloads to optimizing cloud spend.',
    whyTitle: 'Why Move to the Cloud?',
    whyPoints: [
      { bold: 'Elastic Scalability:', text: 'Scale resources up or down in minutes to match demand — pay only for what you use, when you use it.' },
      { bold: 'Business Continuity:', text: 'Built-in redundancy, automated backups, and global availability zones protect your operations from unexpected disruptions.' },
      { bold: 'Innovation Velocity:', text: 'Access cutting-edge services — AI/ML, serverless, containers — that accelerate development and time to market.' },
    ],
    expertise: [
      { icon: '☁️', title: 'Cloud Strategy', body: 'A tailored cloud adoption plan — choosing the right platforms (AWS, Azure, GCP), deployment models (public, private, hybrid), and migration priorities for your business.' },
      { icon: '🚀', title: 'Migration & Deployment', body: 'Lift-and-shift, re-platforming, or full re-architecture migrations executed with minimal downtime and maximum security.' },
      { icon: '⚙️', title: 'Cloud Management', body: 'Ongoing FinOps, performance monitoring, security posture management, and optimization to keep your cloud environment lean and resilient.' },
    ],
  },
  {
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=180&fit=crop&auto=format',
    title: 'System Integration',
    desc: 'Connect your applications, APIs, and data sources into a unified ecosystem that eliminates silos.',
    intro: 'Disconnected systems create inefficiencies, data inconsistencies, and missed opportunities. Our system integration services create seamless data flows between your applications, enabling real-time visibility and operational harmony across your entire technology landscape.',
    whyTitle: 'Why System Integration?',
    whyPoints: [
      { bold: 'Eliminate Data Silos:', text: 'Break down information barriers so every team works from a single, consistent source of truth.' },
      { bold: 'Real-Time Visibility:', text: 'Integrated systems surface live data across your operations, enabling faster, more informed decisions.' },
      { bold: 'Process Automation:', text: 'Connected systems trigger automated workflows — reducing manual handoffs and accelerating end-to-end processes.' },
    ],
    expertise: [
      { icon: '🔗', title: 'API Integration', body: 'Design and implement RESTful, SOAP, and GraphQL API integrations that connect your internal platforms with third-party services and partner systems.' },
      { icon: '📊', title: 'Data Integration', body: 'ETL/ELT pipelines, data warehousing, and real-time data streaming solutions that ensure consistent, reliable data flow across your enterprise.' },
      { icon: '🏢', title: 'Enterprise Integration', body: 'ESB and iPaaS solutions — including MuleSoft, Azure Integration Services, and Dell Boomi — that orchestrate complex, multi-system business processes.' },
    ],
  },
  {
    img: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=180&fit=crop&auto=format',
    title: 'Managed IT Services',
    desc: 'Proactive monitoring, maintenance, and support keeping your infrastructure at peak performance 24/7.',
    intro: 'Our Managed IT Services deliver the expertise of a full IT department at a fraction of the cost. We proactively manage your infrastructure, anticipate issues before they impact operations, and ensure your team always has the support they need.',
    whyTitle: 'Why Managed IT Services?',
    whyPoints: [
      { bold: 'Proactive vs. Reactive:', text: 'We identify and resolve issues before they become outages — minimizing downtime and protecting your revenue.' },
      { bold: 'Predictable Costs:', text: 'A fixed monthly investment replaces unpredictable break-fix expenses, making IT budgeting straightforward.' },
      { bold: 'Focus on Core Business:', text: 'Free your internal team from infrastructure firefighting so they can focus on initiatives that drive growth.' },
    ],
    expertise: [
      { icon: '📡', title: '24/7 Monitoring', body: 'Round-the-clock monitoring of your network, servers, endpoints, and applications — with automated alerting and rapid incident response.' },
      { icon: '🎧', title: 'Help Desk Support', body: 'Multi-tier technical support for your end users via phone, email, and chat — ensuring fast resolution and minimal disruption to productivity.' },
      { icon: '🖥️', title: 'Infrastructure Management', body: 'Patch management, configuration management, backup administration, and capacity planning to keep your IT environment secure and optimized.' },
    ],
  },
  {
    img: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=180&fit=crop&auto=format',
    title: 'QA & Software Testing',
    desc: 'Comprehensive manual and automated testing that ensures quality, reliability, and performance at every release.',
    intro: 'Quality is not an afterthought — it is a discipline. Our QA engineers embed into your development lifecycle to catch defects early, validate functionality, and ensure every release meets the highest standards of reliability, security, and performance.',
    whyTitle: 'Why Invest in QA Testing?',
    whyPoints: [
      { bold: 'Prevent Costly Defects:', text: 'Bugs found in production cost 100× more to fix than those caught during development. Early QA saves significant time and money.' },
      { bold: 'Protect Your Reputation:', text: 'A flawed product damages user trust. Rigorous testing ensures every release reflects your brand\'s commitment to quality.' },
      { bold: 'Faster Release Cycles:', text: 'Automated test suites enable continuous delivery — shipping features faster without sacrificing confidence.' },
    ],
    expertise: [
      { icon: '🧪', title: 'Manual Testing', body: 'Exploratory, functional, regression, and user acceptance testing performed by experienced QA engineers who think like real users.' },
      { icon: '⚙️', title: 'Automated Testing', body: 'End-to-end, API, and unit test automation using Selenium, Cypress, Playwright, and Jest — integrated directly into your CI/CD pipeline.' },
      { icon: '📈', title: 'Performance Testing', body: 'Load, stress, and scalability testing to validate that your application performs reliably under peak demand and growth scenarios.' },
    ],
  },
  {
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=180&fit=crop&auto=format',
    title: 'POS & Kiosk Software Systems',
    desc: 'Reliable point-of-sale and self-service kiosk solutions for retail, hospitality, and service industries.',
    intro: 'From high-volume retail counters to unmanned self-service kiosks, we build robust, intuitive software that streamlines transactions, reduces wait times, and delivers real-time business intelligence to operators and managers.',
    whyTitle: 'Why Custom POS & Kiosk Solutions?',
    whyPoints: [
      { bold: 'Operational Efficiency:', text: 'Streamlined checkout and order flows reduce transaction times, increase throughput, and improve staff productivity.' },
      { bold: 'Superior Customer Experience:', text: 'Intuitive interfaces and self-service options reduce queues and give customers the fast, frictionless experience they expect.' },
      { bold: 'Real-Time Business Insights:', text: 'Integrated reporting dashboards give managers live visibility into sales, inventory, and performance metrics.' },
    ],
    expertise: [
      { icon: '🏪', title: 'POS Systems', body: 'Full-featured point-of-sale platforms with payment processing, inventory management, loyalty programs, and multi-location support — built for your specific industry.' },
      { icon: '🖥️', title: 'Self-Service Kiosks', body: 'Custom kiosk software for ordering, check-in, information, and ticketing — designed for durability, accessibility, and 24/7 reliability.' },
      { icon: '📦', title: 'Inventory Management', body: 'Real-time stock tracking, automated reordering, and supplier integrations that keep shelves stocked and shrinkage minimized.' },
    ],
  },
  {
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=180&fit=crop&auto=format',
    title: 'Data Analytics & Business Intelligence',
    desc: 'Turn raw data into actionable insights with dashboards and BI tools that drive smarter decisions.',
    intro: 'Data is your most valuable asset — but only when you can understand it. We build end-to-end analytics solutions that transform scattered raw data into clear, actionable intelligence that empowers every level of your organization to make faster, smarter decisions.',
    whyTitle: 'Why Data Analytics & BI?',
    whyPoints: [
      { bold: 'Informed Decision-Making:', text: 'Replace gut-feel decisions with data-backed insights — identifying opportunities and risks before they impact your bottom line.' },
      { bold: 'Operational Efficiency:', text: 'Analytics surfaces inefficiencies hidden in your data, enabling targeted improvements that reduce costs and increase output.' },
      { bold: 'Competitive Intelligence:', text: 'Understand market trends, customer behavior, and competitive dynamics through data — and act on them before your competitors do.' },
    ],
    expertise: [
      { icon: '📊', title: 'Data Visualization', body: 'Interactive dashboards and reports built with Power BI, Tableau, and Looker that make complex data instantly understandable to any stakeholder.' },
      { icon: '🔮', title: 'Predictive Analytics', body: 'Machine learning models that forecast demand, churn, revenue, and operational outcomes — giving you a data-driven view of the future.' },
      { icon: '📋', title: 'Business Reporting', body: 'Automated, scheduled reporting solutions that deliver the right KPIs to the right people at the right time — eliminating manual report generation.' },
    ],
  },
]

const SERVICE_PAGE_TITLES: Record<string, string> = {
  'Application Modernization': 'Application Modernization',
  'Custom Software Development': 'Software Development',
  'IT Consulting & Solution Architecture': 'IT Strategy & Consulting',
  'Robotic Process Automation (RPA)': 'Robotics Process Automation',
  'Staff Augmentation': 'Staff Augmentation',
  'Managed IT Services': 'Support & Maintenance',
}

const SERVICE_PAGE_DESCRIPTIONS: Record<string, string> = {
  'Application Modernization': 'Transform legacy applications into modern, cloud-ready solutions that drive innovation and performance.',
  'Software Development': 'Custom software solutions tailored to your unique business requirements and challenges.',
  'IT Strategy & Consulting': 'Strategic technology planning and roadmaps aligned with your business objectives and growth plans.',
  'Robotics Process Automation': 'Automate repetitive tasks to boost efficiency, accuracy, and free up valuable human resources.',
  'Staff Augmentation': 'Flexible talent solutions to scale your team with specialized skills when you need them most.',
  'Support & Maintenance': 'Comprehensive support services to ensure your IT systems run smoothly and efficiently.',
}

const SERVICE_PAGE_IMAGES: Record<string, string> = {
  'Application Modernization': 'https://rcccolabsolutions.com/assets/Application-aksWr-W8.svg',
  'Software Development': 'https://rcccolabsolutions.com/assets/Development-D_Okrc6Q.svg',
  'IT Strategy & Consulting': 'https://rcccolabsolutions.com/assets/Consulting-VNXxPGMY.svg',
  'Robotics Process Automation': 'https://rcccolabsolutions.com/assets/Robotics-DSBf1WUk.svg',
  'Staff Augmentation': 'https://rcccolabsolutions.com/assets/Augmentation-CboDki-Z.svg',
  'Support & Maintenance': 'https://rcccolabsolutions.com/assets/Maintenance-DkDhBq_h.svg',
}

const SERVICE_PAGE_BENEFITS: Record<string, string[]> = {
  'Application Modernization': ['50% faster performance', 'Cloud-native architecture', 'Enhanced security'],
  'Software Development': ['Custom-built solutions', 'Agile development', 'Scalable architecture'],
  'IT Strategy & Consulting': ['Strategic roadmaps', 'Cost optimization', 'Risk mitigation'],
  'Robotics Process Automation': ['90% time savings', 'Zero human error', '24/7 automation'],
  'Staff Augmentation': ['Expert talent pool', 'Flexible scaling', 'Seamless integration'],
  'Support & Maintenance': ['99.9% uptime', '24/7 monitoring', 'Proactive maintenance'],
}

const SERVICE_PAGE_SOLUTIONS: Solution[] = SOLUTIONS

const CONTACT_INFO = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: '7/F Ascott Makati Glorietta 4, Ayala Center San Lorenzo, Makati City, Philippines' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, label: '+632 8651 6572' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: 'info@rcccolabsolutions.com' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>, label: 'rcccolabsolutions.com' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>, label: 'Mon – Fri: 8:00 AM – 7:00 PM' },
]

type Msg = { role: 'user' | 'ai'; text: string }

const ABOUT_VALUES = [
  { title: 'Accountability', body: 'We take ownership of responsibilities, honor our commitments, and deliver results and value with integrity and dedication.' },
  { title: 'Collaboration', body: 'Our team embraces teamwork and open communication to achieve common goals. The best solutions emerge when diverse perspectives unite.' },
  { title: 'Excellence', body: "We continuously improve to surpass expectations and set the bar for quality and innovation. Excellence is our standard in everything we deliver." },
  { title: 'Sustainability', body: 'We integrate sustainable practices into everyday operations so our growth contributes positively to the world around us.' },
]

function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: C.bgDeep, color: C.royalDeep }}>
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: C.royal, borderBottom: '1px solid rgba(255,255,255,0.16)', boxShadow: '0 2px 24px rgba(4,8,32,0.28)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between" style={{ height: 88 }}>
          <a href="/" className="shrink-0" aria-label="RCC Colab Solutions home">
            <img src={logoImg} alt="RCC Colab Solutions" className="object-contain" style={{ width: 86, height: 62 }} />
          </a>
          <nav className="hidden md:flex items-center gap-9" aria-label="Main navigation">
            <a href="/" className="nav-link text-sm font-semibold" style={{ color: '#fff' }}>Home</a>
            <a href="/aboutus" className="nav-link text-sm font-semibold" style={{ color: C.orangeLight }}>About Us</a>
            <a href="/services" className="nav-link text-sm font-semibold" style={{ color: '#fff' }}>Services</a>
            <a href="/#contact" className="nav-link text-sm font-semibold" style={{ color: '#fff' }}>Contact Us</a>
          </nav>
          <a href="/" className="md:hidden text-sm font-semibold" style={{ color: '#fff' }}>Home</a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden pt-40 pb-28 px-6" style={{ background: `linear-gradient(135deg,${C.bgDark},${C.bgDeep})` }}>
          <video autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover">
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: 'rgba(8,13,54,0.34)' }} />
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: `linear-gradient(rgba(103,232,249,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(103,232,249,0.2) 1px,transparent 1px)`, backgroundSize: '56px 56px' }} />
          <div className="relative z-10 max-w-6xl mx-auto">
            <p className="text-xs font-extrabold tracking-widest uppercase mb-4" style={{ color: C.orange }}>About Us</p>
            <h1 className="text-5xl md:text-7xl font-black text-white max-w-3xl leading-none">Leading the future of digital transformation.</h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>Innovation, expertise, and dedication for businesses ready to move forward.</p>
          </div>
        </section>

        <section className="py-24 px-6" style={{ background: '#fff' }}>
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-14">
              <p className="text-xs font-extrabold tracking-widest uppercase mb-3" style={{ color: C.orange }}>Who We Are</p>
              <h2 className="text-4xl md:text-5xl font-black mb-5" style={{ color: C.royalDeep }}>Technology with purpose.</h2>
              <p className="text-lg leading-relaxed" style={{ color: 'rgba(10,36,114,0.68)' }}>RCC Colab Solutions is an IT solutions provider driven by a deep commitment to digital transformation and operational excellence.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                ['RCC Colab Solutions', 'End-to-end personalized services with a solution-driven approach to unlock your full potential.'],
                ['Expert Team', 'Dedicated professionals with extensive corporate experience and expertise in cutting-edge technologies.'],
                ['Our Commitment', 'We serve clients across industries and tackle challenging projects with the right technology solutions.'],
              ].map(([title, body]) => (
                <article key={title} className="p-7" style={{ background: C.royal, borderTop: `3px solid ${C.orange}` }}>
                  <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
                  <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6" style={{ background: C.bgDark }}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              ['Vision', 'We envision becoming a leading IT company delivering transformative technology and consulting solutions across industries, empowering businesses and individuals to achieve sustainable growth.'],
              ['Mission', 'Our mission is to empower businesses and individuals with scalable, cutting-edge technology solutions that drive innovation, transform industries, and create lasting value.'],
            ].map(([title, body]) => (
              <article key={title} className="p-8" style={{ background: 'rgba(37,99,235,0.14)', border: '1px solid rgba(103,232,249,0.2)' }}>
                <h2 className="text-3xl font-black mb-4 text-white">{title}</h2>
                <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-24 px-6" style={{ background: '#fff' }}>
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-extrabold tracking-widest uppercase mb-3" style={{ color: C.orange }}>Our Core Values</p>
              <h2 className="text-4xl font-black mb-4" style={{ color: C.royalDeep }}>How we work.</h2>
              <p style={{ color: 'rgba(10,36,114,0.62)' }}>The principles that guide our work and define our commitment to excellence.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {ABOUT_VALUES.map((value, index) => (
                <article key={value.title} className="p-6" style={{ border: '1px solid rgba(37,99,235,0.16)', background: index % 2 ? C.royal : '#fff' }}>
                  <div className="text-3xl font-black mb-5" style={{ color: C.orange }}>0{index + 1}</div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: C.royalDeep }}>{value.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,36,114,0.64)' }}>{value.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 text-center" style={{ background: C.royal }}>
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-extrabold tracking-widest uppercase mb-4" style={{ color: C.orangeLight }}>What Makes Us Different?</p>
            <h2 className="text-4xl font-black text-white mb-5">Integrated innovation. Seamless solutions.</h2>
            <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>Our agile organization delivers measurable impact, adjusts quickly to market shifts, and understands that every business has unique goals and challenges.</p>
            <a href="/#contact" className="inline-block mt-8 px-8 py-3 font-extrabold text-white text-sm rounded-full" style={{ background: `linear-gradient(135deg,${C.orange},${C.orangeDeep})` }}>LET'S WORK TOGETHER</a>
          </div>
        </section>
      </main>
    </div>
  )
}

function ServicesPage() {
  return (
    <div className="min-h-screen" style={{ background: C.bgDark, color: '#fff' }}>
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: C.royal, borderBottom: '1px solid rgba(255,255,255,0.16)', boxShadow: '0 2px 24px rgba(4,8,32,0.28)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between" style={{ height: 88 }}>
          <a href="/" className="shrink-0" aria-label="RCC Colab Solutions home">
            <img src={logoImg} alt="RCC Colab Solutions" className="object-contain" style={{ width: 86, height: 62 }} />
          </a>
          <nav className="hidden md:flex items-center gap-9" aria-label="Main navigation">
            <a href="/" className="nav-link text-sm font-semibold" style={{ color: '#fff' }}>Home</a>
            <a href="/aboutus" className="nav-link text-sm font-semibold" style={{ color: '#fff' }}>About Us</a>
            <a href="/services" className="nav-link text-sm font-semibold" style={{ color: C.orangeLight }}>Services</a>
            <a href="/#contact" className="nav-link text-sm font-semibold" style={{ color: '#fff' }}>Contact Us</a>
          </nav>
          <a href="/" className="md:hidden text-sm font-semibold" style={{ color: '#fff' }}>Home</a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden pt-40 pb-24 px-6" style={{ background: `linear-gradient(135deg,${C.bgDark},${C.bgDeep})` }}>
          <video autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover">
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: 'rgba(8,13,54,0.34)' }} />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.22) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.22) 1px,transparent 1px)`, backgroundSize: '56px 56px' }} />
          <div className="relative z-10 max-w-6xl mx-auto">
            <p className="text-xs font-extrabold tracking-widest uppercase mb-4" style={{ color: C.orange }}>Our Services</p>
            <h1 className="text-5xl md:text-7xl font-black text-white max-w-3xl leading-none">Our Services</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>We offer a comprehensive range of business support services designed to help companies operate more efficiently, with each solution carefully tailored to meet your unique goals and operational needs.</p>
            <a href="#service-expertise" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full text-sm font-extrabold text-white transition-transform duration-200 hover:scale-105" style={{ background: `linear-gradient(135deg,${C.orange},${C.orangeDeep})`, boxShadow: `0 8px 28px rgba(249,115,22,0.28)` }}>
              Explore Our Expertise
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section id="service-expertise" className="py-24 px-6" style={{ background: C.bgDark }}>
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-14">
              <p className="text-xs font-extrabold tracking-widest uppercase mb-3" style={{ color: C.orange }}>Our Services Include</p>
              <h2 className="text-4xl md:text-5xl font-black mb-5 text-white">Our Services Include</h2>
              <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>From modernization and development to automation and support, our specialists bring practical expertise to every stage of your technology journey.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {SERVICE_PAGE_SOLUTIONS.map((sol, index) => (
                <article key={sol.title}
                  onClick={() => window.location.assign(`/?service=${encodeURIComponent(sol.title)}`)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') window.location.assign(`/?service=${encodeURIComponent(sol.title)}`)
                  }}
                  role="button"
                  tabIndex={0}
                  className="group grid md:grid-cols-[1fr_300px] overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                  style={{ background: C.royalDark, border: '1px solid rgba(255,255,255,0.16)', boxShadow: '0 8px 24px rgba(4,8,32,0.24)' }}>
                  <div className="relative min-h-48 md:min-h-full md:col-start-2 overflow-hidden flex items-center justify-center" style={{ background: C.royal }}>
                    <img src={sol.img} alt={sol.title} loading="lazy" className="w-full h-full max-h-72 object-contain p-5 transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-4 right-5 text-sm font-black" style={{ color: C.orange }}>0{index + 1}</span>
                  </div>
                  <div className="p-6 flex flex-col md:col-start-1 md:row-start-1">
                    <h3 className="text-xl font-black mb-3 text-white">{sol.title}</h3>
                    <p className="leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.78)' }}>{sol.desc}</p>
                    <div className="space-y-2 mb-6">
                    </div>
                    <button onClick={() => window.location.assign(`/?service=${encodeURIComponent(sol.title)}`)} className="self-center inline-flex items-center justify-center gap-1 text-xs font-bold transition-all duration-200 hover:gap-2 mt-auto" style={{ color: C.orange }}>
                      Learn More
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 text-center" style={{ background: C.royal }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-black text-white mb-5">Ready to Transform Your Business?</h2>
            <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>Let's discuss how our services can help you achieve your goals and drive innovation.</p>
            <a href="/#contact" className="inline-flex items-center gap-2 mt-8 px-8 py-3 rounded-full font-extrabold text-white text-sm transition-transform duration-200 hover:scale-105" style={{ background: `linear-gradient(135deg,${C.orange},${C.orangeDeep})` }}>
              Get Started Today
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="px-6 py-14" style={{ background: C.bgDark, borderTop: `1px solid rgba(37,99,235,0.18)` }}>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <a href="/" aria-label="RCC Colab Solutions Logo" className="inline-block mb-4">
              <img src={logoImg} alt="RCC Colab Solutions Logo" className="object-contain" style={{ width: 100, height: 62 }} />
            </a>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>Your trusted partner for personalized IT software and consulting solutions, delivering excellence in innovation, quality, and service.</p>
          </div>
          <div>
            <h3 className="font-black mb-4 text-white">Quick Links</h3>
            <nav className="flex flex-col gap-2 text-sm" aria-label="Footer navigation">
              <a href="/" className="hover:text-orange-500" style={{ color: 'rgba(255,255,255,0.72)' }}>Home</a>
              <a href="/aboutus" className="hover:text-orange-500" style={{ color: 'rgba(255,255,255,0.72)' }}>About Us</a>
              <a href="/services" className="hover:text-orange-500" style={{ color: C.orange }}>Services</a>
              <a href="/contactus" className="hover:text-orange-500" style={{ color: 'rgba(255,255,255,0.72)' }}>Contact</a>
            </nav>
          </div>
          <div>
            <h3 className="font-black mb-4 text-white">Office Address</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>7/F Ascott Makati Glorietta 4, Ayala Center San Lorenzo, Makati City, Philippines</p>
            <h3 className="font-black mt-6 mb-3 text-white">Follow Us</h3>
            <a href="https://www.linkedin.com/company/rcc-colab-solutions-inc/?viewAsMember=true" className="text-sm" style={{ color: C.orange }}>LinkedIn</a>
          </div>
          <div>
            <h3 className="font-black mb-4 text-white">Get In Touch</h3>
            <div className="flex flex-col gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.72)' }}>
              <a href="tel:+63286516572">+632 8651 6572</a>
              <a href="mailto:info@rcccolabsolutions.com">info@rcccolabsolutions.com</a>
              <a href="https://rcccolabsolutions.com">rcccolabsolutions.com</a>
              <span>Business Hours Mon - Fri: 8:00 AM - 7:00 PM</span>
            </div>
          </div>
        </div>
        <p className="max-w-6xl mx-auto mt-12 pt-6 text-xs" style={{ color: 'rgba(255,255,255,0.58)', borderTop: '1px solid rgba(255,255,255,0.18)' }}>© 2025 RCC Colab Solutions, Inc. All rights reserved.</p>
      </footer>
    </div>
  )
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const contactRevealRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const revealRoot = contactRevealRef.current
    if (!revealRoot) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('contact-reveal-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    revealRoot.querySelectorAll('.contact-reveal').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const handleContactSend = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus('sending')
    try {
      const data = new FormData()
      data.append('name', form.name)
      data.append('company', form.company)
      data.append('phone', form.phone)
      data.append('email', form.email)
      data.append('message', form.message)
      data.append('_subject', `New Contact Inquiry from ${form.name}`)
      data.append('_captcha', 'false')
      data.append('_template', 'table')
      const response = await fetch('https://formsubmit.co/info@rcccolabsolutions.com', {
        method: 'POST', body: data, headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error('Unable to send message')
      setStatus('ok')
      setForm({ name: '', company: '', phone: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#fff', color: C.royalDeep }}>
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: C.royal, borderBottom: '1px solid rgba(255,255,255,0.16)', boxShadow: '0 2px 24px rgba(4,8,32,0.28)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between" style={{ height: 88 }}>
          <a href="/" aria-label="RCC Colab Solutions home"><img src={logoImg} alt="RCC Colab Solutions" className="object-contain" style={{ width: 86, height: 62 }} /></a>
          <nav className="hidden md:flex items-center gap-9" aria-label="Main navigation">
            <a href="/" className="nav-link text-sm font-semibold" style={{ color: '#fff' }}>Home</a>
            <a href="/aboutus" className="nav-link text-sm font-semibold" style={{ color: '#fff' }}>About Us</a>
            <a href="/services" className="nav-link text-sm font-semibold" style={{ color: '#fff' }}>Services</a>
            <a href="/contactus" className="nav-link text-sm font-semibold" style={{ color: C.orangeLight }}>Contact Us</a>
          </nav>
          <a href="/" className="md:hidden text-sm font-semibold" style={{ color: '#fff' }}>Home</a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden pt-40 pb-28 px-6" style={{ background: `linear-gradient(135deg,${C.bgDark},${C.bgDeep})` }}>
          <video autoPlay muted loop playsInline aria-hidden="true" className="contact-hero-video absolute inset-0 w-full h-full object-cover"><source src={heroVideo} type="video/mp4" /></video>
          <div className="absolute inset-0" style={{ background: 'rgba(8,13,54,0.34)' }} />
          <div className="contact-hero-content relative z-10 max-w-6xl mx-auto">
            <p className="text-xs font-extrabold tracking-widest uppercase mb-4" style={{ color: C.orange }}>Contact Us</p>
            <h1 className="text-5xl md:text-7xl font-black text-white max-w-3xl leading-none">Let's Connect</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>Ready to transform your business? We're here to help you every step of the way.</p>
          </div>
        </section>

        <section ref={contactRevealRef} className="py-24 px-6" style={{ background: '#fff' }}>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-start">
            <div className="contact-reveal">
              <p className="text-xs font-extrabold tracking-widest uppercase mb-3" style={{ color: C.orange }}>Get in Touch</p>
              <h2 className="text-4xl md:text-5xl font-black mb-5" style={{ color: C.royalDeep }}>We'd love to hear from you.</h2>
              <p className="text-lg leading-relaxed mb-9" style={{ color: 'rgba(10,36,114,0.68)' }}>Whether you're looking for help with your next big project or want to join our team, we are ready to answer all your questions.</p>
              <div className="space-y-5">
                {[
                  ['Phone Number', '+632 8651 6572'],
                  ['Email Address', 'info@rcccolabsolutions.com'],
                  ['Office Address', '7/F Ascott Makati Glorietta 4, Ayala Center San Lorenzo, Makati City'],
                  ['Office Hours', 'Monday to Friday (8:00 AM - 7:00 PM)'],
                ].map(([label, value]) => (
                  <div key={label} className="contact-detail contact-reveal border-l-4 pl-4" style={{ borderColor: C.orange }}>
                    <p className="text-xs font-extrabold uppercase tracking-widest mb-1" style={{ color: C.royalDark }}>{label}</p>
                    <p className="leading-relaxed" style={{ color: 'rgba(10,36,114,0.72)' }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleContactSend} className="contact-reveal contact-form rounded-2xl p-7 md:p-9" style={{ background: C.royal, border: '1px solid rgba(37,99,235,0.16)' }}>
              <p className="text-xs font-extrabold tracking-widest uppercase mb-3" style={{ color: C.orange }}>Send us a Message</p>
              <h2 className="text-3xl font-black mb-2" style={{ color: C.royalDeep }}>Start a conversation.</h2>
              <p className="mb-7" style={{ color: 'rgba(10,36,114,0.66)' }}>Fill out the form below and we'll get back to you as soon as possible.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {([['Full Name', 'name', 'Your full name', true], ['Company', 'company', 'Your company name', false], ['Contact Number', 'phone', '+63 900 000 0000', false], ['Work Email', 'email', 'you@company.com', true]] as const).map(([label, key, placeholder, required]) => (
                  <label key={key} className="block text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(10,36,114,0.68)' }}>{label}
                    <input required={required} type={key === 'email' ? 'email' : 'text'} placeholder={placeholder} value={form[key]} onChange={event => setForm(current => ({ ...current, [key]: event.target.value }))} className="mt-2 w-full px-3 py-3 rounded-lg text-sm outline-none" style={{ color: C.royalDeep, background: '#fff', border: '1px solid rgba(10,36,114,0.16)' }} />
                  </label>
                ))}
              </div>
              <label className="block mt-4 text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(10,36,114,0.68)' }}>Message
                <textarea required rows={5} placeholder="How can we help?" value={form.message} onChange={event => setForm(current => ({ ...current, message: event.target.value }))} className="mt-2 w-full px-3 py-3 rounded-lg text-sm outline-none resize-none" style={{ color: C.royalDeep, background: '#fff', border: '1px solid rgba(10,36,114,0.16)' }} />
              </label>
              {status === 'ok' && <p className="mt-4 text-sm font-bold" style={{ color: '#16a34a' }}>Your message was sent. We'll be in touch soon.</p>}
              {status === 'error' && <p className="mt-4 text-sm font-bold" style={{ color: '#dc2626' }}>Something went wrong. Please try again.</p>}
              <button type="submit" disabled={status === 'sending'} className="mt-6 w-full py-3.5 rounded-full font-extrabold text-white text-sm disabled:opacity-60" style={{ background: `linear-gradient(135deg,${C.orange},${C.orangeDeep})` }}>{status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default function App() {
  if (window.location.pathname === '/aboutus' || window.location.pathname === '/aboutus/') return <AboutPage />
  if (window.location.pathname === '/services' || window.location.pathname === '/services/') return <ServicesPage />
  if (window.location.pathname === '/contactus' || window.location.pathname === '/contactus/') return <ContactPage />
  const [menuOpen, setMenuOpen]         = useState(false)
  const [scrolled, setScrolled]         = useState(false)
  const [activeService, setActiveService] = useState<Solution | null>(() => {
    const serviceTitle = new URLSearchParams(window.location.search).get('service')
    return SOLUTIONS.find(solution => solution.title === serviceTitle || SERVICE_PAGE_TITLES[solution.title] === serviceTitle) ?? null
  })
  const [form, setForm]             = useState({ firstName: '', lastName: '', email: '', company: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [chatOpen, setChatOpen]     = useState(false)
  const [chatInput, setChatInput]   = useState('')
  const [chatOffset, setChatOffset] = useState({ x: 0, y: 0 })
  const [draggingChat, setDraggingChat] = useState(false)
  const [messages, setMessages]     = useState<Msg[]>([
    { role: 'ai', text: "Hi! I'm **RCC.Ai** 👋 Your AI assistant for RCC Colab Solutions. Ask me anything about our services, location, pricing, or how to get started!" }
  ])
  const [aiTyping, setAiTyping]     = useState(false)
  const chatEndRef                  = useRef<HTMLDivElement>(null)
  const formRef                     = useRef<HTMLFormElement>(null)
  const chatDragRef                 = useRef({ startX: 0, startY: 0, offsetX: 0, offsetY: 0, moved: false })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, aiTyping])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')
    try {
      const fd = new FormData()
      fd.append('name', `${form.firstName} ${form.lastName}`)
      fd.append('email', form.email)
      fd.append('_subject', `New Inquiry from ${form.firstName} ${form.lastName} — ${form.company || 'RCC Website'}`)
      fd.append('company', form.company)
      fd.append('message', form.message)
      fd.append('_captcha', 'false')
      fd.append('_template', 'table')
      const res = await fetch('https://formsubmit.co/info@rcccolabsolutions.com', {
        method: 'POST', body: fd, headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setFormStatus('ok')
        setForm({ firstName: '', lastName: '', email: '', company: '', message: '' })
        setTimeout(() => setFormStatus('idle'), 7000)
      } else { setFormStatus('error'); setTimeout(() => setFormStatus('idle'), 5000) }
    } catch { setFormStatus('error'); setTimeout(() => setFormStatus('idle'), 5000) }
  }

  const handleChatSend = (text?: string) => {
    const msg = (text ?? chatInput).trim()
    if (!msg) return
    setMessages(m => [...m, { role: 'user', text: msg }])
    setChatInput('')
    setAiTyping(false)
    setMessages(m => [...m, { role: 'ai', text: getAiReply(msg) }])
  }

  const handleChatPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    chatDragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      offsetX: chatOffset.x,
      offsetY: chatOffset.y,
      moved: false,
    }
    setDraggingChat(true)
  }

  const handleChatPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!draggingChat) return
    const drag = chatDragRef.current
    const nextX = drag.offsetX + e.clientX - drag.startX
    const nextY = drag.offsetY + e.clientY - drag.startY
    drag.moved = Math.abs(e.clientX - drag.startX) > 4 || Math.abs(e.clientY - drag.startY) > 4
    setChatOffset({
      x: Math.max(-window.innerWidth + 76, Math.min(window.innerWidth - 76, nextX)),
      y: Math.max(-window.innerHeight + 76, Math.min(window.innerHeight - 76, nextY)),
    })
  }

  const handleChatPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId)
    setDraggingChat(false)
  }

  const renderAiText = (text: string) =>
    text.split('\n').map((line, i, arr) => {
      const parts = line.split(/\*\*(.*?)\*\*/g)
      return (
        <span key={i}>
          {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="font-semibold" style={{ color: C.royalDeep }}>{p}</strong> : p)}
          {i < arr.length - 1 && <br />}
        </span>
      )
    })

  return (
    <div className="lyka-app min-h-screen overflow-x-hidden" style={{ background: C.royalDeep }}>

      {/* ══ NAV ═════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: C.royal,
          borderBottom: '1px solid rgba(255,255,255,0.16)',
          boxShadow: scrolled ? '0 2px 24px rgba(4,8,32,0.28)' : '0 1px 12px rgba(4,8,32,0.18)',
        }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between" style={{ height: 88 }}>
          <button onClick={() => scrollTo('home')} className="flex items-center gap-3 group shrink-0">
            <img src={logoImg} alt="RCC Colab Solutions" className="object-contain" style={{ width: 86, height: 62 }} />
          </button>

          <nav className="hidden md:flex items-center gap-9">
            {[{ l: 'Home', id: 'home' }, { l: 'About Us', id: 'about' }, { l: 'Services', id: 'solutions' }, { l: 'Contact Us', id: 'contact' }].map(({ l, id }) => (
              <button key={l} onClick={() => id === 'about' ? window.location.assign('/aboutus') : id === 'solutions' ? window.location.assign('/services') : scrollTo(id)}
                className="nav-link text-sm font-semibold transition-all duration-200 relative group"
                style={{ letterSpacing: '0.01em', color: '#fff' }}>
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: C.orange }} />
              </button>
            ))}
          </nav>

          <button className="md:hidden p-2" style={{ color: '#fff' }} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>

        <div className={`mobile-menu md:hidden px-6 py-5 flex flex-col gap-4 border-t ${menuOpen ? 'mobile-menu-open' : ''}`}
            style={{ background: C.royal, borderColor: 'rgba(255,255,255,0.16)' }}>
            {[{ l: 'Home', id: 'home' }, { l: 'About Us', id: 'about' }, { l: 'Services', id: 'solutions' }, { l: 'Contact Us', id: 'contact' }].map(({ l, id }) => (
              <button key={l} onClick={() => id === 'about' ? window.location.assign('/aboutus') : id === 'solutions' ? window.location.assign('/services') : scrollTo(id)} className="mobile-menu-link text-left text-sm font-semibold py-1" style={{ color: '#fff' }}>{l}</button>
            ))}
        </div>
      </header>

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section id="home" className="relative w-full overflow-hidden" style={{ minHeight: '100vh' }}>
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }}>
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Royal blue tinted overlay */}
        <div className="absolute inset-0" style={{ zIndex: 1, background: 'rgba(8,13,54,0.28)' }} />
        <div className="absolute inset-0" style={{ zIndex: 2, background: 'linear-gradient(to bottom, rgba(8,13,54,0.08) 0%, rgba(8,13,54,0.62) 100%)' }} />
        {/* Animated scanline */}
        <div className="absolute left-0 right-0 h-px opacity-30 pointer-events-none"
          style={{ zIndex: 3, top: '42%', background: `linear-gradient(90deg,transparent,${C.orange},transparent)`, animation: 'scanline 5s ease-in-out infinite' }} />
        {/* Royal blue bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ zIndex: 3, background: `linear-gradient(90deg,transparent,${C.orange},transparent)` }} />
        {/* Royal blue radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: 'radial-gradient(ellipse at 50% 60%, rgba(21,49,125,0.4) 0%, transparent 70%)' }} />

        <div className="relative flex flex-col items-center justify-center text-center px-6"
          style={{ zIndex: 4, minHeight: '100vh', paddingTop: 72 }}>

          <h1 className="font-black text-white mb-5 leading-none"
            style={{ fontSize: 'clamp(2.4rem,6.5vw,5rem)', maxWidth: 880, textShadow: '0 4px 80px rgba(8,13,54,0.9)', letterSpacing: '-0.03em' }}>
            Transform your Ideas into<br />
            <span style={{
              background: `linear-gradient(90deg,${C.orange} 0%,${C.orangeLight} 50%,${C.orange} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200%',
              animation: 'shimmer 3s linear infinite',
            }}>
              Powerful Software Solutions
            </span>
          </h1>

          <p className="text-white/55 mb-10 text-base md:text-xl leading-relaxed" style={{ maxWidth: 580 }}>
            Empowering businesses with reliable IT services, cybersecurity, and
            cutting-edge software that drives growth across the Philippines and beyond.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => scrollTo('about')}
              className="px-10 py-4 font-extrabold text-white text-sm rounded-full transition-all duration-200 hover:scale-105 hover:shadow-2xl"
              style={{ background: `linear-gradient(135deg,${C.orange},${C.orangeDeep})`, boxShadow: `0 8px 36px rgba(21,49,125,0.55)`, letterSpacing: '0.07em' }}>
              GET STARTED TODAY
            </button>
            <button onClick={() => scrollTo('solutions')}
              className="px-10 py-4 font-extrabold text-white text-sm rounded-full transition-all duration-200 hover:bg-white/15"
              style={{ border: `2px solid rgba(255,255,255,0.5)`, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', letterSpacing: '0.07em' }}>
              OUR SERVICES
            </button>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ════════════════════════════════════════════ */}
      <section id="about" className="py-24 px-6 relative overflow-hidden" style={{ background: '#fff', color: '#0a2472' }}>
        <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{ background: `radial-gradient(circle at top right,rgba(21,49,125,0.08),transparent 70%)` }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none"
          style={{ background: `radial-gradient(circle at bottom left,rgba(21,49,125,0.08),transparent 70%)` }} />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center relative">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-px" style={{ background: `linear-gradient(90deg,${C.orange},transparent)` }} />
              <p className="text-sm font-extrabold tracking-widest uppercase" style={{ color: C.orange }}>About Us</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight" style={{ color: C.royalDeep, letterSpacing: '-0.02em' }}>
              Who We Are
            </h2>
            <p className="leading-relaxed mb-5" style={{ color: 'rgba(10,36,114,0.72)' }}>
              RCC Colab Solutions Inc. offers end-to-end personalized business solutions, understanding that
              each company has unique needs and goals. We help businesses unlock their full potential through
              emerging and cutting-edge solutions.
            </p>
            <p className="leading-relaxed mb-5" style={{ color: 'rgba(10,36,114,0.72)' }}>
              Whether you're a startup or an established company, we're eager to enhance your digital presence,
              streamline operations, and improve customer engagement through innovative software solutions.
            </p>
            <p className="leading-relaxed mb-8" style={{ color: 'rgba(10,36,114,0.72)' }}>
              We <strong className="font-bold" style={{ color: C.royalDeep }}>collaborate</strong> with your team to identify the best IT
              services and solutions that create significant value for your organization.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['ISO 27001 Certified', 'AWS Partner', 'Microsoft Gold', 'Google Cloud'].map((b) => (
                <span key={b} className="px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(21,49,125,0.08)', border: `1px solid rgba(21,49,125,0.2)`, color: C.royalDark }}>{b}</span>
              ))}
            </div>
            <button onClick={() => scrollTo('solutions')}
              className="px-7 py-3 font-extrabold text-white text-sm rounded-full transition-all duration-200 hover:scale-105"
              style={{ background: `linear-gradient(135deg,${C.orange},${C.orangeDeep})`, boxShadow: `0 6px 24px rgba(21,49,125,0.4)`, letterSpacing: '0.05em' }}>
              Explore Our Services
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=360&fit=crop&auto=format"
              alt="Business team meeting" className="rounded-2xl col-span-2 w-full object-cover"
              style={{ height: 210, border: '1px solid rgba(21,49,125,0.15)' }} />
            <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=240&fit=crop&auto=format"
              alt="Technology development" className="rounded-2xl w-full object-cover"
              style={{ height: 148, border: '1px solid rgba(21,49,125,0.15)' }} />
            <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=240&fit=crop&auto=format"
              alt="Server infrastructure" className="rounded-2xl w-full object-cover"
              style={{ height: 148, border: '1px solid rgba(21,49,125,0.15)' }} />
          </div>
        </div>
      </section>

      {/* ══ SOLUTIONS ════════════════════════════════════════ */}
      <section id="solutions" className="py-24 px-6 relative" style={{ background: C.bgDark, color: '#fff' }}>
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{ backgroundImage: `linear-gradient(rgba(21,49,125,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(21,49,125,0.15) 1px,transparent 1px)`, backgroundSize: '48px 48px' }} />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-px" style={{ background: `linear-gradient(90deg,transparent,${C.orange})` }} />
              <p className="text-xs font-extrabold tracking-widest uppercase" style={{ color: C.orange }}>What We Offer</p>
              <div className="w-10 h-px" style={{ background: `linear-gradient(90deg,${C.orange},transparent)` }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-white mb-4" style={{ color: 'white', letterSpacing: '-0.02em' }}>Our Services Include</h2>
            <p className="max-w-xl mx-auto text-base" style={{ color: 'white(18,49,92,0.68)' }}>
              End-to-end technology services engineered to solve complex challenges and unlock new growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SOLUTIONS.map((sol) => (
              <div key={sol.title}
                onClick={() => setActiveService(sol)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') setActiveService(sol)
                }}
                role="button"
                tabIndex={0}
                className="group rounded-2xl flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(37,99,235,0.18)', boxShadow: '0 4px 20px rgba(37,99,235,0.14)' }}>
                {/* Realistic image */}
                <div className="relative overflow-hidden" style={{ height: 180 }}>
                  <img src={sol.img} alt={sol.title} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ background: C.royalDark }} />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom,rgba(8,13,54,0.1) 0%,rgba(8,13,54,0.6) 100%)' }} />
                  {/* Royal blue top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg,${C.orange},${C.orangeLight})` }} />
                </div>
                <div className="flex flex-col gap-3 p-5 flex-1">
                  <h3 className="font-bold text-sm leading-snug text-white">{sol.title}</h3>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.78)' }}>{sol.desc}</p>
                  <button onClick={() => setActiveService(sol)}
                    className="self-center flex items-center justify-center gap-1 text-xs font-bold transition-all duration-200 mt-auto hover:gap-2"
                    style={{ color: C.orange }}>
                    Learn More
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══════════════════════════════════════ */}
      <section className="py-20 px-6 text-center relative overflow-hidden" style={{ background: C.royal }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `radial-gradient(circle at 15% 50%,${C.orange} 0%,transparent 50%),radial-gradient(circle at 85% 50%,${C.orangeDeep} 0%,transparent 50%)` }} />
        <div className="absolute inset-0 pointer-events-none opacity-8"
          style={{ backgroundImage: `linear-gradient(rgba(21,49,125,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(21,49,125,0.3) 1px,transparent 1px)`, backgroundSize: '56px 56px' }} />
        <div className="relative max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight" style={{ letterSpacing: '-0.02em' }}>
            Optimize Your IT Infrastructure,<br />Grow Your Business Today
          </h2>
          <p className="mb-10 text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Partner with RCC Colab Solutions and let us handle the complexity while you focus on what matters most.
          </p>
          <button onClick={() => scrollTo('contact')}
            className="px-10 py-4 font-extrabold text-white text-sm rounded-full transition-all duration-200 hover:scale-105 hover:shadow-2xl"
            style={{ background: `linear-gradient(135deg,${C.orange},${C.orangeDeep})`, boxShadow: `0 8px 32px rgba(21,49,125,0.55)`, letterSpacing: '0.08em' }}>
            GET STARTED TODAY
          </button>
        </div>
      </section>

      {/* ══ CONTACT ═════════════════════════════════════════ */}
      <section id="contact" className="py-24 px-6 relative" style={{ background: '#fff', color: C.royalDeep }}>
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: `radial-gradient(circle at 80% 20%,${C.orange} 0%,transparent 45%)` }} />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-px" style={{ background: `linear-gradient(90deg,transparent,${C.orange})` }} />
              <p className="text-xs font-extrabold tracking-widest uppercase" style={{ color: C.orange }}>Reach Out</p>
              <div className="w-10 h-px" style={{ background: `linear-gradient(90deg,${C.orange},transparent)` }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: C.royalDeep, letterSpacing: '-0.02em' }}>Get In Touch</h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(10,36,114,0.62)' }}>Ready to simplify your IT complexity? Let's start a conversation.</p>
          </div>

          {/* Info cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {CONTACT_INFO.map((item) => (
              <div key={item.label} className="flex items-start gap-3 rounded-xl p-4"
                style={{ background: '#f8fafc', border: '1px solid rgba(10,36,114,0.1)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(21,49,125,0.1)', color: C.royalDark }}>{item.icon}</div>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,36,114,0.72)' }}>{item.label}</p>
              </div>
            ))}
          </div>

          {/* Map + Form */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Map */}
            <div className="rounded-2xl overflow-hidden relative" style={{ background: C.royalDeep, border: `1.5px solid ${C.royalDark}`, minHeight: 420 }}>
              <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: 'rgba(10,36,114,0.92)', border: `1px solid rgba(249,115,22,0.35)`, color: C.orangeLight, backdropFilter: 'blur(8px)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Ascott Makati, Glorietta 4
              </div>
              <iframe
                title="RCC Colab Solutions Office"
                src="https://maps.google.com/maps?q=Ascott+Makati+Glorietta+4,+Ayala+Center,+San+Lorenzo,+Makati+City,+Philippines&output=embed&z=17"
                width="100%" height="420"
                style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg) brightness(0.7) saturate(1.35) contrast(0.92)' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSend} className="rounded-2xl p-7 flex flex-col gap-4"
              style={{ background: '#f8fafc', border: '1.5px solid rgba(10,36,114,0.1)' }}>

              {formStatus === 'ok' && (
                <div className="flex items-center gap-3 rounded-xl px-4 py-4"
                  style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(34,197,94,0.2)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" className="w-5 h-5">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-green-400">Done Send ✓</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(74,222,128,0.6)' }}>Your message was sent — we'll reply within 24 hours.</p>
                  </div>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="rounded-xl px-4 py-3" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
                  <p className="text-sm font-bold text-red-400">Something went wrong. Please try again.</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                {([['First Name','firstName','Juan'],['Last Name','lastName','dela Cruz']] as const).map(([label,key,ph]) => (
                  <div key={key}>
                    <label className="block text-xs font-bold mb-1.5 uppercase tracking-widest" style={{ color: 'rgba(10,36,114,0.62)' }}>{label}</label>
                    <input required type="text" placeholder={ph} value={form[key]}
                      onChange={e => setForm(s => ({ ...s, [key]: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all"
                      style={{ color: C.royalDeep, background: '#fff', border: '1px solid rgba(10,36,114,0.16)' }} />
                  </div>
                ))}
              </div>

              {([['Email','email','email','you@company.com'],['Company','company','text','Your Company Name']] as const).map(([label,key,type,ph]) => (
                <div key={key}>
                  <label className="block text-xs font-bold mb-1.5 uppercase tracking-widest" style={{ color: 'rgba(10,36,114,0.62)' }}>{label}</label>
                  <input required={key==='email'} type={type} placeholder={ph} value={form[key]}
                    onChange={e => setForm(s => ({ ...s, [key]: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                    style={{ color: C.royalDeep, background: '#fff', border: '1px solid rgba(10,36,114,0.16)' }} />
                </div>
              ))}

              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase tracking-widest" style={{ color: 'rgba(10,36,114,0.62)' }}>Message</label>
                <textarea required rows={4} placeholder="Tell us about your project..." value={form.message}
                  onChange={e => setForm(s => ({ ...s, message: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
                  style={{ color: C.royalDeep, background: '#fff', border: '1px solid rgba(10,36,114,0.16)' }} />
              </div>

              <button type="submit" disabled={formStatus === 'sending'}
                className="w-full py-3.5 rounded-xl font-extrabold text-white text-sm transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ background: `linear-gradient(135deg,${C.orange},${C.orangeDeep})`, boxShadow: `0 4px 24px rgba(21,49,125,0.4)`, letterSpacing: '0.07em' }}>
                {formStatus === 'sending'
                  ? <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity=".3"/><path d="M12 2a10 10 0 0110 10"/></svg>SENDING…</>
                  : <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>SEND MESSAGE</>
                }
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════ */}
      <footer style={{ background: C.bgDeep, borderTop: `1px solid rgba(37,99,235,0.18)` }} className="px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full overflow-hidden flex items-center justify-center"
              style={{ width: 44, height: 44, background: '#fff', padding: 3 }}>
              <img src={logoImg} alt="RCC Colab Solutions" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-extrabold text-xs tracking-widest text-white">RCC COLAB SOLUTIONS</div>
              <div className="text-xs font-bold" style={{ color: C.orange }}>End-to-End IT Solutions</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {[{ l: 'HOME', id: 'home' }, { l: 'SOLUTIONS', id: 'solutions' }, { l: 'ABOUT US', id: 'about' }, { l: 'CONTACT US', id: 'contact' }].map(({ l, id }) => (
              <button key={l} onClick={() => scrollTo(id)} className="text-xs font-bold tracking-widest transition-colors" style={{ color: 'rgba(255,255,255,0.72)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.72)')}>
                {l}
              </button>
            ))}
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.58)' }}>© RCC Colab Solutions Inc. All rights reserved.</p>
        </div>
      </footer>

      {/* ══ RCC.Ai FLOATING CHAT ════════════════════════════ */}
      <button
        onClick={() => {
          if (!chatDragRef.current.moved) setChatOpen(o => !o)
        }}
        onPointerDown={handleChatPointerDown}
        onPointerMove={handleChatPointerMove}
        onPointerUp={handleChatPointerUp}
        aria-label="Open RCC.Ai chat"
        className="fixed bottom-12 right-7 z-50 flex items-center justify-center rounded-full"
        style={{
          width: 60,
          height: 60,
          padding: 0,
          background: 'transparent',
          border: 'none',
          cursor: draggingChat ? 'grabbing' : 'grab',
          touchAction: 'none',
          transform: `translate(${chatOffset.x}px, ${chatOffset.y}px)`,
          filter: 'drop-shadow(0 0 16px rgba(21,49,125,.8))',
        }}
      >
        <img
          src={robotRabbit}
          alt="RCC.ai Rabbit"
          style={{ width: 60, height: 60, objectFit: 'contain' }}
        />
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-3 sm:right-6 z-50 rounded-2xl flex flex-col overflow-hidden"
          style={{ width: 'min(340px, calc(100vw - 24px))', height: 'min(500px, calc(100vh - 96px))', minHeight: 390, background: C.royal, border: '1px solid rgba(37,99,235,0.24)', boxShadow: '0 24px 80px rgba(37,99,235,0.2)', backdropFilter: 'blur(24px)' }}>

          {/* Header */}
          <div className="flex items-center gap-2.5 px-3 py-2.5 shrink-0"
            style={{ background: C.orange, borderBottom: '1px solid rgba(234,88,12,0.7)' }}>
            <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-white/10">
              <img src={robotRabbit} alt="RCC.Ai" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-extrabold text-white text-base leading-tight tracking-wide">RCC.Ai</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-white/90">Online · Always ready</span>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} aria-label="Close RCC.Ai chat"
              className="ml-auto w-8 h-8 rounded-lg flex items-center justify-center text-white text-xl font-bold transition-all hover:bg-white/20">×</button>
          </div>

          {/* Messages */}
              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3"
                style={{ scrollbarWidth: 'thin', scrollbarColor: `rgba(21,49,125,0.3) transparent` }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[84%] rounded-xl px-3 py-2.5 text-sm leading-relaxed"
                  style={m.role === 'user'
                    ? { background: `linear-gradient(135deg,${C.orange},${C.orangeDeep})`, color: '#fff', borderBottomRightRadius: 4 }
                    : { background: C.royal, color: '#fff', borderBottomLeftRadius: 4, border: '1px solid rgba(37,99,235,0.2)' }}>
                  {m.role === 'ai' ? renderAiText(m.text) : m.text}
                </div>
              </div>
            ))}
            {aiTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-3 flex gap-1.5 items-center"
                  style={{ background: C.royal, border: '1px solid rgba(37,99,235,0.2)', borderBottomLeftRadius: 4 }}>
                  {[0,1,2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full"
                      style={{ background: C.orange, opacity: 0.7, animation: `typingDot 1s ${i*0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick prompts */}
          <div className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0" style={{ borderTop: '1px solid rgba(29,78,216,0.18)', paddingTop: 8 }}>
            {['Our Services','Location','Get Quote','Contact'].map(q => (
              <button key={q} onClick={() => handleChatSend(q)}
                className="shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 hover:bg-orange-500/15"
                style={{ background: 'rgba(255,255,255,0.42)', border: `1px solid ${C.orange}`, color: C.orangeDeep, whiteSpace: 'nowrap' }}>
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 pb-3 pt-1 shrink-0">
            <div className="flex gap-2 rounded-lg px-3 py-2"
                style={{ background: C.royal, border: '1px solid rgba(37,99,235,0.2)' }}>
              <input type="text" value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleChatSend()}
                placeholder="Ask RCC.Ai anything…"
                className="flex-1 bg-transparent text-xs outline-none"
                style={{ color: C.royalDeep }}
              />
              <button onClick={() => handleChatSend()}
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-110"
                style={{ background: chatInput.trim() ? `linear-gradient(135deg,${C.orange},${C.orangeDeep})` : 'rgba(255,255,255,0.08)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-white">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ SERVICE DETAIL MODAL ════════════════════════════ */}
      {activeService && (
        <div
          className="fixed inset-0 z-50 flex items-stretch justify-stretch"
          style={{ background: 'rgba(4,8,32,0.85)', backdropFilter: 'blur(12px)' }}
          onClick={() => setActiveService(null)}
        >
          <div
            className="relative w-full h-full overflow-y-auto rounded-none"
                style={{ background: C.royal, border: '1.5px solid rgba(37,99,235,0.22)', boxShadow: '0 32px 80px rgba(37,99,235,0.22)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Hero image */}
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <img src={activeService.img} alt={activeService.title} loading="eager" decoding="async"
                className="w-full h-full object-cover" />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, rgba(8,13,54,0.3) 0%, rgba(8,13,54,0.85) 100%)' }} />
              {/* Royal blue top accent */}
              <div className="absolute top-0 left-0 right-0 h-1"
                style={{ background: `linear-gradient(90deg,${C.orange},${C.orangeLight},${C.orange})` }} />
              {/* Close button */}
              <button
                onClick={() => setActiveService(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(219,234,254,0.9)', border: '1px solid rgba(37,99,235,0.3)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={C.orange} strokeWidth="2.5" className="w-4 h-4">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              {/* Title overlay */}
              <div className="absolute bottom-5 left-6">
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight"
                  style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)', letterSpacing: '-0.02em' }}>
                  {activeService.title}
                </h2>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-7">
              {/* Intro paragraph */}
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.86)' }}>
                {activeService.intro}
              </p>

              {/* Why card */}
              <div className="rounded-xl p-5"
                style={{ background: 'rgba(255,255,255,0.62)', border: '1px solid rgba(37,99,235,0.18)', borderLeft: `4px solid ${C.orange}` }}>
                <h3 className="font-extrabold text-lg mb-4" style={{ color: C.royalDeep }}>{activeService.whyTitle}</h3>
                <ul className="space-y-3">
                  {activeService.whyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3 text-base leading-relaxed" style={{ color: 'rgba(18,49,92,0.78)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke={C.orange} strokeWidth="2.5" className="w-4 h-4 shrink-0 mt-0.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                      <span><strong className="font-bold" style={{ color: C.royalDeep }}>{pt.bold}</strong> {pt.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Our Expertise */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-px" style={{ background: `linear-gradient(90deg,${C.orange},transparent)` }} />
                  <p className="text-xs font-extrabold tracking-widest uppercase" style={{ color: C.orange }}>Our Expertise</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {activeService.expertise.map((ex, i) => (
                    <div key={i} className="rounded-xl p-5 flex flex-col gap-3 overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.62)', border: `1px solid rgba(37,99,235,0.15)`, borderTop: `3px solid ${C.orange}` }}>
                      <div className="relative -mx-5 -mt-5 h-28 overflow-hidden">
                        <img src={getExpertiseImage(ex.title)} alt={ex.title} loading="lazy" className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,rgba(8,13,54,0.08),rgba(8,13,54,0.7))' }} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{ex.icon}</span>
                        <span className="text-sm font-extrabold uppercase tracking-widest" style={{ color: C.orange }}>{ex.title}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(18,49,92,0.72)' }}>{ex.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button onClick={() => { setActiveService(null); scrollTo('contact') }}
                  className="px-7 py-3 font-extrabold text-white text-base rounded-full transition-all duration-200 hover:scale-105"
                  style={{ background: `linear-gradient(135deg,${C.orange},${C.orangeDeep})`, boxShadow: `0 6px 24px rgba(21,49,125,0.4)`, letterSpacing: '0.05em' }}>
                  Get a Free Consultation
                </button>
                <button onClick={() => setActiveService(null)}
                  className="px-7 py-3 font-bold text-sm rounded-full transition-all duration-200 hover:bg-white/10"
                  style={{ border: '1.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scanline { 0%,100%{opacity:0.1} 50%{opacity:0.45} }
        @keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        @keyframes typingDot { 0%,80%,100%{transform:translateY(0);opacity:0.5} 40%{transform:translateY(-5px);opacity:1} }
      `}</style>
    </div>
  )
}
