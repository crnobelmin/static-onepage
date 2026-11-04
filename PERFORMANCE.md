# Performance Optimizations

This portfolio uses several modern techniques to ensure fast loading even with large collections of artwork.

## Current Optimizations

### 1. **Lazy Loading** ✅
All gallery images use `loading="lazy"`, which means:
- Images below the viewport don't load until the user scrolls near them
- Reduces initial page load time significantly
- Saves bandwidth for users on slower connections

### 2. **Explicit Image Dimensions** ✅
All images have `width` and `height` attributes:
- Prevents Cumulative Layout Shift (CLS)
- Browser reserves space for images before they load
- Improves visual stability and accessibility
- Helps with SEO (Core Web Vitals)

### 3. **Minimal JavaScript** ✅
- No frameworks or heavy libraries
- Vanilla JavaScript only
- No third-party tracking or analytics

### 4. **Static Asset Delivery** ✅
- All assets are static files
- No server-side processing
- Can be cached by browsers and CDNs

## Adding Your Own Images with Full Dimensions

When adding images to `gallery.json`, include the actual dimensions:

```json
{
  "src": "my-painting.jpg",
  "alt": "Description for accessibility",
  "width": 1200,
  "height": 900
}
```

**Why this matters:**
- If you know the exact dimensions, use them
- If unknown, default is 400x300 (reasonable for thumbnails)
- Accurate dimensions = better performance

## Performance Checklist

Before publishing, verify:

- [x] All images have `loading="lazy"` (automatic in build)
- [x] All images have `width` and `height` attributes (automatic in build)
- [x] Image dimensions in JSON match actual file dimensions (recommended)
- [x] Images are optimized (under 500KB recommended)
- [x] No unnecessary third-party scripts

## Advanced: Responsive Images (Optional)

For even better performance, you can use responsive images with `srcset`:

```json
{
  "src": "painting.jpg",
  "alt": "Description",
  "width": 2000,
  "height": 1500,
  "srcset": [
    {"src": "painting-small.jpg", "width": 400},
    {"src": "painting-medium.jpg", "width": 800},
    {"src": "painting-large.jpg", "width": 2000}
  ]
}
```

This would require custom build script modifications. For now, the single optimized image approach works well.

## Expected Performance

With lazy loading and explicit dimensions:

- **Initial Load**: Only hero image + above-the-fold content
- **Scrolling**: Images load as needed
- **Mobile**: Significantly faster than eager loading
- **Large Collections**: Handles 100+ images without slowdown

## Monitoring Performance

Use these tools to check your site:

1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
2. **Web.dev Lighthouse**: https://web.dev/measure/
3. **Browser DevTools**: Network tab to see load times

Target scores:
- **Performance**: 90+
- **CLS (Layout Shift)**: < 0.1
- **LCP (Largest Contentful Paint)**: < 2.5s

## Future Enhancements

If you ever need more optimization:

- **Image compression**: Use WebP/AVIF formats
- **CDN**: Let GitHub Pages handle global delivery
- **Service Worker**: For offline caching (advanced)
- **Preloading**: Critical fonts/assets (if needed)

For now, the current setup is optimal for a simple static portfolio! 🚀
