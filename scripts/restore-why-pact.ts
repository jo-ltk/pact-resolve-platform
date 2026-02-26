import { MongoClient } from "mongodb";

const uri = "mongodb+srv://thepacttechnical_db_user:dXca7HszlCFJ48MP@cluster0.zxhd8cp.mongodb.net/?appName=Cluster0";
const dbName = "pact_mediation";

const oldWhyPactContent = [
  {
    label: "Mediation Practice Protocols",
    title: "Mediation Practice Protocols",
    iconName: "Shield",
    description: "PACT operates in alignment with internationally recognised mediation practice protocols and upholds the principles of voluntariness, neutrality, confidentiality, and party autonomy. All PACT mediations are conducted in strict adherence to The Mediation Act, 2023, ensuring legal validity, ethical integrity, and global best-practice standards.",
    cta: "Standards of Practice",
    order: 1,
    isActive: true
  },
  {
    label: "IMI QAP Mediation Advocacy",
    title: "IMI QAP Mediation Advocacy",
    iconName: "ScrollText",
    description: "PACT has been recognised by the International Mediation Institute (IMI) for its QAP-certified Mediation Advocacy, reflecting excellence in neutrality, ethical representation, and professional competence. This recognition affirms PACT's commitment to international quality standards and mediation advocacy within the mediation ecosystem.",
    cta: "Our Certifications",
    order: 2,
    isActive: true
  },
  {
    label: "International Collaborations",
    title: "International Collaborations",
    iconName: "Globe",
    description: "PACT has actively collaborated with leading institutions – International Mediation Institute (Europe/Global), Maxwell Mediators (Asia Pacific), Mediate.com (USA) to advance mediation practice, capacity building, and cross-border dispute resolution. These collaborations reflect PACT's global outlook, commitment to knowledge exchange and visibility within the mediation community.",
    cta: "Global Network",
    order: 3,
    isActive: true
  },
  {
    label: "Mediation Simplified",
    title: "Mediation Simplified",
    iconName: "BookOpen",
    description: "Mediation Simplified has made mediation accessible and practical for professionals, students, and disputants alike. By demystifying concepts and offering clear frameworks, the book, authored and curated by Jonathan Rodrigues and Nisshant Laroia, has contributed to greater awareness, informed practice, and wider adoption of mediation as an effective dispute resolution mechanism.",
    cta: "Get the Book",
    order: 4,
    isActive: true
  },
  {
    label: "Mediation Clauses",
    title: "Mediation Clauses",
    iconName: "ScrollText",
    description: "The mediation clauses endorsed by PACT, as an institutionalised mediation service provider, promote early, structured, and confidential dispute resolution. Designed to align with international best practices and the Mediation Act, 2023, these clauses provide parties with clarity, procedural certainty, and enforceable pathways to effective mediation.",
    cta: "View Clauses",
    order: 5,
    isActive: true
  }
];

async function restoreWhyPact() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("whyPact");

    console.log("Cleaning up whyPact collection...");
    await collection.deleteMany({});

    console.log("Restoring old whyPact content...");
    const now = new Date();
    const itemsToInsert = oldWhyPactContent.map(item => ({
      ...item,
      createdAt: now,
      updatedAt: now
    }));

    await collection.insertMany(itemsToInsert);
    console.log("Successfully restored old whyPact content.");
  } catch (error) {
    console.error("Restoration failed:", error);
  } finally {
    await client.close();
  }
}

restoreWhyPact();
