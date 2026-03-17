import './style.css';
import { stops, driveLegs, driveDividers } from './data/stops.js';
import { initMap, focusStop as focusStopOnMap, openFirstMarker } from './map.js';

// Build the sidebar with stops
const sidebar = document.getElementById('sidebar');

// Helper to create a stop element
function createStopElement(stop, index) {
  const isDrive = stop.type === 'drive';
  const div = document.createElement('div');
  div.className = `stop${isDrive ? ' is-drive' : ''}`;
  div.innerHTML = `
    <div class="stop-num">${index + 1}</div>
    <div class="stop-info">
      <div class="stop-time">${stop.time} · ${isDrive ? 'Drive' : 'Walk'}</div>
      <div class="stop-name">${stop.name}</div>
      <div class="stop-desc">${stop.desc}</div>
    </div>
  `;
  return div;
}

// Helper to create a drive divider
function createDriveDivider(text) {
  const div = document.createElement('div');
  div.className = 'drive-divider';
  div.textContent = text;
  return div;
}

// Build the sidebar content
function buildSidebar() {
  stops.forEach((stop, index) => {
    // Add drive divider before stops that come after a drive leg
    if (driveLegs.has(`${index - 1}-${index}`) && driveDividers[index]) {
      sidebar.appendChild(createDriveDivider(driveDividers[index]));
    }

    // Create and add stop element
    const stopEl = createStopElement(stop, index);
    stopEl.addEventListener('click', () => focusStop(index));
    sidebar.appendChild(stopEl);
  });
}

// Focus on a stop
function focusStop(idx) {
  // Remove active class from all stops
  const allStops = document.querySelectorAll('.stop');
  allStops.forEach(s => s.classList.remove('active'));

  // Add active class to selected stop (with bounds check)
  if (allStops[idx]) allStops[idx].classList.add('active');

  // Focus on map
  focusStopOnMap(idx);
}

// Initialize everything
async function init() {
  await initMap();
  buildSidebar();
  openFirstMarker();
  
  // Set first stop as active
  const firstStop = document.querySelector('.stop');
  if (firstStop) firstStop.classList.add('active');
}

init().catch(err => console.error('Initialization failed:', err));
