import { createContext, useState } from "react";

export enum Pages {
  search,
  location,
  home,
  favourites,
  menu,
  back,
  dashboard,
  add,
  settings,
  logout,
}

export const NavContext = createContext({
  currentTab: Pages.home,
  setCurrentTab: (prop: Pages) => {},
  isExpanded: false,
  setIsExpanded: (prop: ((prev: boolean) => boolean) | boolean) => {},
  isSearch: false,
  setIsSearch: (prop: ((prev: boolean) => boolean) | boolean) => {},
});

export const NavProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [currentTab, setCurrentTab] = useState<Pages>(Pages.home);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  return (
    <NavContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        isExpanded,
        setIsExpanded,
        isSearch,
        setIsSearch,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
