import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types';
import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, StatusBar, ScrollView, Dimensions } from 'react-native';

import Constant from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { MealsContext } from '../contexts/MealsContext';

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
        <Text style={styles.title}>Default Tracks</Text>

        <FlatList
          data={mealsData}
          style={{ marginBottom: 20 }}
          horizontal
          keyExtractor={meals => meals.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.mealsContainer} onPress={() => navigation.navigate('TrackDetails')} >
              <Image
                source={require('../assets/icons/egg.png')}
                style={styles.icons}
              />
              <View style={styles.info}>
                <Text style={styles.mealTitle}>Light Meal</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.title}>Community Tracks</Text>

        <FlatList
          data={meals}
          numColumns={2}
          style={{ marginBottom: 20, }}
          keyExtractor={meals => meals.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.mealsContainer, styles.smallMealContainer,]}>
              <Image source={require('../assets/icons/meal.png')} style={styles.icons} />
              <View style={styles.info}>
                <Text style={styles.mealTitle}>Fiber Plan</Text>
              </View>
            </TouchableOpacity>
          )}
        />

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,

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

  mealsContainer: {
    width: Dimensions.get('screen').width / 1.2,
    // width: '100%',
    height: 100,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#ff304f50',

    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
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
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold'
  },

  // Community Tracks
  smallMealContainer: {
    flex: 1,
    marginRight: 0,
    margin: 5,
  }
});

