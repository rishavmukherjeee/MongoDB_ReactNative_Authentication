/*import React from 'react';
import { Button, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function App() {
  const rotation = useSharedValue(0);
  const translateX = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { translateX: translateX.value },
      ],
    };
  });

  const handleMoveButtonPress = () => {
    translateX.value = withTiming(translateX.value === 0 ? 100 : 0);
    console.log('TranslateX:', translateX.value);
  };

  const handleRotateButtonPress = () => {
    rotation.value = withTiming(rotation.value === 0 ? 180 : 0);
    console.log('Rotation:', rotation.value);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        style={[
          { width: 100, height: 100, backgroundColor: 'blue' },
          animatedStyles,
        ]}
      />
      <Button title="Move" onPress={handleMoveButtonPress} />
      <Button title="Rotate" onPress={handleRotateButtonPress} />
    </View>
  );
}*/
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
