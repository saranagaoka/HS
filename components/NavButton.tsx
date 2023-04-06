import { useContext, useState } from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import SearchIcon from "../images/search.svg";
import SearchIconSelected from "../images/search-selected.svg";
import LocationIcon from "../images/location.svg";
import LocationIconSelected from "../images/location-selected.svg";
import HomeIcon from "../images/home.svg";
import HomeIconSelected from "../images/home-selected.svg";
import FavouriteIcon from "../images/favourite.svg";
import FavouriteIconSelected from "../images/favourite-outline.svg";
import MenuIcon from "../images/menu.svg";
import ArrowIcon from "../images/arrow.svg";
import DashboardIcon from "../images/dashboard.svg";
import DashboardIconSelected from "../images/dashboard-selected.svg";
import AddIcon from "../images/add.svg";
import AddIconSelected from "../images/add-selected.svg";
import SettingsIcon from "../images/settings.svg";
import SettingsIconSelected from "../images/settings-selected.svg";
import LogoutIcon from "../images/logout.svg";
import LogoutIconSelected from "../images/logout-selected.svg";
import { NavContext, Pages } from "../NavContext";

export default function NavButton({ page }: { page: Pages }) {
  const { currentTab, setCurrentTab, setIsExpanded, setIsSearch } =
    useContext(NavContext);

  const handlePress = () => {
    switch (page) {
      case Pages.menu:
        setIsExpanded((prev: boolean) => !prev);
        break;
      case Pages.back:
        setIsExpanded((prev: boolean) => !prev);
        break;
      case Pages.search:
        setCurrentTab(page);
        setIsSearch((prev) => !prev);
        break;
      default:
        setCurrentTab(page);
    }
  };

  const getIcon = (): JSX.Element => {
    switch (page) {
      case Pages.search:
        return currentTab === page ? <SearchIconSelected /> : <SearchIcon />;
      case Pages.location:
        return currentTab === page ? (
          <LocationIconSelected />
        ) : (
          <LocationIcon />
        );
      case Pages.home:
        return currentTab === page ? <HomeIconSelected /> : <HomeIcon />;
      case Pages.favourites:
        return currentTab === page ? (
          <FavouriteIconSelected />
        ) : (
          <FavouriteIcon />
        );
      case Pages.menu:
        return <MenuIcon />;
      case Pages.back:
        return <ArrowIcon />;
      case Pages.dashboard:
        return currentTab === page ? (
          <DashboardIconSelected />
        ) : (
          <DashboardIcon />
        );
      case Pages.add:
        return currentTab === page ? <AddIconSelected /> : <AddIcon />;
      case Pages.settings:
        return currentTab === page ? (
          <SettingsIconSelected />
        ) : (
          <SettingsIcon />
        );
      case Pages.logout:
        return currentTab === page ? <LogoutIconSelected /> : <LogoutIcon />;
    }
  };

  return (
    <TouchableHighlight
      underlayColor={"transparent"}
      style={styles.button}
      onPress={handlePress}
    >
      {getIcon()}
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "transparent",
  },
});
