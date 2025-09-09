# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

YieldScope Company Website - A static marketing website showcasing YieldScope, an all-in-one passive income investment platform that consolidates multiple asset classes (stocks, ETFs, crypto) with analytics to help investors maximize their yield-generating portfolios.

**Tech Stack:**
- Pure HTML/CSS/JavaScript (no framework dependencies)
- Hosted on GitHub Pages with custom domain: landing.yieldscope.app
- Responsive design with dark/light theme support
- No build process required - edit and commit directly

## Development Commands

Since this is a vanilla static website with no build tools:

```bash
# Start local development server (Python)
python -m http.server 8000

# Or using Node.js http-server (if installed)
npx http-server -p 8000

# Or using VS Code Live Server extension
# Right-click index.html > "Open with Live Server"
```

## Architecture & Key Files

### Core Files
- **index.html** - Single-page application with sections: Hero, Product Features, Asset Classes, KYC/Recommendations, Footer
- **styles.css** - All styling with CSS custom properties for theming, responsive breakpoints
- **script.js** - Theme management, smooth scrolling, form handling, analytics tracking, intersection observers for animations

### Features Implementation
- **Theme System**: Uses `data-theme` attribute on `<html>` with localStorage persistence (script.js:4-38)
- **Navigation**: Smooth scrolling with active section highlighting (script.js:141-166)
- **Forms**: Contact form with validation, success popups (script.js:73-110, 302-406)
- **Analytics**: Event tracking placeholder ready for Google Analytics (script.js:619-624)

### Asset Organization
- `/asset/` - All images including app mockups, logos for light/dark themes
- Phone mockups switch automatically based on theme
- No image optimization pipeline - manually optimize before committing

## Important Development Notes

1. **No Build Process**: Direct file editing - changes are live after commit/push
2. **Theme-Aware Images**: Logo and mockup images have light/dark variants that switch via CSS
3. **Responsive Breakpoints**: Mobile-first design with breakpoints at 768px, 1024px, 1200px
4. **Form Handling**: Currently shows success alerts - ready for backend integration
5. **GitHub Pages Deployment**: Pushes to main branch auto-deploy via CNAME configuration
6. **Analytics Ready**: trackEvent() function throughout for future Google Analytics integration

## Project Structure Patterns

- All interactive elements use event delegation where possible
- CSS uses custom properties extensively for maintainability
- Form validation is client-side only (backend integration pending)
- Images are referenced with relative paths from `/asset/`
- Intersection Observer API used for scroll-triggered animations

## Future Integration Points

Based on tasks.md planning:
- Newsletter signup backend service
- Contact form submission API
- Google Analytics implementation
- Multi-language support structure
- Additional demo screens/mockups as mentioned in tasks