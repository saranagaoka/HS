import { useContext, useState } from "react";
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
import { AuthContext } from "../AuthContext";
import Logo from "../images/logoHS.svg";
import ErrorIcon from "../images/error.svg";
import EyeIcon from "../images/show-password.svg";
import HideIcon from "../images/hide-password.svg";
import ForgottenPassword from "./ForgottenPassword";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { requestNewTokens, loginError } = useContext(AuthContext);
  const [isForgotten, setIsForgotten] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const passwordIcon2 = showPassword2 ? <HideIcon /> : <EyeIcon />;

  const passwordIcon = showPassword ? <HideIcon /> : <EyeIcon />;

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const goBack = () => {
    setIsForgotten(false);
  };
  const handleUsernameChange = (text: string) => {
    setUsername(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleClick = async () => {
    !isSignUp && (await requestNewTokens(email, password));
  };

  const toggleLogInSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  const togglePassword2 = () => {
    setShowPassword2((prev) => !prev);
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordReset = () => {
    setIsForgotten(true);
  };

  return isForgotten ? (
    <ForgottenPassword goBack={goBack} />
  ) : (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.loginPage}>
        <Logo style={styles.logo} />
        {loginError && (
          <View style={styles.errorWrapper}>
            <ErrorIcon />
            <Text style={styles.error}>{loginError}</Text>
          </View>
        )}
        <View style={styles.inputs}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#5F5F5F"
            style={styles.input}
            onChangeText={handleEmailChange}
          />
          {isSignUp && (
            <TextInput
              placeholder="Username"
              placeholderTextColor="#5F5F5F"
              style={styles.input}
              onChangeText={handleUsernameChange}
            />
          )}
          <View>
            <TextInput
              secureTextEntry={!showPassword && true}
              placeholder="Password"
              placeholderTextColor="#5F5F5F"
              style={styles.input}
              onChangeText={handlePasswordChange}
            />
            <View style={styles.button}>
              <TouchableOpacity style={{ padding: 6 }} onPress={togglePassword}>
                {passwordIcon}
              </TouchableOpacity>
            </View>
          </View>
          {isSignUp && (
            <View>
              <TextInput
                secureTextEntry={!showPassword2 && true}
                placeholder=" Confirm Password"
                placeholderTextColor="#5F5F5F"
                style={styles.input}
                onChangeText={handlePasswordChange}
              />
              <View style={styles.button}>
                <TouchableOpacity
                  style={{ padding: 6 }}
                  onPress={togglePassword2}
                >
                  {passwordIcon2}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.signInButton} onPress={handleClick}>
          <Text style={styles.signIn}>
            {isSignUp ? "Create account" : "Log in"}
          </Text>
        </TouchableOpacity>
        {!isSignUp && (
          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={passwordReset}
          >
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        )}
        <View style={styles.account}>
          {isSignUp ? (
            <Text>Already have an account?</Text>
          ) : (
            <Text>Don't have an account?</Text>
          )}
          <TouchableOpacity onPress={toggleLogInSignUp}>
            <Text style={styles.signUp}>{isSignUp ? "Log in" : "Sign up"}</Text>
          </TouchableOpacity>
        </View>
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
});
