import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';

export function Profile() {
  const [userInfo, setUserInfo] = useState<NodeJS.Global>();

  const userData = global.userStorage;

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#fff" barStyle="dark-content" />
      { userData.photo === 'not setted' ? (
        <Image source={require('../assets/icons/default_user.png')} style={styles.img} />
      ) : (
        <Image source={{ uri: userData.photo }} style={styles.img} />
      )}
      <Text>{userData.name}</Text>
      <Text>{userData.email}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  img: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    borderRadius: 200
  }
})
