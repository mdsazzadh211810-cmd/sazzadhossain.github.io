import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

const ASSETS_DIR = path.join(process.cwd(), 'public', 'assets');

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

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

const docs = [
  { id: '1mi0KpQFsa7ON0MUZHviu-2oVNboSuAodT6EWpbowMNU', name: 'Lab_1_Report.pdf' },
  { id: '1f92Ib9VO8_sp7PbADcGC_qVHL_v0kAigIqiDRtCfNU4', name: 'Lab_2_Report.pdf' },
  { id: '1XbPj-EBaDAbTlKMUNInHogxc9WTyhSFB', name: 'Manuscript.pdf' }
];

async function downloadFile(url: string, filename: string) {
  const dest = path.join(ASSETS_DIR, filename);
  if (fs.existsSync(dest)) {
    console.log(`Skipping ${filename}, already exists`);
    return true;
  }
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const fileStream = fs.createWriteStream(dest, { flags: 'wx' });
    // @ts-ignore
    await finished(Readable.fromWeb(res.body).pipe(fileStream));
    console.log(`Downloaded ${filename}`);
    return true;
  } catch (err) {
    console.error(`Failed to download ${filename}:`, err);
    return false;
  }
}

async function run() {
  console.log("Downloading thumbnails...");
  for (const item of driveImages) {
    // using sz=w2000 to get good quality
    await downloadFile(`https://drive.google.com/thumbnail?id=${item.id}&sz=w2000`, item.name);
  }

  console.log("Downloading docs...");
  for (const item of docs) {
    await downloadFile(`https://docs.google.com/document/d/${item.id}/export?format=pdf`, item.name);
  }

  // Rewrite App.tsx
  let code = fs.readFileSync('src/App.tsx', 'utf-8');
  
  // replace the drive URLs with local assets
  driveImages.forEach(item => {
    // Replace imageUrl
    const regex1 = new RegExp(`getProxyUrl\\("https:\\/\\/drive\\.google\\.com\\/thumbnail\\?id=${item.id}&sz=w[0-9]+"\\)`, 'g');
    code = code.replace(regex1, `"/assets/${item.name}"`);
    
    // In case the previous code wasn't using getProxyUrl
    const regex2 = new RegExp(`"https:\\/\\/drive\\.google\\.com\\/thumbnail\\?id=${item.id}&sz=w[0-9]+"`, 'g');
    code = code.replace(regex2, `"/assets/${item.name}"`);

    const regex3 = new RegExp(`getProxyUrl\\("https:\\/\\/drive\\.google\\.com\\/uc\\?export=view&id=${item.id}"\\)`, 'g');
    code = code.replace(regex3, `"/assets/${item.name}"`);
  });

  // Docs replacements
  docs.forEach(item => {
    const regexDoc = new RegExp(`https:\\/\\/docs\\.google\\.com\\/document\\/d\\/${item.id}\\/(edit(\\?[^"]*)?|export\\?[^"]*)`, 'g');
    // Replace with local path
    code = code.replace(regexDoc, `/assets/${item.name}`);
  });

  // Specifically for CV download
  code = code.replace(
    /const files = \[\s*\{ id: '1OuTkymO7pKZadDjUkeXDyFlTtgpOwMLb', name: 'MD_SAZZAD_HOSSAIN_CV_Page_1\.jpg' \},\s*\{ id: '1OS-DNjv1NI35xs-bUePXhk8LSuAb_Mhk', name: 'MD_SAZZAD_HOSSAIN_CV_Page_2\.jpg' \}\s*\];/g,
    `const files = [\n      { url: '/assets/cv_page_1.jpg', name: 'MD_SAZZAD_HOSSAIN_CV_Page_1.jpg' },\n      { url: '/assets/cv_page_2.jpg', name: 'MD_SAZZAD_HOSSAIN_CV_Page_2.jpg' }\n    ];`
  );

  code = code.replace(/link\.href = getProxyUrl\(`https:\/\/drive\.google\.com\/uc\?export=download&id=\$\{file\.id\}`\);/g, `link.href = file.url;`);

  fs.writeFileSync('src/App.tsx', code);
  console.log("Updated src/App.tsx URLs");
}

run();
