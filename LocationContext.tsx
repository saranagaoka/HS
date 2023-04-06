import { createContext, useEffect, useState } from "react";
import * as Location from "expo-location";

export interface ICoords {
  lat: number;
  lng: number;
}

export const LocationContext = createContext<{
  userLocation: ICoords | undefined;
  getCoords: () => Promise<ICoords | undefined>;
}>({
  userLocation: { lat: 0, lng: 0 },
  getCoords: () => new Promise((resolve) => resolve(undefined)),
});

export const LocationProvider = ({ children }: { children: JSX.Element }) => {
  const [coords, setCoords] = useState<ICoords | undefined>(undefined);

  const getCoords = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const latlng = {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };
    setCoords(latlng);
    return latlng;
  };

  useEffect(() => {
    getCoords();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        userLocation: coords,
        getCoords: getCoords,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
