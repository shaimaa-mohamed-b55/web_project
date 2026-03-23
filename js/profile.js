const loggedInUser = localStorage.getItem("loggedInUser");
if(!loggedInUser)
    window.location.href = "login.html";



const viewingProfile = localStorage.getItem("viewingProfile");
if(!viewingProfile) window.location.href = "login.html";



const myAccounts = localStorage.getItem("myAccounts");
const account = myAccounts ? JSON.parse(myAccounts) : [];
const userAccount =  accounts.find(t=> t.username === viewingProfile);


const myPosts = localStorage.getItem("MyPosts");
const posts = JSON.parse(myPosts);
const UserPosts = posts.filter(t=> t.username === viewingProfile);


document.querySelector("#profile-username").textContent = userAccount.username
document.querySelector("#profile-bio").textContent = userAccount.bio || "Your bio is empty";
document.querySelector("#followers-count").textContent = followersCount.length;
document.querySelector("#following-count").textContent = followingCount.length;



const profileFeed = document.querySelector("#profile-feed");

if(UserPosts.length === 0){
    profileFeed.innerHTML = "<p>No posts yet</p>";
}
else{
    UserPosts.forEach(t => {
        profileFeed.innerHTML +=`
            <div class="post-card">
                <p>${t.post}</p>
                <span>${t.createdAt}</span>
            </div> 
            `;
    });
}



const editBtn = document.querySelector("edit-btn");
const followBtn = document.querySelector("follow-btn");

if(viewingProfile === loggedInUser){
    editBtn.style.display = "block";
    followBtn.style.display = "none";
}
else{   
    editBtn.style.display = "none";
    followBtn.style.display = "block";
}

editBtn.addEventListener("click",function(){
    const bioInput = document.querySelector("#bio-input");
    bioInput.value = userAccount.bio || "";
    bioInput.style.display = "block";
    document.querySelector("#save-btn").style.display = "block";
    editBtn.style.display = "none";
});




