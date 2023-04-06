import { StyleSheet, View, Image } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Closeicon from "../images/close.svg";

export default function AddPageImage({
  img,
  onClick,
}: {
  img: string;
  onClick: (img: string) => void;
}) {
  const [isClicked, setIsClicked] = useState(false);

  const toggleButton = () => {
    setIsClicked((prev) => !prev);
  };

  const deleteImg = () => {
    onClick(img);
  };

  return (
    <TouchableOpacity
      key={img}
      onPress={toggleButton}
      style={[styles.borderAndShadow]}
    >
      <Image key={img} source={{ uri: img }} style={styles.image} />
      {isClicked && (
        <View style={styles.delete}>
          <TouchableOpacity onPress={deleteImg} style={styles.deleteButton}>
            <Closeicon />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  borderAndShadow: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 20,
    overflow: "hidden",
    marginLeft: 16,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
    zIndex: 0,
  },
  delete: {
    backgroundColor: "#00000066",
    width: 120,
    height: 120,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 12,
  },
});
