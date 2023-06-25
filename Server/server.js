
const express = require('express');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config({path: '../.env'});
const mon=process.env.MONGO_CONNECTION_STRING;
// Create Express app
const app = express();
app.use(express.json());
console.log(mon);
// Connect to MongoDB
mongoose.connect(mon, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

// Registration endpoint

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/* newwwwwwwww


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
*/