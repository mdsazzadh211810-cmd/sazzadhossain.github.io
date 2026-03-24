import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Award, BookOpen, Twitter, Facebook, MessageCircle, GraduationCap, Phone, Microscope, Leaf, Cpu, ChevronDown, Download, ArrowLeft, ArrowRight } from 'lucide-react';

// ============================================================================
// 📝 EDITABLE DATA SECTION
// You can easily add, remove, or edit your certificates and extracurriculars here.
// ============================================================================

const CERTIFICATES = [
  {
    id: 1,
    title: "A complete guide to the key components of a research article",
    issuer: "Wiley Researcher Academy",
    university: "Wiley",
    instructor: "Wiley Researcher Academy",
    imageUrl: "https://drive.google.com/uc?export=view&id=19xu0HNCLkmptSeMGut8rz9yyBWJT5JZZ",
    link: "https://researcheracademy.wiley.com/"
  },
  {
    id: 2,
    title: "Introduction to Algae",
    issuer: "Coursera",
    university: "University of California San Diego",
    instructor: "Stephen P. Mayfield, Ph.D.",
    imageUrl: "https://drive.google.com/uc?export=view&id=1lOgxi77-JFTt0gfmegpeePcRX0JtYWBJ",
    link: "https://www.coursera.org/learn/algae"
  },
  {
    id: 3,
    title: "Microbiology Foundations",
    issuer: "Coursera",
    university: "Lecturio",
    instructor: "Stefan Wisbauer, Pascal Bendien",
    imageUrl: "https://drive.google.com/uc?export=view&id=11lTsOqz2GuRyPZYf77EOrDhhs9s7ShY2",
    link: "https://www.coursera.org/learn/microbiology-foundations"
  },
  {
    id: 4,
    title: "Using Python to Access Web Data",
    issuer: "Coursera",
    university: "University of Michigan",
    instructor: "Charles Severance",
    imageUrl: "https://drive.google.com/uc?export=view&id=1NFaJNZyU5Hx0-T91aHKcsNg2PysI17Px",
    link: "https://www.coursera.org/learn/python-network-data"
  },
  {
    id: 5,
    title: "Programming for Everybody (Getting Started with Python)",
    issuer: "Coursera",
    university: "University of Michigan",
    instructor: "Charles Severance",
    imageUrl: "https://drive.google.com/uc?export=view&id=1bDbcjC5SRk4MisRtAQWvFloAEO7b7Wjk",
    link: "https://www.coursera.org/learn/python"
  },
  {
    id: 6,
    title: "Python Data Structures",
    issuer: "Coursera",
    university: "University of Michigan",
    instructor: "Charles Severance",
    imageUrl: "https://drive.google.com/uc?export=view&id=18OEtYbvQatQzH-dw0X65h2nvXh1tiuiY",
    link: "https://www.coursera.org/learn/python-data"
  },
  {
    id: 7,
    title: "The why and how of data visualization",
    issuer: "Elsevier Researcher Academy",
    university: "Elsevier",
    instructor: "Dr Robert Kosara",
    imageUrl: "https://drive.google.com/uc?export=view&id=1qAiHHjgIZ0WmEKut9IUcgzuzhy75Uwya",
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 8,
    title: "Data visualization and choosing the right plot",
    issuer: "Elsevier Researcher Academy",
    university: "Elsevier",
    instructor: "Dr Robert Kosara",
    imageUrl: "https://drive.google.com/uc?export=view&id=1mc1BVVRUhNoNeN5yQE2IKSW980eALXr4",
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 9,
    title: "How to design effective figures for review articles",
    issuer: "Elsevier Researcher Academy",
    university: "Elsevier",
    instructor: "Tom Dursch, Matt Pavlovich, Stacey Chin",
    imageUrl: "https://drive.google.com/uc?export=view&id=1UPCNG-cIh2TIQD5HIpuztw4AE2Ab1uWu",
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 10,
    title: "How to enhance your chances of serendipitous research discovery",
    issuer: "Elsevier Researcher Academy",
    university: "Elsevier",
    instructor: "Rachel Herbert",
    imageUrl: "https://drive.google.com/uc?export=view&id=1PNLCeZoCrFHtXVdkFA3aT1xIAxptZsuu",
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 11,
    title: "Gen AI use in the research workflow",
    issuer: "Elsevier Researcher Academy",
    university: "Elsevier",
    instructor: "Elisenda Aguilera-Cora, Doug Feldner",
    imageUrl: "https://drive.google.com/uc?export=view&id=1lfxKdXQeqQf_7xWX8V9arczu8x2-OcGe",
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 12,
    title: "Guide to reference managers: How to effectively manage your references",
    issuer: "Elsevier Researcher Academy",
    university: "Elsevier",
    instructor: "Jorge Sinval, Daniel Christe",
    imageUrl: "https://drive.google.com/uc?export=view&id=15a_m0_vjsBRgLJ6_vpknWZKwazeZrGeG",
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 13,
    title: "How to integrate sex, gender, and intersectional analysis into research",
    issuer: "Elsevier Researcher Academy",
    university: "Elsevier",
    instructor: "Londa Schiebinger, Cara Tannenbaum, Holly Falk Krzesinski, Jessica Miles",
    imageUrl: "https://drive.google.com/uc?export=view&id=1rnSRf5DCXBpvn2BJd-y_KPWwmtGGenQr",
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 14,
    title: "How to prepare your manuscript",
    issuer: "Elsevier Researcher Academy",
    university: "Elsevier",
    instructor: "Anthony Newman",
    imageUrl: "https://drive.google.com/uc?export=view&id=1cl0iHsuE08VCh6XR6q-KKVk9gCrQjY2T",
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 15,
    title: "Research design (Certificate of Excellence)",
    issuer: "Elsevier Researcher Academy",
    university: "Elsevier",
    instructor: "Elsevier Researcher Academy",
    imageUrl: "https://drive.google.com/uc?export=view&id=1J8Ul017mS9_Ukh9_CcXCDcuoVV7vcOrM",
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 16,
    title: "Structuring your article correctly",
    issuer: "Elsevier Researcher Academy",
    university: "Elsevier",
    instructor: "Anthony Newman",
    imageUrl: "https://drive.google.com/uc?export=view&id=12vXJICAo2YOxr9iIb_4pf4tKRgtIDlb0",
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 17,
    title: "How to write an abstract and improve your article",
    issuer: "Elsevier Researcher Academy",
    university: "Elsevier",
    instructor: "Hannah Foreman",
    imageUrl: "https://drive.google.com/uc?export=view&id=15chYKCCxxCDnBqDI0mZ78vfoDhZivloy",
    link: "https://researcheracademy.elsevier.com/"
  },
  {
    id: 18,
    title: "2025 Aspire Leaders Program",
    issuer: "Aspire Institute",
    university: "Harvard University",
    instructor: "Tarun Khanna, Karim Lakhani",
    imageUrl: "https://drive.google.com/uc?export=view&id=1NfioKCyxaOsy9gF7HkXUQ97YtZv6aRPQ",
    link: "https://www.aspireleaders.org/"
  }
];

