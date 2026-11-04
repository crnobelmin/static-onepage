# Painter Portfolio Website

A simple, elegant, responsive portfolio website for a painter. Content is managed through **GitHub**, allowing the artist to update content without editing code.

## Overview

- **Content Management**: Manual editing via JSON files
- **Source Control**: GitHub
- **Hosting**: GitHub Pages
- **Technology**: Plain HTML, CSS, JavaScript (no frameworks)

## Repository Structure

```
painter-portfolio/
├── .gitignore              # Git ignore rules
├── package.json            # Node.js build script
├── README.md               # This file
├── GUIDANCE.md             # User guidance
├── content/
│   └── gallery.json        # Gallery content (edited in GitHub)
├── public/
│   ├── images/
│   │   └── gallery/        # Uploaded images
│   ├── favicon.svg         # Website favicon
│   ├── robots.txt          # Search engine instructions
│   └── sitemap.xml         # XML sitemap
├── src/
│   ├── index.html          # Main HTML template
│   ├── styles.css          # Website styles
│   └── main.js             # JavaScript interactions
├── scripts/
│   └── build.mjs           # Build script
└── dist/                   # Generated website (not committed)
```

## For the Painter: Managing Your Portfolio

You edit your portfolio directly in GitHub. No special tools or services needed!

### Uploading Images

1. Go to your repository on GitHub
2. Navigate to `public/images/gallery/`
3. Click "Upload files" button
4. Drag and drop your images or select them from your computer
5. Click "Commit changes" to save

### Editing Your Gallery Content

1. Go to your repository on GitHub
2. Open `content/gallery.json`
3. Edit the JSON content directly in the browser
4. Click "Commit changes" to save

### JSON Structure

The gallery content is stored in `content/gallery.json`. Each section has:
- **id**: Unique identifier (e.g., "landscapes", "portraits")
- **title**: Section heading
- **description**: Brief description (optional)
- **year**: Year range (e.g., "2020-2024") (optional)
- **images**: Array of image objects with:
  - **src**: Image filename (must match a file in `public/images/gallery/`)
  - **alt**: Alternative text for accessibility (required)
  - **caption**: Short caption (optional)
  - **description**: Longer description (optional)

**Note**: Image dimensions (`width` and `height`) are automatically read from the image files, so you don't need to specify them manually.

### Adding New Sections

Add a new section object to the `sections` array:

```json
{
  "id": "still-life",
  "title": "Still Life",
  "description": "Quiet moments captured in paint",
  "year": "2023-2024",
  "images": [
    {
      "src": "still-life-01.jpg",
      "alt": "Still life with fruit and vase",
      "caption": "Morning Still Life",
      "description": "A quiet morning scene"
    }
  ]
}
```

### Adding Images to a Section

1. Upload your image to `public/images/gallery/` via GitHub
2. Add it to the section's `images` array in `gallery.json`

### Removing Items
- Delete the section or image object from `gallery.json`
- Delete the image file from `public/images/gallery/` if removing an image

### Reordering
- Move section objects up or down in the `sections` array
- Move image objects up or down within their section's `images` array

### Editing Your About Section

The first section should be an "About Me" section. Edit it to include:

1. **Section Title**: "About Me" (or similar)
2. **Artist Bio**: Your biography and artistic philosophy
3. **Contact Email**: Your email address for commissions and inquiries
4. **Year Range**: Leave empty for the about section, or add for gallery sections (e.g., "2020-2024")

### Image Uploads

- Images are stored in `public/images/gallery/` in your GitHub repository
- Recommended size: **under 500KB** for faster loading
- Supported formats: JPG, PNG, GIF, WebP
- **Tip**: Compress your images before uploading for better performance
- **Workflow**: Upload images to the repository, then reference them in `gallery.json`

### What You Can Edit

- ✅ Section titles and descriptions
- ✅ Add, remove, and reorder sections
- ✅ Add, remove, and reorder images within sections
- ✅ Upload, replace, and remove images
- ✅ Image captions and alternative text

### What You Cannot Edit

- ❌ Website structure and layout
- ❌ CSS styles
- ❌ JavaScript functionality
- ❌ HTML template code

## For the Developer: Building the Website

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build the website**:
   ```bash
   npm run build
   ```

3. **Preview locally** (open in browser):
   ```bash
   # The build generates static files in dist/
   # Simply open dist/index.html in your browser
   ```

### Build Process

The build script (`scripts/build.mjs`):

1. Reads `content/gallery.json`
2. Validates the content structure
3. Reads the HTML template from `src/index.html`
4. Generates gallery markup from JSON content
5. Copies CSS, JavaScript, and static assets
6. Outputs the complete website to `dist/`

### Build Validation

The build will fail with clear error messages if:
- JSON is invalid
- Required fields are missing
- Image files don't exist

### Deployment to GitHub Pages

1. Go to your repository on GitHub
2. Settings → Pages
3. Under "Source", select "Deploy from a branch"
4. Branch: `main`
5. Folder: `/root` (or `/dist`)
6. Click "Save"

GitHub Pages will automatically:
1. Build your site using `npm run build`
2. Deploy the `dist/` folder
3. Update your live website

Your site will be available at: `https://yourusername.github.io/painter-portfolio/`

## SEO and Search Engines

### Robots.txt

This website includes a `robots.txt` file that:
- Allows normal search engine crawling
- Includes special rules for AI crawlers (GPTBot, OAI-SearchBot)

### Sitemap

A `sitemap.xml` is included for search engine discovery.

### Image Alt Text

All images use `alt` text from your gallery content for accessibility and SEO.

## Performance

- **Lazy loading**: Gallery images below the viewport load only when needed
- **Responsive images**: Images scale appropriately for different screen sizes
- **Minimal JavaScript**: No unnecessary dependencies or tracking
- **Image optimization**: Upload compressed images for best performance

## Custom Domain

To use a custom domain:

1. In your GitHub repository Settings → Pages
2. Click "Custom domain"
3. Add your custom domain
4. Follow GitHub's DNS configuration instructions
5. Update `public/robots.txt` with your actual domain when ready

## Updating SEO Settings

Edit these files in the `public/` directory:

- `robots.txt`: Search engine crawling rules
- `sitemap.xml`: XML sitemap for search engines

## Troubleshooting

### Build fails with "Image not found"

- Check that the image path in `gallery.json` matches the actual file location
- Ensure the image is uploaded to `public/images/gallery/`

### Images not displaying after update

- Commit your changes to GitHub
- Wait for GitHub Pages to rebuild (usually automatic)
- Clear your browser cache

### JSON syntax errors

- Check for missing commas, quotes, or brackets
- Use a JSON validator tool before committing
- Common errors: missing comma after last property, unescaped quotes

## License

MIT License - feel free to use and modify.
