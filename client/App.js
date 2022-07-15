import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Community from './src/screens/Community';

const Tab = createBottomTabNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  if (!user) {
    return (
      <View style={styles.container}>
        <Login setUser={setUser} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home">
          {(props) => <Home {...props} setUser={setUser} />}
        </Tab.Screen>
        <Tab.Screen name="Community" component={Community} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default App;
