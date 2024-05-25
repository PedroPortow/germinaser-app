import React, { useEffect, useMemo, useState } from 'react'
import { Input, HStack, IconButton } from 'native-base'
import { Feather } from '@expo/vector-icons'

function NumberInput({ placeholder, label, initialValue = '', onChange }) {
  const [value, setValue] = useState(String(initialValue))

  useEffect(() => {
    setValue(String(initialValue));
  }, [initialValue])

  const handleChange = (text) => {
    setValue(text)
    if (onChange) {
      onChange(text)
    }
  }

  const increment = () => {
    const newValue = Number(value) + 1
    
    setValue(String(newValue))
    if (onChange) {
      onChange(newValue)
    }
  }

  const decrement = () => {
    const newValue = Number(value) - 1

    setValue(String(newValue))
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
      <Input
        placeholder={placeholder}
        value={value}
        label={label}
        width='32'
        keyboardType="numeric"
        onChangeText={handleChange}
        fontSize={14}
        InputLeftElement={
          <IconButton
            icon={<Feather name="minus" size={18} color="black" />}
            onPress={decrement}
            borderRadius="full"
          />
        }
        InputRightElement={
          <IconButton
            icon={<Feather name="plus" size={18} color="black" />}
            onPress={increment}
            borderRadius="full"
          />
        }
      />
  )
}

export default NumberInput
