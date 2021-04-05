import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  navigation: StackNavigationHelpers;
}

export function Header({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.button}
        activeOpacity={0.8}
        underlayColor={'#cacace50'}
        onPress={() => navigation.goBack() }
      >
      <AntDesign name="left" size={24} color="#00c49a" />
      </TouchableHighlight>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,

    borderBottomWidth: 0.5,
    borderColor: '#cacace',

    paddingLeft: 5,
    paddingRight: 5
  },
  button: {
    width: 50,
    height: 50,

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  }
});

