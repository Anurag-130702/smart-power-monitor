let lastStatus = "";

async function fetchLiveData() {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();

    const statusElement = document.getElementById("status");

    // ✅ Step 1: Compute status
    const isOverload = data.power > data.threshold;
    const status = isOverload ? "OVERLOAD" : "NORMAL";

    // ✅ Step 2: Update UI
    statusElement.innerText = status;
    statusElement.className = isOverload ? "status-overload" : "status-normal";

    // ✅ Step 3: Prevent duplicate alerts
    if (document.getElementById("alert-box")) return;

    // ✅ Step 4: Alert logic
    if (isOverload && lastStatus !== "OVERLOAD") {

      const alertBox = document.createElement("div");
      alertBox.id = "alert-box";   // 👈 ADD HERE

      alertBox.innerText = "⚠️ Power Overload Detected!";
      alertBox.style.position = "fixed";
      alertBox.style.top = "20px";
      alertBox.style.right = "20px";
      alertBox.style.background = "red";
      alertBox.style.color = "white";
      alertBox.style.padding = "12px";
      alertBox.style.borderRadius = "8px";
      alertBox.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";

      document.body.appendChild(alertBox);

      setTimeout(() => alertBox.remove(), 2000);
    }

    // ✅ Step 5: Update state
    lastStatus = isOverload ? "OVERLOAD" : "NORMAL";

    fetchHistory();
  } catch (error) {
    console.error("Error fetching live data:", error);
  }
}

async function fetchHistory() {
  try {
    const response = await fetch("/api/history");
    const history = await response.json();

    const table = document.getElementById("historyTable");
    table.innerHTML = "";

    history.forEach((item) => {
      const row = `
        <tr style="background-color: ${item.status === "OVERLOAD" ? "#ffe6e6" : "white"}">
          <td>${item.timestamp}</td>
          <td>${item.voltage} V</td>
          <td>${item.current} A</td>
          <td>${item.power} W</td>
          <td>${item.status}</td>
        </tr>
      `;

      table.innerHTML += row;
    });
  } catch (error) {
    console.error("Error fetching history:", error);
  }
}

async function updateThreshold() {
  const thresholdInput = document.getElementById("thresholdInput");
  const threshold = Number(thresholdInput.value);

  if (!threshold || threshold <= 0) {
    alert("Please enter a valid threshold");
    return;
  }

  try {
    const response = await fetch("/api/threshold", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ threshold })
    });

    const result = await response.json();

    alert(result.message);
    thresholdInput.value = "";
  } catch (error) {
    console.error("Error updating threshold:", error);
  }
}

fetchLiveData();
setInterval(fetchLiveData, 2000);