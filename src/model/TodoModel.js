const mongoose = require('mongoose');

const DatabaseSchema = mongoose.Schema({
    mobile:{type:String,required:true},
    title:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    status:{type:String,required:true, default:"New"},
},{timestamps:true,versionKey:false});

const TodoModel = mongoose.model('Todos',DatabaseSchema);
module.exports = TodoModel