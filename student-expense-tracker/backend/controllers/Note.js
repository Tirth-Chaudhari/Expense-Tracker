const DescriptionSchema = require("../models/NoteModel")
const mongoose = require('mongoose');

exports.addDescription = async (req, res) => {
    const {user_id, description}  = req.body
    const note = DescriptionSchema({
        user_id,
        description
        
    })
    try {
        //validations
        if(!user_id){
            return res.status(400).json({message: 'All fields are required!'})
        }
        // else if(amount <= 0 || !amount === 'number'){
        //     return res.status(400).json({message: 'Amount must be a positive number!'})
        // }
        await note.save();
        return res.status(200).json({message: 'Description Added'})
    } catch (error) {
        return res.status(500).json({message: 'Server Error'})
    }

}

exports.getDescriptions = async (req, res) =>{
    try {
        const id=req.params.id;
        const notes = await DescriptionSchema.find({user_id:id}).sort({createdAt: -1})
        return res.status(200).json(notes)
    } catch (error) {
         return res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteDescription = async (req, res) =>{
    const {id} = req.body;
    console.log(id+'called');
    try {
        
        const noteId = mongoose.Types.ObjectId(id);

        // Convert the string ID to ObjectId
        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Convert the string ID to ObjectId
    
        console.log(id+"let");
        // Use Mongoose's findByIdAndDelete to delete the income record by ID
        const deletedNote = await DescriptionSchema.deleteOne({_id:noteId});
        
        if (!deletedNote) {
            return res.status(404).json({ message: 'Income not found' });
        }

        // If the record is successfully deleted, send a success message
        return res.status(200).json({ message: 'Note Deleted' });
    } catch (error) {
        // If an error occurs during deletion, log the error and send a server error response
        console.error('Error deleting income:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
     
}



exports.updateDescription = async (req, res) =>{
    const {content1,id} = req.body;
    const description=content1;
    console.log(description+"");    
    const data=
    {
        description
    }
    const incomeObjectId = mongoose.Types.ObjectId(id);
    // Convert the string ID to ObjectId
    if (!mongoose.Types.ObjectId.isValid(incomeObjectId)) {
        console.log('mon');
        return res.status(400).json({ message: 'Invalid ID format' });
    }

         DescriptionSchema.updateOne({_id:incomeObjectId},{$set:data})
        .then((note) =>{
           return  res.status(200).json({message: 'Description Deleted'})
        })
        .catch((err) =>{
           return res.status(500).json({message: 'Server Error'})
        })
}