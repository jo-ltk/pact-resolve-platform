async function checkApi() {
  try {
    const response = await fetch('http://localhost:3000/api/content/mci-event');
    const json = await response.json();
    console.log('Success:', json.success);
    console.log('Partners Count:', json.data?.mentoringPartners?.length || 0);
    if (json.data?.mentoringPartners) {
      console.log('First Partner:', json.data.mentoringPartners[0]);
      console.log('Last Partner:', json.data.mentoringPartners[json.data.mentoringPartners.length - 1]);
    }
  } catch (error) {
    console.error('Error fetching API:', error.message);
  }
}
checkApi();
