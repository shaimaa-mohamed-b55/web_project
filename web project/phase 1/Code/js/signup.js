// here we have to save data from registeration

// idk from where to start honestly 

// lets start by creating an array to store users data

const accountList = [];

// form submit listner

const form = document.querySelector("#personal-info-form");
form.addEventListener("submit",function(e){
    e.preventDefault();
    const firstname = document.querySelector("#first-name").value;
    const lastname = document.querySelector("#last-name").value;
    const email = document.querySelector("#email").value;
    const pass = document.querySelector("#pass").value;

    accountList.push({
       FName : firstname,
       LName : lastname,
       Email : email,
       Pass : pass
    });

    localStorage.setItem("users",JSON.stringify(accountList));
    form.reset();

    window.location.href = "login_signup.html";
});

document.querySelector("clear-btn").addEventListener("click",function(){
    form.reset();
})



