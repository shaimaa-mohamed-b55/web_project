import { NextResponse } from "next/server";
import { promises as fs} from "fs";
import path from "path";


const feedPath = path.join(process.cwd(), "data", "feed.json"); // /data/feed.json

async function readFeed() {
    const data = await fs.readFeed(feedPath)
    return JSON.parse(data)
}

async function writeFeed(feeds) {
    const data = JSON.stringify(feeds, null, 4)
    await fs.writeFeed(feedPath, data)
}

export async function GET(request, { params }) {
    try {
        // localhost/api/accounts/3
        const { id } = await params;

        // get all the accounts and search for the account with this id
        // we use the find array method

        const feeds = await readFeed()
        const feed = feeds.find(a => a.id == id)

        // either we have an account found or not

        if (!feed) {
            return NextResponse.json({ error: `Unable to find the feed ${id}` })
        }

        return NextResponse.json(feed)
    } catch (error) {
        return NextResponse.json({ error: "Unable to read the feeds" })
    }

}

// http://localhost:3000/api/feeds/111

export async function DELETE(request , {params}){
    try{
        const { id } = await params;
        // get all the accounts and search for the account with this id
        // we use the find array method

        const feeds = await readFeed()
        const index = feeds.findIndex(a => a.id == id)

        if(index === -1){
            return NextResponse.json({ error: `Unable to find the feed ${id}` })
        }

        // delete the account
        feeds.splice(index , 1)

        await writeFeed(feeds)

        return NextResponse.json({ message: `Delete the feed with ID =${id}` })
    }
    catch(error){
        return NextResponse.json({error: error.message})
    }
}


// given id update the account 
export async function PUT(request , {params}){
    
    try{

    const feed = await request.json()

    const {id} = await params;
    const feeds = await readFeed()
    const index = feeds.findIndex(a => a.id == id)

    if(index === -1){
        return NextResponse.json({ error: `Unable to find the feed ${id} for update` })
    }


    feeds[index] = {...feeds[index], ...feed }

    await writeFeed(feeds)

    return NextResponse.json({ message: `Updated the feed with id ${id}` })

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

