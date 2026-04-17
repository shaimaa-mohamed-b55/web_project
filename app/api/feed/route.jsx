import { NextResponse } from "next/server";
import feedRepo from "@/repos/FeedRepo";

export async function GET(request) {
    let feeds = await feedRepo.getAll();

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if(username) feeds = feeds.filter(t=>t.username === username);

    return NextResponse.json(feeds);
}

export async function POST(request) {
    const body = await request.json();


        //     "id": "user-name Date.now()",
        // "createdAt":" new Date()",
        // "likes": ["firstLike","secondLike"],
        // "comments":[
        // {   "username": "username",
        //     "text": "commenttext",
        //     "createdAt": "Date AM"
        // }
    
    if (!body.username || !body.post ) {
        return NextResponse.json(
            { error: "username and post are required" },
            { status: 400 }
        );
    }

    const profileUser = await profileRepo.getById(body.username);
    if(!profileUser){
        return NextResponse.json(
            {error: "the user doesnt have a profile"},{status:400}
            
        );
    }

    const newFeed = {
        ...body,
        likes: [],
        comments: [],
        createdAt: new Date().toLocaleString()
    };

    const created = await feedRepo.create(newFeed);
    return NextResponse.json(created, { status: 201 });
}
