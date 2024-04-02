import React from "react";
import { Text as DefaultText } from "react-native";

const Text = ({ children, style }) => {
  let fontFamily;

  switch (style?.fontWeight) {
    case "bold":
      fontFamily = "Nunito-Bold";
      break;
    case "semiBold":
      fontFamily = "Nunito-SemiBold";
      break;
    case "regular":
      fontFamily = "Nunito-Regular";
      break;
    case "light":
      fontFamily = "Nunito-light";
      break;
    case "extraLight":
      fontFamily = "Nunito-ExtraLight";
      break;
    default:
      fontFamily = "Nunito-Regular";
      break;
  }

  return <DefaultText style={[{ fontFamily }, style]}>{children}</DefaultText>;
};

export default Text;
