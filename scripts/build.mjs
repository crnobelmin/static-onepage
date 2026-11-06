import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROJECT_ROOT = join(__dirname, '..');
const CONTENT_PATH = join(PROJECT_ROOT, 'content', 'gallery.json');
const HTML_TEMPLATE_PATH = join(PROJECT_ROOT, 'src', 'index.html');
const DIST_PATH = join(PROJECT_ROOT, 'dist');

function readGalleryContent() {
  try {
    const content = readFileSync(CONTENT_PATH, 'utf8');
    const data = JSON.parse(content);
    if (!data.sections || !Array.isArray(data.sections)) {
      throw new Error('gallery.json must contain a "sections" array');
    }
    return data;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('gallery.json not found in content/ directory');
    }
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON in gallery.json: ' + error.message);
    }
    throw error;
  }
}

function validateSections(sections) {
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (!section.id || typeof section.id !== 'string') {
      throw new Error(`Section ${i + 1}: missing or invalid "id"`);
    }
    if (!section.title || typeof section.title !== 'string') {
      throw new Error(`Section ${i + 1}: missing or invalid "title"`);
    }
    if (!Array.isArray(section.images)) {
      throw new Error(`Section ${i + 1}: "images" must be an array`);
    }
    if (section.year && typeof section.year !== 'string') {
      console.warn(`Section ${i + 1}: "year" should be a string if provided`);
    }
    if (section.id === 'about') {
      if (section.artist_bio && typeof section.artist_bio !== 'string') {
        console.warn(`About section: "artist_bio" should be a string if provided`);
      }
      if (section.contact_email && typeof section.contact_email !== 'string') {
        console.warn(`About section: "contact_email" should be a string if provided`);
      }
    }
    for (let j = 0; j < section.images.length; j++) {
      const image = section.images[j];
      if (!image.src || typeof image.src !== 'string') {
        throw new Error(`Section ${i + 1}, image ${j + 1}: missing or invalid "src"`);
      }
      if (!image.alt || typeof image.alt !== 'string') {
        throw new Error(`Section ${i + 1}, image ${j + 1}: missing or invalid "alt"`);
      }
    }
  }
}

function checkImageFiles(sections) {
  const missingImages = [];
  for (const section of sections) {
    for (const image of section.images) {
      const imagePath = join(PROJECT_ROOT, 'public', 'images', 'gallery', image.src);
      if (!existsSync(imagePath)) {
        missingImages.push(imagePath);
      }
    }
  }
  if (missingImages.length > 0) {
    console.warn('Warning: The following images are not found:');
    missingImages.forEach(path => console.warn('  ' + path));
    console.warn('These will be included in the build but may not display.');
  }
}

