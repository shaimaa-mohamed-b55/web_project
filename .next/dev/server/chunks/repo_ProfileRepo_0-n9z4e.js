module.exports = [
"[project]/repo/ProfileRepo.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// import { promises as fs } from "fs";
// import path from "path";
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$generated$2f$prisma$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/generated/prisma/index.js [app-route] (ecmascript)");
;
const prisma = new __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$generated$2f$prisma$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaClient"]({
    datasource: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
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
                        email: true
                    }
                }
            },
            orderBy: {
                id: "asc"
            }
        });
    }
    // async save(items) {
    //     await fs.writeFile(dataPath, JSON.stringify(items, null, 4));
    // }
    async getById(id) {
        // const all = await this.getAll();
        // return all.find(b => b.id === id);
        return await prisma.profile.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                user: {
                    select: {
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
                userId: data.userId
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
        return await prisma.profile.update({
            where: {
                id: Number(id)
            },
            data: {
                bio: data.bio
            }
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
            where: {
                id: Number(id)
            }
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
                user: {
                    select: {
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
const __TURBOPACK__default__export__ = new ProfileRepo();
}),
];

//# sourceMappingURL=repo_ProfileRepo_0-n9z4e.js.map