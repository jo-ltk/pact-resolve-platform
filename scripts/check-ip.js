
async function checkIP() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    console.log("Current Public IP:", data.ip);
  } catch (e) {
    console.error("Could not fetch IP", e.message);
  }
}
checkIP();
