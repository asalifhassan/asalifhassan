const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());

app.get("/signal/:symbol/:interval", async (req, res) => {
  const { symbol, interval } = req.params;
  try {
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`;
    const response = await axios.get(url);
    const candles = response.data;
    const last = candles[candles.length - 1];
    const open = parseFloat(last[1]);
    const close = parseFloat(last[4]);

    const bias = close > open ? "📈 উর্ধ্বমুখী" : "📉 নিম্নমুখী";
    res.json({ symbol, interval, bias });
  } catch (err) {
    res.status(500).json({ error: "Data fetch failed" });
  }
});

app.listen(3000, () => {
  console.log("✅ Signal API running on port 3000");
});
