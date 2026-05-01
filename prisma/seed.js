import { PrismaClient } from "../app/generated/prisma/index.js";
import { promises as fs } from "fs";
import path from "path";

const prisma = new PrismaClient();

async function readJson(name) {
  const file = path.join(process.cwd(), "data", name);
  const data = await fs.readFile(file, "utf-8");
  return JSON.parse(data);
}

async function seedUsers(name, items) {
  try {
    const existing = await prisma.user.findMany();
    if (existing.length > 0) {
      console.log(`Skipped ${name} - already has ${existing.length} rows`);
      return;
    }

    for (const item of items) {
      await prisma.user.create({
        data: {
          username: item.username,
          email: item.email,
          password: item.password,
          firstname: item.firstname,
          lastname: item.lastname,
          profile: {
            create: {
              username: item.username,
              firstname: item.firstname,
              lastname: item.lastname,
              email: item.email,
              password: item.password,

              bio: item.bio || "",
              followings: Array.isArray(item.followings)
                ? item.followings.join(",") || ""
                : item.followings,
              followers: Array.isArray(item.followers)
                ? item.followers.join(",") || ""
                : item.followers,
            },
          },
        },
      });
    }
    console.log(`Seeded ${items.length} ${name}`);
  } catch (e) {
    if (e.code === "P2021" || /does not exist|no such table/i.test(e.message)) {
      console.log(`Skipped ${name} - table not in schema yet`);
    } else throw e;
  }
}

async function main() {
  const usersData = await readJson("users.json");
  await seedUsers("users and profiles", usersData);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
