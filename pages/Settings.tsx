import { ScrollView, StyleSheet, Text, View } from "react-native";
import ButtonSettings from "../components/ButtonSettings";
import InputSettings from "../components/InputPassword";
import InputUsername from "../components/InputUsername";

enum IFilterState {
  Public,
  Private,
  All,
}

export default function Settings() {
  return (
    <ScrollView>
      <View style={styles.settings}>
        <View style={styles.header}>
          <Text style={styles.settingText}>Settings</Text>
        </View>
        <View>
          <ButtonSettings text={"Change password"}>
            <InputSettings />
          </ButtonSettings>
          <ButtonSettings text={"Change username"}>
            <InputUsername />
          </ButtonSettings>
          <ButtonSettings text={"Notification"}>
            <Text>Notification options</Text>
          </ButtonSettings>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  settings: {
    height: "100%",
    marginTop: 70,
    paddingBottom: 100,
  },
  header: {
    paddingBottom: 20,
  },
  settingText: {
    fontWeight: "300",
    fontSize: 32,
    paddingLeft: 10,
  },
});
