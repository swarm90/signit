// api/udid.js - Vercel serverless function
import rawBody from 'raw-body';
import plist from 'plist';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const buf = await rawBody(req);
    const text = buf.toString('utf8');
    let obj;
    try {
      obj = plist.parse(text);
    } catch (e) {
      console.log('Failed to parse plist:', e);
      obj = { raw: text };
    }
    console.log('Profile service payload received:', obj);

    // Extract UDID (adjust if your plist structure differs; standard is obj.UDID)
    let udid = obj?.UDID || null;

    console.log('Device UDID:', udid);

    // Respond with empty plist to satisfy Apple/device
    res.set('Content-Type', 'application/x-apple-aspen-config');
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict/></plist>`);

    // Delayed script to redirect browser back with UDID (hack to bypass device handler)
    setTimeout(() => {
      const referer = req.headers.referer || '';
      const page = referer.includes('cloud') ? 'cloud' : 'r6x9';
      const host = req.headers.host;
      const udidParam = udid || 'unknown';
      const url = `https://${host}/${page}.html?udid=${udidParam}`;
      res.end(`<script>window.location="${url}"</script>`);
    }, 500);
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
}

// Disable Vercel's built-in body parser to handle raw buffer
export const config = {
  api: {
    bodyParser: false,
  },
};