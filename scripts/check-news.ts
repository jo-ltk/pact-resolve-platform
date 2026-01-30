
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

async function check() {
  if (!uri) throw new Error("URI missing");
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const news = await db.collection("news").find({}).toArray();
  console.log("Total News Items:", news.length);
  news.forEach(n => console.log(`- ${n.title} (ID: ${n._id})`));
  await client.close();
}
check().catch(console.error);
