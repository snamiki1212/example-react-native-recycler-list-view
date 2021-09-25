import React from "react";
import { StyleSheet, View } from "react-native";
import { MyList } from "../components/MyList";
import { Item } from "../type";

const list: Item[] = Array.from({ length: 100 }, (_, idx) => ({ id: idx }));

const Space = () => <View style={styles.space} />;

export const RvlScreen = () => {
  return (
    <>
      <Space />
      <View style={styles.container}>
        <MyList list={list} />
      </View>
      <Space />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  space: {
    height: 50,
  },
});
