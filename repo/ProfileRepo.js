// import { promises as fs } from "fs";
// import path from "path";

import { PrismaClient } from "../app/generated/prisma";
const prisma = new PrismaClient({
    datasource:{
        db:{
            url: process.env.DATABASE_URL,
        },
    },
});

// const dataPath = path.join(process.cwd(), "data", "profile.json");


class ProfileRepo {
    async getAll() {
        // const data = await fs.readFile(dataPath, "utf-8");
        // return JSON.parse(data);
    return await prisma.profile.findMany({
            include: {
                 user: {
                    select: {
                        id: true,
                        username: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                    },
                },
            },
            orderBy: { id: "asc" },
        });
    }

    // async save(items) {
    //     await fs.writeFile(dataPath, JSON.stringify(items, null, 4));
    // }

    async getById(id) {
        // const all = await this.getAll();
        // return all.find(b => b.id === id);
    return await prisma.profile.findUnique({
            where: { id: Number(id) },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                    },
                },
            },
        });
    }

    async create(data) {
        // const all = await this.getAll();
        // const newItem = {
        //     username: data.username,
        //     ...data,
        //     followings: [],
        //     followers: [], 
        //     createdAt: new Date().toISOString(),
        // };
        // all.push(newItem);
        // await this.save(all);
        // return newItem;
     return await prisma.profile.create({
            data: {
                bio: data.bio,
                userId: data.userId,
            },
        });
    }

    async update(id, data) {
        // const all = await this.getAll();
        // const index = all.findIndex(b => b.id === id);
        // if (index === -1) return null;
        // all[index] = { ...all[index], ...data, id: id };
        // await this.save(all);
        // return all[index];
        return await prisma.profile.update({
            where: { id: Number(id) },
            data: {
                bio: data.bio,    // Only allow updating the bio; userId is immutable
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
        return await prisma.profile.delete({
            where: { id: Number(id) },
        });
    }

    // helper used in the api 
    async getByUsername(username) {
    return await prisma.profile.findFirst({
        where: { 
            user: {
                username
            } 
        },
        include: {
            user: { select: 
                {
                    id: true, 
                    username: true, 
                    firstname: true, 
                    lastname: true, 
                    email: true 
                } 
            }
        }
    });
}
}

export default new ProfileRepo();
