import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet ,Text,TouchableOpacity} from 'react-native';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const baseUrl = process.env.BASE_URL;
  const handleSignup = async () => {
    try {
      // Make an API call to your server-side endpoint for user registration
      const response = await axios.post(`${baseUrl}/signup`, { email, password });
      // Handle the response, e.g., save user token in AsyncStorage
      // Redirect to the home page
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };
  const handlelogin = () => {
    navigation.navigate('Login');
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
      <Button title="Sign up" onPress={handleSignup} />
      <TouchableOpacity onPress={handlelogin}>
      <Text style={{ color: 'blue',margin:30 }}>
        {"Already have an account? Login here."}
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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default SignupScreen;
