import React, { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "../service/api";

interface Props {
  children: ReactNode;
}

interface MealsContextData {
  meals: IMeals[];
  test: string;
  getMeals: () => void;
}

interface IMeals {
  id: string;
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
  breakfast_time: Date;
  lunch_time: Date;
  snack_time: Date;
  dinner_time: Date
}

export const MealsContext = createContext({} as MealsContextData);

export function MealsProvider({ children }: Props) {
  const [meals, setMeals] = useState<IMeals[]>([]);
  const test = 'test here bro!'

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
      test,
      getMeals
    }}>
      { children }
    </MealsContext.Provider>
  )
}