# Agent Coding Standards

This document defines the coding standards and conventions for this project.

## Code Style

### JavaScript
- Use ES modules (`import`/`export`)
- Prefer `const` over `let`; avoid `var`
- Use early returns to reduce nesting
- Use async/await for asynchronous code
- Always handle promise rejections with `.catch()` or try/catch

### HTML
- External links with `target="_blank"` must include `rel="noopener noreferrer"`
- Load external scripts before module scripts

### Security
- Escape all user-input or dynamic content before inserting into HTML
- Use `textContent` over `innerHTML` when possible
- Validate array bounds before accessing elements by index

## Error Handling

### Required Patterns
```javascript
// Check external library loaded
const L = window.L;
if (!L) {
  console.error('Library failed to load');
  // Show user-friendly error
}

// Handle async initialization
init().catch(err => console.error('Initialization failed:', err));

// Bounds check before DOM access
if (allStops[idx]) allStops[idx].classList.add('active');
```

## Data Structure

Keep data centralized in `src/data/`:
- `stops.js` - All stop data
- `driveLegs` - Set of drive route indices
- `driveDividers` - Map of divider text by stop index

## File Organization

```
src/
├── data/
│   └── stops.js          # All itinerary data
├── main.js               # Entry point, DOM handling
├── map.js                # Map initialization & controls
└── style.css             # All styles
```

## Git Workflow

1. Make focused commits with clear messages
2. Review changes before committing
3. Use `gh pages` for deployment to GitHub Pages
