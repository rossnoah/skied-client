import React from "react";
import { View } from "react-native";
import { componentStyles } from "../../styles";
import { Text } from "react-native";
import { TitleBar } from "../../TitleBar";
import { ScrollView } from "react-native-gesture-handler";
import {
  StatsHasSkied,
  StatsVerticalFeet,
  StatsDaysSkied,
  StatsBox,
} from "../../components/Stats";
import { useSkiAreasStore } from "../../SkiAreaStore";

export function Stats() {
  return (
    <View style={componentStyles.container}>
      <TitleBar />
      <ScrollView>
        <StatsHasSkied />
        <StatsVerticalFeet />
        <StatsDaysSkied />
      </ScrollView>
    </View>
  );
}
