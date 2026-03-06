/**
 * MCI Full Flow Test — logs in and tests all write operations
 * Run: node scripts/test-mci-full.mjs
 * 
 * Reads credentials from .env.local if available,
 * or use: MCI_EMAIL=admin@... MCI_PASSWORD=... node scripts/test-mci-full.mjs
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local
let envVars = {};
try {
  const envFile = readFileSync(join(__dirname, "../.env.local"), "utf-8");
  envFile.split("\n").forEach(line => {
    const [k, ...v] = line.split("=");
    if (k && v.length) envVars[k.trim()] = v.join("=").trim();
  });
} catch (e) { /* no .env.local */ }

const BASE_URL = "http://localhost:3000";
const EMAIL = process.env.MCI_EMAIL || envVars.ADMIN_EMAIL || "";
const PASSWORD = process.env.MCI_PASSWORD || envVars.ADMIN_PASSWORD || "";

const PASS = "\x1b[32m✓ PASS\x1b[0m";
const FAIL = "\x1b[31m✗ FAIL\x1b[0m";
const INFO = "\x1b[36mℹ INFO\x1b[0m";
const WARN = "\x1b[33m⚠ WARN\x1b[0m";

function log(icon, msg) { console.log(`  ${icon} ${msg}`); }
let token = null;

console.log("\n═══════════════════════════════════════════════════");
console.log(" MCI Backend Full Flow Diagnostic");
console.log("═══════════════════════════════════════════════════\n");

// ─── Step 1: Login ────────────────────────────────────────────────────────────
console.log("[STEP 1] Login to get auth token");
if (!EMAIL || !PASSWORD) {
  log(WARN, "No admin credentials found in environment or .env.local");
  log(WARN, "Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local, or pass via env vars");
  log(WARN, "Attempting login with test credentials...\n");
}

const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: EMAIL || "admin@thepact.in", password: PASSWORD || "" }),
});

const loginData = await loginRes.json();
log(INFO, `Login status: ${loginRes.status}`);

if (loginRes.ok && loginData.token) {
  token = loginData.token;
  log(PASS, `Logged in as: ${loginData.user?.email} (role: ${loginData.user?.role})`);
  log(INFO, `Token prefix: ${token.slice(0, 20)}...`);
} else {
  log(FAIL, `Login failed: ${loginData.error || JSON.stringify(loginData)}`);
  log(WARN, "");
  log(WARN, "FIX REQUIRED: Admin credentials are wrong or admin user doesn't exist.");
  log(WARN, "Check .env.local for ADMIN_EMAIL and ADMIN_PASSWORD.");
  log(WARN, "Or navigate to /admin/login in browser to test manually.");
  log(WARN, "");
  
  if (loginRes.status === 500) {
    log(WARN, "500 error may indicate a MongoDB connection issue.");
    log(WARN, "Check your MONGODB_URI in .env.local and IP whitelist in Atlas.");
  }
}

// ─── Step 2: Fetch Event ──────────────────────────────────────────────────────
console.log("\n[STEP 2] Fetch MCI event data");
const getRes = await fetch(`${BASE_URL}/api/content/mci-event?all=true`);
const getData = await getRes.json();
log(INFO, `Status: ${getRes.status}, success: ${getData.success}`);

if (!getData.success) {
  log(FAIL, `Fetch failed: ${getData.error}`);
  if (getData.error?.includes("IP") || getData.error?.includes("whitelist") || getData.error?.includes("alert number 80")) {
    log(WARN, "MONGODB IP WHITELIST ISSUE: Your current IP is not whitelisted in Atlas.");
    log(WARN, "Go to MongoDB Atlas > Network Access > Add IP Address");
  }
}

const items = getData.success && getData.data ? (Array.isArray(getData.data) ? getData.data : [getData.data]) : [];
const event = items.find(e => e.isActive) || items[0];

if (event) {
  log(PASS, `Found event: _id=${event._id}, year=${event.year}`);
} else {
  log(FAIL, "No active MCI event found in database");
  log(WARN, "The admin page cannot save without an existing record.");
  log(WARN, "Creating one now...");
}

// ─── Step 3: Test PUT ─────────────────────────────────────────────────────────
console.log("\n[STEP 3] Test PUT (save/update) with auth token");
if (!token) {
  log(WARN, "Skipping PUT test — no auth token (login failed)");
} else if (!event) {
  log(WARN, "Skipping PUT test — no event to update");
} else {
  const putRes = await fetch(`${BASE_URL}/api/content/mci-event`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...event,
      _id: event._id,
      subtitle: event.subtitle || "India's Premier Mediation Competition",
      title: event.title?.length ? event.title : ["MEDIATION", "CHAMPIONSHIP", "INDIA"],
      isActive: true,
    }),
  });
  const putData = await putRes.json();
  log(INFO, `PUT status: ${putRes.status}`);
  log(INFO, `PUT result: ${JSON.stringify(putData)}`);

  if (putRes.ok && putData.success) {
    log(PASS, "PUT succeeded! Saves ARE working when logged in.");
    log(PASS, "The admin save button SHOULD work if you're properly logged in.");
  } else if (putRes.status === 401) {
    log(FAIL, "PUT returned 401 — token invalid or expired.");
    log(WARN, "Try logging out and back in at /admin/login.");
  } else if (putRes.status === 403) {
    log(FAIL, "PUT returned 403 — user doesn't have admin role.");
    log(WARN, "Check the user's role in the database.");
  } else {
    log(FAIL, `PUT failed unexpectedly: ${JSON.stringify(putData)}`);
  }
}

// ─── Step 4: Test Gallery Save ────────────────────────────────────────────────
console.log("\n[STEP 4] Test saving gallery (simulating admin page action)");
if (!token || !event) {
  log(WARN, "Skipping — need token and event");
} else {
  const testGallery = [
    ...(event.gallery || []),
    { url: "https://images.unsplash.com/photo-1540317580384", title: "Test Entry", description: "Test", order: 999 }
  ];
  const saveRes = await fetch(`${BASE_URL}/api/content/mci-event`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ ...event, gallery: testGallery }),
  });
  const saveData = await saveRes.json();
  
  if (saveRes.ok && saveData.success) {
    log(PASS, "Gallery save works!");
    // Revert the test entry
    const revertRes = await fetch(`${BASE_URL}/api/content/mci-event`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ ...event }),
    });
    const revertData = await revertRes.json();
    log(INFO, `Reverted test entry: ${revertData.success}`);
  } else {
    log(FAIL, `Gallery save failed: ${JSON.stringify(saveData)}`);
  }
}

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log("\n═══════════════════════════════════════════════════");
if (!token) {
  console.log("\x1b[31m❌ ROOT CAUSE: Authentication failed.\x1b[0m");
  console.log("   The admin user cannot log in — check credentials in .env.local");
} else if (!event) {
  console.log("\x1b[31m❌ ROOT CAUSE: No MCI event record in database.\x1b[0m");
  console.log("   The admin page has nothing to update. Run the seed script.");
} else {
  console.log("\x1b[32m✅ Backend API appears functional when authenticated.\x1b[0m");
  console.log("   If the admin page is still broken, the issue is in the frontend.");
  console.log("   Check browser console for JS errors on /admin/events/mci");
}
console.log("═══════════════════════════════════════════════════\n");
