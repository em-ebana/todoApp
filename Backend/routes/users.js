const cookieParser = require('cookie-parser');
const cp = require('cookie-parser');
const express = require('express');
const {bodyParser} = require('json-server');
require('dotenv').config();
const userRoute = express.Router();
const jwt = require('jsonwebtoken');

userRoute.use(cp())

module.exports = (params) =>{
   const {userService} = params

   userRoute.get('/', async(req,res)=>{
    const users = await userService.getData();
    res.send(users)
   })

   userRoute.post('/signup', bodyParser, async(req, res)=>{
    let userData = req.body;
    
    const {name, username, email, password } = userData
    
    if(!name && !username && !email && !password){
        res.status(400).send('Enter required fields')
        return;
    }
   
    let userCreated = await userService.createUser(userData, email);
    console.log("usercreated",userCreated)
    if(userCreated === true){
        console.log('Data saved successfully');
     res.sendStatus(200)
    }
    res.send('An error occured')
    return
   })

   userRoute.post('/signin', bodyParser, async(req, res)=>{
    console.log("signin route hit")   

    const signInData = req.body;
    const {email, password} = signInData;

    let userSignIn = await userService.userSignIn(email, password)
   
    if(!userSignIn){
        console.log('Email or password incorrect')
        res.status(400).json({message:'Email or password incorrect'});
        return
    }
    const token = userSignIn.token;
    const refresh = userSignIn.refresh
    const username = userSignIn.username
    console.log(userSignIn)
    res.cookie('jwt', refresh,{httpOnly: true, maxAge: 24*60*60*1000})
    res.status(201).json({token: token, username: username})
   })

   return userRoute;
}