// PENDING TASKS ARE MARKED WITH A '>>>>>>' SIGN.

require("dotenv").config();
const express = require("express");
const path = require("path");
const body_parser = require("body-parser");
const users = require("./node/users.js");
const fs = require("fs");
const port_number = process.env.PORT || 8080; //PORT SPECIFIED IN THE .env file
const app = express();

//express configuration
app.use(express.static(path.join(__dirname, "/public")));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	//any on load request to be handled here.
});

app.post("/login", (req, res) => {
	//check password.
  try{
  	users.checkForumPassword(req.body.user.username,req.body.user.password,(err,status)=>{
    if(err){
	 		   console.log(err);
     		 return res.status(401).send({message: err});
   	}
	  else if(status == true)
	  {
      	const accessToken = users.generateAccessToken(req.body.user.username,process.env.SECRET_ACCESS_TOKEN);
      	res.send({message:'Login Successful',accessToken: accessToken});
      	console.log('token: '+accessToken);
      	var obj = fs.readFileSync("./validkeys.json");
      	obj = obj.toString();
      	obj = JSON.parse(obj);
      	obj[req.body.user.username] = accessToken;
      	//save the data.
      	fs.writeFileSync("validkeys.json",JSON.stringify(obj));
	  }
	  else
	  {
	  	return res.status(401).send({message: "Invalid Password"}); //password wrong, return UNAUTHORIZED.
	  }
  }).catch((error)=>{console.log(error);res.status(500).send("Internal Server Error");})
  }
  catch(err)
  {
    res.status(400).json({message:'BAD REQUEST'});
  }
});

//LOGOUT
app.post("/logout", (req, res) => {
  
  //if check token, remove the token from validkeys.json and redirect to login page.
  //For logout the request should have both the username and the access token.
  try
    {
      const token = req.body.accessToken; //get the token from the request.
      const username = req.body.user.username; //get the username

      if(!username || !token){
        return res.status(400).json({message: 'username or token unspecified!'});
      }
      var obj = fs.readFileSync("validkeys.json");
      obj = JSON.parse(obj.toString());
    	if (obj.hasOwnProperty(username) && obj[username] == token) { //if the username has an entry in the validkeys.json and the token is also a match then allow logout.
          delete obj[req.body.user.username];
        }
      else 
        return res.status(401).send({message: "CANNOT LOGOUT WITHOUT LOGIN!"}); //UNAUTHORIZED. Can't logout without login.
      res.send({message: "LOGOUT SUCCESSFUL!"})
      //save the file.
      fs.writeFileSync("validkeys.json", JSON.stringify(obj));
    }
    catch(err){res.status(400).json({message:'BAD REQUEST'})};
});

//DASHBOARD

app.post("/dashboard",(req, res) => {
  try
  {
      if(!req.body.accessToken) throw "no access token!";
      else
      users.authenticateToken(req.body.accessToken,process.env.SECRET_ACCESS_TOKEN,(err,username)=>{
        console.log(username);
          if(err) return res.status(400).json(err);
          else
          {
            
            return res.json({ message: "GOOD REQUEST,REDIRECTING TO DASHBOARD" });
          }
      });
  }
  catch(err){res.status(400).json({message:err});console.log(err);}
});

//REGISTRATION STATUS CHECK

app.post("/checkRegistrationStatus", (req, res) => {
  //check user registered or not. >>>>>>>

  console.log(req.body);
  res.send({ message: "REGISTRATION STATUS IS" }); //TEST MESSAGE.
});

//REGISTER FORUM

app.post("/registerForum", (req, res) => {
  // register a forum. >>>>>>>

  console.log(req.body);
  res.send({ message: "USER REGISTERED" }); // TEST MESSAGE
});

//start the server.
app.listen(port_number, () => {
  console.log("server up and running on port:" + String(port_number));
});
