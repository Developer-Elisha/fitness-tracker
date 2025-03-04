"use client";

import { Card } from "@/components/ui/card";



interface FoodItem {
  name: string;
  quantity: string;
  calories: string;
  protein: string;
  carbs: string;
  
}

interface NutritionEntry {
  id: string;
  mealType: string;
  foodItems: FoodItem[];
  createdAt: string;
}

interface NutritionListProps {
  entries: NutritionEntry[];
}



export function NutritionList({ entries }: NutritionListProps) {
console.log(entries)
  
  const calculateTotals = (foodItems: FoodItem[]) => {
    return foodItems.reduce(
      (acc, item) => {
        return {
          calories: acc.calories + (parseInt(item.calories) || 0),
          protein: acc.protein + (parseInt(item.protein) || 0),
          carbs: acc.carbs + (parseInt(item.carbs) || 0),
        
        };
      },
      { calories: 0, protein: 0, carbs: 0, }
    );
  };

  return (
    <div className="space-y-4">
      {entries.map((entry) => {
        const totals = calculateTotals(entry.foodItems);
        return (
          <Card key={entry.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium capitalize">{entry.mealType}</h3>
                  <p className="text-sm text-muted-foreground">
                    {entry.createdAt.split("T")[0]}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Total: {totals.calories} kcal
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium">Calories</span>
                  <p>{totals.calories} kcal</p>
                </div>
                <div>
                  <span className="font-medium">Protein</span>
                  <p>{totals.protein}g</p>
                </div>
                <div>
                  <span className="font-medium">Carbs</span>
                  <p>{totals.carbs}g</p>
                </div>
                {/* <div>
                  <span className="font-medium">Fats</span>
                  <p>{totals.fats}g</p>
                </div> */}
              </div>
              <div className="space-y-2">
                {entry.foodItems.map((item, index) => (
                  <div
                    key={index}
                    className="text-sm flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                  >
                    <span>{item.name}</span>
                    <span className="text-muted-foreground">
                      {item.quantity}g • {item.calories} kcal
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
         );
      })} 
    </div>

  
  );
}