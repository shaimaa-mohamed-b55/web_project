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