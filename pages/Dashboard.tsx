import { StyleSheet, View } from "react-native";
import TinderCard from "../components/TinderCard";
import StartTinder from "../components/StartTinder";
import { useState } from "react";

export default function Dashboard() {
  const [match, setMatch] = useState<boolean>(false);
  const openMatching = () => {
    setMatch(true);
  };
  const closeMatching = () => {
    setMatch(false);
  };

  return (
    <View style={styles.dashboard}>
      {match ? (
        <TinderCard closeMatching={closeMatching} />
      ) : (
        <StartTinder openMatching={openMatching} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dashboard: { backgroundColor: "#F7F9FC", height: "100%" },
});
