import React from "react";
import { Text, View } from "react-native";
import { componentStyles } from "./styles";
import { TitleBar } from "./TitleBar";
import { SkiAreaList } from "./SkiAreas";
import { useSkiAreasStore } from "./SkiAreaStore";

export const MyMountains: React.FC = () => (
  <View style={componentStyles.container}>
    <TitleBar />
    <SkiAreaList onlyHasSkied={true} />
  </View>
);