function escapeHtml(text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function getImageDimensions(filePath) {
  try {
    const { default: imageSize } = await import('image-size');
    const dimensions = await imageSize(filePath);
    return { width: dimensions.width, height: dimensions.height };
  } catch (error) {
    console.warn(`Warning: Could not read dimensions for ${filePath}: ${error.message}`);
    return { width: null, height: null };
  }
}

async function generateAboutSection(section) {
  if (!section || section.id !== 'about') {
    return '';
  }
  let aboutHtml = '<div class="about-content">\n';
  
  // Artist portrait image (optional)
  if (section.portrait && section.portrait.src) {
    const websitePath = 'images/gallery/' + section.portrait.src;
    const imagePath = join(PROJECT_ROOT, 'public', 'images', 'gallery', section.portrait.src);
    const dimensions = await getImageDimensions(imagePath);
    const width = dimensions.width || 400;
    const height = dimensions.height || 400;
    aboutHtml += `    <img src="${escapeHtml(websitePath)}" alt="Artist portrait" width="${width}" height="${height}" loading="lazy" class="artist-portrait">\n`;
  }
  
  aboutHtml += '    <div class="about-text">\n';
  if (section.artist_bio) {
    aboutHtml += `      <p class="artist-desc">${escapeHtml(section.artist_bio)}</p>`;
  }
  aboutHtml += '    </div>\n';
  
  aboutHtml += '  </div>\n';
  return aboutHtml;
}

function generateContactSection(section) {
  if (!section || section.id !== 'about') {
    return '';
  }
  let contactHtml = '<div class="contact-content">\n';
  contactHtml += '    <h2>Get in Touch</h2>';
  contactHtml += '    <p>Interested in commissioning a piece or learning more about my work?</p>';
  contactHtml += `    <a href="mailto:${escapeHtml(section.contact_email)}" class="contact-link">Contact Me</a>`;
  contactHtml += '  </div>\n';
  return contactHtml;
}

async function generateGallery(sections) {
  let galleryHtml = '';
  
  for (const section of sections) {
    if (section.id === 'about') {
      continue;
    }
    
    galleryHtml += `    <div class="gallery-section" id="${escapeHtml(section.id)}">\n`;
    galleryHtml += `      <h1>${escapeHtml(section.title)}</h1>\n`;
    
    if (section.year) {
      galleryHtml += `      <h4>${escapeHtml(section.year)}</h4>\n`;
    }
    
    if (section.description) {
      galleryHtml += `      <p>${escapeHtml(section.description)}</p>\n`;
    }
    
    galleryHtml += '      <div class="gallery-grid">\n';
    
    for (const image of section.images) {
      const websitePath = 'images/gallery/' + image.src;
      const imagePath = join(PROJECT_ROOT, 'public', 'images', 'gallery', image.src);
      
      const dimensions = await getImageDimensions(imagePath);
      const width = dimensions.width || 400;
      const height = dimensions.height || 300;
      
      galleryHtml += `        <figure>\n`;
      galleryHtml += `          <a href="${escapeHtml(websitePath)}" target="_blank" rel="noopener noreferrer">\n`;
      galleryHtml += `            <img src="${escapeHtml(websitePath)}" alt="${escapeHtml(image.alt)}" width="${width}" height="${height}" loading="lazy">\n`;
      galleryHtml += `          </a>\n`

      if (image.caption) {
        galleryHtml += `          <figcaption>${escapeHtml(image.caption)}</figcaption>\n`;
      }
      
      if (image.description) {
        galleryHtml += `          <p>${escapeHtml(image.description)}</p>\n`;
      }
      
      galleryHtml += '        </figure>\n';
    }
    
    galleryHtml += '      </div>\n';
    galleryHtml += '    </div>\n';
  }
  
  return galleryHtml;
}

function readHtmlTemplate() {
  try {
    return readFileSync(HTML_TEMPLATE_PATH, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('index.html template not found in src/ directory');
    }
    throw error;
  }
}

function insertGalleryIntoTemplate(template, galleryHtml) {
  const placeholder = '<!-- GALLERY_PLACEHOLDER -->';
  if (!template.includes(placeholder)) {
    throw new Error('index.html template missing GALLERY_PLACEHOLDER comment');
  }
  return template.replace(placeholder, galleryHtml);
}

function ensureDistDirectory() {
  if (!existsSync(DIST_PATH)) {
    mkdirSync(DIST_PATH, { recursive: true });
  }
}

async function copyStaticAssets() {
  const srcPath = join(PROJECT_ROOT, 'src');
  const publicPath = join(PROJECT_ROOT, 'public');
  const distPath = join(PROJECT_ROOT, 'dist');
  
  // Copy static files from src/
  const srcFiles = ['styles.css', 'main.js'];
  for (const file of srcFiles) {
    const source = join(srcPath, file);
    const destination = join(distPath, file);
    if (existsSync(source)) {
      writeFileSync(destination, readFileSync(source, 'utf8'));
    } else {
      console.warn(`Warning: ${file} not found, skipping...`);
    }
  }
  
  // Copy individual files from public/ (favicon, robots, sitemap)
  const publicFiles = ['favicon.svg', 'robots.txt', 'sitemap.xml'];
  for (const file of publicFiles) {
    const source = join(publicPath, file);
    const destination = join(distPath, file);
    if (existsSync(source)) {
      writeFileSync(destination, readFileSync(source, 'utf8'));
    } else {
      console.warn(`Warning: ${file} not found, skipping...`);
    }
  }
  
  // Copy entire public/images/ directory to dist/images/
  const imagesSource = join(publicPath, 'images');
  const imagesDestination = join(distPath, 'images');
  if (existsSync(imagesSource)) {
    if (!existsSync(imagesDestination)) {
      mkdirSync(imagesDestination, { recursive: true });
    }
    // Recursively copy all files and subdirectories
    const copyDirectoryRecursive = async (srcDir, destDir) => {
      const entries = await readdir(srcDir, { withFileTypes: true });
      for (const entry of entries) {
        const srcPath = join(srcDir, entry.name);
        const destPath = join(destDir, entry.name);
        if (entry.isDirectory()) {
          if (!existsSync(destPath)) {
            mkdirSync(destPath, { recursive: true });
          }
          await copyDirectoryRecursive(srcPath, destPath);
        } else if (entry.isFile()) {
          copyFileSync(srcPath, destPath);
        }
      }
    };
    await copyDirectoryRecursive(imagesSource, imagesDestination);
  } else {
    console.warn(`Warning: ${imagesSource} not found, skipping...`);
  }
}

async function main() {
  try {
    const galleryData = readGalleryContent();
    validateSections(galleryData.sections);
    checkImageFiles(galleryData.sections);
    
    const aboutSection = galleryData.sections.find(s => s.id === 'about');
    const aboutContent = await generateAboutSection(aboutSection);
    const contactContent = generateContactSection(aboutSection);
    const galleryContent = await generateGallery(galleryData.sections);
    
    let fullHtml = readHtmlTemplate();
    
    // Insert content into template placeholders
    fullHtml = fullHtml.replace('<!-- ABOUT_PLACEHOLDER -->', aboutContent);
    fullHtml = fullHtml.replace('<!-- CONTACT_PLACEHOLDER -->', contactContent);
    fullHtml = fullHtml.replace('<!-- GALLERY_PLACEHOLDER -->', galleryContent);
    
    // Update footer with dynamic year
    const currentYear = new Date().getFullYear();
    fullHtml = fullHtml.replace(/&copy; \d{4} Artist\. All rights reserved\./g, `&copy; ${currentYear} Artist. All rights reserved.`);
    
    ensureDistDirectory();
    await copyStaticAssets();
    
    const outputPath = join(DIST_PATH, 'index.html');
    writeFileSync(outputPath, fullHtml, 'utf8');
    
    console.log('Build complete! Output written to dist/index.html');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

main();
