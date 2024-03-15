import React, { ReactElement, useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { componentStyles, coreStyles } from "../styles";
import { FlashList } from "@shopify/flash-list";
import { logos } from "../images";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CountrySkiAreas, SkiArea, useSkiAreasStore } from "../SkiAreaStore";
import * as Haptics from "expo-haptics";
import { filterToHasSkied, filterToUSA } from "../utils/filters";
import { useShallow } from "zustand/react/shallow";
import { formatPercentage } from "../utils/formating";

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
    color: coreStyles.colors.primaryText, // Assuming your coreStyles defines this
  },
  placeDetails: {
    fontSize: coreStyles.typography.detailText.fontSize,
    fontWeight: "600",
    paddingHorizontal: coreStyles.spacing.sm,
    color: coreStyles.colors.secondaryText,
    paddingVertical: coreStyles.spacing.xs2,
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
          state.groupedSkiAreas.countries[skiArea.country].states[skiArea.state]
            .skiAreas[skiArea.id]
      )
    );
    const setHasSkied = useSkiAreasStore.getState().setHasSkied;

    const [opacity, setOpacity] = useState(1); // Default opacity is 1

    const toggleOnPressFunction = async () => {
      if (allowToggle) {
        const newStatus = !data.hasSkied;
        setHasSkied(data, newStatus);
        console.log("newStatus", newStatus);
        await AsyncStorage.setItem(data.id, newStatus.toString());
      }
    };

    const toggleOnLongPressFunction = async () => {
      if (allowLongPress) {
        setOpacity(0.2); // Dim the opacity on long press
        const newStatus = !data.hasSkied;
        setHasSkied(data, newStatus);
        console.log("newStatus", newStatus);
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

const CountryHeader = ({ country }: { country: string }) => {
  const totalSkiAreas = useSkiAreasStore(
    (state) => state.groupedSkiAreas.countries[country].total
  );
  const totalHasSkied = useSkiAreasStore(
    (state) => state.groupedSkiAreas.countries[country].totalHasSkied
  );

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: coreStyles.colors.accent, // Light blue background for country header
        alignItems: "flex-end",
      }}
    >
      <Text style={styles.countryHeader}>{country}</Text>
      <Text style={styles.placeDetails}>{`${totalHasSkied} | ${formatPercentage(
        totalHasSkied / totalSkiAreas
      )}`}</Text>
    </View>
  );
};

const StateHeader = ({
  stateName,
  country,
}: {
  stateName: string;
  country: string;
}) => {
  const totalSkiAreas = useSkiAreasStore(
    (state) => state.groupedSkiAreas.countries[country].states[stateName].total
  );
  const totalHasSkied = useSkiAreasStore(
    (state) =>
      state.groupedSkiAreas.countries[country].states[stateName].totalHasSkied
  );

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: coreStyles.colors.darkerBackground, // Light grey background for state header
        alignItems: "flex-end",
      }}
    >
      <Text style={styles.stateHeader}>{stateName}</Text>
      <Text style={styles.placeDetails}>{`${totalHasSkied} | ${formatPercentage(
        totalHasSkied / totalSkiAreas
      )}`}</Text>
    </View>
  );
};

export const SkiAreaList = ({
  showUnselectedIndicator = false,
  allowPress: allowPress = false,
  allowLongPress: allowLongPress = false,
  onlyUnitedStates = false,
  onlyHasSkied = false,
  ListHeaderComponent = undefined,
}: {
  showUnselectedIndicator?: boolean;
  allowPress?: boolean;
  allowLongPress?: boolean;
  onlyUnitedStates?: boolean;
  onlyHasSkied?: boolean;
  ListHeaderComponent?: ReactElement;
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
      data={Object.entries(groupedSkiAreas.countries)} // Access the countries property
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({
        item: [countryName, countryData],
      }: {
        item: [string, CountrySkiAreas]; // Adjust the type according to the new structure
      }) => (
        <View key={countryName}>
          <CountryHeader country={countryName} />
          {Object.entries(countryData.states).map(([stateName, stateData]) => (
            <View key={stateName}>
              {stateName !== countryName && (
                <StateHeader stateName={stateName} country={countryName} />
              )}
              {Object.entries(stateData.skiAreas).map(([id, skiArea]) => (
                <SkiAreaItem
                  key={id}
                  skiArea={skiArea}
                  showUnselectedIndicator={showUnselectedIndicator}
                  allowPress={allowPress} // Ensure you pass an onPress function as a prop if needed
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
