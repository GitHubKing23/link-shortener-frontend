import fs from 'fs'
import path from 'path'

const pkgPath = path.resolve('package.json')
const postcssPath = path.resolve('postcss.config.js')

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
const deps = { ...pkg.dependencies, ...pkg.devDependencies }

if (!('tailwindcss' in deps)) {
  console.error('❌ Missing `tailwindcss` in dependencies.')
  process.exit(1)
}

if (!('@tailwindcss/postcss' in deps)) {
  console.error('❌ Missing `@tailwindcss/postcss` in dependencies. Run: npm install -D @tailwindcss/postcss')
  process.exit(1)
}

if (!fs.existsSync(postcssPath)) {
  console.error('❌ Missing `postcss.config.js`. Please create one.')
  process.exit(1)
}

const configContent = fs.readFileSync(postcssPath, 'utf8')

if (configContent.includes("from 'tailwindcss'") || configContent.includes('from "tailwindcss"')) {
  console.error('❌ Do NOT import `tailwindcss` directly in `postcss.config.js`. Use `@tailwindcss/postcss` instead.')
  process.exit(1)
}

console.log('✅ TailwindCSS PostCSS setup looks correct.')
