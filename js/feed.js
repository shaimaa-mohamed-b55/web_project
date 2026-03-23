
class PostManager {
    constructor() {
        this.storgekey = "MyPosts";
        const saved = localStorage.getItem(this.storgekey);
        this.posts = saved ? JSON.parse(saved) : [];
    }
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

function DisplayingPosts() {
    const feed = document.querySelector("#profile-feed");
    const loggedInUser = localStorage.getItem("loggedInUser");
    const accounts = JSON.parse(localStorage.getItem("myAccounts")) || [];
    const currentUser = accounts.find(a=>a.username === loggedInUser);
    const following = currentUser ? currentUser.following: [];
    const filteredPosts = postManager.getAll().filter(post => 
        following.includes(post.username) || post.username === loggedInUser);

    if(filteredPosts.length === 0){
        feed.innerHTML = `<p>Follow someone to see their posts</p>`;
        return;
    }
    // if (manager.getAll().length === 0) {
    //     feed.innerHTML = `<p>No posts yet</p>`
    //     return;
    // }
    feed.innerHTML = ""
    filteredPosts.forEach(post => {
        const userLiked = post.likes.includes(loggedInUser);
        const starIcon = userLiked? "media/icons/star.png":"media/icons/no-color-star.png"
        const commentsHTML = post.comments.length === 0 ?
        `<p>No Comments yet</p>` : post.comments.map(c=>`
            <div class="comment-item">
            <strong>@${c.username}</strong>: ${c.text}
            <span class="comment-time">${c.createdAt}</span>
            </div>`).join("");

        feed.innerHTML += `
            <div class="post-card" id="post-${post.id}">
                <div class="post-header">
                    <strong class="post-username">@${post.username}</strong>
                    <span class="post-time">${post.createdAt}</span>
                    ${post.username === loggedInUser? `<button class="delete-btn" onclick="deletePost('${post.id}')"> 
                        <img src="media/icons/delete.png" alt="delete" width="20">
                    </button>`: ""}
            </div>
                <p class="post-content">${post.post}</p>
                <div class="post-actions">
                    <div class="like-container" onclick="toggleLike('${post.id}')">
                      <img src="${starIcon}" alt="like" width="20">  
                      <span>${post.likes.length}</span>
                    </div>
                    <div class="comment-box">
                        <textarea id="comment-input-${post.id}" placeholder="comment here.."></textarea>
                        <button onclick="submitComment('${post.id}')">
                            <img src="media/icons/send.png" alt="send" width="20">
                        </button>
                    </div>
                </div>
            <div class="comments-list"> ${commentsHTML} </div>
            </div>
            `;
    });
}

DisplayingPosts();


function deletePost(postId){
    postManager.deletePost(postId);
    DisplayingPosts();
}

const submitListener = document.querySelector("#submit-btn");
submitListener.addEventListener("click", function (e) {
    e.preventDefault();
    const createdPost = document.querySelector("#post").value;
    const username = localStorage.getItem("loggedInUser");
    if (createdPost === "") return;
    postManager.addPost(username, createdPost);
    DisplayingPosts();
    document.querySelector("#create-post-form").reset();

})
const clearListener = document.querySelector("#clear-btn");
clearListener.addEventListener("click", function (e) {
    document.querySelector("#create-post-form").reset();
})



//--------------------------

// LIKES & COMMENTS 

function toggleLike(postId){
    const loggedInUser = localStorage.getItem("loggedInUser");
    if(!loggedInUser) return;
    postManager.likePost(postId,loggedInUser);
    DisplayingPosts();
}

const accountManager = new AccountManager();
function submitComment(postId){
    const loggedInUser = localStorage.getItem("loggedInUser");
    const textarea = document.getElementById(`comment-input-${postId}`);
    const text = textarea.value.trim();
    if(!text || !loggedInUser) return;
    postManager.addComment(postId,loggedInUser,text);
    DisplayingPosts();
}


// document.addEventListener("DOMContentLoaded", function () {
//     let likeCount = 0;
//     let isLiked = false;
//     let comments = [];
//     const comtArea = document.getElementById("comments-area");


//     const likeContainer = document.getElementById("like-container");
//     const counter = document.getElementById("counter");
//     const starIcon = document.querySelector("#star-icon");
//     const sendContainer = document.getElementById("send-container");
//     const commentArea = document.getElementById("comments-area");
//     const commentTextarea = document.querySelector(".comment textarea");
//     const commentList = document.getElementById("comments-list");
//     const sendIcon = document.getElementById("sendIcon");

//     if (likeContainer) {
//         likeContainer.addEventListener("click", function () {
//             if (!isLiked) {
//                 isLiked = true;
//                 likeCount++;
//                 counter.textContent = likeCount;
//                 starIcon.src = "media/icons/star.png";
//             } else {
//                 isLiked = false;
//                 likeCount--;
//                 counter.textContent = likeCount;
//                 starIcon.src = "media/icons/no-color-star.png";
//             }

//         });
//     }

//     // Send comment functionality

//     function addComment() {
//         const newComment = commentTextarea.value.length > 0;
//         if (newComment) {
//             sendIcon.src = "media/icons/coloured-send.png";
//         } else {
//             sendIcon.src = "media/icons/send.png";
//         }

//     }

//     if (commentTextarea) {
//         commentTextarea.addEventListener("input", addComment);
//     }

//     function displayComments() {
//         if (!commentList) return;
//         if (comments.length === 0) {
//             commentList.innerHTML = "<p>No comments yet</p>";
//         } else {
//             commentList.innerHTML = "";
//             for (let i = 0; i < comments.length; i++) {
//                 const comment = comments[i];
//                 commentList.innerHTML += `
//                     <div class="comment-item">
//                         <h5><strong>${comment.username}</strong> : ${comment.text}</h5>
//                     </div>
//                 `;
//             }
//         }

//     }

//     if (sendContainer) {
//         sendContainer.addEventListener("click", function () {
//             const commentText = commentTextarea.value.trim();
//             if (commentText === "") return;

//             comments.push({
//                 username: comments.length + 1,
//                 text: commentText,
//                 time: time()
//             });
//             commentTextarea.value = "";
//             addComment();

//             displayComments();

//         });

//         function time() {
//             const now = new Date();
//             return now.toLocaleTimeString();
//         }
//     }
// });            
