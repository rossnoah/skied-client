import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SkiAreaList, sortedGroupedSkiAreas, toggleHasSkied } from "./SkiAreas";
import { TitleBar } from "./TitleBar";
import { componentStyles, coreStyles } from "./styles";

export const SelectionModal = ({ navigation }: { navigation: any }) => {
  return (
    <View style={componentStyles.container}>
      <Text style={componentStyles.settingsHeader}>Select Ski Areas</Text>

      <SkiAreaList
        groupedSkiAreas={sortedGroupedSkiAreas}
        showUnselectedIndicator={true}
        onPress={toggleHasSkied}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
