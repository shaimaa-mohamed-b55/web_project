// const SignedUpUser = localStorage.getItem("SignedUpUser");
// if(!SignedUpUser)
//     window.location.href = "signup.html";


// const myUsername = localStorage.getItem("myUsername");
// const username = myUsername? JSON.parse(myUsername): [];
// const usernameAccount = username.find(t=> t.username = SignedUpUser);


// const myPass = localStorage.getItem("myPass");
// const Pass = JSON.parse(myPass);
// const UserPass = Pass.find(t=>t.username === SignedUpUser);

// document.querySelector("#username").textContent = usernameAccount.username;
// document.querySelector("#password").textContent = UserPass.pass;
// const profilLoggedIn = document.querySelector("#login-form");

// if(username.length === 0){
//     profilLoggedIn.innerHTML = <p>"you haven't signed up yet"</p>;
// }
// else{
//     username.forEach(t => {
//         profilLoggedIn.innerHTML +=`
//             <div class="login-div">
//                 <p>${t.usernameAccount}</p>
//                 <span>${t.UserPass}</span>
//             </div> 
//             `;
//     });
// }



// const editBtn = document.querySelector("edit-btn");
// const followBtn = document.querySelector("follow-btn");

// if(viewingProfile === loggedInUser){
//     editBtn.style.display = "block";
//     followBtn.style.display = "none";
// }
// else{   
//     editBtn.style.display = "none";
//     followBtn.style.display = "block";
// }

// editBtn.addEventListener("click",function(){
//     const bioInput = document.querySelector("#bio-input");
//     bioInput.value = userAccount.bio || "";
//     bioInput.style.display = "block";
//     document.querySelector("#save-btn").style.display = "block";
//     editBtn.style.display = "none";
// });




