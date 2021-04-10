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

interface ICalories {
  meal_calories: IMeals[];
}

interface CommunityContextData {
  searchInputValue: string;
  meals: IMeals[];
  searchInputFunction: (text: string) => void;
  updateFunction: (value: boolean) => void;
  optionFunction: (value: number) => void;
}

export const CommunityContext = createContext({} as CommunityContextData);

export function CommunityProvider({ children }: Props) {
  const [meals, setMeals] = useState<IMeals[]>([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [update, setUpdate] = useState(false);
  const [options, setOptions] = useState('default');

  useEffect(() => {
    if (searchInputValue === "" && options === "default") {
      getMeals();
      console.log('all')
    } else {
      if (searchInputValue !== "") {
        byName()
        console.log('name')
      } else if (options !== null) {
        byCalories()
        console.log('kcal')
      }
    }


    console.log(options);
    setUpdate(false);
  }, [update])

  // API Features
  async function getMeals() {
    const meals = await api.get('/meals');

    setMeals(meals.data);
  }

  async function byName() {
    const name = await api.get(`/meals/title/${searchInputValue}`);
    setMeals(name.data);
  }

  async function byCalories() {
    const calories = await api.get(`/meals/calories/${options}`);
    const list: IMeals[] = [];
    calories.data.meal_calories.map((data: IMeals) => {
      list.push(data);
    })
    setMeals(list);
  }

  // UseState functions
  function searchInputFunction(text: string) {
    setSearchInputValue(text);
  }

  function updateFunction(value: boolean) {
    setUpdate(value);
  }

  function optionFunction(value: number) {
    if (value == 2) {
      setOptions('asc');
    } else if (value == 3) {
      setOptions('desc');
    }
    console.log("options: " + options);
  }

  return (
    <CommunityContext.Provider value={{
      meals,
      searchInputFunction,
      searchInputValue,
      updateFunction,
      optionFunction
    }} >
      { children}
    </CommunityContext.Provider>
  )
}