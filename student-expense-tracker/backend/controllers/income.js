const IncomeSchema= require("../models/IncomeModel")
const mongoose = require('mongoose');


exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date,user_id}  = req.body

    const income = IncomeSchema({
        title,
        amount,
        date,
        category,
        description,
        user_id
        
    })
    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
    income.save();
}


exports.getIncomes = async (req, res) =>{
    try {
        const id=req.params.id;
        console.log(id+"gggg");
        const incomes = await IncomeSchema.find({user_id:id}).sort({createdAt: -1})
        res.status(200).json(incomes)

    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async (req, res) =>
{
    const id  = req.params.id; // Extract the ID from the request parameters
        console.log(id+"here");

    try {
        
        const incomeObjectId = mongoose.Types.ObjectId(id);
        // Convert the string ID to ObjectId
        if (!mongoose.Types.ObjectId.isValid(incomeObjectId)) {
            console.log('mon');
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Convert the string ID to ObjectId
    
        console.log(id+"let");
        console.log(incomeObjectId+"done");
        // Use Mongoose's findByIdAndDelete to delete the income record by ID
        const deletedIncome = await IncomeSchema.deleteOne({_id:incomeObjectId});
        
        if (!deletedIncome) {
            console.log('id');
            return res.status(404).json({ message: 'Income not found' });
        }

        // If the record is successfully deleted, send a success message
        return res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        // If an error occurs during deletion, log the error and send a server error response
        console.error('Error deleting income:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
}



exports.updateIncome = async (req, res) => 
{
    console.log("first update");
    const id=req.params.id;
    const {title, amount, category, description, date}  = req.body

    const income = {
        title:title,
        amount:amount,
        category:category,
        description:description,
        date:date
    } 
    
    console.log(id+"for this");
    console.log(income+"here task");
    try {
        const incomeObjectId = mongoose.Types.ObjectId(id);
        // Convert the string ID to ObjectId
        if (!mongoose.Types.ObjectId.isValid(incomeObjectId)) {
            console.log('mon');
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        await IncomeSchema.updateOne({_id:incomeObjectId},{$set:income})
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}


