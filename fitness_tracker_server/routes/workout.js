const express = require("express");
const {
  workouts,
  createWorkout,
  editWorkout,
  deleteWorkout,
} = require("../controller/workout");

const { protect } = require("../middlewares/authorization");

const router = express.Router();

router.route("/createWorkout").post(protect, createWorkout);
router.route("/getAllWorkout").get(workouts);
router.route("/editWorkout/:id").put(protect, editWorkout);
router.route("/deleteWorkout/:id").delete(protect, deleteWorkout);

module.exports = router;
