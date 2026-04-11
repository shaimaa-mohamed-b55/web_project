import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'


// accountsPath
const profilePath = path.join(process.cwd(), "data", "profile.json")

async function readProfile() {
    const data = await fs.readFile(profilePath)
    return JSON.parse(data)
}

async function writeProfile(profiles) {
    const data = JSON.stringify(profiles, null, 4)
    return fs.writeFile(profilePath,data)

}

export async function GET(request, { params }) {
    try{    
        const profiles = await readProfile()

        const {searchParams} = new URL(request.url)
        const username = searchParams.get("username")
        const bio = searchParams.get("bio")

        if(!username && !bio){
            return NextResponse.json(profiles)
    
        }
        const filteredProfiles = profiles.filter(a=>a.username == username && a.bio == bio) 
        return NextResponse.json(filteredProfiles)
    }
    catch(error){
        return NextResponse.json({error: error.message})
    }
}






// this post method should have displayed the content 

// we didnt check if

// adding a new resource [account]
// this one to updata the data
export async function POST(response, { params }) {
    try {
        const profile = await response.json()

        // make a validations
        if (!profile.bio ||profile.bio < 3)
            return NextResponse.json({ message: "profile bio can not be null" })

        const profiles = await readProfile()
        profiles.push(profile)
        await writeProfile(profiles)

        return NextResponse.json({ message: "successfully added the profile" })
    } catch (e) {
        return NextResponse.json({
            message: "unable to add profile",
            error: e.message,
            stack: e.stack })
    }
}

// localhost: 3000/api/accounts {returns all the accounts}
// if this was the question , we will have to create a folder
// call it api , inside it folder called accounts 
// and to retuan all the accounts , it must have a get method 
 

