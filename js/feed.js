
class PostManager {
    constructor() {
        this.storgekey = "MyPosts";
        const saved = localStorage.getItem(this.storgekey);
        this.posts = saved ? JSON.parse(saved) : [];
    }
    addPost(username, post) {
        const postContent = {
            username: username,
            post: post,
            createdAt: new Date().toLocaleString()
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

}




const manager = new PostManager();

function DisplayingPosts() {
    const feed = document.querySelector("#feed");
    if (manager.getAll().length === 0) {
        feed.innerHTML = `<p>No posts yet</p>`
        return;
    }
    else {
        feed.innerHTML = ""
        manager.getAll().forEach(t => {
            feed.innerHTML += `${t.post}`;
        });
    }
}
DisplayingPosts();


const submitListener = document.querySelector("#submit-btn");
submitListener.addEventListener("click", function (e) {
    e.preventDefault();
    const createdPost = document.querySelector("#post").value;
    const username = localStorage.getItem("loggedInUser");
    if (createdPost === "") return;
    manager.addPost(username, createdPost);
    DisplayingPosts();
    document.querySelector("#create-post-form").reset();

})
const clearListener = document.querySelector("#clear-btn");
clearListener.addEventListener("click", function (e) {
    document.querySelector("#create-post-form").reset();
})



//--------------------------

// LIKES & COMMENTS 

document.addEventListener("DOMContentLoaded", function () {
    let likeCount = 0;
    let isLiked = false;
    let comments = [];
    const comtArea = document.getElementById("comments-area");


    const likeContainer = document.getElementById("like-container");
    const counter = document.getElementById("counter");
    const starIcon = document.querySelector("#star-icon");
    const sendContainer = document.getElementById("send-container");
    const commentArea = document.getElementById("comments-area");
    const commentTextarea = document.querySelector(".comment textarea");
    const commentList = document.getElementById("comments-list");
    const sendIcon = document.getElementById("sendIcon");

    if (likeContainer) {
        likeContainer.addEventListener("click", function () {
            if (!isLiked) {
                isLiked = true;
                likeCount++;
                counter.textContent = likeCount;
                starIcon.src = "media/icons/star.png";
            } else {
                isLiked = false;
                likeCount--;
                counter.textContent = likeCount;
                starIcon.src = "media/icons/no-color-star.png";
            }

        });
    }

    // Send comment functionality

    function addComment() {
        const newComment = commentTextarea.value.length > 0;
        if (newComment) {
            sendIcon.src = "media/icons/coloured-send.png";
        } else {
            sendIcon.src = "media/icons/send.png";
        }

    }

    if (commentTextarea) {
        commentTextarea.addEventListener("input", addComment);
    }

    function displayComments() {
        if (!commentList) return;
        if (comments.length === 0) {
            commentList.innerHTML = "<p>No comments yet</p>";
        } else {
            commentList.innerHTML = "";
            for (let i = 0; i < comments.length; i++) {
                const comment = comments[i];
                commentList.innerHTML += `
                    <div class="comment-item">
                        <h5><strong>${comment.username}</strong> : ${comment.text}</h5>
                    </div>
                `;
            }
        }

    }

    if (sendContainer) {
        sendContainer.addEventListener("click", function () {
            const commentText = commentTextarea.value.trim();
            if (commentText === "") return;

            comments.push({
                username: comments.length + 1,
                text: commentText,
                time: time()
            });
            commentTextarea.value = "";
            addComment();

            displayComments();

        });

        function time() {
            const now = new Date();
            return now.toLocaleTimeString();
        }
    }
});            
