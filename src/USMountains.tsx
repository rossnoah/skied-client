import React from "react";
import { View } from "react-native";
import { componentStyles, coreStyles } from "./styles";
import { TitleBar } from "./TitleBar";
import { SkiAreaList, sortedGroupedUSSkiAreas } from "./SkiAreas";

export const USMountains: React.FC = () => {
  return (
    <View style={componentStyles.container}>
      <TitleBar />
      <SkiAreaList groupedSkiAreas={sortedGroupedUSSkiAreas} />
    </View>
  );
};
