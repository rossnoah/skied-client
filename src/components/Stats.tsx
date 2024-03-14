import React from "react";
import { Text, View } from "react-native";
import { GroupedSkiAreas, useSkiAreasStore } from "../SkiAreaStore";
import { StyleSheet } from "react-native";

export const StatsBox = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.statsText}>{title}</Text>
      <Text style={styles.label}>{subtitle}</Text>
    </View>
  );
};

const StatsCompletionBar = ({ value }: { value: number }) => {
  const gradientWidth = `${value}%`; // Value should be between 0 and 100

  return (
    <View style={styles.progressBarBackground}>
      <View
        style={[
          styles.progressBarForeground,
          { width: parseInt(gradientWidth, 10) },
        ]}
      />
    </View>
  );
};

export const StatsHasSkied: React.FC = () => {
  const totalSkiAreas = useSkiAreasStore((state) => state.totalSkiAreas);
  const totalHasSkied = useSkiAreasStore((state) => state.totalHasSkied);

  return (
    <StatsBox
      title={`${totalHasSkied}/${totalSkiAreas}`}
      subtitle="Ski Areas Skied"
    />
  );
};

export const StatsDaysSkied = () => {
  const days = 17;
  const daysInCurrentMonth = 31;

  return (
    <View>
      <StatsBox title={String(days)} subtitle="Ski Days This Month" />
      <StatsCompletionBar value={17 / 31} />
    </View>
  );
};

export const StatsVerticalFeet = () => {
  const totalVerticalFeet = "568,231";

  return (
    <StatsBox
      title={totalVerticalFeet.toString()}
      subtitle="Total Vertical Feet"
    />
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
  progressBarBackground: {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarForeground: {
    height: "100%",
    backgroundColor: "blue", // You can replace this with your gradient implementation
    borderRadius: 10,
  },
});
