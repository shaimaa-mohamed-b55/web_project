// Account manager class
class AccountManager{
    constructor(){
        this.storgekey = "myAccounts";
        const saved = localStorage.getItem(this.storgekey);
        this.accounts = saved? JSON.parse(saved):[];
    }

    add(firstname,lastname,username,email,password){
        const t = new SignUp(firstname,lastname,username,email,password);
        const exist  = this.accounts.find(a=>a.username === username);
        if(exist){
            console.error("Usernaem Already Exist");
            return;
        }
        this.accounts.push(t);
        this.save();
        }
   
    
    getAll(){
        return this.accounts;
    }
    save(){
        localStorage.setItem(this.storgekey,JSON.stringify(this.accounts));
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

// signUp class
class SignUp{
        constructor(firstname,lastname,username,email,password){
            this.firstname = firstname;
            this.lastname = lastname;
            this.username = username;
            this.email = email;
            this.password = password;
            this.following = [];
            this.followers = [];
            this.createdAt = new Date().toLocaleString();
        }
    }

const manager  = new AccountManager();
const signupBtn = document.querySelector("#submit-btn");
const signupForm = document.querySelector("#signup-form");
const submitListener = document.querySelector("#submit-btn");

// to start working when its on signup page 
if (signupBtn && signupForm) {
    submitListener.addEventListener("click", function (e) {
        e.preventDefault();
        const firstname = document.querySelector("#first-name").value;
        const lastname = document.querySelector("#last-name").value;
        const username = document.querySelector("#user-name").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#pass").value;
        manager.add(firstname, lastname, username, email, password);
        document.querySelector("#signup-form").reset();
        window.location.href = "login.html"
    });
}
const clearListener = document.querySelector("#clear-btn");
if (clearListener && signupForm) {
    clearListener.addEventListener("click", function (e) {
        document.querySelector("#signup-form").reset();
    });
}

// login
const loginForm = document.querySelector("#login-form");
if (loginForm) {
    const loginBtn = document.querySelector("#login-btn");
    const usernameInp = document.querySelector("#username");
    const passwordInp = document.querySelector("#password");
    const errorMsg = document.createElement("p");

    errorMsg.style.color = "red";
    errorMsg.style.fontSize = "1rem";
    errorMsg.style.textAlign = "center";
    errorMsg.style.display = "none";
    loginForm.insertBefore(errorMsg, loginBtn);

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = usernameInp.value;
        const password = passwordInp.value;
        const userAccount = manager.login(username, password);
        if (userAccount) {
            localStorage.setItem("currentUser", JSON.stringify(userAccount));
            window.location.href = "feed.html";
        } else {
            errorMsg.textContent = "Username or password incorrect!";
            errorMsg.style.display = "block";
            usernameInp.style.border = "1px solid red";
            passwordInp.style.border = "1px solid red";

        }
    });
}
