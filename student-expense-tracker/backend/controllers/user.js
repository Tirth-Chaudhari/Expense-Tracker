const mongoose = require('mongoose');
const UserSchema= require("../models/UserModel")


exports.addUser = async (req, res) => 
{

    const {name,email}  = req.body;
    const checkuse=await UserSchema.findOne({email:email});
    console.log(checkuse+"i")
    
    if(checkuse)
    {
        console.log(checkuse+"inner")
        
        return res.status(200).json({message:checkuse});

    }

    const user = UserSchema({
        name,
        email
    })
    console.log(user);
    try {
        //validations
        if(!name || !email)
        {
            return res.status(400).json({message: 'All fields are required!'})
        }
       
        const data=await user.save()
        res.status(200).json({message:data._id})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
    user.save();
}


exports.addUserImage=async(req,res)=>
{
    const {userid,url}=req.body;
    try {
        const userId = mongoose.Types.ObjectId(userid);
        // Convert the string ID to ObjectId
       

        const user=await UserSchema.updateOne({_id:userId},{url:url});
        res.status(200).json({message: 'UserImage Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

}

exports.addUserName=async(req,res)=>
{
    const {userid,name}=req.body;
    try {
        const userId = mongoose.Types.ObjectId(userid);
        // Convert the string ID to ObjectId
       

        await UserSchema.updateOne({_id:userId},{name1:name});
        res.status(200).json({message: 'UserNameAdded'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
   
}