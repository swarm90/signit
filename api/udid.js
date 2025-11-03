// api/udid.js - Vercel serverless function to extract UDID and redirect
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    const match = body.match(/<key>UDID<\/key>\s*<string>([A-F0-9]{40})<\/string>/i);
    const udid = match ? match[1] : 'NO-UDID';

    // Return empty signed profile response to complete installation
    res.setHeader('Content-Type', 'application/x-apple-aspen-config');
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict/></plist>`);

    // Redirect to the page with UDID in query string
    const page = req.headers.referer?.includes('cloud') ? 'cloud.html' : 'r6x9.html';
    const redirectUrl = `/${page}?udid=${udid}`;
    res.status(301).setHeader('Location', redirectUrl).end();
  });
}