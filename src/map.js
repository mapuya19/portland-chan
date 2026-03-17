import { stops, driveLegs, driveIdxs } from './data/stops.js';

// Leaflet is loaded via CDN in index.html
const L = window.L;
if (!L) {
  console.error('Leaflet failed to load from CDN');
  const mapEl = document.getElementById('map');
  if (mapEl) {
    mapEl.innerHTML = '<p style="padding:20px;text-align:center;">Map failed to load. Please refresh.</p>';
  }
}
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

let map;
let markers;

// Fetch route from Mapbox Directions API
async function fetchRoute(start, end, profile) {
  if (!MAPBOX_TOKEN) {
    console.warn('Mapbox token not found');
    return null;
  }
  const coords = `${start.lng},${start.lat};${end.lng},${end.lat}`;
  const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coords}?geometries=geojson&access_token=${MAPBOX_TOKEN}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      console.warn('Mapbox API error:', data.message || response.statusText);
      return null;
    }
    if (data.routes && data.routes[0]) {
      // Mapbox returns [lng, lat] pairs, Leaflet needs [lat, lng]
      return data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
    }
  } catch (e) {
    console.warn('Routing failed, falling back to straight line:', e);
  }
  return null;
}

export async function initMap() {
  // Create map instance
  map = L.map('map').setView([43.648, -70.245], 13);

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);

  // Create marker icon function
  function makeIcon(num, isDrive) {
    const bg = isDrive ? '#b85c2c' : '#1a1a1a';
    return L.divIcon({
      className: '',
      html: `<div style="width:28px;height:28px;border-radius:50%;background:${bg};color:white;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;font-family:sans-serif;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.35);">${num}</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -16]
    });
  }

  // Escape HTML to prevent XSS
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Create markers
  markers = stops.map((s, i) =>
    L.marker([s.lat, s.lng], { icon: makeIcon(i + 1, driveIdxs.has(i)) })
      .addTo(map)
      .bindPopup(
        `<div class="popup-time">${escapeHtml(s.time)}</div><div class="popup-name">${escapeHtml(s.name)}</div><div class="popup-desc">${escapeHtml(s.desc)}</div>`,
        { maxWidth: 210 }
      )
  );

  // Fetch all routes in parallel for faster loading
  const routePromises = [];
  for (let i = 0; i < stops.length - 1; i++) {
    const isDrive = driveLegs.has(`${i}-${i + 1}`);
    const profile = isDrive ? 'driving' : 'walking';
    routePromises.push(
      fetchRoute(stops[i], stops[i + 1], profile).then(routeCoords => ({
        coords: routeCoords || [[stops[i].lat, stops[i].lng], [stops[i + 1].lat, stops[i + 1].lng]],
        isDrive
      }))
    );
  }

  const routes = await Promise.all(routePromises);
  routes.forEach(({ coords, isDrive }) => {
    L.polyline(coords, {
      color: isDrive ? '#b85c2c' : '#1a1a1a',
      weight: 3,
      dashArray: isDrive ? '7 5' : null,
      opacity: 0.7
    }).addTo(map);
  });

  // Add legend
  const legend = L.control({ position: 'bottomleft' });
  legend.onAdd = () => {
    const d = L.DomUtil.create('div');
    d.style.cssText = 'background:white;padding:7px 11px;border-radius:6px;font-family:sans-serif;font-size:11px;box-shadow:0 2px 8px rgba(0,0,0,0.15);line-height:2;';
    d.innerHTML = '<div><span style="display:inline-block;width:18px;height:2px;background:#1a1a1a;vertical-align:middle;margin-right:5px;"></span>Walking</div><div><span style="display:inline-block;width:18px;height:0;border-top:2px dashed #b85c2c;vertical-align:middle;margin-right:5px;"></span>Driving</div>';
    return d;
  };
  legend.addTo(map);
}

export function focusStop(idx) {
  if (map && markers && markers[idx]) {
    map.flyTo([stops[idx].lat, stops[idx].lng], 15, { duration: 0.7 });
    markers[idx].openPopup();
  }
}

export function openFirstMarker() {
  if (markers && markers[0]) {
    setTimeout(() => markers[0].openPopup(), 600);
  }
}
