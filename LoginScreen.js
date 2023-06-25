import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,TouchableOpacity,Text } from 'react-native';
import axios from 'axios';
import {BASE_URL,GOOGLE_CLIENT_ID} from '@env';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import jwtDecode from 'jwt-decode';



// Use the Google sign-in function in your component

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
  // Initialize Google sign-in in your component
const initGoogleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    const { idToken } = await GoogleSignin.getTokens();
    // Send idToken to the backend for verification and authentication
    const response = await axios.post(`${BASE_URL}/auth/google`, { idToken });
    const { token } = response.data;
    const decodedToken = jwtDecode(token);
    // Handle authentication success and store the token
    navigation.navigate('Home');
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // Handle sign-in cancellation
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // Handle ongoing sign-in process
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // Handle Play Services not available
    } else {
      // Handle other errors
    }
  }
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
      
      <Button title="Sign In with Google" onPress={initGoogleSignIn} />
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
