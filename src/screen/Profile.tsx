import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, StatusBar, FlatList, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';


import Feather from 'react-native-vector-icons/Feather';
import { WavyHeader } from '../components/WavyHeader';
import { api } from '../service/api';
import { CommunityContext } from '../contexts/CommunityContext';
import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types';

interface Props {
  navigation: StackNavigationHelpers;
}

interface NavigationProps {

}

export function Profile({ navigation }: Props) {
  const { updatePhoto, meals } = useContext(CommunityContext);
  const userData = global.userStorage;


  async function setPhoto() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Access Denied!', 'You must give access to set a profile photo');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (!result.cancelled) {
      updatePhoto(result.uri);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#00c4a9" barStyle="light-content" />
      <WavyHeader customHeight={200} customTop={170} />

      <View style={styles.imgContainer}>
        {userData.photo === "undefined" ? (
          <>
            <View style={[styles.img, { backgroundColor: '#f1f1f1', alignItems: 'center', justifyContent: 'center' }]}>
              <Feather name="user" color="#00c49a" size={60} />
            </View>
            <TouchableOpacity style={styles.addPhotoButton} onPress={() => setPhoto()}>
              <Feather name='plus' color="#f1f1f1" size={20} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Image source={{ uri: userData.photo }} style={styles.img} />
            <TouchableOpacity style={styles.addPhotoButton} onPress={() => setPhoto()}>

              <Feather name='plus' color="#f1f1f1" size={20} />
            </TouchableOpacity>
          </>
        )}

      </View>
      <Text style={styles.name}>{userData.name}</Text>

      <View style={styles.mealsHeader}>
        <Text style={styles.headerText}>User's meals</Text>
      </View>

      <View style={styles.mealsCreated}>
        <FlatList
          style={{ width: '100%', }}
          data={meals}
          keyExtractor={item => item.title}
          renderItem={({ item }) => (
            <>
              {console.log(item.snack_time)}
              {item.users?.id === userData.id ? (
                <TouchableOpacity style={styles.mealsContent} onPress={() => navigation.navigate('TrackDetails', {
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
                  users: item.users
                })}>
                  <Text style={styles.mealName}>{item.title}</Text>
                </TouchableOpacity>
              ) : null}
            </>
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
  },

  imgContainer: {
    width: '100%',
    alignItems: 'center'
  },
  img: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 1.4,

    borderTopRightRadius: 80,
    borderBottomLeftRadius: 80,
    borderRadius: 20,
    marginTop: 20,

    position: 'relative'
  },
  addPhotoButton: {
    width: 50,
    height: 60,
    backgroundColor: '#00c49a',

    borderRadius: 5,
    position: 'absolute',
    right: '23%',
    bottom: -10,

    alignItems: 'center',
    justifyContent: 'center',
  },

  subTitle: {
    textAlign: 'left'
  },

  name: {
    textAlign: 'center',
    marginTop: 25,
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold'
  },

  mealsHeader: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,

    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 5
  },
  headerText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#444'
  },

  mealsCreated: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#cacace80',
    padding: 15,
    alignItems: 'center'
  },

  mealsContent: {
    width: '100%',
    height: 70,
    borderRadius: 5,
    marginBottom: 10,

    paddingLeft: 20,
    paddingRight: 20,

    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },
  mealName: {
    fontSize: 16,
    color: '#444'
  }

})
