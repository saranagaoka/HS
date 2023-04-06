import React, { useContext, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import { CardContext } from "../CardContext";
import CheckmarkBadge from "../images/checkmark-badge.svg";

export default function MiniUserCard({
  userName,
  openUserProfile,
}: {
  userName: string;
  openUserProfile: () => void;
}) {
  const [isVerified, setIsVerified] = useState<boolean>(true);
  const [addedPlaces, setAddedPlaces] = useState<number>(20);
  const [publicCollections, setPublicCollections] = useState<number>(29);
  const { startLoading } = useContext(CardContext);

  const handleClick = () => {
    startLoading();
    openUserProfile();
  };

  return (
    <TouchableHighlight
      style={styles.card}
      onPress={handleClick}
      underlayColor="#f6f6f6"
    >
      <View style={styles.container}>
        <Text numberOfLines={1} style={styles.header}>
          @{userName} {isVerified && <CheckmarkBadge />}
        </Text>
        <Text style={styles.addedPlaces}>{addedPlaces} added places</Text>
        <Text>{publicCollections} public collections</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    width: Dimensions.get("window").width * 0.75,
    height: Dimensions.get("window").width / 2 - 100,
    margin: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  header: {
    fontWeight: "400",
    fontSize: 20,
    paddingBottom: 8,
  },
  addedPlaces: {
    paddingBottom: 2,
  },
});
