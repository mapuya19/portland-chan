export interface Stop {
  lat: number;
  lng: number;
  name: string;
  time: string;
  desc: string;
  type: 'walk' | 'drive';
}

export const stops: Stop[] = [
  {
    lat: 43.6560,
    lng: -70.2719,
    name: "🏠 Airbnb",
    time: "9:30 AM",
    desc: "121 Grant St — starting point",
    type: "walk"
  },
  {
    lat: 43.6531,
    lng: -70.2705,
    name: "☕ Tandem Coffee & Bakery",
    time: "9:30 AM",
    desc: "742 Congress St. Opens 8 AM.",
    type: "walk"
  },
  {
    lat: 43.6545,
    lng: -70.2629,
    name: "🎨 Arts District & Flea-for-All",
    time: "10:15 AM",
    desc: "585 Congress St. Opens 10 AM Sat.",
    type: "walk"
  },
  {
    lat: 43.6574,
    lng: -70.2516,
    name: "🅿️ Park in Old Port",
    time: "11:45 AM",
    desc: "Leave car here for the afternoon.",
    type: "drive"
  },
  {
    lat: 43.6594,
    lng: -70.2513,
    name: "🦪 Eventide Oyster Co.",
    time: "12:00 PM",
    desc: "86 Middle St. Brown Butter Lobster Roll!",
    type: "walk"
  },
  {
    lat: 43.6558,
    lng: -70.2538,
    name: "🛍️ Old Port Wander",
    time: "1:30 PM",
    desc: "Commercial St & waterfront.",
    type: "walk"
  },
  {
    lat: 43.6560,
    lng: -70.2529,
    name: "🍩 The Holy Donut",
    time: "3:30 PM",
    desc: "177 Commercial St. Closes 5 PM!",
    type: "walk"
  },
  {
    lat: 43.6231,
    lng: -70.2079,
    name: "🌅 Portland Head Light",
    time: "5:00 PM",
    desc: "Fort Williams Park. Closes at sunset.",
    type: "drive"
  },
  {
    lat: 43.6560,
    lng: -70.2538,
    name: "🍽️ Central Provisions",
    time: "7:15 PM",
    desc: "414 Fore St. Book ahead!",
    type: "drive"
  },
  {
    lat: 43.6540,
    lng: -70.2558,
    name: "🍸 Luna Rooftop Bar",
    time: "8:45 PM",
    desc: "285 Commercial St. Closes 11 PM.",
    type: "walk"
  },
];

export const driveLegs: Set<string> = new Set(['2-3', '6-7', '7-8']);
export const driveIdxs: Set<number> = new Set([3, 7, 8]);

export const driveDividers: Record<number, string> = {
  3: '🚗 Drive to Old Port — 5 min',
  7: '🚗 Drive to lighthouse — 20 min',
  8: '🚗 Drive back to Old Port — 20 min'
};
