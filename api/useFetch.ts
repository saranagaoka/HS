import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { IApiResponse } from "../types";
import { baseApiUrl } from "../config";

const useFetch = (path: string) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState<string | undefined>();
  const { getToken } = useContext(AuthContext);

  const fetchUrl = async () => {
    const token = await getToken();
    await fetch(nextPageUrl || `${baseApiUrl}${path}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response: IApiResponse<any>) => {
        setData(response.results);
        setNextPageUrl(response.next);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUrl();
  }, [path]);

  const fetchNextPage = () => {
    if (!nextPageUrl) return;
    fetchUrl();
  };

  return { data, isLoading, isError, fetchNextPage, fetchUrl };
};

export default useFetch;
