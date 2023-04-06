import { ICoords } from "../LocationContext";
import { baseApiUrl } from "../config";
import { ICoordsApiResponse, IDetailsApiResponse } from "../types";

export const getCoordsFromString = async (
  token: string,
  address: string
): Promise<ICoordsApiResponse> => {
  return fetch(
    `${baseApiUrl}/address/coords/?text=${encodeURIComponent(address)}`,
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
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

export const getAddressFromCoords = async (
  token: string,
  coords: ICoords
): Promise<IDetailsApiResponse> => {
  return fetch(
    `${baseApiUrl}/address/details/?lat=${coords.lat}&lon=${coords.lng}`,
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
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};
