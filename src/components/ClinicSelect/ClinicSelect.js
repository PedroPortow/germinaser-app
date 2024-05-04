import React, { useEffect, useState } from 'react';
import { Select } from "native-base";
import { Ionicons } from '@expo/vector-icons'
import { apiGetClinics } from '../../services/clinics';

function ClinicSelect({ onSelectClinic, selectedClinic, withAllOption = true }) {
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

      if(withAllOption) {
        const allClinicsOption = { label: 'Todas', value: 'all' };
        setClinicOptions([allClinicsOption, ...formattedResponse]);
      } else {
        setClinicOptions(formattedResponse)
      }
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
      size='lg'
      dropdownIcon={
        <Ionicons
          name="chevron-down-outline"
          size={18}
          color="#333"
          style={{marginRight: 8}}
        />
      }
      mt={1}
      onValueChange={(itemValue) => onSelectClinic(itemValue)}
      isDisabled={isLoading}
    >
      {clinicOptions.map((clinic) => (
        <Select.Item key={clinic.value} label={`${clinic.label}`}  value={clinic.value} />
      ))}
    </Select>
  );
}

export default ClinicSelect;
