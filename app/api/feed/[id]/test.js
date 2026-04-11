let person = {
    name : "Ali",
    age : 25, 
    gender : "male"
}

// this is the object that we are reciving from the user 
const updates = {
    name : "Ali",
    age : 80, 
    gender : "male"
}

person = {...person, ...updates }
console.log(person);

