import { PrismaClient } from "../app/generated/prisma/index.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";

const db = new Database("./prisma/dev.db");
const adapter = new PrismaBetterSqlite3(db);
const prisma = new PrismaClient({ adapter });

async function main() {
    const u1 = await prisma.user.create({ data: { username: "ahmed_99", firstname: "Ahmed", lastname: "Ali", email: "ahmed@example.com", password: "pass123" } });
    const u2 = await prisma.user.create({ data: { username: "sara_dev", firstname: "Sara", lastname: "Dev", email: "sara@example.com", password: "pass123" } });
    const u3 = await prisma.user.create({ data: { username: "omar_tech", firstname: "Omar", lastname: "Tech", email: "omar@example.com", password: "pass123" } });
    const u4 = await prisma.user.create({ data: { username: "layla_m", firstname: "Layla", lastname: "M", email: "layla@example.com", password: "pass123" } });
    const u5 = await prisma.user.create({ data: { username: "faisal_a", firstname: "Faisal", lastname: "A", email: "faisal@example.com", password: "pass123" } });

    await prisma.profile.create({ data: { bio: "Hi, I'm Ahmed!", userId: u1.id } });
    await prisma.profile.create({ data: { bio: "Hi, I'm Sara!", userId: u2.id } });
    await prisma.profile.create({ data: { bio: "Hi, I'm Omar!", userId: u3.id } });
    await prisma.profile.create({ data: { bio: "Hi, I'm Layla!", userId: u4.id } });
    await prisma.profile.create({ data: { bio: "Hi, I'm Faisal!", userId: u5.id } });

    const p1 = await prisma.post.create({ data: { text: "Exploring the hidden gems of the city today!", authorId: u1.id } });
    const p2 = await prisma.post.create({ data: { text: "Just finished reading a mystery novel!", authorId: u2.id } });
    const p3 = await prisma.post.create({ data: { text: "Nothing like a morning run to clear your head.", authorId: u3.id } });

    await prisma.comment.create({ data: { comment: "The lighting is perfect!", authorId: u2.id, username: u2.username, postId: p1.id } });
    await prisma.comment.create({ data: { comment: "No spoilers please!", authorId: u3.id, username: u3.username, postId: p2.id } });
    await prisma.comment.create({ data: { comment: "I wish I had your discipline!", authorId: u4.id, username: u4.username, postId: p3.id } });

    await prisma.like.create({ data: { userId: u2.id, postId: p1.id } });
    await prisma.like.create({ data: { userId: u3.id, postId: p1.id } });
    await prisma.like.create({ data: { userId: u1.id, postId: p2.id } });
    await prisma.like.create({ data: { userId: u4.id, postId: p3.id } });

    console.log("✅ Database seeded!");
}

main().catch(console.error).finally(() => prisma.$disconnect());