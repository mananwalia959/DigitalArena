const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const moment = require('moment')
const temporder=require('../models/temporder')
const pincodes = require('../models/pincodes')
const userauth=require('../auth-middlewares/userauth')
const Insta = require('instamojo-nodejs');
const Product=require('../models/products')
const Orders=require('../models/orders')


Insta.setKeys(process.env.PAYMENT_API_KEY, process.env.PAYMENT_PRIVATE_AUTH_TOKEN);
Insta.isSandboxMode(true);


const checkaddress =(req,res,next)=>{
  if(req.body.address){
    pincodes.find({pincode:req.body.pincode})
    .then(result => {
    if(result.length>0){
      next()
    }
    else{
      res.status(400).json({
        message: "We do not ship to that pincode"
      });

    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });   
    
  }
  else{
    res.status(400).json({
      message:"Address is Required"
    })
  }
}


const checkamount =(req,res,next)=>{
  console.log('yuuuuuuuuuup')
  console.log(req.body.products)
  let arr = req.body.products.map(ele =>  mongoose.Types.ObjectId(ele.productid));


  const getcount = (id)=>{
    counted=0

    chosenproduct = req.body.products.forEach((product)=>{
      if(product.productid===id){
        counted=product.count
      }
    })
    return counted
  }

  Product.find({
    '_id': { $in: arr}
  })
  .exec()
  .then(products => {
    amount=0;
    products.forEach((product)=>{

      if(product.status==='Available'){
        amount=amount+(product.price*getcount((product._id).toString())) 
      }

    })
    if (req.body.amount===amount && amount!=0){
      next();
    }
    else{
      res.status(400).json({
        message:"amount is wrong"
      });
    
    }
  
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
  });
  });
}

   


router.post('/create',userauth,checkaddress,checkamount,(req,res,next)=>{
  console.log(req.body.products)
  const order = new temporder({
    _id: new mongoose.Types.ObjectId(),
    user:req.userData.userId,
    address:req.body.address,
    pincode:req.body.pincode,
    amount:req.body.amount,
    productlist:req.body.products
  });
  order.save()
  .then((order)=>{
    console.log(order)
    Insta.createPayment({amount:req.body.amount,
        purpose:'sale',
      buyer_name:order._id.toString(),
        email:'digitalarena@da.com',
        phone:'9999999999',
        redirect_url:process.env.SELF_URL+'/orders/handlepayment',
        expires_at: moment().add(300, 'seconds')                          
         },function(error, response) {
            if (error) {
              console.log(error)
            res.status(400).json({err:error})
            } else {
              // Payment redirection link at response.payment_request.longurl

              const link = (JSON.parse(response)).payment_request.longurl
            console.log(link)
            res.status(200).json({payment_link:link})
            } 
          })
  })
  .catch((err)=>{
    console.log(err)
    return res.status(400).json({
      err:err
    })  
 })
 })

 router.get('/handlepayment',(req,res,next)=>{
   const payment_id = req.query.payment_id //
   const payment_request_id =req.query.payment_request_id
   console.log(payment_id,payment_request_id);
   Insta.getPaymentDetails(payment_request_id, payment_id, function(error, response) {
    if (error) {
      console.log('doody')
      res.redirect(process.env.CLIENT_URL+'/order/failure')

    } else {
      if (response.payment_request.status==='Completed'){
        console.log(response)
        // res.redirect(process.env.CLIENT_URL+'/order/success')
       
        temporder.findOne({_id:response.payment_request.buyer_name})
        .then(result => {
          console.log(result); 
            const order = new Orders({ 
              _id: new mongoose.Types.ObjectId(),
              user:result.user,
              address:result.address,
              pincode:result.pincode,
              amount:result.amount,
              productlist:result.productlist,

            })

            order.save()
            .then((response)=>{
              res.redirect(process.env.CLIENT_URL+'/order/success')
            })
            .catch((failed)=>{
              console.log("howdy");
              res.redirect(process.env.CLIENT_URL+'/order/failure')

            })

          
        })
        .catch(err => {
          console.log(err);
          res.redirect(process.env.CLIENT_URL+'/order/failure')
        });   
        
      }
      else{
        console.log(response)
        res.redirect(process.env.CLIENT_URL+'/order/failure')
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