import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, Dimensions, TextInput, Alert, Button, TouchableOpacity, ScrollView } from 'react-native';
import DatePickerModal from 'react-native-modal-datetime-picker';

import moment from 'moment';
import Storage from 'react-native-storage';
import { api } from '../service/api';
import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types';

interface Props {
  navigation: StackNavigationHelpers;
}

export function Form({ navigation }: Props) {
  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [snack, setSnack] = useState('');
  const [dinner, setDinner] = useState('');

  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  const [breakfastTime, setBreakfastTime] = useState('');
  const [lunchTime, setLunchTime] = useState('');
  const [snackTime, setSnackTime] = useState('');
  const [dinnerTime, setDinnerTime] = useState('');

  const [category, setCategory] = useState('');

  useEffect(() => {
    console.log('-----')
    console.log(global.userStorage)
    console.log('-----')
  }, [])

  function checkCategory(time: Date, category: string) {
    const formattedTime = moment(time).format('h:mm');

    switch (category) {
      case 'breakfast':
        setBreakfastTime(formattedTime);
        break;
      case 'lunch':
        setLunchTime(formattedTime);
        break;
      case 'snack':
        setSnackTime(formattedTime);
        break;
      case 'dinner':
        setDinnerTime(formattedTime);
        break;
      default:
        console.log('There was an error!');
        break;
    }
  }

  function hidePicker() {
    setIsTimePickerVisible(false);
  }

  function enablePicker() {
    setIsTimePickerVisible(true)
  }

  async function createMeals() {
    await api.post('/meals', {
      title: title,
      total_calories: calories,
      breakfast: breakfast,
      lunch: lunch,
      snack: snack,
      dinner: dinner,
      rated: 0,

      breakfast_time: breakfastTime,
      lunch_time: lunchTime,
      snack_time: snackTime,
      dinner_time: dinnerTime,
      users: global.userStorage

    
    }).then(() => {
      console.log('Success!');
      setTitle('');
      setCalories('');
      setBreakfast('');
      setLunch('');
      setSnack('');
      setDinner('');
      
      setBreakfastTime('');
      setLunchTime('');
      setSnackTime('');
      setDinnerTime('');

      navigation.navigate('Home');

    }).catch(err => {
      console.log('Error:' + err);
    })
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#fff" barStyle="dark-content" />

      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/icons/form_img.png')}
          style={styles.topImage}
        />
      </View>

      <Text style={styles.title}>Create your meal plan</Text>

      <View style={styles.form}>
        <View style={{ width: '100%' }}>
          <View style={styles.headerForm} >
            <TextInput placeholder="Title" style={[styles.headerInputs, { marginRight: 2 }]}
              value={title}
              onChangeText={text => setTitle(text)}
            />
            <TextInput placeholder="Total calories" style={[styles.headerInputs, { marginLeft: 2 }]}
              value={calories}
              onChangeText={text => setCalories(text)}
            />
          </View>

          <View>
            <TextInput placeholder="Breakfast" style={[styles.headerInputs, styles.middleInputs]}
              value={breakfast}
              onChangeText={text => setBreakfast(text)}
            />
            <TextInput placeholder="Lunch" style={[styles.headerInputs, styles.middleInputs]}
              value={lunch}
              onChangeText={text => setLunch(text)}
            />
            <TextInput placeholder="Snack" style={[styles.headerInputs, styles.middleInputs]}
              value={snack}
              onChangeText={text => setSnack(text)}
            />
            <TextInput placeholder="Dinner" style={[styles.headerInputs, styles.middleInputs]}
              value={dinner}
              onChangeText={text => setDinner(text)}
            />
          </View>

          <View style={styles.hoursForm}>
            <TouchableOpacity style={[styles.setHourButtonStyle, { marginRight: 2 }]} onPress={() => {
              enablePicker();
              setCategory('breakfast');
            }} >
              {!breakfastTime ? (
                <Text style={styles.hourText}>Breakfast Time</Text>
              ) : (
                <Text style={[styles.hourText, { color: '#000' }]}>{breakfastTime}</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={[styles.setHourButtonStyle, { marginLeft: 2 }]} onPress={() => {
              enablePicker();
              setCategory('lunch');
            }} >
              {!lunchTime ? (
                <Text style={styles.hourText}>Lunch Time</Text>
              ) : (
                <Text style={[styles.hourText, { color: '#000' }]}>{lunchTime}</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.hoursForm}>
            <TouchableOpacity style={[styles.setHourButtonStyle, { marginRight: 2 }]} onPress={() => {
              enablePicker();
              setCategory('snack');
            }}>
              {!snackTime ? (
                <Text style={styles.hourText}>Snack Time</Text>
              ) : (
                <Text style={[styles.hourText, { color: '#000' }]}>{snackTime}</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={[styles.setHourButtonStyle, { marginLeft: 2 }]} onPress={() => {
              enablePicker();
              setCategory('dinner');
            }}>
              {!dinnerTime ? (
                <Text style={styles.hourText}>Dinner Time</Text>
              ) : (
                <Text style={[styles.hourText, { color: '#000' }]}>{dinnerTime}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={createMeals} >
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>

      </View>

      <DatePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={time => {
          hidePicker();
          checkCategory(time, category);
        }}
        onCancel={hidePicker}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: 10,
  },

  //Image
  imgContainer: {
    width: '100%',
    alignItems: 'center',
  },

  topImage: {
    width: Dimensions.get('screen').width / 1.5,
    height: Dimensions.get('screen').width / 1.5
  },

  //Form
  title: {
    fontSize: 25,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    flex: 1,
    marginTop: 15,
    padding: 10,
    justifyContent: 'space-between'
  },
  headerForm: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 4
  },

  hoursForm: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 4
  },


  headerInputs: {
    flex: 1,
    height: 45,
    paddingLeft: 10,

    borderWidth: 1,
    borderColor: '#00c49a',
    borderRadius: 5,
  },

  middleInputs: {
    flex: 0,
    width: '100%',
    height: 45,

    marginLeft: 0,
    marginRight: 0,
    marginBottom: 4
  },

  setHourButtonStyle: {
    flex: 1,
    height: 45,

    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#00c49a',

    alignItems: 'center',
    justifyContent: 'center',
  },
  hourText: {
    color: '#aaa',
  },
  button: {
    width: '100%',
    height: 40,
    marginTop: 20,
    backgroundColor: '#00c49a',

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold'
  }


})
