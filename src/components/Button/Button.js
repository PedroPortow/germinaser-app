import { useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import Text  from "../Text/Text"
import {  Ionicons } from "@expo/vector-icons";

const Button = ({
  onPress,
  style: customStyle,
  theme = "primary",
  children,
  selected = false,
  disabled = false,
  icon
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
      {icon && <Ionicons name={icon} size={22} style={styles.icon}/>}
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    width: "auto",
    gap: 4,
    borderRadius: 12,
    justifyContent: "center",
    flexDirection: 'row',
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#479BA7",
  },
  icon: {
    color: 'white'
  },
  primaryText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  destructive: {
    backgroundColor: "red",
  },
  destructiveOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "red"
  },
  destructiveOutlineSelected: {
    backgroundColor: "#479BA7",
  },
  destructiveOutlineText: {
    fontSize: 17,
    color: "red",
    fontWeight: "bold",
  },
  destructiveOutlineTextSelected: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
  secondary: {
    backgroundColor: "green",
  },
  secondaryText: {
    fontSize: 17,
    color: "#479BA7",
    fontWeight: "bold",
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
  },
  outlineTextSelected: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
  disabled: {
    backgroundColor: "#ccc",
    color: "#666",
  },
  text: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
});

export default Button;
