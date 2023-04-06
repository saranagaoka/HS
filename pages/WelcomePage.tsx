import { StyleSheet, View, Dimensions } from "react-native";
import Logo from "../images/logoHS.svg";

export default function WelcomePage() {
  return (
    <View style={styles.welcomePage}>
      <Logo />
    </View>
  );
}

const styles = StyleSheet.create({
  welcomePage: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
