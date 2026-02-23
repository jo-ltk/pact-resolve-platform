import { getDb } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/db/schemas";

async function seedProjectUpdates() {
  console.log("Seeding Project Updates...");
  
  const db = await getDb();
  const collection = db.collection(COLLECTIONS.PROJECT_UPDATES);
  
  // Clear existing data
  await collection.deleteMany({});
  
  // Seed dummy data
  const dummyUpdates = [
    {
      title: "Workshop on Mediation",
      date: "March 2026",
      location: "SRM Law School, Haryana",
      category: "Workshop",
      iconName: "FlaskConical",
      order: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "ODRC Negotiation Contest",
      date: "June 2026",
      location: "Online Event",
      category: "Competition",
      iconName: "Target",
      order: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Lecture on Mediation",
      date: "April 2026",
      location: "IIULER Law School, Goa",
      category: "Lecture",
      iconName: "Award",
      order: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  
  await collection.insertMany(dummyUpdates);
  
  console.log("Project Updates seeded successfully!");
  console.log("Added", dummyUpdates.length, "updates");
}

seedProjectUpdates()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding:", error);
    process.exit(1);
  });
