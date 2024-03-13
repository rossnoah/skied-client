import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Share } from "react-native";
import { Feather } from "@expo/vector-icons";
import { coreStyles } from "./styles";
import { useNavigation } from "@react-navigation/native";

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
});

const shareInvitationLink = async () => {
  const invitationUrl = "https://skied.app"; // Replace with your actual invitation link
  const message = "Join me on this amazing app! Here is your invitation link: "; // Optional message to include with the link

  try {
    const result = await Share.share({
      message: `${message}${invitationUrl}`,
      url: invitationUrl, // Some platforms may use this field
      title: "App Invitation", // Optional title
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // Shared with activity type of result.activityType
      } else {
        // Shared
      }
    } else if (result.action === Share.dismissedAction) {
      // Dismissed
    }
  } catch (error) {
    console.error(error);
  }
};

export const TitleBar = () => {
  const navigation = useNavigation(); // Use the useNavigation hook to get access to navigation

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => {
          navigation.navigate("Selection Modal" as never); // Update the navigation options to be an object instead of an array
        }}
      >
        <Feather name="plus" size={24} color={coreStyles.colors.primaryText} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>skied</Text>
      </View>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => shareInvitationLink()}
      >
        <Feather name="share" size={24} color={coreStyles.colors.primaryText} />
      </TouchableOpacity>
    </View>
  );
};
