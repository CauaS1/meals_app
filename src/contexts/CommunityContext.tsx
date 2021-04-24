import React, { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../service/api";

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

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
  users?: {
    id: number;
    name: string;
    photo: string;
  }
}

interface CommunityContextData {
  searchInputValue: string;
  meals: IMeals[];
  searchInputFunction: (text: string) => void;
  optionFunction: (value: number) => void;
  updatePhoto: (url: string) => void;
}

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 60 * 2,
  enableCache: true,
});


export const CommunityContext = createContext({} as CommunityContextData);

export function CommunityProvider({ children }: Props) {
  const [meals, setMeals] = useState<IMeals[]>([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [options, setOptions] = useState('default');
  const [userPhoto, setUserPhoto] = useState('');

  useEffect(() => {
    if (searchInputValue === "" && options === "default") {
      getMeals();
    } else {
      if (searchInputValue !== "") {
        byName()
      } else if (options !== null) {
        byCalories()
      }
    }

    saveStorage();
  }, [userPhoto])

  async function saveStorage() {
    await api.get('/check').then(userConnected => {

      const user_data = userConnected.data;

      storage.save({
        key: 'userData',
        data: {
          name: user_data.name,
          id: user_data.id,
          email: user_data.email,
          photo: user_data.photo
        },

        expires: 60 * 60 * 2
      });
    });

    global.userStorage  = storage.cache.userData.rawData;
  }

  async function updatePhoto(url: string) {
    const userId = global.userStorage.id;
    setUserPhoto(url);

    await api.put(`/user/update/${userId}`, {
      photo: url
    }).then(() => {
      console.log('photo updated')
      saveStorage();
    }).catch(err => console.log(err));
  }


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
      optionFunction,
      updatePhoto
    }} >
      { children}
    </CommunityContext.Provider>
  )
}