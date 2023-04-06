import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableHighlight,
  FlatList,
  Image,
  Text,
  Linking,
  Platform,
} from "react-native";
import { CardContext } from "../CardContext";
import CloseIcon from "../images/close-black.svg";
import XIcon from "../images/x-red.svg";
import AddHeart from "../images/heart-orange.svg";
import CheckmarkBadge from "../images/checkmark-badge.svg";
import FavIcon from "../images/favourite-outline.svg";
import FavouriteOutline from "../images/favourite-filled.svg";
import Location from "../images/location-02.svg";
import { getPlace } from "../api/placesApi";
import { IPlace } from "../types";
import { AuthContext } from "../AuthContext";
import { mockPlace } from "../mockData";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SavePopUp } from "./SavePopUp";

export default function TinderCard({
  closeMatching,
}: {
  closeMatching: () => void;
}) {
  const { getToken } = useContext(AuthContext);
  const { placeId, finishLoading } = useContext(CardContext);
  const [place, setPlace] = useState<IPlace | undefined>(mockPlace);
  const [addToFav, setAddToFav] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const fetchPlace = async () => {
    if (!placeId) return;
    const token = await getToken();
    const response = await getPlace(token || "", placeId);

    response && finishLoading();
    setPlace(response);
  };

  const like = () => {
    setAddToFav((prev) => !prev);
    addToFav && setModalVisible(true);
  };

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  const closeUserProfile = () => {
    setIsProfileOpen(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    fetchPlace();
  }, [placeId]);

  const data: string[] = place
    ? place?.gallery.photos.map((el) => el.photo)
    : [];

  const openMaps = () => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${place?.address.lat},${place?.address.lon}`;
    const label = place?.title;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url || "");
  };

  return (
    <View style={styles.background}>
      <View style={styles.tinderCard}>
        <View style={styles.top}>
          <Text style={styles.header}>{place?.title}</Text>
          <TouchableOpacity onPress={closeMatching}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <View style={styles.infoLeft}>
            <Text>added by</Text>
            <TouchableOpacity onPress={openProfile}>
              <Text> {place?.owner.username} </Text>
            </TouchableOpacity>
            <CheckmarkBadge />
          </View>

          <View style={styles.infoRight}>
            <Text>211</Text>
            <TouchableOpacity
              onPress={like}
              style={{ paddingRight: 5, paddingLeft: 2 }}
            >
              {addToFav ? <FavIcon /> : <FavouriteOutline />}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            style={styles.images}
            data={data}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item }}
                  resizeMode="cover"
                  style={styles.image}
                />
              </View>
            )}
          />
          <View style={styles.bottom}>
            <TouchableHighlight onPress={openMaps} underlayColor="#eee">
              <View style={styles.address}>
                <Location />
                <Text>
                  {place?.address.street} {place?.address.number}
                  {place?.address.city} {place?.address.country}
                </Text>
              </View>
            </TouchableHighlight>
            <View style={styles.tags}>
              <Text>{place?.tags}</Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
              <Text>{place?.description} </Text>
            </ScrollView>
          </View>
          <View style={styles.chooseButtons}>
            <TouchableOpacity style={styles.button}>
              <XIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <AddHeart />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* {modalVisible && (
        <SavePopUp modalVisible={modalVisible} closeModal={closeModal} />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: "#F7F9FC" },
  tinderCard: {
    flex: 1,
    marginTop: 70,
    backgroundColor: "#ededed",
    marginBottom: 120,
    marginHorizontal: 10,
    padding: 12,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: { color: "black", fontWeight: "900", fontSize: 26 },
  images: {
    borderRadius: 20,
    flexGrow: 0,
    height: "65%",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 4,
    paddingBottom: 8,
    alignItems: "center",
  },
  infoLeft: { display: "flex", flexDirection: "row" },
  infoRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  chooseButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#E06800",
    padding: 8,
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  imageContainer: {
    backgroundColor: "#eee",
    width: Dimensions.get("screen").width - 40,
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  address: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 8,
  },
  bottom: {},
  tags: { paddingBottom: 8 },
});
