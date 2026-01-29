# SarahahProjectAPI

Monorepo with a Node.js/Express backend and a React (Vite) frontend for anonymous messaging.

## Structure
- `Backend/` Express + MongoDB API
- `Frontend/` React (Vite) client

## Quick start
1) Start the backend: see `Backend/README.md`
2) Start the frontend: see `Frontend/README.md`

## Notes
- Frontend expects the backend at `http://localhost:3000` by default.
- Set `Frontend/.env` with `VITE_API_BASE` if your backend runs elsewhere.
