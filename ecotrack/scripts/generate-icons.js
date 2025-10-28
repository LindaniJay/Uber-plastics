const fs = require('fs');
const path = require('path');

// Create a simple SVG icon
function createIcon(size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#10B981"/>
    <circle cx="${size/2}" cy="${size/2}" r="${size/3}" fill="white"/>
    <path d="M${size/2-8} ${size/2-8} L${size/2+8} ${size/2+8} M${size/2+8} ${size/2-8} L${size/2-8} ${size/2+8}" stroke="#10B981" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
}

// Icon sizes needed
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG icons
sizes.forEach(size => {
  const svg = createIcon(size);
  const filename = `icon-${size}x${size}.svg`;
  fs.writeFileSync(path.join(iconsDir, filename), svg);
  console.log(`Created ${filename}`);
});

// Create additional icons
const additionalIcons = [
  { name: 'scanner-icon.svg', size: 96 },
  { name: 'dashboard-icon.svg', size: 96 },
  { name: 'insights-icon.svg', size: 96 }
];

additionalIcons.forEach(icon => {
  const svg = createIcon(icon.size);
  fs.writeFileSync(path.join(iconsDir, icon.name), svg);
  console.log(`Created ${icon.name}`);
});

console.log('All icons generated successfully!');


