import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Circle from "../images/checkmark-circle-outline.svg";
import Checked from "../images/checkmark-circle-checked.svg";
import Locked from "../images/square-lock-collectionItem.svg";
import Unlocked from "../images/square-unlock-collectionItem.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IFolder } from "../types";

export default function CollectionItem({
  folder,
  checked,
  checkFolder,
}: {
  folder: IFolder;
  checked: boolean;
  checkFolder: (folderId: number) => void;
}) {
  const handlePress = () => {
    checkFolder(folder.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        <TouchableOpacity onPress={handlePress}>
          {checked ? <Checked /> : <Circle />}
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.name}>
          {folder.name}
        </Text>
      </View>
      {folder.public ? <Unlocked /> : <Locked />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 12,
    alignItems: "center",
  },
  leftSide: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "300",
    paddingLeft: 8,
  },
});
