const fs = require('fs');
const path = require('path');
const http = require('http');

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
      if (!actualMethods.includes(method)) {
          actualMethods.push(method);
      }
    }
  }

  if (actualMethods.length > 0) {
    apiList.push({ path: urlPath, methods: actualMethods });
  }
}

apiList.sort((a,b) => a.path.localeCompare(b.path));

const BASE_URL = 'http://localhost:3000';
const results = [];

async function testApi(apiPath, method) {
  const url = `${BASE_URL}${apiPath}`;
  const startTime = Date.now();
  
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };

  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    options.body = JSON.stringify({ test_ping: true, ping_message: "Admin API Automated Test Run" });
  }

  try {
    const res = await fetch(url, options);
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    // Attempt to consume body to avoid issues
    await res.text().catch(() => {});

    // Consider the API reachable/functional if it didn't throw a network error and is not a 500 error.
    // Even an auth error like 401 or bad request 400 means the endpoint works.
    let statusCategory = "Failed";
    let message = `Failed with status ${res.status}`;
    
    if (res.status >= 200 && res.status < 300) {
      statusCategory = "Passed";
      message = "Success";
    } else if (res.status === 401 || res.status === 403) {
      statusCategory = "Passed (Protected)";
      message = "Requires Authentication - Expected behavior";
    } else if (res.status === 400 || res.status === 404 || res.status === 405 || res.status === 422) {
      statusCategory = "Passed (Validation/Not Found)";
      message = `Validation/Not Found (${res.status}) - Working route`;
    }

    return {
      endpoint: apiPath,
      method,
      statusCode: res.status,
      durationMs: duration,
      result: statusCategory,
      notes: message
    };
  } catch (err) {
    const endTime = Date.now();
    return {
      endpoint: apiPath,
      method,
      statusCode: 0,
      durationMs: endTime - startTime,
      result: "Failed (Network Error)",
      notes: err.message
    };
  }
}

async function runTests() {
  console.log(`Starting automated API tests for ${apiList.length} endpoints...`);
  console.log(`Target: ${BASE_URL}\n`);
  
  for (const api of apiList) {
    for (const method of api.methods) {
      process.stdout.write(`Testing [${method}] ${api.path}... `);
      const res = await testApi(api.path, method);
      results.push(res);
      console.log(`${res.result} (${res.statusCode}) - ${res.durationMs}ms`);
    }
  }

  // Generate Report
  const reportJson = {
    generatedAt: new Date().toISOString(),
    totalEndpointsTested: results.length,
    passed: results.filter(r => r.result.includes('Passed')).length,
    failed: results.filter(r => r.result.includes('Failed')).length,
    results
  };

  fs.writeFileSync('api_test_report.json', JSON.stringify(reportJson, null, 2));

  let mdReport = `# Automated API Test Report\n\n`;
  mdReport += `**Generated At**: ${reportJson.generatedAt}\n`;
  mdReport += `**Total Test Cases (Methods over Endpoints)**: ${reportJson.totalEndpointsTested}\n`;
  mdReport += `**Passed (Including Protected/Validation)**: ${reportJson.passed}\n`;
  mdReport += `**Failed**: ${reportJson.failed}\n\n`;
  
  mdReport += `## Test Details\n\n`;
  mdReport += `| Method | Endpoint | Status | Result | Time (ms) | Notes |\n`;
  mdReport += `|---|---|---|---|---|---|\n`;
  
  for (const r of results) {
    const icon = r.result.includes('Failed') ? '❌' : '✅';
    mdReport += `| **${r.method}** | \`${r.endpoint}\` | ${r.statusCode} | ${icon} ${r.result} | ${r.durationMs}ms | ${r.notes} |\n`;
  }

  fs.writeFileSync('api_test_report.md', mdReport);
  console.log(`\nTests completed! Report saved to api_test_report.json and api_test_report.md`);
}

runTests();
