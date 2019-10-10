import React, { useState, useEffect } from 'react'
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api'

import logo from '../assets/logo.png'
//import { Platform } from '@unimodules/core';

export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('List')
      }
    })
  }, []);

  async function handleSubmit() {
    //event.preventDefault();
    const response = await api.post('/sessions', { email })
    const { _id } = response.data;

    //console.log(_id)

    await AsyncStorage.setItem('user', _id)
    await AsyncStorage.setItem('techs', techs)
    //localStorage.setItem('user', _id)

    navigation.navigate('List')
    //history.push('/dashboard')

  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu melhor e-mail"
          placeholderTextColor='#999'
          keyboardType="email-address"
          autoCaptalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias de interesse"
          placeholderTextColor='#999'
          autoCaptalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Encontrar Spots</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 0
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },

  button: {
    height: 42,
    backgroundColor: '#EC5660',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },

});
