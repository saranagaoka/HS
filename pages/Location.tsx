import { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../components/Header";
import Add from "../images/add-orange-glowy.svg";
import Minus from "../images/minus.svg";
import { CardsList } from "../components/CardsList";
import {
  useGetPlacesByDistance,
  useGetNextPlacesByDistance,
} from "../api/placesApi";
import { AuthContext } from "../AuthContext";
import { IPlace } from "../types";
import { HomeSkeleton } from "../components/HomeSkeleton";
import { debounce } from "lodash";

export default function Location() {
  const [distance, setDistance] = useState(10);
  const { getToken, token } = useContext(AuthContext);
  const [nextPlacesUrl, setNextPlacesUrl] = useState<string | undefined>(
    undefined
  );
  const placesRequest = useGetPlacesByDistance(
    token || "",
    distance,
    "50",
    "20"
  );
  const nextPlacesRequest = useGetNextPlacesByDistance(
    token || "",
    nextPlacesUrl || ""
  );
  const [places, setPlaces] = useState<IPlace[]>(
    placesRequest?.data?.results || []
  );
  const [placesCount, setPlacesCount] = useState(
    placesRequest?.data?.count || 0
  );

  const subtraction = () => {
    distance > 1 && setDistance((prev) => prev - 1);
  };

  const adding = () => {
    distance < 99 && setDistance((prev) => prev + 1);
  };

  const fetchNextPlaces = async () => {
    if (!nextPlacesUrl) return;
    const resp = await nextPlacesRequest?.refetch();
    setNextPlacesUrl(resp?.data?.next);
    if (resp?.data) {
      setPlaces((prev) => [...prev, ...resp.data.results]);
      setPlacesCount(resp.data.count);
    }
  };

  const fetchPlaces = async () => {
    await getToken();
    const resp = await placesRequest?.refetch();
    resp?.data?.results && setPlaces(resp?.data?.results);
    setNextPlacesUrl(resp?.data?.next);
    resp?.data?.count && setPlacesCount(resp?.data?.count);
  };

  const debounceFetchPlaces = useCallback(
    debounce(async () => {
      setPlaces([]);
      placesRequest?.remove();
      await fetchPlaces();
    }, 1000),
    [distance]
  );

  useEffect(() => {
    debounceFetchPlaces();
  }, [distance]);

  useEffect(() => {
    fetchPlaces();
  }, []);

  return placesRequest?.isFetching && places.length === 0 ? (
    <HomeSkeleton />
  ) : (
    <Header
      text="Welcome, Sara!"
      number={placesCount.toString()}
      numberText="places near you"
    >
      <>
        <View style={styles.distance}>
          <Text style={styles.text}>up to</Text>
          <TouchableOpacity onPress={subtraction}>
            <Minus />
          </TouchableOpacity>
          <View style={styles.kilos}>
            <Text style={styles.kilometers}>{distance}</Text>
            <Text style={styles.km}>km</Text>
          </View>
          <TouchableOpacity onPress={adding}>
            <Add />
          </TouchableOpacity>
          <Text style={styles.text}>away</Text>
        </View>
        <CardsList items={places} onEndReached={fetchNextPlaces} />
      </>
    </Header>
  );
}

const styles = StyleSheet.create({
  distance: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontWeight: "300", fontSize: 20, color: "black", padding: 8 },
  textButton: { color: "#E06800" },
  kilos: { display: "flex", alignItems: "center" },
  kilometers: { fontWeight: "500", fontSize: 32, paddingHorizontal: 12 },
  km: { fontWeight: "300", fontSize: 12, color: "black" },
  locationCards: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
