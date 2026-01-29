# Backend (SarahahProjectAPI)

Express + MongoDB API for registration, login, profile link, and anonymous messages.

## Requirements
- Node.js 18+
- MongoDB (local or Atlas)

## Setup
1) Install deps
```
cd Backend
npm install
```

2) Configure environment
```
copy .env.example .env
```
Edit `.env` values as needed (MongoDB URI, JWT secret, etc.).

3) Run
```
npm start
```
API default: `http://localhost:3000`

## Routes
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/profile/link` (auth)
- `GET /api/messages/inbox` (auth)
- `POST /api/messages/send/:userId`
- `DELETE /api/messages/:id` (auth)

## Auth
Use `Authorization: Bearer <token>` for protected endpoints.
