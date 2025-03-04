const mongoose=require('mongoose');

const NutritionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snacks'], required: true },
  foodItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      calories: { type: Number, required: true },
      protein: { type: Number, required: true },
      carbs: { type: Number, required: true },
      
    }
  ]
}, { timestamps: true });
const NutritionModel=mongoose.model('Nutrition', NutritionSchema);

module.exports=NutritionModel
