import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, Button } from '@components';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    Alert.alert("Login Attempt", `Username: ${username}, Password: ${password}`);
  };

  return (
    <View style={styles.container}>
      <Image source={require('@assets/logo.png')} style={styles.logo}  />
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          value={username}
          onChangeText={setUsername} 
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry 
        />
      </View>
      <Button
        onPress={() => console.log('Pressed')}
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
    color: "#BDBDBD",
    backgroundColor: "#F6F6F6",
    borderColor: '#ccc', 
    borderRadius: 8, 
  },
});

export default Login;
