import React from "react";
import { ListRenderItemInfo } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { IPlace } from "../types";
import Card from "./Card";

export const CardsList = ({
  items,
  onEndReached,
}: {
  items: IPlace[];
  onEndReached: () => void;
}) => {
  const renderData = (data: ListRenderItemInfo<IPlace>) => {
    return <Card place={data.item} />;
  };

  return (
    <FlatList
      numColumns={2}
      data={items}
      renderItem={renderData}
      onEndReached={onEndReached}
      onEndReachedThreshold={1}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
};
