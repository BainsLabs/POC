import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
    color: "#fff"
  },
  errorInput: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    borderColor: "red",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    color: "#fff"
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15
  },
  buttonContainerRed: {
    backgroundColor: "#2980b6",
    paddingVertical: 15,
    backgroundColor: "red",
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  },
  buttonTextRed: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  },
  overlayStyle: {
    height: 150
  }
});
