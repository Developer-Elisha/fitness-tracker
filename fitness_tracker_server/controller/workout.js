const UserModel = require("../models/user");
const Workout = require("../models/workout");

const editWorkout = async (req, res) => {
  const userId = req.userId;
  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: "User not found.." });
  }
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedWorkout = await Workout.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    return res.status(200).json(updatedWorkout);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const userId = req.userId;
  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: "User not found.." });
  }
  try {
    const { id } = req.params;
    console.log(id);

    const deletedWorkout = await Workout.findByIdAndDelete(id);

    if (!deletedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    return res.status(200).json({ message: "Workout Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

const createWorkout = async (req, res) => {
  try {
    const { title, category, day, exercises } = req.body;
    const userId = req.userId;
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found.." });
    }
    if (!title || !category || !day || !exercises || exercises.length === 0) {
      return res
        .status(400)
        .json({
          message:
            "All required fields (userId, title, category, day, exercises) must be provided",
        });
    }

    for (const exercise of exercises) {
      if (!exercise.name || !exercise.sets || !exercise.reps) {
        return res
          .status(400)
          .json({ message: "Each exercise must have name, sets, and reps" });
      }
    }

    const workout = await Workout.create({
      userId,
      title,
      category,
      day,
      exercises,
    });
    return res.status(201).json(workout);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};

const workouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    return res.status(200).json(workouts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  workouts,
  createWorkout,
  editWorkout,
  deleteWorkout,
};