const EXTRACURRICULARS = [
  {
    id: 1,
    title: "AI4S Research Group",
    role: "Undergraduate Researcher",
    description: "Actively participating in weekly journal clubs and contributing to literature reviews on generative AI models."
  },
  {
    id: 2,
    title: "International Students Union",
    role: "Active Member",
    description: "Assisting in organizing academic workshops and cultural exchange events for international students in China."
  }
];

const SKILLS_DATA = [
  {
    id: 1,
    title: "CRISPR-Cas9 Gene Editing",
    source: "Coursera",
    sourceUrl: "https://www.coursera.org",
    videoUrl: "https://www.youtube.com/embed/2pp17E4E-O8", // Example video
    description: "Learned the fundamental mechanisms of CRISPR-Cas9 and its applications in plant biotechnology."
  },
  {
    id: 2,
    title: "Python for Bioinformatics",
    source: "Udemy",
    sourceUrl: "https://www.udemy.com",
    videoUrl: "https://www.youtube.com/embed/mKwjPhIQ_co", // Example video
    description: "Mastered Python scripting for analyzing genomic sequences and biological data."
  },
  {
    id: 3,
    title: "Machine Learning in Agriculture",
    source: "edX",
    sourceUrl: "https://www.edx.org",
    videoUrl: "https://www.youtube.com/embed/Gv9_4yMHFhI", // Example video
    description: "Explored how AI and ML models can predict crop yields and optimize farming practices."
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
    title: "AI for Science", 
    icon: <Cpu size={24} strokeWidth={1.5} />, 
    desc: (
      <>
        <p className="mb-3">The traditional pipeline for discovering novel drugs and biomolecules is notoriously slow, resource-intensive, and often limited by human intuition. To overcome these bottlenecks, I am deeply immersed in the rapidly evolving field of AI for Science (AI4S), specifically focusing on AI-Driven Drug and Peptide Design (AIDD).</p>
        <p>My work centers on integrating Large Language Models (LLMs) and Multi-Agent frameworks with specialized generative tools, such as discrete diffusion models and active learning. I am particularly interested in the de novo generation of cell-penetrating peptides and the directed evolution of biocatalytic enzymes. By computationally optimizing critical molecular properties—such as biological activity and ADME/T profiles—prior to physical synthesis, we can radically accelerate the discovery process. I am currently expanding my computational toolkit and studying autonomous bioinformatics workflows, preparing to develop intelligent AI agents that seamlessly bridge computational predictions with real-world biological applications.</p>
      </>
    )
  },
  { 
    id: 2, 
    title: "Healthcare and Food", 
    icon: <Microscope size={24} strokeWidth={1.5} />, 
    desc: (
      <>
        <p className="mb-3">Metabolic disorders are a growing global health challenge, driving the urgent need for naturally derived functional foods. My wet-lab research focuses on the phytochemical profiles and structural complexities of Lilium species (Lily bulbs), with a specific emphasis on Resistant Starch (RS). Unlike typical carbohydrates that cause rapid glucose spikes, RS resists early digestion and functions similarly to dietary fiber, offering profound metabolic benefits.</p>
        <p>Currently, under the direct guidance of my professor, I am investigating how thermal pretreatments and physical modifications alter the multi-scale structure of this starch. By combining advanced structural analysis with UPLC-Q-TOF-MS metabolite identification, my goal is to uncover how these specific structural transformations can significantly enhance the starch's hypoglycemic (blood-sugar-lowering) and anti-inflammatory properties. As I transition into hands-on wet-lab experiments, I aim to bridge the gap between molecular-level structural changes and macroscopic health benefits, laying the groundwork for novel nutraceutical applications.</p>
      </>
    )
  },
  { 
    id: 3, 
    title: "Sustainable Agriculture", 
    icon: <Leaf size={24} strokeWidth={1.5} />, 
    desc: (
      <>
        <p className="mb-3">While my current undergraduate research builds a strong interdisciplinary foundation in both wet-lab biology and computational AI, my ultimate scientific ambition lies in plant biotechnology. Growing up in Bangladesh—a country disproportionately affected by climate change and rising soil salinity—I have witnessed firsthand the urgent need for climate-resilient agriculture.</p>
        <p>My long-term goal for my Master's and Ph.D. studies is to harness the transformative power of CRISPR-Cas gene-editing technology. I intend to focus on engineering robust plant varieties capable of withstanding severe abiotic stresses, particularly salt and drought tolerance. By decoding and rewiring plant genetics, I aim to develop high-yield, sustainable crop systems. My ultimate vision is to translate cutting-edge biotechnological innovations from the laboratory directly to the fields, ensuring long-term food security for vulnerable regions across the globe and making a tangible impact on my home country.</p>
      </>
    )
  }
];

