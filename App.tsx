import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MyList } from "./components/MyList";
import { Item } from "./type";

const list: Item[] = Array.from({ length: 100 }, (_, idx) => ({ id: idx }));

export default function App() {
  return (
    <>
      <SPACE_10 />
      <View style={styles.container}>
        <MyList list={list} />
      </View>
      <SPACE_10 />
    </>
  );
}

const SPACE_10 = () => <View style={styles.space_10} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  space_10: {
    height: 50,
  },
});
