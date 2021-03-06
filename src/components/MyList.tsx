import React from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import { Item } from "../type";
import { Cell } from "./Cell";

const WINDOW_WIDTH = Dimensions.get("window").width;
const HEIGHT_WIDTH = Dimensions.get("window").width;

const shallowCompare = (prev: Item, next: Item) => prev.id !== next.id;

const RVL = {
  HEADER: "HEADER",
  BODY: "BODY",
  CM: "CM",
  FOOTER: "FOOTER",
} as const;

type RVL_TYPES = typeof RVL[keyof typeof RVL];

const createDefineType =
  ({ isLast }: { isLast: (idx: number) => boolean }) =>
  (index: number) => {
    if (index == 0) return RVL.HEADER;
    if (index % 6 == 0) return RVL.CM; // 6個に１つ広告
    if (isLast(index)) return RVL.FOOTER;
    return RVL.BODY;
  };

const defineDimension = (type: any, dim: any) => {
  const _type = type as RVL_TYPES;
  switch (_type) {
    case RVL.HEADER: {
      dim.width = WINDOW_WIDTH;
      dim.height = 20;
      return;
    }
    case RVL.BODY: {
      dim.width = WINDOW_WIDTH;
      dim.height = 20;
      return;
    }
    case RVL.CM: {
      dim.width = WINDOW_WIDTH;
      dim.height = 20;
      return;
    }
    case RVL.FOOTER: {
      dim.width = WINDOW_WIDTH;
      dim.height = 20;
      return;
    }
  }
};

const renderer = (_type: any, _item: any, index: number) => {
  const type = _type as RVL_TYPES;
  const item = _item as Item;
  switch (type) {
    case RVL.HEADER: {
      return <Cell color="red">Header: {item.id}</Cell>;
    }
    case RVL.BODY: {
      return <Cell color="pink">Body: {item.id}</Cell>;
    }
    case RVL.CM: {
      return <Cell color="green">CM: {item.id}</Cell>;
    }
    case RVL.FOOTER: {
      return <Cell color="blue">Footer: {item.id}</Cell>;
    }
    default: {
      return <Cell>DEFAULT: {item.id}</Cell>;
    }
  }
};

type Props = { list: Item[]; onEndReached: () => void };

export const MyList: React.VFC<Props> = ({ list, onEndReached }) => {
  const isLast = (idx: number) => list.length - 1 === idx;
  const defineType = createDefineType({ isLast });
  const lp = new LayoutProvider(defineType, defineDimension);
  const dp = new DataProvider(shallowCompare).cloneWithRows(list);
  const shouldRenderRVL = list.length > 1;
  return (
    <View style={styles.container}>
      {shouldRenderRVL ? (
        <RecyclerListView
          /********************
           * Required
           *******************/
          layoutProvider={lp}
          dataProvider={dp}
          rowRenderer={renderer}
          /******************
           * options
           *******************/
          onEndReached={onEndReached}
        />
      ) : (
        <Text>Empty</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WINDOW_WIDTH,
    height: HEIGHT_WIDTH,
  },
  item: {
    width: WINDOW_WIDTH,
    height: 20,
  },
});
