
class ProfileManager{
    constructor(){
        const username = localStorage.getItem("loggedInUser");
        if(!username){
            window.location.href = "login.html";
            return;
        }
        const allUsers = JSON.parse(localStorage.getItem("allUsers"))|| [];
        this.profile = allUsers.find(u=>u.username === username);
        
        if(!this.profile){
            console.error("User not found in allUsers");
            this.profile = {username,followers: [], followings:[]};
        }
    }

    IsFollower(username){
        return this.profile.followers.includes(username);
    }

    IsFollowing(username){
        return this.profile.followings.includes(username);
    }

    addFollowing(username){
        if(!this.IsFollowing(username)){
            this.profile.followings.push(username);
            this.save();
        }
    }

    addFollower(username){
        if(!this.IsFollower(username)){
            this.profile.followers.push(username);
            this.save();
        }
    }
    save(){
        const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
        const index = allUsers.findIndex(u=> u.username === this.profile.username);
        allUsers[index] = this.profile;
        localStorage.setItem("allUsers",JSON.stringify(allUsers));
        
    }

}

const profile = new ProfileManager();
const loggedInUser = localStorage.getItem("loggedInUser");
const AllProfile = JSON.parse(localStorage.getItem("allUsers")) || [];
const viewingProfile = localStorage.getItem("viewingProfile") || loggedInUser;
const userAccount = AllProfile.find(t=>t.username === viewingProfile);


if(!userAccount){
    window.location.href = "login.html";
}


document.querySelector("#profile-username").textContent = userAccount.username
document.querySelector("#profile-bio").textContent = userAccount.bio || "Your bio is empty";

function updateFollowers(){
    document.querySelector("#followers-count").textContent = userAccount.followers.length;
    document.querySelector("#following-count").textContent = userAccount.followings.length;
}

updateFollowers();


function renderPosts(){
    const posts = JSON.parse(localStorage.getItem("MyPosts")) || [];
    const UserPosts = posts.filter(t=>t.username === viewingProfile);
    const profileFeed = document.querySelector("#profile-posts");

    if(UserPosts.length === 0){
        profileFeed.innerHTML = "<p>No Posts yet</p>";
    }
    else{
        profileFeed.innerHTML = UserPosts.map(t=> 
       `     <div class="post-card">
                <p>${t.post}</p>
                <span>${t.createdAt}</span>
            </div>
       `).join("");
    }

}

submitListener.addEventListener("click",function(e){
    e.preventDefault();
    const createdPost = postInput.value.trim();
    if(createdPost === "")return;

    postManager.addPost(loggedInUser,createdPost);
    renderPosts();
    postInput.value = "";
});


const CreatePostSection = document.querySelector("#profile-create-a-post");
if(viewingProfile !== loggedInUser){
    CreatePostSection.style.display = "none";
}




const editBtn = document.querySelector("#edit-btn");
const followBtn = document.querySelector("#follow-btn");
followBtn.addEventListener("click",function(){
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const current = allUsers.find(u=>u.username === loggedInUser);
    const target = allUsers.find(u=>u.username === viewingProfile);

    if(!current || !target) return;

    const isFollowing = current.followings.includes(viewingProfile);

    if(isFollowing){
        current.followings = current.followings.filter(u=>u !== viewingProfile);
        target.followers = target.followers.filter(u=>u !== loggedInUser);
        followBtn.textContent = "Follow";
    }
    else{
        current.followings.push(viewingProfile);
        target.followers.push(loggedInUser);
        followBtn.textContent = "Unfollow";
    }

    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    updateFollowers();

})


if(viewingProfile === loggedInUser){
    editBtn.style.display = "block";
    followBtn.style.display = "none";
}
else{   
    editBtn.style.display = "none";
    followBtn.style.display = "block";
}

editBtn.addEventListener("click",function(){
    const editForm = document.querySelector("#edit-input");
    const bioInput = document.querySelector("#bio-input");
    bioInput.value = userAccount.bio || "";
    editForm.style.display = "block";
    editBtn.style.display = "none";
});


document.querySelector("#save-btn").addEventListener("click",function(){
    const bioInput = document.querySelector("#bio-input");
    userAccount.bio = bioInput.value;
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const index = allUsers.findIndex(u=> u.username === loggedInUser);
    allUsers[index].bio = bioInput.value;
    localStorage.setItem("allUsers",JSON.stringify(allUsers));
    document.querySelector("#profile-bio").textContent = bioInput.value;
    document.querySelector("#edit-form").style.display = "none";
    editBtn.style.display = "block";
});


followBtn.addEventListener("click",function(){
    profile.addFollowing(viewingProfile);

    const target = AllProfile.find(u=>u.username === viewingProfile);
    if(target && !target.followers.includes(loggedInUser)){
        target.followers.push(loggedInUser);
        localStorage.setItem("allUsers", JSON.stringify(AllProfile));
    }
    updateFollowers();
    followBtn.textContent = "Unfollow";
});

const searchInput = document.querySelector("#search-user");
const resultsDiv = document.querySelector("#search-results");

searchInput.addEventListener("input",function(){
    const query = this.value.toLowerCase();
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

    const filtered = allUsers.filter(u=>
        u.username.toLowerCase().includes(query)&&u.username !== loggedInUser
    );
    resultsDiv.innerHTML = filtered.map(u=> 
`        <div class="user-result">
            <span>@${u.username}</span>
            <button onClick= "followUser('${u.username}')">Follow</button>
        </div>`).join("");
})

function followUser(username){
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const current = allUsers.find(u=> u.username === loggedInUser);
    const target = allUsers.find(u=> u.username === username);

    if(!current || !target) return;

    if(!current.followings.includes(username)){
        current.followings.push(username);
        target.followers.push(loggedInUser);
    }

    localStorage.setItem("allUsers",JSON.stringify(allUsers));
    updateFollowers();
}
