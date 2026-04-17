import { NextResponse } from "next/server";
import authRepo from "@/repos/AuthRepo";


export async function GET(request) {
    let auths = await authRepo.getAll();

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
 
    if (username) auths = auths.filter(b => b.username === username);

    const returned = auths.map(({password, ...rest})=>rest);

    return NextResponse.json(returned);
}

export async function POST(request) {
    const body = await request.json();

    if (!body.username || body.lastname === undefined || !body.firstname || !body.email || !body.password  ) {
        return NextResponse.json(
            { error: "username, lastname, firstname, email and passwords are required" },
            { status: 400 }
        );
    }

    const newAuth = {
        ...body,
        createdAt: new Date().toLocaleString()
    };

    const existing = await authRepo.getById(body.username);
    if(existing){
        return NextResponse.json(
            {error: "Username already taken"}, {status:400}
        );
    }


    const created = await authRepo.create(newAuth);
    return NextResponse.json(created, { status: 201 });
}
