import { getDb } from "@/lib/mongodb";
import { IUser } from "@/types/auth";
import { ObjectId } from "mongodb";

export class UserRepository {
  private static collectionName = "users";

  static async findByEmail(email: string): Promise<IUser | null> {
    const db = await getDb();
    const user = await db.collection<IUser>(this.collectionName).findOne({ email });
    return user;
  }

  static async findById(id: string): Promise<IUser | null> {
    const db = await getDb();
    const user = await db.collection<IUser>(this.collectionName).findOne({ 
      _id: new ObjectId(id) as any 
    });
    return user;
  }

  static async create(userData: Partial<IUser>): Promise<IUser> {
    const db = await getDb();
    const { _id, ...dataToInsert } = userData;
    const result = await db.collection(this.collectionName).insertOne({
      ...dataToInsert,
      isActive: userData.isActive ?? true,
      role: userData.role ?? "user",
      createdAt: new Date(),
    });

    return {
      ...userData,
      _id: result.insertedId.toString(),
    } as IUser;
  }

  static async update(id: string, updateData: Partial<IUser>): Promise<boolean> {
    const db = await getDb();
    const result = await db.collection(this.collectionName).updateOne(
      { _id: new ObjectId(id) as any },
      { $set: updateData }
    );
    return result.modifiedCount > 0;
  }
}
