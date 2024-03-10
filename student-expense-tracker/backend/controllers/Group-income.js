const GroupIncomeSchema= require("../models/GroupIncomeModel")
const GroupExpenseSchema= require("../models/GroupExpenseModel")
const mongoose = require('mongoose');
const UserSchema= require("../models/UserModel");
const GroupExpense = require("../models/GroupExpenseModel");



exports.addGroupIncome = async (req, res) => 
{
        let {user_id,x_id,title,amount,description}  = req.body
            const GroupIncome = GroupIncomeSchema({
                user_id,
                x_id,
                title,
                amount,
                description
            })   
        let _id=null;
            try {
                //validations
                if(!title || !user_id || !x_id || !amount ||!description){
                    return res.status(200).json({message: 'All fields are required!'})
                }
                
            const data=await GroupIncome.save()
            console.log(data+"here");
              _id=data._id;
            console.log(_id+"here");
            } catch (error) {
                return res.status(200).json({message: 'Server Error'})
            }
            let p=user_id;
            user_id=x_id;
            x_id=p;

            const GroupExpense=GroupExpenseSchema({
                _id,
                user_id,
                x_id,
                title,
                amount,
                description

            }) 
            try {
                //validations
                if(!title || !user_id || !x_id || !amount ||!description){
                    return res.status(200).json({message: 'All fields are required!'})
                }
                
                await GroupExpense.save();
                return res.status(200).json({message:'successfully added income'})
                
            } catch (error) {
                return res.status(200).json({message: 'Server Error'})
            }
            
}


exports.getGroupIncome = async (req, res) => 
{
            const id  = req.params.id;
            console.log(id+"getGroup");
    
            try {
                //validations
                if(!id){
                    return res.status(200).json({message: 'All fields are required!'})
                }
                
                const groupincomes = await GroupIncomeSchema.find({user_id:id}).sort({createdAt: -1});
                return res.status(200).json(groupincomes);
            } catch (error) {
                return res.status(200).json({message: 'Server Error'})
            }
}


exports.updateGroupIncome = async (req, res) => 
{
    
            const {id,title,amount,description}  = req.body
            const GroupIncome={    
                title,
                amount,
                description
            }
    
            const incomeObjectId = mongoose.Types.ObjectId(id);
            if (!mongoose.Types.ObjectId.isValid(incomeObjectId)) {
                console.log('mon');
                return res.status(400).json({ message: 'Invalid ID format' });
            }
    
            try {
               
                const Income = await GroupIncomeSchema.updateOne({_id:incomeObjectId},{$set:GroupIncome});
                const Expense= await GroupExpenseSchema.updateOne({_id:incomeObjectId},{$set:GroupIncome});
                if (!Income || !Expense) {
                    console.log('id');
                    return res.status(404).json({ message: 'Income not found' });
                }

                 return res.status(200).json({ message: 'GroupIncome Updated' });
            } catch (error) {
                res.status(500).json({message: 'Server Error'})
            }

}




exports.deleteGroupIncome = async (req, res) => 
{
            const {id}  = req.body
            const incomeObjectId = mongoose.Types.ObjectId(id);
            // Convert the string ID to ObjectId
            if (!mongoose.Types.ObjectId.isValid(incomeObjectId)) {
                console.log('mon');
                return res.status(400).json({ message: 'Invalid ID format' });
            }
    
            try {
                //validations
               
                const deletedIncome = await GroupIncomeSchema.deleteOne({_id:incomeObjectId});
                const deleteExpense = await GroupExpenseSchema.deleteOne({_id:incomeObjectId});
                if (!deletedIncome || !deleteExpense) {
                    console.log('id');
                    return res.status(404).json({ message: 'Income not found' });
                }

                 return res.status(200).json({ message: 'GroupData Deleted' });
            } catch (error) {
                res.status(500).json({message: 'Server Error'})
            }
}


