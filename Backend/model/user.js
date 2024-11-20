const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
     lastname:{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    password :{
        type:String,
        required:true,
        minlength:8
    }
})
const user= mongoose.model('user',userSchema)
// code of export
module.exports=user;