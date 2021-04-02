import React, { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "../service/api";

interface Props {
  children: ReactNode;
}

interface MealsContextData {
  meals: IMeals[];
  mealsData: IMeals[]
}

interface IMeals {
  id: string;
  title: string;
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
  breakfast_time: Date;
  lunch_time: Date;
  snack_time: Date;
  dinner_time: Date
}

const mealsData = [
  {
    id: '1',
    title: 'Light Meals',
    breakfast: 'Apple or banana',
    lunch: 'Rice, beans and steak',
    snack: 'Any fruit',
    dinner: 'Rice beans, chicken and a salad',
    breakfast_time: new Date(),
    lunch_time: new Date(),
    snack_time: new Date(),
    dinner_time: new Date(),
  },

  {
    id: '2',
    title: 'Medium Meals',
    breakfast: 'Cereal',
    lunch: 'Rice, beans, salad, potato and a chicken',
    snack: 'Sandwich',
    dinner: 'Rice beans, steak and a salad',
    breakfast_time: new Date(),
    lunch_time: new Date(),
    snack_time: new Date(),
    dinner_time: new Date(),
  },

  {
    id: '3',
    title: 'Fiber Meals',
    breakfast: 'Sweet potatos and chicken',
    lunch: 'Rice, sweet potatoes and chicken',
    snack: 'A fruit',
    dinner: 'Rice beans, steak, salad and a juice',
    breakfast_time: new Date(),
    lunch_time: new Date(),
    snack_time: new Date(),
    dinner_time: new Date()
  }
]

export const MealsContext = createContext({} as MealsContextData);

export function MealsProvider({ children }: Props) {
  const [meals, setMeals] = useState<IMeals[]>([]);

  async function getMeals() {
    const meals = await api.get('/meals');
    setMeals(meals.data);
  }

  useEffect(() => {
    getMeals();
  }, []);

  return (
    <MealsContext.Provider value={{
      meals,
      mealsData,
    }}>
      { children }
    </MealsContext.Provider>
  )
}