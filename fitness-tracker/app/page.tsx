"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Utensils } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { StatsOverview } from "./components/stats/StatsOverview";
import { WorkoutForm } from "./components/workouts/WorkoutForm";
import { WorkoutList } from "./components/workouts/WorkoutList";
import { NutritionForm } from "./components/nutrition/NutritionForm";
import { NutritionList } from "./components/nutrition/NutritionList";
import { ProgressCharts } from "./components/progress/ProgressCharts";
import { GoalsList } from "./components/goals/GoalsList";
import axios from "axios";
import { useRouter } from 'next/navigation';

// Constants
const WORKOUT_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack"];

// Mock data
const weightData = [
  { date: "Jan 1", weight: 185 },
  { date: "Jan 8", weight: 184 },
  { date: "Jan 15", weight: 182 },
  { date: "Jan 22", weight: 181 },
  { date: "Jan 29", weight: 180 },
  { date: "Feb 5", weight: 179 },
  { date: "Feb 12", weight: 178 },
];

const strengthData = [
  { date: "Jan 1", benchPress: 185, squat: 225 },
  { date: "Jan 8", benchPress: 190, squat: 230 },
  { date: "Jan 15", benchPress: 195, squat: 235 },
  { date: "Jan 22", benchPress: 195, squat: 240 },
  { date: "Jan 29", benchPress: 200, squat: 245 },
  { date: "Feb 5", benchPress: 205, squat: 250 },
  { date: "Feb 12", benchPress: 210, squat: 255 },
];

const goals = [
  {
    name: "Weight Loss Goal",
    icon: "target",
    progress: 60,
    current: 180,
    target: 170,
    unit: "lbs",
    deadline: "March 1st",
  },
  {
    name: "Bench Press Goal",
    icon: "trophy",
    progress: 75,
    current: 210,
    target: 225,
    unit: "lbs",
    deadline: "March 15th",
  },
  {
    name: "Weekly Workouts",
    icon: "target",
    progress: 80,
    current: 4,
    target: 5,
    unit: "sessions",
    deadline: "This week",
  },
  {
    name: "Running Distance",
    icon: "trophy",
    progress: 45,
    current: 9,
    target: 20,
    unit: "miles",
    deadline: "This month",
  },
];

export default function Home() {
  const [workoutProgress] = useState(68);
  const [userWorkouts, setUserWorkouts] = useState<any[]>([]);
  const [editingWorkout, setEditingWorkout] = useState<any | null>(null);
  const [nutritionEntries, setNutritionEntries] = useState<any[]>([]);
  const [isWorkoutDialogOpen, setIsWorkoutDialogOpen] = useState(false);
  const [isNutritionDialogOpen, setIsNutritionDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("workout");
  const router=useRouter()

  const handleLogout=async()=>{
 
  try {
     await axios.post('http://localhost:4000/user/v1/logout', {}, { withCredentials: true });
     
     router.push('/auth/login')
  } catch (error) {
    console.error('Logout failed:', error);
};
  }

  const handleWorkoutSubmit = (workout: any) => {
    if (editingWorkout) {
      setUserWorkouts((prev) =>
        prev.map((w) => (w.id === editingWorkout.id ? { ...w, ...workout } : w))
      );
    } else {
      setUserWorkouts((prev) => [
        ...prev,
        { ...workout, id: Date.now().toString() },
      ]);
    }
    setEditingWorkout(null); // Reset editing workout
    setIsWorkoutDialogOpen(false);
  };

  const handleEditWorkout = (workout: any) => {
    setEditingWorkout({ ...workout });
    setIsWorkoutDialogOpen(true);
  };

  // const handleDeleteWorkout = (id: string) => {
  //   setUserWorkouts(prev => prev.filter(w => w.id !== id));
  // };

  const handleDeleteWorkout = async (id: string) => {
    console.log(id)
    try {
      await axios.delete(`http://localhost:4000/api/v1/deleteWorkout/${id}`,{withCredentials:true});
      setUserWorkouts((prev) => prev.filter((w) => w._id !== id));
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  // const handleNutritionSubmit = (entry: any) => {
  //   setNutritionEntries(prev => [...prev, entry]);
  //   setIsNutritionDialogOpen(false);
  // };

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab == "nutrition") {
        const response = await axios.get(
          "http://localhost:4000/api/v1/getAllNutrition"
        );
        setNutritionEntries(response.data);
      } else if (activeTab == "workout") {
        const response = await axios.get(
          "http://localhost:4000/api/v1/getAllWorkout"
        );
        setUserWorkouts(response.data);
      }
    };
    fetchData();
  }, [activeTab]);

  const calculateTotalNutrition = () => {
    return nutritionEntries.reduce(
      (acc, entry) => {
        entry.foodItems.forEach((item: any) => {
          acc.calories += parseInt(item.calories) || 0;
          acc.protein += parseInt(item.protein) || 0;
          acc.carbs += parseInt(item.carbs) || 0;
          acc.fats += parseInt(item.fats) || 0;
        });
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  };

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Fitness Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your workouts, nutrition, and progress
            </p>
          </div>
          <div className="flex space-x-2">
            <Dialog
              open={isWorkoutDialogOpen}
              onOpenChange={setIsWorkoutDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingWorkout(null); // Reset editing state
                    setIsWorkoutDialogOpen(true);
                  }}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  New Workout
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>Create New Workout</DialogHeader>
                <WorkoutForm
                  onSubmit={handleWorkoutSubmit}
                  editingWorkout={editingWorkout}
                  WORKOUT_DAYS={WORKOUT_DAYS}
                />
              </DialogContent>
            </Dialog>

            <Dialog
              open={isNutritionDialogOpen}
              onOpenChange={setIsNutritionDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Utensils className="mr-2 h-4 w-4" />
                  Log Nutrition
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Log Nutrition</DialogTitle>
                </DialogHeader>
                <NutritionForm
                  // onSubmit={handleNutritionSubmit}
                  MEAL_TYPES={MEAL_TYPES}
                />
              </DialogContent>
            </Dialog>

            <Button onClick={handleLogout}>
                
                  Logout
                </Button>

          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview
          workoutProgress={workoutProgress}
          totalWorkouts={userWorkouts.length}
          totalCalories={calculateTotalNutrition().calories}
        />

        {/* Main Content */}
        <Tabs defaultValue="workouts" className="space-y-4">
          <TabsList>
            <TabsTrigger
              value="workouts"
              onClick={() => setActiveTab("workouts")}
            >
              Workouts
            </TabsTrigger>
            <TabsTrigger
              value="nutrition"
              onClick={() => setActiveTab("nutrition")}
            >
              Nutrition
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              onClick={() => setActiveTab("progress")}
            >
              Progress
            </TabsTrigger>
            <TabsTrigger value="goals" onClick={() => setActiveTab("goals")}>
              Goals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workouts" className="space-y-4">
            <WorkoutList
              workouts={userWorkouts}
              onEdit={handleEditWorkout}
              onDelete={handleDeleteWorkout}
            />
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4">
            <NutritionList entries={nutritionEntries} />
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <ProgressCharts
              weightData={weightData}
              strengthData={strengthData}
            />
          </TabsContent>

          <TabsContent value="goals" className="space-y-4">
            <GoalsList goals={goals} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
