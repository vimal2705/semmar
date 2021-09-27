import { StyleSheet } from "react-native";
import * as Utils from "@utils";

export default StyleSheet.create({
  imageBackground: {
    height: 140,
    width: "100%",
    position: "absolute",
  },
  contentPage: {
    bottom: 50,
  },
  searchForm: {
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  lineForm: {
    width: 1,
    height: "100%",
    margin: 10,
  },
  serviceContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  serviceItem: {
    alignItems: "center",
    marginBottom: 15,
  },
  serviceCircleIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginBottom: 5,
  },
  contentPopular: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  promotionBanner: {
    height: Utils.scaleWithPixel(100),
    width: "100%",
    marginTop: 10,
  },
  popularItem: {
    width: Utils.scaleWithPixel(135),
    height: Utils.scaleWithPixel(160),
    borderRadius: 8,
  },
  menuIcon: {
    width: 40,
    height: 40,
    position: "absolute",
    bottom: 15,
    right: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
