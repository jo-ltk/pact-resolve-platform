
import { SignJWT } from "jose";

const BASE_URL = "http://localhost:3000/api";
const CONTENT_API_URL = `${BASE_URL}/content`;

async function getAdminToken() {
  console.log("🔐 Authenticating as Admin...");
  // Use known admin credentials or create one if needed
  // For this script we assume valid creds exist or we use a hardcoded secret in a real environment
  // But since we can't easily read the server env vars from here without dot-env flow,
  // we'll try the login flow we established in previous scripts if possible,
  // or just use the login endpoint.
  
  const email = "cms-test-admin@test.com";
  const password = "password123";

  let loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (loginRes.status === 401 || loginRes.status === 404) {
      // Try to create just in case it doesn't exist
      await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "CMS Test Admin",
          email,
          password,
          role: "admin"
        })
      });

      loginRes = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
  }

  const data = await loginRes.json();
  if (!loginRes.ok || !data.token) {
    throw new Error("Failed to get admin token");
  }
  return data.token;
}

async function createDummyEvent() {
  console.log("🚀 Creating Dummy MCI Event...");
  try {
    const token = await getAdminToken();
    const headers = { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    const dummyEvent = {
        year: 2026,
        isActive: true, // Make it active so it shows up
        title: ["MCI", "2026", "CHAMPIONSHIP"],
        subtitle: "India's Premier Mediation Event",
        heroDescription: [
            "The fourth edition of India's premier mediation event will convene the country's top next-generation dispute resolution talent."
        ],
        heroImage: { url: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80", alt: "MCI Hero" },
        visionImage: { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80", alt: "Vision" },
        competitionImage: { url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80", alt: "Competition" },
        eventDetails: {
            dates: "September 2026",
            venue: "New Delhi",
            hosts: "PACT",
            sponsors: "TBD"
        },
        vision: {
            subtitle: "The Vision",
            title: "Globally Unique",
            description: ["MCI is unique."],
            experienceText: "7 Immersive Challenges"
        },
        emails: {
            signUp: "signup@example.com",
            sponsor: "sponsor@example.com",
            general: "info@example.com"
        },
        champions: [],
        pastEditions: [],
        gallery: [],
        mediaCoverage: [],
        rewards: []
    };

    const res = await fetch(`${CONTENT_API_URL}/mci-event`, {
        method: "POST",
        headers,
        body: JSON.stringify(dummyEvent)
    });

    const data = await res.json();
    if (res.ok) {
        console.log("✅ Dummy Event Created Successfully:", data.data._id);
        console.log("Now refresh your dashboard to see it.");
    } else {
        console.error("❌ Failed to create dummy event:", data);
    }

  } catch (error) {
    console.error("Error:", error);
  }
}

createDummyEvent();
