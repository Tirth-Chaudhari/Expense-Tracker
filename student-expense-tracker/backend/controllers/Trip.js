const TripSchema= require("../models/TripModel")
const mongoose = require('mongoose');
const UserSchema= require("../models/UserModel");
const { response } = require("express");
const GroupSchema =require("../models/GroupModel")

exports.addTrip = async (req, res) => 
{
    const {TripName,user_id,name,email}  = req.body;
    const TripMember=
    {
        user_id,
        name,
        email
    }
    const CreateBy=
    {
        user_id,
        name,
        email
    }
    
   
   try
   {
      let trip = await TripSchema.create({ TripName:TripName ,CreateBy:CreateBy, TripMember:TripMember});
      return res.status(200).json('Succesfully Added');
   }
   catch(error)
   {
    return res.status(400).json('Server Error');
   }
    
}

exports.addTripMember = async (req, res) => {
    const { _id, email } = req.body;

   
    try {
        const user=await UserSchema.findOne({email:email});
   
        if(!user)
        {
            return res.status(200).json({ message: 'Member Not Found' });
        }
        const ObjectId = mongoose.Types.ObjectId(_id);
        const trip = await TripSchema.findById(ObjectId);
        const user_id=user._id;
        const name=user.name;
        const x_id=user._id;
        const GroupId=trip._id;
        // trip.TripMember.forEach(async (member) => {
        //     const addCommonGroup = async () => {
        //         const group1 = await GroupSchema.findOne({ user_id: member.user_id, x_id: x_id });
        //         const group2 = await GroupSchema.findOne({ user_id: x_id, x_id: member.user_id });
        //         if (!group1 && !group2) {
                    
        //             let g1 = await GroupSchema.create({ user_id: member.user_id, x_id: x_id, name: name, email: email }); // here added Friends
        //             g1.CommonGroup.push({ GroupId: GroupId});
        //             let g2 = await GroupSchema.create({ user_id: x_id, x_id: member.user_id, name: member.name, email: member.email });
        //             g2.CommonGroup.push({GroupId: GroupId});
        //             await g1.save();
        //             await g2.save();
        //         } else {
        //             group1.CommonGroup.push({ GroupId: GroupId });
        //             group2.CommonGroup.push({ GroupId: GroupId });
        //             await group1.save();
        //             await group2.save();
                   
        //         }
        //     };
        //     await addCommonGroup();
        // });      
          trip.TripMember.push({ user_id, name, email });

        // Save the updated trip
        await trip.save();

        return res.status(200).json({message:'Successfully Added'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}
 
exports.addTripData=async(req,res)=>
{
    const { _id,title,paidBy,individualAmounts} = req.body;
    const Amount=individualAmounts;

    try {
        const ObjectId = mongoose.Types.ObjectId(_id);
        const trip = await TripSchema.findById(ObjectId);

        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        // Add the new member to the TripMember array
        trip.TripData.push({ title, paidBy , Amount} );

        // Save the updated trip
        await trip.save();

        return res.status(200).json('Succesfully Added');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }

}
exports.getTrip = async (req, res) => {
    const { id } = req.params; // Assuming user_id is passed as a route parameter
    
    try {
        const trip = await TripSchema.find({ 'TripMember.user_id': id });

        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        // If trip is found, return it
        return res.status(200).json({ trip });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }
}

exports.deleteTripData=async(req,res)=>
{
    const {id,_id}=req.body;
    
    const ObjectId = mongoose.Types.ObjectId(id);
    const ObjectId1 = mongoose.Types.ObjectId(_id);
    try {
        // Delete the TripData record using its _id
        await TripSchema.findByIdAndUpdate(ObjectId, { $pull: { TripData: { _id:ObjectId1 } } });
        
        res.status(200).json({ message: 'TripData deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete TripData', error: error.message });
    }
}
exports.updateTripData=async(req,res)=>
{
    const {id,_id,ispaid,updateAmount}=req.body;
    const tripId = mongoose.Types.ObjectId(id);
    const tripDataId = mongoose.Types.ObjectId(_id);
    console.log(updateAmount+"amount");
    updateAmount.map((member)=>
    {
        console.log(member.amount);
    })

    console.log(id);
    try {
        // Update the TripData based on the provided id
        await TripSchema.updateOne(
            { _id: tripId, "TripData._id": tripDataId },
            { $set: 
                { "TripData.$.Amount":updateAmount ,
                 "TripData.$.paidBy": ispaid
                } 
            }
        );
        console.log('success');

        res.status(200).json({ message: 'TripData updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update TripData', error: error.message });
    }
   

}

exports.getTripData=async(req,res)=>
{
    const {id}=req.params;
    console.log('reached');
    const tripId = mongoose.Types.ObjectId(id);
    try {
        const trip = await TripSchema.find({ _id:tripId });

        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        // If trip is found, return it
        return res.status(200).json({ trip });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }


}
exports.deleteTripGroup= async (req, res) => {
    const {id}=req.body;
    
    const ObjectId = mongoose.Types.ObjectId(id);
    
    try {
        // Delete the TripData record using its _id
        const deleteTrip = await TripSchema.deleteOne({_id:ObjectId});
        
        res.status(200).json({ message: 'TripData deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete TripData', error: error.message });
    }

}