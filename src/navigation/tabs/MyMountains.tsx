import React from "react";
import { Text, View } from "react-native";
import { componentStyles } from "../../styles";
import { TitleBar } from "../../TitleBar";
import { SkiAreaList } from "../../components/SkiAreas";
import { StatsBox } from "../../components/Stats";
import { ScrollView } from "react-native-gesture-handler";
import { useSkiAreasStore } from "../../SkiAreaStore";

export const MyMountains: React.FC = () => (
  <View style={componentStyles.container}>
    <TitleBar />
    <ScrollView>
      <StatsBox />
      <SkiAreaList onlyHasSkied={true} />
    </ScrollView>
  </View>
);