const ContactContent = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
    {/* Contact Information Sidebar */}
    <div className="lg:col-span-1 space-y-10">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Email Addresses</h3>
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
            <span className="text-sm break-words">hossainmdsazzad@qq.com <span className="text-xs text-slate-400">(China)</span></span>
          </a>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Social Profiles</h3>
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
        <h3 className="text-lg font-bold text-slate-900 mb-4">WeChat</h3>
        <div className="flex items-center gap-3 text-slate-600 bg-white p-4 border border-slate-200 shadow-sm">
          <WeChatLogo className="w-8 h-8 shrink-0" />
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">WeChat ID</p>
            <p className="text-sm font-medium text-slate-800">s13027860961</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Phone</h3>
        <div className="flex items-center gap-3 text-slate-600 bg-white p-4 border border-slate-200 shadow-sm">
          <Phone size={24} className="text-blue-600 shrink-0" />
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">China</p>
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
          <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
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
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
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
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message / Comment</label>
        <textarea 
          id="message" 
          name="message" 
          rows={5}
          required
          className="w-full px-4 py-3 border border-slate-300 rounded-none focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white resize-y"
          placeholder="How can we collaborate?"
        ></textarea>
      </div>
      <button 
        type="submit" 
        className="w-full py-4 bg-blue-600 text-white font-medium tracking-wide hover:bg-blue-700 transition-colors"
      >
        Send Message
      </button>
    </form>
  </div>
  </div>
);

