import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Settings } from "./src/navigation/tabs/Settings";
import { AllMountains } from "./src/navigation/tabs/AllMountains";
import { componentStyles } from "./src/styles";
import { FontAwesome6 } from "@expo/vector-icons";
import { USMountains } from "./src/navigation/tabs/USMountains";
import * as SplashScreen from "expo-splash-screen";
import jsonData from "./skiareas.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { SelectionModal } from "./src/navigation/modals/SelectionModal";
import { MyMountains } from "./src/navigation/tabs/MyMountains";
import { SkiArea, useSkiAreasStore } from "./src/SkiAreaStore";
import { Stats } from "./src/navigation/tabs/Stats";

/*
TODO: ENABLE HAPTICS PERMISSION ON ANDROID
*/

function TabThree() {
  return (
    <View style={componentStyles.container}>
      <Settings />
    </View>
  );
}

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Skied"
        component={MyMountains}
        options={{
          headerShown: false, // This line removes the default header
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="location-dot" size={size * 0.9} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="All Mountains"
        component={AllMountains}
        options={{
          headerShown: false, // This line removes the default header
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="mountain-sun" size={size * 0.8} color={color} />
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
        name="Stats"
        component={Stats}
        options={{
          headerShown: false, // This line removes the default header
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="trophy" size={size * 0.9} color={color} />
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
  );
}

function RootStackScreen() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {/* Make the modal slide in from the bottom */}
      <RootStack.Screen
        name="Selection Modal"
        component={SelectionModal}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </RootStack.Navigator>
  );
}

export async function loadFromAsyncStorage() {
  const keys = jsonData.map((skiArea) => skiArea.id);

  const storedStatuses = await AsyncStorage.multiGet(keys);

  //loop through that jsondata with an index
  for (let i = 0; i < jsonData.length; i++) {
    const skiArea = jsonData[i];
    const status = storedStatuses[i][1];
    const fullSkiArea: SkiArea = {
      id: skiArea.id,
      name: skiArea.name,
      state: skiArea.state || skiArea.country,
      country: skiArea.country,
      hasSkied: status === "true",
    };

    useSkiAreasStore.getState().addSkiArea(fullSkiArea);
  }
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadFromAsyncStorage();
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
      <RootStackScreen />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
