import { NextResponse } from "next/server";
import profileRepo from "../../../../repo/ProfileRepo";

export async function GET(request, { params }) {
    try {
        const { id } = params;

        const profile = await profileRepo.getById(id);

        if (!profile) {
            return NextResponse.json(
                { error: "Profile not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(profile);

    } catch (err) {
        console.error("GET ERROR:", err);
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();

        const updated = await profileRepo.update(id, body);

        if (!updated) {
            return NextResponse.json(
                { error: "Profile not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updated);

    } catch (err) {
        console.error("PUT ERROR:", err);
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        const success = await profileRepo.delete(id);

        if (!success) {
            return NextResponse.json(
                { error: "Profile not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Profile deleted" });

    } catch (err) {
        console.error("DELETE ERROR:", err);
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}