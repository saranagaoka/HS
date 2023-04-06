import { useEffect } from "react";
import { StyleSheet, View, Text, Share } from "react-native";
import { IFolder } from "../types";
import Arrow from "../images/arrow-left.svg";
import Lock from "../images/square-lock.svg";
import ShareIcon from "../images/share-02.svg";
import More from "../images/more-horizontal-circle-01.svg";
import { TouchableHighlight } from "react-native-gesture-handler";
import { CardsList } from "../components/CardsList";
import { CardsListSkeleton } from "../components/CardsListSkeleton";
import useFetch from "../api/useFetch";

export default function Collection({
  closeCollection,
  collection,
}: {
  closeCollection: () => void;
  collection: IFolder;
}) {
  const {
    fetchUrl: getPlaces,
    data: places,
    fetchNextPage,
  } = useFetch(`/folders/${collection.id}/spots/`);

  const shareData = async () => {
    try {
      await Share.share({
        message: "This is the demo text",
        url: "https://google.com",
        title: "some title",
      });
    } catch (error) {
      return { error: "Something went wrong" };
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableHighlight
          containerStyle={styles.icon}
          onPress={closeCollection}
          underlayColor="white"
        >
          <Arrow />
        </TouchableHighlight>
        <View style={styles.header}>
          <Text style={styles.topText}>{collection.name}</Text>
          <Text style={styles.bottomText}>
            {collection.spots_count || 0} places
          </Text>
        </View>
        <TouchableHighlight containerStyle={styles.icon}>
          <Lock />
        </TouchableHighlight>
        <TouchableHighlight
          containerStyle={styles.icon}
          underlayColor="white"
          onPress={shareData}
        >
          <ShareIcon />
        </TouchableHighlight>
        <TouchableHighlight containerStyle={styles.icon}>
          <More />
        </TouchableHighlight>
      </View>
      {places && places.length > 0 ? (
        <CardsList items={places} onEndReached={fetchNextPage} />
      ) : (
        <CardsListSkeleton />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: "100%", paddingTop: 40, display: "flex" },
  top: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 12,
    alignItems: "center",
    marginVertical: 20,
    flex: 0,
  },
  header: {
    flex: 1,
  },
  icon: {
    alignSelf: "stretch",
    paddingHorizontal: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  topText: {
    fontWeight: "600",
    fontSize: 20,
  },
  bottomText: { fontWeight: "300", fontSize: 12 },
});
