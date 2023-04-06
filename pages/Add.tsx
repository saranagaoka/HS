import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Dimensions,
} from "react-native";
import { TouchableHighlight } from "@gorhom/bottom-sheet";
import { useContext, useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import LocationIcon from "../images/location-02.svg";
import AddIcon from "../images/add-selected.svg";
import * as ImagePicker from "expo-image-picker";
import AddPageImage from "../components/Image";
import { AuthContext } from "../AuthContext";
import { AnimationType, LeafletView } from "react-native-leaflet-view";
import { ICoords, LocationContext } from "../LocationContext";
import { getAddressFromCoords, getCoordsFromString } from "../api/locationApi";
import { debounce } from "lodash";
import { SavePopUp } from "../components/SavePopUp";
import { NewPlacePopup } from "../components/NewPlacePopup";
import { baseApiUrl } from "../config";

interface IImage {
  id: string;
  uri: string;
}

export default function Add() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState<IImage[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const { getToken } = useContext(AuthContext);
  const { userLocation } = useContext(LocationContext);
  const [addressCoords, setAddressCoords] = useState<ICoords | undefined>(
    userLocation
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const choosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [10, 3],
      quality: 0.01,
    });

    if (!result.canceled) {
      const photoId = await sendImage(result.assets[0].uri);
      console.log(`photo: ${JSON.stringify(result.assets[0])}`);

      setImages((prev: IImage[] | undefined) => {
        return prev
          ? [...prev, { id: photoId, uri: result.assets![0].uri }]
          : [{ id: photoId, uri: result.assets![0].uri }];
      });
    }
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  const deleteImg = (img: string) => {
    setImages((prev) => prev?.filter((el) => el.uri !== img));
  };

  const sendImage = async (img: string) => {
    let body: any = new FormData();
    body.append("file", {
      uri: img,
      name: "my_photo.png",
      type: "image/png",
    });

    const token = await getToken();
    return fetch(`${baseApiUrl}/spots/photo/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: body,
    })
      .then((resp) => {
        console.log(`response: `, resp.status);
        return resp.json();
      })
      .then((photo) => {
        console.log(`jasoned response: ${photo}`);
        const { file, id, photo: photoUrl } = photo;
        return id;
      })
      .catch((err) => console.log(`error: ${err}`));
  };

  const handlePress = async () => {
    const token = await getToken();
    const body = {
      address: {
        lat: addressCoords?.lat,
        lon: addressCoords?.lng,
      },
      tags: tags.split(" "),
      temp_photos: images?.map((img: IImage) => img.id),
      title: title,
      description: description,
    };
    fetch(`${baseApiUrl}/spots/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((response) => {
        return response;
      })
      .catch((err) => {
        setError("Something went wrong");
        return err;
      });
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };

  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  const debounceInput = useCallback(
    debounce(async (text: string) => {
      const token = await getToken();
      const resp = await getCoordsFromString(token || "", text.toString());
      resp.lat &&
        resp.lon &&
        setAddressCoords({ lat: resp.lat, lng: resp.lon });
    }, 1000),
    []
  );

  const handleAddressChange = (text: string | number) => {
    setAddress(text.toString());
    if (!text) return;
    debounceInput(text.toString());
  };

  const handleTagsChange = (text: string) => {
    setTags(text);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLocationButtonPress = async () => {
    const token = await getToken();
    const resp = await getAddressFromCoords(
      token || "",
      userLocation || { lat: 50, lng: 20 }
    );
    if (resp.text) {
      setAddress(resp.text);
      setAddressCoords(userLocation);
    }
  };

  const handleMessageReceived = async (e: any) => {
    if (e.event === "onMapClicked") {
      setAddressCoords(e.payload.touchLatLng);

      const token = await getToken();
      const resp = await getAddressFromCoords(
        token || "",
        e.payload.touchLatLng
      );
      resp.text && setAddress(resp.text);
    }
  };

  return (
    <Header text="Add new place">
      <ScrollView contentContainerStyle={styles.page}>
        <TextInput
          style={[styles.borderAndShadow, styles.textInput]}
          placeholder="Title"
          onChangeText={handleTitleChange}
        />
        <TextInput
          style={[styles.textInput, styles.textArea, styles.borderAndShadow]}
          multiline={true}
          placeholder="Description"
          onChangeText={handleDescriptionChange}
        />
        {addressCoords?.lat && addressCoords.lng && (
          <View style={[styles.map, styles.borderAndShadow, { height: 180 }]}>
            <LeafletView
              ownPositionMarker={{
                icon: "your location",
                animation: {
                  type: AnimationType.FADE,
                },
                position: userLocation,
                size: 1,
              }}
              onMessageReceived={handleMessageReceived}
              mapMarkers={
                addressCoords
                  ? [
                      {
                        icon: AddIcon,
                        animation: {
                          type: AnimationType.FADE,
                        },
                        position: addressCoords,
                      },
                    ]
                  : undefined
              }
              // mapLayers={[
              //   {
              //     zIndex: 10,
              //     // url: "http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
              //     url: "https://khms3.google.com/kh/v=941?x={x}&y={y}&z={z}",
              //     // url: "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
              //     baseLayer: true,
              //     layerType: MapLayerType.TILE_LAYER,
              //     baseLayerIsChecked: true,
              //   },
              // ]}
              mapCenterPosition={addressCoords}
            />
          </View>
        )}
        <View style={styles.address}>
          <TextInput
            style={[
              styles.textInput,
              styles.addressInput,
              styles.borderAndShadow,
            ]}
            placeholder="Address"
            onChangeText={handleAddressChange}
            value={address}
          />
          <TouchableHighlight
            style={[styles.locationButton, styles.borderAndShadow]}
            underlayColor="#f6f6f6"
            onPress={handleLocationButtonPress}
          >
            <LocationIcon />
          </TouchableHighlight>
        </View>
        <TextInput
          style={[styles.textInput, styles.borderAndShadow]}
          placeholder="Tags"
          onChangeText={handleTagsChange}
        />
        <View style={{ width: "100%" }}>
          <ScrollView horizontal={true} style={styles.photos}>
            {images && images?.length < 5 && (
              <TouchableHighlight
                underlayColor="#f6f6f6"
                onPress={choosePhoto}
                style={[styles.addButton, styles.borderAndShadow]}
              >
                <AddIcon />
              </TouchableHighlight>
            )}
            {images?.reverse().map((img: IImage) => (
              <AddPageImage key={img.uri} img={img.uri} onClick={deleteImg} />
            ))}
          </ScrollView>
        </View>
        <Button title="Save" onPress={handlePress} />
        {error && <Text>{error}</Text>}
        {modalVisible && (
          <NewPlacePopup modalVisible={modalVisible} closeModal={closeModal} />
        )}
      </ScrollView>
    </Header>
  );
}

const styles = StyleSheet.create({
  borderAndShadow: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
  page: {
    width: Dimensions.get("screen").width,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    padding: 16,
    paddingBottom: 100,
  },
  textInput: {
    backgroundColor: "white",
    width: "100%",
    padding: 16,
    marginVertical: 10,
  },
  textArea: {
    backgroundColor: "white",
    paddingTop: 16,
    height: 120,
  },
  map: {
    height: 100,
    width: "100%",
    overflow: "hidden",
  },
  address: {
    display: "flex",
    gap: 16,
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  addressInput: {
    flexShrink: 1,
  },
  locationButton: {
    width: 46,
    height: 46,
    marginLeft: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  photos: {
    paddingVertical: 16,
  },
  addButton: {
    width: 120,
    height: 120,
    backgroundColor: "white",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 120,
    height: 120,
    marginLeft: 16,
    borderRadius: 12,
  },
});
