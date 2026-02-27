const http = require('http');

async function testApiSave() {
  // 1. Get the current event data
  console.log('Fetching current event data...');
  const currentData = await new Promise((resolve, reject) => {
    http.get('http://localhost:3000/api/content/mci-event?all=true', (res) => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });

  const items = Array.isArray(currentData.data) ? currentData.data : [currentData.data];
  const activeEvent = items.find(e => e.isActive) || items[0];

  if (!activeEvent) {
    console.log('No event found to update.');
    return;
  }

  console.log('Current Partners:', activeEvent.mentoringPartners?.length || 0);

  // 2. Prepare update
  const updatedPartners = [...(activeEvent.mentoringPartners || []), { name: "Verification Partner", logo: "/test.png", order: 99 }];
  const payload = JSON.stringify({
    ...activeEvent,
    mentoringPartners: updatedPartners
  });

  // 3. Send PUT request
  console.log('Sending PUT request...');
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/content/mci-event',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
      // Note: Admin token might be needed if middleware is fully active.
      // But in dev, maybe bypass or check if it works.
    }
  };

  const putRes = await new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(d) }));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });

  console.log('Response Status:', putRes.status);
  console.log('Response Body:', putRes.body);

  if (putRes.body.success) {
    console.log('VERIFICATION SUCCESSFUL');
  } else {
    console.log('VERIFICATION FAILED:', putRes.body.error);
  }
}

testApiSave().catch(console.error);
