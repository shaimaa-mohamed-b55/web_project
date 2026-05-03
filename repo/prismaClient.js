import { PrismaClient } from "../app/generated/prisma";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";

let prisma;
try {
  const db = new Database("./prisma/dev.db");
  const adapter = new PrismaBetterSqlite3(db);
  prisma = new PrismaClient({ adapter });
  console.log("Prisma initialized successfully");
} catch (err) {
  console.error("Prisma init failed:", err);
  throw err;
}

export default prisma;