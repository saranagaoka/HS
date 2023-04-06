import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useGetPlaces, useGetNextPlaces } from "../api/placesApi";
import { AuthContext } from "../AuthContext";
import { IPlace } from "../types";
import Arrow from "../images/arrow-left.svg";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MiniUserCard from "../components/MiniUserCard";

export default function SeeAllUsersResult({
  closeSeeAllUsers,
  openSeeAllUsers,
  openUserProfile,
}: {
  closeSeeAllUsers: () => void;
  openSeeAllUsers: () => void;
  openUserProfile: () => void;
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

  const [collection, setCollection] = useState<string[]>([
    "Krk jedzenie",
    "Drinki",
    "Warszawa",
    "Europa",
  ]);

  const [userNames, setUserNames] = useState<string[]>([
    "Klapoch",
    "Ikar",
    "Admin",
    "Sara",
  ]);

  return (
    <View style={styles.seeAllResult}>
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.arrow} onPress={closeSeeAllUsers}>
          <Arrow />
        </TouchableOpacity>
        <Text style={styles.headerText}>Matching users</Text>
      </View>
      <ScrollView contentContainerStyle={styles.collectionsList}>
        <View style={styles.users}>
          {userNames.map((userName, i) => (
            <MiniUserCard
              userName={userName}
              key={i}
              openUserProfile={openUserProfile}
            />
          ))}
        </View>
      </ScrollView>
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
  collectionsList: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 220,
  },
  users: {
    display: "flex",
    alignItems: "center",
  },
});
