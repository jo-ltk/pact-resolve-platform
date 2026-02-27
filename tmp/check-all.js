const http = require('http');

http.get('http://localhost:3000/api/content/mci-event?all=true', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('--- API GET ALL CHECK ---');
      const items = Array.isArray(json.data) ? json.data : [json.data];
      const active = items.find(e => e.isActive);
      console.log('Active Event ID:', active?._id);
      console.log('Active Event Partners:', active?.mentoringPartners?.length || 0);
      console.log('-------------------------');
    } catch (e) {
      console.error('Parse error:', e.message);
    }
  });
});
