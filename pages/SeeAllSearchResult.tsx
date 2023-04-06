import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { CardsList } from "../components/CardsList";
import { useGetPlaces, useGetNextPlaces } from "../api/placesApi";
import { AuthContext } from "../AuthContext";
import { IPlace } from "../types";
import Arrow from "../images/arrow-left.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function SeeAllSearchResult({
  header,
  closeSeeAll,
}: {
  header: string;
  closeSeeAll: () => void;
}) {
  const { getToken, token } = useContext(AuthContext);
  const [nextPlacesUrl, setNextPlacesUrl] = useState<string | undefined>(
    undefined
  );
  const placesRequest = useGetPlaces(token || "");
  const nextPlacesRequest = useGetNextPlaces(token || "", nextPlacesUrl || "");
  const [places, setPlaces] = useState<IPlace[]>(
    placesRequest?.data?.results || []
  );

  const fetchNextPlaces = async () => {
    if (!nextPlacesUrl) return;
    const resp = await nextPlacesRequest?.refetch();
    setNextPlacesUrl(resp?.data?.next);
    if (resp?.data) {
      setPlaces((prev) => [...prev, ...resp.data.results]);
    }
  };

  const fetchPlaces = async () => {
    await getToken();
    const resp = await placesRequest?.refetch();
    resp?.data?.results && setPlaces(resp?.data?.results);
    setNextPlacesUrl(resp?.data?.next);
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <View style={styles.seeAllResult}>
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.arrow} onPress={closeSeeAll}>
          <Arrow />
        </TouchableOpacity>
        <Text style={styles.headerText}>Matching {header}</Text>
      </View>
      <CardsList items={places} onEndReached={fetchNextPlaces} />
    </View>
  );
}

const styles = StyleSheet.create({
  seeAllResult: {
    marginTop: 60,
  },
  arrow: { padding: 4, paddingRight: 8 },
  topHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  headerText: {
    fontWeight: "400",
    fontSize: 20,
  },
});
