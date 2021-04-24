import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types';
import React, { ReactNode, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import { WavyHeader } from '../components/WavyHeader';
import { api } from '../service/api';

const heightScreen = Dimensions.get('window').height;

interface Props {
  navigation: StackNavigationHelpers;
}

export function Login({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function login() {
    await api.post('/login', {
      email: email,
      password: password
    }).then(() => {
      console.log('Logged!')
      navigation.navigate('Home');
    }).catch(err => console.log('Error: ' + err))
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#00c49a" barStyle="light-content" />
      { heightScreen <= 650 ? (
        <WavyHeader customHeight={130} customTop={115} title={'Login'} />
      ) : (
        <WavyHeader customHeight={150} customTop={140} title={'Login'} />
      )}

      <ScrollView style={styles.content}>
        <View style={styles.form}>
            <KeyboardAvoidingView behavior='position'>
              <Text style={styles.inputsTitle}>Email</Text>
              <TextInput placeholder="" style={styles.inputs}
                value={email}
                autoCapitalize="none"
                onChangeText={text => setEmail(text)}
              />

              <Text style={styles.inputsTitle}>Password</Text>
              <TextInput placeholder="" style={styles.inputs}
                value={password}
                secureTextEntry
                onChangeText={text => setPassword(text)}
              />
            </KeyboardAvoidingView>

            <View style={{ width: '100%', alignItems: 'center' }}>
              <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
            </View>
        </View>

        <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.bottomBtnText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </ScrollView>
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


  content: {
    width: '100%',
    marginTop: 230,

    // justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold'
  },

  form: {
    width: '100%',
    padding: 15,
    marginTop: 20,
    height: '85%',
    justifyContent: 'space-between'
  },
  inputs: {
    width: '100%',
    height: 50,

    paddingLeft: 8,
    marginBottom: 10,
    fontSize: 15,

    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  inputsTitle: {
    color: '#444',
    marginBottom: 2,
  },

  button: {
    width: '80%',
    height: 45,
    marginTop: 20,
    backgroundColor: '#00c49a',

    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  //Bottom Button
  bottomButton: {
    height: 20,
  },

  bottomBtnText: {
    color: '#00c49a60',
    textAlign: 'center'
  }
});

