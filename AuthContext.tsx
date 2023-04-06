import BottomSheet from "@gorhom/bottom-sheet";
import { createContext, useRef, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { baseApiUrl } from "./config";

const timeToExpireAccessToken = 30 * 24 * 60 * 60 * 1000;
const timeToExpireRefreshToken = 60 * 24 * 60 * 60 * 1000;

export const AuthContext = createContext<{
  getToken: () => Promise<string | undefined>;
  requestNewTokens: (
    email: string,
    password: string
  ) => Promise<{
    access?: string;
    refresh?: string;
    error?: string;
    wrongCredentials?: boolean;
  }>;
  requireLogin: boolean;
  loginError: string | undefined;
  token: string | undefined;
}>({
  getToken: () => new Promise((resolve) => resolve("")),
  requestNewTokens: (email: string, password: string) =>
    new Promise((resolve) =>
      resolve({ access: "", refresh: "", error: "", wrongCredentials: false })
    ),
  requireLogin: false,
  loginError: "",
  token: "",
});

export const AuthProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [loginError, setLoginError] = useState<string | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [refreshToken, setRefreshToken] = useState<string | undefined>(
    undefined
  );
  const [accessTokenExpiryDate, setAccessTokenExpiryDate] = useState<
    number | undefined
  >(undefined);
  const [refreshTokenExpiryDate, setRefreshTokenExpiryDate] = useState<
    number | undefined
  >(undefined);
  const [requireLogin, setRequireLogin] = useState(
    !accessToken &&
      (accessTokenExpiryDate || 0) + timeToExpireAccessToken < Date.now()
  );

  const fetchAccessToken = async (
    email: string,
    password: string
  ): Promise<{
    access?: string;
    refresh?: string;
    error?: string;
    wrongCredentials?: boolean;
  }> => {
    return fetch(`${baseApiUrl}/login/`, {
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

  const requestNewTokens = async (
    email: string,
    password: string
  ): Promise<{
    access?: string;
    refresh?: string;
    error?: string;
    wrongCredentials?: boolean;
  }> => {
    const { access, refresh, error, wrongCredentials } = await fetchAccessToken(
      email,
      password
    );
    setLoginError(error);
    if (wrongCredentials) {
      setRequireLogin(true);
      setLoginError(error);
    }

    access && setRequireLogin(false);
    access && setAccessToken(access);
    refresh && setRefreshToken(refresh);
    access && setAccessTokenExpiryDate(Date.now());
    refresh && setRefreshTokenExpiryDate(Date.now());
    return {
      access: access,
      refresh: refresh,
      error: error,
      wrongCredentials: wrongCredentials,
    };
  };

  const getToken = async (): Promise<string | undefined> => {
    if (
      !accessToken &&
      (accessTokenExpiryDate || 0) + timeToExpireAccessToken < Date.now() &&
      (refreshTokenExpiryDate || 0) + timeToExpireRefreshToken < Date.now()
    ) {
      setRequireLogin(true);
    } else if (
      (accessTokenExpiryDate || 0) + 30 * 24 * 60 * 60 * 1000 < Date.now() &&
      (refreshTokenExpiryDate || 0) + 60 * 24 * 60 * 60 * 1000 > Date.now()
    ) {
      const { access, refresh } = await refreshAccessToken();
      access && setAccessToken(access);
      refresh && setRefreshToken(refresh);
      access && setAccessTokenExpiryDate(Date.now());
      refresh && setRefreshTokenExpiryDate(Date.now());
      return access;
    } else {
      return accessToken;
    }
  };

  const getTokensFromSecureStore = async () => {
    const access = await SecureStore.getItemAsync("accessToken");
    const refresh = await SecureStore.getItemAsync("refreshToken");
    const accessExpiry = await SecureStore.getItemAsync(
      "accessTokenExpiryDate"
    );
    const refreshExpiry = await SecureStore.getItemAsync(
      "refreshTokenExpiryDate"
    );
    access && setAccessToken(access);
    refresh && setRefreshToken(refresh);
    accessExpiry && setAccessTokenExpiryDate(parseInt(accessExpiry));
    refreshExpiry && setRefreshTokenExpiryDate(parseInt(refreshExpiry));
  };

  useEffect(() => {
    getTokensFromSecureStore();
  }, []);

  useEffect(() => {
    SecureStore.setItemAsync("accessToken", `${accessToken}`);
  }, [accessToken]);

  useEffect(() => {
    SecureStore.setItemAsync("refreshToken", `${refreshToken}`);
  }, [refreshToken]);

  useEffect(() => {
    SecureStore.setItemAsync(
      "accessTokenExpiryDate",
      `${accessTokenExpiryDate}`
    );
  }, [accessTokenExpiryDate]);

  useEffect(() => {
    SecureStore.setItemAsync(
      "refreshTokenExpiryDate",
      `${refreshTokenExpiryDate}`
    );
  }, [refreshTokenExpiryDate]);

  return (
    <AuthContext.Provider
      value={{
        getToken,
        requestNewTokens,
        requireLogin,
        loginError,
        token: accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
