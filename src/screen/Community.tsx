import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types';
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList, Image, Dimensions, TextInput } from 'react-native';
import { Header } from '../components/Header';

import Select from 'react-native-select-two';
import Feather from 'react-native-vector-icons/Feather';

import { CommunityContext } from '../contexts/CommunityContext';
import { updateLocale } from 'moment';

interface Props {
  navigation: StackNavigationHelpers;
}

const options = [
  { id: 1, name: "Default", checked: true }, // set default checked for render option item
  { id: 2, name: "Ascending" },
  { id: 3, name: "Descending" }
]

export function Community({ navigation }: Props) {
  const { meals, searchInputFunction, searchInputValue, optionFunction } = useContext(CommunityContext);

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

      <View style={styles.searchContainer}>
        <TextInput placeholder="Search by name" style={styles.input}
          value={searchInputValue}
          onChangeText={text => searchInputFunction(text)}
        />

        <Select
          isSelectSingle
          modalStyle={{ maxHeight: '40%' }}
          showSearchBox={false}
          style={{ borderRadius: 5, height: 25, flex: 1 }}
          popupTitle="Select the order"
          title="Select the order"
          data={options}
          cancelButtonText="Cancel"
          selectButtonText="Select"
          colorTheme="#00c49a"
          onSelect={(data: number) => {
            optionFunction(data)
          }}
        />

        <TouchableOpacity style={styles.searchButton} onPress={() => {
          searchInputFunction(searchInputValue);
        }} >
          <Feather name="chevron-right" color="#fff" size={23} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={meals}
        style={{ marginTop: 10, marginBottom: 10 }}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.mealsContainer} onPress={() => navigation.navigate('TrackDetails', {
            title: item.title,
            breakfast: item.breakfast,
            breakfast_time: item.breakfast_time,
            lunch: item.lunch,
            lunch_time: item.lunch_time,
            snack: item.snack,
            snack_time: item.snack_time,
            dinner: item.dinner,
            dinner_time: item.dinner_time,
            total_calories: item.total_calories,
            users: {
              photo: 'undefined'
            }
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
    textAlign: 'center',

    marginTop: 5,
    marginBottom: 5
  },

  //Seach container
  searchContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',

    alignItems: 'center'
  },

  input: {
    flex: 2,
    height: 45,

    paddingLeft: 10,
    marginRight: 4,

    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cacace'
  },

  searchButton: {
    width: 50,
    height: 45,
    borderRadius: 5,
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00c49a'
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

