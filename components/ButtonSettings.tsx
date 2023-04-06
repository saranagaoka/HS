import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { TouchableOpacity } from "react-native-gesture-handler";

enum IFilterState {
  Public,
  Private,
  All,
}

export default function ButtonSettings({
  text,
  children,
}: {
  text: string;
  children: JSX.Element;
}) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text style={styles.option}>{text}</Text>
      </TouchableOpacity>
      {isClicked && <View>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    fontWeight: "300",
    fontSize: 20,
    color: "#E06800",
  },
  button: {
    height: 50,
    backgroundColor: "whitesmoke",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    display: "flex",
    justifyContent: "center",
    padding: 8,
  },
});
