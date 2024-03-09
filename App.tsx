import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import jsonData from "./skiareas.json";
import { logos } from "./images";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

type SkiArea = {
  name: string;
  country: string;
  state: string | undefined;
};

const skiAreaList: SkiArea[] = [];

jsonData.forEach(
  (skiArea: { name: string; country: string; state: string | null }) => {
    skiAreaList.push({
      name: skiArea.name,
      country: skiArea.country,
      state: skiArea.state || skiArea.country,
    });
  }
);

function HomeScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      {skiAreaList.map((skiArea, index) => (
        <View key={index} style={styles.listItem}>
          <Image
            source={
              logos[skiArea.name as keyof typeof logos] || logos["default"]
            }
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.subHeadingStyle}>{skiArea.name}</Text>
            <Text style={styles.detailText}>{skiArea.state}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// Placeholder components for other tabs
function TabTwo() {
  return (
    <View style={styles.container}>
      <Text>Tab Two</Text>
    </View>
  );
}

function TabThree() {
  return (
    <View style={styles.container}>
      <Text>Tab Three</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="TabTwo" component={TabTwo} />
        <Tab.Screen name="TabThree" component={TabThree} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7",
  },
  scrollView: {
    width: "100%",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#c6c6c8",
    paddingVertical: 10, // Reduced padding for a bit more compact vertical spacing
    paddingHorizontal: 15,
  },
  logo: {
    width: 29,
    height: 29,
    borderRadius: 29 / 4,
    marginRight: 15,
  },
  textContainer: {
    justifyContent: "center",
  },
  subHeadingStyle: {
    fontSize: 17,
    color: "#1c1c1e",
  },
  detailText: {
    fontSize: 15,
    color: "#6e6e72",
  },
});
