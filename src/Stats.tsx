import React from "react";
import { Text, View } from "react-native";
import { componentStyles } from "./styles";
import { TitleBar } from "./TitleBar";
import { SkiAreaList } from "./SkiAreas";
import { GroupedSkiAreas, useSkiAreasStore } from "./SkiAreaStore";
import { StyleSheet } from "react-native";

function countTotalSkiAreas(groupedSkiAreas: GroupedSkiAreas): number {
  let total = 0;
  //loop over countries, then states, then count ski areas
  for (const [country, states] of Object.entries(groupedSkiAreas)) {
    for (const [state, areas] of Object.entries(states)) {
      total += Object.keys(areas).length;
    }
  }
  return total;
}

function countHasSkiedSkiAreas(groupedSkiAreas: GroupedSkiAreas): number {
  let total = 0;
  //loop over countries, then states, then count ski areas
  for (const [country, states] of Object.entries(groupedSkiAreas)) {
    for (const [state, areas] of Object.entries(states)) {
      for (const [id, skiArea] of Object.entries(areas)) {
        if (skiArea.hasSkied) {
          total++;
        }
      }
    }
  }
  return total;
}

export const StatsBox: React.FC = () => {
  const groupedSkiAreas = useSkiAreasStore((state) => state.groupedSkiAreas);

  const totalSkiAreas = countTotalSkiAreas(groupedSkiAreas);
  const totalHasSkied = countHasSkiedSkiAreas(groupedSkiAreas);

  return (
    <View style={styles.container}>
      <Text style={styles.statsText}>
        {totalHasSkied} / {totalSkiAreas}
      </Text>
      <Text style={styles.label}>Total Ski Areas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#4a76a8", // A cool blue shade
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsText: {
    fontSize: 32, // Large font size for readability
    fontWeight: "bold",
    color: "#ffffff", // White color for contrast
    textAlign: "center", // Center the text
  },
  label: {
    fontSize: 18, // Smaller font size for labels
    color: "#d0e2f2", // Lighter shade for a subtle look
    textAlign: "center", // Center the label
    marginTop: 10, // Space between stats text and label
  },
});
