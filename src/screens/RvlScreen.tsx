import React, { useCallback, useState, useMemo } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { MyList } from "../components/MyList";
import { Item } from "../type";

const Space = () => <View style={styles.space} />;

const createList = (length: number) =>
  Array.from({ length }, (_, idx) => ({ id: idx })) as Item[];

const useListData = () => {
  const [length, setLength] = useState<number>(100);

  const onIncrement = useCallback(() => {
    setLength((prev) => prev + 100);
  }, []);

  const onDecrement = useCallback(() => {
    if (length <= 0) return;
    setLength((prev) => prev - 100);
  }, [length]);

  const list = useMemo(() => createList(length), [length]);

  return { onIncrement, onDecrement, list };
};

export const RvlScreen = () => {
  const { onIncrement, onDecrement, list } = useListData();

  return (
    <>
      <Space />
      <View style={styles.buttonContainer}>
        <Button onPress={onIncrement} title="+100" />
        <Text>{list.length}</Text>
        <Button onPress={onDecrement} title="-100" />
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  space: {
    height: 50,
  },
});
