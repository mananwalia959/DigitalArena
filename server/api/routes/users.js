const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/signup", (req, res, next) => {

    let errors = {};

    if (typeof req.body.name !== "string") {
      errors.name = "Enter a valid string";
    } else {
      if (!/^[a-zA-Z]{4,20}$/.test(req.body.name)) {
        errors.name = "name must be of length 4-20 and contain alphabets only";
      }
    }
    
    if (typeof req.body.email !== "string") {
      errors.email = "Enter a valid string";
    } else {
      if (
        !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
          req.body.email
        )
      ) {
        errors.email = "email is not valid";
      }
    }
    if (typeof req.body.password !== "string") {
      errors.password = "Enter a valid string";
    } else {
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(req.body.password)) {
        errors.password =
          "password must be of length 6-20 and contain atleast 1 alphabet and 1 number(no special characters allowed)";
      }
    }
    if (typeof req.body.password2 !== "string") {
      errors.password2 = "Enter a valid string";
    } else {
      if (req.body.password2 !== req.body.password) {
        errors.password2 =
          "confirmation password doesn't match";
      }
    }
    
    if (Object.keys(errors).length > 0) {
      return res.status(409).json({
        errors
      })
    } else {
      
    User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        errors.email='e-mail exists already'
        return res.status(409).json({
          errors
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } 
              
              else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name:req.body.name,
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result); 
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          
          }
        });
      }
    });
    }
    

  });


  
router.post("/login", (req, res, next) => {
  User.findOne({email:req.body.email })
    .exec()
    .then(user =>{
      if(!user){
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      else{
        if (user.status !== 'active'){
          return res.status(401).json({
            message: "Auth failed:User is banned"
          });
        }
        else{ 
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(500).json({
              error:err
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                userId: user._id
              },
              process.env.JWT_KEY ,
              {
                  expiresIn: "2 days"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token,
              name:user.name,
              email:user.email
            });
          }
          if(!result){
            return res.status(401).json({
              message: "Auth failed"
            });
          }
        });
      }
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  });


module.exports = router;
