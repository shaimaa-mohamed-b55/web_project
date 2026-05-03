module.exports = [
"[project]/app/api/profile/route.jsx [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repo$2f$ProfileRepo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repo/ProfileRepo.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    if (username) {
        const profile = await prisma.profile.findFirst({
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(profile ? [
            profile
        ] : []);
    }
    const profiles = await __TURBOPACK__imported__module__$5b$project$5d2f$repo$2f$ProfileRepo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].getAll();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(profiles);
}
async function POST(request) {
    const body = await request.json();
    if (!body.username || !body.bio) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "username and bio are required"
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
    const existingProfile = await prisma.profile.findUnique({
        where: {
            userId: user.id
        }
    });
    if (existingProfile) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "User already has a profile"
        }, {
            status: 400
        });
    }
    const created = await __TURBOPACK__imported__module__$5b$project$5d2f$repo$2f$ProfileRepo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
        bio: body.bio,
        userId: user.id
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(created, {
        status: 201
    });
}
}),
];

//# sourceMappingURL=app_api_profile_route_jsx_0d~dp~t._.js.map