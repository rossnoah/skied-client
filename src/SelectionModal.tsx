import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
// import { SkiAreaList, toggleHasSkied } from "./SkiAreas";
import { TitleBar } from "./TitleBar";
import { componentStyles, coreStyles } from "./styles";
import { SkiAreaList } from "./SkiAreas";
import { useSkiAreasStore } from "./SkiAreaStore";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export const SelectionModal = ({ navigation }: { navigation: any }) => {
  return (
    <View style={componentStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            console.log("plus");
            navigation.navigate("Demo" as never); // Update the navigation options to be an object instead of an array
          }}
        ></TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Select Ski Areas</Text>
        </View>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            console.log("check");
            //go back with navigation
            navigation.goBack();
          }}
        >
          <Feather
            name="check"
            size={24}
            color={coreStyles.colors.primaryText}
          />
        </TouchableOpacity>
      </View>

      <SkiAreaList
        groupedSkiAreas={useSkiAreasStore.getState().groupedSkiAreas}
        showUnselectedIndicator={true}
        allowToggle={true}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: coreStyles.spacing.sm,
    paddingVertical: coreStyles.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: coreStyles.colors.border,
    backgroundColor: "#68CCEF",
  },
  headerButton: {
    padding: coreStyles.spacing.xs,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Center the title horizontally
  },
  titleText: {
    fontSize: 28, // Example size, adjust as needed
    color: coreStyles.colors.primaryText, // Using the primary text color from core styles
    // Add any additional text styling you need here
    fontWeight: "200",
  },
});
