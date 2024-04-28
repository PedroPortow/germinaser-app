import React, { useEffect, useState } from 'react';
import { Select } from "native-base";
import { Ionicons } from '@expo/vector-icons'
import { apiGetClinics } from '../../services/clinics';

function ClinicSelect({ onSelectClinic, selectedClinic }) {
  const [clinicOptions, setClinicOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getClinicOptions = async () => {
    setIsLoading(true);
    try {
      const response = await apiGetClinics();
      const formattedResponse = response.data.map((clinic) => ({
        label: clinic.name,
        value: clinic.id,
        address: clinic.address
      }));
      setClinicOptions(formattedResponse);
    } catch (error) {
      console.error(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getClinicOptions();
  }, []);

  return (
    <Select
      selectedValue={selectedClinic}
      accessibilityLabel="Choose Clinic"
      placeholder="Selecione uma clínica"
      size={'lg'}
      // dropdownIcon={} // ALTERAR ISSO TÁ FEIO DEMAIS
      _selectedItem={{
        bg: "teal.600",
        endIcon: <Ionicons name="checkmark-circle" size={5} color="white" />
      }}
      mt={1}
      onValueChange={(itemValue) => onSelectClinic(itemValue)}
      isDisabled={isLoading}
    >
      {clinicOptions.map((clinic) => (
        <Select.Item key={clinic.value} label={`${clinic.label} - ${clinic.address}`} value={clinic.value} />
      ))}
    </Select>
  );
}

export default ClinicSelect;
