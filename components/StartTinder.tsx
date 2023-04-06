import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import CloseIcon from "../images/remove.svg";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

interface IUser {
  id: string;
  value: string;
}

export default function StartTinder({
  openMatching,
}: {
  openMatching: () => void;
}) {
  const [userArray, setUserArray] = useState<IUser[]>([
    { id: "0", value: "user" },
  ]);

  const addUser = () => {
    let randomID = Math.random().toString();
    setUserArray((prev) => [...prev, { id: randomID, value: "" }]);
  };
  const deleteUser = (el: IUser) => {
    setUserArray((prev) => prev.filter((userInput) => userInput.id !== el.id));
    console.log(el);
  };
  return (
    <ScrollView>
      <View style={styles.startTinder}>
        <View>
          <Text style={styles.header}>Match the spot!</Text>
          <Text style={styles.question}>Where do you want to hangout?</Text>
          <TextInput placeholder="City" style={styles.input} />
          <Text style={styles.question}>With whom you want to hangout?</Text>
          {userArray.map((el, i) => (
            <View style={styles.username} key={el.id}>
              <TextInput placeholder="username" style={styles.input} />
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {
                    deleteUser(el);
                  }}
                >
                  <CloseIcon />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity onPress={addUser}>
            <Text style={styles.addText}>+ add another user</Text>
          </TouchableOpacity>
          <View style={styles.favSpots}>
            <Text>Use only my favourites spots! </Text>
            <Text>TODO: CHECKBOX</Text>
          </View>
          <TouchableOpacity style={styles.startButton} onPress={openMatching}>
            <Text style={styles.startButtonText}>Let's start!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  startTinder: {
    height: "100%",
    backgroundColor: "trasnparent",
    marginTop: 70,
    paddingBottom: 90,
    justifyContent: "space-between",
  },
  header: {
    color: "#E06800",
    fontStyle: "italic",
    fontSize: 32,
    fontWeight: "800",
    alignSelf: "center",
    paddingBottom: 12,
  },

  question: { fontWeight: "400", fontSize: 20, color: "black", padding: 12 },
  addText: { color: "#E06800", alignSelf: "center", paddingBottom: 12 },
  input: {
    backgroundColor: "white",
    width: 351,
    height: 40,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderRadius: 6,
    padding: 8,
    alignSelf: "center",
  },
  username: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: { position: "absolute", right: 20, top: 8, zIndex: 20 },
  startButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  startButton: {
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
    alignSelf: "center",
  },
  favSpots: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 12,
  },
});
