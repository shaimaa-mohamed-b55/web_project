const CreatedPostsList = [];


// function to display all posts have been created by our user
function DisplayingPosts(){
    const feed = document.querySelector("#feed");

    if(CreatedPostsList.length===0){
        feed.innerHTML=`<p>No posts yet</p>`
        return;
    }
    feed.innerHTML = "";
    CreatedPostsList.forEach(function(item){
        feed.innerHTML += `<p>${item.post}</p>`;
    });
}



// for the submit listerner , for data to be pushed in the feed

const form = document.querySelector("#creat-post-form");
form.addEventListener("submit",function(e){
    e.preventDefault();
    const createdPost = document.querySelector("#post-text").value;

    CreatedPostsList.push({
        post: createdPost
    });

    DisplayingPosts();
    form.reset();

});

const clear = document.querySelector("#clear-btn");
clear.addEventListener("click",function(){
    CreatedPostsList.length = 0;
    DisplayingPosts();
})



let counter = 0;
const likeBtn = document.getElementById("like-btn");
const likeCount = document.getElementById("like-count");

likeBtn.addEventListener("click", function() {
    counter++;
    likeCount.textContent = counter;
    // console.log(`Like count: ${counter}`); 
    const starIcon = document.querySelector("#star-icon");
    if (starIcon.src.includes("no-color-star.png")) {
        starIcon.src = "../../media/icons/star.png";
    } else {
        starIcon.src = "../../media/icons/no-color-star.png";
    }        
    });

