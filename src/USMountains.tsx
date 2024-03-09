import React from "react";
import { ScrollView, Text, View, Image, StyleSheet } from "react-native";
import jsonData from "../skiareas.json";
import { logos } from "./images";
import { componentStyles, coreStyles } from "./styles";
import { TitleBar } from "./TitleBar";

type SkiArea = {
  name: string;
  country: string;
  state: string;
};

type GroupedSkiAreas = {
  [country: string]: {
    [state: string]: SkiArea[];
  };
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: coreStyles.spacing.sm,
    paddingVertical: coreStyles.spacing.xs,
    paddingTop: coreStyles.spacing.xl4,
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
  countryHeader: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: coreStyles.spacing.md,
    paddingHorizontal: coreStyles.spacing.sm,
    backgroundColor: "#DDEFFF", // Light blue background for country header
    color: coreStyles.colors.primaryText, // Assuming your coreStyles defines this
  },
  stateHeader: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: coreStyles.spacing.sm,
    paddingHorizontal: coreStyles.spacing.md,
    backgroundColor: "#EEE", // Light grey background for state header
    color: coreStyles.colors.primaryText, // Assuming your coreStyles defines this
  },
});
const skiAreaList: SkiArea[] = jsonData
  .filter((skiArea) => skiArea.country === "United States")
  .map((skiArea) => ({
    name: skiArea.name,
    country: skiArea.country,
    state: skiArea.state || skiArea.country, // Default to country if state is not provided
  }));

function groupAndSortSkiAreas(skiAreas: SkiArea[]): GroupedSkiAreas {
  const grouped: GroupedSkiAreas = {};

  // Group ski areas by country and state
  skiAreas.forEach((area) => {
    if (!grouped[area.country]) {
      grouped[area.country] = {};
    }
    if (!grouped[area.country][area.state]) {
      grouped[area.country][area.state] = [];
    }
    grouped[area.country][area.state].push(area);
  });

  // Create a sorted structure for countries, states, and ski areas
  const sortedGrouped: GroupedSkiAreas = {};

  // Sort countries alphabetically
  const sortedCountries = Object.keys(grouped).sort();

  sortedCountries.forEach((country) => {
    sortedGrouped[country] = {};
    // Sort states within the country alphabetically
    const sortedStates = Object.keys(grouped[country]).sort();

    sortedStates.forEach((state) => {
      // Sort ski areas within the state alphabetically by name
      sortedGrouped[country][state] = grouped[country][state].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    });
  });

  return sortedGrouped;
}

const SkiAreaList: React.FC = () => {
  const groupedSkiAreas = groupAndSortSkiAreas(skiAreaList);

  return (
    <ScrollView style={componentStyles.scrollView}>
      {Object.entries(groupedSkiAreas).map(([country, states]) => (
        <View key={country}>
          <Text style={styles.countryHeader}>{country}</Text>
          {Object.entries(states).map(([state, areas]) =>
            country !== state ? ( // Only render state header if different from country
              <View key={state}>
                <Text style={styles.stateHeader}>{state}</Text>
                {areas.map((skiArea, index) => (
                  <View key={index} style={componentStyles.listItem}>
                    <Image
                      source={
                        logos[skiArea.name as keyof typeof logos] ||
                        logos["default"]
                      }
                      style={componentStyles.logo}
                      resizeMode="contain"
                    />
                    <View style={componentStyles.textContainer}>
                      <Text style={componentStyles.subHeadingStyle}>
                        {skiArea.name}
                      </Text>
                      <Text style={componentStyles.detailText}>
                        {skiArea.state}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              areas.map(
                (
                  skiArea,
                  index // Directly render ski areas without state header
                ) => (
                  <View key={index} style={componentStyles.listItem}>
                    <Image
                      source={
                        logos[skiArea.name as keyof typeof logos] ||
                        logos["default"]
                      }
                      style={componentStyles.logo}
                      resizeMode="contain"
                    />
                    <View style={componentStyles.textContainer}>
                      <Text style={componentStyles.subHeadingStyle}>
                        {skiArea.name}
                      </Text>
                      <Text style={componentStyles.detailText}>
                        {skiArea.state}
                      </Text>
                    </View>
                  </View>
                )
              )
            )
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export const USMountains: React.FC = () => {
  return (
    <View style={componentStyles.container}>
      <TitleBar />
      <SkiAreaList />
    </View>
  );
};
