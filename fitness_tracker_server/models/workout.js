const mongoose=require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, enum: ['strength', 'cardio','hiit','flexibility'], required: true },
  day:{
 type:String,
 required:true
  },
  exercises: [
    {
      name: { type: String, required: true },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
      weight: { type: Number },
     
    },
  ],
  
}, { timestamps: true });

const WorkoutModel= mongoose.model('Workout', WorkoutSchema);
module.exports=WorkoutModel