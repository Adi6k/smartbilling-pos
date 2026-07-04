# SmartBilling POS

> An offline-first, computer-vision-assisted Point of Sale system. Items are identified from a live camera feed using a custom-trained **YOLOv8** model, weighed via scale integration, and billed automatically — with built-in anomaly detection to catch mispricing and low-confidence detections.
>
> Built collaboratively with [Chiraanth S](https://github.com/chiraanthh).

<p align="left">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white">
  <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-0.128-009688?logo=fastapi&logoColor=white">
  <img alt="YOLOv8" src="https://img.shields.io/badge/YOLOv8-Ultralytics-00FFFF">
  <img alt="SQLite" src="https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white">
</p>

---

## 🎥 Demo

▶️ **[Watch the demo walkthrough](https://github.com/chiraanthh/smartbilling-pos/blob/main/demo.mp4)** — vision billing, scale integration, and anomaly flagging in action.

https://github.com/chiraanthh/smartbilling-pos/raw/main/demo.mp4

---

## ✨ Features

- **Vision billing** — point the camera at a product; a custom-trained YOLOv8 model detects it and adds it to the cart automatically.
- **Scale integration** — weight-based pricing for items sold by the kilogram, with live readings and per-item expected-weight ranges.
- **Anomaly detection** — automatically flags suspicious activity: large price overrides (>20%), low-confidence detections (<65%), and excessive undos within a session.
- **Manual + auto modes** — fall back to keyboard/search-driven billing whenever a cashier prefers manual control.
- **Inventory management (Item Master)** — full CRUD over products, prices, units, and categories.
- **Transactions & daily reports** — searchable transaction history and an end-of-day sales summary.
- **Invoice generation** — clean, printable receipts per transaction.
- **Offline-first** — a local SQLite database plus browser `localStorage` keep the app working without a network connection.

---

## 🏗️ Architecture

```
┌─────────────────────────────┐         HTTP / JSON          ┌──────────────────────────────┐
│        Frontend (Vite)      │  ─────────────────────────▶  │       Backend (FastAPI)      │
│                             │                              │                              │
│  React 19 + TypeScript      │   POST /api/detect (image)   │  YOLOv8 inference (best.pt)   │
│  Tailwind (CDN)             │   GET  /api/products         │  SQLite (smartpos.db)         │
│  Camera feed → base64 frame │   POST /api/transactions     │  Products / Transactions CRUD │
│  localStorage cache         │   GET  /api/stats            │                              │
└─────────────────────────────┘                              └──────────────────────────────┘
```

The frontend captures a frame from the camera, sends it to the backend's `/api/detect` endpoint, and the FastAPI service runs YOLOv8 inference, maps the detected label to a product in the SQLite catalog, and returns the match with a confidence score.

---

## 🧰 Tech Stack

| Layer        | Technology                                           |
| ------------ | ---------------------------------------------------- |
| Frontend     | React 19, TypeScript, Vite 6, Tailwind CSS, lucide-react |
| Backend      | FastAPI, Uvicorn, Pydantic                           |
| Computer Vision | Ultralytics YOLOv8 (custom `best.pt` weights)     |
| Storage      | SQLite (server-side), `localStorage` (client-side)   |

---

## 📁 Project Structure

```
smartbilling-pos/
├── App.tsx                 # Main React app shell
├── components/             # UI: Vision, Scale, Invoice, Reports, Navbar, ...
├── services/               # API client, storage, mock device drivers
├── constants.ts            # Inventory seed + anomaly thresholds
├── types.ts                # Shared TypeScript types
├── main.py                 # FastAPI backend (detection + CRUD + stats)
├── best.pt                 # Custom-trained YOLOv8 weights
├── requirements.txt        # Python backend dependencies
└── vite.config.ts          # Frontend build config
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- **Python** 3.10+

### 1. Backend (FastAPI + YOLOv8)

```bash
# from the project root
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py                  # serves http://localhost:8000
```

The first run auto-creates and seeds `smartpos.db`. The `/api/detect` endpoint loads the bundled `best.pt` model.

### 2. Frontend (React + Vite)

```bash
npm install
npm run dev                     # serves http://localhost:3000
```

Open **http://localhost:3000** and grant camera access to use vision billing.

---

## 🔌 API Reference

| Method   | Endpoint                  | Description                                  |
| -------- | ------------------------- | -------------------------------------------- |
| `POST`   | `/api/detect`             | Run YOLOv8 inference on a base64 image frame |
| `GET`    | `/api/products`           | List catalog products                        |
| `POST`   | `/api/products`           | Create / update a product                    |
| `DELETE` | `/api/products/{id}`      | Delete a product                             |
| `GET`    | `/api/transactions`       | List transactions (optional `?date=`)        |
| `POST`   | `/api/transactions`       | Persist a completed transaction              |
| `GET`    | `/api/stats`              | Today's bill count, sales, and recent history|

---

## 🛣️ Roadmap

- [ ] Hardware scale driver (replace mock device service)
- [ ] Multi-store / multi-cashier support
- [ ] Configurable anomaly thresholds from the UI

---

## 📄 License

Released under the [MIT License](LICENSE).
