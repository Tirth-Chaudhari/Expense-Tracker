const mongoose = require('mongoose');


const DescriptionSchema = new mongoose.Schema({
    user_id: 
    {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    description: {
        type: String,
        maxLength: 20,
        trim: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Description', DescriptionSchema)