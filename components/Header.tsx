import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  NativeModules,
} from "react-native";

export default function Header({
  text,
  number,
  numberText,
  displayNew,
  children,
}: {
  text: string;
  number?: number | string;
  numberText?: string;
  displayNew?: boolean;
  children: JSX.Element;
}) {
  const [statusBarHeight, setStatusBarHeight] = useState();
  const { StatusBarManager } = NativeModules;

  useEffect(() => {
    StatusBarManager.getHeight((statusBarHeight: any) => {
      setStatusBarHeight(statusBarHeight.height);
    });
  }, []);

  return (
    <View style={styles.scroll}>
      <View
        style={{
          marginTop: statusBarHeight,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text
          style={number ? styles.welcome : [styles.welcome, styles.addSpace]}
        >
          {text}
        </Text>
        <View style={styles.bigNumberWrapper}>
          {displayNew && <Text style={styles.newText}>new!</Text>}
          {number &&
            number
              .toString()
              .split("")
              .map((char, i) => (
                <Text key={`${char}${i}`} style={styles.bigNumber}>
                  {char}
                </Text>
              ))}
          <Text style={styles.numberText}>
            {numberText?.split(" ").map((word) => `${word}\n`)}
          </Text>
        </View>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
    height: Dimensions.get("window").height + 10,
  },
  welcome: {
    fontSize: 20,
  },
  addSpace: {
    marginVertical: 30,
  },
  newText: {
    color: "#E06800",
    position: "absolute",
    top: 0,
    left: -20,
    fontSize: 20,
  },
  bigNumberWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  bigNumber: {
    fontSize: 150,
    fontWeight: "800",
    shadowColor: "#F7F9FC",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    marginLeft: -30,
    color: "#2F3537",
  },
  numberText: {
    fontSize: 24,
    fontWeight: "300",
    marginLeft: 18,
  },
});
