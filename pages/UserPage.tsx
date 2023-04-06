import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import Card from "../components/Card";
import { useState } from "react";
import { mockPlace } from "../mockData";
import { ListItem } from "../components/ListItem";
import Collection from "./Collection";
import CheckmarkBadge from "../images/checkmark-badge.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import CloseIcon from "../images/close-black.svg";

export default function UserPage({
  closeUserProfile,
}: {
  closeUserProfile: () => void;
}) {
  const [isCollections, setIsCollections] = useState(true);

  const [collectionId, setCollectionId] = useState("");

  const openCollections = () => {
    setIsCollections(true);
  };

  const closeCollection = () => {
    setCollectionId("");
  };

  const openCreated = () => {
    setIsCollections(false);
  };

  const handleClick = () => {
    setCollectionId("3");
  };

  return collectionId ? (
    <Collection closeCollection={closeCollection} />
  ) : (
    <View style={{ ...styles.page, flexGrow: 1 }}>
      <View style={styles.top}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <View style={styles.userClose}>
              <Text style={styles.headerTitle}>
                @Klapcio <CheckmarkBadge />
              </Text>
              <TouchableOpacity onPress={closeUserProfile}>
                <CloseIcon style={{ padding: 8 }} />
              </TouchableOpacity>
            </View>

            <Text style={styles.headerSubtitle}>
              2 saved collections, 64 places created
            </Text>
          </View>
        </View>

        <View style={styles.headerSwitch}>
          <View
            style={[
              styles.switchIndicator,
              isCollections
                ? {
                    left: "2%",
                  }
                : {
                    right: "2%",
                  },
            ]}
          ></View>
          <TouchableHighlight
            style={styles.switchOption}
            onPress={openCollections}
            underlayColor={"transparent"}
          >
            <Text
              style={[
                styles.switchOptionText,
                { color: isCollections ? "#fff" : "#000" },
              ]}
            >
              Collections
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.switchOption}
            onPress={openCreated}
            underlayColor={"transparent"}
          >
            <Text
              style={[
                styles.switchOptionText,
                { color: isCollections ? "#000" : "#fff" },
              ]}
            >
              Created
            </Text>
          </TouchableHighlight>
        </View>
      </View>
      {isCollections ? (
        <ScrollView contentContainerStyle={styles.collectionsList}>
          {[...Array(10).keys()].map((_, i) => (
            <ListItem key={i} onPress={handleClick} />
          ))}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.placesList}>
          {[...Array(10).keys()].map((_, i) => (
            <Card place={mockPlace} key={i} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 70,
    flexGrow: 1,
  },
  top: {
    paddingHorizontal: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
  },
  headerText: {
    display: "flex",
    flex: 1,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    alignItems: "center",
  },
  headerSubtitle: {
    fontSize: 12,
  },
  filterContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  filterOption: {
    flex: 1,
    backgroundColor: "green",
    padding: 8,
    borderRadius: 8,
  },
  filterOptionText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  headerSwitch: {
    backgroundColor: "#fff",
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginVertical: 20,
  },
  switchOption: {
    flex: 1,
    padding: 16,
  },
  switchOptionText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  switchIndicator: {
    width: "48%",
    height: "70%",
    backgroundColor: "#E06800",
    position: "absolute",
    top: "15%",
    borderRadius: 10,
  },
  collectionsList: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 220,
  },
  placesList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 220,
  },
  userClose: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 4,
    alignItems: "center",
  },
});

const styles2 = StyleSheet.create({
  home: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    paddingTop: 10,
    paddingBottom: 6,
  },
  searchPage: {
    marginBottom: 80,
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
