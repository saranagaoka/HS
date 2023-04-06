import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import MiniUserCard from "./MiniUserCard";
import { ListItem } from "./ListItem";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CollectionListHorizontal({
  openCollection,
  openSeeAllCollectionsResult,
}: {
  openCollection: () => void;
  openSeeAllCollectionsResult: () => void;
}) {
  const [collection, setCollection] = useState<string[]>([
    "Krk jedzenie",
    "Drinki",
    "Warszawa",
    "Europa",
  ]);

  return (
    <View>
      <View style={styles.searchTitle}>
        <Text style={styles.titleText}>Matching collections</Text>
        <TouchableOpacity onPress={openSeeAllCollectionsResult}>
          <Text style={styles.seeAllText}>see all &gt;</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal={true}>
        <View style={styles.home}>
          {collection.map((collection, i) => (
            <TouchableOpacity style={styles.listItem} key={i}>
              <ListItem onPress={openCollection} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    paddingTop: 10,
    paddingBottom: 6,
    paddingLeft: 8,
  },
  listItem: { paddingHorizontal: 8 },

  searchTitle: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },

  titleText: {
    fontWeight: "300",
    fontSize: 20,
  },
  seeAllText: {
    fontWeight: "300",
    fontSize: 16,
  },
});
