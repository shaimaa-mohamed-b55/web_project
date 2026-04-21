'use client'
import React,{useEffect,useState} from 'react';
// check other imports that you may need to use 



// Replace `app/page.jsx` with an async Server Component that:
// - Imports both repos
// - Fetches transactions and budgets
// - Computes totals (income, expenses, balance, total budgeted)
// - Renders 4 `SummaryCard` components in a `dashboard-grid`
// - Renders a "Recent Transactions" table showing the last 5 transactions




export default function CalulationFunction(){
    // • The average number of followers per user, 
    const[profile,setFollowers] = useState([]);
    // The average number of comments per post
    const [feed,setComments] = useState([]);
    // the most famous user, with highest number of followers
    const[profile,setMaxFollowers] = useState([]);



// now, we have to do the calculation
// where this calulation is mostly being done in html or js and we display it here
// where we display them using a component 

// wait , he is asking here for the avg number of followers per user 
// so like how to find how many users we have , and
// how from this list, we go over each profile and select their followers number

// maybe simply by saving them into a const 

async function gettingPorofiles(){
    const resource =  await fetch('api/profile');
    const data  = await resource.json();
    setFollowers(data);
    }


async function gettingComments(){
    const resource = await fetch('api/feed');
    const data = await resource.json();
    setComments(data);
}

async function gettingMaxFollowers(){
    const resource = await fetch('api/profile');
    const data = await resource.json();
    setMaxFollowers(data);
}  

    useEffect(()=>{
        gettingPorofiles();
        gettingComments();
        gettingMaxFollowers();
    }, [])




    const profilesNo = profile.length;
    let followersCounter = 0;

    profile.forEach( f =>{
        followersCounter+=f.followers.length;
    });
    const followersAvg = profilesNo>0?
    followersCounter/profilesNo:0;



    const commentsNumber = feed.length;
    let commentsCounter = 0;
    feed.forEach(comment =>{
        commentsCounter+=comment.comments.length;
    });
    const commentsAvg = commentsNumber>0? commentsCounter/commentsNumber:0;


    let followerNumber = 0;
    let max=0;
    let FollowerName = null;
    profile.forEach(f =>{
        followerNumber =f.followers.length;
        if(max<followerNumber){
            max=followerNumber;
            FollowerName = f.username;
        }
    

    });
    
    return(
        <div>
            <h2>Profiles: {profilesNo}</h2>
            <h2>Averge Followers: {followersAvg}</h2>
            <h2>Max Followers: {max},{FollowerName}</h2>

            <h2>Comments: {commentsNumber}</h2>
            <h2>Averge Comments: {commentsAvg}</h2>

            
        </div>

    );
}



















// My Questions:
// how to do better in the final 
// doing the assignment again  , what to delete to be similar to the final
// it takes time to realize where I am ,can you slow down with me
// ask him about the prisma, as well as final timig 
// how to get a full mark in the final
// is there any bonus on the lab practice if i needed
