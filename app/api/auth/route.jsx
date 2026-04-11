import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'


// accountsPath
const authPath = path.join(process.cwd(), "data", "auth.json")

async function readAuth() {
    const data = await fs.readFile(authPath)
    return JSON.parse(data)
}

async function writeAuth(auths) {
    const data = JSON.stringify(auths, null, 4)
    return fs.writeFile(authPath,data)

}


export async function GET(request, { params }) {
    try{    
        const auths = await readAuth()

        const {searchParams} = new URL(request.url)
        const username = searchParams.get("username")
        const email = searchParams.get("email")
        const password = searchParams.get("password")


        if(!username && !email && !password){
            return NextResponse.json(auths)
    
        }
        const filteredAuths = auths.filter(a=>a.username == username && a.email == email && a.password == password) 
        return NextResponse.json(filteredAuths)
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
        const auth = await response.json()

        // make a validations
        if (!auth.username || !auth.password ||auth.password.length < 3)
            return NextResponse.json({ message: "Account password can not be null" })

        const auths = await readAuth()
        auths.push(auth)
        await writeAuth(auths)

        return NextResponse.json({ message: "successfully added the Account" })
    } catch (e) {
        return NextResponse.json({
            message: "unable to add account",
            error: e.message,
            stack: e.stack })
    }
}

// localhost: 3000/api/accounts {returns all the accounts}
// if this was the question , we will have to create a folder
// call it api , inside it folder called accounts 
// and to retuan all the accounts , it must have a get method 
 

