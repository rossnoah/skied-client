import React from "react";
import { View } from "react-native";
import { componentStyles, coreStyles } from "./styles";
import { TitleBar } from "./TitleBar";
import { SkiAreaList } from "./SkiAreas";
import { useSkiAreasStore } from "./SkiAreaStore";

export const USMountains: React.FC = () => {
  return (
    <View style={componentStyles.container}>
      <TitleBar />
      <SkiAreaList
        groupedSkiAreas={useSkiAreasStore.getState().groupedSkiAreas}
        onlyUnitedStates={true}
      />
    </View>
  );
};
