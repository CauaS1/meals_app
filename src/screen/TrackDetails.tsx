import AsyncStorage from '@react-native-community/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

import Storage from 'react-native-storage';
import Feather from 'react-native-vector-icons/Feather';
import { MealsContext } from '../contexts/MealsContext';
import { api } from '../service/api';

interface Props {
  route: any;
}

interface RouteProps {
  meal_id: number;
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
  appSuggestion: boolean;
  rated: number;
  users: {
    id: number;
    name: string;
    photo: string;
  };
}

export function TrackDetails({ route }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const { meal_id,
    title,
    breakfast,
    breakfast_time,
    dinner,
    dinner_time,
    snack,
    snack_time,
    lunch,
    lunch_time,
    users,
    rated,
    appSuggestion
  }: RouteProps = route.params;

  const { notificationSchedule } = useContext(MealsContext);

  async function like() {
    await api.put(`/meal/like/${meal_id}`).then(() => {
      setIsLiked(true);
    }).catch(err => {
      console.log('Error with Like system * ' + err)
    })
  }

  async function unlike() {
    await api.put(`/meal/unlike/${meal_id}`).then(() => {
      setIsLiked(false);
    }).catch(err => console.log('Error with unlike system * ' + err))
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Image
          source={require('../assets/icons/cook_hat.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.mealTitle}>{title}</Text>

      <View style={styles.info}>
        <View>
          <View style={styles.mealDetails}>
            <Text>{breakfast}</Text>
            <Text>{breakfast_time}</Text>
          </View>

          <View style={styles.mealDetails2}>
            <Text>{lunch}</Text>
            <Text>{lunch_time}</Text>
          </View>

          <View style={styles.mealDetails}>
            <Text>{snack}</Text>
            <Text>{snack_time}</Text>
          </View>

          <View style={styles.mealDetails2}>
            <Text>{dinner}</Text>
            <Text>{dinner_time}</Text>
          </View>
        </View>

        {!appSuggestion ? (
          <View style={styles.userInfo}>
            { users.photo === 'undefined' ? (
              <View style={[styles.userPhoto, { backgroundColor: '#f1f1f1', alignItems: 'center', justifyContent: 'center' }]}>
                <Feather name="user" color="#00c49a70" size={28} />
              </View>
            ) : (
              <Image style={styles.userPhoto}
                source={{ uri: users.photo }}
              />
            )}

            <View style={styles.rightContainer}>
              <View>
                <Text style={styles.userName}>{users.name}</Text>
                <Text style={styles.userRate}>{rated} Likes</Text>
              </View>

              {!isLiked ? (
                <TouchableOpacity style={styles.likeButton} onPress={like}>
                  <Feather name="chevron-up" size={25} color="#fff" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={[styles.likeButton, { backgroundColor: '#f1f1f1' }]} onPress={unlike}>
                  <Feather name="chevron-down" size={25} color="#00c49a70" />
                </TouchableOpacity>
              )}

            </View>
          </View>
        ) : null}

      </View>

      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: 40, }}>
        <TouchableOpacity style={styles.setPlanButton} onPress={() => notificationSchedule(5, 0)} >
          <Text style={{ color: '#00c49a', fontWeight: '700' }}>Set this Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: Dimensions.get('screen').width / 1.7,
    height: Dimensions.get('screen').width / 1.7,
  },

  mealTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  // Info details
  info: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    justifyContent: 'space-around'
  },

  mealDetails: {
    width: '100%',
    height: 40,
    borderRadius: 5,

    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingLeft: 10,
    paddingRight: 10,

    backgroundColor: '#00c49a70',
    alignItems: 'center',
    marginBottom: 5
  },
  mealDetails2: {
    width: '100%',
    height: 40,
    borderRadius: 5,

    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingLeft: 10,
    paddingRight: 10,

    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    marginBottom: 5
  },

  // User Info
  userInfo: {
    width: '100%',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 18,
  },
  rightContainer: {
    width: '100%',
    marginLeft: 10,

    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },

  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00c49a70'
  },

  userRate: {
    fontSize: 14,
    color: '#333'
  },

  likeButton: {
    width: 60,
    height: 60,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00c49a70',
    borderRadius: 18,

    position: 'absolute',
    bottom: 0,
    right: 70,
  },
  setPlanButton: {
    width: '60%',
    height: 25,
    alignItems: 'center',
    justifyContent: 'center'
  }

});

{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#00c49a" fill-opacity="1" d="M0,128L80,160C160,192,320,256,480,282.7C640,309,800,299,960,261.3C1120,224,1280,160,1360,128L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
</svg> */}