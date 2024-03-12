import React, { useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { componentStyles, coreStyles } from "../styles";
import { FlashList } from "@shopify/flash-list";
import { logos } from "../images";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SkiArea, useSkiAreasStore } from "../SkiAreaStore";
import * as Haptics from "expo-haptics";
import { filterToHasSkied, filterToUSA } from "../filters";
import { useShallow } from "zustand/react/shallow";

export type RawSkiArea = {
  name: string;
  id: string;
  country: string;
  state: string | null;
};

export type RawJsonData = RawSkiArea[];

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
  skiedIconTrue: {
    color: "#4CAF50", // Green color for the icon, adjust as needed
    marginLeft: 5, // Space between the text and icon
  },
  skiedIconFalse: {
    color: "#6e6e72", //gray color for the icon, adjust as needed
    marginLeft: 5, // Space between the text and icon
  },
});

export const SkiAreaItem = React.memo(
  ({
    skiArea,
    showUnselectedIndicator,
    allowPress: allowToggle = false, // The onPress prop is now optional
    allowLongPress: allowLongPress = false, // The onLongPress prop is now optional
  }: {
    skiArea: SkiArea;
    showUnselectedIndicator: boolean;
    allowPress: boolean;
    allowLongPress: boolean;
  }) => {
    const data = useSkiAreasStore(
      useShallow(
        (state) =>
          state.groupedSkiAreas[skiArea.country][skiArea.state][skiArea.id]
      )
    );
    const toggle = useSkiAreasStore.getState().toggleHasSkied;

    const [opacity, setOpacity] = useState(1); // Default opacity is 1

    const toggleOnPressFunction = async () => {
      if (allowToggle) {
        const newStatus = toggle(data);
        await AsyncStorage.setItem(data.id, newStatus.toString());
      }
    };

    const toggleOnLongPressFunction = async () => {
      if (allowLongPress) {
        setOpacity(0.2); // Dim the opacity on long press
        const newStatus = toggle(data);
        await AsyncStorage.setItem(data.id, newStatus.toString());
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    };

    const handlePressOut = () => {
      setOpacity(1); // Reset opacity to 1 when the press is released
    };

    const handlePressIn = () => {
      if (!allowToggle && allowLongPress) {
        setOpacity(0.2); // Dim the opacity when the press is active
      }
    };

    return (
      <TouchableOpacity
        onPress={toggleOnPressFunction}
        onLongPress={toggleOnLongPressFunction}
        onPressOut={handlePressOut}
        onPressIn={handlePressIn}
        delayLongPress={150}
        activeOpacity={allowToggle ? 0.2 : 1}
        style={{ opacity: opacity }} // Apply dynamic opacity here
      >
        <View style={componentStyles.listItem}>
          <Image
            source={logos[data.id as keyof typeof logos] || logos.default}
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
              <Text style={componentStyles.subHeadingStyle}>{data.name}</Text>
              <Text style={componentStyles.detailText}>{data.state}</Text>
            </View>
            {data.hasSkied && (
              <MaterialIcons
                name="check-circle"
                size={24}
                style={styles.skiedIconTrue}
              />
            )}
            {!data.hasSkied && showUnselectedIndicator && (
              <MaterialIcons
                name="radio-button-unchecked"
                size={24}
                style={styles.skiedIconFalse}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

const CountryHeader = ({ country }: { country: string }) => (
  <Text style={styles.countryHeader}>{country}</Text>
);

const StateHeader = ({ state }: { state: string }) => (
  <Text style={styles.stateHeader}>{state}</Text>
);

export const SkiAreaList = ({
  showUnselectedIndicator = false,
  allowPress: allowPress = false,
  allowLongPress: allowLongPress = false,
  onlyUnitedStates = false,
  onlyHasSkied = false,
}: {
  showUnselectedIndicator?: boolean;
  allowPress?: boolean;
  allowLongPress?: boolean;
  onlyUnitedStates?: boolean;
  onlyHasSkied?: boolean;
}) => {
  let groupedSkiAreas = useSkiAreasStore((state) => state.groupedSkiAreas);

  if (onlyUnitedStates) {
    groupedSkiAreas = filterToUSA(groupedSkiAreas);
  }

  if (onlyHasSkied) {
    groupedSkiAreas = filterToHasSkied(groupedSkiAreas);
  }

  return (
    <FlashList
      data={Object.entries(groupedSkiAreas)}
      renderItem={({
        item: [country, states],
      }: {
        item: [string, Record<string, Record<string, SkiArea>>];
      }) => (
        <View key={country}>
          <CountryHeader country={country} />
          {Object.entries(states).map(([state, areas]) => (
            <View key={state}>
              {country !== state && <StateHeader state={state} />}
              {Object.entries(areas).map(([id, skiArea]) => (
                <SkiAreaItem
                  key={id}
                  skiArea={skiArea}
                  showUnselectedIndicator={showUnselectedIndicator}
                  allowPress={allowPress} // Pass the onPress function as a prop
                  allowLongPress={allowLongPress}
                />
              ))}
            </View>
          ))}
        </View>
      )}
      estimatedItemSize={100}
    />
  );
};
