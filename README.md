# ⚡ Smart Power Monitoring System

An EEE + Software hybrid project that simulates real-time electrical parameters and monitors power consumption with overload detection.

## 🚀 Features
- Real-time voltage & current simulation
- Power calculation (P = V × I)
- Threshold-based overload detection
- State-based alert system (no repeated alerts)
- Historical data tracking (last 10 readings)
- Clean UI dashboard

## 🛠 Tech Stack
- Node.js
- Express.js
- HTML, CSS, JavaScript

## 📡 API Endpoints

### Get Live Data
GET /api/data

### Get History
GET /api/history

### Update Threshold
POST /api/threshold  
Body:
{
  "threshold": 1800
}

## ▶️ Run Locally

```bash
npm install
node server.js