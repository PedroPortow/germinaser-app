import React, { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Input, Pressable, Icon, Divider, Text } from 'native-base'
import {  Button } from '@components'
import { Ionicons } from '@expo/vector-icons'
import { useUserContext } from '../../../context/UserContext'

function Login() {
  const [email, setEmail] = useState('pedrolportow@gmail.com')
  const [password, setPassword] = useState('123456')
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useUserContext()

  const handleLogin = async () => {
    try {
      await login(email, password)
    } catch (error) {
      console.error('Erro ao fazer login:', error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('@assets/logo.png')} style={styles.logo} />
      <View style={styles.inputsContainer}>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Email</Text>
          <Input
          value={email}
          size="lg"
          placeholder='Seu endereço de email'
          variant="outline"
          onChangeText={(value) => setEmail(value)}
        />
      </View>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Senha</Text>
          <Input
          type={showPassword ? 'text' : 'password'}
          size="lg"
          variant="outline"
          placeholder='Sua senha'
          autoCapitalize={false}
          InputRightElement={
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Icon
                as={
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="black"
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
     
    
        
      </View>
      <Button onPress={handleLogin} theme="primary" style={{ width: '100%', margin: 20 }}>
        Entrar
      </Button>
      {/* <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </Pressable> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 150,
    backgroundColor: 'white',
    flex: 1,
  },
  logo: {
    width: 300,
    height: 200,
  },
  inputsContainer: {
    gap: 12,
    width: '100%',
    marginTop: 24,
  },
  inputLabelWrapper: {
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: 600
  },
})

export default Login
