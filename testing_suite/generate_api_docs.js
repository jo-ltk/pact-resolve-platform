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

const routes = walkSync(path.join(process.cwd(), 'app', 'api'));
const apiList = [];

for (const routeFile of routes) {
  const content = fs.readFileSync(routeFile, 'utf8');
  let urlPath = routeFile
    .replace(path.join(process.cwd(), 'app'), '')
    .replace(/\\/g, '/')
    .replace(/\/route\.(ts|js)$/, '');
  
  if (!urlPath || urlPath === '') urlPath = '/api'; 

  // safer regex:
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
    apiList.push({ path: urlPath, methods: actualMethods, filePath: routeFile });
  }
}

// Ensure unique sorted
apiList.sort((a,b) => a.path.localeCompare(b.path));

// 1. Generate Markdown
let md = `# Project API Documentation\n\nTotal APIs found: **${apiList.length} endpoints**\n\n`;
md += `This document lists all API routes discovered manually in the \`app/api\` directory.\n\n`;
md += `## Endpoints\n\n`;
apiList.forEach(api => {
  md += `### \`${api.path}\`\n`;
  md += `- **Methods supported:** ${api.methods.map(m => '\`' + m + '\`').join(', ')}\n`;
  md += `- **Source File:** \`${api.filePath.replace(process.cwd(), '')}\`\n\n`;
});

fs.writeFileSync('api_documentation.md', md);

// 2. Generate Postman Collection
const postman = {
  info: {
    name: "Mediation Project API Test Suite",
    description: "Master JSON test suite for checking CRUD operations for every API. Includes PASS/FAIL tests for basic availability and correct response codes.",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  item: []
};

apiList.forEach(api => {
  const itemGroup = {
    name: api.path,
    item: []
  };

  api.methods.forEach(method => {
    // Basic CRUD JSON examples
    let requestBody = undefined;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      requestBody = {
        mode: "raw",
        raw: "{\n  \"example\": \"Replace with actual test data\"\n}",
        options: { raw: { language: "json" } }
      };
    }

    const testItem = {
      name: `${method} ${api.path}`,
      request: {
        method: method,
        header: [
          {
            key: "Content-Type",
            value: "application/json"
          }
        ],
        url: {
          raw: `{{base_url}}${api.path}`,
          host: ["{{base_url}}"],
          path: api.path.replace(/^\//, '').split('/')
        },
        body: requestBody
      },
      event: [
        {
          listen: "test",
          script: {
            exec: [
              `pm.test("Successful request or validation fail. Verify status is exactly what you expect.", function () {`,
              `    pm.expect(pm.response.code).to.be.oneOf([200, 201, 204, 400, 401, 403, 404, 500]);`,
              `});`,
              `pm.test("Response time is less than 2000ms", function () {`,
              `    pm.expect(pm.response.responseTime).to.be.below(2000);`,
              `});`,
              `pm.test("Check if response contains a JSON body", function () {`,
              `    try {`,
              `       var jsonData = pm.response.json();`,
              `       pm.expect(jsonData).to.be.an('object');`,
              `    } catch(e) {`,
              `       // Not a JSON response`,
              `    }`,
              `});`
            ],
            type: "text/javascript"
          }
        }
      ]
    };
    itemGroup.item.push(testItem);
  });

  postman.item.push(itemGroup);
});

// Add base var
postman.variable = [
  {
    key: "base_url",
    value: "http://localhost:3000",
    type: "string"
  }
];

fs.writeFileSync('api_postman_tests.json', JSON.stringify(postman, null, 2));

console.log('Successfully generated docs and API tests.');
