import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";

const WINDOW_WIDTH = Dimensions.get("window").width;
const HEIGHT_WIDTH = Dimensions.get("window").width;

const Cell: React.FC = ({ children }) => {
  return (
    <View style={styles.item}>
      <Text>{children}</Text>
    </View>
  );
};

type Item = { id: number };

const isShallowEqual = (prev: Item, next: Item) => prev.id !== next.id;

const list: Item[] = Array.from({ length: 100 }, (_, idx) => ({ id: idx }));

const RVL = {
  HEADER: "HEADER",
  BODY: "BODY",
  CM: "CM",
  FOOTER: "FOOTER",
} as const;

type RVL_TYPES = typeof RVL[keyof typeof RVL];

const defineType = (index: number) => {
  if (index == 0) return RVL.HEADER;
  if (index % 6 == 0) return RVL.CM; // 6個に１つ広告
  return RVL.BODY;
};

const defineDimension = (type: any, dim: any) => {
  const _type = type as RVL_TYPES;
  switch (_type) {
    case RVL.HEADER: {
      dim.width = WINDOW_WIDTH;
      dim.height = 50;
      return;
    }
    case RVL.BODY: {
      dim.width = WINDOW_WIDTH;
      dim.height = 30;
      return;
    }
    case RVL.CM: {
      dim.width = WINDOW_WIDTH;
      dim.height = 40;
      return;
    }
    case RVL.FOOTER: {
      dim.width = WINDOW_WIDTH;
      dim.height = 10;
      return;
    }
  }
};

const renderer = (_type: any, _item: any, index: number) => {
  const type = _type as RVL_TYPES;
  const item = _item as Item;
  switch (type) {
    case RVL.HEADER: {
      return <Cell>Header: {item.id}</Cell>;
    }
    case RVL.BODY: {
      return <Cell>Body: {item.id}</Cell>;
    }
    case RVL.CM: {
      return <Cell>CM: {item.id}</Cell>;
    }
    case RVL.FOOTER: {
      return <Cell>Footer: {item.id}</Cell>;
    }
    default: {
      return <Cell>DEFAULT: {item.id}</Cell>;
    }
  }
};

export const MyList = () => {
  const lp = new LayoutProvider(defineType, defineDimension);
  const dp = new DataProvider(isShallowEqual).cloneWithRows(list);
  return (
    <View style={styles.container}>
      <Text>------</Text>
      <RecyclerListView
        layoutProvider={lp}
        dataProvider={dp}
        rowRenderer={renderer}
      />
      <Text>------</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    width: WINDOW_WIDTH,
    height: HEIGHT_WIDTH,
  },
  item: {
    width: WINDOW_WIDTH,
    height: 200,
  },
});
