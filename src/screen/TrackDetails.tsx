import { NavigationProp } from '@react-navigation/core';
import { Router } from '@react-navigation/routers';
import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

interface Props {
  route: any;
}

export function TrackDetails({ route }: Props) {
  const { title,
    breakfast,
    breakfast_time,
    dinner,
    dinner_time,
    snack,
    snack_time,
    lunch,
    lunch_time,
  } = route.params;
  console.log(title);
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

        <View style={styles.userInfo}>
          <Image style={styles.userPhoto}
            source={{ uri: 'https://github.com/cauas1.png' }}
          />
          <View style={styles.rightContainer}>
            <Text>CauaS1</Text>

            <TouchableOpacity style={styles.likeButton}>
              <Text style={{ fontSize: 20 }}>^</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },

  likeButton: {
    width: 60,
    height: 60,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00c49a30',
    borderRadius: 18,

    position: 'absolute',
    bottom: 0,
    right: 70,
  }

});

{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#00c49a" fill-opacity="1" d="M0,128L80,160C160,192,320,256,480,282.7C640,309,800,299,960,261.3C1120,224,1280,160,1360,128L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
</svg> */}