import { useContext } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import SearchIcon from "../images/search.svg";
import CloseIcon from "../images/close.svg";
import { NavContext } from "../NavContext";

export default function NavSearch() {
  const { setIsSearch } = useContext(NavContext);

  const closeSearch = () => {
    setIsSearch(false);
  };

  return (
    <View style={styles.search}>
      <TouchableOpacity style={styles.closeButton} onPress={closeSearch}>
        <CloseIcon />
      </TouchableOpacity>
      <TextInput
        placeholder="cookies"
        placeholderTextColor="gray"
        style={styles.input}
      />
      <SearchIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingVertical: 10,
  },
  closeButton: {},
  input: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    flex: 1,
    marginHorizontal: 10,
    color: "white",
    paddingBottom: 8,
  },
});
