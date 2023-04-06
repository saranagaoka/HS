import Rect from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

export const Skeleton = ({
  width,
  height,
  style,
}: {
  width: number | string;
  height: number | string;
  style?: ViewStyle;
}) => {
  return (
    <View
      style={[styles.skeleton, { width: width, height: height }, { ...style }]}
    ></View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#ccc",
    borderRadius: 12,
    marginVertical: 4,
  },
});
