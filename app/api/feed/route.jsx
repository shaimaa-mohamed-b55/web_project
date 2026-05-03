import { NextResponse } from "next/server";
import feedRepo from "../../../repo/FeedRepo";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
 
export async function GET(request) {
    // let feeds = await feedRepo.getAll();

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (username){
        const feeds=await prisma.post.findMany({
            where: { author: { username } },
            include: {
                author: { select: { id: true, username: true, firstname: true, lastname: true } },
                comments: {
                    include: { user: { select: { id: true, username: true, firstname: true, lastname: true } } }
                },
                likes: {
                    include: { user: { select: { id: true, username: true, firstname: true, lastname: true } } }
                }
            },
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(feeds);
    }

    const feeds = await feedRepo.getAll();
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
    const user = await prisma.user.findUnique({ where: { username: body.username } });
    if (!user) {
        return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }
    const created = await feedRepo.create({ post: body.post, userId: user.id });
    return NextResponse.json(created, { status: 201 });

    // const newFeed = {
    //     ...body,
    //     likes: [],
    //     comments: [],
    //     createdAt: new Date().toLocaleString()
    // };

    // const created = await feedRepo.create(newFeed);
    // return NextResponse.json(created, { status: 201 });
}
