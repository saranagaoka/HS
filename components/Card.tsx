import React, { useContext } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LikeIcon from "../images/like.svg";
import LikeFilledIcon from "../images/like-filled.svg";
import AddressIcon from "../images/address.svg";
import { CardContext } from "../CardContext";
import { IPlace } from "../types";

export default function Card({ place }: { place: IPlace }) {
  const { openCard, startLoading } = useContext(CardContext);
  const handleClick = () => {
    openCard(place.id);
    startLoading();
  };

  const data: string[] = place
    ? place?.gallery.photos.map((el) => el.photo)
    : [];

  const noImageUrl = "https://picsum.photos/200";

  return (
    <TouchableHighlight
      style={styles.card}
      onPress={handleClick}
      underlayColor="#f6f6f6"
    >
      <>
        <View style={styles.topText}>
          <Text numberOfLines={1} style={styles.title}>
            {place.title}
          </Text>
          <View style={styles.likesWrapper}>
            <Text style={styles.likes}>231</Text>
            {place.title.length > 12 ? <LikeFilledIcon /> : <LikeIcon />}
          </View>
        </View>
        <ImageBackground
          source={{ uri: data[0] || noImageUrl }}
          style={styles.photo}
          imageStyle={{ borderRadius: 20 }}
        >
          <LinearGradient
            colors={["#00000000", "#000000AA", "#000000AA"]}
            style={styles.addressWrapper}
          >
            <AddressIcon />
            <Text style={styles.address} numberOfLines={1}>
              {place.address.street} {place.address.number},{" "}
              {place.address.city}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    width: Dimensions.get("window").width / 2 - 20,
    height: Dimensions.get("window").width / 2 - 20,
    margin: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  topText: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  title: {
    flex: 1,
    fontWeight: "600",
  },
  likesWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  likes: {
    marginRight: 4,
  },
  photo: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  addressWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    display: "flex",
    flexDirection: "row",
  },
  address: {
    color: "white",
    marginLeft: 8,
  },
});
