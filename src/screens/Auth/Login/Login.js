import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'; 
import { Text, Button } from '@components';
import { auth } from '../../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '@hooks';

function Login() {
  const [username, setUsername] = useState('pedrolportow@gmail.com');
  const [password, setPassword] = useState('123456');

  const { login } = useAuthContext();

  const handleLogin = async () => {
    try {
      const response = await auth.login(username, password);
      if(response?.data?.token){
        await AsyncStorage.setItem('userToken', response.data.token);
        console.log("ASYNC SYORAGE SETADO token aqui: ")
        console.log(AsyncStorage.getItem('userToken'))
      } else {
        throw new Error('N recebeu token na resposta?')
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@assets/logo.png')} style={styles.logo}  />
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          value={username}
          onChangeText={text => setUsername(text)} 
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry 
        />
      </View>
      <Button
        onPress={handleLogin}
        theme="primary"
        style={{ width: '100%', margin: 20 }}
      >
        Entrar
      </Button>
      <Text style={styles.passwordLabel}>Esqueceu a senha?</Text>
      {/* <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#479BA7",
    flex: 1
  },
  passwordLabel: {
    fontWeight: 'bold',
    color: '#AAAAAA',
    marginTop: 240,
  },
  container: {
    alignItems: 'center', 
    paddingHorizontal: 20,
    paddingTop: 150,
    backgroundColor: 'white',
    borderRadius: 40,
    marginVertical: 8,
    marginHorizontal: 8,
    flex: 1
  },
  button: {
    backgroundColor: "#479BA7",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 50,
    marginTop: 32,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    width: "100%",
    gap: 8
  },
  buttonText: {
    color: "white",
    fontWeight: '700',
    fontSize: 16
  },
  logo: {
    width: 300,
    height: 200,
  },
  inputsContainer: {
    gap: 12,
    width: "100%",
    marginTop: 24
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%', 
    padding: 15, 
    borderWidth: 1, 
    color: 'black',
    backgroundColor: "#F6F6F6",
    borderColor: '#ccc', 
    borderRadius: 8, 
  },
});

export default Login;
