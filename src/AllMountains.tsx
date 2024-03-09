import React from "react";
import { View } from "react-native";

import { componentStyles, coreStyles } from "./styles";
import { TitleBar } from "./TitleBar";
import { SkiAreaList, sortedGroupedSkiAreas } from "./SkiAreas";

export const AllMountains: React.FC = () => (
  <View style={componentStyles.container}>
    <TitleBar />
    <SkiAreaList groupedSkiAreas={sortedGroupedSkiAreas} />
  </View>
);
