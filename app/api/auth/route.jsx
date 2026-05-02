import { NextResponse } from "next/server";
import authRepo from "@/repos/AuthRepo";


export async function GET(request) {
    let auths = await authRepo.getAll();

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
 
    if (username) {
        const user = await authRepo.getByUsername(username);
        if (!user) return NextResponse.json([]);
        const { password, ...rest } = user;
        return NextResponse.json([rest]);
    }

    const auths  = await authRepo.getAll();
    return NextResponse.json(auths);
}

export async function POST(request) {
    const body = await request.json();

    if (!body.username || !body.lastname || !body.firstname || !body.email || !body.password) {
        return NextResponse.json({ error: "username, lastname, firstname, email and password are required" }, { status: 400 });
    }

    const existing = await authRepo.getByUsername(body.username);
    if (existing) {
        return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    const created = await authRepo.create(body);
    return NextResponse.json(created, { status: 201 });
}
