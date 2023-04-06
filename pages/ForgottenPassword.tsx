import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Logo from "../images/logoHS.svg";
import EyeIcon from "../images/show-password.svg";
import HideIcon from "../images/hide-password.svg";

export default function ForgottenPassword({ goBack }: { goBack: () => void }) {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const passwordIcon = showPassword ? <HideIcon /> : <EyeIcon />;

  const passwordIcon2 = showPassword2 ? <HideIcon /> : <EyeIcon />;

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePassword2 = () => {
    setShowPassword2((prev) => !prev);
  };

  const handleClick = () => {
    setIsSent(true);
  };

  const verify = () => {
    setIsVerified(true);
  };

  const resetPassword = () => {
    setFeedback("new password has been set! ");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.loginPage}>
        <Logo style={styles.logo} />
        <View style={styles.inputs}>
          {isVerified ? (
            <>
              <TextInput
                secureTextEntry={!showPassword && true}
                placeholder="Password"
                placeholderTextColor="#5F5F5F"
                style={styles.input}
                onChangeText={() => {}}
              />
              <View style={styles.button}>
                <TouchableOpacity
                  style={{ padding: 6 }}
                  onPress={togglePassword}
                >
                  {passwordIcon}
                </TouchableOpacity>
              </View>
              <View>
                <TextInput
                  secureTextEntry={!showPassword2 && true}
                  placeholder=" Confirm Password"
                  placeholderTextColor="#5F5F5F"
                  style={styles.input}
                  onChangeText={() => {}}
                />
                <View style={styles.button}>
                  <TouchableOpacity
                    style={{ padding: 6 }}
                    onPress={togglePassword2}
                  >
                    {passwordIcon2}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.signInButton}
                  onPress={resetPassword}
                >
                  <Text style={styles.signIn}>Set new password</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              {isSent ? (
                <>
                  <TextInput
                    placeholder="6-digit code"
                    placeholderTextColor="#5F5F5F"
                    style={styles.input}
                    onChangeText={() => {}}
                  />
                  <TouchableOpacity
                    style={styles.signInButton}
                    onPress={verify}
                  >
                    <Text style={styles.signIn}>Verify</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#5F5F5F"
                    style={styles.input}
                    onChangeText={() => {}}
                  />
                  <TouchableOpacity
                    style={styles.signInButton}
                    onPress={handleClick}
                  >
                    <Text style={styles.signIn}>Send code to my email</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
        </View>
        <TouchableOpacity style={styles.forgotPasswordButton} onPress={goBack}>
          <Text style={styles.forgotPassword}>Go back</Text>
        </TouchableOpacity>
        {feedback && (
          <View style={styles.setNewLog}>
            <Text>{feedback}</Text>
            <TouchableOpacity onPress={goBack}>
              <Text style={styles.logInNow}> Log in now!</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
  },
  loginPage: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  inputs: { display: "flex", flexDirection: "column" },
  input: {
    backgroundColor: "white",
    width: 351,
    height: 40,
    marginBottom: 20,

    color: "black",
    display: "flex",
    alignItems: "center",
    zIndex: 1,

    padding: 8,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  logo: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  errorWrapper: {
    padding: 10,
    paddingHorizontal: 16,
    marginVertical: 16,
    backgroundColor: "#ffcccc",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  error: {
    color: "#F44715",
    marginLeft: 8,
  },
  signInButton: {
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
  signIn: { color: "white", fontWeight: "700", fontSize: 16 },
  or: { fontWeight: "400", fontSize: 16, color: "#000000" },
  signUp: {
    fontWeight: "700",
    fontSize: 16,

    color: " #424242",
    padding: 8,
  },

  button: {
    position: "absolute",
    right: 8,
    top: 2,
    zIndex: 20,
  },
  forgotPassword: { color: "#424242" },
  forgotPasswordButton: { padding: 4, marginBottom: 20 },
  account: { display: "flex", flexDirection: "row", alignItems: "center" },
  setNewLog: { display: "flex", flexDirection: "row" },
  logInNow: { color: "#E06800" },
});
