import React from "react";
import { Text, View } from "react-native";
import { componentStyles } from "./styles";
import { TitleBar } from "./TitleBar";
import { SkiAreaList } from "./SkiAreas";
import { useSkiAreasStore } from "./SkiAreaStore";
import { StatsBox } from "./Stats";
import { ScrollView } from "react-native-gesture-handler";

export const MyMountains: React.FC = () => (
  <View style={componentStyles.container}>
    <TitleBar />
    <ScrollView>
      <StatsBox />
      <SkiAreaList onlyHasSkied={true} />
    </ScrollView>
  </View>
);
