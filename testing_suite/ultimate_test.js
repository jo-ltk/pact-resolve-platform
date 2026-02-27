const fs = require('fs');
const http = require('http');

const BASE_URL = 'http://localhost:3000';
let logOutput = "";

function cLog(msg) {
  console.log(msg);
  logOutput += msg + "\n";
}

async function runTests() {
  cLog("==================================================");
  cLog("   INITIATING ULTIMATE CYBERSECURITY & LOGIC TEST ");
  cLog("==================================================\n");

  let adminToken = "";
  let userToken = "";
  let createdEventId = "";

  // 1. SETUP: Create Test Users
  cLog("-> [SETUP] Creating Test Accounts...");
  try {
    const adminEmail = `admin_tester_${Date.now()}@example.com`;
    await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: "Admin Tester", email: adminEmail, password: "Password123!", role: "admin" })
    });
    const adminLogin = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: adminEmail, password: "Password123!" })
    });
    const adminData = await adminLogin.json();
    adminToken = adminData.token;

    const userEmail = `user_tester_${Date.now()}@example.com`;
    await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: "User Tester", email: userEmail, password: "Password123!", role: "user" })
    });
    const userLogin = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, password: "Password123!" })
    });
    const userData = await userLogin.json();
    userToken = userData.token;

    cLog("   [+] Admin and Standard User accounts created and authenticated.\n");
  } catch (err) {
    cLog("   [!] Setup Failed: " + err.message);
    return;
  }

  // ---------------------------------------------------------
  // SCENARIO 1: Privilege Escalation & IDOR
  // ---------------------------------------------------------
  cLog("==================================================");
  cLog("🛡️ SCENARIO 1: Privilege Escalation (The 'Nosy User')");
  cLog("==================================================");
  try {
    // Standard User trying to create an Advocate Maximus Event (Admin Only)
    const escalatedReq = await fetch(`${BASE_URL}/api/content/advocate-maximus-event`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        'x-user-id': 'hacker_id'
      },
      body: JSON.stringify({ title: "Hacked Event", year: 2099, isActive: true })
    });

    if (escalatedReq.status === 401 || escalatedReq.status === 403) {
      cLog(`   ✅ PASS: Standard user was correctly blocked with status ${escalatedReq.status}.`);
    } else {
      cLog(`   ❌ FAIL: Standard user was able to access the admin route! Returned: ${escalatedReq.status}`);
    }
    cLog("");
  } catch (err) {
    cLog(`   [!] Test failed to execute: ${err.message}\n`);
  }

  // ---------------------------------------------------------
  // SCENARIO 2: End-to-End Logical Integrity (CRUD Cycle)
  // ---------------------------------------------------------
  cLog("==================================================");
  cLog("🔄 SCENARIO 2: End-to-End Logical Integrity (CRUD Cycle)");
  cLog("==================================================");
  try {
    // 1. CREATE
    const createReq = await fetch(`${BASE_URL}/api/content/advocate-maximus-event`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ title: "My Initial Title", year: 2026, isActive: true })
    });
    const createRes = await createReq.json();

    if (createReq.status === 201 && createRes.data?._id) {
      createdEventId = createRes.data._id;
      cLog("   ✅ CREATE: Successfully inserted new event into database.");

      // 2. READ & VERIFY
      const readReq = await fetch(`${BASE_URL}/api/content/advocate-maximus-event?id=${createdEventId}`);
      const readRes = await readReq.json();
      if (readRes.data?.title === "My Initial Title") {
         cLog("   ✅ READ: Verified the inserted event exists via GET.");
         
         // 3. UPDATE
         const updateReq = await fetch(`${BASE_URL}/api/content/advocate-maximus-event`, {
           method: 'PUT',
           headers: { 
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${adminToken}`
           },
           body: JSON.stringify({ _id: createdEventId, title: "My Updated Title!!" })
         });
         
         if (updateReq.status === 200) {
            cLog("   ✅ UPDATE: Successfully pushed a title modification request.");
            
            // 4. DELETE
            const deleteReq = await fetch(`${BASE_URL}/api/content/advocate-maximus-event?id=${createdEventId}`, {
              method: 'DELETE',
              headers: { 
               'Authorization': `Bearer ${adminToken}`
              }
            });

            if (deleteReq.status === 200) {
              cLog("   ✅ DELETE: Successfully deleted the event from the database.");

              // Verify Deletion
              const verifyDeleteReq = await fetch(`${BASE_URL}/api/content/advocate-maximus-event?id=${createdEventId}`);
              if (verifyDeleteReq.status === 404) {
                 cLog("   ✅ CRUD COMPLETE: The event was proven to be fully erased.");
              } else {
                 cLog("   ❌ CRUD FAILED: Expected 404 after deletion, but event was still found!");
              }

            } else {
              cLog(`   ❌ CRUD FAILED: Delete returned status ${deleteReq.status}`);
            }

         } else {
            cLog(`   ❌ CRUD FAILED: Update returned status ${updateReq.status}`);
         }

      } else {
         cLog("   ❌ CRUD FAILED: Could not retrieve the event we just created.");
      }

    } else {
       cLog(`   ❌ CRUD FAILED: Failed to create event (Status: ${createReq.status}, Output: ${JSON.stringify(createRes)})`);
    }
  } catch (err) {
    cLog(`   [!] Test failed to execute: ${err.message}`);
  }
  cLog("");


  // ---------------------------------------------------------
  // SCENARIO 3: Rate Limiting & DoS (Denial of Service)
  // ---------------------------------------------------------
  cLog("==================================================");
  cLog("🚦 SCENARIO 3: Rate Limiting & DoS Stress Test");
  cLog("==================================================");
  cLog("   -> Firing 500 concurrent requests at the server instantly...");
  
  const startTime = Date.now();
  let successCount = 0;
  let limitedCount = 0;
  let crashCount = 0;
  
  const requests = [];
  for (let i = 0; i < 500; i++) {
    requests.push(
      fetch(`${BASE_URL}/api/content/about-pact`)
      .then(res => {
        if (res.status === 429) limitedCount++;
        else if (res.status >= 500) crashCount++;
        else successCount++;
      })
      .catch(() => crashCount++)
    );
  }

  await Promise.allSettled(requests);
  const duration = Date.now() - startTime;
  
  cLog(`   [+] Execution Time: ${duration}ms`);
  cLog(`   [+] Processed (200 OK): ${successCount}`);
  cLog(`   [+] Rate Limited (429): ${limitedCount}`);
  cLog(`   [+] Crashed/Timeout (500s): ${crashCount}`);

  if (limitedCount > 0) {
    cLog("\n   ✅ PASS: Your server correctly throttled the requests to protect the database!");
  } else if (crashCount > 0) {
    cLog("\n   ❌ FAIL: The server crashed under the heavy traffic load.");
  } else if (successCount === 500) {
    cLog("\n   ⚠️ WARNING: Your server successfully handled 500 requests simultaneously without crashing (Strong CPU!), but you have ZERO rate-limiting implemented. A bot could easily abuse this and raise your database query costs.");
  }

  cLog("\n==================================================");
  cLog("             TESTING SUITE COMPLETE");
  cLog("==================================================");

  fs.writeFileSync('ultimate_test_report.log', logOutput);
}

runTests();
