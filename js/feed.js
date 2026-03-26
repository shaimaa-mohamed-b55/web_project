const loggedInUser = localStorage.getItem("loggedInUser");
if(!loggedInUser) window.location.href = "login.html";


class PostManager {
    constructor() {
        this.storgekey = "MyPosts";
        const saved = localStorage.getItem(this.storgekey);
        this.posts = saved ? JSON.parse(saved) : [];
    }

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


function submitComment(postId){
    const textarea = document.getElementById(`comment-input-${postId}`);
    const text = textarea? textarea.value.trim() : "";
    if(!text || !loggedInUser) return;
    postManager.addComment(postId,loggedInUser,text);
renderFeedPosts();
}





function deletePost(postId){
    postManager.deletePost(postId);
    renderFeedPosts();
}
function toggleLike(postId){
    postManager.likePost(postId,loggedInUser);
    renderFeedPosts();
}



function renderFeedPosts(){
    const feedDiv = document.querySelector("#feed-posts");
    if(!feedDiv) return;

    const allPosts = postManager.getAll();
    if(allPosts.length === 0){
        feedDiv.innerHTML = "<p>No Posts yet</p>";
        return ;
    }
    
    feedDiv.innerHTML = allPosts.map(post =>{
        const liked = post.likes.includes(loggedInUser);
        const isOwnder = post.username === loggedInUser;

        const commentsHTML = post.comments.map(p=>
   `         <div class="comment-item">
                <strong>@${p.username}</strong> : ${p.text}
                <span>${p.createdAt}</span>
            </div>`).join("");

            return `
            <div class="post-card" id="post-${post.id}">
                <div class="post-header">
                    <span>@${post.username}</span>
                    <span>${post.createdAt}</span>
                </div>
                <p>${post.post}</p>
                <div class="post-actions">
                    <button onClick="toggleLike('${post.id}')">
                        ${liked ? `<img src="media/images/star.png" width="20"> `: `<img src="media/images/no-color-star.png" width="20">`}
                    </button>
                </div>
                <textarea id="comment-input-${post.id}" placeholder="write your comment here"></textarea>
                <button onClick="submitComment('${post.id}')">Comment</button>
            </div>`; 
    }).join("");
    
}



const submitListener = document.querySelector("#feed-submit-btn");
if(submitListener){
    submitListener.addEventListener("click", function (e) {
    e.preventDefault();
    const createdPost = document.querySelector("#feed-post-input").value.trim();
    if (createdPost === "") return;
    const username = localStorage.getItem("loggedInUser");
    postManager.addPost(username, createdPost);
    renderFeedPosts();
    document.querySelector("#feed-create-post-form").reset();
})
}
const clearListener = document.querySelector("#clear-btn");
if(clearListener){
    clearListener.addEventListener("click", function (e) {
    const form  = document.querySelector("#create-post-form");
    if(form) form.reset();
})

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

renderFeedPosts();


