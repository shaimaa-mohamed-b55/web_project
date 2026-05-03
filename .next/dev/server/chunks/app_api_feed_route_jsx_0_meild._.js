module.exports = [
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

//# sourceMappingURL=app_api_feed_route_jsx_0_meild._.js.map