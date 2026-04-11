import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";


const profilePath = path.join(process.cwd(), "data", "profile.json"); // /data/profile.json

async function readProfile() {
    const data = await fs.readFile(profilePath)
    return JSON.parse(data)
}

async function writeProfile(profiles) {
    const data = JSON.stringify(profiles, null, 4)
    await fs.writeFile(profilePath, data)
}

export async function GET(request, { params }) {
    try {
        // localhost/api/goals/3
        const { id } = await params;

        // get all the accounts and search for the account with this id
        // we use the find array method

        const profiles = await readProfile()
        const profile = profiles.find(a => a.username == id)

        // either we have an account found or not

        if (!profile) {
            return NextResponse.json({ error: `Unable to find the profile ${id}` })
        }

        return NextResponse.json(profile)
    } catch (error) {
        return NextResponse.json({ error: "Unable to read the profile" })
    }

}


// http://localhost:3000/api/accounts/111

export async function DELETE(request , {params}){
    try{
        const { id } = await params;
        // get all the accounts and search for the account with this id
        // we use the find array method

        const profiles = await readProfile()
        const index = profiles.findIndex(a => a.username == id)

        if(index === -1){
            return NextResponse.json({ error: `Unable to find the profile ${id}` })
        }

        // delete the account
        profiles.splice(index , 1)

        await writeProfile(profiles)

        return NextResponse.json({ message: `Delete the profiles with ID =${id}` })
    }
    catch(error){
        return NextResponse.json({error: error.message})
    }
}


// given id update the gaols 
export async function PUT(request , {params}){
    
    try{

    const profile = await request.json()

    const {id} = await params;
    const profiles = await readProfile()
    const index = profiles.findIndex(a => a.username == id)

    if(index === -1){
        return NextResponse.json({ error: `Unable to find the profile ${id} for update` })
    }


    profiles[index] = {...profiles[index], ...profile }

    await writeProfile(profiles)

    return NextResponse.json({ message: `Updated the profile with id ${id}` })

    }
    catch(error){
        return NextResponse.json({error: error.message})
    }

}

// const person = {
//     name : "Ali",
//     age : 25, 
//     gender : "male"
// }

// // this is the object that we are reciving from the user 
// const updates = {
//     name : "Ali",
//     age : 80, 
//     gender : "male"
// }

// person = {...person, ...updates }
// console.log(person);

