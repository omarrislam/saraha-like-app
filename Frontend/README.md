# Frontend (SarahahProjectAPI)

React (Vite) client for auth, inbox, and public anonymous message sending.

## Requirements
- Node.js 18+

## Setup
1) Install deps
```
cd Frontend
npm install
```

2) Configure environment (optional)
```
copy .env.example .env
```
Set `VITE_API_BASE` if your backend is not `http://localhost:3000`.

3) Run
```
npm run dev
```
App default: `http://localhost:5173`

## Pages
- `/` login/register
- `/dashboard` inbox
- `/send/:userId` public anonymous message page
