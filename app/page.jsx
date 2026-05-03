'use client';

import AvgCards from "../components/AvgCards";
import { useEffect,useState } from "react";

export default function Dashboard(){

    const[profiles,setProfiles] = useState([]);

    const [feed,setFeed] = useState([]);

    useEffect(()=>{
        async function loadData() {
            const profileResponse = await fetch ('/api/profile');
            const proileData = await profileResponse.json();
            setProfiles(proileData);

            const feedResponse = await fetch('/api/feed')
            const feedData = await feedResponse.json();
            setFeed(feedData);
        }
        loadData();
    }, []); 

   

    const profilesNo = profiles.length;
    let followersCounter = 0;
    let maxFollowers = 0;
    let mostFamousUser = null;

    profiles.forEach( p =>{
        const count =p.followers? p.followers.split(",").length : 0;
        followersCounter += count;
        if(count>maxFollowers){
            maxFollowers= count;
        mostFamousUser = p.username;
        }
    });

    const followersAvg = profilesNo>0?
    (followersCounter/profilesNo).toFixed(2):0;


    const postNo = feed.length;

    let commentsCounter = 0;
    let maxComments = 0;
    let mostCommentedPost  = null;
    
    let likesCounter = 0;
    let maxLikes = 0;
    let mostLikesPost = null;


    feed.forEach( p =>{
        const ccount =p.comments? p.comments.length : 0;
        commentsCounter+=ccount;
        if(ccount>maxComments){
            maxComments= ccount;
        mostCommentedPost = p.username;
        }

        const lcount = p.likes? p.likes.length:0;
        likesCounter+=lcount;
        if(lcount>maxLikes){
            maxLikes = lcount;
            mostLikesPost = p.username;
        }
    });
    
    const commentsAvg = postNo>0?
    (commentsCounter/postNo).toFixed(2):0;

    const likesAvg = postNo>0?
    (likesCounter/postNo).toFixed(2):0;
    

    return(
        <div className="dashboard-grid">   
            <AvgCards title="Total Profiles" avg_value={profilesNo} />
            <AvgCards title="Avg followers per user" avg_value={followersAvg}/>
            <AvgCards title="Most Famouse User" avg_value={mostFamousUser}/>
            <AvgCards title="Avg Comments per post"   avg_value={commentsAvg}/>
            <AvgCards title="Most Commented Post"  avg_value={mostCommentedPost}/>
            <AvgCards title="Most Likes Post" avg_value={mostLikesPost}/>
        </div>
    );

}