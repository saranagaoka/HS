import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { CardsList } from "../components/CardsList";
import Header from "../components/Header";
import { HomeSkeleton } from "../components/HomeSkeleton";
import { useGetNextPlaces, useGetPlaces } from "../api/placesApi";
import { IPlace } from "../types";

export default function Home() {
  const { getToken, token } = useContext(AuthContext);
  const [nextPlacesUrl, setNextPlacesUrl] = useState<string | undefined>(
    undefined
  );
  const placesRequest = useGetPlaces(token || "");
  const nextPlacesRequest = useGetNextPlaces(token || "", nextPlacesUrl || "");
  const [places, setPlaces] = useState<IPlace[]>(
    placesRequest?.data?.results || []
  );
  const [placesCount, setPlacesCount] = useState<number>(
    placesRequest?.data?.count || 0
  );

  const fetchNextPlaces = async () => {
    if (!nextPlacesUrl) return;
    const resp = await nextPlacesRequest?.refetch();
    setNextPlacesUrl(resp?.data?.next);
    if (resp?.data) {
      setPlaces((prev) => [...prev, ...resp.data.results]);
      setPlacesCount(resp.data.count);
    }
  };

  useEffect(() => {
    getToken().then(() => {
      placesRequest?.refetch().then((resp) => {
        resp.data?.results && setPlaces(resp.data?.results);
        setNextPlacesUrl(resp.data?.next);
        resp.data?.count && setPlacesCount(resp.data?.count);
      });
    });
  }, []);

  return placesRequest?.isFetching && places.length === 0 ? (
    <HomeSkeleton />
  ) : (
    <Header
      text="Welcome, Sara!"
      displayNew
      number={placesCount.toString()}
      numberText="places recently added"
    >
      <>
        <CardsList
          items={places || []}
          onEndReached={() => {
            fetchNextPlaces();
          }}
        />
      </>
    </Header>
  );
}
