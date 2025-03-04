"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import axios from "axios";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

interface WorkoutFormProps {
  onSubmit: (workout: any) => void;
  editingWorkout?: any;
  WORKOUT_DAYS: string[];
}

export function WorkoutForm({ onSubmit, editingWorkout, WORKOUT_DAYS }: WorkoutFormProps) {
  const [workoutName, setWorkoutName] = useState(editingWorkout?.name || "");
  const [workoutType, setWorkoutType] = useState(editingWorkout?.type || "");
  const [workoutDay, setWorkoutDay] = useState(editingWorkout?.day || "");
  const [exercises, setExercises] = useState<Exercise[]>(
    editingWorkout?.exercises || [{ name: "", sets: "", reps: "", weight: "" }]
  );

  // const addExercise = () => {
  //   setExercises([...exercises, { name: "", sets: "", reps: "", weight: "" }]);
  // };

  const removeExercise = (index: number) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
  };

  const handleExerciseChange = (index: number, field: string, value: string) => {
    const newExercises = exercises.map((exercise, i) => {
      if (i === index) {
        return { ...exercise, [field]: value };
      }
      return exercise;
    });
    setExercises(newExercises);
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    
  try{
    
    const response = await axios.post("http://localhost:4000/api/v1/createWorkout",{ 
   
      title:workoutName,
      category:workoutType,
      day:workoutDay,
      exercises
      
    },{headers:{'Content-Type':"application/json"},withCredentials:true})
    console.log(response.data)
  }catch(error:any){
    console.log(error.response.data.message)
  }
  
    
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const workout = {
  //     id: editingWorkout?.id || Date.now().toString(),
  //     name: workoutName,
  //     type: workoutType,
  //     day: workoutDay,
  //     exercises: exercises,
  //     duration: "0:00"
  //   };
  //   onSubmit(workout);
  // };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="workoutName">Workout Name</Label>
          <Input
            id="workoutName"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder="e.g., Morning Strength Training"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="workoutType">Workout Type</Label>
          <Select value={workoutType} onValueChange={setWorkoutType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="strength">Strength Training</SelectItem>
              <SelectItem value="cardio">Cardio</SelectItem>
              <SelectItem value="hiit">HIIT</SelectItem>
              <SelectItem value="flexibility">Flexibility</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 col-span-2">
          <Label htmlFor="workoutDay">Workout Day</Label>
          <Select value={workoutDay} onValueChange={setWorkoutDay}>
            <SelectTrigger>
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              {WORKOUT_DAYS.map(day => (
                <SelectItem key={day} value={day.toLowerCase()}>{day}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Exercises</h3>
          <Button type="button" onClick={handleSubmit} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Exercise
          </Button>
        </div>

        {exercises.map((exercise, index) => (
          <Card key={index} className="p-4">
            <div className="grid grid-cols-[1fr,auto] gap-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`exercise-${index}-name`}>Exercise</Label>
                  <Input
                    id={`exercise-${index}-name`}
                    value={exercise.name}
                    onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                    placeholder="e.g., Bench Press"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`exercise-${index}-sets`}>Sets</Label>
                  <Input
                    id={`exercise-${index}-sets`}
                    value={exercise.sets}
                    onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
                    type="number"
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`exercise-${index}-reps`}>Reps</Label>
                  <Input
                    id={`exercise-${index}-reps`}
                    value={exercise.reps}
                    onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
                    type="number"
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`exercise-${index}-weight`}>Weight (lbs)</Label>
                  <Input
                    id={`exercise-${index}-weight`}
                    value={exercise.weight}
                    onChange={(e) => handleExerciseChange(index, "weight", e.target.value)}
                    type="number"
                    min="0"
                    step="2.5"
                  />
                </div>
              </div>
              {exercises.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="self-end"
                  onClick={() => removeExercise(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">{editingWorkout ? 'Update' : 'Save'} Workout</Button>
      </div>
    </form>
  );
}