import React, { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../service/api";

interface Props {
  children: ReactNode;
}

interface IMeals {
  id: string;
  title: string;
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
  total_calories: string;
  breakfast_time: Date;
  lunch_time: Date;
  snack_time: Date;
  dinner_time: Date;
}

interface CommunityContextData {
  searchInputValue: string;
  meals: IMeals[];
  searchInputFunction: (text: string) => void;
  updateFunction: (value: boolean) => void;
}

export const CommunityContext = createContext({} as CommunityContextData);

export function CommunityProvider({ children }: Props) {
  const [meals, setMeals] = useState<IMeals[]>([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getMeals();
    setUpdate(false);
    console.log('Updated!!');

  }, [update])

  async function getMeals() {
    const meals = await api.get('/meals');

    setMeals(meals.data);
  }

  async function byName() {
    const name = await api.get(`/meals/title/${searchInputValue}`);
  }

  function searchInputFunction(text: string) {
    setSearchInputValue(text);
  }

  function updateFunction(value: boolean) {
    setUpdate(value);
  }

  return (
    <CommunityContext.Provider value={{
      meals,
      searchInputFunction,
      searchInputValue,
      updateFunction
    }} >
      { children }
    </CommunityContext.Provider>

  )
}