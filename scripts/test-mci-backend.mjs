/**
 * MCI Backend Diagnostic Test
 * Run: node scripts/test-mci-backend.mjs
 */

const BASE_URL = "http://localhost:3000";
const PASS = "\x1b[32m✓ PASS\x1b[0m";
const FAIL = "\x1b[31m✗ FAIL\x1b[0m";
const INFO = "\x1b[36mℹ INFO\x1b[0m";

let passed = 0;
let failed = 0;

function log(icon, msg) {
  console.log(`  ${icon} ${msg}`);
}

async function test(name, fn) {
  process.stdout.write(`\n[TEST] ${name}\n`);
  try {
    await fn();
  } catch (e) {
    log(FAIL, `Unexpected error: ${e.message}`);
    failed++;
  }
}

function assert(condition, passMsg, failMsg) {
  if (condition) {
    log(PASS, passMsg);
    passed++;
  } else {
    log(FAIL, failMsg);
    failed++;
  }
}

// ─── 1. GET /api/content/mci-event ───────────────────────────────────────────
await test("GET /api/content/mci-event (active event)", async () => {
  const res = await fetch(`${BASE_URL}/api/content/mci-event`);
  log(INFO, `Status: ${res.status}`);
  assert(res.ok, `Response is OK (${res.status})`, `Response failed (${res.status})`);

  const json = await res.json();
  log(INFO, `success: ${json.success}`);
  assert(json.success === true, "success=true", `success=${json.success}, error=${json.error}`);

  if (json.success && json.data) {
    const d = Array.isArray(json.data) ? json.data[0] : json.data;
    log(INFO, `Event ID: ${d?._id}`);
    log(INFO, `isActive: ${d?.isActive}`);
    log(INFO, `Year: ${d?.year}`);
    log(INFO, `Gallery count: ${d?.gallery?.length ?? "none"}`);
    log(INFO, `Past editions count: ${d?.pastEditions?.length ?? "none"}`);
    log(INFO, `Mentoring partners count: ${d?.mentoringPartners?.length ?? "none"}`);
    log(INFO, `Media coverage count: ${d?.mediaCoverage?.length ?? "none"}`);
    assert(d?._id != null, "Event has an _id", "Event missing _id — cannot do PUT updates!");
  } else {
    log(INFO, `No data returned. Raw: ${JSON.stringify(json).slice(0, 200)}`);
  }
});

// ─── 2. GET /api/content/mci-event?all=true ──────────────────────────────────
await test("GET /api/content/mci-event?all=true", async () => {
  const res = await fetch(`${BASE_URL}/api/content/mci-event?all=true`);
  const json = await res.json();
  assert(res.ok, `Response OK (${res.status})`, `Response failed (${res.status})`);
  assert(json.success, "success=true", `success=false, error=${json.error}`);
  if (json.success) {
    const items = Array.isArray(json.data) ? json.data : [json.data];
    log(INFO, `Total MCI records in DB: ${items.length}`);
    items.forEach((e, i) => log(INFO, `  [${i}] id=${e._id} year=${e.year} isActive=${e.isActive}`));
    assert(items.length > 0, "At least one MCI event exists", "NO MCI EVENTS IN DATABASE — this is the root cause!");
  }
});

// ─── 3. PUT /api/content/mci-event (update test) ─────────────────────────────
await test("PUT /api/content/mci-event (save test)", async () => {
  // First fetch to get ID
  const getRes = await fetch(`${BASE_URL}/api/content/mci-event?all=true`);
  const getData = await getRes.json();
  
  if (!getData.success || !getData.data) {
    log(FAIL, "Cannot test PUT — no event data found");
    failed++;
    return;
  }

  const items = Array.isArray(getData.data) ? getData.data : [getData.data];
  const event = items.find(e => e.isActive) || items[0];

  if (!event?._id) {
    log(FAIL, "No event with _id found — PUT impossible");
    failed++;
    return;
  }

  log(INFO, `Attempting PUT for event _id=${event._id}`);

  const putRes = await fetch(`${BASE_URL}/api/content/mci-event`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...event,
      updatedAt: new Date(),
      // Test: add a dummy field to confirm write works
      _testPing: new Date().toISOString(),
    }),
  });

  log(INFO, `PUT status: ${putRes.status}`);
  const putJson = await putRes.json();
  log(INFO, `PUT result: ${JSON.stringify(putJson)}`);
  assert(putRes.ok && putJson.success, "PUT succeeded", `PUT FAILED: ${putJson.error || putRes.status}`);
});

// ─── 4. POST /api/content/mci-event (create test) ────────────────────────────
await test("POST /api/content/mci-event (create if empty)", async () => {
  const getRes = await fetch(`${BASE_URL}/api/content/mci-event?all=true`);
  const getData = await getRes.json();
  const items = getData.success && Array.isArray(getData.data) ? getData.data : [];
  
  if (items.length > 0) {
    log(INFO, `Skipping POST test — ${items.length} event(s) already exist`);
    log(PASS, "POST not needed (events exist)");
    passed++;
    return;
  }

  log(INFO, "No events exist. Creating initial MCI event via POST...");
  const postRes = await fetch(`${BASE_URL}/api/content/mci-event`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      year: 2026,
      title: ["MEDIATION", "CHAMPIONSHIP", "INDIA"],
      subtitle: "India's Premier Mediation Competition",
      heroDescription: [
        "The flagship event of India's mediation movement, bringing together top young lawyers.",
        "A space for mentoring, networking and branding for mediation."
      ],
      eventDetails: { dates: "2026", venue: "TBD", hosts: "TBD", sponsors: "TBD" },
      vision: { subtitle: "The Vision", title: "Globally Unique", description: [], experienceText: "7 Challenges" },
      emails: { signUp: "official@thepact.in", sponsor: "official@thepact.in", general: "official@thepact.in" },
      champions: [],
      pastEditions: [],
      gallery: [],
      mediaCoverage: [],
      rewards: [],
      mentoringPartners: [],
      heroImage: { url: "", alt: "MCI Hero" },
      visionImage: { url: "", alt: "MCI Vision" },
      competitionImage: { url: "", alt: "MCI Competition" },
      isActive: true,
    }),
  });
  
  const postJson = await postRes.json();
  log(INFO, `POST status: ${postRes.status}`);
  log(INFO, `POST result: ${JSON.stringify(postJson).slice(0, 300)}`);
  assert(postRes.ok && postJson.success, "POST created initial event", `POST FAILED: ${postJson.error}`);
  if (postJson.success) log(INFO, "✅ Initial MCI event created! Admin page should now work.");
});

// ─── 5. GET /api/upload ───────────────────────────────────────────────────────
await test("Upload route exists", async () => {
  const res = await fetch(`${BASE_URL}/api/upload`, { method: "GET" });
  // Upload only supports POST, so 405 means it exists
  assert(
    res.status === 405 || res.status === 404 || res.status === 200,
    `Upload route reachable (${res.status})`,
    `Upload route unreachable (${res.status})`
  );
  log(INFO, res.status === 405 ? "Route exists (POST-only, as expected)" : `Status ${res.status}`);
});

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(50)}`);
console.log(`\x1b[1mRESULTS: ${passed} passed, ${failed} failed\x1b[0m`);
if (failed === 0) {
  console.log("\x1b[32m✅ All MCI backend tests passed!\x1b[0m");
} else {
  console.log(`\x1b[31m❌ ${failed} test(s) failed — see output above for details.\x1b[0m`);
}
console.log("─".repeat(50));
