"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Trophy } from "lucide-react";

interface Goal {
  name: string;
  icon: string;
  progress: number;
  current: number;
  target: number;
  unit: string;
  deadline: string;
}

interface GoalsListProps {
  goals: Goal[];
}

export function GoalsList({ goals }: GoalsListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {goals.map((goal, index) => (
        <Card key={index} className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {goal.icon === 'target' ? (
                  <Target className="h-5 w-5 text-primary" />
                ) : (
                  <Trophy className="h-5 w-5 text-primary" />
                )}
                <h3 className="font-medium">{goal.name}</h3>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {goal.deadline}
              </span>
            </div>
            <Progress value={goal.progress} />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress: {goal.progress}%</span>
              <span>{goal.current} / {goal.target} {goal.unit}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}