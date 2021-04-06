import React, { useState } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, Dimensions, TextInput, Alert, Button, TouchableOpacity } from 'react-native';
import DatePickerModal from 'react-native-modal-datetime-picker';

import moment from 'moment';

export function Form() {
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [breakfastTime, setBreakfastTime] = useState('');
  const [lunchTime, setLunchTime] = useState('');
  const [snackTime, setSnackTime] = useState('');
  const [dinnerTime, setDinnerTime] = useState('');



  function hidePicker(time: Date) {
    setIsTimePickerVisible(false);

    console.log(moment(time).format('h:mm a'))
  }

  function enablePicker() {
    setIsTimePickerVisible(true)
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#fff" barStyle="dark-content" />

      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/icons/form_img.png')}
          style={styles.topImage}
        />
      </View>

      <Text style={styles.title}>Create your meal plan</Text>

      <View style={styles.form}>
        <View style={styles.headerForm} >
          <TextInput placeholder="Title" style={[styles.headerInputs, { marginRight: 2 }]} />
          <TextInput placeholder="Caloreis" style={[styles.headerInputs, { marginLeft: 2 }]} />
        </View>

        <View>
          <TextInput placeholder="Breakfast" style={[styles.headerInputs, styles.middleInputs]} />
          <TextInput placeholder="Lunch" style={[styles.headerInputs, styles.middleInputs]} />
          <TextInput placeholder="Snack" style={[styles.headerInputs, styles.middleInputs]} />
          <TextInput placeholder="Dinner" style={[styles.headerInputs, styles.middleInputs]} />
        </View>

        <View style={styles.hoursForm}>
          <TouchableOpacity style={[styles.setHourButtonStyle, { marginRight: 2 }]}>
            {!breakfastTime ? (
              <Text style={styles.hourText}>Breakfast Time</Text>
            ) : (
              <Text style={[styles.hourText, { color: '#000' }]}>{breakfastTime}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.setHourButtonStyle, { marginLeft: 2 }]}>
            {!lunchTime ? (
              <Text style={styles.hourText}>Lunch Time</Text>
            ) : (
              <Text style={[styles.hourText, { color: '#000' }]}>{lunchTime}</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.hoursForm}>
          <TouchableOpacity style={[styles.setHourButtonStyle, { marginRight: 2 }]}>
            {!snackTime ? (
              <Text style={styles.hourText}>Snack Time</Text>
            ) : (
              <Text style={[styles.hourText, { color: '#000' }]}>{snackTime}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.setHourButtonStyle, { marginLeft: 2 }]}>
            {!dinnerTime ? (
              <Text style={styles.hourText}>Dinner Time</Text>
            ) : (
              <Text style={[styles.hourText, { color: '#000' }]}>{dinnerTime}</Text>
            )}
          </TouchableOpacity>
        </View>

      </View>

      <Text>{breakfastTime}</Text>

      <Button title="eae" color="royalblue" onPress={enablePicker} />

      <DatePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={time => {
          hidePicker(time);
        }}
        onCancel={hidePicker}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
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
    textAlign: 'center'
  },
  form: {
    flex: 1,
    marginTop: 15,
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

  }


})
