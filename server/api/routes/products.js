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
  .select("title price _id imagePath")
  .exec()
  .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            title: doc.title,
            price: doc.price,
            imagePath: doc.imagePath,
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



module.exports = router;