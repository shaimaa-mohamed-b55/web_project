import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";


const authPath = path.join(process.cwd(), "data", "auth.json"); // /data/auth.json

async function readAuth() {
    const data = await fs.readFile(authPath)
    return JSON.parse(data)
}

async function writeAuth(auths) {
    const data = JSON.stringify(auths, null, 4)
    await fs.writeFile(authPath, data)
}




export async function GET(request, { params }) {
    try {
        // localhost/api/accounts/3
        const { id } = await params;

        // get all the accounts and search for the account with this id
        // we use the find array method

        const auths = await readAuth()
        const auth = auths.find(a => a.username == id)

        // either we have an account found or not

        if (!auth) {
            return NextResponse.json({ error: `Unable to find the username ${id}` })
        }

        return NextResponse.json(auth)
    } catch (error) {
        return NextResponse.json({ error: "Unable to read the auth" })
    }

}

// http://localhost:3000/api/accounts/111

export async function DELETE(request , {params}){
    try{
        const { id } = await params;
        // get all the accounts and search for the account with this id
        // we use the find array method

        const auths = await readAuth()
        const index = auths.findIndex(a => a.username == id)

        if(index === -1){
            return NextResponse.json({ error: `Unable to find this account ${id}` })
        }

        // delete the account
        auths.splice(index , 1)

        await writeAuth(auths)

        return NextResponse.json({ message: `Delete the auths with ID =${id}` })
    }
    catch(error){
        return NextResponse.json({error: error.message})
    }
}


// given id update the account 
export async function PUT(request , {params}){
    
    try{

    const auth = await request.json()

    const {id} = await params;
    const auths = await readAuth()
    const index = auths.findIndex(a => a.username == id)

    if(index === -1){
        return NextResponse.json({ error: `Unable to find the username ${id} for update` })
    }


    auths[index] = {...auths[index], ...auth }

    await writeAuth(auths)

    return NextResponse.json({ message: `Updated the auth with id ${id}` })

    }
    catch(error){
        return NextResponse.json({error: error.message})
    }

}


