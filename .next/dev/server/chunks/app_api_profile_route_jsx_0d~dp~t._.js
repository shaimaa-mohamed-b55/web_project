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
;
;
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    if (username) {
        const profile = await __TURBOPACK__imported__module__$5b$project$5d2f$repo$2f$ProfileRepo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].getByUsername(username);
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
    const created = await __TURBOPACK__imported__module__$5b$project$5d2f$repo$2f$ProfileRepo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
        bio: body.bio
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(created, {
        status: 201
    });
}
}),
];

//# sourceMappingURL=app_api_profile_route_jsx_0d~dp~t._.js.map