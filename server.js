const express = require("express");
const cors = require("cors");
const path = require("path");
const { getSensorData } = require("./dataSimulator");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let powerThreshold = 2000;
let history = [];

app.get("/api/data", (req, res) => {
  const data = getSensorData();

  const status = data.power > powerThreshold ? "OVERLOAD" : "NORMAL";

  const reading = {
    ...data,
    threshold: powerThreshold,
    status
  };

  history.push(reading);

  if (history.length > 10) {
    history.shift();
  }

  res.json(reading);
});

app.get("/api/history", (req, res) => {
  res.json(history);
});

app.post("/api/threshold", (req, res) => {
  const { threshold } = req.body;

  if (!threshold || threshold <= 0) {
    return res.status(400).json({
      message: "Please provide a valid threshold value"
    });
  }

  powerThreshold = threshold;

  res.json({
    message: "Threshold updated successfully",
    threshold: powerThreshold
  });
});

app.listen(PORT, () => {
  console.log(`Smart Power Monitoring System running at http://localhost:${PORT}`);
});