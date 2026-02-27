const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      walkSync(dirFile, filelist);
    } else {
      if (file === 'route.ts' || file === 'route.js') {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const routesPath = path.join(process.cwd(), 'app', 'api');
const routes = walkSync(routesPath);
const apiList = [];

for (const routeFile of routes) {
  const content = fs.readFileSync(routeFile, 'utf8');
  let urlPath = routeFile
    .replace(path.join(process.cwd(), 'app'), '')
    .replace(/\\/g, '/')
    .replace(/\/route\.(ts|js)$/, '');
  if (!urlPath || urlPath === '') urlPath = '/api'; 

  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  const actualMethods = [];
  
  for (const method of allowedMethods) {
    const regex = new RegExp(`export\\s+(const|let|var|function|async function)\\s+${method}`);
    if (regex.test(content) || content.includes(`export const ${method}`) || content.includes(`export async function ${method}`) || content.includes(`export function ${method}`)) {
      if (!actualMethods.includes(method)) actualMethods.push(method);
    }
  }

  if (actualMethods.length > 0) {
    apiList.push({ path: urlPath, methods: actualMethods });
  }
}

apiList.sort((a,b) => a.path.localeCompare(b.path));

const BASE_URL = 'http://localhost:3000';

const testScenarios = [
  { name: "SQL Injection / NoSQL Injection", body: { username: "admin' OR 1=1--", email: "admin' OR 1=1--", password: "' OR '1'='1", $ne: null } },
  { name: "XSS Attack", body: { content: "<script>alert('hacked')</script><img src=x onerror=alert(1)>", title: "javascript:alert(1)" } },
  { name: "Empty Object Payload", body: {} },
  { name: "Malformed Data Types", body: { limit: "not_a_number", page: -999, id: [1,2,3], isTrue: "maybe" } },
  { name: "Massive String Payload", body: { massiveField: "BOMB".repeat(50000) } }
];

const badQueryParams = "?id=1' OR '1'='1&page=-1&limit=999999&filter[$ne]=null&sort=<script>alert(1)</script>&id[]=1&id[]=2";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0; 
let logLines = [];

function log(msg) {
  console.log(msg);
  logLines.push(msg);
}

log("=== INITIATING EXTREME HARD TEST (SECURITY FUZZING) ===");
log("TARGET: Every discovered route in /app/api/");
log("RULES: Any 500 Internal Server Error means the API cracked (FAIL).");
log("       400/401/403/404/405/422 mean the API defended itself (PASS).\n");

async function fuzzApi(apiPath, method) {
  let endpointPassed = true;
  let endpointErrors = [];

  if (method === 'GET' || method === 'DELETE') {
    const url = `${BASE_URL}${apiPath}${badQueryParams}`;
    try {
      totalTests++;
      const res = await fetch(url, { method });
      await res.text().catch(() => {});
      if (res.status >= 500) {
        endpointPassed = false;
        endpointErrors.push(`${method} w/ Hostile Query -> 💥 CRASHED (${res.status})`);
        failedTests++;
      } else {
        passedTests++;
      }
    } catch(e) {
      endpointPassed = false;
      endpointErrors.push(`${method} w/ Hostile Query -> Connection Error`);
      failedTests++;
    }
  } else {
    for (const scenario of testScenarios) {
      totalTests++;
      const url = `${BASE_URL}${apiPath}`;
      try {
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(scenario.body)
        });
        await res.text().catch(() => {});
        if (res.status >= 500) {
          endpointPassed = false;
          endpointErrors.push(`${method} [${scenario.name}] -> 💥 CRASHED (${res.status})`);
          failedTests++;
        } else {
          passedTests++;
        }
      } catch (e) {
        endpointPassed = false;
        endpointErrors.push(`${method} [${scenario.name}] -> Connection Error`);
        failedTests++;
      }
    }
    
    totalTests++;
    try {
      const res = await fetch(`${BASE_URL}${apiPath}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: '{"broken": "json'
      });
      await res.text().catch(() => {});
      if (res.status >= 500) {
         endpointPassed = false;
         endpointErrors.push(`${method} [Malformed JSON String] -> 💥 CRASHED (${res.status})`);
         failedTests++;
      } else {
        passedTests++;
      }
    } catch(e) {
      endpointPassed = false;
      endpointErrors.push(`${method} [Malformed JSON String] -> Connection Error`);
      failedTests++;
    }
  }

  if (!endpointPassed) {
    log(`❌ ${apiPath} FAILED under pressure.`);
    endpointErrors.forEach(err => log(`   └─ ${err}`));
  }
}

async function runHardTests() {
  for (const api of apiList) {
    for (const method of api.methods) {
      await fuzzApi(api.path, method);
    }
  }

  log("\n=================================");
  log("       HARD TEST RESULTS       ");
  log("=================================");
  log(`Total Attacks Attempted : ${totalTests}`);
  log(`Guards Held (Passed)    : ${passedTests}`);
  log(`Cracked (Failed w/ 500) : ${failedTests}`);
  
  if (failedTests === 0) {
    log("\n🛡️ ABSOLUTE FORTRESS! All APIs survived the fuzzing without throwing a single 500 Server Error.");
  } else {
    log("\n⚠️ SYSTEM BREACHED: Some APIs threw 500 errors under pressure. See the logs above.");
  }

  fs.writeFileSync('hard_test_results.log', logLines.join('\n'), 'utf8');
}

runHardTests();
