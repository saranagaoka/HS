import { TouchableOpacity } from "@gorhom/bottom-sheet";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  Dimensions,
} from "react-native";
import { useUpdateSavedFolders } from "../api/foldersApi";
import { AuthContext } from "../AuthContext";
import { IFolder } from "../types";
import CollectionItem from "./CollectionItem";

export const SavePopUp = ({
  modalVisible,
  closeModal,
  placeId,
  folders,
  reloadPlace,
  isLoading,
}: {
  modalVisible: boolean;
  closeModal: () => void;
  placeId: string;
  folders: IFolder[];
  reloadPlace: () => void;
  isLoading: boolean;
}) => {
  const { getToken, token } = useContext(AuthContext);
  const checkedFolders: number[] = folders
    ?.filter((el: IFolder) => el.includes_spot)
    ?.map((el: IFolder) => el.id);
  const [selectedFolders, setSelectedFolders] = useState<number[]>(
    checkedFolders || []
  );
  const foldersRequest = useUpdateSavedFolders(
    token || "",
    placeId,
    selectedFolders
  );
  const [status, setStatus] = useState<
    "init" | "loading" | "success" | "error"
  >("init");

  const save = () => {
    setStatus("loading");
    getToken().then(() => {
      foldersRequest
        ?.refetch()
        .then((resp) => {
          console.log("resp:", resp);
          resp.data?.folders && setSelectedFolders(resp.data?.folders);
          if (resp.status === "success") {
            reloadPlace();
            setStatus("success");
            setTimeout(() => {
              setStatus("init");
              closeModal();
            }, 1000);
          }
        })
        .catch(() => {
          setStatus("error");
        });
    });
  };

  const cancel = () => {
    setSelectedFolders(checkedFolders || []);
    closeModal();
  };

  const checkFolder = (folderId: number) => {
    const isFolderChecked = selectedFolders.includes(folderId);
    if (isFolderChecked) {
      setSelectedFolders((prev) => [...prev.filter((id) => id !== folderId)]);
    } else {
      setSelectedFolders((prev) => [...prev, folderId]);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent={true}
          onRequestClose={cancel}
        >
          <View style={styles.modal}>
            <Text style={styles.header}>Save to collections</Text>
            {isLoading ? (
              <Text>Loading</Text>
            ) : status !== "init" ? (
              <Text>{status}</Text>
            ) : (
              <>
                <View>
                  {folders?.map((folder) => (
                    <CollectionItem
                      folder={folder}
                      checkFolder={checkFolder}
                      checked={selectedFolders.includes(folder.id)}
                      key={folder.id}
                    />
                  ))}
                </View>
                <View style={styles.buttons}>
                  <TouchableOpacity onPress={cancel}>
                    <Text style={styles.cancelButton}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={save} style={styles.saveButton}>
                    <Text style={styles.saveTxt}>Save</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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
});
