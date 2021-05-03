import React, { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../service/api";

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

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
  rated: number;
  users?: {
    id: number;
    name: string;
    photo: string;
  }
}

interface IUser {
  email: string;
  id: string;
  name: string;
  photo: string;
  storage?: Storage;
}

interface CommunityContextData {
  searchInputValue: string;
  meals: IMeals[];
  user: IUser | undefined;
  userPhoto: string;
  searchInputFunction: (text: string) => void;
  optionFunction: (value: number) => void;
  updatePhoto: (url: string) => void;
  logout: () => void;
  loadUser: () => void;
  saveStorage: () => void;
}

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 60 * 60 * 2,
  enableCache: true,
});

export const CommunityContext = createContext({} as CommunityContextData);

export function CommunityProvider({ children }: Props) {
  const [meals, setMeals] = useState<IMeals[]>([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [options, setOptions] = useState('default');

  const [userPhoto, setUserPhoto] = useState('');
  const [user, setUser] = useState();
  const [saveUser, setSaveUser] = useState<IUser>();

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
  }, [searchInputValue, options]);


  async function saveStorage() {
    await api.get('/check').then(async userConnected => {
      const user_data: IUser = userConnected.data;
      await storage.save({
        key: 'userData',
        id: user_data.id,
        data: {
          name: user_data.name,
          id: user_data.id,
          email: user_data.email,
          photo: user_data.photo
        },

        expires: 60 * 60 * 2
      });

      setTimeout(() => {
        setSaveUser(user_data);
      }, 500)
    });
  }

  async function loadUser() {
    await storage.load({
      key: 'userData',
      id: saveUser?.id,
    }).then(data => {
      setUser(data);
    }).catch((err: Error) => console.log(err.message));
  }

  async function logout() {
    await api.get('/logout').then(() => {
      storage.save({
        key: 'userData',
        id: undefined,
        data: {
          name: undefined,
          id: undefined,
          email: undefined,
          photo: undefined
        }
      }).then(() => console.log('Logged out'))
    })
  }

  async function updatePhoto(url: string) {
    await api.put(`/user/update/${saveUser?.id}`, {
      photo: url
    }).then(() => {
      storage.save({
        key: 'userData',
        data: {
          photo: url
        }
      });
      setUserPhoto(url);
    }).catch(err => console.log('not changed: ' + err));
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
      updatePhoto,
      logout,
      user,
      loadUser,
      userPhoto,
      saveStorage
    }} >
      { children}
    </CommunityContext.Provider>
  )
}