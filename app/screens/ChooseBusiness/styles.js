import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "90%",
    borderRadius: 8,
    alignItems: "center",
  },
  wrapContent: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  contentButton: {
    borderTopWidth: 0.5,
    flexDirection: "row",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
  },
});
