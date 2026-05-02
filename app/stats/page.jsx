'use client'
import React,{useEffect,useState} from 'react';


export default function CalulationFunction(){
    // for everythign from profiles
    const[profiles,setProfiles] = useState([]);
    // for everything feed
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
        <div>
            <h2>Profiles: {profilesNo}</h2>
            <h2>Averge Followers: {followersAvg}</h2>
            <h2>Max Followers: {maxFollowers},{mostFamousUser}</h2>

            <h2>Comments: {postNo}</h2>
            <h2>Averge Comments: {commentsAvg}</h2>
            <h2>Max No. Comments: {maxComments},{mostCommentedPost}</h2>
            
            <h2>Liks: {likesCounter}</h2>
            <h2>Average Likes: {likesAvg}</h2>
            <h2>Max No. Likes: {maxLikes},{mostLikesPost}</h2>
        </div>

    );
};


















