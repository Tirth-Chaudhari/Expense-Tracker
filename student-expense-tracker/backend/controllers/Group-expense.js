
const GroupExpenseSchema= require("../models/GroupExpenseModel")


exports.getGroupExpense = async (req, res) => 
{
            const id=req.params.id;

    
            try {
                //validations
                if(!id){
                    return res.status(400).json({message: 'All fields are required!'})
                }
                
                const GroupExpense = await GroupExpenseSchema.find({user_id:id}).sort({createdAt: -1});
                return res.status(200).json(GroupExpense);
            } catch (error) {
                res.status(500).json({message: 'Server Error'})
            }
}

