import React, { useContext, useEffect, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import NavButton from "./NavButton";
import { NavContext, Pages } from "../NavContext";
import Page from "./Page";
import Home from "../pages/Home";
import NavSearch from "./NavSearch";

const baseNavIcons = [
  Pages.search,
  Pages.location,
  Pages.home,
  Pages.favourites,
  Pages.menu,
];

const extendedNavIcons = [
  Pages.back,
  Pages.dashboard,
  Pages.add,
  Pages.settings,
  Pages.logout,
];

export default function Nav() {
  const [isKeyboardOpen, setIsKeyBoardOpen] = useState(false);
  const { currentTab, isExpanded, isSearch } = useContext(NavContext);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyBoardOpen(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyBoardOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#1E282C",
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          bottom: isKeyboardOpen && currentTab !== Pages.add ? 310 : 30,
          width: "85%",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          borderRadius: 16,
        }}
      >
        {isSearch ? (
          <NavSearch />
        ) : isExpanded ? (
          extendedNavIcons.map((page, i) => (
            <NavButton page={page} key={page} />
          ))
        ) : (
          baseNavIcons.map((page, i) => <NavButton page={page} key={page} />)
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
