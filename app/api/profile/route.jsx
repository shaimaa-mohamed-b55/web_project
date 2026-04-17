import { NextResponse } from "next/server";
import profileRepo from "@/repos/ProfileRepo";
import authRepo from "@/repos/AuthRepo";

export async function GET(request) {
    let profiles = await profileRepo.getAll();



    const { searchParams } = new URL(request.url);

    const username = searchParams.get("username");

    if (username) profiles = profiles.filter(b => b.username === username);

    return NextResponse.json(profiles);
}

export async function POST(request) {
    const body = await request.json();

    // { "username":"username","firstname": "firstname" ,"lastname": "lastname","email": "email", "password": "password","bio":"bio", "followings":[],"followers":[],"createdAt": "Date()"}


    if (!body.username || !body.firstname || !body.lastname || !body.email || !body.password) {
        return NextResponse.json(
            { error: "username, firstname, lastname,email and password are required" },
            { status: 400 }
        );
    }

    const authUser = await authRepo.getById(body.username);
    if(!authUser){
               return NextResponse.json(
            { error: "User doesnt have an accoutn" },
            { status: 400 }
        );
    }

    const profileUser = await profileRepo.getById(body.username);
    if(profileUser){
            return NextResponse.json(
            { error: "User already have a profile" },
            { status: 400 }
            );
    }

    const newProfile = {
    ...body,
    followings: [],
    followers: [],
    createdAt: new Date().toLocaleString()
};


    const created = await profileRepo.create(newProfile);
    return NextResponse.json(created, { status: 201 });
}
