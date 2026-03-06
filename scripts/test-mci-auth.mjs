/**
 * MCI Backend Auth Test — simulates what the browser does when logged in
 * Run: node scripts/test-mci-auth.mjs
 * 
 * To get your auth token: open DevTools > Application > Cookies > admin_token
 * Then run: MCI_TOKEN=<your_token> node scripts/test-mci-auth.mjs
 */

const BASE_URL = "http://localhost:3000";
const TOKEN = process.env.MCI_TOKEN || "";

const PASS = "\x1b[32m✓ PASS\x1b[0m";
const FAIL = "\x1b[31m✗ FAIL\x1b[0m";
const INFO = "\x1b[36mℹ INFO\x1b[0m";
const WARN = "\x1b[33m⚠ WARN\x1b[0m";

function log(icon, msg) { console.log(`  ${icon} ${msg}`); }

if (!TOKEN) {
  console.log(`\n${WARN} No MCI_TOKEN provided. Testing without auth (simulating unauthenticated browser).\n`);
  console.log(`To test with auth: set MCI_TOKEN=<your token from browser cookies> then run again.\n`);
}

// Fetch the event
const getRes = await fetch(`${BASE_URL}/api/content/mci-event?all=true`);
const getData = await getRes.json();

if (!getData.success || !getData.data) {
  console.log(`${FAIL} Cannot fetch MCI event data. Aborting.`);
  process.exit(1);
}

const items = Array.isArray(getData.data) ? getData.data : [getData.data];
const event = items.find(e => e.isActive) || items[0];

console.log(`\n[INFO] Found event: id=${event._id}, year=${event.year}`);

// ─── Test 1: PUT with Bearer token ───────────────────────────────────────────
console.log(`\n[TEST] PUT with Authorization: Bearer header`);
{
  const res = await fetch(`${BASE_URL}/api/content/mci-event`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(TOKEN ? { "Authorization": `Bearer ${TOKEN}` } : {}),
    },
    body: JSON.stringify({ ...event, _testField: "ping_" + Date.now() }),
  });
  log(INFO, `Status: ${res.status}`);
  const json = await res.json();
  log(INFO, `Body: ${JSON.stringify(json)}`);

  if (res.status === 401) {
    log(FAIL, "AUTHENTICATION FAILED — token is missing or invalid.");
    if (!TOKEN) log(WARN, "Provide MCI_TOKEN env var to test with a real token.");
  } else if (res.status === 403) {
    log(FAIL, "FORBIDDEN — token valid but user is not admin role.");
    log(WARN, "The logged-in user may not have the 'admin' role.");
  } else if (res.ok && json.success) {
    log(PASS, "PUT succeeded with Bearer token!");
  } else {
    log(FAIL, `Unexpected error: ${JSON.stringify(json)}`);
  }
}

// ─── Test 2: PUT with Cookie ─────────────────────────────────────────────────
console.log(`\n[TEST] PUT with Cookie: admin_token`);
if (TOKEN) {
  const res = await fetch(`${BASE_URL}/api/content/mci-event`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Cookie": `admin_token=${TOKEN}`,
    },
    body: JSON.stringify({ ...event, _testField: "ping_cookie_" + Date.now() }),
  });
  log(INFO, `Status: ${res.status}`);
  const json = await res.json();
  log(INFO, `Body: ${JSON.stringify(json)}`);

  if (res.ok && json.success) {
    log(PASS, "PUT succeeded with Cookie auth!");
  } else {
    log(FAIL, `Cookie-based auth failed: ${JSON.stringify(json)}`);
  }
} else {
  log(WARN, "Skipping cookie test — no MCI_TOKEN provided");
}

// ─── Test 3: Check gallery + pastEditions structure ──────────────────────────
console.log(`\n[TEST] Checking event data structure`);
{
  log(INFO, `subtitle: ${event.subtitle || "(empty)"}`);
  log(INFO, `title lines: ${JSON.stringify(event.title)}`);
  log(INFO, `heroDescription: ${JSON.stringify(event.heroDescription?.slice(0, 1))?.slice(0, 60)}...`);
  log(INFO, `eventDetails: ${JSON.stringify(event.eventDetails)}`);
  log(INFO, `gallery items: ${event.gallery?.length ?? 0}`);
  log(INFO, `pastEditions: ${event.pastEditions?.length ?? 0}`);
  log(INFO, `mentoringPartners: ${event.mentoringPartners?.length ?? 0}`);
  log(INFO, `mediaCoverage: ${event.mediaCoverage?.length ?? 0}`);
  log(INFO, `heroImage.url: ${event.heroImage?.url?.slice(0, 60) || "(empty)"}`);
  log(INFO, `visionImage.url: ${event.visionImage?.url?.slice(0, 60) || "(empty)"}`);
  log(INFO, `isActive: ${event.isActive}`);
  
  const hasMissingRequired = !event.subtitle || !event.title || !event.heroDescription;
  if (hasMissingRequired) {
    log(WARN, "Some required fields are missing — content may fall back to hardcoded defaults.");
  } else {
    log(PASS, "Core content fields are present.");
  }
}

console.log(`\n${"─".repeat(50)}`);
console.log("Diagnosis complete. Check the output above for issues.");
console.log("─".repeat(50));
