import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Lock from "../images/lock.svg";
import { IFolder } from "../types";

export const ListItem = ({
  onPress,
  folder,
}: {
  onPress: (id: IFolder) => void;
  folder: IFolder;
}) => {
  const handleClick = () => {
    onPress(folder);
  };

  return (
    <TouchableHighlight
      style={styles.container}
      onPress={handleClick}
      underlayColor="white"
    >
      <View style={styles.wrapper}>
        <View style={styles.text}>
          <View style={styles.titleContainer}>
            <Lock />
            <Text style={styles.title}>{folder.name}</Text>
          </View>
          <Text>{folder.spots_count || 0} places</Text>
        </View>
        <View style={styles.images}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: "https://picsum.photos/40" }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: "https://picsum.photos/40" }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: "https://picsum.photos/40" }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flex: 1,
    paddingRight: 16,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 8,
  },
  images: {
    display: "flex",
    flexDirection: "row",
    marginRight: 24,
  },
  imageWrapper: {
    marginRight: -24,
    width: 40,
    height: 40,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 8,
    shadowOffset: {
      height: 0,
      width: -2,
    },
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
});
