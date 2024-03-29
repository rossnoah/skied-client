import React from "react";
import { ScrollView, Text, View, Switch, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { componentStyles } from "../../styles";
import { useSkiAreasStore } from "../../SkiAreaStore";

export function Settings() {
  const [isEnabledNotifications, setIsEnabledNotifications] =
    React.useState(false);
  const [isEnabledDarkMode, setIsEnabledDarkMode] = React.useState(false);
  const [isEnabledLocation, setIsEnabledLocation] = React.useState(false);

  const toggleSwitchNotifications = () =>
    setIsEnabledNotifications((previousState) => !previousState);
  const toggleSwitchDarkMode = () =>
    setIsEnabledDarkMode((previousState) => !previousState);
  const toggleSwitchLocation = () =>
    setIsEnabledLocation((previousState) => !previousState);

  const trackColors = { false: "#DDDDE2", true: "#2ECF57" };
  const thumbColors = { false: "#f4f3f4", true: "#f4f3f4" };

  // Function to clear all data from AsyncStorage
  const clearStorage = async () => {
    try {
      await AsyncStorage.multiRemove(useSkiAreasStore.getState().idList);
      useSkiAreasStore.getState().clearHasSkied();
      alert("Storage successfully cleared!");
    } catch (e) {
      // clearing error
      alert("Failed to clear the async storage.");
      console.error(e);
    }
  };

  const clearStorageDialog = async () => {
    Alert.alert(
      "Clear Storage",
      "Are you sure you want to clear all of your skied data? This action can not be reversed.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: clearStorage },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={componentStyles.settingsContainer}>
      <View style={componentStyles.settingsItem}>
        <Text style={componentStyles.settingsText}>Enable Notifications</Text>
        <Switch
          thumbColor={
            isEnabledNotifications ? thumbColors.true : thumbColors.false
          }
          onValueChange={toggleSwitchNotifications}
          value={isEnabledNotifications}
        />
      </View>
      <View style={componentStyles.settingsItem}>
        <Text style={componentStyles.settingsText}>Dark Mode</Text>
        <Switch
          trackColor={{ false: trackColors.false, true: trackColors.true }}
          thumbColor={isEnabledDarkMode ? thumbColors.true : thumbColors.false}
          onValueChange={toggleSwitchDarkMode}
          value={isEnabledDarkMode}
        />
      </View>
      <View style={componentStyles.settingsItem}>
        <Text style={componentStyles.settingsText}>Location Services</Text>
        <Switch
          trackColor={{ false: trackColors.false, true: trackColors.true }}
          thumbColor={isEnabledLocation ? thumbColors.true : thumbColors.false}
          onValueChange={toggleSwitchLocation}
          value={isEnabledLocation}
        />
      </View>
      <Button title="Clear Storage" onPress={clearStorageDialog} />
    </ScrollView>
  );
}
