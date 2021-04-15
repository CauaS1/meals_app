import React, { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "../service/api";

interface Props {
  children: ReactNode;
}

interface MealsContextData {
  meals: IMeals[];
  mealsData: IMeals[]
}

interface IUser {
  id: number;
  name: string;
  email: string;
  photo: string;
}

interface IMeals {
  id: string;
  title: string;
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
  rated: number;
  total_calories: string;
  breakfast_time: Date;
  lunch_time: Date;
  snack_time: Date;
  dinner_time: Date;
  users: IUser[];
}

const mealsData = [
  {
    id: '1',
    title: 'Light Meals',
    breakfast: 'Apple or banana',
    lunch: 'Rice, beans and steak',
    snack: 'Any fruit',
    dinner: 'Rice beans, chicken and a salad',
    total_calories: 1137,
    breakfast_time: '07:00',
    lunch_time: '12:00',
    snack_time: '13:0',
    dinner_time: '18:00',
  },

  {
    id: '2',
    title: 'Medium Meals',
    breakfast: 'Cereal',
    lunch: 'Rice, beans, salad, potato and a chicken',
    snack: 'Sandwich',
    dinner: 'Rice beans, steak and a salad',
    total_calories: 1496,
    breakfast_time: '07:00',
    lunch_time: '12:00',
    snack_time: '15:00',
    dinner_time: '18:00',
  },

  {
    id: '3',
    title: 'Fiber Meals',
    breakfast: 'Sweet potatos and chicken',
    lunch: 'Rice, sweet potatoes and chicken',
    snack: 'A fruit',
    dinner: 'Rice beans, steak, salad and a juice',
    total_calories: 1327,
    breakfast_time: '07:00',
    lunch_time: '12:00',
    snack_time: '15:00',
    dinner_time: '18:00'
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
    // disconnect()
  }, []);

  return (
    <MealsContext.Provider value={{
      meals,
      mealsData,
    }}>
      { children}
    </MealsContext.Provider>
  )
}