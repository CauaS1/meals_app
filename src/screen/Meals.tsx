import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, ScrollView, Dimensions } from 'react-native';

import { MealsContext } from '../contexts/MealsContext';

interface Props {
  navigation: StackNavigationHelpers;
}

export function Meals({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={false} />

      <Text style={styles.title}>Default Tracks</Text>
      <ScrollView style={styles.contentList} horizontal  >

        <TouchableOpacity style={styles.mealsContainer} onPress={() => navigation.navigate('TrackDetails')} >
          <Image
            source={require('../assets/icons/egg.png')}
            style={styles.icons}
          />
          <View style={styles.info}>
            <Text style={styles.infoText}>Light Meal</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.mealsContainer}>
          <Image
            source={require('../assets/icons/meal.png')}
            style={styles.icons}
          />
          <View style={styles.info}>
            <Text style={styles.infoText}>Medium Meal</Text>
          </View>
        </View>

        <View style={styles.mealsContainer}>
          <Image
            source={require('../assets/icons/meal.png')}
            style={styles.icons}
          />
          <View style={styles.info}>
            <Text style={styles.infoText}>Medium Meal</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

/*
LATER USE THE EXTENDED STYLESHEET
*/

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 15, 

  },
  contentList: {
    // marginTop: 15,
    // padding: 15,
    // height: 400,
  },

  title: {
    fontSize: 25,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  mealsContainer: {
    width: Dimensions.get('screen').width / 1.2,
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
  infoText: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold'
  }
});

