import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

enum IFilterState {
  Public,
  Private,
  All,
}

export default function InputSettings() {
  return (
    <View style={styles.settings}>
      <TextInput placeholder="Old password" style={styles.input} />
      <TextInput placeholder="New password" style={styles.input} />
      <TextInput placeholder="Confirm password" style={styles.input} />
      <TouchableOpacity style={styles.pressable}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
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
});
