import React, { useState } from 'react';
import { StyleSheet, View, Image, Platform, ScrollView } from 'react-native';
import { Input, Pressable, Icon,  Text, KeyboardAvoidingView, useToast } from 'native-base';
import { Button } from '@components';
import { Ionicons } from '@expo/vector-icons';
import { useUserContext } from '../../../context/UserContext';
import CustomAlert from '../../../components/CustomAlert';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUserContext();

  const toast = useToast();

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      toast.show({
        placement: "top",
        render: () => <CustomAlert text="Email ou senha incorreta" status='error'/>
      })
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={require('@assets/logo.png')} style={styles.logo} />
        <View style={styles.inputsContainer}>
          <View style={styles.inputLabelWrapper}>
            <Text style={styles.label}>Email</Text>
            <Input
              value={email}
              size="lg"
              placeholder="Seu endereço de email"
              variant="outline"
              autoCapitalize={false}
              onChangeText={(value) => setEmail(value)}
            />
          </View>
          <View style={styles.inputLabelWrapper}>
            <Text style={styles.label}>Senha</Text>
            <Input
              type={showPassword ? 'text' : 'password'}
              size="lg"
              variant="outline"
              placeholder="Sua senha"
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
        <Button onPress={handleLogin} theme="primary" style={styles.loginButton}>
          Entrar
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 150,
    width: '90%',
    alignSelf: 'center'
  },
  logo: {
    width: 300,
    height: 200,
  },
  inputsContainer: {
    gap: 12,
    marginTop: 24,
    width: "100%"
  },
  inputLabelWrapper: {
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
  },
  loginButton: {
    width: '100%',
    marginVertical: 20,
  },
});

export default Login;
