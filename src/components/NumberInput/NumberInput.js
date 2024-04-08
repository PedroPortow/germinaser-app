import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native' // Importar TouchableOpacity e Text
import { Input } from '@ui-kitten/components'
import { Feather } from '@expo/vector-icons'

function NumberInput({ placeholder, label, initialValue = '', onChange }) {
  const [value, setValue] = useState(String(initialValue))

  const handleChange = (text) => {
    const filteredText = text.replace(/[^0-9]/g, '')
    setValue(filteredText)
    if (onChange) onChange(filteredText)
  }

  const increment = () => {
    const newValue = String(parseInt(value, 10) + 1)
    setValue(newValue)
    if (onChange) onChange(newValue)
  }

  const decrement = () => {
    const newValue = String(Math.max(0, parseInt(value, 10) - 1))
    setValue(newValue)
    if (onChange) onChange(newValue)
  }

  function DecrementButton() {
    return (
      <TouchableOpacity onPress={decrement} style={{ marginRight: 8 }}>
        <Feather name="minus" size={23} style={styles.button} />
      </TouchableOpacity>
    )
  }

  function IncrementButton() {
    return (
      <TouchableOpacity onPress={increment} style={{ marginLeft: 8 }}>
        <Feather name="plus" size={23} style={styles.button} />
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <Input
        placeholder={placeholder}
        value={value}
        label={label}
        style={styles.input}
        keyboardType="numeric"
        onChangeText={handleChange}
        accessoryLeft={DecrementButton}
        accessoryRight={IncrementButton}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: 125,
  },
  button: {},
})

export default NumberInput
