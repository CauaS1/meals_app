import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity, Dimensions } from 'react-native';

interface Props {
  navigation: StackNavigationHelpers;
}

export function Initial({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#fff" barStyle="dark-content" />
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Image
          source={require('../assets/icons/chef.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Meals Plan</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 40,
    paddingBottom: 40,

    alignItems: 'center',
    justifyContent: 'space-between'
  },
  image: {
    width: Dimensions.get('screen').width / 1.5,
    height: Dimensions.get('screen').width / 1.7,
  },
  title: {
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  button: {
    width: '48%',
    height: 50,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,
    backgroundColor: '#00c49a'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  }

});
