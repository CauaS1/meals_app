import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput } from 'react-native';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#fff" barStyle="dark-content" />
      <Text style={styles.title}>Register</Text>
      <Text style={styles.caption}>Create an account to have access</Text>

      <View style={styles.form}>
        <TextInput placeholder="Email" style={styles.inputs}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput placeholder="Password" style={styles.inputs} 
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.button}>
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

