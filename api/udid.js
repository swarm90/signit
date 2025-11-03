// api/udid.js  ← VERCEL SERVERLESS (401 KILLER)
export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const match = body.match(/UDID<\/key>\s*<string>([A-F0-9]{40})/i);
    const udid = match ? match[1] : 'NO-UDID';

    // Apple swallow profile
    res.setHeader('Content-Type', 'application/x-apple-aspen-config');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict/></plist>`);

    // Auto-return UDID to Safari
    setTimeout(() => {
      const page = req.headers.referer?.includes('cloud') ? 'cloud' : 'r6x9';
      const url = `https://signit-svtj-nxmqt230i-swarm90s-projects.vercel.app/${page}.html?udid=${udid}`;
      res.end(`<script>top.location="${url}"</script>`);
    }, 500);
  });
}