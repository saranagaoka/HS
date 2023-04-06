import React from "react";
import { SafeAreaView, View } from "react-native";
import { CardsListSkeleton } from "./CardsListSkeleton";
import { Skeleton } from "./Skeleton";

export const HomeSkeleton = () => {
  return (
    <SafeAreaView>
      <View style={{ alignItems: "center" }}>
        <Skeleton width={100} height={20} />
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Skeleton width={150} height={120} />
          <View style={{ marginLeft: 10 }}>
            <Skeleton width={100} height={20} />
            <Skeleton width={120} height={20} />
            <Skeleton width={110} height={20} />
          </View>
        </View>
      </View>
      <CardsListSkeleton />
    </SafeAreaView>
  );
};
