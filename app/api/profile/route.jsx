import { NextResponse } from "next/server";
import profileRepo from "../../../repo/ProfileRepo";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    if (username) {
        const profile = await profileRepo.getByUsername(username);
        return NextResponse.json(profile ? [profile] : []);
    }
    const profiles = await profileRepo.getAll();
    return NextResponse.json(profiles);
}

export async function POST(request) {
    const body = await request.json();
    if (!body.username || !body.bio) {
        return NextResponse.json({ error: "username and bio are required" }, { status: 400 });
    }
    const created = await profileRepo.create({ bio: body.bio });
    return NextResponse.json(created, { status: 201 });
}
