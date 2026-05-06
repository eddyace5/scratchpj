const mongoose= require('mongoose');

const productSchema= new mongoose.Schema({
    rating_id:String,
    product_img: String,
    product_img_id:Number,
    product_name:String,
    description:String,
    price:Number,
    details:String
}, {collection: 'products'}) 


const model=mongoose.model('Product, productSchema');
module.exports= model;