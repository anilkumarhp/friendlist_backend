const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];


// GET request: Retrieve all users
router.get("/",(req,res)=>{
  
  res.send(users)
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  
  const email = req.params.email;
  user = users.filter(user =>( user.email === email))
  res.send(JSON.stringify({users}, null, 4))
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  
  users.push({
      firstName: req.query.firstName,
      lastName: req.query.lastName,
      email: req.query.email,
      DOB: req.query.DOB,
  })
  res.send("The user " + req.query.firstName + "")
});


// PUT request: Update the details of a user by email ID
  router.put("/:email", (req, res) => {  
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
    if(filtered_users.length > 0){
        let updated_user = {
          firstName: req.query.firstName ? req.query.firstName : filtered_users.fistName,
          lastName: req.query.lastName ? req.query.lastName : filtered_users.lastName,
          email: req.query.email ? req.query.email : filtered_users.email,
          DOB: req.query.DOB ? req.query.DOB : filtered_users.DOB,
        }

      users = users.filter((user) => user.email != email);
      users.push(updated_user);
      res.send("User with email " + email + " updated.")
      } else {
        res.send("Unable to fing user with email id " + email)
      }

});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user) => user.email != email);
  res.send("Deleted user with email id "+ email)
});

module.exports=router;
