"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Play, Timer } from "lucide-react";
import { useRef, useState } from "react";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

interface Workout {
  _id: string;
  name: string;
  type: string;
  day: string;
  exercises: Exercise[];
  duration: string;
}

interface WorkoutListProps {
  workouts: Workout[];
  onEdit: (workout: Workout) => void;
  onDelete: (id: string) => void;
}

export function WorkoutList({ workouts, onEdit, onDelete }: WorkoutListProps) {
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null);
  const [timer, setTimer] = useState<string>("00:00");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  const startWorkout = (workoutId: string) => {
    if (activeWorkout === workoutId) {
      // Stop the workout
      if (intervalRef.current) clearInterval(intervalRef.current);
      setActiveWorkout(null);
      setTimer("00:00");
    } else {
      // Start the workout
      setActiveWorkout(workoutId);
      let seconds = 0;
      intervalRef.current = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        setTimer(`${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`);
      }, 1000);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {workouts.map((workout) => (
        <Card key={workout._id} className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{workout.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {workout.type} • {workout.day}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => startWorkout(workout._id)}
                >
                  {activeWorkout === workout._id ? (
                    <Timer className="h-4 w-4 text-red-600" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(workout)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDelete(workout._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {activeWorkout === workout._id && (
              <div className="text-sm font-medium text-primary">
                Time: {timer}
              </div>
            )}
            <div className="space-y-2">
              {workout.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="text-sm flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                >
                  <span>{exercise.name}</span>
                  <span className="text-muted-foreground">
                    {exercise.sets} sets × {exercise.reps} reps @ {exercise.weight}lbs
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}