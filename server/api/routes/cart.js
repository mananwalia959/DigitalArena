const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const userauth =require('../auth-middlewares/userauth');
const Product = require('../models/products')


const verifyproduct=(req,res,next)=>{
    Product.findOne({_id:req.params.productId})
    .exec()
    .then(product=>{
        if(product){
            next();
        }else{
            res.status(404).json({
               message:"Product is invalid"
              })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    

}

router.get("/", userauth,(req, res, next) => {
    User.findOne({_id:req.userData.userId })
      .exec()
      .then(user =>{
        res.status(200).json({
          name:user.name,
          email:user.email,
          cart:user.cart
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    });
router.post("/:productId",userauth,verifyproduct,(req,res,next)=>{

    User.findOne({_id:req.userData.userId })
      .exec()
      .then(user =>{
          
          if(user.cart.map(item=>item.toString()).includes((req.params.productId).toString())){
            res.status(200).json({

                name:user.name,
                email:user.email,
                cart:user.cart,  
               })
              
          }
          else{
            if(user.cart.length<20){
                user.cart.push(req.params.productId)
                user.save().then((result)=>{
                    res.status(200).json({
                        name:result.name,
                        email:result.email,
                        cart:result.cart,
                       })
                })
              }
              else{
                res.status(400).json({
                    message:"Cart is Full"
                   })

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

router.delete("/:productId",userauth,(req,res,next)=>{

    User.findOne({_id:req.userData.userId })
    .exec()
    .then(user =>{
        temp = user.cart.filter(element => {
           return element.toString()!==(req.params.productId).toString()   
        });
        user.cart=temp
        user.save().then((result=>{
            res.status(200).json({
                name:result.name,
                email:result.email,
                cart:result.cart,
               })
        }))
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


module.exports = router;



