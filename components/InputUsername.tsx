import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default function InputUsername() {
  const alert = "Username already taken, try something else";
  const [isClicked, setIsClicked] = useState(false);
  return (
    <View style={styles.settings}>
      <TextInput placeholder="New username" style={styles.input} />
      <TouchableOpacity
        style={styles.pressable}
        onPress={() => setIsClicked((prev) => !prev)}
      >
        <Text style={styles.buttonText}>Change username</Text>
      </TouchableOpacity>
      {isClicked && <Text style={styles.alert}>{alert}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  settings: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  input: {
    backgroundColor: "white",
    width: 351,
    height: 40,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 12,
    padding: 8,
  },
  pressable: {
    backgroundColor: "#E06800",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderRadius: 31,
    width: 351,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  alert: {
    color: "red",
  },
});
