import { PrismaClient } from "../app/generated/prisma/index.js";
import { promises as fs } from "fs";
import path from "path";

const prisma = new PrismaClient();

async function readJson(name) {
  const file = path.join(process.cwd(), "data", name);
  return JSON.parse(await fs.readFile(file, "utf-8"));
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
              bio: item.bio || "",
            },
          },
        },
      });
    }
    const allUsers = await prisma.user.findMany();
    const userMap = new Map(allUsers.map((u) => [u.username, u.id]));

    for (const item of items) {
      const followerId = userMap.get(item.username);

      if (item.followings && followerId) {
        const followingNames = String(item.followings).split(",");

        for (const targetName of followingNames) {
          const followingId = userMap.get(targetName.trim());

          if (followingId) {
            await prisma.follow.create({
              data: {
                followerId: followerId,
                followingId: followingId,
              },
            });
          }
        }
      }
    }
    console.log(`Seeded ${items.length} ${name} successfully!`);
  } catch (e) {
    console.error(`Error in seedUsers: ${e.message}`);
  }
}

async function seedFeed(name, items) {
  try {
    const existing = await prisma.post.findMany();
    if (existing.length > 0) {
      console.log(`Skipped ${name} - already has ${existing.length} rows`);
      return;
    }

    for (const item of items) {
      const postAuthor = await prisma.user.findUnique({
        where: { username: item.username },
      });

      if (!postAuthor) continue;

      const validLikes = [];
      for (const likeUser of item.likes || []) {
        const liker = await prisma.user.findUnique({
          where: { username: likeUser },
        });
        if (liker) {
          validLikes.push({
            user: { connect: { id: liker.id } },
          });
        }
      }

      await prisma.post.create({
        data: {
          post: item.post,
          createdAt: new Date(item.createdAt),
          author: { connect: { id: postAuthor.id } },

          comments: {
            create: await Promise.all(
              (item.comments || []).map(async (c) => {
                const commentAuthor = await prisma.user.findUnique({
                  where: { username: c.username },
                });
                return {
                  comment: c.text,
                  username: c.username,
                  createdAt: new Date(),
                  author: {
                    connect: { id: commentAuthor?.id || postAuthor.id },
                  },
                };
              }),
            ),
          },

          likes: {
            create: validLikes,
          },
        },
      });
    }
    console.log(`Successfully seeded posts, comments, and likes!`);
  } catch (e) {
    if (e.code === "P2021" || /does not exist|no such table/i.test(e.message)) {
      console.log(`Skipped ${name} - table not in schema yet`);
    } else {
      console.error(`Error in seedFeed: ${e.message}`);
    }
  }
}

async function main() {
  

  const usersData = await readJson("profile.json");
  const feedData = await readJson("feed.json");

  await seedUsers("users and profiles", usersData);
  await seedFeed("feed", feedData);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
