import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Settings } from "./src/Settings";
import { HomeScreen } from "./src/HomeScreen";
import { componentStyles } from "./src/styles";

// Placeholder components for other tabs
function TabTwo() {
  return (
    <View style={componentStyles.container}>
      <Text>Tab Two</Text>
    </View>
  );
}

function TabThree() {
  return (
    <View style={componentStyles.container}>
      <Settings />
    </View>
  );
}
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="All Mountains"
          component={HomeScreen}
          options={{ headerShown: false }} // This line removes the default header
        />
        <Tab.Screen name="TabTwo" component={TabTwo} />
        <Tab.Screen name="Settings" component={TabThree} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
