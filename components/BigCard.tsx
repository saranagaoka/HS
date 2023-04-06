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
import CheckmarkBadge from "../images/checkmark-badge.svg";
import FavOutline from "../images/favourite-outline.svg";
import FavFilled from "../images/favourite-filled.svg";
import Location from "../images/location-02.svg";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { getPlace, useGetPlaceFolders } from "../api/placesApi";
import { IFolder, IPhoto, IPlace } from "../types";
import { AuthContext } from "../AuthContext";
import { mockPlace } from "../mockData";
import BigCardSkeleton from "./BigCardSkeleton";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SavePopUp } from "./SavePopUp";
import useFetch from "../api/useFetch";

export default function BigCard() {
  const { getToken } = useContext(AuthContext);
  const { placeId, closeCard, sheetRef, finishLoading, isLoading } =
    useContext(CardContext);
  const [place, setPlace] = useState<IPlace | undefined>(mockPlace);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {
    data: foldersData,
    isLoading: foldersLoading,
    fetchUrl: fetchFolders,
  } = useFetch(`/spots/${placeId}/folders/`);

  const fetchPlace = async () => {
    if (!placeId) return;
    const token = await getToken();
    const response = await getPlace(token || "", placeId);

    response && finishLoading();
    setPlace(response);
  };

  const like = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const reloadPlace = () => {
    fetchPlace();
    fetchFolders();
  };

  useEffect(() => {
    fetchPlace();
  }, [placeId]);

  const data: string[] = place
    ? place?.gallery?.photos.map((el) => el.photo)
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
    <BottomSheet
      style={styles.bigCard}
      snapPoints={["90%"]}
      ref={sheetRef}
      enablePanDownToClose={true}
      onClose={closeCard}
      index={-1}
    >
      <BottomSheetView>
        {isLoading ? (
          <BigCardSkeleton />
        ) : (
          <View
            style={{
              height: "100%",
            }}
          >
            <SavePopUp
              modalVisible={modalVisible}
              closeModal={closeModal}
              placeId={place?.id || "1"}
              folders={foldersData}
              reloadPlace={reloadPlace}
              isLoading={foldersLoading}
            />
            <View style={{ flex: 0 }}>
              <View style={styles.closeButton}>
                <Text style={styles.newText}>
                  {place?.date_created &&
                  place?.date_created < Date.now() - 1000 * 60 * 60 * 5
                    ? ""
                    : "new!"}
                </Text>
                <TouchableHighlight
                  style={styles.buttonPadding}
                  underlayColor={"transparent"}
                  onPress={closeCard}
                >
                  <CloseIcon />
                </TouchableHighlight>
              </View>
              <Text style={styles.title}>{place?.title}</Text>
              <View style={styles.addedCheckmark}>
                <View style={styles.bottomText}>
                  <Text style={styles.addInfo}>added by</Text>
                  <TouchableOpacity>
                    <Text> {place?.owner.username} </Text>
                  </TouchableOpacity>
                  <CheckmarkBadge />
                </View>
                <View style={styles.bottomText}>
                  <Text style={styles.likesNum}>{place?.likes}</Text>
                  <TouchableOpacity onPress={like} style={styles.buttonPadding}>
                    {foldersData?.filter((el: IFolder) => el.includes_spot)
                      .length > 0 ? (
                      <FavFilled />
                    ) : (
                      <FavOutline />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <FlatList
                data={data}
                style={styles.images}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: item }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                )}
              />
              <View style={styles.bottom}>
                <TouchableHighlight
                  style={styles.adress}
                  onPress={openMaps}
                  underlayColor="#eee"
                >
                  <>
                    <Location />
                    <Text style={styles.adressText}>
                      {place?.address.street} {place?.address.number}
                      {place?.address.city} {place?.address.country}
                    </Text>
                  </>
                </TouchableHighlight>
                <Text style={styles.hashtags}>{place?.tags}</Text>
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                  <Text style={styles.description}>{place?.description}</Text>
                </ScrollView>
              </View>
            </View>
          </View>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bigCard: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    padding: 20,
    paddingTop: 8,
  },
  images: {
    borderRadius: 20,
    flexGrow: 0,
    height: "65%",
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  newText: {
    color: "#E06800",
    fontSize: 20,
  },
  addInfo: { fontSize: 16, paddingRight: 8 },
  addedCheckmark: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 4,
    justifyContent: "space-between",
  },
  closeButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonPadding: {
    padding: 10,
    margin: -10,
  },
  bottomText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  likesNum: {
    paddingRight: 8,
  },
  bottom: { paddingTop: 8, height: "35%" },
  adressText: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "black",
    paddingLeft: 6,
    fontWeight: "300",
  },
  adress: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 8,
    alignItems: "center",
  },
  hashtags: {
    fontSize: 16,
    color: "#2F3537",
    fontWeight: "300",
    paddingBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "black",
    fontWeight: "500",
    textAlign: "justify",
    paddingBottom: 16,
  },
});
