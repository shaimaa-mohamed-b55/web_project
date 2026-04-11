import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

const feedPath = path.join(process.cwd(), "data", "feed.json")

async function readPath() {
    const data = await fs.readFile(feedPath)
    return JSON.parse(data)
}

async function writeFeed(feeds) {
    const data = JSON.stringify(feeds, null, 4)
    return fs.writeFile(feedPath,data)

}

export async function GET(request, { params }) {
    try{    
        const feeds = await readPath()

        const {searchParams} = new URL(request.url)
        const id = searchParams.get("id")
        const post = searchParams.get("post")
        const username = searchParams.get("username")
        if(!username){
            return NextResponse.json(feeds)
    
        }
        const filteredFeeds = feeds.filter(a=>a.username == username) 
        return NextResponse.json(filteredFeeds)
    }
    catch(error){
        return NextResponse.json({error: error.message})
    }
}






// this post method should have displayed the content 


// adding a new resource [account]
// this one to updata the data
export async function POST(response, { params }) {
    try {
        const feed = await response.json()

        // make a validations
        if (!feed.username || !feed.post ||feed.post.length < 3)
            return NextResponse.json({ message: "feed post can not be null" })

        const feeds = await readPath()
        feeds.push(feed)
        await writeFeed(feeds)

        return NextResponse.json({ message: "successfully added the post" })
    } catch (e) {
        return NextResponse.json({
            message: "unable to add post",
            error: e.message,
            stack: e.stack })
    }
}

// localhost: 3000/api/feeds {returns all the posts in feed for the user}
// if this was the question , we will have to create a folder
// call it api , inside it folder called feeds 
// and to retuan all the posts , it must have a get method 
 

