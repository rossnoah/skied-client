import React from "react";
import { View } from "react-native";

import { componentStyles, coreStyles } from "./styles";
import { TitleBar } from "./TitleBar";
import { SkiAreaList } from "./SkiAreas";
import { useSkiAreasStore } from "./SkiAreaStore";

export const AllMountains: React.FC = () => (
  <View style={componentStyles.container}>
    <TitleBar />
    <SkiAreaList allowLongPress={true} />
  </View>
);
