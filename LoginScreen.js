import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,TouchableOpacity,Text } from 'react-native';
import axios from 'axios';
import {BASE_URL} from '@env';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const baseUrl = process.env.BASE_URL;
  const handleLogin = async () => {
    try {
      // Make an API call to your server-side endpoint for authentication
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      // Handle the response, e.g., save user token in AsyncStorage
      // Redirect to the home page
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };
  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="gray"
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handleSignup}>
      <Text style={{ color: 'blue' ,margin:30}}>
        {"Don't have an account? Sign up here."}
      </Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    color: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    padding: 5,
  },
});

export default LoginScreen;
