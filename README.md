# ChainView — Supply Chain Monitoring System

## Quick Start

```bash
npm install
cp .env.example .env        # fill in API keys if needed
npm run dev                  # http://localhost:5173
```

## Folder Structure

```
src/
├── components/
│   ├── common/          Button, Loader, Modal
│   ├── layout/          Sidebar, Navbar, Layout
│   ├── shipment/        ShipmentCard, ShipmentList, ShipmentForm
│   ├── timeline/        Timeline, TimelineStep
│   └── dashboard/       KpiCard, Charts, DelayStats
├── pages/               Home, Dashboard, AddShipment, ShipmentDetails, NotFound
├── context/             ShipmentContext (CRUD + filters), ThemeContext (dark mode)
├── hooks/               useDebounce, useFetch
├── services/            shipmentService (Axios), weatherService (OpenWeatherMap)
├── utils/               delayPredictor, formatDate, calculateStats
├── constants/           shipmentStatus, carriers
└── routes/              AppRoutes
```

## Key Files Explained

| File | What it does |
|------|-------------|
| `utils/delayPredictor.js` | Rule-based scoring: distance (0–4) + weather (0–4) + carrier unreliability (0–2) = risk score |
| `context/ShipmentContext.jsx` | Global state — holds all shipments, filter values, CRUD operations |
| `context/ThemeContext.jsx` | Dark/light mode toggle, persisted in localStorage |
| `hooks/useDebounce.js` | Delays search input by 300 ms before filtering |
| `services/weatherService.js` | Calls OpenWeatherMap, maps conditions to delay factor keys |

## Mock API (JSON Server)

```bash
npm install -g json-server
json-server --watch db.json --port 3001
```

Create `db.json` with `{ "shipments": [] }` to use the REST API instead of seed data.

## Deployment

```bash
npm run build        # outputs to /dist
# Deploy /dist to Vercel or Netlify
```
