import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput } from 'react-native';
import { api } from '../service/api';

interface Props {
  navigation: StackNavigationHelpers
}

export function Register({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function register() {
    await api.post('/register', {
      email: email,
      password: password
    }).then(() => {
      console.log('Registered!');
      navigation.navigate('Login');
    }).catch(err => console.log('Error: ' + err))
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#fff" barStyle="dark-content" />
      <Text style={styles.title}>Register</Text>
      <Text style={styles.caption}>Create an account to have access</Text>

      <View style={styles.form}>
        <TextInput placeholder="Email" style={styles.inputs}
          autoCapitalize="none"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput placeholder="Password" style={styles.inputs} 
          value={password}
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.btnText}>Create account</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold'
  },
  caption: {
    fontSize: 15,
    color: '#aaa'
  },

  form: {
    width: '100%',
  },
  inputs: {
    width: '100%',
    height: 50,

    paddingTop: 10,
    marginBottom: 5,
    fontSize: 15,

    borderBottomWidth: 1,
    borderColor: '#00c49a',
  },

  button: {
    width: '80%',
    height: 45,
    marginTop: 20,
    backgroundColor: '#00c49a',

    borderRadius: 5,
    alignItems: 'center',
    justifyContent :'center'
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

