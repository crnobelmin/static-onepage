# Painter Portfolio Guidance

This document helps you understand how to use and maintain your portfolio website.

## Quick Start for the Painter

### Step 1: Upload Images

1. Go to your repository on GitHub
2. Navigate to `public/images/gallery/`
3. Click "Upload files" button
4. Drag and drop your images or select them from your computer
5. Click "Commit changes" to save

### Step 2: Edit Gallery Content

1. Go to your repository on GitHub
2. Navigate to `content/gallery.json`
3. Click "Edit" to open the file in the browser
4. Edit the JSON content directly

You'll edit the JSON content. The structure is:

- **Sections**: Categories like "Landscapes", "Portraits", etc.
- **Images**: Individual paintings within each section

#### Adding a New Section

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

#### Adding Images to a Section

1. Upload your image to `public/images/gallery/` via GitHub
2. Add it to the section's `images` array in `gallery.json`

**Automatic Dimensions**: The build script automatically reads image dimensions from the file, so you don't need to specify `width` or `height` in your JSON. This ensures accurate dimensions for optimal performance.

#### Removing Items

- Delete the section or image object from `gallery.json`
- Delete the image file from `public/images/gallery/` if removing an image

#### Reordering

- Move section objects up or down in the `sections` array
- Move image objects up or down within their section's `images` array

### Step 3: Publishing

- Commit your changes to GitHub
- GitHub Pages will automatically rebuild and deploy your website
- Your updates go live within minutes

## Best Practices

### Image Uploads

- **Size**: Keep images under 500KB for fast loading
- **Format**: Use JPG for photos, PNG for graphics with transparency
- **Resolution**: 
  - Display: 1200-1600px width is sufficient
  - Don't upload 4000px+ images unless necessary
- **Compression**: Use tools like TinyPNG or Squoosh before uploading

### Writing Good Alt Text

Alt text helps:
- Screen readers for visually impaired visitors
- Search engines understand your images
- SEO and accessibility

**Good alt text**: "Oil painting of a woman reading by candlelight, warm tones"
**Bad alt text**: "IMG_1234.jpg" or "Woman"

### Section Organization

Consider grouping by:
- Medium (oil, watercolor, charcoal)
- Subject (landscapes, portraits, abstract)
- Era (early works, recent works)
- Theme (nature, urban, still life)

## Common Questions

### Q: Can I change the website layout?
**A**: No, the layout is fixed. Edit only gallery content in `gallery.json`.

### Q: Can I add a contact form?
**A**: Currently no. Use a `mailto:` link in the Contact section instead.

### Q: How do I update my bio?
**A**: Edit the "About Me" section in `gallery.json`. It's the first section in your gallery content. Update the "Artist Bio" field for your biography and the "Contact Email" field for your email address.

### Q: Can I have multiple pages?
**A**: This is a single-page portfolio. All content is on one page with smooth scrolling.

### Q: What if I want to add a blog?
**A**: This portfolio doesn't include a blog. Consider a separate website or platform.

## Contact Support

If you need to make code changes (layout, features, etc.), contact a web developer.
