import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = "mongodb+srv://thepacttechnical_db_user:dXca7HszlCFJ48MP@cluster0.zxhd8cp.mongodb.net/?appName=Cluster0";
const DB_NAME = "pact_mediation";

async function testSave() {
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(DB_NAME);
  const collection = db.collection('mciEvents');

  // Find active event
  const activeEvent = await collection.findOne({ isActive: true });
  if (!activeEvent) {
    console.log('No active event found to test save.');
    await client.close();
    return;
  }

  console.log('Original Partners Count:', activeEvent.mentoringPartners?.length || 0);

  // Simulate a save
  const newPartner = { name: "Test Partner " + Date.now(), logo: "/test.png", order: (activeEvent.mentoringPartners?.length || 0) + 1 };
  const updatedPartners = [...(activeEvent.mentoringPartners || []), newPartner];

  const result = await collection.updateOne(
    { _id: activeEvent._id },
    { $set: { mentoringPartners: updatedPartners, updatedAt: new Date() } }
  );

  console.log('Update Result:', result.modifiedCount === 1 ? 'SUCCESS' : 'FAILED');

  const refreshedEvent = await collection.findOne({ _id: activeEvent._id });
  console.log('Refreshed Partners Count:', refreshedEvent.mentoringPartners?.length || 0);

  await client.close();
}

testSave().catch(console.error);
