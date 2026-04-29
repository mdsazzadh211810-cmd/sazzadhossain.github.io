import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Award, BookOpen, Twitter, Facebook, MessageCircle, GraduationCap, Phone, Microscope, Leaf, Cpu, ChevronDown, Download, ArrowLeft, ArrowRight, Network, Beaker, FileText, Languages } from 'lucide-react';

// ============================================================================
// 📝 TRANSLATIONS DICTIONARY
// ============================================================================
type Language = 'en' | 'bn' | 'zh';
const tDict = {
  en: {
    nav: { home: 'Home', about: 'About', cv: 'CV', research: 'Research', vision: 'Vision', skills: 'Skills & Certificates', contact: 'Contact' },
    hero: {
      name: "MD SAZZAD HOSSAIN",
      subtitle: `"Biotechnology Undergraduate Scholar | Guizhou University (贵州大学)，Guizhou, China | Bridging Wet-Lab Plant Biology with AI for Science (AI4S) | Driven by a vision to innovate sustainable agriculture via CRISPR-Cas."`,
      getInTouch: "Get in Touch",
      viewResearch: "View Research"
    },
    sections: {
      about: "About Me",
      experience: "Experience & Education",
      research: "Current Research & Projects",
      vision: "Future Vision",
      skills: "Skills & Certificates",
      contact: "Get In Touch",
      cv: "Curriculum Vitae"
    },
    aboutMe: [
      "Hello! I am Md Sazzad Hossain, a highly motivated international scholar from Bangladesh, currently in the final semester of my sophomore year (2nd year) pursuing a B.Sc. in Biotechnology at the College of Life Sciences, Guizhou University, China, fully supported by a University Scholarship. My academic journey is driven by a deep fascination with the fundamental mechanisms of life and how we can engineer them to solve pressing global challenges.",
      "As an undergraduate, I believe the future of biology lies at the intersection of traditional experiments and modern computational power. Currently, I am actively laying the groundwork for my graduation thesis by engaging in two distinct yet complementary research domains under the guidance of my professors. On the wet-lab front, I am exploring the functional properties and multi-scale structure of Resistant Starch (RS) in Lilium species for functional food applications. Simultaneously, on the dry-lab front, I am immersing myself in the cutting-edge field of AI for Science (AI4S), learning to leverage artificial intelligence, large language models, and multi-agent frameworks for de novo drug and peptide design.",
      "Looking ahead, my ultimate lifelong dream is to pursue a Master’s and Ph.D. focusing on advanced plant genetics using CRISPR-Cas technology. Coming from Bangladesh—a country on the frontlines of climate change and rising soil salinity—I am deeply passionate about engineering climate-resilient and salt-tolerant crop varieties. My long-term vision is to bring these sustainable agricultural innovations back to my home country, ensuring regional food security and making a tangible impact on human lives. I am always eager to learn, collaborate, and push the boundaries of what biotechnology can achieve."
    ],
    visionText: {
      subtitle: "Engineering Climate-Resilient Crops with CRISPR-Cas to Produce Sustainable Agricultural Crops",
      p1: "While my current undergraduate research builds a strong interdisciplinary foundation in wet-lab biology and computational AI, my ultimate scientific ambition is deeply rooted in plant biotechnology and global food security. Growing up in Bangladesh—a nation on the frontlines of climate change and rapidly rising soil salinity—I have witnessed firsthand the devastating impact of environmental stress on agriculture. This reality has shaped my lifelong goal: to develop resilient, sustainable food systems for vulnerable communities.",
      p2: "For my future Master's and Ph.D. research, I am determined to harness the transformative precision of CRISPR-Cas gene-editing technology. My focus will be on decoding and reprogramming plant genetics to engineer robust crop varieties capable of withstanding severe abiotic stresses, particularly salt toxicity and drought. Rather than merely observing how plants react to harsh environments, I want to proactively edit their genetic makeup for enhanced survival and adaptability.",
      p3: "My ultimate vision goes beyond the laboratory. I aim to bridge the gap between cutting-edge genetic engineering and real-world farming. By developing high-yield, climate-resilient crops, my dream is to bring these vital biotechnological innovations back to my home country, ensuring regional food security and empowering the next generation of sustainable agriculture worldwide."
    },
    contactDesc: "I am always open to discussing research opportunities, collaborations, or simply connecting with fellow science enthusiasts.",
    researchTabs: {
      interests: "Research Interests",
      projects: "Projects",
      current: "Current Projects"
    },
    skillsTabs: {
      skills: "Skills",
      certificates: "Certificates",
      extracurriculars: "Extracurriculars"
    },
    contactInfoLabel: "Contact Information",
    skillModal: {
      learnedFrom: "Learned from:",
      visitPlatform: "Visit Platform",
      aboutSkill: "About this Skill",
      videoRef: "Video Reference"
    },
    contactForm: {
      emailAddresses: "Email Addresses",
      firstName: "First Name",
      email: "Email Address",
      message: "Message / Comment",
      send: "Send Message",
      socialProfiles: "Social Profiles",
      wechat: "WeChat",
      wechatId: "WeChat ID",
      phone: "Phone",
      china: "China"
    },
    currentProjects: {
      p1: {
        badge: "Manuscript in Preparation",
        title: "Biochemical Characterization of Amylase Kinetics",
        focusLabel: "Focus:",
        focusText: "Salivary α-amylase regulation, thermal denaturation, allosteric activation, and heavy metal inhibition.",
        desc: "Conducted wet-lab experiments and comprehensive data analysis to evaluate enzyme kinetics using the DNS colorimetric method. Currently synthesizing findings into a scientific review article.",
        tags: ["Wet-lab", "Data Analysis", "Enzyme Kinetics", "Scientific Writing"]
      },
      p2: {
        title: "dsRNA Efficacy Predictor",
        focusLabel: "Focus:",
        focusText: "AI-powered dsRNA silencing efficacy prediction for RNAi biopesticide design.",
        desc: "Developed a computational tool utilizing Graph Neural Networks (GNN) to predict dsRNA knockdown efficiency. This project aims to accelerate the design of effective RNAi-based biopesticides.",
        tags: ["Graph Neural Networks", "RNAi", "Biopesticide Design", "AI/ML"]
      },
      p3: {
        title: "GNN for Molecular Property Prediction",
        badge: "Ongoing Project",
        focusLabel: "Focus:",
        focusText: "AI4S approach utilizing Graph Neural Networks to extract structural features from molecular graphs.",
        desc: "Implemented foundational GNN architectures for accurate prediction of molecular properties. Designed to demonstrate computational modeling to reduce initial lab screening in drug discovery.",
        tags: ["Ongoing Project", "GNN", "Cheminformatics", "AI4S"]
      },
      p4: {
        badge: "Lab Report Completed",
        title: "Lab 1: Plant Genomic DNA Extraction",
        focusLabel: "Focus:",
        focusText: "Comparing commercial kit vs rapid NaOH extraction methods on Nicotiana benthamiana.",
        desc: "Evaluated DNA quantity & purity via NanoDrop and Agarose Gel Electrophoresis to determine optimal isolation pathways for specific downstream molecular applications.",
        tags: ["Genomic DNA", "NanoDrop", "AGE"],
        linkText: "View Lab 1 Report"
      },
      p5: {
        badge: "Lab Report Completed",
        title: "Lab 2: PCR Amplification & Purification",
        focusLabel: "Focus:",
        focusText: "Targeting and amplifying the NbActin-97 gene directly from previously extracted plant genomic DNA.",
        desc: "Validated specific primer designs via PCR and prepared high-quality target DNA amplicons (545 bp) utilizing spin-column gel extraction techniques for vector assembly.",
        tags: ["PCR Design", "Primer Validation", "Gel Extraction"],
        linkText: "View Lab 2 Report"
      }
    }
  },
  bn: {
    nav: { home: 'হোম', about: 'সম্পর্কে', cv: 'সিভি', research: 'গবেষণা', vision: 'ভিশন', skills: 'দক্ষতা ও সনদ', contact: 'যোগাযোগ' },
    hero: {
      name: "মোঃ সাজ্জাদ হোসেন",
      subtitle: `"বায়োটেকনোলজি আন্ডারগ্র্যাজুয়েট স্কলার | গুইঝু বিশ্ববিদ্যালয় (贵州大学), চীন | এআই ফর সায়েন্স (AI4S)-এর সাথে প্ল্যান্ট বায়োলজির সেতুবন্ধন | ক্রিসপার-ক্যাস (CRISPR-Cas) এর মাধ্যমে টেকসই কৃষিতে উদ্ভাবনের লক্ষ্যে নিবেদিত।"`,
      getInTouch: "যোগাযোগ করুন",
      viewResearch: "গবেষণা দেখুন"
    },
    sections: {
      about: "আমার সম্পর্কে",
      experience: "অভিজ্ঞতা ও শিক্ষা",
      research: "বর্তমান গবেষণা ও প্রজেক্ট",
      vision: "আগামীর রূপকল্প (ভিশন)",
      skills: "দক্ষতা ও সনদ",
      contact: "যোগাযোগ করুন",
      cv: "জীবন বৃত্তান্ত (CV)"
    },
    aboutMe: [
      "হ্যালো! আমি মোঃ সাজ্জাদ হোসেন, বাংলাদেশ থেকে আগত একজন অত্যন্ত অনুপ্রাণিত আন্তর্জাতিক শিক্ষার্থী। বর্তমানে আমি চীন সরকারের একটি পূর্ণাঙ্গ বিশ্ববিদ্যালয় স্কলারশিপের অধীনে গুইঝু বিশ্ববিদ্যালয়ের (Guizhou University) জীবন বিজ্ঞান কলেজে (College of Life Sciences) বায়োটেকনোলজিতে বি.এসসি. (B.Sc.) ডিগ্রির দ্বিতীয় বর্ষের (Sophomore year) শেষ সেমিস্টারে অধ্যয়নরত আছি। আমার প্রাতিষ্ঠানিক পথচলা মূলত জীবনের মৌলিক প্রক্রিয়াগুলো এবং কীভাবে সেগুলোকে ইঞ্জিনিয়ারিংয়ের মাধ্যমে বিশ্বব্যাপী বিভিন্ন চ্যালেঞ্জ সমাধানে কাজে লাগানো যায়, সে সম্পর্কে গভীর আগ্রহ থেকে অনুপ্রাণিত।",
      "একজন আন্ডারগ্র্যাজুয়েট হিসেবে আমি বিশ্বাস করি, জীববিজ্ঞানের ভবিষ্যৎ প্রথাগত ল্যাবরেটরি পরীক্ষা এবং আধুনিক কম্পিউটেশনাল ক্ষমতার সমন্বয়ের ওপর নির্ভরশীল। বর্তমানে, আমি আমার অধ্যাপকদের নির্দেশনায় দুটি ভিন্ন কিন্তু একে অপরের পরিপূরক গবেষণাক্ষেত্রে কাজ করে আমার স্নাতক থিসিসের ভিত্তি তৈরি করছি। ওয়েট-ল্যাবের দিকে, আমি ফাংশনাল ফুড বা স্বাস্থ্যকর খাবারের প্রয়োগের জন্য লিলিয়াম প্রজাতির (Lilium species) রেজিস্ট্যান্ট স্টার্চের (Resistant Starch) কার্যকরী বৈশিষ্ট্য এবং মাল্টি-স্কেল স্ট্রাকচার নিয়ে অনুসন্ধান করছি। পাশাপাশি, ড্রাই-ল্যাবের দিকে, আমি এআই ফর সায়েন্স (AI4S) এর অত্যাধুনিক ক্ষেত্রে যুক্ত হয়েছি; যেখানে আর্টিফিশিয়াল ইন্টেলিজেন্স, লার্জ ল্যাঙ্গুয়েজ মডেল এবং মাল্টি-এজেন্ট ফ্রেমওয়ার্ক ব্যবহার করে কীভাবে নতুন করে ঔষধ (drug) এবং পেপটাইড ডিজাইন করা যায়, তা শিখছি।",
      "ভবিষ্যতের কথা ভাবলে আমার সারাজীবনের স্বপ্ন হলো ক্রিসপার-ক্যাস (CRISPR-Cas) প্রযুক্তি ব্যবহার করে অ্যাডভান্সড প্ল্যান্ট জেনেটিক্স নিয়ে একটি মাস্টার্স এবং পিএইচ.ডি. করা। যেহেতু আমি বাংলাদেশ থেকে এসেছি—যে দেশটি জলবায়ু পরিবর্তন এবং ক্রমবর্ধমান মাটির লবণাক্ততার কারণে সরাসরি ক্ষতিগ্রস্ত হচ্ছে—তাই জলবায়ু-সহনশীল এবং লবণ-সহনশীল ফসল উদ্ভাবনের প্রতি আমার গভীর আগ্রহ রয়েছে। আমার দীর্ঘমেয়াদী লক্ষ্য হলো, এই টেকসই কৃষিজ উদ্ভাবনগুলো আমার নিজ দেশে নিয়ে যাওয়া, যা আঞ্চলিক খাদ্য নিরাপত্তা নিশ্চিত করার পাশাপাশি মানুষের জীবনে দীর্ঘমেয়াদী ইতিবাচক প্রভাব বিস্তার করবে। আমি সবসময়ই নতুন কিছু শিখতে, যৌথভাবে কাজ করতে এবং বায়োটেকনোলজির উদ্ভাবনী ক্ষমতা কাজে লাগিয়ে আরও নতুন সম্ভাবনা খুঁজে বের করতে উদগ্রীব।"
    ],
    visionText: {
      subtitle: "টেকসই কৃষিক্ষেত্রে ক্রিসপার-ক্যাস (CRISPR-Cas) প্রযুক্তি ব্যবহার করে জলবায়ু-সহনশীল ফসলের উদ্ভাবন",
      p1: "যদিও আমার বর্তমান স্নাতক গবেষণাগুলো ওয়েট-ল্যাব বায়োলজি এবং কম্পিউটেশনাল এআই-এর সমন্বয়ে একটি শক্তিশালী আন্তঃবিভাগীয় ভিত্তি তৈরি করছে, তবুও আমার চূড়ান্ত বৈজ্ঞানিক লক্ষ্য গভীরভাবে প্ল্যান্ট বায়োটেকনোলজি এবং বিশ্বব্যাপী খাদ্য নিরাপত্তার সাথে যুক্ত। আমি বাংলাদেশে বেড়ে উঠেছি—যে দেশটি জলবায়ু পরিবর্তন এবং দ্রুত বৃদ্ধি পাওয়া মাটির লবণাক্ততার সরাসরি ঝুঁকির মুখে রয়েছে। সেখানে আমি নিজের চোখে দেখেছি কীভাবে প্রতিকূল পরিবেশ কৃষিতে ধ্বংসাত্মক প্রভাব ফেলে। এই বাস্তব অভিজ্ঞতাটি আমার জীবনের দীর্ঘমেয়াদী লক্ষ্য স্থির করেছে: ঝুঁকিপূর্ণ জনগোষ্ঠীর জন্য সহনশীল এবং টেকসই খাদ্য প্রণালী তৈরি করা।",
      p2: "ভবিষ্যতে মাস্টার্স এবং পিএইচ.ডি. গবেষণার জন্য, আমি ক্রিসপার-ক্যাস (CRISPR-Cas) জিন-এডিটিং প্রযুক্তির অভাবনীয় নির্ভুলতাকে কাজে লাগাতে দৃঢ়প্রতিজ্ঞ। আমার মূল মনোযোগ থাকবে উদ্ভিদের জেনেটিক্স ডিকোড এবং রি-প্রোগ্রামিং করার দিকে; যাতে এমন শক্তিশালী ফসলের প্রজাতি তৈরি করা যায়, যা পরিবেশের তীব্র প্রতিকূল অবস্থা, বিশেষত অতিরিক্ত লবণাক্ততা এবং খরা সহ্য করতে পারে। বিভিন্ন প্রতিকূল পরিবেশে উদ্ভিদ কীভাবে প্রতিক্রিয়া দেখায়, কেবল তা পর্যবেক্ষণ করার পরিবর্তে, আমি তাদের টিকে থাকার ক্ষমতা এবং অভিযোজনশীলতা বাড়ানোর জন্য জিনগত বৈশিষ্ট্যগুলো সক্রিয়ভাবে পরিবর্তন (এডিট) করতে চাই।",
      p3: "আমার এই চিন্তাধারার প্রসার কেবল গবেষণাগারেই সীমাবদ্ধ নয়। আমি সর্বাধুনিক জেনেটিক ইঞ্জিনিয়ারিং এবং বাস্তবসম্মত কৃষিকাজের মধ্যে যে দূরত্ব রয়েছে, তা দূর করতে চাই। উচ্চ ফলনশীল ও জলবায়ু-সহনশীল ফসল উৎপাদনের মাধ্যমে, আমার স্বপ্ন হলো এই অতি গুরুত্বপূর্ণ বায়োটেকনোলজিকাল উদ্ভাবনগুলোকে আমার নিজ দেশে ফিরিয়ে নিয়ে আসা; যাতে তা আঞ্চলিক খাদ্য নিরাপত্তা নিশ্চিত করতে পারে এবং বিশ্বব্যাপী ভবিষ্যৎ প্রজন্মকে টেকসই কৃষির পথে এগিয়ে নিতে সাহায্য করে।"
    },
    contactDesc: "আমি সর্বদা গবেষণার সুযোগ, যৌথ উদ্যোগ বা আমার মতো বিজ্ঞান-অনুরাগীদের সাথে যুক্ত হতে এবং আলোচনা করতে আগ্রহী।",
    researchTabs: {
      interests: "গবেষণায় আগ্রহ",
      projects: "প্রজেক্টসমূহ",
      current: "বর্তমান প্রজেক্টসমূহ"
    },
    skillsTabs: {
      skills: "দক্ষতা",
      certificates: "সনদপত্র",
      extracurriculars: "সহশিক্ষামূলক কার্যক্রম"
    },
    contactInfoLabel: "যোগাযোগের তথ্য",
    skillModal: {
      learnedFrom: "শিখেছি:",
      visitPlatform: "প্লাটফর্ম ভিজিট করুন",
      aboutSkill: "এই স্কিল সম্পর্কে",
      videoRef: "ভিডিও রেফারেন্স"
    },
    contactForm: {
      emailAddresses: "ইমেইল ঠিকানাসমূহ",
      firstName: "নাম",
      email: "ইমেইল ঠিকানা",
      message: "বার্তা / মন্তব্য",
      send: "বার্তা পাঠান",
      socialProfiles: "সামাজিক মাধ্যমসমূহ",
      wechat: "উইচ্যাট (WeChat)",
      wechatId: "উইচ্যাট আইডি (WeChat ID)",
      phone: "ফোন",
      china: "চীন"
    },
    currentProjects: {
      p1: {
        badge: "পাণ্ডুলিপি প্রস্তুত করা হচ্ছে",
        title: "অ্যামাইলেজ কাইনেটিক্সের বায়োকেমিক্যাল ক্যারেক্টারাইজেশন",
        focusLabel: "ফোকাস:",
        focusText: "স্যালিভারি α-অ্যামাইলেজ রেগুলেশন, থার্মাল ডিন্যাচারেশন, অ্যালোস্টেরিক অ্যাক্টিভেশন এবং হেভি মেটাল ইনহিবিশন।",
        desc: "DNS কলোরিমেট্রিক পদ্ধতি ব্যবহার করে এনজাইম কাইনেটিক্স মূল্যায়ন করার জন্য ওয়েট-ল্যাব পরীক্ষা এবং বিস্তৃত ডেটা বিশ্লেষণ করেছি। বর্তমানে ফলাফলগুলোকে একটি বৈজ্ঞানিক পর্যালোচনা প্রবন্ধে সংশ্লেষিত করছি।",
        tags: ["ওয়েট-ল্যাব", "ডেটা অ্যানালাইসিস", "এনজাইম কাইনেটিক্স", "সায়েন্টিফিক রাইটিং"]
      },
      p2: {
        title: "dsRNA কার্যক্ষমতা ভবিষ্যদ্বাণীকারী টুল",
        focusLabel: "ফোকাস:",
        focusText: "RNAi বায়োপেস্টিসাইড ডিজাইনের জন্য এআই-নির্ভর dsRNA সাইলেন্সিং কার্যকারিতার ভবিষ্যদ্বাণী।",
        desc: "dsRNA-এর নকডাউন কার্যকারিতা ভবিষ্যদ্বাণী করতে গ্রাফ নিউরাল নেটওয়ার্ক (GNN) ব্যবহার করে একটি কম্পিউটেশনাল টুল ডেভেলপ করেছি। এই প্রকল্পের উদ্দেশ্য হলো কার্যকর RNAi-ভিত্তিক বায়োপেস্টিসাইড ডিজাইন করাকে ত্বরান্বিত করা।",
        tags: ["গ্রাফ নিউরাল নেটওয়ার্ক", "RNAi", "বায়োপেস্টিসাইড ডিজাইন", "এআই/এমএল"]
      },
      p3: {
        title: "আণবিক বৈশিষ্ট্য ভবিষ্যদ্বাণীর জন্য GNN",
        badge: "চলমান প্রকল্প",
        focusLabel: "ফোকাস:",
        focusText: "আণবিক গ্রাফগুলো থেকে কাঠামোগত বৈশিষ্ট্যগুলো বের করার জন্য গ্রাফ নিউরাল নেটওয়ার্ক ব্যবহার করে AI4S অ্যাপ্রোচ।",
        desc: "আণবিক বৈশিষ্ট্যের নির্ভুল ভবিষ্যদ্বাণীর জন্য ভিত্তিভূত GNN আর্কিটেকচার বাস্তবায়ন করেছি। এটি ড্রাগ আবিষ্কারে প্রাথমিক ল্যাব স্ক্রিনিং কমানোর জন্য কম্পিউটেশনাল মডেলিং প্রদর্শনে সাহায্য করার জন্য ডিজাইন করা হয়েছে।",
        tags: ["চলমান প্রকল্প", "GNN", "কেমইনফরমেটিক্স", "AI4S"]
      },
      p4: {
        badge: "ল্যাব রিপোর্ট সম্পূর্ণ",
        title: "ল্যাব ১: প্ল্যান্ট জিনোমিক ডিএনএ নিষ্কাশন",
        focusLabel: "ফোকাস:",
        focusText: "নিকোটিয়ানা বেন্থামিয়ানা (Nicotiana benthamiana)-এর ওপর বাণিজ্যিক কিট এবং র‍্যাপিড NaOH নিষ্কাশন পদ্ধতির তুলনা করা।",
        desc: "পরবর্তী আণবিক অ্যাপ্লিকেশনগুলোর জন্য সর্বোত্তম নিষ্কাশনের পথ নির্ধারণ করতে ন্যানোড্রপ এবং অ্যাগারোজ জেল ইলেক্ট্রোফোরেসিস এর মাধ্যমে ডিএনএ এর পরিমাণ এবং বিশুদ্ধতা মূল্যায়ন করেছি।",
        tags: ["জিনোমিক ডিএনএ", "ন্যানোড্রপ", "অ্যাগারোজ জেল (AGE)"],
        linkText: "ল্যাব ১ এর রিপোর্ট দেখুন"
      },
      p5: {
        badge: "ল্যাব রিপোর্ট সম্পূর্ণ",
        title: "ল্যাব ২: পিসিআর পরিবর্ধন ও বিশুদ্ধকরণ",
        focusLabel: "ফোকাস:",
        focusText: "পূর্বে নিষ্কাশিত উদ্ভিদের জিনোমিক ডিএনএ থেকে সরাসরি NbActin-97 জিনটিকে টার্গেট এবং অ্যামপ্লিফাই করা।",
        desc: "পিসিআর-এর মাধ্যমে প্রাইমার ডিজাইনগুলো বৈধ করেছি এবং স্পিন-কলাম জেল এক্সট্র্যাকশন প্রযুক্তি ব্যবহার করে ভেক্টর অ্যাসেম্বলির জন্য উচ্চ-মানের টার্গেট ডিএনএ অ্যামপ্লিকনস (545 bp) প্রস্তুত করেছি।",
        tags: ["পিসিআর ডিজাইন", "প্রাইমার ভ্যালিডেশন", "জেল এক্সট্র্যাকশন"],
        linkText: "ল্যাব ২ এর রিপোর্ট দেখুন"
      }
    }
  },
  zh: {
    nav: { home: '首页', about: '关于我', cv: '简历', research: '研究', vision: '愿景', skills: '技能与证书', contact: '联系' },
    hero: {
      name: "穆罕默德·萨贾德·霍山",
      subtitle: `"生物技术本科生 | 贵州大学 (Guizhou University)，中国贵州 | 将湿实验室植物生物学与人工智能科学 (AI4S) 相结合 | 致力于通过 CRISPR-Cas 创新可持续农业。"`,
      getInTouch: "联系我",
      viewResearch: "查看研究"
    },
    sections: {
      about: "关于我",
      experience: "经验与教育",
      research: "当前研究与项目",
      vision: "未来愿景",
      skills: "技能与证书",
      contact: "取得联系",
      cv: "个人简历"
    },
    aboutMe: [
      "您好！我是 Md Sazzad Hossain，一名来自孟加拉国、充满动力的国际学者。目前，我在中国贵州大学生命科学学院攻读生物技术理学学士学位，正处于大二（二年级）的最后一个学期，并获得了全额大学奖学金的支持。我的学术追求源于对生命基本机制的浓厚兴趣，以及如何通过生物工程来解决紧迫的全球性挑战。",
      "作为一名本科生，我相信生物学的未来在于传统实验与现代计算能力的结合。目前，在教授们的指导下，我正积极参与两个不同但互补的研究领域，为我的毕业论文打下基础。在湿实验方面，我正在探索百合科植物中抗性淀粉 (RS) 的功能特性和多尺度结构，以应用于功能性食品。同时，在干实验方面，我正沉浸于最前沿的人工智能科学 (AI4S) 领域，学习如何利用人工智能、大型语言模型和多智能体框架来进行从头药物和多肽设计。",
      "展望未来，我一生的梦想是攻读硕士和博士学位，专注于利用 CRISPR-Cas 技术进行高级植物遗传学研究。我来自孟加拉国——一个处于气候变化和土壤盐渍化加剧前线的国家，因此我非常热衷于培育适应气候变化和耐盐的农作物品种。我的长期愿景是将这些可持续的农业创新带回我的祖国，确保地区粮食安全，并对人类生活产生实质性的影响。我始终渴望学习、合作，并不断拓展生物技术所能达到的边界。"
    ],
    visionText: {
      subtitle: "利用 CRISPR-Cas 技术培育耐候性作物，发展可持续农业",
      p1: "虽然我目前的本科研究在湿实验生物学和计算人工智能方面打下了坚实的跨学科基础，但我的最高科学抱负深植于植物生物技术和全球粮食安全。我在孟加拉国长大——这是一个处于气候变化和土壤盐渍化迅速恶化前线的国家——我亲眼目睹了环境压力对农业的毁灭性影响。这一现实塑造了我一生的目标：为脆弱的社区开发具有韧性的可持续粮食系统。",
      p2: "在未来的硕士和博士研究中，我决心利用 CRISPR-Cas 基因编辑技术的变革性精度。我的重点将放在解码和重新编程植物遗传学上，以培育能够承受严重非生物胁迫（特别是盐害和干旱）的健壮作物品种。我不想仅仅观察植物对恶劣环境的反应，而是希望主动编辑它们的基因组成，以增强其生存能力和适应性。",
      p3: "我的最终愿景超越了实验室。我的目标是弥合尖端基因工程与现实世界农业之间的差距。通过培育高产、耐候的作物，我的梦想是将这些关键的生物技术创新带回我的祖国，确保地区粮食安全，并在世界范围内助力下一代发展可持续农业。"
    },
    contactDesc: "我随时愿意探讨研究机会、合作，或者仅仅是与其他科学爱好者建立联系。",
    researchTabs: {
      interests: "研究兴趣",
      projects: "项目",
      current: "当前项目"
    },
    skillsTabs: {
      skills: "技能",
      certificates: "证书",
      extracurriculars: "课外活动"
    },
    contactInfoLabel: "联系信息",
    skillModal: {
      learnedFrom: "学习平台:",
      visitPlatform: "访问平台",
      aboutSkill: "关于此技能",
      videoRef: "参考视频"
    },
    contactForm: {
      emailAddresses: "电子邮件地址",
      firstName: "名字",
      email: "电子邮件地址",
      message: "留言 / 评论",
      send: "发送信息",
      socialProfiles: "社交媒体档案",
      wechat: "微信",
      wechatId: "微信号",
      phone: "电话",
      china: "中国"
    },
    currentProjects: {
      p1: {
        badge: "手稿准备中",
        title: "淀粉酶动力学的生化表征",
        focusLabel: "研究重点:",
        focusText: "唾液 α-淀粉酶的调节、热变性、别构激活及重金属抑制。",
        desc: "使用 DNS 比色法进行了湿实验和全面的数据分析，以评估酶动力学。目前正在将研究结果综合成一篇科学综述文章。",
        tags: ["湿实验", "数据分析", "酶动力学", "科学写作"]
      },
      p2: {
        title: "dsRNA 功效预测工具",
        focusLabel: "研究重点:",
        focusText: "用于 RNAi 生物农药设计的 AI 驱动 dsRNA 沉默功效预测。",
        desc: "开发了利用图神经网络 (GNN) 预测 dsRNA 敲低效率的计算工具。该项目旨在加速有效的基于 RNAi 的生物农药设计。",
        tags: ["图神经网络", "RNAi", "生物农药设计", "人工智能/机器学习"]
      },
      p3: {
        title: "用于分子特性预测的 GNN",
        badge: "正在进行的项目",
        focusLabel: "研究重点:",
        focusText: "利用图神经网络从分子图中提取结构特征的 AI4S 方法。",
        desc: "实现了准确预测分子特性的基础 GNN 架构。旨在展示计算建模如何减少药物发现中的初始实验室筛选。",
        tags: ["正在进行的项目", "GNN", "化学信息学", "AI4S"]
      },
      p4: {
        badge: "实验报告已完成",
        title: "实验 1：植物基因组 DNA 提取",
        focusLabel: "研究重点:",
        focusText: "比较本氏烟草（Nicotiana benthamiana）的商业试剂盒提取法与快速 NaOH 提取法。",
        desc: "通过 NanoDrop 和琼脂糖凝胶电泳评估 DNA 数量和纯度，以确定特定下游分子应用的最佳分离途径。",
        tags: ["基因组 DNA", "NanoDrop", "琼脂糖凝胶电泳"],
        linkText: "查看实验 1 报告"
      },
      p5: {
        badge: "实验报告已完成",
        title: "实验 2：PCR 扩增与纯化",
        focusLabel: "研究重点:",
        focusText: "直接从先前提取的植物基因组 DNA 中靶向并扩增 NbActin-97 基因。",
        desc: "通过 PCR 验证了特异性引物设计，并利用离心柱凝胶提取技术为载体组装制备了高质量的靶 DNA 扩增子 (545 bp)。",
        tags: ["PCR 设计", "引物验证", "凝胶提取"],
        linkText: "查看实验 2 报告"
      }
    }
  }
};

