
class PostManager{
    constructor(){
        this.storgekey = "MyPosts";
        const saved  = localStorage.getItem(this.storgekey);
        this.posts = saved? JSON.parse(saved):[];
    }
    addPost(username,post){
        const postContent = {
            username: username,
            post: post,
            createdAt: new Date().toLocaleString()
        }
        this.posts.unshift(postContent);
        this.save();
    }
    getAll(){
        return this.posts;
    }

    save(){
        localStorage.setItem(this.storgekey,JSON.stringify(this.posts));
    }
    
    }
    



const manager  = new PostManager();

function DisplayingPosts(){
    const feed  = document.querySelector("#feed");
    if(manager.getAll().length === 0){
        feed.innerHTML = `<p>No posts yet</p>`
        return;
    }
    else{
        feed.innerHTML = ""
        manager.getAll().forEach(t => {
            feed.innerHTML+=`${t.post}`; 
        });
    }
}
DisplayingPosts();


const submitListener = document.querySelector("#submit-btn");
submitListener.addEventListener("click",function(e){
    e.preventDefault();
    const createdPost = document.querySelector("#post").value;
    const username = localStorage.getItem("loggedInUser");
    if(createdPost === "")return;
    manager.addPost(username,createdPost);
    DisplayingPosts();
    document.querySelector("#create-post-form").reset();
    
})
const clearListener = document.querySelector("#clear-btn");
clearListener.addEventListener("click",function(e){
    document.querySelector("#create-post-form").reset();
})





//--------------------------

// counter for like button

document.addEventListener("DOMContentLoaded", function() {
    let count = 0;
    const likeBtn = document.getElementById("like-btn");
    const likeCount = document.getElementById("like-count");
    const starIcon = document.querySelector("#star-icon");
    if (likebtn){
        likeBtn.onclick = function() {
             count++;
             counter.innerHTML=count;
            if (starIcon && starIcon.src.includes("no-color-star.png")) {
                starIcon.src = "media/icons/star.png";
            } else if (starIcon) {
                starIcon.src = "media/icons/no-color-star.png";
            }
        };
    } else {
        console.log("Button not found!");
    }
});
    // // document.getElementById("like-btn").onclick = function() {
    //     count++;
    //     document.getElementById("counter").innerHTML = count;
    //     const starIcon = document.querySelector("#star-icon");
    //     if (starIcon.src.includes("no-color-star.png")) {
    //         starIcon.src = "media/icons/star.png";
    //     } else {
    //         starIcon.src = "media/icons/no-color-star.png";
    //     }
    // });
    // const likeBtn = document.getElementById("like-btn");
    // const likeCount = document.getElementById("like-count");

    // likeBtn.addEventListener("click", function() {
    //     counter++;
    //     likeCount.textContent = counter;
    //     // console.log(`Like count: ${counter}`); 
    //     const starIcon = document.querySelector("#star-icon");
    //     if (starIcon.src.includes("no-color-star.png")) {
    //         starIcon.src = "media/icons/star.png";
    //     } else {
    //         starIcon.src = "media/icons/no-color-star.png";
    //     }        
    //     });



