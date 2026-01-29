
const BASE_URL = "http://localhost:3000/api";

async function runTests() {
  console.log("🚀 Starting Backend Validation...");

  let results = {
    passed: 0,
    failed: 0,
    tests: [] as any[]
  };

  function logResult(name: string, success: boolean, message?: string, status?: number, body?: any) {
    const statusMsg = status ? ` [Status: ${status}]` : "";
    const bodyMsg = body && !success ? ` - Response: ${JSON.stringify(body)}` : "";
    if (success) {
      results.passed++;
      console.log(`✅ PASS: ${name}${statusMsg}`);
    } else {
      results.failed++;
      console.error(`❌ FAIL: ${name}${statusMsg}${message ? ` - ${message}` : ""}${bodyMsg}`);
    }
    results.tests.push({ name, success, message, status });
  }

  try {
    // 1. AUTHENTICATION TESTS
    console.log("\n--- Phase 1: Authentication ---");

    // Signup Test
    const signupRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Admin",
        email: "admin@test.com",
        password: "password123",
        role: "admin"
      })
    });
    const signupData = await signupRes.json().catch(() => ({}));
    logResult("Admin Signup", signupRes.status === 201, undefined, signupRes.status, signupData);

    // Duplicate Signup Test
    const dupSignupRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Admin",
        email: "admin@test.com",
        password: "password123",
        role: "admin"
      })
    });
    const dupSignupData = await dupSignupRes.json().catch(() => ({}));
    logResult("Duplicate Email Rejection", dupSignupRes.status === 400, undefined, dupSignupRes.status, dupSignupData);

    // Login Test
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@test.com",
        password: "password123"
      })
    });
    const loginData = await loginRes.json().catch(() => ({}));
    const adminToken = loginData.token;
    logResult("Admin Login", loginRes.status === 200 && !!adminToken, undefined, loginRes.status, loginData);

    // 2. AUTHORIZATION (RBAC) TESTS
    console.log("\n--- Phase 2: Authorization (RBAC) ---");

    // Regular User Signup/Login
    console.log("Creating test user...");
    const userSignupRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "user@test.com",
        password: "password123",
        role: "user"
      })
    });
    const userSignupData = await userSignupRes.json().catch(() => ({}));
    logResult("User Signup", userSignupRes.status === 201, undefined, userSignupRes.status, userSignupData);

    const userLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "user@test.com",
        password: "password123"
      })
    });
    const userLoginData = await userLoginRes.json().catch(() => ({}));
    const userToken = userLoginData.token;
    logResult("User Login", userLoginRes.status === 200 && !!userToken, undefined, userLoginRes.status, userLoginData);

    // Test Middleware Protection (Missing Token)
    const noAuthRes = await fetch(`${BASE_URL}/content/global-settings`);
    const noAuthData = await noAuthRes.json().catch(() => ({}));
    logResult("Reject Unauthenticated Request", noAuthRes.status === 401, undefined, noAuthRes.status, noAuthData);

    // Test User GET Access
    if (userToken) {
      const userGetRes = await fetch(`${BASE_URL}/content/global-settings`, {
        headers: { "Authorization": `Bearer ${userToken}` }
      });
      const userGetData = await userGetRes.json().catch(() => ({}));
      logResult("Allow User GET Access", userGetRes.status !== 401 && userGetRes.status !== 403, undefined, userGetRes.status, userGetData);

      // Test User POST Rejection
      const userPostRes = await fetch(`${BASE_URL}/content/global-settings`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${userToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: "hack@test.com" })
      });
      const userPostData = await userPostRes.json().catch(() => ({}));
      logResult("Reject User Write Operations", userPostRes.status === 403, undefined, userPostRes.status, userPostData);
    } else {
      logResult("User Token Available", false, "User token was not obtained");
    }

    // 3. CONTENT API TESTS
    console.log("\n--- Phase 3: Content API ---");

    // Admin Update Settings
    if (adminToken) {
      const adminPutRes = await fetch(`${BASE_URL}/content/global-settings`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${adminToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: "contact@pact.com",
          whatsapp: "+919999999999",
          contactPersons: [{ name: "Joel", phone: "+919876543210" }],
          address: "Test Address",
          companyName: "PACT Mediation"
        })
      });
      const adminPutData = await adminPutRes.json().catch(() => ({}));
      logResult("Admin Update Global Settings", adminPutRes.status === 200, undefined, adminPutRes.status, adminPutData);
    } else {
      logResult("Admin Token Available", false, "Admin token was not obtained");
    }

    // 4. SECURITY & EDGE CASES
    console.log("\n--- Phase 4: Security ---");
    const tamperedTokenRes = await fetch(`${BASE_URL}/content/global-settings`, {
      headers: { "Authorization": `Bearer ${adminToken}modified` }
    });
    const tamperedData = await tamperedTokenRes.json().catch(() => ({}));
    logResult("Reject Tampered Token", tamperedTokenRes.status === 401, undefined, tamperedTokenRes.status, tamperedData);

    // 5. SUMMARY
    console.log("\n--- Test Summary ---");
    console.log(`Passed: ${results.passed}`);
    console.log(`Failed: ${results.failed}`);
    
    if (results.failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error("Test execution error:", error);
    process.exit(1);
  }
}

runTests();
