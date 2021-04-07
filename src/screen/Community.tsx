import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList, Image, Dimensions } from 'react-native';
import { Header } from '../components/Header';
import { MealsContext } from '../contexts/MealsContext';

interface Props {
  navigation: StackNavigationHelpers;
}

export function Community({ navigation }: Props) {
  const { meals } = useContext(MealsContext);

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="transparent" barStyle="dark-content" />
      <Header navigation={navigation} />

      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/icons/community.png')}
          style={styles.img}
        />
      </View>

      <Text style={styles.title}>Community Meals</Text>

      <FlatList
        data={meals}
        style={{ marginTop: 10, marginBottom: 10 }}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => ( //Renamed "item" to "meal"
          <TouchableOpacity style={styles.mealsContainer} onPress={() => navigation.navigate('TrackDetails', {
            title: item.title,
            breakfast: item.breakfast,
            breakfast_time: item.breakfast_time,
            lunch: item.lunch,
            lunch_time: item.lunch_time,
            snack: item.snack,
            stack_time: item.snack_time,
            dinner: item.dinner,
            dinner_time: item.dinner_time,
            total_calories: item.total_calories
          })} >
            <Image source={require('../assets/icons/egg.png')} style={styles.icons} />
            <Text style={styles.mealTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },

  //img container
  imgContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: Dimensions.get('screen').width / 1.5,
    height: Dimensions.get('screen').width / 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center'
  },

  // meals container
  mealsContainer: {
    flex: 1,
    height: 100,
    borderRadius: 10,

    backgroundColor: '#00c49a60',

    marginBottom: 5,
    marginLeft: 2.5,
    marginRight: 2.5,

    paddingRight: 10,
    paddingLeft: 10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    overflow: 'hidden'
  },
  mealTitle: {
    width: '50%',
  },
  icons: {
    width: 64,
    height: 64,
  }
});

