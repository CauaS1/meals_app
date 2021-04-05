import { StackHeaderTitleProps, StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList } from 'react-native';
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

      <FlatList
        data={meals}
        keyExtractor={item => item.id}
        renderItem={({ item:meal }) => ( //Renamed "item" to "meal"
          <TouchableOpacity>
            <Text>{meal.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

