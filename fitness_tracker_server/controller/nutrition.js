
const Nutrition =require( '../models/nutrition.js');
const UserModel = require('../models/user.js')
const createNutritionLog= async (req, res) => {

    const userId=req.userId

    try {
        const {  mealType, foodItems } = req.body;


        const user=await UserModel.findOne({_id:userId})
        if(!user){
            return res.status(404).json({ message: "User not found.." });
        }
        

        if (!userId || !mealType || !foodItems.length) {
            return res.status(400).json({ message: "User ID, meal type, and food items are required" });
        }

        const nutritionLog = await Nutrition.create({ userId, mealType, foodItems });

        return res.status(201).json(nutritionLog);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const nutritionLogs= async (req, res) => {
    try {
        const logs = await Nutrition.find();
        return res.status(200).json(logs);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const updateNutrition= async (req, res) => {
    try {
        const userId=req.userId
        const {  nutritionId } = req.params;
        const body = req.body;

        const user=await UserModel.findOne({_id:userId})
        if(!user){
            return res.status(404).json({ message: "User not found.." });
        }

        if (!body.date || !body.mealType || !body.foodItems.length) {
            return res.status(400).json({ message: 'Date, meal type, and food items are required' });
        }

        const updatedLog = await Nutrition.findOneAndUpdate(
            { _id: nutritionId, userId },
            body,
            { new: true }
        );

        if (!updatedLog) {
            return res.status(404).json({ message: 'Nutrition log not found' });
        }

        return res.status(200).json(updatedLog);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const deleteNutrition= async (req, res) => {
    const  userId=req.userId;
    try {
        const { nutritionId } = req.params;
        const user=await UserModel.findOne({_id:userId})
        if(!user){
            return res.status(404).json({ message: "User not found.." });
        }
        const deletedLog = await Nutrition.findOneAndDelete({ _id: nutritionId, userId });

        if (!deletedLog) {
            return res.status(404).json({ message: 'Nutrition log not found' });
        }

        return res.status(200).json({ message: 'Nutrition log deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
module.exports={
    nutritionLogs,
    updateNutrition,
    createNutritionLog,
    deleteNutrition
}