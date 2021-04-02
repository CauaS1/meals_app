import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types';
import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, StatusBar, ScrollView, Dimensions } from 'react-native';

import { MealsContext } from '../contexts/MealsContext';

interface Props {
  navigation: StackNavigationHelpers;
}

export function Meals({ navigation }: Props) {
  const { meals } = useContext(MealsContext);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={false} />


      <View style={styles.contentList}>
        <Text style={styles.title}>Default Tracks</Text>

        <FlatList
          data={meals}
          style={{ marginBottom: 20, }}
          horizontal
          keyExtractor={meals => meals.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.mealsContainer} onPress={() => navigation.navigate('TrackDetails')} >
              <Image
                source={require('../assets/icons/egg.png')}
                style={styles.icons}
              />
              <View style={styles.info}>
                <Text style={styles.infoText}>Light Meal</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.title}>Community Tracks</Text>

      </View>
    </View>
  )
}

/*
LATER USE THE EXTENDED STYLESHEET
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,

  },
  contentList: {
    width: '100%'
  },

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
  infoText: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold'
  }
});

