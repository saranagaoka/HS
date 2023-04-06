import { useEffect, useState } from "react";
import { baseApiUrl } from "../config";

const accessTokenExpiryTime = 30 * 24 * 60 * 60 * 1000;
const refreshTokenExpiryTime = 60 * 24 * 60 * 60 * 1000;

const useGetToken = () => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const [accessTokenExpiryDate, setAccessTokenExpiryDate] = useState(0);
  const [refreshTokenExpiryDate, setRefreshTokenExpiryDate] = useState(0);

  const [requireLogin, setRequireLogin] = useState(false);
  const [error, setError] = useState("");

  const refreshAccessToken = async (): Promise<{
    access?: string;
    refresh?: string;
    error?: string;
    wrongCredentials?: boolean;
  }> => {
    return fetch(`${baseApiUrl}/login/refresh`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    })
      .then((resp) => resp.json())
      .then((tokens) => {
        // setRequireLogin(!tokens.access);
        return {
          access: tokens.access,
          refresh: tokens.refresh,
          error: tokens.detail,
          wrongCredentials: !!tokens.detail,
        };
      })
      .catch((e) => {
        return { error: "Something went wrong" };
      });
  };

  const getToken = async () => {
    if (
      accessTokenExpiryDate + accessTokenExpiryTime < Date.now() &&
      refreshTokenExpiryDate + refreshTokenExpiryTime < Date.now()
    ) {
      setRequireLogin(true);
    } else if (
      accessTokenExpiryDate + accessTokenExpiryTime < Date.now() &&
      refreshTokenExpiryDate + refreshTokenExpiryTime > Date.now()
    ) {
      const { access, refresh, error } = await refreshAccessToken();
      console.log(access, error);

      access && setAccessToken(access);
      refresh && setRefreshToken(refresh);
      access && setAccessTokenExpiryDate(Date.now());
      refresh && setRefreshTokenExpiryDate(Date.now());
      error && setError(error);
      setRequireLogin(false);
    }
  };

  const fetchToken = async (email: string, password: string) => {
    fetch(`${baseApiUrl}/login/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((resp) => resp.json())
      .then((tokens) => {
        setAccessToken(tokens.access);
        setRefreshToken(tokens.refresh);
        setError("");
        setRequireLogin(false);
        console.log(tokens);
        return {
          access: tokens.access,
          refresh: tokens.refresh,
          error: tokens.detail,
          wrongCredentials: !!tokens.detail,
        };
      })
      .catch((e) => {
        setError("Something went wrong");
        return { error: "Something went wrong" };
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  return { accessToken, fetchToken, requireLogin, error };
};

export default useGetToken;
