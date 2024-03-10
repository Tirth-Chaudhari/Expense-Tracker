const mongoose = require('mongoose');


const TripSchema = new mongoose.Schema({
    TripName:
    {       
        type:String,
    },
    CreateBy:
    {
        user_id:
        {
            type:String,
        },
        name:
        {
            type:String,
        },
        email:{
            type:String,
        }
    },
    TripMember:
    [{
        user_id:
        {
            type:String,
        },
        name:
        {
            type:String,
        },
        email:{
            type:String,
        }

    }],
    TripData: 
    [
        {
            title:
            {
                type:String,

            },
            createdAt: { type: Date, default: Date.now } ,
            paidBy:
            {
                user_id:
                {
                   type:String,
                },
                name:
                {
                    type:String,
                },
                email:{
                    type:String,
                },
                total:
                {
                    type:Number,
                }
            },
            Amount:[
                {
                    _id: false,
                user_id:
                {
                type:String,
                },
                name:
                {
                    type:String,
                },
                email:{
                    type:String,
                }, 
                amount:{
                    type:Number,
                }
        
            }]
        }

    ]
   
    
}, {timestamps: true})

module.exports = mongoose.model('Trip', TripSchema)