const GroupSchema= require("../models/GroupModel")
const mongoose = require('mongoose');
const UserSchema= require("../models/UserModel")


exports.addGroup = async (req, res) => 
{
    let {user_id,email,name,email1}  = req.body
    let name1=name; 
    console.log(email+'at point');   
    if(email=='')
    {
        return res.status(200).json({message:'All fields are required!'});
    }
    let checkuser=''
   await UserSchema.findOne({email:email}).then((checkuse)=>
   {
        // checkuser=checkuse
        console.log(checkuse+"given time");
        if(!checkuse)
        {
            
            return res.status(200).json({message:'Member Not Found'});
        }
        else
        {
            const func=async()=>
            {
                console.log(checkuse._id+"before"+user_id);
                GroupSchema.findOne({user_id:user_id,x_id:checkuse._id}).then((checkMember)=>
                {
                    console.log(checkMember);
                    if(checkMember)
                    {   
                        console.log('returned');
                        return res.status(200).json({message:'Member Already Exist'});
                    }
                    else
                    {
                         const func1=async()=>
                            {
                                let x_id=checkuse._id;
                                name=checkuse.name;
                                
                                const Group = GroupSchema({
                                    user_id,
                                    x_id,
                                    name,
                                    email
                                    
                                })   
                            try {
                                //validations
                                if(!name || !user_id || !x_id || !email){
                                    return res.status(200).json({message: 'All fields are required!'})
                                }
                                
                                await Group.save()
                                
                            } catch (error) {
                                return res.status(200).json({message: 'Server Error'})
                            }

                            let p=user_id;
                            user_id=x_id;
                            x_id=p;
                            name=name1;
                            email=email1;
                            const Group1 = GroupSchema({
                                user_id,
                                x_id,
                                name,
                                email
                                
                            })   

                            try {
                                //validations 
                                if(!name || !user_id || !x_id || !email){
                                    return res.status(200).json({message: 'All fields are required!'})
                                }
                                
                                await Group1.save()
                                return res.status(200).json({message: 'Group Added'})
                            } catch (error) {
                                return res.status(200).json({message: 'Server Error'})
                            }

                            } 
                    func1();

                    }
                });

            }
            func();
           
        }
   });
    
    
}
     
     
     

exports.getGroups=async (req,res)=>
{

    const id=req.params.id;
    console.log(id);
    try
    {
        const Groups=await GroupSchema.find({user_id:id});
        console.log(Groups+"grouped");
        if(Groups)
        {
           return res.status(200).json(Groups);

        }
        else
        {
            return  res.status(400).json("No User Found")
        }
        
    }
    catch(err)
    {
       
       return res.status(200).json('Server Error');
    }

        

}


exports.deleteGroup = async (req, res) =>
{
    const id  = req.body;
    try {
        
        const incomeObjectId = mongoose.Types.ObjectId(id);
        // Convert the string ID to ObjectId
        if (!mongoose.Types.ObjectId.isValid(incomeObjectId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

       
        const deletedGroup = await GroupSchema.deleteOne({_id:incomeObjectId});
        
        if (!deletedGroup) {
            return res.status(404).json({ message: 'Member not found' });
        }

        // If the record is successfully deleted, send a success message
        return res.status(200).json({ message: 'Member Deleted' });
    } catch (error) {
        // If an error occurs during deletion, log the error and send a server error response
        console.error('Error deleting income:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
}

