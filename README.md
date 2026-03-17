# Itinerary App

A map visualization site for a trip to Portland, Maine (for Matthew Chan). Interactive Leaflet map showing Saturday stops from Airbnb to lighthouse and dinner.

**Live Demo:** https://matthewapuya.com/portland-chan

## Features

- Interactive Leaflet map with markers for each stop
- Walking and driving route visualization
- Click-to-focus functionality on sidebar stops
- Responsive design for mobile and desktop
- Google Maps integration for full navigation

## Development

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for production

```bash
npm run build
```

Build output will be in the `dist/` directory.

### Preview production build

```bash
npm run preview
```

## Project Structure

```
portland-chan/
├── src/
│   ├── data/
│   │   └── stops.js          # Itinerary stop data
│   ├── main.js               # Entry point and DOM handling
│   ├── map.js                # Leaflet map initialization
│   └── style.css             # Styling
├── index.html                # Main HTML file
├── vite.config.js            # Vite configuration
├── package.json              # Dependencies
└── README.md                 # This file
```

## Deployment to GitHub Pages

The project is configured for GitHub Pages deployment with the base path `/portland-chan/`.

### Manual Deployment

1. Build the project: `npm run build`
2. Push the `dist/` folder to your GitHub repository
3. Configure GitHub Pages to serve from the `dist/` folder

### Using GitHub Actions

Add a workflow file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v1
        with:
          path: ./dist
      - uses: actions/deploy-pages@v1
```

## Technologies

- **Vite** - Build tool and dev server
- **Leaflet** - Interactive maps
- **Vanilla JavaScript** - No framework dependencies
- **CSS Variables** - Consistent theming

## Customization

### Adding New Stops

Edit `src/data/stops.js` to add or modify stops:

```javascript
{
  lat: 43.6560,
  lng: -70.2719,
  name: "🏠 Hotel",
  time: "9:30 AM",
  desc: "121 Grant St — starting point",
  type: "walk"  // or "drive"
}
```

### Styling

Modify `src/style.css` to customize the appearance. CSS variables are defined at the top:

```css
:root {
  --ink: #1a1a1a;
  --paper: #f5f0e8;
  --cream: #ede8dc;
  --rust: #b85c2c;
  --muted: #7a7268;
  --card: #faf7f2;
}
```

## License

MIT
