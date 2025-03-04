
// import Workout from '../models/workout.js';
// import Nutrition from '../models/nutrition.js';
// const search=async (req, res) => {
//     try {
//         const { search, category, type, sortBy } = req.query;
//         let results = [];

//         // Search in Workouts
//         if (type === 'workout' || !type) {
//             const workoutQuery = {
//                 $or: [
//                     { title: { $regex: search, $options: 'i' } },
//                     { 'exercises.name': { $regex: search, $options: 'i' } }
//                 ]
//             };

//             if (category) {
//                 workoutQuery.category = category;
//             }

//             const workouts = await Workout.find(workoutQuery).sort(sortBy ? { [sortBy]: -1 } : {});
//             results.push(...workouts);
//         }

//         // Search in Nutrition
//         if (type === 'nutrition' || !type) {
//             const nutritionQuery = {
//                 $or: [
//                     { 'foodItems.name': { $regex: search, $options: 'i' } },
//                     { mealType: { $regex: search, $options: 'i' } }
//                 ]
//             };

//             const nutritionEntries = await Nutrition.find(nutritionQuery).sort(sortBy ? { [sortBy]: -1 } : {});
//             results.push(...nutritionEntries);
//         }

//         return res.status(200).json(results);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// });

// module.exports=search

