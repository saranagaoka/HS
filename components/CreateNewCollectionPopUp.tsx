import { TouchableOpacity } from "@gorhom/bottom-sheet";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Modal,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export const CreateNewCollectionPopUp = ({
  modalVisible,
  closeModal,
}: {
  modalVisible: boolean;
  closeModal: () => void;
}) => {
  const save = () => {};

  const collections = [
    "KRK jedzenie",
    "KRK drineczki",
    "Wroclaw sniadania",
    "spacerki z psem",
    "zagramianiczne wycieczki europejskie",
    "lans bans",
    "kurwy, koks, tajski boks",
  ];
  return (
    <SafeAreaView>
      <View>
        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modal}>
            <Text style={styles.header}>Create new collection</Text>
            <View>
              <TextInput placeholder="collection title" style={styles.input} />
              <TouchableOpacity>
                <Text style={styles.textButton}>
                  + save and look for new spots!
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={save} style={styles.saveButton}>
                <Text style={styles.saveTxt}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginTop: "60%",
    backgroundColor: "whitesmoke",
    alignSelf: "center",
    width: Dimensions.get("window").width - 40,
    padding: 24,
    borderRadius: 20,
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: "#E06800",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  saveTxt: { color: "white" },
  header: {
    fontSize: 20,
    font: "400",
    textAlign: "left",
    paddingBottom: 24,
  },
  cancelButton: {
    fontWeight: "300",
    fontSize: 16,
    textDecorationLine: "underline",
    color: "black",
    paddingHorizontal: 10,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    justifyContent: "space-between",
    width: "70%",
    alignSelf: "center",
  },
  input: {
    backgroundColor: "white",
    height: 30,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 12,
    padding: 8,
  },
  textButton: { color: "#E06800", alignSelf: "center", paddingBottom: 12 },
});
