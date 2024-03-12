import React from "react";
import { View } from "react-native";
import { componentStyles, coreStyles } from "../../styles";
import { TitleBar } from "../../TitleBar";
import { SkiAreaList } from "../../components/SkiAreas";
import { useSkiAreasStore } from "../../SkiAreaStore";

export const USMountains: React.FC = () => {
  return (
    <View style={componentStyles.container}>
      <TitleBar />
      <SkiAreaList onlyUnitedStates={true} allowLongPress={true} />
    </View>
  );
};
