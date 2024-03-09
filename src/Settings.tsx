import React from "react";
import { ScrollView, Text, View, Switch } from "react-native";
import { componentStyles } from "./styles";

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

  const trackColors: { false: string; true: string } = {
    false: "#DDDDE2",
    true: "#2ECF57",
  };

  const thumbColors: { false: string; true: string } = {
    false: "#f4f3f4",
    true: "#f4f3f4",
  };

  return (
    <ScrollView contentContainerStyle={componentStyles.settingsContainer}>
      <Text style={componentStyles.settingsHeader}>Settings</Text>
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
    </ScrollView>
  );
}
