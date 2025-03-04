"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Dumbbell, Calendar, Apple } from "lucide-react";

interface StatsOverviewProps {
  workoutProgress: number;
  totalWorkouts: number;
  totalCalories: number;
}

export function StatsOverview({ workoutProgress, totalWorkouts, totalCalories }: StatsOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="p-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">Weekly Progress</h3>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold">{workoutProgress}%</div>
          <Progress value={workoutProgress} className="mt-2" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-2">
          <Dumbbell className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">Total Workouts</h3>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold">{totalWorkouts}</div>
          <p className="text-xs text-muted-foreground mt-1">All time</p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">Streak</h3>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold">7 days</div>
          <p className="text-xs text-muted-foreground mt-1">Keep it up!</p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-2">
          <Apple className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">Daily Calories</h3>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold">{totalCalories}</div>
          <p className="text-xs text-muted-foreground mt-1">Goal: 2000</p>
        </div>
      </Card>
    </div>
  );
}