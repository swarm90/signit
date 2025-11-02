function checkAuth(app) {
  const udid = document.getElementById('udid').value.trim();
  const code = document.getElementById('auth-code').value.trim();
  
  if (!udid || udid.length < 30) {
    document.getElementById('result').innerHTML = '<span style="color:red">Enter valid UDID</span>';
    return;
  }
  if (!code) {
    document.getElementById('result').innerHTML = '<span style="color:red">Enter Auth Code</span>';
    return;
  }

  // FAKE SUCCESS (replace with real check later)
  document.getElementById('result').innerHTML = `
    <span style="color:#00ff00">Verified! Installing ${app.toUpperCase()}...</span><br>
    <a href="itms-services://?action=download-manifest&url=url=http://192.168.0.200:3000/manifest.plist" 
       style="color:cyan; font-size:20px">TAP TO INSTALL</a>
  `;
}
const validCodes = {
  cloud: ["SIGN3EABEDAA3D55B624", "SIGN9A88BF1C3F56D001"],
  r6x9: ["SIGN3EEBCDAA7C22A916", "SIGN8DD34FF5A9C71002"]
};

function checkAuth(appType) {
  const code = document.getElementById("auth-code").value.trim();
  const udid = document.getElementById("udid").value.trim();
  const result = document.getElementById("result");

  if (!udid || !code) {
    result.textContent = "Please fill in both UDID and Authorization Code.";
    result.style.color = "red";
    return;
  }

  if (validCodes[appType].includes(code)) {
    result.textContent = "✅ Verified! Your installation will begin shortly.";
    result.style.color = "green";
    // You can add redirect to IPA link here later
  } else {
    result.textContent = "❌ Invalid Authorization Code.";
    result.style.color = "red";
  }
}
