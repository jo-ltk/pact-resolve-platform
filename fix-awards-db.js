const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb+srv://thepacttechnical_db_user:dXca7HszlCFJ48MP@cluster0.zxhd8cp.mongodb.net/?appName=Cluster0';
const dbName = 'pact_mediation';

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const event = await db.collection('nationalImpactAwards').findOne({ isActive: true });
    
    if (event) {
      console.log('Current recipients:', event.recipients.length);
      const filteredRecipients = event.recipients.filter(r => !r.name.toLowerCase().includes('joel mehta'));
      
      const result = await db.collection('nationalImpactAwards').updateOne(
        { _id: event._id },
        { $set: { recipients: filteredRecipients } }
      );
      
      console.log('Update result:', result.modifiedCount);
      console.log('New recipients count:', filteredRecipients.length);
    } else {
      console.log('No active event found');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

run();
