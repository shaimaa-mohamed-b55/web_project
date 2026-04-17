import { NextResponse } from "next/server";
import feedRepo from "@/repos/FeedRepo";


export async function GET(request, { params }) {
    const { id } = await params;
    const feed = await feedRepo.getById(id);

    if (!feed) {
        return NextResponse.json({ error: "Feed not found" }, { status: 404 });
    }
    return NextResponse.json(feed);
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const body = await request.json();
    const updated = await feedRepo.update(id, body);

    if (!updated) {
        return NextResponse.json({ error: "Feed not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const success = await feedRepo.delete(id);

    if (!success) {
        return NextResponse.json({ error: "Feed not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Feed deleted" });
}
