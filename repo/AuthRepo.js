import { promises as fs } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
const dataPath = path.join(process.cwd(), "data", "auth.json");

class AuthRepo {
    async getAll() {
        // const data = await fs.readFile(dataPath, "utf-8");
        // return JSON.parse(data);
        return await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                firstname: true,
                lastname: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },

        });

    }

    // async save(items) {
    //     await fs.writeFile(dataPath, JSON.stringify(items, null, 4));
    // }

    async getById(id) {
        // const all = await this.getAll();
        // return all.find(b => b.id === Number(id));
        // return await prisma.user.findUnique({
        //     where: {
        //         id:Number(id)
        //     },
        // });

        return prisma.user.findUnique({ 
            where:
             { id:
                 Number(id) 
                }
             });
    }


    async create(data) {
        // const all = await this.getAll();

        // const maxId = all.length>0 ? Math.max(...all.map(b => b.id)) : 0;

        const newItem = {
            // id: maxId+1,
            username: data.username,
            lastname: data.lastname,
            firstname: data.firstname,
            email: data.email,
            password: data.password,
            // followings: Number(data.followings || 0),
            // followers: Number(data.followers || 0),
            createdAt: data.createdAt ? new Date(data.createdAt) : undefined,
        };

        // all.push(newItem);
        // await this.save(all);
        // return newItem;
        return await prisma.user.create({
            data: newItem,
        });
    }

    async update(id, data) {
        // const all = await this.getAll();
        // const index = all.findIndex(b => b.id === Number(id));
        // if (index === -1) return null;

        // all[index] = { ...all[index], ...data, id: Number(id) };
        // await this.save(all);
        // return all[index];
        return await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: data,
        });
    }


    async delete(id) {
        // const all = await this.getAll();
        // const index = all.findIndex(b => b.id === Number(id));
        // if (index === -1) return false;
        // all.splice(index, 1);
        // await this.save(all);
        // return true;
        return await prisma.user.delete({
            where: {
                id: id,
            },
        });
    }
}

export default new AuthRepo();
