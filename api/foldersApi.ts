import { baseApiUrl } from "../config";
import { IApiResponse, IFolder, IPlace, IPlacesApiResponse } from "../types";
import { useQuery, UseQueryResult } from "react-query";

export const updateSavedFolders = (
  token: string | undefined,
  placeId: string,
  folders: number[]
) => {
  return fetch(`${baseApiUrl}/spots/${placeId}/folders/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      folders: folders,
    }),
  })
    .then((resp) => resp.json())
    .then((response) => response)
    .catch((err) => err);
};

export const useUpdateSavedFolders = (
  token: string,
  placeId: string,
  folders: number[]
): UseQueryResult<{ folders: number[] }> | undefined => {
  const res = useQuery(
    "updateSavedFolders",
    () => updateSavedFolders(token, placeId, folders),
    {
      enabled: false,
    }
  );

  return res;
};

export const getFolders = (token: string) => {
  return fetch(`${baseApiUrl}/folders/`, {
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

export const useGetFolders = (
  token: string
): UseQueryResult<IApiResponse<IFolder>> | undefined => {
  const res = useQuery("getFolders", () => getFolders(token), {
    enabled: !!token,
  });

  return res;
};
