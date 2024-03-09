import React from "react";
import { ScrollView, Text, View, Image } from "react-native";
import jsonData from "../skiareas.json";
import { logos } from "./images";
import { componentStyles } from "./styles";

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
export function HomeScreen() {
  return (
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
            <Text style={componentStyles.subHeadingStyle}>{skiArea.name}</Text>
            <Text style={componentStyles.detailText}>{skiArea.state}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
