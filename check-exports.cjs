// check-exports.js
const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, 'src', 'components');

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');

      const hasExportDefault = /export\s+default\s+/.test(content);
      const componentName = path.basename(file);

      if (!hasExportDefault) {
        console.log(`❌ Missing export default in: ${path.relative(__dirname, fullPath)}`);
      }
    }
  });
}

console.log('🔍 Checking for missing export default in components...');
scanDirectory(COMPONENTS_DIR);
console.log('✅ Done.');
