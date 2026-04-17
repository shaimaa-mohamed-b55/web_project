import { NextResponse } from "next/server";
import authRepo from "@/repos/AuthRepo";

export async function GET(request, { params }) {
    const { id } = await params;
    const auth = await authRepo.getById(id);

    if (!auth) {
        return NextResponse.json({ error: "Auth not found" }, { status: 404 });
    }
    return NextResponse.json(auth);
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const body = await request.json();
    const updated = await authRepo.update(id, body);

    if (!updated) {
        return NextResponse.json({ error: "Auth not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const success = await authRepo.delete(id);

    if (!success) {
        return NextResponse.json({ error: "Auth not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Auth deleted" });
}
