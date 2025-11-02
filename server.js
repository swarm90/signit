const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// load valid codes
const codesFile = path.join(__dirname, "codes.json");
let validCodes = JSON.parse(fs.readFileSync(codesFile)).validCodes;

// verify code endpoint
app.post("/verify", (req, res) => {
  const { code } = req.body;
  if (validCodes.includes(code)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Sign.IT running at http://localhost:${PORT}`);
});
