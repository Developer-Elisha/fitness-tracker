"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import axios from 'axios'

interface FoodItem {
  name: string;
  quantity: string;
  calories: string;
  protein: string;
  carbs: string;
  
}

interface NutritionFormProps {
  // onSubmit: (entry: any) => void;
  MEAL_TYPES: string[];
}

export function NutritionForm({  MEAL_TYPES }: NutritionFormProps) {
  const [currentMealType, setCurrentMealType] = useState("");
  const [foodItems, setFoodItems] = useState<FoodItem[]>([{
    name: "",
    quantity: "",
    calories: "",
    protein: "",
    carbs: "",
    
  }]);

  const addFoodItem = () => {
    setFoodItems([...foodItems, {
      name: "",
      quantity: "",
      calories: "",
      protein: "",
      carbs: "",
     
    }]);
  };

  const removeFoodItem = (index: number) => {
    setFoodItems(foodItems.filter((_, i) => i !== index));
  };

  const handleFoodItemChange = (index: number, field: string, value: string) => {
    const newFoodItems = foodItems.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setFoodItems(newFoodItems);
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const entry = {
  //     id: Date.now().toString(),
  //     mealType: currentMealType,
  //     foodItems: foodItems,
  //     date: new Date().toISOString()
  //   };
  //   onSubmit(entry);
  //   setCurrentMealType("");
  //   setFoodItems([{
  //     name: "",
  //     quantity: "",
  //     calories: "",
  //     protein: "",
  //     carbs: "",
  //     fats: ""
  //   }]);
  // };


 
   

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
    
      
    try{
      
      const response = await axios.post("http://localhost:4000/api/v1/createNutrition",{ 
        mealType: currentMealType,
        foodItems
      },{headers:{'Content-Type':"application/json"},withCredentials:true})
      console.log(response.data)
    }catch(error:any){
      console.log(error.response.data.message);
    }
    
      
    };


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="mealType">Meal Type</Label>
        <Select value={currentMealType} onValueChange={setCurrentMealType}>
          <SelectTrigger>
            <SelectValue placeholder="Select meal type" />
          </SelectTrigger>
          <SelectContent>
            {MEAL_TYPES.map(type => (
              <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Food Items</h3>
          <Button type="button" onClick={addFoodItem} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Food Item
          </Button>
        </div>

        {foodItems.map((item, index) => (
          <Card key={index} className="p-4">
            <div className="grid grid-cols-[1fr,auto] gap-4">
              <div className="grid grid-cols-6 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor={`food-${index}-name`}>Food Item</Label>
                  <Input
                    id={`food-${index}-name`}
                    value={item.name}
                    onChange={(e) => handleFoodItemChange(index, "name", e.target.value)}
                    placeholder="e.g., Chicken Breast"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`food-${index}-quantity`}>Quantity (g)</Label>
                  <Input
                    id={`food-${index}-quantity`}
                    value={item.quantity}
                    onChange={(e) => handleFoodItemChange(index, "quantity", e.target.value)}
                    type="number"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`food-${index}-calories`}>Calories</Label>
                  <Input
                    id={`food-${index}-calories`}
                    value={item.calories}
                    onChange={(e) => handleFoodItemChange(index, "calories", e.target.value)}
                    type="number"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`food-${index}-protein`}>Protein (g)</Label>
                  <Input
                    id={`food-${index}-protein`}
                    value={item.protein}
                    onChange={(e) => handleFoodItemChange(index, "protein", e.target.value)}
                    type="number"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`food-${index}-carbs`}>Carbs (g)</Label>
                  <Input
                    id={`food-${index}-carbs`}
                    value={item.carbs}
                    onChange={(e) => handleFoodItemChange(index, "carbs", e.target.value)}
                    type="number"
                    min="0"
                  />
                </div>
              </div>
              {foodItems.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="self-end"
                  onClick={() => removeFoodItem(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">Save Nutrition Log</Button>
      </div>
    </form>
  );
}