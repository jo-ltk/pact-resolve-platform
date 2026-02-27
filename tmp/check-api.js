const http = require('http');

http.get('http://localhost:3000/api/content/mci-event', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('--- API CHECK ---');
      console.log('Success:', json.success);
      console.log('Partners Count:', json.data?.mentoringPartners?.length || 0);
      if (json.data?.mentoringPartners?.length > 0) {
        console.log('First Logo Path:', json.data.mentoringPartners[0].logo);
        console.log('Sample Data Valid:', !!json.data.mentoringPartners[0].name);
      }
      console.log('-----------------');
    } catch (e) {
      console.error('Parse error:', e.message);
    }
  });
}).on('error', (err) => {
  console.error('Fetch error:', err.message);
});
