import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { mockPlace } from "../mockData";
import Filter from "../images/filter.svg";
import FilterSelected from "../images/filter-selected.svg";
import Add from "../images/add-grey.svg";
import { ListItem } from "../components/ListItem";
import Collection from "./Collection";
import { CreateNewCollectionPopUp } from "../components/CreateNewCollectionPopUp";
import useFetch from "../api/useFetch";
import { IFolder } from "../types";

enum IFilterState {
  Public,
  Private,
  All,
}

export default function Favourites() {
  const [isCollections, setIsCollections] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterState, setFilterState] = useState<IFilterState>(
    IFilterState.All
  );
  const [openCollection, setOpenCollection] = useState<IFolder | undefined>();
  const [isCreateNewCollectionOpen, setIsCreateNewCollectionOpen] =
    useState<boolean>(false);
  const { fetchUrl, data: folders } = useFetch("/folders/");

  const openCollections = () => {
    setIsCollections(true);
  };

  const closeCollection = () => {
    setOpenCollection(undefined);
  };

  const openCreated = () => {
    setIsCollections(false);
  };

  const toggleFilter = () => {
    setFiltersOpen((prev) => !prev);
  };

  const filterPublic = () => {
    setFilterState(IFilterState.Public);
  };

  const filterAll = () => {
    setFilterState(IFilterState.All);
  };

  const filterPrivate = () => {
    setFilterState(IFilterState.Private);
  };

  const handleClick = (folder: IFolder) => {
    setOpenCollection(folder);
  };

  const createNewCollection = () => {
    setIsCreateNewCollectionOpen(true);
  };

  const closeNewCollectionModal = () => {
    setIsCreateNewCollectionOpen(false);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  const FilterOption = ({
    text,
    filter,
    onPress,
  }: {
    text: string;
    filter: IFilterState;
    onPress: () => void;
  }) => {
    return (
      <TouchableHighlight
        style={{
          ...styles.filterOption,
          backgroundColor: filterState === filter ? "#E06800" : "transparent",
        }}
        onPress={onPress}
        underlayColor="#fff"
      >
        <Text
          style={{
            ...styles.filterOptionText,
            color: filterState === filter ? "#fff" : "#000",
          }}
        >
          {text}
        </Text>
      </TouchableHighlight>
    );
  };

  return openCollection ? (
    <Collection collection={openCollection} closeCollection={closeCollection} />
  ) : (
    <View style={{ ...styles.page, flexGrow: 1 }}>
      <View style={styles.top}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Favorites</Text>
            <Text style={styles.headerSubtitle}>
              {folders?.length || 0} saved collections, 37 places created
            </Text>
          </View>
          <TouchableHighlight
            style={styles.headerButton}
            onPress={toggleFilter}
            underlayColor="#fff"
          >
            {filtersOpen ? <FilterSelected /> : <Filter />}
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.headerButton}
            onPress={createNewCollection}
          >
            <Add />
          </TouchableHighlight>
        </View>
        {filtersOpen && (
          <View style={styles.filterContainer}>
            <FilterOption
              filter={IFilterState.Public}
              onPress={filterPublic}
              text={"Public"}
            />
            <FilterOption
              filter={IFilterState.All}
              onPress={filterAll}
              text={"All"}
            />
            <FilterOption
              filter={IFilterState.Private}
              onPress={filterPrivate}
              text={"Private"}
            />
          </View>
        )}
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
          {folders?.map((el: IFolder) => (
            <ListItem key={el.id} onPress={handleClick} folder={el} />
          ))}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.placesList}>
          {[...Array(10).keys()].map((_, i) => (
            <Card place={mockPlace} key={i} />
          ))}
        </ScrollView>
      )}
      <View>
        {isCreateNewCollectionOpen && (
          <CreateNewCollectionPopUp
            modalVisible={isCreateNewCollectionOpen}
            closeModal={closeNewCollectionModal}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 50,
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
