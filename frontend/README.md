# WicketPass front end

React + Vite app for fans, gate staff and the league. See the [main README](../README.md).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

Settings go in `.env` (see `.env.example`): the WireFluid RPC URL, the explorer URL and the three contract
addresses. `vercel.json` routes every page to the app so links like `/passport` work when opened directly.
