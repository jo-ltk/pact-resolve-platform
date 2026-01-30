
import { SignJWT } from "jose";

const JWT_SECRET = "super-secret-pact-mediation-key-2026";
const BASE_URL = "http://localhost:3000";

async function generateToken() {
  const secret = new TextEncoder().encode(JWT_SECRET);
  return await new SignJWT({ role: "admin", userId: "test-script-admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
}

async function testNewsFlow() {
  console.log("🚀 Starting News Flow Test...");

  const token = await generateToken();
  console.log("🔑 Generated Admin Token");

  // 1. Create Dummy News Item
  console.log("\n1️⃣ Creating Dummy News Item...");
  const newItem = {
    type: "Article",
    title: "Test News Item " + Date.now(),
    date: "Jan 30, 2026",
    image: { url: "https://example.com/test.jpg", alt: "Test Image" },
    link: "https://example.com/test-news",
    order: 999,
    isActive: true,
    isFeatured: false
  };

  const createRes = await fetch(`${BASE_URL}/api/content/news`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(newItem)
  });

  if (!createRes.ok) {
    console.error("❌ Failed to create item:", await createRes.text());
    process.exit(1);
  }

  const createData = await createRes.json();
  const createdId = createData.data._id;
  console.log("✅ Created Item ID:", createdId);

  // 2. Refresh List (GET)
  console.log("\n2️⃣ Verifying Item in List...");
  const listRes = await fetch(`${BASE_URL}/api/content/news`); // GET is public
  const listData = await listRes.json();
  const found = listData.data.find((n: any) => n._id === createdId);
  
  if (found) {
    console.log("✅ Item found in list:", found.title);
  } else {
    console.error("❌ Item NOT found in list");
    process.exit(1);
  }

  // 3. Delete Item
  console.log("\n3️⃣ Deleting Dummy Item...");
  const deleteRes = await fetch(`${BASE_URL}/api/content/news?id=${createdId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (deleteRes.ok) {
    console.log("✅ Delete successful");
  } else {
    console.error("❌ Delete failed:", await deleteRes.text());
  }

  console.log("\n🎉 Test Complete!");
}

testNewsFlow().catch(console.error);
