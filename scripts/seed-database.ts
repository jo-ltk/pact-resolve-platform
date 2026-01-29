/**
 * Database Seeding Script
 * 
 * Run this script to populate the database with initial seed data.
 * Usage: npx tsx scripts/seed-database.ts
 * 
 * This script should be run ONCE to migrate from hardcoded content to database content.
 */

import { MongoClient } from "mongodb";
import {
  heroSlidesSeed,
  newsItemsSeed,
  panelMembersSeed,
  partnersSeed,
  footerSettingsSeed,
  globalSettingsSeed,
  mciEventSeed,
} from "../lib/db/seed-data";
import { COLLECTIONS } from "../lib/db/schemas";

// Load environment variables
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "pact_mediation";

async function seedDatabase() {
  if (!uri) {
    console.error("❌ MONGODB_URI environment variable is not set");
    process.exit(1);
  }

  console.log("🌱 Starting database seed...\n");
  
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db(dbName);
    const now = new Date();

    // Helper to add timestamps
    const withTimestamps = <T extends object>(data: T) => ({
      ...data,
      createdAt: now,
      updatedAt: now,
    });

    // 1. Seed Hero Slides
    console.log("📌 Seeding Hero Slides...");
    const heroCollection = db.collection(COLLECTIONS.HERO_SLIDES);
    await heroCollection.deleteMany({}); // Clear existing
    const heroData = heroSlidesSeed.map(withTimestamps);
    await heroCollection.insertMany(heroData);
    console.log(`   ✓ Inserted ${heroData.length} hero slides\n`);

    // 2. Seed News Items
    console.log("📌 Seeding News Items...");
    const newsCollection = db.collection(COLLECTIONS.NEWS);
    await newsCollection.deleteMany({});
    const newsData = newsItemsSeed.map(withTimestamps);
    await newsCollection.insertMany(newsData);
    console.log(`   ✓ Inserted ${newsData.length} news items\n`);

    // 3. Seed Panel Members
    console.log("📌 Seeding Panel Members...");
    const panelCollection = db.collection(COLLECTIONS.PANEL_MEMBERS);
    await panelCollection.deleteMany({});
    const panelData = panelMembersSeed.map(withTimestamps);
    await panelCollection.insertMany(panelData);
    console.log(`   ✓ Inserted ${panelData.length} panel members\n`);

    // 4. Seed Partners
    console.log("📌 Seeding Partners...");
    const partnersCollection = db.collection(COLLECTIONS.PARTNERS);
    await partnersCollection.deleteMany({});
    const partnersData = partnersSeed.map(withTimestamps);
    await partnersCollection.insertMany(partnersData);
    console.log(`   ✓ Inserted ${partnersData.length} partners\n`);

    // 5. Seed Footer Settings (singleton)
    console.log("📌 Seeding Footer Settings...");
    const footerCollection = db.collection(COLLECTIONS.FOOTER_SETTINGS);
    await footerCollection.deleteMany({});
    await footerCollection.insertOne(withTimestamps(footerSettingsSeed));
    console.log(`   ✓ Inserted footer settings\n`);

    // 6. Seed Global Settings (singleton)
    console.log("📌 Seeding Global Settings...");
    const globalCollection = db.collection(COLLECTIONS.GLOBAL_SETTINGS);
    await globalCollection.deleteMany({});
    await globalCollection.insertOne(withTimestamps(globalSettingsSeed));
    console.log(`   ✓ Inserted global settings\n`);

    // 7. Seed MCI Event
    console.log("📌 Seeding MCI Event...");
    const mciCollection = db.collection(COLLECTIONS.MCI_EVENTS);
    await mciCollection.deleteMany({});
    await mciCollection.insertOne(withTimestamps(mciEventSeed));
    console.log(`   ✓ Inserted MCI event\n`);

    // Create indexes for better query performance
    console.log("📌 Creating indexes...");
    
    await heroCollection.createIndex({ order: 1 });
    await heroCollection.createIndex({ isActive: 1 });
    
    await newsCollection.createIndex({ order: 1 });
    await newsCollection.createIndex({ isActive: 1 });
    await newsCollection.createIndex({ isFeatured: 1 });
    
    await panelCollection.createIndex({ order: 1 });
    await panelCollection.createIndex({ isActive: 1 });
    
    await partnersCollection.createIndex({ order: 1 });
    await partnersCollection.createIndex({ category: 1 });
    await partnersCollection.createIndex({ isActive: 1 });
    
    await mciCollection.createIndex({ year: 1 });
    await mciCollection.createIndex({ isActive: 1 });
    
    console.log("   ✓ Indexes created\n");

    console.log("🎉 Database seeding completed successfully!\n");
    console.log("Summary:");
    console.log("─────────────────────────────────");
    console.log(`  Hero Slides:    ${heroData.length}`);
    console.log(`  News Items:     ${newsData.length}`);
    console.log(`  Panel Members:  ${panelData.length}`);
    console.log(`  Partners:       ${partnersData.length}`);
    console.log(`  Footer:         1 (singleton)`);
    console.log(`  Global Settings: 1 (singleton)`);
    console.log(`  MCI Events:     1`);
    console.log("─────────────────────────────────");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("\n✅ MongoDB connection closed");
  }
}

// Run the seed function
seedDatabase();
