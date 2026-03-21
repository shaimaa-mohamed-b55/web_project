// const CreatedPostsList = [];


// // function to display all posts have been created by our user
// function DisplayingPosts(){
//     const feed = document.querySelector("#feed");

//     if(CreatedPostsList.length===0){
//         feed.innerHTML=`<p>No posts yet</p>`
//         return;
//     }
//     feed.innerHTML = "";
//     CreatedPostsList.forEach(function(item){
//         feed.innerHTML += `<p>${item.post}</p>`;
//     });
// }



// // for the submit listerner , for data to be pushed in the feed

// const form = document.querySelector("#creat-post-form");
// form.addEventListener("submit",function(e){
//     e.preventDefault();
//     const createdPost = document.querySelector("#post-text").value;

//     CreatedPostsList.push({
//         post: createdPost
//     });

//     DisplayingPosts();
//     form.reset();

// });

// const clear = document.querySelector("#clear-btn");
// clear.addEventListener("click",function(){
//     CreatedPostsList.length = 0;
//     DisplayingPosts();
// })



// form submit listner

// const form = document.querySelector("#personal-info-form");
// form.addEventListener("submit",function(e){
//     e.preventDefault();
//     const firstname = document.querySelector("#first-name").value;
//     const lastname = document.querySelector("#last-name").value;
//     const email = document.querySelector("#email").value;
//     const pass = document.querySelector("#pass").value;

//     accountList.push({
//        FName : firstname,
//        LName : lastname,
//        Email : email,
//        Pass : pass
//     });

//     localStorage.setItem("users",JSON.stringify(accountList));
//     form.reset();

//     window.location.href = "login_signup.html";
// });

// document.querySelector("clear-btn").addEventListener("click",function(){
//     form.reset();
// })


// here , we will check if the user already have an account, 
// otherwise , we will add this new user to localStorage

class PostManager{
    constructor(){
        this.storgekey = "MyPosts";
        const saved  = localStorage.getItem(this.storgekey);
        this.posts = saved? JSON.parse(saved):[];
    }
    addPost(username,post){
        const postContent = this.post;
        const connect = this.posts.find(t=>t.username === this.username)
                                    .add(t=>t.post +=this.post);
        this.posts.push(connect);
        this.save();
    }
    getAll(){
        return this.posts;
    }

    save(){
        localStorage.setItem(this.storgekey,JSON.stringify(this.posts));
    }
    
    login(username,password){
        const found = this.accounts.find(t=>t.username === username && t.password === password);
        if(!found){
            console.error("Invalid username or password");
            return;
        }
        return found;
    }
}


// -------------------------

const manager  = new AccountManager();

const submitListener = document.querySelector("#submit-btn");
submitListener.addEventListener("click",function(e){
    e.preventDefault();
    const firstname = document.querySelector("#first-name").value;
    const lastname = document.querySelector("#last-name").value;
    const username = document.querySelector("#user-name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#pass").value;
    manager.add(firstname,lastname,username,email,password);
    document.querySelector("#personal-info-form").reset();
    window.location.href = "login.html"
});


const clearListener = document.querySelector("#clear-btn");
clearListener.addEventListener("click",function(e){
    document.querySelector("#personal-info-form").reset();
});

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



