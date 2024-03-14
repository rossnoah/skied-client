import React from "react";
import { Text, View } from "react-native";
import { componentStyles } from "../../styles";
import { TitleBar } from "../../TitleBar";
import { SkiAreaList } from "../../components/SkiAreas";
import { StatsHasSkied } from "../../components/Stats";
import { ScrollView } from "react-native-gesture-handler";
import { useSkiAreasStore } from "../../SkiAreaStore";

export const MyMountains: React.FC = () => (
  <View style={componentStyles.container}>
    <TitleBar />
    <SkiAreaList onlyHasSkied={true} ListHeaderComponent={<StatsHasSkied />} />
  </View>
);
