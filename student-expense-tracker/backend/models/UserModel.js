const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: 
    {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    email:
     {
        type: String,
        required: true,
        maxLength: 100,
        trim: true
     },
     name1:
     {
        type:String
     },
     url:
     {
        type:String
     }
    
   
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)