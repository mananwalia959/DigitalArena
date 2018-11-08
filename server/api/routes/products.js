const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const products = require('../models/products')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './uploads');
    },
    filename: function (req, file, cb) {
    cb(null,new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
    });

    const fileFilter = (req, file, cb) => {
        // reject a file
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          cb(null, true);
        } else {
          cb(null, false);
        }
      };

var upload=multer({storage: storage,limits:{
    fileSize:1024*1024*5
    },
    fileFilter: fileFilter
})


router.post('/',checkauth,upload.single('productImage'), (req, res, next) => {
    const product= new Product({
        _id:new mongoose.Types.ObjectId(),
        title:req.body.title,
        price:req.body.price,
        description:req.body.description,
        imagePath: '/uploads/'+req.file.filename
    });
    products
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
            title: result.name,
            price: result.price,
            _id: result._id,
            imagePath:result.imagePath,
            request: {
                type: 'GET',
                url: "/products/" + result._id
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
    
});
