import { getDb } from "@/lib/mongodb";

export interface IAuditLog {
  _id?: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: any;
  timestamp: Date;
}

export class AuditRepository {
  private static collectionName = "audit_logs";

  static async log(entry: Omit<IAuditLog, "timestamp">): Promise<void> {
    try {
      const db = await getDb();
      const { _id, ...dataToInsert } = entry;
      await db.collection(this.collectionName).insertOne({
        ...dataToInsert,
        timestamp: new Date(),
      } as any);
    } catch (error) {
      // Audit logging should not break the main request
      console.error("Failed to write audit log:", error);
    }
  }

  static async getLogs(filter: any = {}, limit: number = 50): Promise<IAuditLog[]> {
    const db = await getDb();
    const logs = await db.collection<IAuditLog>(this.collectionName)
      .find(filter)
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();
    return logs;
  }
}
