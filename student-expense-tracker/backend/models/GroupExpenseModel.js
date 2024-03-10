const mongoose = require('mongoose');


const GroupExpenseSchema = new mongoose.Schema({
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
    title:
    {
        type:String,
        required:true,
        maxLength:15,
        trim:true

    },
    amount: 
    {
        type: Number,
        required: true,
        
    },
    description:
    {
        type:String,
        required:true,
    }
}, {timestamps: true})

module.exports = mongoose.model('GroupExpense', GroupExpenseSchema)