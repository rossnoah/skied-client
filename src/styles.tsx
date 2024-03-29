import { StyleSheet } from "react-native";

export const coreStyles = {
  colors: {
    background: "#f2f2f7",
    darkerBackground: "#e5e5ea",
    white: "#ffffff",
    border: "#c6c6c8",
    primaryText: "#1c1c1e",
    secondaryText: "#6e6e72",
    accent: "#DDEFFF",
  },
  spacing: {
    xs3: 4,
    xs2: 6,
    xs: 10,
    sm: 15,
    md: 20,
    lg: 29,
    xl: 35,
    xl2: 40,
    xl3: 48,
    xl4: 56,
    xl5: 64,
  },
  typography: {
    subHeading: { fontSize: 17, color: "#1c1c1e" },
    detailText: { fontSize: 15, color: "#6e6e72" },
    settingsHeader: { fontSize: 22, color: "#1c1c1e" },
    settingsText: { fontSize: 18, color: "#1c1c1e" },
  },
};

export const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: coreStyles.colors.background,
  },
  scrollView: {
    width: "100%",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: coreStyles.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: coreStyles.colors.border,
    paddingVertical: coreStyles.spacing.xs,
    paddingHorizontal: coreStyles.spacing.sm,
  },
  logo: {
    width: coreStyles.spacing.lg,
    height: coreStyles.spacing.lg,
    borderRadius: coreStyles.spacing.lg / 4,
    marginRight: coreStyles.spacing.sm,
  },
  textContainer: {
    justifyContent: "center",
  },
  subHeadingStyle: coreStyles.typography.subHeading,
  detailText: coreStyles.typography.detailText,
  settingsContainer: {
    padding: coreStyles.spacing.md,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: coreStyles.spacing.sm,
    paddingVertical: coreStyles.spacing.xs,
    paddingTop: coreStyles.spacing.xl4,
    borderBottomWidth: 1,
    borderBottomColor: coreStyles.colors.border,
    backgroundColor: "#68CCEF",
    fontSize: coreStyles.typography.subHeading.fontSize,
  },
  settingsHeader: coreStyles.typography.settingsHeader,
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: coreStyles.spacing.md,
  },
  settingsText: coreStyles.typography.settingsText,
});
