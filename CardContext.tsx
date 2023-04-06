import BottomSheet from "@gorhom/bottom-sheet";
import { createContext, useEffect, useRef, useState } from "react";

export const CardContext = createContext<{
  placeId: string | undefined;
  sheetRef: any;
  openCard: (id: string) => void;
  finishLoading: () => void;
  startLoading: () => void;
  isLoading: boolean;
  closeCard: () => void;
}>({
  placeId: undefined,
  sheetRef: null,
  openCard: (id: string) => {},
  finishLoading: () => {},
  startLoading: () => {},
  isLoading: true,
  closeCard: () => {},
});

export const CardProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [placeId, setPlaceId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const sheetRef = useRef<BottomSheet | null>(null);

  const openCard = (id: string) => {
    setPlaceId(id);
    sheetRef.current?.snapToIndex(0);
  };

  const finishLoading = () => {
    setIsLoading(false);
  };

  const startLoading = () => {
    setIsLoading(true);
  };

  const closeCard = () => {
    setPlaceId(undefined);
    sheetRef.current?.close();
  };

  return (
    <CardContext.Provider
      value={{
        placeId,
        sheetRef,
        openCard,
        startLoading,
        finishLoading,
        isLoading,
        closeCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
