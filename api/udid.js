// api/udid.js - Vercel (Node)
import rawBody from 'raw-body';
import plist from 'plist';

export default async function handler(req, res) {
  try {
    const buf = await rawBody(req);
    const text = buf.toString('utf8');
    // Device sends a plist in the request body
    let obj;
    try {
      obj = plist.parse(text);
    } catch (e) {
      // not a plist? return 200 anyway
      console.log('Failed to parse plist:', e);
      obj = { raw: text };
    }
    console.log('Profile service payload received:', obj);

    // Example: get UDID
    let udid = null;
    if (obj && obj.UDID) udid = obj.UDID;
    else if (obj && obj.Payload) udid = obj.Payload && obj.Payload.UDID;

    // Save UDID somewhere (DB, file, etc)
    // For now just log and respond.
    console.log('Device UDID:', udid);

    // Respond 200 OK to complete the handshake
    res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
}
