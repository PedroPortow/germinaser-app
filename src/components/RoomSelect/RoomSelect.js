import React, { useEffect, useState } from 'react';
import { Select } from "native-base";
import { Ionicons } from '@expo/vector-icons'
import { apiGetClinicRooms  } from '../../services/clinics';

function RoomSelect({ onSelectRoom, selectedClinic }) {
  const [roomOptions, setRoomOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRoomOptions = async () => {
    setIsLoading(true)

    try {
      const response = await apiGetClinicRooms(selectedClinic)

      const formattedResponse = response.data.map((room) => ({
        label: room.name,
        value: room.id,
      }))

      setRoomOptions(formattedResponse)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(!!selectedClinic){
      getRoomOptions();
    }
  }, [selectedClinic]);

  return (
    <Select
      // selectedValue={}
      accessibilityLabel="Choose Room"
      placeholder="Selecione uma sala"
      size={'lg'}
      // dropdownIcon={} // ALTERAR ISSO TÁ FEIO DEMAIS
      _selectedItem={{
        bg: "teal.600",
        endIcon: <Ionicons name="checkmark-circle" size={5} color="white" />
      }}
      mt={1}
      onValueChange={(itemValue) => onSelectRoom(itemValue)}
      isDisabled={!selectedClinic || isLoading}
    >
      {roomOptions.map((room) => (
        <Select.Item key={room.value} label={room.label} value={room.value} />
      ))}
    </Select>
  );
}

export default RoomSelect;
