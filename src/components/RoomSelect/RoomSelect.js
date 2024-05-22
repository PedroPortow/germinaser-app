import React, { useEffect, useState } from 'react';
import { Select } from "native-base";
import { Ionicons } from '@expo/vector-icons'
import { apiGetClinicRooms  } from '../../services/clinics';

function RoomSelect({ onSelectRoom, selectedClinic, withAllOption = true }) {
  const [roomOptions, setRoomOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRoomOptions = async () => {
    setIsLoading(true)

    try {
      const response = await apiGetClinicRooms(selectedClinic)

      const formattedResponse = response.data.map((room) => ({
        label: room.name,
        value: room.id,
       }));

      if(withAllOption){
        const allRoomsOption = { label: 'Todas', value: 'all' }; // Opção para representar todas as salas
        setRoomOptions([allRoomsOption, ...formattedResponse]);
      } else {
        setRoomOptions(formattedResponse);
      }

    } catch(error) {
      console.error(error)
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(!!selectedClinic && selectedClinic != "all"){
      getRoomOptions();
    }
  }, [selectedClinic]);

  return (
    <Select
      // selectedValue={}
      accessibilityLabel="Choose Room"
      placeholder="Selecione uma sala"
      size='lg'
      dropdownIcon={
        <Ionicons
          name="chevron-down-outline"
          size={18}
          color="#333"
          style={{marginRight: 8}}
        />
      }
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
