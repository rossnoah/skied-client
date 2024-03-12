import React from "react";
import { Text, View } from "react-native";
import { componentStyles } from "./styles";
import { TitleBar } from "./TitleBar";
// import { GroupedSkiAreas } from "./SkiAreaStore";

// Placeholder components for other tabs
export function MyMountains() {
  return (
    <View style={componentStyles.container}>
      <TitleBar />
      {/* <SkiAreaList
        groupedSkiAreas={filterToMyMountains(sortedGroupedSkiAreas)}
      /> */}
    </View>
  );
}
