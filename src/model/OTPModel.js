const mongoose = require('mongoose');

const DatabaseSchema = mongoose.Schema({
    mobile:{type:String,required:true,unique:true},
    otp:{type:String,required:true},
    status:{type:String,required:true},
},{timestamps:true,versionKey:false});

const OTPModel = mongoose.model('Otps',DatabaseSchema);
module.exports = OTPModel