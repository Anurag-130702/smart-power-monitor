function getSensorData() {
  const voltage = Number((220 + Math.random() * 20 - 10).toFixed(2));
  const current = Number((4 + Math.random() * 8).toFixed(2));

  const power = Number((voltage * current).toFixed(2));
  const efficiency = Number((Math.random() * 20 + 80).toFixed(2)); // 80–100%

  return {
  voltage,
  current,
  power,
  efficiency,
  timestamp: new Date().toLocaleTimeString()
};
}

module.exports = { getSensorData };