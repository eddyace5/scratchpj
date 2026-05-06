const mongoose= require ("mongoose");

const staffSchema= new mongooseSchema ({
    full_name: String,
    email_address:String,
    role: {
        type: String,
        enum: ["staff", "admin", "manager"]
    },
    department: String
    

})

const model= mongoose.model('staff', staffSchema);
module.exports=model;