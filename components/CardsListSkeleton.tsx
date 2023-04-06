import React from "react";
import { View, Dimensions } from "react-native";
import { Skeleton } from "./Skeleton";

export const CardsListSkeleton = () => {
  const size = Dimensions.get("screen").width * 0.45;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: "2%",
      }}
    >
      {[...Array(10).keys()].map((idx) => (
        <Skeleton
          key={idx}
          height={size}
          width={size}
          style={{ marginHorizontal: "1.5%", borderRadius: 24 }}
        />
      ))}
    </View>
  );
};
