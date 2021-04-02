import React, { createContext, ReactNode, useState, useEffect } from "react";

interface Props {
  children: ReactNode;
}

interface MealsContextData {
  meals: IMeals[];
  test: string;
}

interface IMeals {
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

  return (
    <MealsContext.Provider value={{
      meals,
      test
    }}>
      { children }
    </MealsContext.Provider>
  )
}