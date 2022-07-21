/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React, { useState } from "react";
// import { StyleSheet } from "react-native";
import Login from "./src/screens/Login";
import HomeScreen from "./src/screens/HomeScreen";
import WebViewFlow from "./src/components/WebViewFlow";
import { FLOW } from "./src/constants/Config";

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [flow, setFlow] = useState(FLOW.NATIVE);

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" options={{ headerShown: false }}>
            {(props) => <HomeScreen {...props} setUser={setUser} flow={flow} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login">
            {(props) => (
              <Login
                {...props}
                setUser={setUser}
                flow={flow}
                setFlow={setFlow}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="WebViewFlow">
            {(props) => <WebViewFlow {...props} setUser={setUser} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "column",
//     alignItems: "center"
//   }
// });

export default App;
