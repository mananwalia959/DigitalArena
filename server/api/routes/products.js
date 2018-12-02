const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require('../models/products')
// const multer = require('multer')
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//     cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//     cb(null,new Date().toISOString().replace(/:/g, '-') + file.originalname);
//     }
//     });

//     const fileFilter = (req, file, cb) => {
//         // reject a file
//         if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//           cb(null, true);
//         } else {
//           cb(null, false);
//         }
//       };

// var upload=multer({storage: storage,limits:{
//     fileSize:1024*1024*5
//     },
//     fileFilter: fileFilter
// })


// router.post('/',upload.single('productImage'), (req, res, next) => {
//     const product= new Product({
//         _id:new mongoose.Types.ObjectId(),
//         title:req.body.title,
//         price:req.body.price,
//         description:req.body.description,
//         imagePath: '/uploads/'+req.file.filename
//     });
//     products
//     .save()
//     .then(result => {
//       console.log(result);
//       res.status(201).json({
//         message: "Created product successfully",
//         createdProduct: {
//             title: result.name,
//             price: result.price,
//             _id: result._id,
//             imagePath:result.imagePath,
//             request: {
//                 type: 'GET',
//                 url: "/products/" + result._id
//             }
//         }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
    
// });

router.get('/',(req,res,next)=>{
  Product.find()
  .select("title price _id imagePath status")
  .exec()
  .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            title: doc.title,
            price: doc.price,
            imagePath: doc.imagePath,
            status:doc.status,
            _id: doc._id,
            request: {
              type: "GET",
              url: "products/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
  .select('title price _id imagePath description status')
  .exec()
  .then(doc => {
    console.log("From database", doc);
    if (doc) {
      res.status(200).json({
          product: doc,
          request: {
              type: 'GET',
              url:'/products'
          }
      });
    } else {
      res
        .status(404)
        .json({ message: "No valid entry found for provided ID" });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
});

router.post('/getproductsbyid',(req,res,next)=>{
  console.log(req.body)
  let arr = req.body.productList.map(ele =>  mongoose.Types.ObjectId(ele));
  Product.find({
    '_id': { $in: arr}
  })
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      products: docs.map(doc => {
        return {
          title: doc.title,
          price: doc.price,
          imagePath: doc.imagePath,
          status:doc.status,
          _id: doc._id,
        };
      })
    };
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
})


// router.get("/test4",(req,res,next)=>{
//   const product= new Product({
//     _id: new mongoose.Types.ObjectId(),
//             imagePath:"https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/Item/36195/DIG002888_3._SX360_QL80_TTD_.jpg",
//             title:"Devil May Cry",
//             description:"Dante is the legendary son of sparda",
//             price:800,
//         });
//       product.save();

// })

// router.get("/test7",(req,res,next)=>{
//   const product= new Product({
//     _id: new mongoose.Types.ObjectId(),
//             imagePath:"https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/Item/36195/DIG002888_3._SX360_QL80_TTD_.jpg",
//             title:"Devil May Cry",
//             description:"Dante is the legendary son of sparda",
//             price:800,
//         });
//       product.save();

// })

module.exports = router;