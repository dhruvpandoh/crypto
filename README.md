# CryptoShow (Full-Stack Crypto Tracker)

A MERN-style crypto dashboard that fetches live crypto prices from the Coinlayer API and lets users save, update, and delete crypto records through a custom Express + MongoDB backend.

## Features
### Frontend (cryptoshow)
- Live crypto market data from **Coinlayer**
- Search and paginated list view
- UI cards for top assets
- Save selected crypto to backend
- Built using React + MUI components

### Backend (Backend)
- REST APIs for crypto CRUD
- MongoDB persistence via Mongoose
- Routes:
  - `GET /api/crypto/fetchalldata`
  - `POST /api/crypto/savecrypto`
  - `PUT /api/crypto/updatecrypto/:id`
  - `DELETE /api/crypto/deletecrypto/:id`

## Tech Stack
- React (CRA)
- Material UI (MUI)
- Node.js + Express
- MongoDB + Mongoose
- Axios, Lodash

## Folder Structure
```
crypto-main/
  Backend/        # Express + Mongo APIs
  cryptoshow/     # React frontend
```

## Setup Instructions

### 1. Backend Setup
```bash
cd crypto-main/Backend
npm install
```

Create a `.env` file (recommended):
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Update `db.js` to use `process.env.MONGO_URI`.

Run backend:
```bash
npm run dev
```
Backend runs on: `http://localhost:5000`

---

### 2. Frontend Setup
```bash
cd ../cryptoshow
npm install
npm start
```
Frontend runs on: `http://localhost:3000`

## Coinlayer API Key
The Coinlayer key is currently in the code:
```js
http://api.coinlayer.com/api/live?access_key=YOUR_KEY
```

**Recommended:** move to env:
```env
REACT_APP_COINLAYER_KEY=your_key
```

## Future Improvements
- Add charts for historical prices.
- Improve error handling for API limits.
- Add authentication for saved portfolios.
- Add dark mode + skeleton loaders.
