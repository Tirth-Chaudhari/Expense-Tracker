const mongoose = require('mongoose');


const GroupSchema = new mongoose.Schema({
    user_id:
    {
        type:String,
        required:true,
    },
    x_id:
    {
        type:String,
        required:true,
    },
    name: 
    {
        type: String,
        required: true,
        
    },
    email:
    {
        type:String,
        required:true,

    },
    CommonGroup:
    [
        {
            GroupId:
            {
            type:String,
            }
        }
    ]
    
}, {timestamps: true})

module.exports = mongoose.model('Group', GroupSchema)