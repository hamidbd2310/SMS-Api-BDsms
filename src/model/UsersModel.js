const mongoose = require('mongoose');

const DatabaseSchema = mongoose.Schema({
    mobile:{type:String,required:true,unique:true},
    fullName:{type:String,required:true},
    password:{type:String,required:true},
},{timestamps:true,versionKey:false});

const UsersModel = mongoose.model('Users',DatabaseSchema);
module.exports = UsersModel