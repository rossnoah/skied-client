import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Settings } from "./src/Settings";
import { AllMountains } from "./src/AllMountains";
import { componentStyles } from "./src/styles";
import { FontAwesome6 } from "@expo/vector-icons";
import { TitleBar } from "./src/TitleBar";
import { USMountains } from "./src/USMountains";
import * as SplashScreen from "expo-splash-screen";
import jsonData from "./skiareas.json";
import { hasSkiedMap } from "./src/SkiAreas";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Placeholder components for other tabs
function TabOne() {
  return (
    <View style={componentStyles.container}>
      <TitleBar />
      <Text>Tab One</Text>
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
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        jsonData.forEach(async (skiArea) => {
          const id = skiArea.name;
          const storedStatus = await AsyncStorage.getItem(id);
          if (storedStatus && storedStatus === "true") {
            hasSkiedMap.set(id, true);
          } else {
            hasSkiedMap.set(id, false);
          }
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Your Mountains"
          component={TabOne}
          options={{
            headerShown: false, // This line removes the default header
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6
                name="location-dot"
                size={size * 0.9}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="All Mountains"
          component={AllMountains}
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
          name="US Mountains"
          component={USMountains}
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
