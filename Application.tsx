import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import BigCard from "./components/BigCard";
import Nav from "./components/Nav";
import Page from "./components/Page";
import LoginPage from "./pages/LoginPage";

export default function Application() {
  const { requireLogin } = useContext(AuthContext);

  return (
    <>
      <StatusBar translucent />
      {requireLogin ? (
        <LoginPage />
      ) : (
        <>
          <Page />
          <Nav />
          <BigCard />
        </>
      )}
    </>
  );
}
