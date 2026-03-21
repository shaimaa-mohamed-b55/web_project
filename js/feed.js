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





