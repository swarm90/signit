// api/udid.js  ← 401 KILLER (VERCEL NATIVE)
module.exports = (req, res) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const udid = body.match(/UDID<\/key>\s*<string>([A-F0-9]{40})/i)?.[1] || 'NO-UDID';

    // Apple happy
    res.setHeader('Content-Type', 'application/x-apple-aspen-config');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict/></plist>`);

    // UDID fly back
    setTimeout(() => {
      const page = req.headers.referer?.includes('cloud') ? 'cloud' : 'r6x9';
      const url = `https://signit-svtj-nxmqt230i-swarm90s-projects.vercel.app/${page}.html?udid=${udid}`;
      res.end(`<script>location="${url}"</script>`);
    }, 500);
  });
};