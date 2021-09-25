import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

const WINDOW_WIDTH = Dimensions.get("window").width;

type Props = {
  color?: "red" | "blue" | "green" | "pink";
};

export const Cell: React.FC<Props> = ({ children, color }) => {
  return (
    <View style={[styles.item, colorStyle(color)]}>
      <Text>{children}</Text>
    </View>
  );
};

const colorStyle = (color?: string) => {
  switch (color) {
    case "red": {
      return styles.red;
    }
    case "blue": {
      return styles.blue;
    }
    case "green": {
      return styles.green;
    }
    case "pink": {
      return styles.pink;
    }
    default: {
      return styles.red;
    }
  }
};

const styles = StyleSheet.create({
  item: {
    width: WINDOW_WIDTH,
    height: 20,
  },
  pink: {
    backgroundColor: "pink",
  },
  red: {
    backgroundColor: "red",
  },
  blue: {
    backgroundColor: "blue",
  },
  green: {
    backgroundColor: "green",
  },
});
