import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import jsonData from "./skiareas.json";
import { logos } from "./images";

type SkiArea = {
  name: string;
  country: string;
  state: string | undefined;
};

const skiAreaList: SkiArea[] = [];

jsonData.forEach(
  (skiArea: { name: string; country: string; state: string | null }) => {
    skiAreaList.push({
      name: skiArea.name,
      country: skiArea.country,
      state: skiArea.state || skiArea.country,
    });
  }
);

export default function App() {
  //load skiareas.json file and add to skiAreaList

  console.log("fetching skiareas.json");

  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
      <Button
        title="Click me"
        onPress={() => {
          console.log("hello");
        }}
      />
      <View>
        <ScrollView>
          {skiAreaList.map((skiArea, index) => {
            return (
              <React.Fragment key={index}>
                <SkiAreaListItem skiArea={skiArea} />
              </React.Fragment>
            );
          })}
        </ScrollView>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const SkiAreaListItem = (props: { skiArea: SkiArea }) => {
  const name = props.skiArea.name;
  const image = logos[name as keyof typeof logos] || logos["default"];

  console.log("image", image);

  return (
    <View style={styles.listContainer}>
      <Image source={image} style={styles.logo} />
      <View style={styles.textContainer}>
        <Text style={styles.subHeadingStyle}>{props.skiArea.name}</Text>
        <Text style={styles.largeText}>{`, ${props.skiArea.state}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row", // Make children align horizontally
    alignItems: "center", // Align children vertically in the center
    justifyContent: "flex-start", // Align children to the start of the container
  },
  headingStyle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subHeadingStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  largeText: {
    fontSize: 18,
  },
  logo: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
