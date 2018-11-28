const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const admin = require("../models/admins")
// const User = require("../models/user");
// const Orders=require('../models/orders')

router.post("/login", (req, res, next) => {
    admin.findOne({email:req.body.email })
      .exec()
      .then(admin =>{
        if(!admin){
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        else{
          if (admin.status !== 'active'){
            return res.status(401).json({
              message: "Auth failed:admin is banned"
            });
          }
          else{ 
          bcrypt.compare(req.body.password, admin.password, (err, result) => {
            if (err) {
              return res.status(500).json({
                error:err
              });
            }
            if (result) {
              const token = jwt.sign(
                {
                  adminId: admin._id,
                  issuedat:Date.now()
                },
                process.env.JWT_KEY ,
                {
                    expiresIn: "2 days"
                }
              );
              return res.status(200).json({
                message: "Auth successful",
                token: token,
                name:admin.name,
                email:admin.email,
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
  