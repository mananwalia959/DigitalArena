const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const moment = require('moment')
const temporder=require('../models/temporder')
const pincodes = require('../models/pincodes')




const Insta = require('instamojo-nodejs');
Insta.setKeys(process.env.PAYMENT_API_KEY, process.env.PAYMENT_PRIVATE_AUTH_TOKEN);
Insta.isSandboxMode(true);



router.post('/create',(req,res,next)=>{
  const order = new temporder({
    _id: new mongoose.Types.ObjectId(),
    user:req.userData.userId,
    
  
  });

   
    Insta.createPayment({amount:5000,
        purpose:'sale',
        buyer_name:"digitalarena",
        email:'digitalarena@da.com',
        phone:'9999999999',
        redirect_url:process.env.SELF_URL+'/orders/handlepayment',
        expires_at: moment().add(300, 'seconds')                          
         },function(error, response) {
            if (error) {
              console.log(error)
              res.status(400).send("yup")
            } else {
              // Payment redirection link at response.payment_request.longurl

              const link = (JSON.parse(response)).payment_request.longurl

              return res.status(200).json({payment_link:link})
            }
            
          })

    
 })

 router.get('/handlepayment',(req,res,next)=>{
   const payment_id = req.query.payment_id; //
   const payment_request_id =req.query.payment_request_id
   Insta.getPaymentDetails(payment_request_id, payment_id, function(error, response) {
    if (error) {
      console.log(error)
      res.redirect('http://www.youtube.com')
    } else {
      if (response.success===true){
        res.redirect('http://www.google.com')
      }
      else{
        res.redirect('http://www.youtube.com')
      }
  
    }
  });

   
 })



 router.post('/checkpincode',(req,res,next)=>{
     pincodes.find({pincode:req.body.pincode})
  .then(result => {
    if(result.length>0){
      console.log('yay')
      res.status(201).json({
        message: "Address correct"
      });
    }
    else{
      console.log('nay')
      res.status(400).json({
       
        message: "Address incorrect"
      });

    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });   

  
})


// router.get('/testschema2',(req,res,next)=>{
//   temporder.find()
//   .then(result => {
//     console.log(result); 
//     res.status(201).json({
//       message: result.length
//     });
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({
//       error: err
//     });
//   });   

// })



module.exports = router;