// ============================================================================
// 📝 EDITABLE DATA SECTION
// You can easily add, remove, or edit your certificates and extracurriculars here.
// ============================================================================

const CERTIFICATES = [
  {
    id: 1,
    title: {
      en: "A complete guide to the key components of a research article",
      bn: "একটি গবেষণা প্রবন্ধের মূল উপাদানগুলোর সম্পূর্ণ নির্দেশিকা",
      zh: "研究论文关键组成部分的完整指南"
    },
    issuer: {
      en: "Wiley Researcher Academy",
      bn: "উইলি রিসার্চার একাডেমি",
      zh: "Wiley 研究员学院"
    },
    university: {
      en: "Wiley",
      bn: "উইলি",
      zh: "Wiley"
    },
    instructor: {
      en: "Wiley Researcher Academy",
      bn: "উইলি রিসার্চার একাডেমি",
      zh: "Wiley 研究员学院"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_1.jpg`,
    link: "https://researcheracademy.wiley.com/"
  },
  {
    id: 2,
    title: {
      en: "Introduction to Algae",
      bn: "শৈবাল পরিচিতি",
      zh: "藻类学入门"
    },
    issuer: {
      en: "Coursera",
      bn: "কোরসেরা",
      zh: "Coursera"
    },
    university: {
      en: "University of California San Diego",
      bn: "ইউনিভার্সিটি অফ ক্যালিফোর্নিয়া সান দিয়েগো",
      zh: "加州大学圣地亚哥分校"
    },
    instructor: {
      en: "Stephen P. Mayfield, Ph.D.",
      bn: "স্টিফেন পি. মেফিল্ড, পিএইচডি",
      zh: "Stephen P. Mayfield 博士"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_2.jpg`,
    link: "https://www.coursera.org/learn/algae"
  },
  {
    id: 3,
    title: {
      en: "Microbiology Foundations",
      bn: "মাইক্রোবায়োলজি ফাউন্ডেশন",
      zh: "微生物学基础"
    },
    issuer: {
      en: "Coursera",
      bn: "কোরসেরা",
      zh: "Coursera"
    },
    university: {
      en: "Lecturio",
      bn: "লেকচুরিও",
      zh: "Lecturio"
    },
    instructor: {
      en: "Stefan Wisbauer, Pascal Bendien",
      bn: "স্টেফান উইসব্যাওয়ার, প্যাসকাল বেন্ডিয়েন",
      zh: "Stefan Wisbauer, Pascal Bendien"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_3.jpg`,
    link: "https://www.coursera.org/learn/microbiology-foundations"
  },
  {
    id: 4,
    title: {
      en: "Using Python to Access Web Data",
      bn: "ওয়েব ডেটা অ্যাক্সেস করতে পাইথনের ব্যবহার",
      zh: "使用 Python 访问网络数据"
    },
    issuer: {
      en: "Coursera",
      bn: "কোরসেরা",
      zh: "Coursera"
    },
    university: {
      en: "University of Michigan",
      bn: "মিশিগান বিশ্ববিদ্যালয়",
      zh: "密歇根大学"
    },
    instructor: {
      en: "Charles Severance",
      bn: "চার্লস সেভেরেন্স",
      zh: "Charles Severance"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_4.jpg`,
    link: "https://www.coursera.org/learn/python-network-data"
  },
  {
    id: 5,
    title: {
      en: "Programming for Everybody (Getting Started with Python)",
      bn: "সবার জন্য প্রোগ্রামিং (পাইথন শুরু করা)",
      zh: "大众编程（Python 入门）"
    },
    issuer: {
      en: "Coursera",
      bn: "কোরসেরা",
      zh: "Coursera"
    },
    university: {
      en: "University of Michigan",
      bn: "মিশিগান বিশ্ববিদ্যালয়",
      zh: "密歇根大学"
    },
    instructor: {
      en: "Charles Severance",
      bn: "চার্লস সেভেরেন্স",
      zh: "Charles Severance"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_5.jpg`,
    link: "https://www.coursera.org/learn/python"
  },
  {
    id: 6,
    title: {
      en: "Python Data Structures",
      bn: "পাইথন ডেটা স্ট্রাকচারস",
      zh: "Python 数据结构"
    },
    issuer: {
      en: "Coursera",
      bn: "কোরসেরা",
      zh: "Coursera"
    },
    university: {
      en: "University of Michigan",
      bn: "মিশিগান বিশ্ববিদ্যালয়",
      zh: "密歇根大学"
    },
    instructor: {
      en: "Charles Severance",
      bn: "চার্লস সেভেরেন্স",
      zh: "Charles Severance"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_6.jpg`,
    link: "https://www.coursera.org/learn/python-data"
  },
  {
    id: 7,
    title: {
      en: "The why and how of data visualization",
      bn: "ডেটা ভিজ্যুয়ালাইজেশনের কারণ এবং উপায়",
      zh: "数据可视化的为何与如何"
    },
    issuer: {
      en: "Elsevier Researcher Academy",
      bn: "এলসেভিয়ার রিসার্চার একাডেমি",
      zh: "爱思唯尔研究员学院"
    },
    university: {
      en: "Elsevier",
      bn: "এলসেভিয়ার",
      zh: "爱思唯尔"
    },
    instructor: {
      en: "Dr Robert Kosara",
      bn: "ডঃ রবার্ট কোসারা",
      zh: "Robert Kosara 博士"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_7.jpg`,
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 8,
    title: {
      en: "Data visualization and choosing the right plot",
      bn: "ডেটা ভিজ্যুয়ালাইজেশন এবং সঠিক প্লট বেছে নেওয়া",
      zh: "数据可视化与选择合适的图表"
    },
    issuer: {
      en: "Elsevier Researcher Academy",
      bn: "এলসেভিয়ার রিসার্চার একাডেমি",
      zh: "爱思唯尔研究员学院"
    },
    university: {
      en: "Elsevier",
      bn: "এলসেভিয়ার",
      zh: "爱思唯尔"
    },
    instructor: {
      en: "Dr Robert Kosara",
      bn: "ডঃ রবার্ট কোসারা",
      zh: "Robert Kosara 博士"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_8.jpg`,
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 9,
    title: {
      en: "How to design effective figures for review articles",
      bn: "পর্যালোচনা নিবন্ধের জন্য কার্যকর চিত্র কীভাবে ডিজাইন করবেন",
      zh: "如何为综述文章设计有效的图表"
    },
    issuer: {
      en: "Elsevier Researcher Academy",
      bn: "এলসেভিয়ার রিসার্চার একাডেমি",
      zh: "爱思唯尔研究员学院"
    },
    university: {
      en: "Elsevier",
      bn: "এলসেভিয়ার",
      zh: "爱思唯尔"
    },
    instructor: {
      en: "Tom Dursch, Matt Pavlovich, Stacey Chin",
      bn: "টম ডার্চ, ম্যাট পাভলোভিচ, স্টেসি চিন",
      zh: "Tom Dursch, Matt Pavlovich, Stacey Chin"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_9.jpg`,
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 10,
    title: {
      en: "How to enhance your chances of serendipitous research discovery",
      bn: "আকস্মিক গবেষণা আবিষ্কারের সম্ভাবনা কীভাবে বাড়ানো যায়",
      zh: "如何提高研究中意外发现的机会"
    },
    issuer: {
      en: "Elsevier Researcher Academy",
      bn: "এলসেভিয়ার রিসার্চার একাডেমি",
      zh: "爱思唯尔研究员学院"
    },
    university: {
      en: "Elsevier",
      bn: "এলসেভিয়ার",
      zh: "爱思唯尔"
    },
    instructor: {
      en: "Rachel Herbert",
      bn: "র‍্যাচেল হার্বার্ট",
      zh: "Rachel Herbert"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_10.jpg`,
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 11,
    title: {
      en: "Gen AI use in the research workflow",
      bn: "গবেষণার কাজে জেনারেটিভ এআই-এর ব্যবহার",
      zh: "生成式 AI 在研究工作流中的应用"
    },
    issuer: {
      en: "Elsevier Researcher Academy",
      bn: "এলসেভিয়ার রিসার্চার একাডেমি",
      zh: "爱思唯尔研究员学院"
    },
    university: {
      en: "Elsevier",
      bn: "এলসেভিয়ার",
      zh: "爱思唯尔"
    },
    instructor: {
      en: "Elisenda Aguilera-Cora, Doug Feldner",
      bn: "এলিসেন্ডা অ্যাগুইলেরা-কোরা, ডগ ফেল্ডনার",
      zh: "Elisenda Aguilera-Cora, Doug Feldner"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_11.jpg`,
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 12,
    title: {
      en: "Guide to reference managers: How to effectively manage your references",
      bn: "রেফারেন্স ম্যানেজারের নির্দেশিকা: কার্যকরভাবে রেফারেন্স পরিচালনা",
      zh: "文献管理工具指南：如何有效管理参考文献"
    },
    issuer: {
      en: "Elsevier Researcher Academy",
      bn: "এলসেভিয়ার রিসার্চার একাডেমি",
      zh: "爱思唯尔研究员学院"
    },
    university: {
      en: "Elsevier",
      bn: "এলসেভিয়ার",
      zh: "爱思唯尔"
    },
    instructor: {
      en: "Jorge Sinval, Daniel Christe",
      bn: "জর্জ সিনভাল, ড্যানিয়েল ক্রিস্টে",
      zh: "Jorge Sinval, Daniel Christe"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_12.jpg`,
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 13,
    title: {
      en: "How to integrate sex, gender, and intersectional analysis into research",
      bn: "কীভাবে গবেষণায় লিঙ্গ ও আন্তঃবিভাগীয় বিশ্লেষণ অন্তর্ভুক্ত করবেন",
      zh: "如何将性别和交叉分析整合到研究中"
    },
    issuer: {
      en: "Elsevier Researcher Academy",
      bn: "এলসেভিয়ার রিসার্চার একাডেমি",
      zh: "爱思唯尔研究员学院"
    },
    university: {
      en: "Elsevier",
      bn: "এলসেভিয়ার",
      zh: "爱思唯尔"
    },
    instructor: {
      en: "Londa Schiebinger, Cara Tannenbaum, Holly Falk Krzesinski, Jessica Miles",
      bn: "লন্ডা শিয়েবিঙ্গার, কারা ট্যানেনবাউম, হলি ফক ক্রজেসিনস্কি, জেসিকা মাইলস",
      zh: "Londa Schiebinger, Cara Tannenbaum, Holly Falk Krzesinski, Jessica Miles"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_13.jpg`,
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 14,
    title: {
      en: "How to prepare your manuscript",
      bn: "আপনার পাণ্ডুলিপি কীভাবে প্রস্তুত করবেন",
      zh: "如何准备您的手稿"
    },
    issuer: {
      en: "Elsevier Researcher Academy",
      bn: "এলসেভিয়ার রিসার্চার একাডেমি",
      zh: "爱思唯尔研究员学院"
    },
    university: {
      en: "Elsevier",
      bn: "এলসেভিয়ার",
      zh: "爱思唯尔"
    },
    instructor: {
      en: "Anthony Newman",
      bn: "অ্যান্থনি নিউম্যান",
      zh: "Anthony Newman"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_14.jpg`,
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 15,
    title: {
      en: "Research design (Certificate of Excellence)",
      bn: "গবেষণা নকশা (সার্টিফিকেট অফ এক্সেলেন্স)",
      zh: "研究设计（卓越证书）"
    },
    issuer: {
      en: "Elsevier Researcher Academy",
      bn: "এলসেভিয়ার রিসার্চার একাডেমি",
      zh: "爱思唯尔研究员学院"
    },
    university: {
      en: "Elsevier",
      bn: "এলসেভিয়ার",
      zh: "爱思唯尔"
    },
    instructor: {
      en: "Elsevier Researcher Academy",
      bn: "এলসেভিয়ার রিসার্চার একাডেমি",
      zh: "爱思唯尔研究员学院"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_15.jpg`,
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 16,
    title: {
      en: "Structuring your article correctly",
      bn: "আপনার নিবন্ধটি সঠিকভাবে গঠন করা",
      zh: "正确构建您的文章"
    },
    issuer: {
      en: "Elsevier Researcher Academy",
      bn: "এলসেভিয়ার রিসার্চার একাডেমি",
      zh: "爱思唯尔研究员学院"
    },
    university: {
      en: "Elsevier",
      bn: "এলসেভিয়ার",
      zh: "爱思唯尔"
    },
    instructor: {
      en: "Anthony Newman",
      bn: "অ্যান্থনি নিউম্যান",
      zh: "Anthony Newman"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_16.jpg`,
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 17,
    title: {
      en: "How to write an abstract and improve your article",
      bn: "কীভাবে সারসংক্ষেপ লিখতে এবং নিবন্ধ উন্নত করতে হয়",
      zh: "如何撰写摘要并改进文章"
    },
    issuer: {
      en: "Elsevier Researcher Academy",
      bn: "এলসেভিয়ার রিসার্চার একাডেমি",
      zh: "爱思唯尔研究员学院"
    },
    university: {
      en: "Elsevier",
      bn: "এলসেভিয়ার",
      zh: "爱思唯尔"
    },
    instructor: {
      en: "Hannah Foreman",
      bn: "হ্যানা ফোরম্যান",
      zh: "Hannah Foreman"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_17.jpg`,
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 18,
    title: {
      en: "2025 Aspire Leaders Program",
      bn: "২০২৫ অ্যাসপায়ার লিডারস প্রোগ্রাম",
      zh: "2025 渴望领袖项目"
    },
    issuer: {
      en: "Aspire Institute",
      bn: "অ্যাসপায়ার ইনস্টিটিউট",
      zh: "Aspire Institute"
    },
    university: {
      en: "Harvard University",
      bn: "হার্ভার্ড বিশ্ববিদ্যালয়",
      zh: "哈佛大学"
    },
    instructor: {
      en: "Tarun Khanna, Karim Lakhani",
      bn: "তরুণ খান্না, করিম লাখানি",
      zh: "Tarun Khanna, Karim Lakhani"
    },
    imageUrl: `${import.meta.env.BASE_URL}assets/cert_18.jpg`,
    link: "https://www.aspireleaders.org/"
  }
];

const EXTRACURRICULARS = [
  {
    id: 1,
    title: {
      en: "AI4S Research Group",
      bn: "এআই ফর সায়েন্স (AI4S) রিসার্চ গ্রুপ",
      zh: "AI4S (科学人工智能) 研究组"
    },
    role: {
      en: "Undergraduate Researcher",
      bn: "আন্ডারগ্র্যাজুয়েট গবেষক",
      zh: "本科研究员"
    },
    description: {
      en: "Actively participating in weekly journal clubs and contributing to literature reviews on generative AI models.",
      bn: "সাপ্তাহিক জার্নাল ক্লাবে সক্রিয়ভাবে অংশগ্রহণ করে জেনারেটিভ এআই (Generative AI) মডেলের ওপর সাহিত্যের পর্যালোচনায় (Literature Review) অবদান রাখছি।",
      zh: "积极参与每周一次的期刊俱乐部研讨会，撰写有关生成式人工智能模型的文献综述。"
    }
  },
  {
    id: 2,
    title: {
      en: "International Students Union",
      bn: "আন্তর্জাতিক ছাত্র সংঘ (International Students Union)",
      zh: "国际学生联合会"
    },
    role: {
      en: "Active Member",
      bn: "সক্রিয় সদস্য",
      zh: "积极分子"
    },
    description: {
      en: "Assisting in organizing academic workshops and cultural exchange events for international students in China.",
      bn: "চীনে বসবাসরত আন্তর্জাতিক শিক্ষার্থীদের জন্য বিভিন্ন একাডেমিক কর্মশালা (Academic Workshops) এবং সাংস্কৃতিক বিনিময় (Cultural Exchange) অনুষ্ঠানের আয়োজন করতে সহায়তা করছি।",
      zh: "协助为在华国际留学生组织学术工作坊和文化交流活动。"
    }
  },
  {
    id: 3,
    title: {
      en: "Volunteer for Bangladesh (VBD) - Jaago Foundation",
      bn: "ভলেন্টিয়ার ফর বাংলাদেশ (VBD) - জাগো ফাউন্ডেশন",
      zh: "孟加拉国志愿者 (VBD) - Jaago 基金会"
    },
    role: {
      en: "General Volunteer | Jan 2021 - Dec 2023",
      bn: "সাধারণ স্বেচ্ছাসেবী | জানুয়ারি ২০২১ - ডিসেম্বর ২০২৩",
      zh: "普通志愿者 | 2021年1月 - 2023年12月"
    },
    description: {
      en: "Worked as a general volunteer for an extended period, contributing to various social and community development activities.",
      bn: "দীর্ঘদিন যাবত একজন সাধারণ ভলেন্টিয়ার হিসেবে কাজ করেছি এবং সমাজের উন্নয়নে বিভিন্ন কার্যক্রমে অবদান রেখেছি।",
      zh: "长期担任普通志愿者，为各种社会和社区发展活动作出贡献。"
    }
  },
  {
    id: 4,
    title: {
      en: "Lions Clubs International",
      bn: "লায়ন্স ক্লাব ইন্টারন্যাশনাল",
      zh: "国际狮子会"
    },
    role: {
      en: "Member, Child Cancer Division (Volunteerism) | Nov 2024 - Present",
      bn: "সদস্য, চাইল্ড ক্যান্সার ডিভিশন | নভেম্বর ২০২৪ - বর্তমান",
      zh: "会员，儿童癌症分部（志愿服务）| 2024年11月 - 至今"
    },
    description: {
      en: "Actively working as a volunteer to support the Child Cancer Division's initiatives and community-driven efforts.",
      bn: "চাইল্ড ক্যান্সার ডিভিশনের একজন মেম্বার হিসেবে ভলেন্টিয়ার অরিজমের কাজ করতেছি।",
      zh: "积极作为志愿者，支持儿童癌症分部的倡议和社区驱动的努力。"
    }
  }
];

const SKILLS_DATA = [
  {
    id: 1,
    title: {
      en: "CRISPR-Cas9 Gene Editing",
      bn: "ক্রিসপার-ক্যাস৯ (CRISPR-Cas9) জিন এডিটিং",
      zh: "CRISPR-Cas9 基因编辑"
    },
    source: "Coursera",
    sourceUrl: "https://www.coursera.org/learn/genetic-engineering",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLKni9g7-jPPlc_XqEvWfuFKhQqPF-qDUE",
    playlistUrl: "https://youtube.com/playlist?list=PLKni9g7-jPPlc_XqEvWfuFKhQqPF-qDUE",
    description: {
      en: "Learned the fundamental mechanisms of CRISPR-Cas9 and its applications in plant biotechnology.",
      bn: "ক্রিসপার-ক্যাস৯ এর মৌলিক প্রক্রিয়া এবং প্ল্যান্ট বায়োটেকনোলজিতে এর ব্যবহার সম্পর্কে বিস্তারিত শিখেছি।",
      zh: "学习了 CRISPR-Cas9 的基本机制及其在植物生物技术中的应用。"
    }
  },
  {
    id: 2,
    title: {
      en: "Python for Bioinformatics",
      bn: "বায়োইনফরমেটিক্সের জন্য পাইথন (Python)",
      zh: "面向生物信息的 Python 编程"
    },
    source: "Udemy",
    sourceUrl: "https://www.udemy.com/course/python-for-biology/",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLe1-kjuYBZ07-9C2ntn_G81g59ZEK7KNc",
    playlistUrl: "https://www.youtube.com/playlist?list=PLe1-kjuYBZ07-9C2ntn_G81g59ZEK7KNc",
    description: {
      en: "Mastered Python scripting for analyzing genomic sequences and biological data.",
      bn: "জিনোমিক সিকোয়েন্স এবং জৈবিক ডেটা বিশ্লেষণের জন্য পাইথন স্ক্রিপ্টিং আয়ত্ত করেছি।",
      zh: "掌握了用于分析基因组序列和生物数据的 Python 脚本编写技能。"
    }
  },
  {
    id: 3,
    title: {
      en: "Machine Learning in Agriculture",
      bn: "কৃষিক্ষেত্রে মেশিন লার্নিং (Machine Learning)",
      zh: "农业中的机器学习"
    },
    source: "edX",
    sourceUrl: "https://www.edx.org/course/machine-learning-in-agriculture",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLfwxMKnHA3iFefxdvB-o0SyclwtT6Z1O7",
    playlistUrl: "https://www.youtube.com/playlist?list=PLfwxMKnHA3iFefxdvB-o0SyclwtT6Z1O7",
    description: {
      en: "Explored how AI and ML models can predict crop yields and optimize farming practices.",
      bn: "কীভাবে এআই এবং এমএল মডেলগুলো ফসলের ফলন সম্পর্কে ভবিষ্যদ্বাণী করতে পারে এবং চাষাবাদ প্রক্রিয়াকে অপ্টিমাইজ করতে পারে, সে বিষয়ে গবেষণা করেছি।",
      zh: "探索了人工智能和机器学习模型如何预测作物产量并优化农业操作实践。"
    }
  }
];

const GmailLogo = ({ className = "w-5 h-5 shrink-0" }: { className?: string }) => (
  <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className={`${className} object-contain`} />
);

const QQLogo = ({ className = "w-5 h-5 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="qqMailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#E0E525" />
        <stop offset="100%" stopColor="#FF6B00" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="5" fill="url(#qqMailGrad)" />
    <path d="M4.5 8.5C4.5 7.119 5.619 6 7 6h10c1.381 0 2.5 1.119 2.5 2.5v7c0 1.381-1.119 2.5-2.5 2.5H7c-1.381 0-2.5-1.119-2.5-2.5v-7z" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.5 8.5l7.5 5.5 7.5-5.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WeChatLogo = ({ className = "w-5 h-5 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="22" fill="#09B83E"/>
    <g transform="translate(14, 8) scale(3)">
      <path d="M10.5 5.5C6.91 5.5 4 8.037 4 11.167c0 1.76 1.015 3.33 2.583 4.347l-.917 2.75 3.167-1.65c.533.147 1.083.22 1.667.22 3.59 0 6.5-2.537 6.5-5.667S14.09 5.5 10.5 5.5zm-2.167 3.667c.6 0 1.083.483 1.083 1.083s-.483 1.083-1.083 1.083-1.083-.483-1.083-1.083.483-1.083 1.083-1.083zm4.334 0c.6 0 1.083.483 1.083 1.083s-.483 1.083-1.083 1.083-1.083-.483-1.083-1.083.483-1.083 1.083-1.083z" fill="white"/>
      <path d="M17.333 10.833c-.267 0-.517.033-.767.067C16.033 9.4 14.367 8.333 12.5 8.333c-.15 0-.3.017-.45.033.483 3.05 3.233 5.467 6.45 5.467.433 0 .85-.05 1.25-.133l2.25 1.167-.65-1.95c1.083-.983 1.65-2.2 1.65-3.417 0-2.583-2.533-4.667-5.667-4.667zm-1.833 2.167c-.45 0-.833-.383-.833-.833s.383-.833.833-.833.833.383.833.833-.383.833-.833.833zm3.667 0c-.45 0-.833-.383-.833-.833s.383-.833.833-.833.833.383.833.833-.383.833-.833.833z" fill="white" stroke="#09B83E" strokeWidth="0.8"/>
    </g>
    <text x="50" y="88" fill="white" fontSize="22" fontWeight="bold" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" letterSpacing="-0.5">WeChat</text>
  </svg>
);

const RESEARCH_INTERESTS = [
  { 
    id: 1, 
    title: {
      en: "AI for Science",
      bn: "এআই ফর সায়েন্স",
      zh: "人工智能科学 (AI4S)"
    },
    icon: <Cpu size={24} strokeWidth={1.5} />, 
    desc: {
      en: (
        <>
          <p className="mb-3">The traditional pipeline for discovering novel drugs and biomolecules is notoriously slow, resource-intensive, and often limited by human intuition. To overcome these bottlenecks, I am deeply immersed in the rapidly evolving field of AI for Science (AI4S), specifically focusing on AI-Driven Drug and Peptide Design (AIDD).</p>
          <p>My work centers on integrating Large Language Models (LLMs) and Multi-Agent frameworks with specialized generative tools, such as discrete diffusion models and active learning. I am particularly interested in the de novo generation of cell-penetrating peptides and the directed evolution of biocatalytic enzymes. By computationally optimizing critical molecular properties—such as biological activity and ADME/T profiles—prior to physical synthesis, we can radically accelerate the discovery process. I am currently expanding my computational toolkit and studying autonomous bioinformatics workflows, preparing to develop intelligent AI agents that seamlessly bridge computational predictions with real-world biological applications.</p>
        </>
      ),
      bn: (
        <>
          <p className="mb-3">নতুন ওষুধ এবং বায়োমলিকুল আবিষ্কারের গতানুগতিক প্রক্রিয়াটি অত্যন্ত ধীর, ব্যয়বহুল এবং অনেক ক্ষেত্রেই মানুষের অনুমানের উপর নির্ভরশীল। এই সীমাবদ্ধতাগুলো কাটিয়ে উঠতে, আমি এআই ফর সায়েন্স (AI4S)-এর দ্রুত বিকাশমান ক্ষেত্রে গভীরভাবে যুক্ত রয়েছি, বিশেষত এআই-চালিত ড্রাগ এবং পেপটাইড ডিজাইন (AIDD)-এর ওপর ফোকাস করছি।</p>
          <p>আমার কাজের মূল লক্ষ্য হলো লার্জ ল্যাঙ্গুয়েজ মডেল (LLMs) এবং মাল্টি-এজেন্ট ফ্রেমওয়ার্কগুলোকে ডিসক্রিট ডিফিউশন (Discrete Diffusion) মডেল এবং অ্যাকটিভ লার্নিংয়ের মতো বিশেষ জেনারেটিভ টুলগুলোর সাথে যুক্ত করা। আমি বিশেষত সেল-পেনিট্রেটিং (Cell-penetrating) পেপটাইডের ডি নভো জেনারেশন (de novo generation) এবং বায়োক্যাটালাইটিক এনজাইমগুলোর ডিরেক্টেড ইভোলিউশন (Directed Evolution) নিয়ে আগ্রহী। ভৌতভাবে সংশ্লেষণ বা ল্যাবে প্রস্তুত করার আগেই কম্পিউটেশনাল পদ্ধতির মাধ্যমে গুরুত্বপূর্ণ আণবিক বৈশিষ্ট্যগুলো—যেমন জৈবিক কার্যকারিতা এবং ADME/T প্রোফাইল—অপ্টিমাইজ করে আমরা আবিষ্কারের এই প্রক্রিয়াকে উল্লেখযোগ্যভাবে ত্বরান্বিত করতে পারি। আমি বর্তমানে আমার কম্পিউটেশনাল টুলকিট প্রসারিত করছি এবং স্বয়ংক্রিয় বায়োইনফরমেটিক্স ওয়ার্কফ্লো (অটোনোমাস বায়োইনফরমেটিক্স ওয়ার্কফ্লো) নিয়ে পড়াশোনা করছি, যাতে এমন ইন্টেলিজেন্ট এআই এজেন্ট তৈরি করা যায় যা কম্পিউটেশনাল ভবিষ্যদ্বাণীর সাথে বাস্তব জৈবিক প্রয়োগের সেতুবন্ধন তৈরি করতে পারে।</p>
        </>
      ),
      zh: (
        <>
          <p className="mb-3">发现新药和生物分子的传统流程众所周知地缓慢、资源密集，并且常常受限于人类直觉。为了克服这些瓶颈，我深深沉浸在快速发展的人工智能科学 (AI4S) 领域，特别专注于人工智能驱动的药物和多肽设计 (AIDD)。</p>
          <p>我的工作以整合大型语言模型 (LLMs)、多智能体框架以及诸如离散扩散模型和主动学习等专业生成工具为中心。我尤其对穿膜肽的从头生成以及生物催化酶的定向进化感兴趣。通过在物理合成之前计算优化关键的分子特性（如生物活性和 ADME/T 特性），我们可以从根源上加速发现过程。我目前正在扩展我的计算工具包，并研究自主生物信息学工作流，准备开发能够无缝连接计算预测与现实世界生物学应用的智能 AI 智能体。</p>
        </>
      )
    }
  },
  { 
    id: 2, 
    title: {
      en: "Healthcare and Food",
      bn: "স্বাস্থ্যসেবা এবং খাদ্য",
      zh: "医疗保健与食品"
    },
    icon: <Microscope size={24} strokeWidth={1.5} />, 
    desc: {
      en: (
        <>
          <p className="mb-3">Metabolic disorders are a growing global health challenge, driving the urgent need for naturally derived functional foods. My wet-lab research focuses on the phytochemical profiles and structural complexities of Lilium species (Lily bulbs), with a specific emphasis on Resistant Starch (RS). Unlike typical carbohydrates that cause rapid glucose spikes, RS resists early digestion and functions similarly to dietary fiber, offering profound metabolic benefits.</p>
          <p>Currently, under the direct guidance of my professor, I am investigating how thermal pretreatments and physical modifications alter the multi-scale structure of this starch. By combining advanced structural analysis with UPLC-Q-TOF-MS metabolite identification, my goal is to uncover how these specific structural transformations can significantly enhance the starch's hypoglycemic (blood-sugar-lowering) and anti-inflammatory properties. As I transition into hands-on wet-lab experiments, I aim to bridge the gap between molecular-level structural changes and macroscopic health benefits, laying the groundwork for novel nutraceutical applications.</p>
        </>
      ),
      bn: (
        <>
          <p className="mb-3">বিপাকীয় বা মেটাবলিক সমস্যাগুলো (যেমন ডায়াবেটিস) বর্তমানে একটি ক্রমবর্ধমান বৈশ্বিক স্বাস্থ্য চ্যালেঞ্জ, যা প্রাকৃতিকভাবে তৈরি ফাংশনাল ফুডের (Functional Food) প্রয়োজনীয়তা বহুগুণ বাড়িয়ে দিয়েছে। আমার ওয়েট-ল্যাব গবেষণাটি মূলত লিলিয়াম প্রজাতির (Lilium species বা লিলি বাল্বস) ফাইটোকেমিক্যাল প্রোফাইল এবং কাঠামোগত জটিলতার ওপর দৃষ্টি নিবদ্ধ করে, যেখানে আমি প্রধানত রেজিস্ট্যান্ট স্টার্চ (RS) নিয়ে কাজ করছি। সাধারণ শর্করা যা দ্রুত রক্তে গ্লুকোজের মাত্রা বাড়ায়, তার বিপরীতে রেজিস্ট্যান্ট স্টার্চ সহজে হজম হয় না এবং এটি অনেকটা ডায়েটারি ফাইবারের মতো কাজ করে, যা স্বাস্থ্যের জন্য গভীর মেটাবলিক সুবিধা প্রদান করে।</p>
          <p>বর্তমানে, আমার অধ্যাপকের প্রত্যক্ষ নির্দেশনায় আমি গবেষণা করছি যে, কীভাবে অতিরিক্ত তাপীয় প্রয়োগ (Thermal pretreatments) এবং বাহ্যিক পরিবর্তনগুলো এই স্টার্চের মাল্টি-স্কেল কাঠামোকে (Multi-scale structure) পরিবর্তন করে। উন্নত কাঠামোগত বিশ্লেষণের সাথে UPLC-Q-TOF-MS মেটাবোলাইট আইডেন্টিফিকেশন (Metabolite identification) পদ্ধতি সমন্বয় করে আমার লক্ষ্য হলো—এই নির্দিষ্ট কাঠামোগত পরিবর্তনগুলো কীভাবে স্টার্চের হাইপোগ্লাইসেমিক (রক্তে শর্করা কমানোর ক্ষমতা) এবং অ্যান্টি-ইনফ্লেমেটরি (Anti-inflammatory) বৈশিষ্ট্যগুলোকে উল্লেখযোগ্যভাবে বাড়াতে পারে, তা উদঘাটন করা। ধীরে ধীরে হাতে-কলমে ওয়েট-ল্যাব পরীক্ষাগুলোতে প্রবেশের সাথে সাথে, আমার মূল উদ্দেশ্য হলো আণবিক পর্যায়ে হওয়া কাঠামোগত পরিবর্তন এবং এর ফলে প্রাপ্ত স্বাস্থ্যগত সুবিধার মধ্যকার দূরত কমানো, যা নতুন নিউট্রাসিউটিক্যাল (Nutraceutical) প্রয়োগের ভিত্তি স্থাপন করবে।</p>
        </>
      ),
      zh: (
        <>
          <p className="mb-3">代谢紊乱是一大日益严重的全球健康挑战，这推动了对天然功能性食品的迫切需求。我的湿实验研究侧重于百合属物种（百合鳞茎）的植物化学特征和结构复杂性，尤其侧重于抗性淀粉 (RS)。与引起血糖快速升高的典型碳水化合物不同，抗性淀粉具有抗消化性，作用类似于膳食纤维，提供重大的代谢益处。</p>
          <p>目前，在教授的直接指导下，我正在研究热预处理和物理修饰如何改变这种淀粉的多尺度结构。通过将高级结构分析与 UPLC-Q-TOF-MS 代谢物鉴定相结合，我的目标是揭示这些特定的结构转变如何显著增强淀粉的降血糖和抗炎特质。随着我过渡到相关的湿实验实践，我的目标是在分子水平的结构变化和宏观健康益处之间架起桥梁，为新型营养保健品的应用奠定基础。</p>
        </>
      )
    }
  },
  { 
    id: 3, 
    title: {
      en: "Sustainable Agriculture",
      bn: "টেকসই কৃষি",
      zh: "可持续农业"
    },
    icon: <Leaf size={24} strokeWidth={1.5} />, 
    desc: {
      en: (
        <>
          <p className="mb-3">While my current undergraduate research builds a strong interdisciplinary foundation in both wet-lab biology and computational AI, my ultimate scientific ambition lies in plant biotechnology. Growing up in Bangladesh—a country disproportionately affected by climate change and rising soil salinity—I have witnessed firsthand the urgent need for climate-resilient agriculture.</p>
          <p>My long-term goal for my Master's and Ph.D. studies is to harness the transformative power of CRISPR-Cas gene-editing technology. I intend to focus on engineering robust plant varieties capable of withstanding severe abiotic stresses, particularly salt and drought tolerance. By decoding and rewiring plant genetics, I aim to develop high-yield, sustainable crop systems. My ultimate vision is to translate cutting-edge biotechnological innovations from the laboratory directly to the fields, ensuring long-term food security for vulnerable regions across the globe and making a tangible impact on my home country.</p>
        </>
      ),
      bn: (
        <>
          <p className="mb-3">যদিও আমার বর্তমান স্নাতক পর্যায়ের গবেষণাগুলো ওয়েট-ল্যাব বায়োলজি এবং কম্পিউটেশনাল এআই (AI)-এর সমন্বয়ে একটি শক্তিশালী আন্তঃবিভাগীয় ভিত্তি তৈরি করছে, তবুও আমার চূড়ান্ত বৈজ্ঞানিক লক্ষ্য হলো প্ল্যান্ট বায়োটেকনোলজি (Plant Biotechnology)। আমি বাংলাদেশে বেড়ে উঠেছি—যে দেশটি জলবায়ু পরিবর্তন এবং ক্রমবর্ধমান মাটির লবণাক্ততার সরাসরি ঝুঁকির মুখে রয়েছে। সেখানে আমি নিজের চোখে দেখেছি কীভাবে একটি জলবায়ু-সহনশীল কৃষিব্যবস্থার সবচেয়ে বেশি প্রয়োজন।</p>
          <p>আমার মাস্টার্স এবং পিএইচ.ডি. (Ph.D.) অধ্যয়নের জন্য দীর্ঘমেয়াদী লক্ষ্য হলো ক্রিসপার-ক্যাস (CRISPR-Cas) জিন-এডিটিং প্রযুক্তির যুগান্তকারী ক্ষমতাকে কাজে লাগানো। আমি তীব্র প্রতিকূলতা—বিশেষ করে খরা এবং অতিরিক্ত লবণাক্ততা—মোকাবিলা করতে সক্ষম এমন শক্তিশালী উদ্ভিদের প্রজাতি তৈরিতে মনোযোগ দিতে চাই। উদ্ভিদের জেনেটিক্স ডিকোড এবং রি-প্রোগ্রামিং করার মাধ্যমে, আমি উচ্চ-ফলনশীল এবং টেকসই ফসল সিস্টেম (Crop systems) গড়ে তুলতে চাই। আমার চূড়ান্ত দৃষ্টিভঙ্গি হলো এই সর্বাধুনিক বায়োটেকনোলজিকাল উদ্ভাবনগুলোকে শুধু ল্যাবরেটরি থেকে সরাসরি কৃষকের মাঠে পৌঁছে দেওয়া নয়; বরং বিশ্বজুড়ে ঝুঁকিপূর্ণ অঞ্চলগুলোতে দীর্ঘমেয়াদী খাদ্য নিরাপত্তা নিশ্চিত করা এবং আমার নিজ দেশে একটি দৃশ্যমান ইতিবাচক প্রভাব তৈরি করা।</p>
        </>
      ),
      zh: (
        <>
          <p className="mb-3">虽然我目前的本科研究在湿实验生物学和计算人工智能方面打下了坚实的跨学科基础，但我的最高科学抱负在于植物生物技术。我在孟加拉国长大——这个国家深受气候变化和土壤盐渍化加剧的影响——亲眼目睹了对气候适应型农业的迫切需求。</p>
          <p>我未来在硕士和博士阶段的长期研究目标，是利用 CRISPR-Cas 基因编辑技术的变革性力量。我打算专注于培育能够抵御严峻非生物胁迫（尤其是耐盐和抗旱性能）的健壮植物品种。通过解码和重塑植物遗传学，我的目标是开发高产、可持续的农作物系统。我的最终愿景是将这些尖端的生物技术创新从实验室直接转化应用到田间，不仅确保全球脆弱地区的长期粮食安全，还要对我的祖国产生切实的积极影响。</p>
        </>
      )
    }
  }
];

const ContactContent = ({ lang }: { lang: Language }) => {
  const t = tDict[lang];
  
  return (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
    {/* Contact Information Sidebar */}
    <div className="lg:col-span-1 space-y-10">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">{t.contactForm.emailAddresses}</h3>
        <div className="space-y-4 text-slate-600">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sazzadhossain211810@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-blue-600 transition-colors">
            <GmailLogo className="w-5 h-5 shrink-0 mt-0.5" />
            <span className="text-sm break-words">sazzadhossain211810@gmail.com</span>
          </a>
          <a href="mailto:iec.hossain524@gzu.edu.cn" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-blue-600 transition-colors">
            <GraduationCap size={20} className="text-blue-600 shrink-0 mt-0.5" />
            <span className="text-sm break-words">iec.hossain524@gzu.edu.cn</span>
          </a>
          <a href="mailto:hossainmdsazzad@qq.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-blue-600 transition-colors">
            <QQLogo className="w-5 h-5 shrink-0 mt-0.5" />
            <span className="text-sm break-words">hossainmdsazzad@qq.com <span className="text-xs text-slate-400">({t.contactForm.china})</span></span>
          </a>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">{t.contactForm.socialProfiles}</h3>
        <div className="flex flex-wrap gap-4">
          <a href="https://www.linkedin.com/in/md-sazzad-hossain-3b16053a5" target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-full transition-all shadow-sm" title="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="https://github.com/mdsazzadh211810-cmd" target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-full transition-all shadow-sm" title="GitHub">
            <Github size={20} />
          </a>
          <a href="https://x.com/SazzadMd73279" target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-full transition-all shadow-sm" title="X (Twitter)">
            <Twitter size={20} />
          </a>
          <a href="https://www.facebook.com/md.sazzad.hossain.773998" target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-full transition-all shadow-sm" title="Facebook">
            <Facebook size={20} />
          </a>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">{t.contactForm.wechat}</h3>
        <div className="flex items-center gap-3 text-slate-600 bg-white p-4 border border-slate-200 shadow-sm">
          <WeChatLogo className="w-8 h-8 shrink-0" />
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">{t.contactForm.wechatId}</p>
            <p className="text-sm font-medium text-slate-800">s13027860961</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">{t.contactForm.phone}</h3>
        <div className="flex items-center gap-3 text-slate-600 bg-white p-4 border border-slate-200 shadow-sm">
          <Phone size={24} className="text-blue-600 shrink-0" />
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">{t.contactForm.china}</p>
            <a href="tel:+8613027860961" className="text-sm font-medium text-slate-800 hover:text-blue-600 transition-colors">+86 13027860961</a>
          </div>
        </div>
      </div>
    </div>

    {/* Contact Form */}
    <div className="lg:col-span-2 bg-white p-8 md:p-10 border border-slate-200 shadow-sm">
      {/* FORMSUBMIT INTEGRATION */}
      {/* Emails will be sent directly to sazzadhossain211810@gmail.com */}
      <form action="https://formsubmit.co/sazzadhossain211810@gmail.com" method="POST" className="space-y-6">
        {/* Anti-spam honeypot */}
        <input type="text" name="_honey" style={{ display: 'none' }} />
        {/* Disable captcha for smoother experience */}
        <input type="hidden" name="_captcha" value="false" />
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">{t.contactForm.firstName}</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-none focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">{t.contactForm.email}</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-none focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
            placeholder="john@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">{t.contactForm.message}</label>
        <textarea 
          id="message" 
          name="message" 
          rows={5}
          required
          className="w-full px-4 py-3 border border-slate-300 rounded-none focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white resize-y"
          placeholder=""
        ></textarea>
      </div>
      <button 
        type="submit" 
        className="w-full py-4 bg-blue-600 text-white font-medium tracking-wide hover:bg-blue-700 transition-colors"
      >
        {t.contactForm.send}
      </button>
    </form>
  </div>
  </div>
  );
};

const CVPage = ({ onClose, lang }: { onClose: () => void, lang: Language }) => {
  const t = tDict[lang];
  const handleDownloadCV = () => {
    const files = [
      { url: `${import.meta.env.BASE_URL}assets/cv_page_1.jpg`, name: 'MD_SAZZAD_HOSSAIN_CV_Page_1.jpg' },
      { url: `${import.meta.env.BASE_URL}assets/cv_page_2.jpg`, name: 'MD_SAZZAD_HOSSAIN_CV_Page_2.jpg' }
    ];
    
    files.forEach((file, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = file.url;
        link.setAttribute('download', file.name);
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 500); // Stagger downloads slightly to ensure both trigger
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <button 
              onClick={onClose}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-4 group font-medium"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>{lang === 'bn' ? 'পোর্টফোলিওতে ফিরে যান' : lang === 'zh' ? '返回作品集' : 'Back to Portfolio'}</span>
            </button>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900">{t.sections.cv || 'Curriculum Vitae'}</h1>
          </div>
          <button 
            onClick={handleDownloadCV}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors font-medium shadow-sm w-full md:w-auto"
          >
            <Download size={18} />
            <span>{lang === 'bn' ? 'সিভি ডাউনলোড করুন' : lang === 'zh' ? '下载简历' : 'Download CV'}</span>
          </button>
        </div>
        
        <div className="bg-white shadow-2xl border border-slate-200 flex flex-col mx-auto">
          <img 
            src={`${import.meta.env.BASE_URL}assets/cv_page_1.jpg`} 
            alt="CV Page 1" 
            className="w-full h-auto block"
            onError={(e) => { e.currentTarget.src = `${import.meta.env.BASE_URL}assets/cv_page_1.jpg`; }}
          />
          <div className="w-full h-px bg-slate-200"></div>
          <img 
            src={`${import.meta.env.BASE_URL}assets/cv_page_2.jpg`} 
            alt="CV Page 2" 
            className="w-full h-auto block"
            onError={(e) => { e.currentTarget.src = `${import.meta.env.BASE_URL}assets/cv_page_2.jpg`; }}
          />
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = ({ onClose, currentProjectId, setCurrentProjectId, lang }: { onClose: () => void, currentProjectId: number, setCurrentProjectId: (id: number) => void, lang: Language }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentProjectId]);

  const projects = [
    {
      id: 1,
      category: {
        en: "Research Interests & Upcoming Projects",
        bn: "গবেষণায় আগ্রহ এবং আসন্ন প্রজেক্টসমূহ",
        zh: "研究兴趣与即将开展的项目"
      },
      title: {
        en: "Functional Properties and Starch Digestibility of Lily Bulbs (Focusing on Resistant Starch)",
        bn: "লিলি বাল্বসের (লিলিয়াম প্রজাতি) ফাংশনাল বৈশিষ্ট্য এবং স্টার্চের হজমযোগ্যতা (রেজিস্ট্যান্ট স্টার্চের ওপর ফোকাস)",
        zh: "百合鳞茎的功能特性和淀粉消化率（聚焦抗性淀粉）"
      },
      overview: {
        en: "I am highly interested in the intersection of plant biology, functional foods, and human health. Currently, I am focusing on the phytochemical profiles and bioactivities of Lilium species (Lily bulbs), exploring their potential as natural nutraceuticals.",
        bn: "আমি প্ল্যান্ট বায়োলজি, ফাংশনাল ফুড এবং মানবস্বাস্থ্যের মেলবন্ধনে গভীরভাবে আগ্রহী। বর্তমানে আমি লিলিয়াম প্রজাতির (লিলি বাল্বস) ফাইটোকেমিক্যাল প্রোফাইল এবং বায়োঅ্যাক্টিভিটির ওপর ফোকাস করছি, যাতে প্রাকৃতিক নিউট্রাসিউটিক্যালস হিসেবে এগুলো কীভাবে কাজ করতে পারে তা অন্বেষণ করা যায়।",
        zh: "我对植物生物学、功能性食品与人类健康的交叉领域非常感兴趣。目前，我专注于百合属物种（百合鳞茎）的植物化学特征和生物活性，探索它们作为天然营养保健品的潜力。"
      },
      focus: {
        en: "Normal starch digests quickly, causing rapid spikes in blood glucose. My research interest lies in Resistant Starch (RS)—a type of starch that resists digestion and acts similarly to dietary fiber. I am exploring how various physical modifications (such as thermal pretreatments) affect the multi-scale structure of starch in Lily bulbs. The goal is to understand how these structural changes can enhance the starch's bioactivities, particularly its hypoglycemic (blood sugar lowering) and anti-inflammatory properties.",
        bn: "সাধারণ শর্করা খুব দ্রুত হজম হয়ে যায়, যা রক্তে গ্লুকোজের মাত্রা দ্রুত বাড়িয়ে দেয়। আমার গবেষণার মূল আগ্রহ হলো রেজিস্ট্যান্ট স্টার্চ (RS) নিয়ে কাজ করা—এটি এক বিশেষ ধরনের স্টার্চ, যা সহজে হজম হয় না এবং ডায়েটারি ফাইবারের মতো কাজ করে। লিলি বাল্বসের স্টার্চে বিভিন্ন বাহ্যিক তাপ প্রয়োগ বা পরিবর্তন কীভাবে এর মাল্টি-স্কেল কাঠামোকে প্রভাবিত করে, তা আমি উদ্ঘাটনের চেষ্টা করছি। উদ্দেশ্য হলো, এই কাঠামোগত পরিবর্তনগুলো কীভাবে স্টার্চের হাইপোগ্লাইসেমিক বা ডায়াবেটিস-রোধী বৈশিষ্ট্যকে উন্নত করতে পারে তা বোঝা।",
        zh: "普通淀粉消化迅速，导致血糖快速飙升。我的研究兴趣在于抗性淀粉 (RS)——一种抗消化、作用类似于膳食纤维的淀粉。我正在探索各种物理修饰（如热预处理）如何影响百合鳞茎淀粉的多尺度结构。目标是了解这些结构变化如何增强淀粉的生物活性，特别是其降血糖和抗炎特性。"
      },
      statusLabel: {
        en: "Current Status",
        bn: "বর্তমান অবস্থা",
        zh: "当前状态"
      },
      status: {
        en: "As a sophomore undergraduate, I am currently conducting an in-depth literature review and analyzing advanced research (including multi-scale starch structure and UPLC-Q-TOF-MS metabolite identification) under the direct guidance of my professor. I am actively preparing the experimental designs to soon begin hands-on wet-lab experiments involving extraction, structural analysis, and bioassays.",
        bn: "স্নাতক দ্বিতীয় বর্ষের শিক্ষার্থী হিসেবে আমি বর্তমানে আমার অধ্যাপকের সরাসরি নির্দেশনায় গভীর সাহিত্য পর্যালোচনা বা লিটারেচার রিভিউ করছি। আমি খুব শীঘ্রই নিষ্কাশন, কাঠামোগত বিশ্লেষণ এবং বায়োঅ্যাসে (bioassays)-এর মতো ওয়েট-ল্যাব এক্সপেরিমেন্ট শুরু করার জন্য এক্সপেরিমেন্টাল ডিজাইন প্রস্তুত করছি।",
        zh: "作为一名大二本科生，目前我在教授的直接指导下进行深入的文献综述，并分析高级研究（包括多尺度淀粉结构和 UPLC-Q-TOF-MS 代谢物鉴定）。我正在积极准备实验设计，以便尽快开始涉及提取、结构分析和生物测定的湿实验室实践。"
      },
      icon: <Microscope size={32} className="text-blue-600" />
    },
    {
      id: 2,
      category: {
        en: "Research Interests & Upcoming Projects",
        bn: "গবেষণায় আগ্রহ এবং আসন্ন প্রজেক্টসমূহ",
        zh: "研究兴趣与即将开展的项目"
      },
      title: {
        en: "AI for Science (AI4S) - AI-Driven Drug and Peptide Design",
        bn: "এআই ফর সায়েন্স (AI4S) - এআই-চালিত ড্রাগ এবং পেপটাইড ডিজাইন",
        zh: "人工智能科学 (AI4S) - 人工智能驱动的药物和多肽设计"
      },
      overview: {
        en: "I am deeply fascinated by the intersection of Artificial Intelligence and Chemistry/Biology. My core interest lies in AI-driven drug and pesticide discovery (AIDD/AIPD), where computational power is used to accelerate the discovery of novel biomolecules, significantly reducing the time, cost, and resources required for traditional wet-lab experiments.",
        bn: "আর্টিফিশিয়াল ইন্টেলিজেন্স এবং রসায়ন/জীববিদ্যার মেলবন্ধন আমাকে গভীরভাবে আকৃষ্ট করে। আমার মূল আগ্রহ হলো এআই-চালিত ড্রাগ এবং পেস্টিসাইড আবিষ্কার (AIDD/AIPD), যেখানে কম্পিউটেশনাল শক্তি ব্যবহার করে নতুন আণবিক মলিকিউল আবিষ্কার করার প্রক্রিয়াকে ত্বরান্বিত করা হয়।",
        zh: "我对人工智能与化学/生物学的交叉领域深深着迷。我的核心兴趣在于人工智能驱动的药物和农药发现（AIDD/AIPD），其中计算能力被用于加速新生物分子的发现，从而显著减少传统湿实验室实验所需的时间、成本和资源。"
      },
      focus: {
        en: "My learning and research focus is centered on integrating \"General AI\" (such as LLMs and Multi-Agent frameworks) with \"Specialized AI\" (like Generative Models, Active Learning, and Discrete Diffusion Models). I am particularly interested in how these advanced AI architectures can be used for de novo peptide generation (e.g., Cell-Penetrating Peptides) and the directed evolution of biocatalytic enzymes. The ultimate goal is to computationally optimize molecular properties (Activity, ADME/T) before physical synthesis.",
        bn: "আমার শিক্ষা এবং গবেষণার ফোকাস হলো 'জেনারেল এআই' (যেমন LLM এবং মাল্টি-এজেন্ট ফ্রেমওয়ার্ক)-এর সাথে 'স্পেশালাইজড এআই'-এর (যেমন জেনারেটিভ মডেল) সমন্বয় ঘটানো। আমি বিশেষত ডি নভো (de novo) পেপটাইড জেনারেশন এবং বায়োক্যাটালাইটিক এনজাইমগুলোর ইভোলিউশনে এআই কীভাবে কাজ করতে পারে তা নিয়ে আগ্রহী।",
        zh: "我的学习和研究重点在于将“通用 AI”（如大型语言模型和多智能体框架）与“专用 AI”（如生成模型、主动学习和离散扩散模型）相结合。我特别对这些高级 AI 架构如何用于从头多肽生成（如穿膜肽）和生物催化酶的定向进化感兴趣。最终目标是在物理合成之前通过计算优化分子特性（活性、ADME/T）。"
      },
      statusLabel: {
        en: "Current Status",
        bn: "বর্তমান অবস্থা",
        zh: "当前状态"
      },
      status: {
        en: "As a sophomore, I am currently dedicating my time to building a strong foundation in this highly interdisciplinary field. Under the guidance of the AI4S research group, I am studying literature on generative AI models for molecular design and learning about autonomous bioinformatics workflows (Agent building). I am actively refining my computational skill set to soon contribute to developing intelligent agents for biological data analysis and peptide optimization.",
        bn: "AI4S রিসার্চ গ্রুপের নির্দেশনায়, আমি মলিকিউলার ডিজাইনের এআই মডেলগুলোর ওপর লিটারেচার স্টাডি করছি এবং অটোনোমাস বায়োইনফরমেটিক্স ওয়ার্কফ্লো (অ্যাজেন্ট বিল্ডিং) সম্পর্কে শিখছি। আমি আমার কম্পিউটেশনাল স্কিলসেট উন্নত করছি যাতে জৈবিক ডেটা বিশ্লেষণ এবং পেপটাইড অপ্টিমাইজেশানের কাজে অবদান রাখতে পারি।",
        zh: "在 AI4S 研究组的指导下，我正在研读关于用于分子设计的生成式 AI 模型的文献，并学习自主生物信息学工作流（智能体构建）。我正在积极完善我的计算技能，以期尽快为开发用于生物数据分析和多肽优化的智能体做出贡献。"
      },
      icon: <Cpu size={32} className="text-blue-600" />
    },
    {
      id: 3,
      category: {
        en: "Future Research Vision & Long-Term Goals",
        bn: "ভবিষ্যৎ গবেষণার লক্ষ্য এবং দীর্ঘমেয়াদী ভিশন",
        zh: "未来研究愿景与长期目标"
      },
      title: {
        en: "Plant Genetics & CRISPR-Cas Engineering for Sustainable Agriculture",
        bn: "টেকসই কৃষির জন্য প্ল্যান্ট জেনেটিক্স এবং ক্রিসপার-ক্যাস ইঞ্জিনিয়ারিং",
        zh: "面向可持续农业的植物遗传学与 CRISPR-Cas 基因工程"
      },
      overview: {
        en: "Beyond my current projects, I am deeply passionate about addressing global and regional food security challenges through advanced genetic engineering. My long-term academic goal is to pursue a Master’s or PhD focusing on plant biotechnology and crop improvement.",
        bn: "আমার বর্তমান প্রজেক্টগুলোর বাইরেও, আমি অ্যাডভান্সড জেনেটিক ইঞ্জিনিয়ারিংয়ের মাধ্যমে বিশ্বজুড়ে খাদ্য নিরাপত্তার চ্যালেঞ্জগুলো মোকাবিলা করার জন্য গভীরভাবে কাজ করতে আগ্রহী। আমার মূল লক্ষ্য হলো প্ল্যান্ট বায়োটেকনোলজিতে মাস্টার্স বা পিএইচডি (PhD) করা।",
        zh: "除了目前的项目，我非常热衷于通过先进的基因工程解决全球和区域粮食安全挑战。我的长期学术目标是攻读以植物生物技术和作物改良为重点的硕士或博士学位。"
      },
      focus: {
        en: "I aspire to utilize CRISPR-Cas gene-editing technology to develop climate-resilient plant and food crop varieties. Specifically, I am highly interested in engineering traits such as salt tolerance, drought resistance, and overall soil adaptability (abiotic stress tolerance) to ensure crops can thrive in harsh environmental conditions.",
        bn: "আমি ক্রিসপার-ক্যাস (CRISPR-Cas) জিন-এডিটিং প্রযুক্তি ব্যবহার করে জলবায়ু-সহনশীল উদ্ভিদ ও ফসলের জাত উদ্ভাবন করতে চাই। আমি বিশেষত চরম পরিবেশগত পরিস্থিতিতে টিকে থাকতে সক্ষম এমন ফসল তৈরি করতে লবণাক্ততা এবং খরা সহনশীলতার মতো বৈশিষ্ট্যগুলো (Stress tolerance) বৃদ্ধি করার ওপর কাজ করতে অত্যন্ত আগ্রহী।",
        zh: "我渴望利用 CRISPR-Cas 基因编辑技术培育具有气候适应力的植物和农作物品种。具体而言，我非常热衷于改造诸如耐盐性、抗旱性和整体土壤适应性（非生物胁迫耐受性）等性状，确保农作物在恶劣的环境条件下也能茁壮成长。"
      },
      statusLabel: {
        en: "Ultimate Goal",
        bn: "চূড়ান্ত লক্ষ্য",
        zh: "根本目标"
      },
      status: {
        en: "Coming from Bangladesh—a country highly vulnerable to climate change and rising soil salinity—my ultimate vision is to apply these cutting-edge biotechnological advancements to improve local agriculture. I want to contribute to developing sustainable, high-yield, and resilient food systems for my home country.",
        bn: "যেহেতু আমি বাংলাদেশ থেকে এসেছি—যে দেশটি জলবায়ু পরিবর্তন এবং মাটির ক্রমবর্ধমান লবণাক্ততার কারণে অত্যন্ত ঝুঁকিতে রয়েছে—আমার চূড়ান্ত লক্ষ্য হলো এই সর্বাধুনিক বায়োটেকনোলজিকাল উদ্ভাবনগুলোকে কাজে লাগিয়ে স্থানীয় কৃষিব্যবস্থার উন্নতি করা।",
        zh: "我来自孟加拉国——一个极易受气候变化和土壤盐渍化影响的国家——我的最终愿景是将这些前沿的生物技术进步应用于改善当地农业。我希望能为我的祖国发展高产、可持续的且具有韧性的粮食系统做出贡献。"
      },
      icon: <Leaf size={32} className="text-blue-600" />
    },
    {
      id: 4,
      category: {
        en: "Computational Research & Cheminformatics",
        bn: "কম্পিউটেশনাল রিসার্চ এবং কেমইনফরমেটিক্স",
        zh: "计算研究与化学信息学"
      },
      title: {
        en: "GNN for Molecular Property Prediction (AI4S)",
        bn: "আণবিক বৈশিষ্ট্য ভবিষ্যদ্বাণীর জন্য GNN (AI4S)",
        zh: "用于分子特性预测的图神经网络 (GNN) (AI4S)"
      },
      overview: {
        en: "As part of my expanding interest in AI for Science (AI4S), I developed a computational project utilizing Graph Neural Networks (GNNs) to predict molecular properties directly from chemical structures.",
        bn: "এআই ফর সায়েন্স (AI4S)-এর প্রতি আমার ক্রমবর্ধমান আগ্রহের অংশ হিসেবে, আমি সরাসরি রাসায়নিক কাঠামো থেকে আণবিক বৈশিষ্ট্য পূর্বাভাস দেওয়ার জন্য গ্রাফ নিউরাল নেটওয়ার্ক (GNN) ব্যবহার করে একটি কম্পিউটেশনাল প্রজেক্ট তৈরি করেছি।",
        zh: "作为对人工智能科学 (AI4S) 兴趣不断扩展的一部分，我开发了一个计算项目，利用图神经网络 (GNN) 直接从化学结构中预测分子特性。"
      },
      focus: {
        en: "Molecules can be naturally represented as graphs, where atoms are nodes and bonds are edges. My focus in this project is to implement and train GNN architectures capable of extracting complex structural features from these molecular graphs. This approach allows for highly accurate prediction of molecular properties, an essential step in modern, AI-driven drug discovery, reducing the need for exhaustive initial lab screening.",
        bn: "অণুগুলোকে প্রাকৃতিকভাবে গ্রাফ হিসাবে উপস্থাপন করা যেতে পারে, যেখানে পরমাণুগুলো হলো নোডস এবং বন্ধনগুলো হলো এজেস। এই প্রকল্পে আমি GNN আর্কিটেকচার প্রয়োগ করেছি যা মলিকিউলার গ্রাফগুলো থেকে জটিল বৈশিষ্ট্য নিষ্কাশন করতে সক্ষম।",
        zh: "分子可以很自然地表示为图，其中原子是节点，化学键是边。我在此项目中的重点是实现和训练能够从这些分子图中提取复杂结构特征的 GNN 架构。这种方法可以高准度地预测分子特性，这是现代人工智能驱动的药物发现中的一个基本步骤，从而减少了进行详尽的初始实验室筛选的需求。"
      },
      statusLabel: {
        en: "Project Status & Open Source",
        bn: "প্রজেক্টের অবস্থা এবং ওপেন সোর্স",
        zh: "项目状态与开源信息"
      },
      status: {
        en: (
          <div>
            Successfully implemented foundational GNN models for molecular property prediction. The complete source code and documentation are available in my GitHub repository.
            <a href="https://github.com/mdsazzadh211810-cmd/Part1_GNN_Molecular_Prediction" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline mt-2">
              <Github size={16} /> View on GitHub
            </a>
          </div>
        ),
        bn: (
          <div>
            সাফল্যের সাথে মৌলিক GNN মডেলগুলো সফলভাবে প্রয়োগ করা হয়েছে। সম্পূর্ণ সোর্স কোড এবং ডকুমেন্টেশন আমার গিটহাব রিপোজিটরিতে (GitHub Repository) উপলব্ধ।
            <a href="https://github.com/mdsazzadh211810-cmd/Part1_GNN_Molecular_Prediction" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline mt-2">
              <Github size={16} /> গিটহাবে দেখুন
            </a>
          </div>
        ),
        zh: (
          <div>
            成功实现了用于分子特性预测的基础 GNN 模型。完整的源代码和文档可在我的 GitHub 存储库中查看。
            <a href="https://github.com/mdsazzadh211810-cmd/Part1_GNN_Molecular_Prediction" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline mt-2">
              <Github size={16} /> 在 GitHub 上查看
            </a>
          </div>
        )
      },
      icon: <Network size={32} className="text-blue-600" />
    },
    {
      id: 5,
      category: {
        en: "Academic Wet-Lab Research",
        bn: "একাডেমিক ওয়েট-ল্যাব গবেষণা",
        zh: "学术湿实验研究"
      },
      title: {
        en: "Genetic Engineering Lab 1: Plant Genomic DNA Extraction",
        bn: "জেনেটিক ইঞ্জিনিয়ারিং ল্যাব ১: উদ্ভিদের জিনোমিক ডিএনএ (DNA) নিষ্কাশন",
        zh: "基因工程实验一：植物基因组 DNA 提取"
      },
      overview: {
        en: "Conducted foundational molecular biology experiments focusing on extracting genomic DNA from Nicotiana benthamiana using two distinct methodologies (a commercial Kit Method vs. a Rapid NaOH Extraction Method).",
        bn: "নিকোটিয়ানা বেন্থামিয়ানা (Nicotiana benthamiana) থেকে জিনোমিক ডিএনএ নিষ্কাশনের মৌলিক আণবিক জীববিদ্যা পরীক্ষাটি দুটি ভিন্ন পদ্ধতির মাধ্যমে সম্পন্ন করেছি (বাণিজ্যিক কিট পদ্ধতি এবং র‍্যাপিড NaOH নিষ্কাশন পদ্ধতি)।",
        zh: "进行了基础的分子生物学实验，重点是使用两种不同的方法（商业试剂盒法与快速 NaOH 提取法）从本氏烟草 (Nicotiana benthamiana) 中提取基因组 DNA。"
      },
      focus: {
        en: "The primary focus was comparing these two DNA extraction methodologies by analyzing purity, concentration, and yield. I utilized NanoDrop spectrophotometry for precise quantification and Agarose Gel Electrophoresis (AGE) for visual assessment of DNA integrity. The commercial kit yielded high-purity DNA optimal for downstream precision assays, while the rapid method proved more suitable for high-throughput preliminary screening.",
        bn: "দুটি পদ্ধতির বিশুদ্ধতা, ঘনত্ব এবং সামগ্রিক ফলাফলের বিশ্লেষণ করে তাদের তুলনামূলক যোগ্যতা প্রমাণ করাই ছিল এর মূল লক্ষ্য। আমি ডিএনএ পরিমাপের জন্য ন্যানোড্রপ স্পেকট্রোফটোমেট্রি এবং গুণগত মান মূল্যায়নের জন্য অ্যাগারোজ জেল ইলেক্ট্রোফোরেসিস (AGE) ব্যবহার করেছি।",
        zh: "主要重点是通过分析纯度、浓度和产量来比较这两种 DNA 提取方法。我利用 NanoDrop 分光光度计进行精确标定，并通过琼脂糖凝胶电泳 (AGE) 对 DNA 完整性进行目视评估。商业套件产出了适用于下游精密测定的高纯度 DNA，而快速法证明更适合高通量初步筛选。"
      },
      statusLabel: {
        en: "Completed Lab Report",
        bn: "সম্পূর্ণ ল্যাব রিপোর্ট",
        zh: "已完成的实验报告"
      },
      status: {
        en: (
          <div>
            <p className="mb-4 text-slate-700 leading-relaxed">I have successfully authored a detailed laboratory report that documents the methodologies, results, and critical discussions of this experiment. You can view the original PDF report below:</p>
            <div className="flex mt-4 relative z-10">
              <a href={`${import.meta.env.BASE_URL}assets/Lab_1_Report.pdf`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm hover:shadow" onClick={(e) => e.stopPropagation()}>
                <FileText size={18} /> View Lab 1 Report
              </a>
            </div>
          </div>
        ),
        bn: (
          <div>
            <p className="mb-4 text-slate-700 leading-relaxed">আমি এই পরীক্ষার কার্যপ্রণালী, ফলাফল এবং প্রাসঙ্গিক মূল্যায়ন বিস্তারিতভাবে নথিবদ্ধ করে একটি পূর্ণাঙ্গ ল্যাবরেটরি বৈজ্ঞানিক প্রতিবেদন লিখেছি যা সফলভাবে মূল্যায়িত হয়েছে। আপনি নিচের লিঙ্ক থেকে মূল পিডিএফ রিপোর্টটি দেখতে পারেন:</p>
            <div className="flex mt-4 relative z-10">
              <a href={`${import.meta.env.BASE_URL}assets/Lab_1_Report.pdf`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm hover:shadow" onClick={(e) => e.stopPropagation()}>
                <FileText size={18} /> রিপোর্ট ১ (ল্যাব ১) দেখুন
              </a>
            </div>
          </div>
        ),
        zh: (
          <div>
            <p className="mb-4 text-slate-700 leading-relaxed">我已经成功撰写了一份详细的实验室报告，记录了该实验的方法、结果和批判性讨论点。您可以在下面查看原始的 PDF 报告：</p>
            <div className="flex mt-4 relative z-10">
              <a href={`${import.meta.env.BASE_URL}assets/Lab_1_Report.pdf`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm hover:shadow" onClick={(e) => e.stopPropagation()}>
                <FileText size={18} /> 查看实验 1 报告
              </a>
            </div>
          </div>
        )
      },
      icon: <Beaker size={32} className="text-blue-600" />
    },
    {
      id: 6,
      category: {
        en: "Academic Wet-Lab Research",
        bn: "একাডেমিক ওয়েট-ল্যাব গবেষণা",
        zh: "学术湿实验研究"
      },
      title: {
        en: "Genetic Engineering Lab 2: PCR Amplification & Purification",
        bn: "জেনেটিক ইঞ্জিনিয়ারিং ল্যাব ২: পিসিআর (PCR) পরিবর্ধন এবং বিশুদ্ধকরণ",
        zh: "基因工程实验二：PCR 扩增与纯化"
      },
      overview: {
        en: "As a continuation of the DNA extraction processes, I performed targeted gene amplification. This lab successfully amplified the Nicotiana benthamiana actin-97 (NbActin-97) gene using Polymerase Chain Reaction (PCR).",
        bn: "ডিএনএ (DNA) নিষ্কাশন প্রক্রিয়ার ধারাবাহিকতায় আমি নিয়ন্ত্রিত জিন এমপ্লিফিকেশন সম্পন্ন করেছি। এই ল্যাবে মূলত পলিমারেজ চেইন রিঅ্যাকশন (PCR) ব্যবহার করে নিকোটিয়ানা বেন্থামিয়ানা অ্যাকটিন-৯৭ (NbActin-97) জিনের সফল পরিবর্ধন করা হয়েছে।",
        zh: "作为 DNA 提取过程的延续，我进行了靶向基因扩增。本次实验利用聚合酶链式反应 (PCR) 成功扩增了本氏烟草 actin-97 (NbActin-97) 基因。"
      },
      focus: {
        en: "Demonstrated mastery over PCR reaction setup and thermal cycler operations. The focus included stringent primer design validation and visualization via agarose gel electrophoresis to ensure specific amplicon sizes (545 bp). The subsequent step involved executing precise PCR product purification using gel extraction techniques to prepare high-quality DNA fragments suitable for cloning and transformation.",
        bn: "পিসিআর রিঅ্যাকশন সেটআপ এবং থার্মাল সাইক্লার (Thermal cycler) অপারেটিংয়ে আমার দক্ষতা প্রদর্শন করেছি। আমি প্রাইমার ডিজাইন ভ্যালিডেশন এবং অ্যাগারোজ জেল ইলেক্ট্রোফোরেসিসের সাহায্যে ৫৪৫ বিপি স্পেসিফিক অ্যাম্প্লিকন আকারের বিশ্লেষণ সম্পন্ন করেছি। পরবর্তীতে ডিএনএ খণ্ডগুলো প্রস্তুত করার জন্য জেল এক্সট্রাকশন ব্যবহার করে পিসিআর প্রোডাক্ট পরিষ্কার করার পদ্ধতি পরিচালনা করেছি।",
        zh: "展现了在设置 PCR 反应和热循环仪操作方面的熟练技能。主要侧重于通过琼脂糖凝胶电泳验证和目视检查严格设计的引物，以确保产生大小正确的扩增子（545 bp）。随后的步骤涉及使用凝胶提取技术进行精确的 PCR 产物纯化，为后续的克隆和转化制备高质量的 DNA 片段。"
      },
      statusLabel: {
        en: "Completed Lab Report",
        bn: "সম্পূর্ণ ল্যাব রিপোর্ট",
        zh: "已完成的实验报告"
      },
      status: {
        en: (
          <div>
            <p className="mb-4 text-slate-700 leading-relaxed">I have successfully authored a detailed laboratory report that documents the methodologies, PCR programs, and critical discussions of this process. You can view the original PDF report below:</p>
            <div className="flex mt-4 relative z-10">
              <a href={`${import.meta.env.BASE_URL}assets/Lab_2_Report.pdf`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm hover:shadow" onClick={(e) => e.stopPropagation()}>
                <FileText size={18} /> View Lab 2 Report
              </a>
            </div>
          </div>
        ),
        bn: (
          <div>
            <p className="mb-4 text-slate-700 leading-relaxed">আমি এই প্রক্রিয়ায় পিসিআর প্রোগ্রাম এবং প্রাসঙ্গিক আলোচনা বিস্তারিতভাবে নথিবদ্ধ করে একটি পূর্ণাঙ্গ ল্যাবরেটরি বৈজ্ঞানিক প্রতিবেদন লিখেছি যা পরবর্তীতে সফলভাবে মূল্যায়িত হয়েছে। মূল পিডিএফ রিপোর্টটি নিচে দেওয়া হলো:</p>
            <div className="flex mt-4 relative z-10">
              <a href={`${import.meta.env.BASE_URL}assets/Lab_2_Report.pdf`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm hover:shadow" onClick={(e) => e.stopPropagation()}>
                <FileText size={18} /> রিপোর্ট ২ (ল্যাব ২) দেখুন
              </a>
            </div>
          </div>
        ),
        zh: (
          <div>
            <p className="mb-4 text-slate-700 leading-relaxed">我已经成功撰写了一份详细的实验室报告，记录了该过程的方法、PCR 程序和批判性讨论点。您可以在下面查看原始的 PDF 报告：</p>
            <div className="flex mt-4 relative z-10">
              <a href={`${import.meta.env.BASE_URL}assets/Lab_2_Report.pdf`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm hover:shadow" onClick={(e) => e.stopPropagation()}>
                <FileText size={18} /> 查看实验 2 报告
              </a>
            </div>
          </div>
        )
      },
      icon: <Microscope size={32} className="text-blue-600" />
    }
  ];

  const currentIndex = projects.findIndex(p => p.id === currentProjectId);
  const project = projects[currentIndex] || projects[0];
  
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < projects.length - 1;

  const handlePrev = () => {
    if (hasPrev) setCurrentProjectId(projects[currentIndex - 1].id);
  };

  const handleNext = () => {
    if (hasNext) setCurrentProjectId(projects[currentIndex + 1].id);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-6 group font-medium"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>{lang === 'bn' ? 'পোর্টফোলিওতে ফিরে যান' : lang === 'zh' ? '返回作品集' : 'Back to Portfolio'}</span>
          </button>
        </div>
        
        <div className="flex flex-col gap-12">
          <div key={project.id} className="bg-white p-8 md:p-12 border border-slate-200 shadow-sm rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
            
            <div className="flex items-start gap-4 mb-8">
              <div className="p-4 bg-blue-50 rounded-xl">
                {project.icon}
              </div>
              <div>
                <span className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-2 block">{project.category[lang]}</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">{project.title[lang]}</h2>
              </div>
            </div>
            
            <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{lang === 'bn' ? 'ওভারভিউ' : lang === 'zh' ? '概述' : 'Overview'}</h3>
                <p>{project.overview[lang]}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{lang === 'bn' ? 'গবেষণা ফোকাস' : lang === 'zh' ? '研究重点' : 'Research Focus'}</h3>
                <p>{project.focus[lang]}</p>
              </div>
              
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
                <h3 className="text-xl font-bold text-blue-700 mb-3">{project.statusLabel[lang]}</h3>
                <div className="text-slate-800 font-medium">{project.status[lang]}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex justify-between items-center pt-6">
          {hasPrev ? (
            <button 
              onClick={handlePrev}
              className="flex items-center gap-3 text-slate-600 hover:text-blue-600 font-medium transition-colors group bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md max-w-[48%]"
            >
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform text-blue-600 flex-shrink-0" />
              <div className="text-left overflow-hidden">
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-bold mb-1">{lang === 'bn' ? 'আগের প্রজেক্ট' : lang === 'zh' ? '上一个项目' : 'Previous Project'}</span>
                <span className="block truncate text-sm">{projects[currentIndex - 1].title[lang]}</span>
              </div>
            </button>
          ) : <div className="max-w-[48%]"></div>}

          {hasNext ? (
            <button 
              onClick={handleNext}
              className="flex items-center gap-3 text-slate-600 hover:text-blue-600 font-medium transition-colors group bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md max-w-[48%] text-right justify-end"
            >
              <div className="text-right overflow-hidden">
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-bold mb-1">{lang === 'bn' ? 'পরবর্তী প্রজেক্ট' : lang === 'zh' ? '下一个项目' : 'Next Project'}</span>
                <span className="block truncate text-sm">{projects[currentIndex + 1].title[lang]}</span>
              </div>
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform text-blue-600 flex-shrink-0" />
            </button>
          ) : <div className="max-w-[48%]"></div>}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const t = tDict[lang];
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeResearchTab, setActiveResearchTab] = useState('interests');
  const [selectedInterest, setSelectedInterest] = useState<number | null>(null);
  const [lastSelectedInterest, setLastSelectedInterest] = useState<number>(1);
  const [isResearchExpanded, setIsResearchExpanded] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showCVPage, setShowCVPage] = useState(false);
  
  const [showProjectsPage, setShowProjectsPage] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number>(1);

  // Ref to hold scroll position
  const scrollPositionRef = useRef<number>(0);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#cv-page') {
        setShowCVPage(true);
        setShowProjectsPage(false);
        setActiveSection('cv');
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 200);
      } else if (hash.startsWith('#project-')) {
        const id = parseInt(hash.replace('#project-', ''));
        setSelectedProject(id);
        setShowProjectsPage(true);
        setShowCVPage(false);
        setActiveSection('research');
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 200);
      } else {
        setShowCVPage(false);
        setShowProjectsPage(false);
        
        // Wait for DOM to update, then scroll to section or restore
        setTimeout(() => {
          if (hash && hash !== '#') {
            const element = document.querySelector(hash);
            if (element) {
              const elementPosition = element.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({
                top: elementPosition - 80, // Offset for navbar
                behavior: 'smooth'
              });
              // Set active section based on hash
              setActiveSection(hash.substring(1));
            }
          } else if (hash === '') {
            // Revert to saved scroll position if available, else let browser handle it
            if (scrollPositionRef.current > 0) {
              window.scrollTo({ top: scrollPositionRef.current, behavior: 'auto' });
              scrollPositionRef.current = 0; // Reset after using
            } else if (window.scrollY === 0) {
              setActiveSection('home');
            }
          }
        }, 300);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on mount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  // New state variables for Skills & Certificates section
  const [isSkillsExpanded, setIsSkillsExpanded] = useState(false);
  const [activeSkillsTab, setActiveSkillsTab] = useState<'skills' | 'certificates'>('skills');
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  const interestRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Add click outside handler for lang menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('#lang-switcher')) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedInterest !== null) {
      setLastSelectedInterest(selectedInterest);
    }
  }, [selectedInterest]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (window.innerWidth >= 768) return; // Only apply on mobile/tablet
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'));
            if (id) setSelectedInterest(id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -30% 0px', // Trigger when item is in the middle 40% of the screen
        threshold: 0,
      }
    );

    const currentRefs = interestRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [activeResearchTab, isResearchExpanded]);

  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (showCVPage) {
        setActiveSection('cv');
        return;
      }
      if (showProjectsPage) {
        setActiveSection('research');
        return;
      }

      const sections = ['home', 'about', 'research', 'vision', 'skills', 'cv', 'contact'];
      let current = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 150) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount/update
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showCVPage, showProjectsPage]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Research', href: '#research' },
    { name: 'Vision', href: '#vision' },
    { name: 'Skills & Certificates', href: '#skills' },
    { name: 'CV', href: '#cv' },
    { name: 'Contact', href: '#contact' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  // Custom Logo Component inspired by the user's design
  const NavbarLogo = () => (
    <a href="#home" className="flex items-center group">
      <div className="relative flex items-center justify-center w-10 h-10 mr-1">
        {/* Copper/Rose Gold 'M' */}
        <span className="absolute text-3xl font-serif font-bold transition-transform group-hover:scale-105" style={{ color: '#b8735c', left: '0px', top: '2px' }}>M</span>
        {/* Navy Blue 'S' overlapping */}
        <span className="absolute text-4xl font-serif font-bold transition-transform group-hover:scale-105" style={{ color: '#0f2c59', left: '12px', top: '-4px', textShadow: '2px 0 4px rgba(255,255,255,0.8)' }}>S</span>
      </div>
      <span className="text-2xl font-sans font-light tracking-wide text-slate-800 ml-3">
        Hossain
      </span>
    </a>
  );

  const FooterLogo = () => (
    <a href="#home" className="flex items-center group">
      <div className="relative flex items-center justify-center w-10 h-10 mr-1">
        {/* Lighter Copper for dark background */}
        <span className="absolute text-3xl font-serif font-bold" style={{ color: '#e2a488', left: '0px', top: '2px' }}>M</span>
        {/* Lighter Blue for dark background */}
        <span className="absolute text-4xl font-serif font-bold" style={{ color: '#60a5fa', left: '12px', top: '-4px', textShadow: '2px 0 4px rgba(15,23,42,0.9)' }}>S</span>
      </div>
      <span className="text-2xl font-sans font-light tracking-wide text-white ml-3">
        Hossain
      </span>
    </a>
  );

  const isNavDocked = scrolled || showCVPage || showProjectsPage;

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isNavDocked ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between relative min-h-[48px]">
          
          {/* Left side: Profile Photo & Name (Visible when scrolled) */}
          <button 
            onClick={() => setIsProfileModalOpen(true)}
            className={`absolute left-6 md:left-12 flex flex-col items-center justify-center transition-all duration-500 ease-in-out hover:scale-105 ${isNavDocked ? 'opacity-100 translate-x-0 cursor-pointer' : 'opacity-0 -translate-x-10 pointer-events-none'}`}
            aria-label="View full profile and contact"
          >
            <img 
              src="https://github.com/mdsazzadh211810-cmd.png" 
              alt="MD SAZZAD HOSSAIN" 
              className="w-8 h-8 md:w-9 md:h-9 object-cover rounded-full border border-slate-200 shadow-sm"
              onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/sazzad/400/400"; }}
            />
            <span className="text-[10px] font-bold text-slate-800 leading-tight mt-0.5 whitespace-nowrap">Md Sazzad Hossain</span>
          </button>

          {/* Center/Left: Logo */}
          <div className={`absolute transition-all duration-500 ease-in-out ${isNavDocked ? 'left-1/2 -translate-x-1/2' : 'left-6 md:left-12'}`}>
            <NavbarLogo />
          </div>

          {/* Right side: Language Switcher & Hamburger Menu */}
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2 md:gap-4 z-50 relative">
            <div id="lang-switcher" className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 text-slate-600 hover:text-blue-600 transition-colors bg-white/50 backdrop-blur-sm rounded-md border border-slate-200"
                aria-label="Change language"
              >
                <Languages size={18} className="sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium uppercase">{lang}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-36 bg-white border border-slate-200 shadow-lg rounded-md overflow-hidden py-1">
                  <button onClick={() => { setLang('en'); setIsLangMenuOpen(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${lang === 'en' ? 'text-blue-600 font-medium bg-blue-50/50' : 'text-slate-700'}`}>English</button>
                  <button onClick={() => { setLang('bn'); setIsLangMenuOpen(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${lang === 'bn' ? 'text-blue-600 font-medium bg-blue-50/50' : 'text-slate-700'}`}>বাংলা</button>
                  <button onClick={() => { setLang('zh'); setIsLangMenuOpen(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${lang === 'zh' ? 'text-blue-600 font-medium bg-blue-50/50' : 'text-slate-700'}`}>中文 (简体)</button>
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Smooth Compact Dropdown Menu */}
        <div 
          className={`absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-sm overflow-hidden transition-all duration-500 ease-in-out origin-top ${
            isMenuOpen ? 'max-h-64 opacity-100 border-b border-slate-200 py-4' : 'max-h-0 opacity-0 py-0'
          }`}
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-row flex-wrap justify-center md:justify-end items-center gap-x-8 gap-y-4 text-lg font-serif">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu();
                  if (link.name === 'Research') {
                    setIsResearchExpanded(true);
                  }
                  
                  // Update URL visually without jumping
                  window.history.pushState(null, '', link.href);

                  if (showCVPage || showProjectsPage) {
                    setShowCVPage(false);
                    setShowProjectsPage(false);
                    // allow unmount animation before scroll
                    setTimeout(() => {
                      const element = document.querySelector(link.href);
                      if (element) {
                        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                        window.scrollTo({ top: elementPosition - 80, behavior: 'smooth' });
                      }
                      setActiveSection(link.href.substring(1));
                    }, 400); // Wait for transition
                  } else {
                    const element = document.querySelector(link.href);
                    if (element) {
                      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                      window.scrollTo({ top: elementPosition - 80, behavior: 'smooth' });
                    }
                    setActiveSection(link.href.substring(1));
                  }
                }}
                className={`transition-colors whitespace-nowrap hover:scale-105 transform duration-200 ${activeSection === link.href.substring(1) ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600'}`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {showCVPage && (
          <motion.div key="cv" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4, ease: "easeOut" }}>
            <CVPage onClose={() => window.history.back()} lang={lang} />
          </motion.div>
        )}
        
        {showProjectsPage && (
          <motion.div key="projects" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4, ease: "easeOut" }}>
            <ProjectsPage onClose={() => window.history.back()} currentProjectId={selectedProject} setCurrentProjectId={setSelectedProject} lang={lang} />
          </motion.div>
        )}

        {!(showCVPage || showProjectsPage) && (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="block">
            <main>
          {/* Hero Section */}
        <section id="home" className="pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
              {t.hero.name}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl border-l-4 border-blue-600 pl-6 italic">
              {t.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="#contact" className="px-8 py-3 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors font-medium tracking-wide">
                {t.hero.getInTouch}
              </a>
              <a 
                href="#research" 
                onClick={() => setIsResearchExpanded(true)}
                className="px-8 py-3 bg-slate-100 text-slate-700 rounded-sm hover:bg-slate-200 transition-colors font-medium tracking-wide"
              >
                {t.hero.viewResearch}
              </a>
            </div>
          </div>
          <div className="w-48 h-48 md:w-72 md:h-72 shrink-0 relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full transform translate-x-4 translate-y-4 -z-10"></div>
            <img 
              src="https://github.com/mdsazzadh211810-cmd.png" 
              alt={t.hero.name} 
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
              onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/sazzad/400/400"; }}
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-slate-50 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-serif font-bold text-slate-900">{t.sections.about}</h2>
              <div className="h-px bg-slate-300 flex-1"></div>
            </div>
            <div className="prose prose-lg text-slate-600 font-light leading-relaxed">
              <p className="mb-6">{t.aboutMe[0]}</p>
              <p className="mb-6">{t.aboutMe[1]}</p>
              <p>{t.aboutMe[2]}</p>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section id="research" className="pt-20 pb-10 bg-slate-50 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <button 
              onClick={() => setIsResearchExpanded(!isResearchExpanded)}
              className="flex items-center gap-4 mb-6 w-full text-left group cursor-pointer"
            >
              <h2 className="text-3xl font-serif font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-3">
                {t.sections.research}
                <ChevronDown className={`transition-transform duration-500 ${isResearchExpanded ? 'rotate-180' : ''}`} size={28} />
              </h2>
              <div className="h-px bg-slate-300 flex-1 group-hover:bg-blue-300 transition-colors"></div>
            </button>

            <div className={`grid transition-all duration-500 ease-in-out ${isResearchExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div className="pt-6 pb-10">
                  {/* Tabs */}
                  <div className="flex flex-wrap gap-6 mb-10 border-b border-slate-200">
                    <button 
                      onClick={() => setActiveResearchTab('interests')} 
                      className={`pb-4 font-medium text-lg transition-colors relative ${activeResearchTab === 'interests' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      {t.researchTabs.interests}
                      {activeResearchTab === 'interests' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>}
                    </button>
                    <button 
                      onClick={() => setActiveResearchTab('projects')} 
                      className={`pb-4 font-medium text-lg transition-colors relative ${activeResearchTab === 'projects' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      {t.researchTabs.projects}
                      {activeResearchTab === 'projects' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>}
                    </button>
                    <button 
                      onClick={() => setActiveResearchTab('current')} 
                      className={`pb-4 font-medium text-lg transition-colors relative ${activeResearchTab === 'current' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      {t.researchTabs.current}
                      {activeResearchTab === 'current' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>}
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="relative">
                    {/* Interests Tab */}
                    <div className={`grid transition-all duration-500 ease-in-out ${activeResearchTab === 'interests' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-2">
                          {RESEARCH_INTERESTS.map((interest, index) => (
                            <div 
                              key={interest.id} 
                              className="relative h-full flex flex-col"
                              data-id={interest.id}
                              ref={(el) => (interestRefs.current[index] = el)}
                              onMouseEnter={() => window.innerWidth >= 768 && setSelectedInterest(interest.id)}
                              onMouseLeave={() => window.innerWidth >= 768 && setSelectedInterest(null)}
                            >
                              <button 
                                onClick={() => setSelectedInterest(selectedInterest === interest.id ? null : interest.id)}
                                className={`w-full text-left p-6 bg-white border rounded-lg transition-all flex items-center justify-between group flex-1 ${selectedInterest === interest.id ? 'border-blue-400 shadow-md' : 'border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md'}`}
                              >
                                <div className="flex items-center gap-4">
                                  <div className={`p-3 rounded-lg transition-colors ${selectedInterest === interest.id ? 'bg-blue-600 text-white' : 'text-blue-600 bg-blue-50 group-hover:bg-blue-100'}`}>
                                    {interest.icon}
                                  </div>
                                  <h3 className="font-bold text-slate-800 text-lg">{interest.title[lang]}</h3>
                                </div>
                              </button>
                              
                              {/* Accordion Content for Mobile */}
                              <div 
                                className={`md:hidden grid transition-all duration-500 ease-in-out ${
                                  selectedInterest === interest.id 
                                    ? 'grid-rows-[1fr] opacity-100 mt-3' 
                                    : 'grid-rows-[0fr] opacity-0 mt-0'
                                }`}
                              >
                                <div className="overflow-hidden">
                                  <div className="pt-2 pb-2">
                                    <div className="p-5 bg-slate-800 text-white rounded-lg shadow-md relative">
                                      <div className="absolute top-0 left-10 w-4 h-4 bg-slate-800 transform rotate-45"></div>
                                      <div className="text-sm leading-relaxed relative z-10">{interest.desc[lang]}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Display area for Desktop/Tablet */}
                        <div className={`hidden md:grid transition-all duration-500 ease-in-out ${selectedInterest ? 'grid-rows-[1fr] opacity-100 mt-8' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                          <div className="overflow-hidden">
                            <div className="pt-4 pb-2">
                              <div className="p-8 bg-blue-50/50 border border-blue-100 rounded-xl shadow-sm relative">
                                {/* Visual indicator (Arrow pointing up) */}
                                <div 
                                  className="absolute -top-3 w-6 h-6 bg-blue-50/50 border-t border-l border-blue-100 transform rotate-45 transition-all duration-500"
                                  style={{ 
                                    left: lastSelectedInterest === 1 ? '16.66%' : lastSelectedInterest === 2 ? '50%' : '83.33%',
                                    marginLeft: '-12px'
                                  }}
                                ></div>
                                
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                                    {RESEARCH_INTERESTS.find(i => i.id === lastSelectedInterest)?.icon}
                                  </div>
                                  <h3 className="text-2xl font-bold text-slate-800">
                                    {RESEARCH_INTERESTS.find(i => i.id === lastSelectedInterest)?.title[lang]}
                                  </h3>
                                </div>
                                <div className="text-slate-700 leading-relaxed space-y-4 relative z-10">
                                  {RESEARCH_INTERESTS.find(i => i.id === lastSelectedInterest)?.desc[lang]}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Projects Tab */}
                    <div className={`grid transition-all duration-500 ease-in-out ${activeResearchTab === 'projects' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-2">
                          {/* Project 4: Genetic Engineering Lab 1 */}
                          <div 
                            onClick={(e) => {
                              if ((e.target as HTMLElement).closest('a')) return;
                              scrollPositionRef.current = window.scrollY;
                              window.location.hash = 'project-5';
                            }}
                            className="group cursor-pointer border border-slate-200 p-8 hover:border-blue-600 hover:shadow-lg transition-all duration-300 bg-white relative overflow-hidden flex flex-col"
                          >
                            <div className="absolute top-0 left-0 w-1 h-0 bg-blue-600 transition-all duration-300 group-hover:h-full"></div>
                            <div className="flex justify-between items-start mb-4">
                              <div className="text-blue-600 flex items-center gap-3">
                                <Beaker size={32} strokeWidth={1.5} />
                              </div>
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200 shadow-sm">
                                {t.currentProjects.p4.badge}
                              </span>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">
                              {t.currentProjects.p4.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                              <strong className="text-slate-800 font-medium">{t.currentProjects.p4.focusLabel}</strong> {t.currentProjects.p4.focusText}<br/><br/>
                              {t.currentProjects.p4.desc}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100 mb-4">
                              {t.currentProjects.p4.tags.map((tag, i) => (
                                <span key={i} className={`px-2 py-1 text-xs font-medium rounded ${i === 0 ? 'bg-blue-50 text-blue-700' : i === 1 ? 'bg-purple-50 text-purple-700' : 'bg-emerald-50 text-emerald-700'}`}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-3 relative z-10 mt-auto">
                              <a href={`${import.meta.env.BASE_URL}assets/Lab_1_Report.pdf`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                <FileText size={16} /> {t.currentProjects.p4.linkText}
                              </a>
                            </div>
                          </div>

                          {/* Project 5: Genetic Engineering Lab 2 */}
                          <div 
                            onClick={(e) => {
                              if ((e.target as HTMLElement).closest('a')) return;
                              scrollPositionRef.current = window.scrollY;
                              window.location.hash = 'project-6';
                            }}
                            className="group cursor-pointer border border-slate-200 p-8 hover:border-blue-600 hover:shadow-lg transition-all duration-300 bg-white relative overflow-hidden flex flex-col"
                          >
                            <div className="absolute top-0 left-0 w-1 h-0 bg-blue-600 transition-all duration-300 group-hover:h-full"></div>
                            <div className="flex justify-between items-start mb-4">
                              <div className="text-blue-600 flex items-center gap-3">
                                <Microscope size={32} strokeWidth={1.5} />
                              </div>
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200 shadow-sm">
                                {t.currentProjects.p5.badge}
                              </span>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">
                              {t.currentProjects.p5.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                              <strong className="text-slate-800 font-medium">{t.currentProjects.p5.focusLabel}</strong> {t.currentProjects.p5.focusText}<br/><br/>
                              {t.currentProjects.p5.desc}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100 mb-4">
                              {t.currentProjects.p5.tags.map((tag, i) => (
                                <span key={i} className={`px-2 py-1 text-xs font-medium rounded ${i === 0 ? 'bg-blue-50 text-blue-700' : i === 1 ? 'bg-purple-50 text-purple-700' : 'bg-emerald-50 text-emerald-700'}`}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-3 relative z-10 mt-auto">
                              <a href={`${import.meta.env.BASE_URL}assets/Lab_2_Report.pdf`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                <FileText size={16} /> {t.currentProjects.p5.linkText}
                              </a>
                            </div>
                          </div>

                          {/* Project 3: GNN Molecular Property Prediction */}
                          <div className="group border border-slate-200 p-8 hover:border-blue-600 hover:shadow-lg transition-all duration-300 bg-white relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 left-0 w-1 h-0 bg-blue-600 transition-all duration-300 group-hover:h-full"></div>
                            <div className="flex justify-between items-start mb-4">
                              <div className="text-blue-600"><Network size={32} strokeWidth={1.5} /></div>
                              <div className="flex flex-col items-end gap-2">
                                <a href="https://github.com/mdsazzadh211810-cmd/Part1_GNN_Molecular_Prediction" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors z-10" title="View Source on GitHub">
                                  <Github size={24} />
                                </a>
                              </div>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">
                              {t.currentProjects.p3.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                              <strong className="text-slate-800 font-medium">{t.currentProjects.p3.focusLabel}</strong> {t.currentProjects.p3.focusText}<br/><br/>
                              {t.currentProjects.p3.desc}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
                              {t.currentProjects.p3.tags.map((tag, i) => (
                                <span key={i} className={`px-2 py-1 text-xs font-medium rounded ${i === 0 ? 'bg-blue-50 text-blue-700' : i === 1 ? 'bg-emerald-50 text-emerald-700' : i === 2 ? 'bg-purple-50 text-purple-700' : 'bg-slate-100 text-slate-700'}`}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <a href="https://github.com/mdsazzadh211810-cmd/Part1_GNN_Molecular_Prediction" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0">
                              <span className="sr-only">View Project</span>
                            </a>
                          </div>

                          {/* Project 2: dsRNA Predictor */}
                          <div className="group border border-slate-200 p-8 hover:border-blue-600 hover:shadow-lg transition-all duration-300 bg-white relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 left-0 w-1 h-0 bg-blue-600 transition-all duration-300 group-hover:h-full"></div>
                            <div className="flex justify-between items-start mb-4">
                              <div className="text-blue-600"><Cpu size={32} strokeWidth={1.5} /></div>
                              <a href="https://github.com/mdsazzadh211810-cmd/dsrna-predictor" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors z-10" title="View Source on GitHub">
                                <Github size={24} />
                              </a>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">
                              {t.currentProjects.p2.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                              <strong className="text-slate-800 font-medium">{t.currentProjects.p2.focusLabel}</strong> {t.currentProjects.p2.focusText}<br/><br/>
                              {t.currentProjects.p2.desc}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
                              {t.currentProjects.p2.tags.map((tag, i) => (
                                <span key={i} className={`px-2 py-1 text-xs font-medium rounded ${i === 0 ? 'bg-blue-50 text-blue-700' : i === 1 ? 'bg-emerald-50 text-emerald-700' : i === 2 ? 'bg-purple-50 text-purple-700' : 'bg-slate-100 text-slate-700'}`}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <a href="https://github.com/mdsazzadh211810-cmd/dsrna-predictor" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0">
                              <span className="sr-only">View Project</span>
                            </a>
                          </div>

                          {/* Project 1: Amylase Kinetics (Unpublished) */}
                          <div className="group border border-slate-200 p-8 hover:border-blue-600 hover:shadow-lg transition-all duration-300 bg-white relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 left-0 w-1 h-0 bg-blue-600 transition-all duration-300 group-hover:h-full"></div>
                            <div className="flex justify-between items-start mb-4">
                              <div className="text-blue-600 flex items-center gap-3">
                                <Microscope size={32} strokeWidth={1.5} />
                                <a href={`${import.meta.env.BASE_URL}assets/Manuscript.pdf`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors z-10" title="View Manuscript PDF">
                                  <ExternalLink size={20} />
                                </a>
                              </div>
                              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-200 shadow-sm">
                                {t.currentProjects.p1.badge}
                              </span>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">
                              {t.currentProjects.p1.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                              <strong className="text-slate-800 font-medium">{t.currentProjects.p1.focusLabel}</strong> {t.currentProjects.p1.focusText}<br/><br/>
                              {t.currentProjects.p1.desc}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
                              {t.currentProjects.p1.tags.map((tag, i) => (
                                <span key={i} className={`px-2 py-1 text-xs font-medium rounded ${i === 0 ? 'bg-blue-50 text-blue-700' : i === 1 ? 'bg-emerald-50 text-emerald-700' : i === 2 ? 'bg-purple-50 text-purple-700' : 'bg-slate-100 text-slate-700'}`}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <a href={`${import.meta.env.BASE_URL}assets/Manuscript.pdf`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0">
                              <span className="sr-only">{t.currentProjects.p1.linkText || 'View'}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Current Projects Tab */}
                    <div className={`grid transition-all duration-500 ease-in-out ${activeResearchTab === 'current' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-2">
                          
                          {/* Project 1 */}
                          <div 
                            onClick={() => {
                              scrollPositionRef.current = window.scrollY;
                              window.location.hash = 'project-1';
                            }}
                            className="group cursor-pointer border border-slate-200 p-6 hover:border-blue-600 hover:shadow-lg transition-all duration-300 bg-white relative overflow-hidden flex flex-col h-full"
                          >
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <div className="text-blue-600 mb-4 bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Microscope size={24} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-serif font-bold text-slate-900 mb-3 line-clamp-3">
                              Functional Properties and Starch Digestibility of Lily Bulbs
                            </h3>
                            <div className="mt-auto pt-4 border-t border-slate-100">
                              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
                                Current Status
                              </span>
                              <p className="text-slate-500 text-xs mt-3 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                                View full details <ArrowLeft size={12} className="rotate-180" />
                              </p>
                            </div>
                          </div>

                          {/* Project 2 */}
                          <div 
                            onClick={() => {
                              scrollPositionRef.current = window.scrollY;
                              window.location.hash = 'project-2';
                            }}
                            className="group cursor-pointer border border-slate-200 p-6 hover:border-blue-600 hover:shadow-lg transition-all duration-300 bg-white relative overflow-hidden flex flex-col h-full"
                          >
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <div className="text-blue-600 mb-4 bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Cpu size={24} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-serif font-bold text-slate-900 mb-3 line-clamp-3">
                              AI for Science (AI4S) - AI-Driven Drug and Peptide Design
                            </h3>
                            <div className="mt-auto pt-4 border-t border-slate-100">
                              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
                                Current Status
                              </span>
                              <p className="text-slate-500 text-xs mt-3 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                                View full details <ArrowLeft size={12} className="rotate-180" />
                              </p>
                            </div>
                          </div>

                          {/* Project 3 */}
                          <div 
                            onClick={() => {
                              scrollPositionRef.current = window.scrollY;
                              window.location.hash = 'project-3';
                            }}
                            className="group cursor-pointer border border-slate-200 p-6 hover:border-blue-600 hover:shadow-lg transition-all duration-300 bg-white relative overflow-hidden flex flex-col h-full"
                          >
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <div className="text-blue-600 mb-4 bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Leaf size={24} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-serif font-bold text-slate-900 mb-3 line-clamp-3">
                              Plant Genetics & CRISPR-Cas Engineering for Sustainable Agriculture
                            </h3>
                            <div className="mt-auto pt-4 border-t border-slate-100">
                              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">
                                Ultimate Goal
                              </span>
                              <p className="text-slate-500 text-xs mt-3 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                                View full details <ArrowLeft size={12} className="rotate-180" />
                              </p>
                            </div>
                          </div>

                          {/* Project 4 - GNN */}
                          <div 
                            onClick={(e) => {
                              // If user clicks the GitHub link directly on the card, don't open project page
                              if ((e.target as HTMLElement).closest('a')) return;
                              scrollPositionRef.current = window.scrollY;
                              window.location.hash = 'project-4';
                            }}
                            className="group cursor-pointer border border-slate-200 p-6 hover:border-blue-600 hover:shadow-lg transition-all duration-300 bg-white relative overflow-hidden flex flex-col h-full"
                          >
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <div className="text-blue-600 mb-4 bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Network size={24} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-serif font-bold text-slate-900 mb-3 line-clamp-3">
                              GNN for Molecular Property Prediction (AI4S)
                            </h3>
                            <div className="mt-auto pt-4 border-t border-slate-100">
                              <div className="flex justify-between items-center">
                                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
                                  Current Project
                                </span>
                                <a 
                                  href="https://github.com/mdsazzadh211810-cmd/Part1_GNN_Molecular_Prediction" 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-slate-400 hover:text-blue-600 transition-colors z-10 p-1" 
                                  title="View on GitHub"
                                >
                                  <Github size={18} />
                                </a>
                              </div>
                              <p className="text-slate-500 text-xs mt-3 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                                View full details <ArrowLeft size={12} className="rotate-180" />
                              </p>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="py-20 bg-blue-900 text-white px-6 md:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-8">{t.sections.vision}</h2>
            <h3 className="text-2xl font-light mb-10 text-blue-200">{t.visionText.subtitle}</h3>
            <div className="space-y-6 text-lg text-blue-100 leading-relaxed font-light text-left md:text-justify max-w-4xl mx-auto">
              <p>{t.visionText.p1}</p>
              <p>{t.visionText.p2}</p>
              <p>{t.visionText.p3}</p>
            </div>
          </div>
        </section>

        {/* Skills & Certificates Section */}
        <section id="skills" className="pt-20 pb-10 px-6 md:px-12 max-w-6xl mx-auto">
          <button 
            onClick={() => setIsSkillsExpanded(!isSkillsExpanded)}
            className="flex items-center gap-4 mb-6 w-full text-left group cursor-pointer"
          >
            <h2 className="text-3xl font-serif font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-3">
              {t.sections.skills}
              <ChevronDown className={`transition-transform duration-500 ${isSkillsExpanded ? 'rotate-180' : ''}`} size={28} />
            </h2>
            <div className="h-px bg-slate-300 flex-1 group-hover:bg-blue-300 transition-colors"></div>
          </button>

          <div className={`grid transition-all duration-500 ease-in-out ${isSkillsExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <div className="pt-6 pb-10">
                {/* Tabs */}
                <div className="flex flex-wrap gap-6 mb-10 border-b border-slate-200">
                  <button 
                    onClick={() => setActiveSkillsTab('skills')} 
                    className={`pb-4 font-medium text-lg transition-colors relative ${activeSkillsTab === 'skills' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    {t.skillsTabs.skills}
                    {activeSkillsTab === 'skills' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>}
                  </button>
                  <button 
                    onClick={() => setActiveSkillsTab('certificates')} 
                    className={`pb-4 font-medium text-lg transition-colors relative ${activeSkillsTab === 'certificates' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    {t.skillsTabs.certificates}
                    {activeSkillsTab === 'certificates' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>}
                  </button>
                </div>

                {/* Tab Content */}
                <div className="relative">
                  {/* Skills Tab */}
                  <div className={`grid transition-all duration-500 ease-in-out ${activeSkillsTab === 'skills' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-2">
                        {SKILLS_DATA.map((skill) => (
                          <div 
                            key={skill.id} 
                            onClick={() => setSelectedSkill(skill)}
                            className="p-6 bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group rounded-lg"
                          >
                            <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{skill.title[lang]}</h4>
                            <p className="text-blue-600 text-sm font-medium mb-3 flex items-center gap-1">
                              <BookOpen size={14} /> {lang === 'en' ? 'Learned from' : lang === 'bn' ? 'শেখা হয়েছে এখান থেকে' : '学习来源'} {skill.source}
                            </p>
                            <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{skill.description[lang]}</p>
                            <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                              {lang === 'en' ? 'View Details' : lang === 'bn' ? 'বিস্তারিত দেখুন' : '查看详情'} <ExternalLink size={14} className="ml-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Certificates Tab */}
                  <div className={`grid transition-all duration-500 ease-in-out ${activeSkillsTab === 'certificates' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                    <div className="overflow-hidden">
                      <div className="mb-12">
                        <h3 className="text-xl font-serif font-bold text-slate-800 mb-8 flex items-center gap-2">
                          <Award className="text-blue-600" size={24} /> {t.skillsTabs.certificates}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                          {CERTIFICATES.map((cert) => (
                            <a key={cert.id} href={cert.link} target="_blank" rel="noopener noreferrer" className="group block h-full">
                              <div className="border border-slate-200 overflow-hidden bg-white hover:shadow-xl transition-all duration-300 rounded-lg h-full flex flex-col">
                                <div className="h-48 overflow-hidden shrink-0">
                                  <img 
                                    src={cert.imageUrl} 
                                    alt={cert.title[lang]} 
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                </div>
                                <div className="p-5 border-t border-slate-100 flex flex-col h-full grow">
                                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">{cert.issuer[lang]}</p>
                                  <h4 className="text-slate-900 font-medium group-hover:text-blue-600 transition-colors flex items-start justify-between mb-2">
                                    {cert.title[lang]}
                                    <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0 ml-2" />
                                  </h4>
                                  <div className="mt-auto pt-3 border-t border-slate-50 text-sm text-slate-600 space-y-1">
                                    <p><span className="font-medium text-slate-700">{lang === 'en' ? 'University/Org:' : lang === 'bn' ? 'বিশ্ববিদ্যালয়/প্রতিষ্ঠান:' : '大学/机构:'}</span> {cert.university[lang]}</p>
                                    <p><span className="font-medium text-slate-700">{lang === 'en' ? 'Instructor:' : lang === 'bn' ? 'প্রশিক্ষক:' : '讲师:'}</span> {cert.instructor[lang]}</p>
                                  </div>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-serif font-bold text-slate-800 mb-8 flex items-center gap-2">
                          <Award className="text-blue-600" size={24} /> {t.skillsTabs.extracurriculars}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
                          {EXTRACURRICULARS.map((item) => (
                            <div key={item.id} className="p-6 bg-slate-50 border border-slate-100 rounded-lg">
                              <h4 className="text-lg font-bold text-slate-900">{item.title[lang]}</h4>
                              <p className="text-blue-600 text-sm font-medium mb-3">{item.role[lang]}</p>
                              <p className="text-slate-600 text-sm leading-relaxed">{item.description[lang]}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CV Section */}
        <section id="cv" className="py-20 bg-white px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-serif font-bold text-slate-900">{t.nav.cv}</h2>
              <div className="h-px bg-slate-300 flex-1"></div>
            </div>
            <div 
              onClick={() => {
                scrollPositionRef.current = window.scrollY;
                window.location.hash = 'cv-page';
              }}
              className="group cursor-pointer bg-slate-50 border border-slate-200 rounded-xl p-8 md:p-12 flex flex-col items-center justify-center text-center hover:border-blue-400 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">View My Full CV</h3>
              <p className="text-slate-600 max-w-lg mb-8">
                Click here to open my detailed Curriculum Vitae in a new page, where you can read about my academic background, research experience, and download a copy for your records.
              </p>
              <button className="px-8 py-3 bg-blue-600 text-white rounded-sm font-medium tracking-wide group-hover:bg-blue-700 transition-colors flex items-center gap-2">
                <span>Open CV Page</span>
                <ExternalLink size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-slate-50 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">{t.sections.contact}</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">{t.contactDesc}</p>
            </div>

            <div className="w-full">
              <ContactContent lang={lang} />
            </div>
          </div>
        </section>
      </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 md:px-12 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <FooterLogo />
          
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            <a href="mailto:sazzadhossain211810@gmail.com" title="Personal Email" className="hover:opacity-80 transition-opacity" aria-label="Email">
              <GmailLogo className="w-5 h-5" />
            </a>
            <a href="mailto:iec.hossain524@gzu.edu.cn" title="University Email" className="hover:text-white transition-colors" aria-label="University Email">
              <GraduationCap size={20} />
            </a>
            <a href="mailto:hossainmdsazzad@qq.com" title="QQ Email" className="hover:opacity-80 transition-opacity" aria-label="QQ Email">
              <QQLogo className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/md-sazzad-hossain-3b16053a5" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/mdsazzadh211810-cmd" target="_blank" rel="noopener noreferrer" title="GitHub" className="hover:text-white transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://x.com/SazzadMd73279" target="_blank" rel="noopener noreferrer" title="X (Twitter)" className="hover:text-white transition-colors" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="https://www.facebook.com/md.sazzad.hossain.773998" target="_blank" rel="noopener noreferrer" title="Facebook" className="hover:text-white transition-colors" aria-label="Facebook">
              <Facebook size={20} />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-sm">
          <p>&copy; {new Date().getFullYear()} MD SAZZAD HOSSAIN. All rights reserved.</p>
        </div>
      </footer>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
          <div className="min-h-screen relative flex flex-col items-center py-16 px-6 md:px-12">
            <button 
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute top-6 right-6 md:top-10 md:right-10 p-3 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded-full transition-colors z-10"
              aria-label="Close modal"
            >
              <X size={28} />
            </button>
            
            <div className="max-w-5xl w-full mx-auto flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-48 h-48 md:w-64 md:h-64 mb-6 relative">
                <div className="absolute inset-0 bg-blue-100 rounded-full transform translate-x-3 translate-y-3 -z-10"></div>
                <img 
                  src="https://github.com/mdsazzadh211810-cmd.png" 
                  alt="MD SAZZAD HOSSAIN" 
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
                  onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/sazzad/400/400"; }}
                />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-2 text-center">
                MD SAZZAD HOSSAIN
              </h2>
              <p className="text-lg text-slate-600 mb-12 text-center max-w-2xl">
                Biotechnology Undergraduate Scholar | Guizhou University
              </p>
              
              <div className="w-full bg-slate-50 rounded-2xl p-6 md:p-12 shadow-sm border border-slate-100">
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-8 text-center border-b border-slate-200 pb-4">{t.contactInfoLabel}</h3>
                <ContactContent lang={lang} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skill Details Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 z-[110] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl relative shadow-2xl animate-in fade-in zoom-in-95 duration-300 my-auto">
            <button 
              onClick={() => setSelectedSkill(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded-full transition-colors z-10"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            
            <div className="p-6 md:p-10">
              <div className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-3 pr-10">{selectedSkill.title[lang]}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full font-medium">
                    <BookOpen size={16} />
                    {t.skillModal.learnedFrom} {selectedSkill.source}
                  </span>
                  {selectedSkill.sourceUrl && (
                    <a 
                      href={selectedSkill.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 font-medium bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-full"
                    >
                      {t.skillModal.visitPlatform} <ExternalLink size={14} />
                    </a>
                  )}
                  {selectedSkill.playlistUrl && (
                    <a 
                      href={selectedSkill.playlistUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1 font-medium bg-slate-100 hover:bg-red-50 px-3 py-1.5 rounded-full"
                    >
                      {lang === 'en' ? 'Watch Full Playlist' : lang === 'bn' ? 'সম্পূর্ণ প্লেলিস্ট দেখুন' : '观看完整播放列表'} <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{t.skillModal.aboutSkill}</h3>
                <p className="text-slate-600 leading-relaxed">{selectedSkill.description[lang]}</p>
              </div>
              
              {selectedSkill.videoUrl && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    {t.skillModal.videoRef}
                  </h3>
                  <div className="relative w-full overflow-hidden rounded-xl bg-slate-100" style={{ paddingTop: '56.25%' }}>
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full border-0"
                      src={selectedSkill.videoUrl} 
                      title={`${selectedSkill.title} Video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
