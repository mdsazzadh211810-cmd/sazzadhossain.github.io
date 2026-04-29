import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const certs = [];
for (let i = 1; i <= 18; i++) certs.push(`cert_${i}.jpg`);

let i = 0;
// Replace imageUrls
content = content.replace(/imageUrl: \`\$\{import\.meta\.env\.BASE_URL\}assets\/\`/g, () => {
  return `imageUrl: \`\${import.meta.env.BASE_URL}assets/${certs[i++]}\``;
});

// Replace cv page 1
content = content.replace(/src=\{\`\$\{import\.meta\.env\.BASE_URL\}assets\/\`\} \n            alt="CV Page 1"/, 
  `src={\`\${import.meta.env.BASE_URL}assets/cv_page_1.jpg\`} \n            alt="CV Page 1"`);

content = content.replace(/onError=\{\(e\) => \{ e\.currentTarget\.src = \`\$\{import\.meta\.env\.BASE_URL\}assets\/\`; \}\}\n          \/>\n          <div className="w-full h-px bg-slate-200"><\/div>\n          <img \n            src=\{\`\$\{import\.meta\.env\.BASE_URL\}assets\/\`/g, 
  `onError={(e) => { e.currentTarget.src = \`\${import.meta.env.BASE_URL}assets/cv_page_1.jpg\`; }}\n          />\n          <div className="w-full h-px bg-slate-200"></div>\n          <img \n            src={\`\${import.meta.env.BASE_URL}assets/cv_page_2.jpg\``);

content = content.replace(/alt="CV Page 2" \n            className="w-full h-auto block"\n            onError=\{\(e\) => \{ e\.currentTarget\.src = \`\$\{import\.meta\.env\.BASE_URL\}assets\/\`; \}\}/,
  `alt="CV Page 2" \n            className="w-full h-auto block"\n            onError={(e) => { e.currentTarget.src = \`\${import.meta.env.BASE_URL}assets/cv_page_2.jpg\`; }}`);

// For download files array
content = content.replace(
  /const files = \[\n      \{ url: '\/assets\/cv_page_1.jpg', name: 'MD_SAZZAD_HOSSAIN_CV_Page_1.jpg' \},\n      \{ url: '\/assets\/cv_page_2.jpg', name: 'MD_SAZZAD_HOSSAIN_CV_Page_2.jpg' \}\n    \];/g,
  `const files = [\n      { url: \`\${import.meta.env.BASE_URL}assets/cv_page_1.jpg\`, name: 'MD_SAZZAD_HOSSAIN_CV_Page_1.jpg' },\n      { url: \`\${import.meta.env.BASE_URL}assets/cv_page_2.jpg\`, name: 'MD_SAZZAD_HOSSAIN_CV_Page_2.jpg' }\n    ];`
);

fs.writeFileSync('src/App.tsx', content);
console.log("Restored App.tsx correctly.");
