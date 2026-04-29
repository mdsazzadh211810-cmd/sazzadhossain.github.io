import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

const ASSETS_DIR = path.join(process.cwd(), 'public', 'assets');

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

const docs = [
  { id: '1mi0KpQFsa7ON0MUZHviu-2oVNboSuAodT6EWpbowMNU', name: 'Lab_1_Report.pdf' },
  { id: '1f92Ib9VO8_sp7PbADcGC_qVHL_v0kAigIqiDRtCfNU4', name: 'Lab_2_Report.pdf' },
  { id: '1XbPj-EBaDAbTlKMUNInHogxc9WTyhSFB', name: 'Manuscript.pdf' }
];

async function downloadFile(url: string, filename: string) {
  const dest = path.join(ASSETS_DIR, filename);
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const fileStream = fs.createWriteStream(dest, { flags: 'w' });
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
  console.log("Downloading docs...");
  for (const item of docs) {
    await downloadFile(`https://docs.google.com/document/d/${item.id}/export?format=pdf`, item.name);
  }
}

run();
