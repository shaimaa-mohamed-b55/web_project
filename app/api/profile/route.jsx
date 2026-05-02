import { NextResponse } from "next/server";
import profileRepo from "@/repos/ProfileRepo";
import authRepo from "@/repos/AuthRepo";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
    let profiles = await profileRepo.getAll();

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (username){
         const profile = await prisma.profile.findFirst({
            where: { user: { username } },
            include: {
                user: { select: { id: true, username: true, firstname: true, lastname: true, email: true } }
            }
        });
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

    const user = await prisma.user.findUnique({ where: 
        { 
            username: body.username 
        } 
    });
    
    if (!user) {
        return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    const existingProfile = await prisma.profile.findUnique({ 
        where: { 
            userId: 
            user.id 
        } 
    });
    if (existingProfile) {
        return NextResponse.json({ 
            error: "User already has a profile" 
        }, { status: 400 });
    }

    const created = await profileRepo.create({ 
        bio: body.bio, 
        userId: user.id 
    });
    return NextResponse.json(created, { status: 201 });
}