require('dotenv').config();
const express= require('express');
const app =express();
const morgan = require('morgan');
const bodyParser=require('body-parser');
const mongoose =require('mongoose');
var cors = require('cors');

//importing routes
 const productRoutes = require('./api/routes/products');
 const cartRoutes = require('./api/routes/cart')
// const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');


//Mongoose Database
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        'useCreateIndex': true
    }
)

//Middlewares
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());





//Routes used
app.use('/products',productRoutes);
app.use('/cart',cartRoutes);
// app.use('/orders',orderRoutes);
app.use("/user", userRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status=404;
    next(error);
})

app.use((error,req,res,next) => {
    res.status(error.status|| 500);
    res.json({
        error:{
            message:error.message
        }
    })

})


port = process.env.PORT ?process.env.PORT : 5000;

//  app hosted
app.listen(port, () => {
    console.log("Server running on port",port);
});
