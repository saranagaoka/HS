import { ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "./Card";
import { mockPlace } from "../mockData";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CardListHorizontal({
  headerText,
  openSeeAll,
}: {
  headerText: string;
  openSeeAll: (headerText: string) => void;
}) {
  const handlePress = () => {
    openSeeAll(headerText);
  };
  return (
    <View>
      <View style={styles.searchTitle}>
        <Text style={styles.titleText}>Matching {headerText}</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.seeAllText}>see all &gt;</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal={true}>
        <View style={styles.home}>
          {[...Array(8)].map((_, i) => (
            <Card place={mockPlace} key={i} />
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
  },

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
    paddingTop: 8,
    paddingLeft: 12,
  },
});
