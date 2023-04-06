import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import MiniUserCard from "./MiniUserCard";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function UserListHorizontal({
  openUserProfile,
  openSeeAllUsers,
}: {
  openUserProfile: () => void;
  openSeeAllUsers: () => void;
}) {
  const [userNames, setUserNames] = useState<string[]>([
    "pies",
    "Klapcio",
    "Pandziur",
    "Maksymilianek",
  ]);

  return (
    <View>
      <View style={styles.searchTitle}>
        <Text style={styles.titleText}>Matching Users</Text>
        <TouchableOpacity onPress={openSeeAllUsers}>
          <Text style={styles.seeAllText}>see all &gt;</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        <View style={styles.home}>
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
  },
});
