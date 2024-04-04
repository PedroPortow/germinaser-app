import { useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import Text  from "../Text/Text"

const Button = ({
  onPress,
  style: customStyle,
  theme = "primary",
  children,
  selected = false,
  disabled = false,
}) => {
  const buttonStyle = StyleSheet.flatten([
    styles.button,
    styles[theme],
    disabled && styles.disabled,
    selected && styles[`${theme}Selected`],
    customStyle,
  ]);

  const textStyle = StyleSheet.flatten([
    styles.text,
    styles[`${theme}Text`],
    selected && styles[`${theme}TextSelected`],
  ]);

  return (
    <Pressable
      onPress={!disabled ? onPress : undefined}
      style={buttonStyle}
      disabled={disabled}
    >
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: "auto",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#479BA7",
  },
  primaryText: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  secondary: {
    backgroundColor: "green",
  },
  secondaryText: {
    fontSize: 17,
    color: "#479BA7",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#479BA7",
  },
  outlineSelected: {
    backgroundColor: "#479BA7",
  },
  outlineText: {
    fontSize: 17,
    color: "#479BA7",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  outlineTextSelected: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  disabled: {
    backgroundColor: "#ccc",
    color: "#666",
  },
  text: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default Button;
