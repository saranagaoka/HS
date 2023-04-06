import { useContext } from "react";
import { View, Dimensions } from "react-native";
import { NavContext, Pages } from "../NavContext";
import Add from "../pages/Add";
import Home from "../pages/Home";
import Location from "../pages/Location";
import Search from "../pages/Search";
import Settings from "../pages/Settings";
import Favoutires from "../pages/Favourites";
import Dashboard from "../pages/Dashboard";

export default function Page() {
  const { currentTab } = useContext(NavContext);

  return (
    <View
      style={{
        backgroundColor: "#F7F9FC",
        height: Dimensions.get("screen").height,
      }}
    >
      {currentTab === Pages.home ? (
        <Home />
      ) : currentTab === Pages.location ? (
        <Location />
      ) : currentTab === Pages.favourites ? (
        <Favoutires />
      ) : currentTab === Pages.add ? (
        <Add />
      ) : currentTab === Pages.search ? (
        <Search />
      ) : currentTab === Pages.settings ? (
        <Settings />
      ) : (
        currentTab === Pages.dashboard && <Dashboard />
      )}
    </View>
  );
}
