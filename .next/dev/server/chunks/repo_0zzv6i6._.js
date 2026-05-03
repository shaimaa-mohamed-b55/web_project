module.exports = [
"[project]/repo/prismaClient.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$generated$2f$prisma$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/generated/prisma/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$better$2d$sqlite3$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/adapter-better-sqlite3/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$better$2d$sqlite3$29$__ = __turbopack_context__.i("[externals]/better-sqlite3 [external] (better-sqlite3, cjs, [project]/node_modules/better-sqlite3)");
;
;
;
let prisma;
try {
    const db = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$better$2d$sqlite3$29$__["default"]("./prisma/dev.db");
    const adapter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$better$2d$sqlite3$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaBetterSqlite3"](db);
    prisma = new __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$generated$2f$prisma$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaClient"]({
        adapter
    });
    console.log("Prisma initialized successfully");
} catch (err) {
    console.error("Prisma init failed:", err);
    throw err;
}
const __TURBOPACK__default__export__ = prisma;
}),
"[project]/repo/ProfileRepo.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// import { promises as fs } from "fs";
// import path from "path";
var __TURBOPACK__imported__module__$5b$project$5d2f$repo$2f$prismaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repo/prismaClient.js [app-route] (ecmascript)");
;
// const dataPath = path.join(process.cwd(), "data", "profile.json");
class ProfileRepo {
    async getAll() {
        // const data = await fs.readFile(dataPath, "utf-8");
        // return JSON.parse(data);
        return await __TURBOPACK__imported__module__$5b$project$5d2f$repo$2f$prismaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].profile.findMany({
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
        return await __TURBOPACK__imported__module__$5b$project$5d2f$repo$2f$prismaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].profile.findUnique({
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
        return await __TURBOPACK__imported__module__$5b$project$5d2f$repo$2f$prismaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].profile.create({
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
        return await __TURBOPACK__imported__module__$5b$project$5d2f$repo$2f$prismaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].profile.update({
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
        return await __TURBOPACK__imported__module__$5b$project$5d2f$repo$2f$prismaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].profile.delete({
            where: {
                id: Number(id)
            }
        });
    }
    // helper used in the api 
    async getByUsername(username) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$repo$2f$prismaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].profile.findFirst({
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

//# sourceMappingURL=repo_0zzv6i6._.js.map