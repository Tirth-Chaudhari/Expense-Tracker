const { addExpense, getExpense, deleteExpense,updateExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome,updateIncome } = require('../controllers/income');
const { addUser, addCloudinaryData, addUserImage, addUserName } = require('../controllers/user');
const { addGroup,getGroups, deleteGroup } = require('../controllers/Group');
const { addGroupIncome, getGroupIncome, updateGroupIncome, deleteGroupIncome } = require('../controllers/Group-income');
const { getGroupExpense } = require('../controllers/Group-expense');
const { addDescription,getDescriptions,deleteDescription, updateDescription} = require('../controllers/Note');
const { addTrip, addTripMember, addTripData,getTrip, deleteTripData, updateTripData, getTripData } = require('../controllers/Trip');
const router = require('express').Router();





router.post('/add-group',addGroup)
    .post('/add-user',addUser)
    .post('/add-income', addIncome)
    .get('/get-incomes/:id', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/update-income/:id',updateIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses/:id', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/update-expense/:id',updateExpense)
    .post('/add-groupincome',addGroupIncome)
    .get('/get-groupincome/:id',getGroupIncome)
    .get('/get-groupexpense/:id',getGroupExpense)
    .post('/update-groupincome',updateGroupIncome)
    .post('/delete-groupincome',deleteGroupIncome)
    .get('/get-groups/:id',getGroups)
    .post('/delete-groups',deleteGroup)
    .post('/add-description', addDescription)
    .get('/get-descriptions/:id', getDescriptions)
    .post('/delete-description', deleteDescription)
    .post('/update-description',updateDescription)
    .post('/add-Trip',addTrip)
    .post('/add-TripMember',addTripMember)
    .post('/add-TripData',addTripData)
    .get('/get-Trip/:id',getTrip)
    .post('/delete-TripData',deleteTripData)
    .post('/update-TripData',updateTripData)
    .get('/get-TripData/:id',getTripData)
    .post('/add-UserImage',addUserImage)
    .post('/add-UserName',addUserName);
    


module.exports = router 