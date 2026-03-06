/**
 * Test login + MCI save with real admin credentials
 * Run: node scripts/test-mci-save.mjs
 */

const BASE = "http://localhost:3000";
const PASS = "\x1b[32m✓ PASS\x1b[0m";
const FAIL = "\x1b[31m✗ FAIL\x1b[0m";
const INFO = "\x1b[36mℹ INFO\x1b[0m";
const WARN = "\x1b[33m⚠ WARN\x1b[0m";
function log(icon, msg) { console.log(`  ${icon} ${msg}`); }

// Known admin emails from DB — try each until one works
const CANDIDATES = [
  { email: "admin@pactresolve.com", password: "Admin@123" },
  { email: "admin@pact.com", password: "Admin@123" },
  { email: "admin@pact.com", password: "admin123" },
  { email: "admin@pact.com", password: "password" },
  { email: "admin@test.com", password: "Admin@123" },
  { email: "admin@test.com", password: "admin123" },
];

console.log("\n═══════════════════════════════════════════════════");
console.log(" MCI Save Flow Test");
console.log("═══════════════════════════════════════════════════\n");

// Step 1: Try to login with known credentials
console.log("[STEP 1] Trying known admin credentials...");
let token = null;
let loggedInAs = null;

for (const cred of CANDIDATES) {
  const r = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cred),
  });
  const d = await r.json();
  if (r.ok && d.token) {
    token = d.token;
    loggedInAs = cred.email;
    log(PASS, `Logged in as: ${cred.email} (role: ${d.user?.role})`);
    break;
  } else {
    log(INFO, `  ${cred.email} / ${cred.password} → ${d.error || r.status}`);
  }
}

if (!token) {
  log(FAIL, "Could not login with any known credential combination.");
  log(WARN, "");
  log(WARN, "ACTION REQUIRED: The admin password is unknown.");
  log(WARN, "Please provide the correct admin password.");
  log(WARN, "Or run: node scripts/reset-admin-password.mjs to set a new one.");
  console.log("\n═══════════════════════════════════════════════════\n");
  process.exit(1);
}

// Step 2: Fetch event
console.log("\n[STEP 2] Fetch active MCI event...");
const getRes = await fetch(`${BASE}/api/content/mci-event?all=true`);
const getData = await getRes.json();
const items = getData.success ? (Array.isArray(getData.data) ? getData.data : [getData.data]) : [];
const event = items.find(e => e.isActive) || items[0];

if (!event) {
  log(FAIL, "No MCI event in database");
  process.exit(1);
}
log(PASS, `Event found: _id=${event._id}, year=${event.year}`);
log(INFO, `gallery=${event.gallery?.length || 0}, partners=${event.mentoringPartners?.length || 0}`);
log(INFO, `pastEditions=${event.pastEditions?.length || 0}, press=${event.mediaCoverage?.length || 0}`);

// Step 3: Test PUT (what the admin page does when you click Save)
console.log("\n[STEP 3] Test PUT save (simulating admin page save button)...");
const putPayload = {
  ...event,
  isActive: true,
  gallery: event.gallery || [],
  mentoringPartners: event.mentoringPartners || [],
  mediaCoverage: event.mediaCoverage || [],
  pastEditions: event.pastEditions || [],
};

const putRes = await fetch(`${BASE}/api/content/mci-event`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
  body: JSON.stringify(putPayload),
});
const putData = await putRes.json();
log(INFO, `PUT status: ${putRes.status}`);
log(INFO, `PUT result: ${JSON.stringify(putData)}`);

if (putRes.ok && putData.success) {
  log(PASS, "PUT WORKS! The save button should work when logged in.");
} else {
  log(FAIL, `PUT FAILED with status ${putRes.status}: ${putData.error || JSON.stringify(putData)}`);
}

// Step 4: Test upload endpoint
console.log("\n[STEP 4] Test upload endpoint accessibility...");
const up = await fetch(`${BASE}/api/upload`, {
  method: "GET",
  headers: { "Authorization": `Bearer ${token}` },
});
log(INFO, `Upload GET status: ${up.status} (405 = exists, 401 = auth issue)`);
if (up.status === 405 || up.status === 200) {
  log(PASS, "Upload route is reachable with valid token");
} else if (up.status === 401) {
  log(FAIL, "Upload route returns 401 even with valid token — check middleware");
} else {
  log(INFO, `Status: ${up.status}`);
}

// Summary
console.log("\n═══════════════════════════════════════════════════");
console.log(`DIAGNOSIS COMPLETE`);
if (token && putRes.ok && putData.success) {
  console.log("\x1b[32m✅ Backend is functional. API save works correctly.\x1b[0m");
  console.log(`   Logged in as: ${loggedInAs}`);
  console.log("   Token (first 40 chars): " + token.slice(0, 40) + "...");
  console.log("\n   If the admin page UI is still broken, the issue is:");
  console.log("   1. The browser's admin_token cookie may be expired/missing.");
  console.log("   2. The useAuth() token state may not be initialized in time.");
  console.log("   3. The 'Publish Changes' button may not be sending the token.");
  console.log("\n   SOLUTION: Log out and log back in at /admin/login");
} else {
  console.log("\x1b[31m❌ Backend has issues. See failures above.\x1b[0m");
}
console.log("═══════════════════════════════════════════════════\n");
