import { baseApiUrl } from "../config";
import { IApiResponse, IFolder, IPlace, IPlacesApiResponse } from "../types";
import { useQuery, UseQueryResult } from "react-query";

export const getPlaces = (token: string | undefined, url?: string) => {
  return fetch(url || `${baseApiUrl}/spots/?page_size=20`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => resp.json())
    .then((response) => response)
    .catch((err) => err);
};

const getPlacesByDistance = (
  token: string | undefined,
  distance?: number | string,
  lat?: number | string,
  lng?: number | string,
  url?: string
) => {
  return fetch(
    url ||
      `${baseApiUrl}/spots/?page_size=20&distance=${distance}&lat=${lat}&lon=${lng}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((resp) => resp.json())
    .then((response) => response)
    .catch((err) => err);
};

export const useGetPlaces = (
  token: string
): UseQueryResult<IPlacesApiResponse> | undefined => {
  const res = useQuery("getPlaces", () => getPlaces(token), {
    enabled: !!token,
  });

  return res;
};

export const useGetNextPlaces = (
  token: string,
  url: string
): UseQueryResult<IPlacesApiResponse> | undefined => {
  const res = useQuery("getNextPlaces", () => getPlaces(token, url), {
    enabled: false,
  });

  return res;
};

export const getPlace = (
  token: string,
  id: string | number
): Promise<IPlace> => {
  return fetch(`${baseApiUrl}/spots/${id}/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => resp.json())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

export const useGetPlacesByDistance = (
  token: string,
  distance: number | string,
  lat: number | string,
  lng: number | string,
  url?: string
): UseQueryResult<IPlacesApiResponse> | undefined => {
  const res = useQuery(
    "getPlacesByDistance",
    () => getPlacesByDistance(token, distance, lat, lng, url),
    {
      enabled: !!token,
    }
  );

  return res;
};

export const useGetNextPlacesByDistance = (
  token: string,
  url: string
): UseQueryResult<IPlacesApiResponse> | undefined => {
  const res = useQuery(
    "getNextPlacesByDistance",
    () => getPlacesByDistance(token, url),
    {
      enabled: false,
    }
  );

  return res;
};

const getPlaceFolders = (token: string, placeId: string) => {
  return fetch(`${baseApiUrl}/spots/${placeId}/folders/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => resp.json())
    .then((response) => response)
    .catch((err) => err);
};

export const useGetPlaceFolders = (
  token: string,
  placeId: string
): UseQueryResult<IApiResponse<IFolder>> | undefined => {
  const res = useQuery(
    "getPlaceFolders",
    () => getPlaceFolders(token, placeId),
    {
      enabled: !!token,
    }
  );

  return res;
};
