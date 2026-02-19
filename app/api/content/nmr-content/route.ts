import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type NmrContent } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-12345";
const secret = new TextEncoder().encode(JWT_SECRET);

async function getUserIdFromRequest(request: NextRequest) {
  const token = request.headers.get("authorization")?.split(" ")[1] || request.cookies.get("admin_token")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.userId as string;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "true";

    const db = await getDb();
    const collection = db.collection<NmrContent>(COLLECTIONS.NMR_CONTENT);

    const query: any = isAdmin ? {} : { isActive: true };
    const items = await collection.find(query).sort({ order: 1 }).toArray();

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching NMR content:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const db = await getDb();
    const collection = db.collection<NmrContent>(COLLECTIONS.NMR_CONTENT);

    const newItem: Omit<NmrContent, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newItem as NmrContent);
    revalidatePath("/resources/national-mediation-review");

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { _id, ...updateData } = body;

    const db = await getDb();
    const collection = db.collection<NmrContent>(COLLECTIONS.NMR_CONTENT);

    await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    revalidatePath("/resources/national-mediation-review");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const db = await getDb();
    await db.collection(COLLECTIONS.NMR_CONTENT).deleteOne({ _id: new ObjectId(id) });

    revalidatePath("/resources/national-mediation-review");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}
