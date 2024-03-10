const ExpenseSchema = require("../models/ExpenseModel")
const mongoose = require('mongoose');

exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date,user_id}  = req.body

    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        user_id
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(200).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(200).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(200).json({message: 'Server Error'})
    }

}

exports.getExpense = async (req, res) =>{
    try {
        
        const id=req.params.id;
        // const id="65ba43f7bdff59f1c08105b5";
        const incomes = await ExpenseSchema.find({user_id:id}).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error1'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}




exports.updateExpense = async (req, res) => 
{
    const id=req.params.id;
    const {title, amount, category, description, date}  = req.body

    const expense = {
        title:title,
        amount:amount,
        category:category,
        description:description,
        date:date
    } 
    
    try {
        const expenseObjectId = mongoose.Types.ObjectId(id);
        if (!mongoose.Types.ObjectId.isValid(expenseObjectId)) {
            console.log('mon');
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        await ExpenseSchema.updateOne({_id:expenseObjectId},{$set:expense})
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}