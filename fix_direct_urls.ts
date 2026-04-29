import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const driveImages = [
  { id: '19xu0HNCLkmptSeMGut8rz9yyBWJT5JZZ', name: 'cert_1.jpg' },
  { id: '1lOgxi77-JFTt0gfmegpeePcRX0JtYWBJ', name: 'cert_2.jpg' },
  { id: '11lTsOqz2GuRyPZYf77EOrDhhs9s7ShY2', name: 'cert_3.jpg' },
  { id: '1NFaJNZyU5Hx0-T91aHKcsNg2PysI17Px', name: 'cert_4.jpg' },
  { id: '1bDbcjC5SRk4MisRtAQWvFloAEO7b7Wjk', name: 'cert_5.jpg' },
  { id: '18OEtYbvQatQzH-dw0X65h2nvXh1tiuiY', name: 'cert_6.jpg' },
  { id: '1qAiHHjgIZ0WmEKut9IUcgzuzhy75Uwya', name: 'cert_7.jpg' },
  { id: '1mc1BVVRUhNoNeN5yQE2IKSW980eALXr4', name: 'cert_8.jpg' },
  { id: '1UPCNG-cIh2TIQD5HIpuztw4AE2Ab1uWu', name: 'cert_9.jpg' },
  { id: '1PNLCeZoCrFHtXVdkFA3aT1xIAxptZsuu', name: 'cert_10.jpg' },
  { id: '1lfxKdXQeqQf_7xWX8V9arczu8x2-OcGe', name: 'cert_11.jpg' },
  { id: '15a_m0_vjsBRgLJ6_vpknWZKwazeZrGeG', name: 'cert_12.jpg' },
  { id: '1rnSRf5DCXBpvn2BJd-y_KPWwmtGGenQr', name: 'cert_13.jpg' },
  { id: '1cl0iHsuE08VCh6XR6q-KKVk9gCrQjY2T', name: 'cert_14.jpg' },
  { id: '1J8Ul017mS9_Ukh9_CcXCDcuoVV7vcOrM', name: 'cert_15.jpg' },
  { id: '12vXJICAo2YOxr9iIb_4pf4tKRgtIDlb0', name: 'cert_16.jpg' },
  { id: '15chYKCCxxCDnBqDI0mZ78vfoDhZivloy', name: 'cert_17.jpg' },
  { id: '1NfioKCyxaOsy9gF7HkXUQ97YtZv6aRPQ', name: 'cert_18.jpg' },
  { id: '1OuTkymO7pKZadDjUkeXDyFlTtgpOwMLb', name: 'cv_page_1.jpg' },
  { id: '1OS-DNjv1NI35xs-bUePXhk8LSuAb_Mhk', name: 'cv_page_2.jpg' },
];

driveImages.forEach(img => {
  if (img.name.startsWith('cert_')) {
    const regex = new RegExp(`imageUrl: \\\`\\\\\\$\\{import\\.meta\\.env\\.BASE_URL\\}assets\\/${img.name}\\\``, 'g');
    content = content.replace(regex, `imageUrl: "https://drive.google.com/thumbnail?id=${img.id}&sz=w1000"`);
  } else if (img.name === 'cv_page_1.jpg') {
    const rx1 = new RegExp(`src=\\{\\\`\\\\\\$\\{import\\.meta\\.env\\.BASE_URL\\}assets\\/${img.name}\\\`\\}`, 'g');
    content = content.replace(rx1, `src="https://drive.google.com/thumbnail?id=${img.id}&sz=w2000" referrerPolicy="no-referrer"`);
    
    const rxError = new RegExp(`e\\.currentTarget\\.src = \\\`\\\\\\$\\{import\\.meta\\.env\\.BASE_URL\\}assets\\/${img.name}\\\`;`, 'g');
    content = content.replace(rxError, `e.currentTarget.src = "https://drive.google.com/uc?export=view&id=${img.id}";`);
    
    const rxUrl = new RegExp(`\\{ url: \\\`\\\\\\$\\{import\\.meta\\.env\\.BASE_URL\\}assets\\/${img.name}\\\`,`, 'g');
    content = content.replace(rxUrl, `{ url: "https://drive.google.com/uc?export=download&id=${img.id}",`);
  } else if (img.name === 'cv_page_2.jpg') {
    const rx1 = new RegExp(`src=\\{\\\`\\\\\\$\\{import\\.meta\\.env\\.BASE_URL\\}assets\\/${img.name}\\\`\\}`, 'g');
    content = content.replace(rx1, `src="https://drive.google.com/thumbnail?id=${img.id}&sz=w2000" referrerPolicy="no-referrer"`);

    const rxError = new RegExp(`e\\.currentTarget\\.src = \\\`\\\\\\$\\{import\\.meta\\.env\\.BASE_URL\\}assets\\/${img.name}\\\`;`, 'g');
    content = content.replace(rxError, `e.currentTarget.src = "https://drive.google.com/uc?export=view&id=${img.id}";`);
    
    const rxUrl = new RegExp(`\\{ url: \\\`\\\\\\$\\{import\\.meta\\.env\\.BASE_URL\\}assets\\/${img.name}\\\`,`, 'g');
    content = content.replace(rxUrl, `{ url: "https://drive.google.com/uc?export=download&id=${img.id}",`);
  }
});

const docs = [
  { id: '1mi0KpQFsa7ON0MUZHviu-2oVNboSuAodT6EWpbowMNU', name: 'Lab_1_Report.pdf', link: 'https://docs.google.com/document/d/1mi0KpQFsa7ON0MUZHviu-2oVNboSuAodT6EWpbowMNU/edit?tab=t.0' },
  { id: '1f92Ib9VO8_sp7PbADcGC_qVHL_v0kAigIqiDRtCfNU4', name: 'Lab_2_Report.pdf', link: 'https://docs.google.com/document/d/1f92Ib9VO8_sp7PbADcGC_qVHL_v0kAigIqiDRtCfNU4/edit?tab=t.0' },
  { id: '1XbPj-EBaDAbTlKMUNInHogxc9WTyhSFB', name: 'Manuscript.pdf', link: 'https://docs.google.com/document/d/1XbPj-EBaDAbTlKMUNInHogxc9WTyhSFB/edit?usp=drive_web&ouid=114814120597712128910&rtpof=true' }
];

docs.forEach(doc => {
  const rx = new RegExp(`href=\\{\\\`\\\\\\$\\{import\\.meta\\.env\\.BASE_URL\\}assets\\/${doc.name}\\\`\\}`, 'g');
  content = content.replace(rx, `href="${doc.link}"`);
});

content = content.replace(/<img(\\s+)src=\\{cert\\.imageUrl\\}/g, '<img$1src={cert.imageUrl} referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = cert.imageUrl.replace("thumbnail?id=", "uc?export=view&id=").replace("&sz=w1000", ""); }}');

// In case the above didn't match the image rendering correctly:
// We will look for <img src={cert.imageUrl} -> <img src={cert.imageUrl} referrerPolicy="no-referrer"
const manualImgRx = /<img(\s+)src=\{cert\.imageUrl\}/g;
if (content.match(manualImgRx) && !content.includes('referrerPolicy="no-referrer"')) {
   content = content.replace(manualImgRx, '<img$1src={cert.imageUrl} referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = cert.imageUrl.replace("thumbnail?id=", "uc?export=view&id=").replace("&sz=w1000", ""); }}');
}

fs.writeFileSync('src/App.tsx', content);
console.log("Done");
