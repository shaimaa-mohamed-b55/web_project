module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/repo/FeedRepo.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// import { promises as fs } from "fs";
// import path from "path";
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
(()=>{
    const e = new Error("Cannot find module '../app/generated/prisma'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
const prisma = new PrismaClient();
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
"[project]/app/api/feed/route.jsx [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repo$2f$FeedRepo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repo/FeedRepo.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
async function GET(request) {
    // let feeds = await feedRepo.getAll();
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    if (username) {
        const feeds = await prisma.post.findMany({
            where: {
                author: {
                    username
                }
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        firstname: true,
                        lastname: true
                    }
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                firstname: true,
                                lastname: true
                            }
                        }
                    }
                },
                likes: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                firstname: true,
                                lastname: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(feeds);
    }
    const feeds = await __TURBOPACK__imported__module__$5b$project$5d2f$repo$2f$FeedRepo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].getAll();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(feeds);
}
async function POST(request) {
    const body = await request.json();
    //     "id": "user-name Date.now()",
    // "createdAt":" new Date()",
    // "likes": ["firstLike","secondLike"],
    // "comments":[
    // {   "username": "username",
    //     "text": "commenttext",
    //     "createdAt": "Date AM"
    // }
    if (!body.username || !body.post) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "username and post are required"
        }, {
            status: 400
        });
    }
    const profileUser = await profileRepo.getById(body.username);
    if (!profileUser) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "the user doesnt have a profile"
        }, {
            status: 400
        });
    }
    const user = await prisma.user.findUnique({
        where: {
            username: body.username
        }
    });
    if (!user) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "User does not exist"
        }, {
            status: 400
        });
    }
    const created = await __TURBOPACK__imported__module__$5b$project$5d2f$repo$2f$FeedRepo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
        post: body.post,
        userId: user.id
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(created, {
        status: 201
    });
// const newFeed = {
//     ...body,
//     likes: [],
//     comments: [],
//     createdAt: new Date().toLocaleString()
// };
// const created = await feedRepo.create(newFeed);
// return NextResponse.json(created, { status: 201 });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0_hzxce._.js.map