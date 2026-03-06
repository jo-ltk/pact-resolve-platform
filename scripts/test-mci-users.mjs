/**
 * Check admin users in DB and test MCI save with proper auth
 * Run: node scripts/test-mci-users.mjs
 */

import { MongoClient } from "mongodb";

const MONGODB_URI = "mongodb+srv://thepacttechnical_db_user:dXca7HszlCFJ48MP@cluster0.zxhd8cp.mongodb.net/?appName=Cluster0";
const MONGODB_DB = "pact_mediation";
const BASE_URL = "http://localhost:3000";

const INFO = "\x1b[36mℹ INFO\x1b[0m";
const PASS = "\x1b[32m✓ PASS\x1b[0m";
const FAIL = "\x1b[31m✗ FAIL\x1b[0m";
const WARN = "\x1b[33m⚠ WARN\x1b[0m";

function log(icon, msg) { console.log(`  ${icon} ${msg}`); }

console.log("\n═══════════════════════════════════════════════════");
console.log(" MCI DB + Auth Verification");
console.log("═══════════════════════════════════════════════════\n");

let client;
try {
  console.log("[STEP 1] Connect to MongoDB");
  client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  await client.connect();
  log(PASS, "Connected to MongoDB");

  const db = client.db(MONGODB_DB);

  // Check users
  console.log("\n[STEP 2] List admin users");
  const users = await db.collection("users").find({}, { projection: { name: 1, email: 1, role: 1, isActive: 1, password: 1 } }).toArray();
  log(INFO, `Total users in DB: ${users.length}`);
  users.forEach(u => {
    log(INFO, `  name=${u.name}, email=${u.email}, role=${u.role}, isActive=${u.isActive}, hasPassword=${!!u.password}`);
  });

  const adminUsers = users.filter(u => u.role === "admin");
  if (adminUsers.length === 0) {
    log(FAIL, "No admin users found! The admin panel cannot function.");
    log(WARN, "You need to create an admin user. Run the seed script or create one manually.");
  } else {
    log(PASS, `${adminUsers.length} admin user(s) found`);
  }

  // Check MCI events
  console.log("\n[STEP 3] Check MCI events");
  const events = await db.collection("mci_events").find({}).toArray();
  log(INFO, `Total MCI events: ${events.length}`);
  events.forEach(e => {
    log(INFO, `  _id=${e._id}, year=${e.year}, isActive=${e.isActive}`);
    log(INFO, `  gallery=${e.gallery?.length || 0}, partners=${e.mentoringPartners?.length || 0}, press=${e.mediaCoverage?.length || 0}`);
    log(INFO, `  pastEditions=${e.pastEditions?.length || 0}, subtitle="${e.subtitle || "(empty)"}"`);
    log(INFO, `  heroImage=${e.heroImage?.url ? "set" : "(empty)"}`);
  });

} catch (err) {
  log(FAIL, `MongoDB connection failed: ${err.message}`);
  if (err.message.includes("ETIMEDOUT") || err.message.includes("alert number 80")) {
    log(WARN, "IP WHITELIST ISSUE: Your current IP is not whitelisted in MongoDB Atlas!");
    log(WARN, "Go to: https://cloud.mongodb.com → Network Access → Add IP Address");
    log(WARN, "Add your current IP or use 0.0.0.0/0 for development.");
  }
} finally {
  if (client) await client.close();
}

console.log("\n═══════════════════════════════════════════════════\n");
