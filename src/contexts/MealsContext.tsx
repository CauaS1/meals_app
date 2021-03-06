import React, { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "../service/api";

import * as Notifications from 'expo-notifications';

interface Props {
  children: ReactNode;
}

interface MealsContextData {
  meals: IMeals[];
  mealsData: IDefaultMeals[];
  notificationSchedule: (hour: number, minutes: number) => void;
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
  total_calories: number;
  breakfast_time: Date;
  lunch_time: Date;
  snack_time: Date;
  dinner_time: Date;
  users: IUser[];
}

interface IDefaultMeals {
  id: string;
  title: string;
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
  total_calories: number;
  breakfast_time: string;
  lunch_time: string;
  snack_time: string;
  dinner_time: string;
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
    breakfast_time: "07:30:00",
    lunch_time: "12:00:00",
    snack_time: "15:00:00",
    dinner_time: "18:00:00",
  },

  {
    id: '2',
    title: 'Medium Meals',
    breakfast: 'Cereal',
    lunch: 'Rice, beans, salad, potato and a chicken',
    snack: 'Sandwich',
    dinner: 'Rice beans, steak and a salad',
    total_calories: 1496,
    breakfast_time: "07:30:00",
    lunch_time: "12:00:00",
    snack_time: "15:00:00",
    dinner_time: "18:00:00",
  },

  {
    id: '3',
    title: 'Fiber Meals',
    breakfast: 'Sweet potatoes and chicken',
    lunch: 'Rice, sweet potatoes and chicken',
    snack: 'A fruit',
    dinner: 'Rice beans, steak, salad and a juice',
    total_calories: 1327,
    breakfast_time: "07:30:00",
    lunch_time: "12:00:00",
    snack_time: "15:00:00",
    dinner_time: "18:00:00",
  }
]

export const MealsContext = createContext({} as MealsContextData);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldShowAlert: true,
    shouldSetBadge: false
  })
})

export function MealsProvider({ children }: Props) {
  const [meals, setMeals] = useState<IMeals[]>([]);

  async function getMeals() {
    const meals = await api.get('/meals');
    setMeals(meals.data);
  }

  async function notificationSchedule(hour: number, minutes: number) {
    const trigger = new Date(Date.now() + 60 * 60 * 1000);
    trigger.setHours(hour);
    trigger.setMinutes(minutes);
  
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `It's time for your meal`,
        body: `Its 12PM, Its time for you dinner`,
      },
      trigger
    })
  }

  useEffect(() => {
    getMeals();
  }, []);

  return (
    <MealsContext.Provider value={{
      meals,
      mealsData,
      notificationSchedule
    }}>
      { children}
    </MealsContext.Provider>
  )
}