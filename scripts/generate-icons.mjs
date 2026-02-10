import { PNG } from 'pngjs';
import fs from 'node:fs';
import path from 'node:path';

function createPng(size, color) {
  const png = new PNG({ width: size, height: size });
  const [r, g, b, a] = color; // RGBA 0-255
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (size * y + x) << 2;
      png.data[idx] = r;
      png.data[idx + 1] = g;
      png.data[idx + 2] = b;
      png.data[idx + 3] = a;
    }
  }
  return png;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeIcon(filePath, size, color) {
  return new Promise((resolve, reject) => {
    const png = createPng(size, color);
    const stream = fs.createWriteStream(filePath);
    png.pack().pipe(stream);
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

async function main() {
  const publicDir = path.resolve(process.cwd(), 'public');
  ensureDir(publicDir);
  await writeIcon(path.join(publicDir, 'icon-192.png'), 192, [0, 122, 255, 255]); // blue
  await writeIcon(path.join(publicDir, 'icon-512.png'), 512, [0, 0, 0, 255]); // black
  await writeIcon(path.join(publicDir, 'icon-1024-maskable.png'), 1024, [0, 0, 0, 255]); // black maskable
  console.log('Generated PWA icons: icon-192.png, icon-512.png, icon-1024-maskable.png');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
