import { TouchableOpacity } from "@gorhom/bottom-sheet";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  Dimensions,
} from "react-native";

export const NewPlacePopup = ({
  modalVisible,
  closeModal,
}: {
  modalVisible: boolean;
  closeModal: () => void;
}) => {
  const save = () => {};

  return (
    <SafeAreaView>
      <View>
        <Modal
          animationType="fade"
          visible={modalVisible}
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modal}>
            <Text style={styles.header}>Saved!</Text>
            <TouchableOpacity>
              <Text style={styles.changeButton}>Go to collections</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginTop: "30%",
    backgroundColor: "#4b4c4c",
    alignSelf: "center",
    width: Dimensions.get("window").width - 40,
    padding: 4,
    justifyContent: "space-between",
    display: "flex",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },

  header: {
    font: "400",
    textAlign: "left",
    padding: 4,
    paddingLeft: 12,
    color: "white",
  },
  changeButton: {
    color: "#E06800",
    padding: 4,
    paddingRight: 12,
    textDecorationLine: "underline",
  },
});
