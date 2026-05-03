// import { promises as fs } from "fs";
// import path from "path";
import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();
// const dataPath = path.join(process.cwd(), "data", "feed.json");

class FeedRepo {
    async getAll() {
        // const data = await fs.readFile(dataPath, "utf-8");
        // return JSON.parse(data);
        return prisma.post.findMany({
            include: {
                comments: true,
                likes: true,
            },
            orderBy:{
                createdAt: "desc"
            },
        });
    }

    // async save(items) {
    //     await fs.writeFile(dataPath, JSON.stringify(items, null, 4));
    // }

    async getById(id) {
        // const all = await this.getAll();
        // return all.find(b => b.id === id);
        // return prisma.feed.findUnique({ where: { id } });
        return prisma.post.findUnique({where: { id }});
    }


    async create(data) {
        // const all = await this.getAll();
        // const newItem = {
        //     id: `${data.username}_${Date.now()} `,
        //     username: data.username,
        //     post: data.post,
        //     createdAt: new Date().toISOString(),
        //     likes: [],
        //     comments: []

        // };
        // all.push(newItem);
        // await this.save(all);
        // return newItem;
        return prisma.post.create({
            data: { 
                text: data.post,
                authorId: data.userId
            }
        });
    }
    

    async update(id, data) {
        // const all = await this.getAll();
        // const index = all.findIndex(b => b.id === id);
        // if (index === -1) return null;
        // all[index] = { ...all[index], ...data, id: id };
        // await this.save(all);
        // return all[index];
        return prisma.post.update({
            where: { id: Number(id) },
            data: {
                text: data.post,
            },
        });

    }

    async delete(id) {
        // const all = await this.getAll();
        // const index = all.findIndex(b => b.id === id);
        // if (index === -1) return false;
        // all.splice(index, 1);
        // await this.save(all);
        // return true;
        return prisma.post.delete({
            where: { id: Number(id) },
        });
    }
}

export default new FeedRepo();
