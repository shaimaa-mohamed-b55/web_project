const loggedInUser = localStorage.getItem("loggedInUser");
if(!loggedInUser) window.location.href = "login.html";


class PostManager {
    constructor() {
        this.storgekey = "MyPosts";
        const saved = localStorage.getItem(this.storgekey);
        this.posts = saved ? JSON.parse(saved) : [];
    }

    // we have to connect the user's name , with his followers;
        // <input type="button" id="follower-btn" class="Followers">
        // <input type="button" id="following-btn" class="Followings">
        // <!-- now , we have to take an action over these buttons  --></input>


    // here to add a post, he have to be in his own feed page , not any feed
    addPost(username, post) {
        const postContent = {
            id: `${username}-${Date.now()}`,
            username: username,
            post: post,
            createdAt: new Date().toLocaleString(),
            likes: [],
            comments: []
        }
        this.posts.unshift(postContent);
        this.save();
    }
    getAll() {
        return this.posts;
    }

    save() {
        localStorage.setItem(this.storgekey, JSON.stringify(this.posts));
    }

    deletePost(postId){
        this.posts = this.posts.filter(p=> p.id !== postId)
        this.save();
    }

    // like and comment
    likePost(postId,username){
        const post = this.posts.find(p=> p.id === postId);
        if(!post) return;
        if(post.likes.includes(username)){
            post.likes = post.likes.filter(t=> t!== username);
        }
        else{
            post.likes.push(username);
        }
        this.save();
    }
    addComment(postId,username,text){
        const post = this.posts.find(p=>p.id === postId);
        if(!post) return;
        post.comments.push({
            username: username,
            text: text,
            createdAt: new Date().toLocaleTimeString()
        });
        this.save();
    }


}


const postManager = new PostManager();


function deletePost(postId){
    postManager.deletePost(postId);
    renderPosts();
}

const submitListener = document.querySelector("#submit-btn");
if(submitListener){
    submitListener.addEventListener("click", function (e) {
    e.preventDefault();
    const createdPost = document.querySelector("#post").value.trim();
    if (createdPost === "") return;
    const username = localStorage.getItem("loggedInUser");
    postManager.addPost(username, createdPost);
    renderPosts();
    document.querySelector("#create-post-form").reset();
})
}
const clearListener = document.querySelector("#clear-btn");
if(clearListener){
    clearListener.addEventListener("click", function (e) {
    const form  = document.querySelector("#create-post-form");
    if(form) form.reset();
})

}



//--------------------------

// LIKES & COMMENTS 

function toggleLike(postId){
    if(!loggedInUser) return;
    postManager.likePost(postId,loggedInUser);
    renderPosts();
}

function submitComment(postId){
    const loggedInUser = localStorage.getItem("loggedInUser");
    const textarea = document.getElementById(`comment-input-${postId}`);
    const text = textarea.value.trim();
    if(!text || !loggedInUser) return;
    postManager.addComment(postId,loggedInUser,text);
    renderPosts();
}

// wait, before that , the feed should be connected to login form , 
// so we are not displaying everyone's account , but only our user's followers



const profileBtn = document.querySelector("#profile-btn");
profileBtn.addEventListener("click",function(){

    const loggedInUser = localStorage.getItem("loggedInUser");
    if(!loggedInUser) return;

    localStorage.setItem("viewingProfile",loggedInUser);
    window.location.href = "profile.html"
})


