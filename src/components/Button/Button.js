import { useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import Text from '@components/Text'; // Assumindo que você tem um componente de Text personalizado

const Button = ({ onPress, style, theme = 'primary', children, active = false, disabled = false }) => {
  
  const getButtonStyle = useMemo(() => {
    const styleArray = [styles.button];

    const themes = {
      'primary': styles.primary,
      'secondary': styles.secondary
    };

    if (themes[theme]) {
      styleArray.push(themes[theme]);
    }

    if (disabled) {
      styleArray.push(styles.disabled);
    }

    if (style) {
      styleArray.push(style);
    }

    return styleArray;
  }, [theme, disabled, style]);

  return (
    <Pressable
      onPress={disabled ? null : onPress}
      style={getButtonStyle} 
      disabled={disabled}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    margin: 5,
    width: 'auto', 
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: "#479BA7",
  },
  secondary: {
    backgroundColor: 'green',
  },
  disabled: {
    backgroundColor: '#ccc',
    color: '#666',
  },
  text: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
});

export default Button;
