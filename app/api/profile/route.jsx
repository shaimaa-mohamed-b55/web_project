import { NextResponse } from "next/server";
import profileRepo from "../../../repo/ProfileRepo";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username");

        if (username) {
            const profile = await profileRepo.getByUsername(username);
            return NextResponse.json(profile ? [profile] : []);
        }

        const profiles = await profileRepo.getAll();
        return NextResponse.json(profiles);

    } catch (err) {
        console.error("GET ERROR:", err);
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        if (!body.userId || !body.bio) {
            return NextResponse.json(
                { error: "userId and bio are required" },
                { status: 400 }
            );
        }

        const created = await profileRepo.create({
            userId: body.userId,
            bio: body.bio
        });

        return NextResponse.json(created, { status: 201 });

    } catch (err) {
        console.error("POST ERROR:", err);
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}