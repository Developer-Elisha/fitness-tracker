"use client";

import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProgressChartsProps {
  weightData: any[];
  strengthData: any[];
}

export function ProgressCharts({ weightData, strengthData }: ProgressChartsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-6">
        <h3 className="font-medium mb-4">Weight Progress</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="font-medium mb-4">Strength Progress</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={strengthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="benchPress" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Bench Press" />
              <Line type="monotone" dataKey="squat" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Squat" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}