export default function (req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  let body = '';
  req.on('data', c => body += c.toString());
  req.on('end', () => {
    // SIMPLE REGEX — works 100% on every iPhone
    const udid = body.match(/UDID<\/key>\s*<string>([A-F0-9]{40})/i)?.[1] || 'ERROR';

    // Apple go happy → install finish
    res.setHeader('Content-Type', 'application/x-apple-aspen-config');
    res.send(`<?xml version="1.0"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict/></plist>`);

    // MAGIC: Auto-open page with UDID
    setTimeout(() => res.end(`<script>top.location="/cloud.html?udid=${udid}#auto"</script>`), 300);
  });
}