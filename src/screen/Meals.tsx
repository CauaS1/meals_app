import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types';
import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, StatusBar, ScrollView, Dimensions } from 'react-native';

import * as Notifications from 'expo-notifications';
import { MealsContext } from '../contexts/MealsContext';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

interface Props {
  navigation: StackNavigationHelpers;
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'You got an email! 📬',
      body: "You need to get rid of chocolates",
      data: { data: new Date().setSeconds(5) }
    },
    trigger: { seconds: 2 }
  })
}

export function Meals({ navigation }: Props) {
  const { meals, mealsData } = useContext(MealsContext);

  useEffect(() => {
    // schedulePushNotification();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={false} />


      <View style={styles.contentList}>
        <View style={styles.titleHeaders} >
          <Text style={styles.title}>Default Tracks</Text>
          <Text style={styles.seeAllBtnText}>Move to the sides</Text>
        </View>

        <FlatList
          data={mealsData}
          style={{ marginBottom: 20 }}
          horizontal
          keyExtractor={meals => meals.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.mealsContainer} onPress={() => {
              navigation.navigate('TrackDetails', {
                title: item.title,
                breakfast: item.breakfast,
                breakfast_time: item.breakfast_time,
                lunch: item.lunch,
                lunch_time: item.lunch_time,
                snack: item.snack,
                stack_time: item.snack_time,
                dinner: item.dinner,
                dinner_time: item.dinner_time,
                total_calories: item.total_calories,
                appSugestion: true,
              })
            }} >
              <Image
                source={require('../assets/icons/egg.png')}
                style={styles.icons}
              />
              <View style={styles.info}>
                <Text style={styles.mealTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <View style={styles.titleHeaders} >
          <Text style={styles.title}>Community Tracks</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Community')} >
            <Text style={styles.seeAllBtnText}>See All</Text>
          </TouchableOpacity>
        </View>


        <FlatList
          data={meals}
          numColumns={2}
          style={{ marginBottom: 20 }}
          keyExtractor={meals => meals.id}
          renderItem={({ item, index }) => (
            <>
              {(index <= 3) ? (
                <TouchableOpacity style={[styles.mealsContainer, styles.smallMealContainer,]}
                  onPress={() => {
                    navigation.navigate('TrackDetails', {
                      title: item.title,
                      breakfast: item.breakfast,
                      breakfast_time: item.breakfast_time,
                      lunch: item.lunch,
                      lunch_time: item.lunch_time,
                      snack: item.snack,
                      stack_time: item.snack_time,
                      dinner: item.dinner,
                      dinner_time: item.dinner_time,
                      total_calories: item.total_calories,
                      rated: item.rated,
                      users: item.users,
                      appSuggestion: false
                    })
                  }}
                >
                  <Image source={require('../assets/icons/meal.png')} style={styles.icons} />
                  <View style={styles.info}>
                    <Text style={styles.mealTitle}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >{item.title}</Text>
                  </View>
                </TouchableOpacity>
              ) : null}

            </>
          )}
        />
      </View>

      <TouchableOpacity style={styles.createMeal} onPress={() => navigation.navigate('Form')} >
        <MaterialIcons name="create" size={35} color="#333" />
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,

    justifyContent: 'space-between'

  },
  contentList: {
    width: '100%'
  },

  // Default Tracks
  title: {
    fontSize: 25,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  //TItle headers
  titleHeaders: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },

  mealsContainer: {
    width: Dimensions.get('screen').width - 30,
    // width: '100%',
    height: 100,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#00c49a60',

    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,

    overflow: 'hidden'
  },
  icons: {
    width: 64,
    height: 64
  },
  info: {
    width: '100%',
    marginLeft: 10,
  },
  mealTitle: {
    width: 70,
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold'
  },

  // Community Tracks
  smallMealContainer: {
    flex: 1,
    marginRight: 0,
    margin: 5,
  },

  // Buttons
  seeAllBtnText: {
    color: '#333'
  },

  createMeal: {
    width: '100%',
    height: 75,
    backgroundColor: '#00c49a40',
    borderRadius: 10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});

