import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "public", "signit.mobileconfig");
  const data = fs.readFileSync(filePath);
  res.setHeader("Content-Type", "application/x-apple-aspen-config");
  res.setHeader("Cache-Control", "no-cache");
  res.status(200).send(data);
}
