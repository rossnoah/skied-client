import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import jsonData from "../skiareas.json";
import { componentStyles, coreStyles } from "./styles";
import { TitleBar } from "./TitleBar";
import { FlashList } from "@shopify/flash-list";
import { logos } from "./images";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const hasSkiedMap = new Map<string, boolean>();

export type SkiArea = {
  name: string;
  id: string;
  country: string;
  state: string;
  hasSkied: boolean;
};

export type GroupedSkiAreas = {
  [country: string]: {
    [state: string]: SkiArea[];
  };
};

const rawJsonData = jsonData;
const groupedSkiAreas: GroupedSkiAreas = rawJsonData.reduce(
  (acc: GroupedSkiAreas, skiArea) => {
    let { country, state } = skiArea;

    if (!state) {
      state = country;
    }

    if (!acc[country]) {
      acc[country] = {};
    }

    if (!acc[country][state]) {
      acc[country][state] = [];
    }

    const fullSkiArea = {
      name: skiArea.name,
      country: skiArea.country,
      state: skiArea.state || skiArea.country,
      id: skiArea.name,
      hasSkied: hasSkiedMap.get(skiArea.name) || false,
    };

    acc[country][state].push(fullSkiArea);

    // Sort ski areas within each state
    acc[country][state].sort((a, b) => a.name.localeCompare(b.name));

    return acc;
  },
  {}
);

// Convert object to array and sort countries and states
export const sortedGroupedSkiAreas: GroupedSkiAreas = Object.entries(
  groupedSkiAreas
)
  .sort((a, b) => a[0].localeCompare(b[0])) // Sort countries
  .reduce((acc: GroupedSkiAreas, [country, states]) => {
    const sortedStates = Object.entries(states)
      .sort((a, b) => a[0].localeCompare(b[0])) // Sort states within each country
      .reduce((stateAcc: { [key: string]: SkiArea[] }, [state, skiAreas]) => {
        stateAcc[state] = skiAreas; // Already sorted skiAreas
        return stateAcc;
      }, {});

    acc[country] = sortedStates;
    return acc;
  }, {});

//filter groupedSkiAreas to only include US ski areas, remove the non US ski areas
export const sortedGroupedUSSkiAreas: GroupedSkiAreas = Object.keys(
  sortedGroupedSkiAreas
).reduce((acc: GroupedSkiAreas, country: string) => {
  if (country === "United States") {
    acc[country] = groupedSkiAreas[country];
  }
  return acc;
}, {});

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
    paddingVertical: coreStyles.spacing.xs2,
    paddingHorizontal: coreStyles.spacing.sm,
    backgroundColor: coreStyles.colors.accent, // Light blue background for country header
    color: coreStyles.colors.primaryText, // Assuming your coreStyles defines this
  },
  stateHeader: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: coreStyles.spacing.xs3,
    paddingHorizontal: coreStyles.spacing.md,
    backgroundColor: coreStyles.colors.darkerBackground, // Light grey background for state header
    color: coreStyles.colors.primaryText, // Assuming your coreStyles defines this
  },
  skiedLabel: {
    fontSize: 16, // Adjust size as needed
    color: "#4CAF50", // Green color for "Skied" label, change as desired
    marginLeft: coreStyles.spacing.xs, // Optional spacing between the ski area name and the "Skied" label
    // Add any additional styling you want for the "Skied" label here
  },
  skiedIcon: {
    color: "#4CAF50", // Green color for the icon, adjust as needed
    marginLeft: 5, // Space between the text and icon
  },
});

export const SkiAreaItem = ({ skiArea }: { skiArea: SkiArea }) => {
  // State to manage the 'hasSkied' status
  const [hasSkied, setHasSkied] = useState(skiArea.hasSkied);

  // Effect to update the component state based on AsyncStorage
  useEffect(() => {
    const fetchSkiedStatus = async () => {
      const storedHasSkied = await AsyncStorage.getItem(skiArea.name);
      // Update state if the value from AsyncStorage is different
      if (storedHasSkied !== null && storedHasSkied !== String(hasSkied)) {
        setHasSkied(storedHasSkied === "true");
      }
    };

    fetchSkiedStatus();
  }, [skiArea.name, hasSkied]);

  const handlePress = async () => {
    // Update the local state
    setHasSkied(!hasSkied);
    // Update the AsyncStorage
    await AsyncStorage.setItem(skiArea.name, String(!hasSkied));
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={componentStyles.listItem}>
        <Image
          source={logos[skiArea.name as keyof typeof logos] || logos.default}
          style={componentStyles.logo}
          resizeMode="contain"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={componentStyles.textContainer}>
            <Text style={componentStyles.subHeadingStyle}>{skiArea.name}</Text>
            <Text style={componentStyles.detailText}>{skiArea.state}</Text>
          </View>
          {hasSkied && (
            <MaterialIcons
              name="check-circle"
              size={24}
              style={styles.skiedIcon}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CountryHeader = ({ country }: { country: string }) => (
  <Text style={styles.countryHeader}>{country}</Text>
);

const StateHeader = ({ state }: { state: string }) => (
  <Text style={styles.stateHeader}>{state}</Text>
);

export function SkiAreaList({
  groupedSkiAreas,
}: {
  groupedSkiAreas: GroupedSkiAreas;
}) {
  return (
    <FlashList
      data={Object.entries(groupedSkiAreas)}
      renderItem={({
        item: [country, states],
      }: {
        item: [string, Record<string, SkiArea[]>];
      }) => (
        <View key={country}>
          <CountryHeader country={country} />
          {Object.entries(states).map(([state, areas]: [string, SkiArea[]]) => (
            <View key={state}>
              {country !== state && <StateHeader state={state} />}
              {areas.map((skiArea, index) => (
                <SkiAreaItem key={index} skiArea={skiArea} />
              ))}
            </View>
          ))}
        </View>
      )}
      estimatedItemSize={100}
    />
  );
}
