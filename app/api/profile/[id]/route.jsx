import { NextResponse } from "next/server";
import profileRepo from "@/repos/ProfileRepo";

export async function GET(request, { params }) {
    const { id } = await params;
    const profile = await profileRepo.getById(id);

    if (!profile) {
        return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    return NextResponse.json(profile);
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const body = await request.json();
    const updated = await profileRepo.update(id, body);

    if (!updated) {
        return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const success = await profileRepo.delete(id);

    if (!success) {
        return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Profile deleted" });
}
