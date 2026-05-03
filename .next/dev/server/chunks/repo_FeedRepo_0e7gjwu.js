module.exports = [
"[project]/repo/FeedRepo.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// import { promises as fs } from "fs";
// import path from "path";
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$generated$2f$prisma$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/generated/prisma/index.js [app-route] (ecmascript)");
;
const prisma = new __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$generated$2f$prisma$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaClient"]();
// const dataPath = path.join(process.cwd(), "data", "feed.json");
class FeedRepo {
    async getAll() {
        // const data = await fs.readFile(dataPath, "utf-8");
        // return JSON.parse(data);
        return prisma.post.findMany({
            include: {
                comments: true,
                likes: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }
    // async save(items) {
    //     await fs.writeFile(dataPath, JSON.stringify(items, null, 4));
    // }
    async getById(id) {
        // const all = await this.getAll();
        // return all.find(b => b.id === id);
        // return prisma.feed.findUnique({ where: { id } });
        return prisma.post.findUnique({
            where: {
                id
            }
        });
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
            where: {
                id: Number(id)
            },
            data: {
                text: data.post
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
        return prisma.post.delete({
            where: {
                id: Number(id)
            }
        });
    }
}
const __TURBOPACK__default__export__ = new FeedRepo();
}),
];

//# sourceMappingURL=repo_FeedRepo_0e7gjwu.js.map