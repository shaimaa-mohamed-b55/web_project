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

const submitListener = document.querySelector("#submit-btn");
submitListener.addEventListener("click",function(e){
    e.preventDefault();
    const firstname = document.querySelector("#first-name").value;
    const lastname =  document.querySelector("#last-name").value;
    const username =  document.querySelector("#user-name").value;
    const email    =  document.querySelector("#email").value;
    const password =  document.querySelector("#pass").value;
    manager.add(firstname,lastname,username,email,password);
    document.querySelector("#personal-info-form").reset();
    window.location.href = "login.html"
});


const clearListener = document.querySelector("#clear-btn");
clearListener.addEventListener("click",function(e){
    document.querySelector("#personal-info-form").reset();
});

