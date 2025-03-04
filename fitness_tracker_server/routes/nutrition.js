const express = require("express");
const {
  nutritionLogs,
  updateNutrition,
  createNutritionLog,
  deleteNutrition
} = require("../controller/nutrition");

const router = express.Router();
const { protect } = require("../middlewares/authorization");




router.route("/createNutrition").post(protect, createNutritionLog); // Create a nutrition log
router.route("/getAllNutrition").get( nutritionLogs); // Get all nutrition logs
router.route("/editNutrition/:nutritionId").put(protect,updateNutrition); // Update a nutrition log
router.route("/deleteNutrition/:nutritionId").delete(protect, deleteNutrition);
module.exports = router;