const CVPage = ({ onClose }: { onClose: () => void }) => {
  const handleDownloadCV = () => {
    const files = [
      { id: '1OuTkymO7pKZadDjUkeXDyFlTtgpOwMLb', name: 'MD_SAZZAD_HOSSAIN_CV_Page_1.jpg' },
      { id: '1OS-DNjv1NI35xs-bUePXhk8LSuAb_Mhk', name: 'MD_SAZZAD_HOSSAIN_CV_Page_2.jpg' }
    ];
    
    files.forEach((file, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = `https://drive.google.com/uc?export=download&id=${file.id}`;
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
              <span>Back to Portfolio</span>
            </button>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900">Curriculum Vitae</h1>
          </div>
          <button 
            onClick={handleDownloadCV}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors font-medium shadow-sm w-full md:w-auto"
          >
            <Download size={18} />
            <span>Download CV</span>
          </button>
        </div>
        
        <div className="bg-white shadow-2xl border border-slate-200 flex flex-col mx-auto">
          <img 
            src="https://drive.google.com/thumbnail?id=1OuTkymO7pKZadDjUkeXDyFlTtgpOwMLb&sz=w2000" 
            alt="CV Page 1" 
            className="w-full h-auto block"
            onError={(e) => { e.currentTarget.src = "https://drive.google.com/uc?export=view&id=1OuTkymO7pKZadDjUkeXDyFlTtgpOwMLb"; }}
          />
          <div className="w-full h-px bg-slate-200"></div>
          <img 
            src="https://drive.google.com/thumbnail?id=1OS-DNjv1NI35xs-bUePXhk8LSuAb_Mhk&sz=w2000" 
            alt="CV Page 2" 
            className="w-full h-auto block"
            onError={(e) => { e.currentTarget.src = "https://drive.google.com/uc?export=view&id=1OS-DNjv1NI35xs-bUePXhk8LSuAb_Mhk"; }}
          />
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = ({ onClose, currentProjectId, setCurrentProjectId }: { onClose: () => void, currentProjectId: number, setCurrentProjectId: (id: number) => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentProjectId]);

  const projects = [
    {
      id: 1,
      category: "Research Interests & Upcoming Projects",
      title: "Functional Properties and Starch Digestibility of Lily Bulbs (Focusing on Resistant Starch)",
      overview: "I am highly interested in the intersection of plant biology, functional foods, and human health. Currently, I am focusing on the phytochemical profiles and bioactivities of Lilium species (Lily bulbs), exploring their potential as natural nutraceuticals.",
      focus: "Normal starch digests quickly, causing rapid spikes in blood glucose. My research interest lies in Resistant Starch (RS)—a type of starch that resists digestion and acts similarly to dietary fiber. I am exploring how various physical modifications (such as thermal pretreatments) affect the multi-scale structure of starch in Lily bulbs. The goal is to understand how these structural changes can enhance the starch's bioactivities, particularly its hypoglycemic (blood sugar lowering) and anti-inflammatory properties.",
      statusLabel: "Current Status",
      status: "As a sophomore undergraduate, I am currently conducting an in-depth literature review and analyzing advanced research (including multi-scale starch structure and UPLC-Q-TOF-MS metabolite identification) under the direct guidance of my professor. I am actively preparing the experimental designs to soon begin hands-on wet-lab experiments involving extraction, structural analysis, and bioassays.",
      icon: <Microscope size={32} className="text-blue-600" />
    },
    {
      id: 2,
      category: "Research Interests & Upcoming Projects",
      title: "AI for Science (AI4S) - AI-Driven Drug and Peptide Design",
      overview: "I am deeply fascinated by the intersection of Artificial Intelligence and Chemistry/Biology. My core interest lies in AI-driven drug and pesticide discovery (AIDD/AIPD), where computational power is used to accelerate the discovery of novel biomolecules, significantly reducing the time, cost, and resources required for traditional wet-lab experiments.",
      focus: "My learning and research focus is centered on integrating \"General AI\" (such as LLMs and Multi-Agent frameworks) with \"Specialized AI\" (like Generative Models, Active Learning, and Discrete Diffusion Models). I am particularly interested in how these advanced AI architectures can be used for de novo peptide generation (e.g., Cell-Penetrating Peptides) and the directed evolution of biocatalytic enzymes. The ultimate goal is to computationally optimize molecular properties (Activity, ADME/T) before physical synthesis.",
      statusLabel: "Current Status",
      status: "As a sophomore, I am currently dedicating my time to building a strong foundation in this highly interdisciplinary field. Under the guidance of the AI4S research group, I am studying literature on generative AI models for molecular design and learning about autonomous bioinformatics workflows (Agent building). I am actively refining my computational skill set to soon contribute to developing intelligent agents for biological data analysis and peptide optimization.",
      icon: <Cpu size={32} className="text-blue-600" />
    },
    {
      id: 3,
      category: "Future Research Vision & Long-Term Goals",
      title: "Plant Genetics & CRISPR-Cas Engineering for Sustainable Agriculture",
      overview: "Beyond my current projects, I am deeply passionate about addressing global and regional food security challenges through advanced genetic engineering. My long-term academic goal is to pursue a Master’s or PhD focusing on plant biotechnology and crop improvement.",
      focus: "I aspire to utilize CRISPR-Cas gene-editing technology to develop climate-resilient plant and food crop varieties. Specifically, I am highly interested in engineering traits such as salt tolerance, drought resistance, and overall soil adaptability (abiotic stress tolerance) to ensure crops can thrive in harsh environmental conditions.",
      statusLabel: "Ultimate Goal",
      status: "Coming from Bangladesh—a country highly vulnerable to climate change and rising soil salinity—my ultimate vision is to apply these cutting-edge biotechnological advancements to improve local agriculture. I want to contribute to developing sustainable, high-yield, and resilient food systems for my home country.",
      icon: <Leaf size={32} className="text-blue-600" />
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
            <span>Back to Portfolio</span>
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
                <span className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-2 block">{project.category}</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">{project.title}</h2>
              </div>
            </div>
            
            <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Overview</h3>
                <p>{project.overview}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Research Focus</h3>
                <p>{project.focus}</p>
              </div>
              
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
                <h3 className="text-xl font-bold text-blue-700 mb-3">{project.statusLabel}</h3>
                <p className="text-slate-800 font-medium">{project.status}</p>
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
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-bold mb-1">Previous Project</span>
                <span className="block truncate text-sm">{projects[currentIndex - 1].title}</span>
              </div>
            </button>
          ) : <div className="max-w-[48%]"></div>}

          {hasNext ? (
            <button 
              onClick={handleNext}
              className="flex items-center gap-3 text-slate-600 hover:text-blue-600 font-medium transition-colors group bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md max-w-[48%] text-right justify-end"
            >
              <div className="text-right overflow-hidden">
                <span className="text-xs text-slate-400 block uppercase tracking-wider font-bold mb-1">Next Project</span>
                <span className="block truncate text-sm">{projects[currentIndex + 1].title}</span>
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
  
  // New state variables for Skills & Certificates section
  const [isSkillsExpanded, setIsSkillsExpanded] = useState(false);
  const [activeSkillsTab, setActiveSkillsTab] = useState<'skills' | 'certificates'>('skills');
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  const interestRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'CV', href: '#cv' },
    { name: 'Research', href: '#research' },
    { name: 'Vision', href: '#vision' },
    { name: 'Skills & Certificates', href: '#skills' },
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

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between relative min-h-[48px]">
          
          {/* Left side: Profile Photo & Name (Visible when scrolled) */}
          <button 
            onClick={() => setIsProfileModalOpen(true)}
            className={`absolute left-6 md:left-12 flex flex-col items-center justify-center transition-all duration-500 ease-in-out hover:scale-105 ${scrolled ? 'opacity-100 translate-x-0 cursor-pointer' : 'opacity-0 -translate-x-10 pointer-events-none'}`}
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
          <div className={`absolute transition-all duration-500 ease-in-out ${scrolled ? 'left-1/2 -translate-x-1/2' : 'left-6 md:left-12'}`}>
            <NavbarLogo />
          </div>

          {/* Right side: Hamburger Menu */}
          <div className="ml-auto">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 hover:text-blue-600 transition-colors z-50 relative"
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
                  closeMenu();
                  if (showCVPage || showProjectsPage) {
                    setShowCVPage(false);
                    setShowProjectsPage(false);
                    setTimeout(() => {
                      const element = document.querySelector(link.href);
                      if (element) element.scrollIntoView();
                    }, 100);
                  }
                  if (link.name === 'Research') {
                    setIsResearchExpanded(true);
                  }
                }}
                className="text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap hover:scale-105 transform duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {showCVPage ? (
        <CVPage onClose={() => setShowCVPage(false)} />
      ) : showProjectsPage ? (
        <ProjectsPage onClose={() => setShowProjectsPage(false)} currentProjectId={selectedProject} setCurrentProjectId={setSelectedProject} />
      ) : (
      <main>
        {/* Hero Section */}
        <section id="home" className="pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
              MD SAZZAD HOSSAIN
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl border-l-4 border-blue-600 pl-6 italic">
              "Biotechnology Undergraduate Scholar | Guizhou University (贵州大学)，Guizhou, China | Bridging Wet-Lab Plant Biology with AI for Science (AI4S) | Driven by a vision to innovate sustainable agriculture via CRISPR-Cas."
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="#contact" className="px-8 py-3 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors font-medium tracking-wide">
                Get in Touch
              </a>
              <a 
                href="#research" 
                onClick={() => setIsResearchExpanded(true)}
                className="px-8 py-3 bg-slate-100 text-slate-700 rounded-sm hover:bg-slate-200 transition-colors font-medium tracking-wide"
              >
                View Research
              </a>
            </div>
          </div>
          <div className="w-48 h-48 md:w-72 md:h-72 shrink-0 relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full transform translate-x-4 translate-y-4 -z-10"></div>
            <img 
              src="https://github.com/mdsazzadh211810-cmd.png" 
              alt="MD SAZZAD HOSSAIN" 
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
              onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/sazzad/400/400"; }}
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-slate-50 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-serif font-bold text-slate-900">About Me</h2>
              <div className="h-px bg-slate-300 flex-1"></div>
            </div>
            <div className="prose prose-lg text-slate-600 font-light leading-relaxed">
              <p className="mb-6">
                Hello! I am Md Sazzad Hossain, a highly motivated international scholar from Bangladesh, currently in the final semester of my sophomore year (2nd year) pursuing a B.Sc. in Biotechnology at the College of Life Sciences, Guizhou University, China, fully supported by a University Scholarship. My academic journey is driven by a deep fascination with the fundamental mechanisms of life and how we can engineer them to solve pressing global challenges.
              </p>
              <p className="mb-6">
                As an undergraduate, I believe the future of biology lies at the intersection of traditional experiments and modern computational power. Currently, I am actively laying the groundwork for my graduation thesis by engaging in two distinct yet complementary research domains under the guidance of my professors. On the wet-lab front, I am exploring the functional properties and multi-scale structure of Resistant Starch (RS) in Lilium species for functional food applications. Simultaneously, on the dry-lab front, I am immersing myself in the cutting-edge field of AI for Science (AI4S), learning to leverage artificial intelligence, large language models, and multi-agent frameworks for de novo drug and peptide design.
              </p>
              <p>
                Looking ahead, my ultimate lifelong dream is to pursue a Master’s and Ph.D. focusing on advanced plant genetics using CRISPR-Cas technology. Coming from Bangladesh—a country on the frontlines of climate change and rising soil salinity—I am deeply passionate about engineering climate-resilient and salt-tolerant crop varieties. My long-term vision is to bring these sustainable agricultural innovations back to my home country, ensuring regional food security and making a tangible impact on human lives. I am always eager to learn, collaborate, and push the boundaries of what biotechnology can achieve.
              </p>
            </div>
          </div>
        </section>

        {/* CV Section */}
        <section id="cv" className="py-20 bg-white px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-serif font-bold text-slate-900">Curriculum Vitae</h2>
              <div className="h-px bg-slate-300 flex-1"></div>
            </div>
            <div 
              onClick={() => {
                setShowCVPage(true);
                window.scrollTo(0, 0);
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

        {/* Research Section */}
        <section id="research" className="pt-20 pb-10 bg-slate-50 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <button 
              onClick={() => setIsResearchExpanded(!isResearchExpanded)}
              className="flex items-center gap-4 mb-6 w-full text-left group cursor-pointer"
            >
              <h2 className="text-3xl font-serif font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-3">
                Research
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
                      Research Interests
                      {activeResearchTab === 'interests' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>}
                    </button>
                    <button 
                      onClick={() => setActiveResearchTab('projects')} 
                      className={`pb-4 font-medium text-lg transition-colors relative ${activeResearchTab === 'projects' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      Projects
                      {activeResearchTab === 'projects' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>}
                    </button>
                    <button 
                      onClick={() => setActiveResearchTab('current')} 
                      className={`pb-4 font-medium text-lg transition-colors relative ${activeResearchTab === 'current' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      Current Projects
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
                                  <h3 className="font-bold text-slate-800 text-lg">{interest.title}</h3>
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
                                      <div className="text-sm leading-relaxed relative z-10">{interest.desc}</div>
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
                                    {RESEARCH_INTERESTS.find(i => i.id === lastSelectedInterest)?.title}
                                  </h3>
                                </div>
                                <div className="text-slate-700 leading-relaxed space-y-4 relative z-10">
                                  {RESEARCH_INTERESTS.find(i => i.id === lastSelectedInterest)?.desc}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-2">
                          {/* Project 1: Amylase Kinetics (Unpublished) */}
                          <div className="group border border-slate-200 p-8 hover:border-blue-600 hover:shadow-lg transition-all duration-300 bg-white relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 left-0 w-1 h-0 bg-blue-600 transition-all duration-300 group-hover:h-full"></div>
                            <div className="flex justify-between items-start mb-4">
                              <div className="text-blue-600 flex items-center gap-3">
                                <Microscope size={32} strokeWidth={1.5} />
                                <a href="https://docs.google.com/document/d/1XbPj-EBaDAbTlKMUNInHogxc9WTyhSFB/edit?usp=drive_web&ouid=114814120597712128910&rtpof=true" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors z-10" title="View Manuscript PDF">
                                  <ExternalLink size={20} />
                                </a>
                              </div>
                              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-200 shadow-sm">
                                Manuscript in Preparation
                              </span>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">
                              Biochemical Characterization of Amylase Kinetics
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                              <strong className="text-slate-800 font-medium">Focus:</strong> Salivary α-amylase regulation, thermal denaturation, allosteric activation, and heavy metal inhibition.<br/><br/>
                              Conducted wet-lab experiments and comprehensive data analysis to evaluate enzyme kinetics using the DNS colorimetric method. Currently synthesizing findings into a scientific review article.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
                              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">Wet-lab</span>
                              <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded">Data Analysis</span>
                              <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded">Enzyme Kinetics</span>
                              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">Scientific Writing</span>
                            </div>
                            <a href="https://docs.google.com/document/d/1XbPj-EBaDAbTlKMUNInHogxc9WTyhSFB/edit?usp=drive_web&ouid=114814120597712128910&rtpof=true" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0">
                              <span className="sr-only">View Manuscript</span>
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
                              dsRNA Efficacy Predictor
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                              <strong className="text-slate-800 font-medium">Focus:</strong> AI-powered dsRNA silencing efficacy prediction for RNAi biopesticide design.<br/><br/>
                              Developed a computational tool utilizing Graph Neural Networks (GNN) to predict dsRNA knockdown efficiency. This project aims to accelerate the design of effective RNAi-based biopesticides.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
                              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">Graph Neural Networks</span>
                              <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded">RNAi</span>
                              <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded">Biopesticide Design</span>
                              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">AI/ML</span>
                            </div>
                            <a href="https://github.com/mdsazzadh211810-cmd/dsrna-predictor" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0">
                              <span className="sr-only">View Project</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Current Projects Tab */}
                    <div className={`grid transition-all duration-500 ease-in-out ${activeResearchTab === 'current' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-2">
                          
                          {/* Project 1 */}
                          <div 
                            onClick={() => {
                              setSelectedProject(1);
                              setShowProjectsPage(true);
                              window.scrollTo(0, 0);
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
                              setSelectedProject(2);
                              setShowProjectsPage(true);
                              window.scrollTo(0, 0);
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
                              setSelectedProject(3);
                              setShowProjectsPage(true);
                              window.scrollTo(0, 0);
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
            <h2 className="text-3xl font-serif font-bold mb-8">Future Vision</h2>
            <h3 className="text-2xl font-light mb-10 text-blue-200">Engineering Climate-Resilient Crops with CRISPR-Cas to Produce Sustainable Agricultural Crops</h3>
            <div className="space-y-6 text-lg text-blue-100 leading-relaxed font-light text-left md:text-justify max-w-4xl mx-auto">
              <p>
                While my current undergraduate research builds a strong interdisciplinary foundation in wet-lab biology and computational AI, my ultimate scientific ambition is deeply rooted in plant biotechnology and global food security. Growing up in Bangladesh—a nation on the frontlines of climate change and rapidly rising soil salinity—I have witnessed firsthand the devastating impact of environmental stress on agriculture. This reality has shaped my lifelong goal: to develop resilient, sustainable food systems for vulnerable communities.
              </p>
              <p>
                For my future Master's and Ph.D. research, I am determined to harness the transformative precision of CRISPR-Cas gene-editing technology. My focus will be on decoding and reprogramming plant genetics to engineer robust crop varieties capable of withstanding severe abiotic stresses, particularly salt toxicity and drought. Rather than merely observing how plants react to harsh environments, I want to proactively edit their genetic makeup for enhanced survival and adaptability.
              </p>
              <p>
                My ultimate vision goes beyond the laboratory. I aim to bridge the gap between cutting-edge genetic engineering and real-world farming. By developing high-yield, climate-resilient crops, my dream is to bring these vital biotechnological innovations back to my home country, ensuring regional food security and empowering the next generation of sustainable agriculture worldwide.
              </p>
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
              Skills & Certificates
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
                    Skills
                    {activeSkillsTab === 'skills' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>}
                  </button>
                  <button 
                    onClick={() => setActiveSkillsTab('certificates')} 
                    className={`pb-4 font-medium text-lg transition-colors relative ${activeSkillsTab === 'certificates' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Certificates
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
                            <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{skill.title}</h4>
                            <p className="text-blue-600 text-sm font-medium mb-3 flex items-center gap-1">
                              <BookOpen size={14} /> Learned from {skill.source}
                            </p>
                            <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{skill.description}</p>
                            <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                              View Details <ExternalLink size={14} className="ml-1" />
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
                          <Award className="text-blue-600" size={24} /> Certificates
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                          {CERTIFICATES.map((cert) => (
                            <a key={cert.id} href={cert.link} target="_blank" rel="noopener noreferrer" className="group block h-full">
                              <div className="border border-slate-200 overflow-hidden bg-white hover:shadow-xl transition-all duration-300 rounded-lg h-full flex flex-col">
                                <div className="h-48 overflow-hidden shrink-0">
                                  <img 
                                    src={cert.imageUrl} 
                                    alt={cert.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                </div>
                                <div className="p-5 border-t border-slate-100 flex flex-col h-full grow">
                                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">{cert.issuer}</p>
                                  <h4 className="text-slate-900 font-medium group-hover:text-blue-600 transition-colors flex items-start justify-between mb-2">
                                    {cert.title}
                                    <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0 ml-2" />
                                  </h4>
                                  <div className="mt-auto pt-3 border-t border-slate-50 text-sm text-slate-600 space-y-1">
                                    <p><span className="font-medium text-slate-700">University/Org:</span> {cert.university}</p>
                                    <p><span className="font-medium text-slate-700">Instructor:</span> {cert.instructor}</p>
                                  </div>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-serif font-bold text-slate-800 mb-8 flex items-center gap-2">
                          <Award className="text-blue-600" size={24} /> Extracurriculars
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
                          {EXTRACURRICULARS.map((item) => (
                            <div key={item.id} className="p-6 bg-slate-50 border border-slate-100 rounded-lg">
                              <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                              <p className="text-blue-600 text-sm font-medium mb-3">{item.role}</p>
                              <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
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

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-slate-50 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Get In Touch</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">I am always open to discussing research opportunities, collaborations, or simply connecting with fellow science enthusiasts.</p>
            </div>

            <div className="w-full">
              <ContactContent />
            </div>
          </div>
        </section>
      </main>
      )}

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
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-8 text-center border-b border-slate-200 pb-4">Contact Information</h3>
                <ContactContent />
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
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-3 pr-10">{selectedSkill.title}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full font-medium">
                    <BookOpen size={16} />
                    Learned from: {selectedSkill.source}
                  </span>
                  {selectedSkill.sourceUrl && (
                    <a 
                      href={selectedSkill.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 font-medium"
                    >
                      Visit Platform <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">About this Skill</h3>
                <p className="text-slate-600 leading-relaxed">{selectedSkill.description}</p>
              </div>
              
              {selectedSkill.videoUrl && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Video Reference
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
