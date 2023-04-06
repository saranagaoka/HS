import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Card from "../components/Card";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import Header from "../components/Header";
import { mockPlace } from "../mockData";
import MiniUserCard from "../components/MiniUserCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import CardListHorizontal from "../components/CardListHorizontal";
import UserListHorizontal from "../components/UserListHorizontal";
import SeeAllSearchResult from "./SeeAllSearchResult";
import UserPage from "./UserPage";
import CollectionListHorizontal from "../components/CollectionListHorizontal";
import Collection from "./Collection";
import SeeAllCollectionResult from "./SeeAllCollectionResult";
import SeeAllUsersResult from "./SeeAllUsersResult";

export default function Search() {
  const [numberRes, setNumberRes] = useState<number>(21);
  const [inputValue, setInputValue] = useState<string>("krakow drinks");
  const [header, setHeader] = useState<string | undefined>(undefined);
  const [displayUser, setDisplayUser] = useState<boolean>(false);
  const [displayCollection, setDisplayCollection] = useState<boolean>(false);
  const [seeAllCollections, setSeeAllCollections] = useState<boolean>(false);
  const [seeAllUsers, setSeeAllUsers] = useState<boolean>(false);

  const openSeeAll = (headerText: string) => {
    setHeader(headerText);
  };

  const closeSeeAll = () => {
    setHeader(undefined);
  };

  const openUserProfile = () => {
    setDisplayUser(true);
  };

  const closeUserProfile = () => {
    setDisplayUser(false);
  };

  const openCollection = () => {
    setDisplayCollection(true);
  };
  const closeCollection = () => {
    setDisplayCollection(false);
  };

  const openSeeAllCollectionsResult = () => {
    setSeeAllCollections(true);
  };
  const closeSeeAllCollectionsResult = () => {
    setSeeAllCollections(false);
  };

  const openSeeAllUsers = () => {
    setSeeAllUsers(true);
  };

  const closeSeeAllUsers = () => {
    setSeeAllUsers(false);
  };

  return header ? (
    <SeeAllSearchResult header={header} closeSeeAll={closeSeeAll} />
  ) : displayUser ? (
    <UserPage closeUserProfile={closeUserProfile} />
  ) : displayCollection ? (
    <Collection closeCollection={closeCollection} />
  ) : seeAllCollections ? (
    <SeeAllCollectionResult
      closeSeeAll={closeSeeAllCollectionsResult}
      openCollection={openCollection}
    />
  ) : seeAllUsers ? (
    <SeeAllUsersResult
      openSeeAllUsers={openSeeAllUsers}
      closeSeeAllUsers={closeSeeAllUsers}
      openUserProfile={openUserProfile}
    />
  ) : (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{numberRes} results</Text>
        <Text style={styles.forText}>for "{inputValue}"</Text>
      </View>
      <ScrollView contentContainerStyle={styles.results}>
        <CardListHorizontal headerText="title" openSeeAll={openSeeAll} />
        <CardListHorizontal headerText="tags" openSeeAll={openSeeAll} />
        <CardListHorizontal headerText="description" openSeeAll={openSeeAll} />
        <CardListHorizontal headerText="address" openSeeAll={openSeeAll} />
        <CollectionListHorizontal
          openCollection={openCollection}
          openSeeAllCollectionsResult={openSeeAllCollectionsResult}
        />
        <UserListHorizontal
          openUserProfile={openUserProfile}
          openSeeAllUsers={openSeeAllUsers}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    marginTop: 60,
  },
  headerText: {
    fontWeight: "400",
    fontSize: 20,
  },
  forText: {
    fontSize: 12,
    fontWeight: "300",
  },

  container: {
    height: Dimensions.get("screen").height,
  },
  results: {
    paddingBottom: 80,
  },
});
