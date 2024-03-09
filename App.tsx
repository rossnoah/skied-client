import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Settings } from "./src/Settings";
import { HomeScreen } from "./src/HomeScreen";
import { componentStyles } from "./src/styles";
import { FontAwesome6 } from "@expo/vector-icons";
import { TitleBar } from "./src/TitleBar";

// Placeholder components for other tabs
function TabTwo() {
  return (
    <View style={componentStyles.container}>
      <TitleBar />
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
          options={{
            headerShown: false, // This line removes the default header
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6
                name="mountain-sun"
                size={size * 0.8}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="US Resorts"
          component={TabTwo}
          options={{
            headerShown: false, // This line removes the default header
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="flag-usa" size={size * 0.9} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={TabThree}
          options={{
            headerShown: true, // This line removes the default header
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="gear" size={size * 0.9} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
