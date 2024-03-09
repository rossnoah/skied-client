import React from "react";
import { ScrollView, Text, View, Image, StyleSheet } from "react-native";
import jsonData from "../skiareas.json";
import { logos } from "./images";
import { componentStyles, coreStyles } from "./styles";
import { TitleBar } from "./TitleBar";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: coreStyles.spacing.sm,
    paddingVertical: coreStyles.spacing.xs,
    paddingTop: coreStyles.spacing.xl4,
    borderBottomWidth: 1,
    borderBottomColor: coreStyles.colors.border,
    backgroundColor: "#68CCEF",
  },
  headerButton: {
    padding: coreStyles.spacing.xs,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Center the title horizontally
  },
  titleText: {
    fontSize: 28, // Example size, adjust as needed
    color: coreStyles.colors.primaryText, // Using the primary text color from core styles
    // Add any additional text styling you need here
    fontWeight: "200",
  },
});

const skiAreaList = jsonData.map((skiArea) => ({
  name: skiArea.name,
  country: skiArea.country,
  state: skiArea.state || skiArea.country,
}));

export function HomeScreen() {
  return (
    <View style={componentStyles.container}>
      <TitleBar />
      {/* ScrollView for the list */}
      <ScrollView style={componentStyles.scrollView}>
        {skiAreaList.map((skiArea, index) => (
          <View key={index} style={componentStyles.listItem}>
            <Image
              source={
                logos[skiArea.name as keyof typeof logos] || logos["default"]
              }
              style={componentStyles.logo}
              resizeMode="contain"
            />
            <View style={componentStyles.textContainer}>
              <Text style={componentStyles.subHeadingStyle}>
                {skiArea.name}
              </Text>
              <Text style={componentStyles.detailText}>{skiArea.state}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
