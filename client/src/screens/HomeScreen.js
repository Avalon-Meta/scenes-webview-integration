/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Community from "./Community";
import Home from "../components/Home";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ setUser, flow }) => (
  <Tab.Navigator
    screenOptions={() => ({
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray"
    })}
  >
    <Tab.Screen name="Home">
      {(props) => <Home {...props} setUser={setUser} />}
    </Tab.Screen>
    <Tab.Screen name="Community">
      {(props) => <Community {...props} flow={flow} />}
    </Tab.Screen>
  </Tab.Navigator>
);

export default HomeScreen;
