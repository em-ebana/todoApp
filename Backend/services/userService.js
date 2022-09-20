const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class UserService{

    constructor(datafile){
        this.datafile = datafile;
    }  

      async createUser(obj, email) {
        const data = (await this.getData()) || [];
        if(data.length < 1){
          data.unshift(obj);
          fs.writeFile(this.datafile, JSON.stringify(data), err =>{
            return false;
          });
          return true
        }
        let isuniqueEmail = data.find(d => d.email === email);
        if(isuniqueEmail === undefined){
          data.unshift(obj);
          fs.writeFile(this.datafile, JSON.stringify(data), err =>{
            return false;
          });
          return true;
        }
       return false;
      }

    async userSignIn(email, password) {
        let data = (await this.getData()) || [];
        let userFound = data.find(user => user.email === email)  
        if(!userFound){ return false};  
        if(!userFound.password === password) {return false}  
        
        const accessToken=jwt.sign(
          {"username": userFound.username},
          process.env.ACCESS_TOKEN_SECRET,
          {'expiresIn': 15*60*1000}
        );

        const refreshToken=jwt.sign(
          {"username": userFound.username},
          process.env.REFRESH_TOKEN_SECRET,
          {'expiresIn':'1d'}
        );

        data = data.map(d => {
          if(d.email === email){
            return{...d, refreshToken}
          }
          return d;
        })  
       
        fs.writeFile(this.datafile, JSON.stringify(data), err =>{
          return false;
        });

        return ({token: accessToken, refresh: refreshToken, username: userFound.username});
      }

    async getData() {
        const data = await readFile(this.datafile, 'utf8');
        if (!data) return [];
        return JSON.parse(data);
      }
}
module.exports = UserService;