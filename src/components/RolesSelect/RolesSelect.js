import React, { useEffect, useState } from 'react';
import { Select } from "native-base";
import { apiGetRoles } from '../../services/user';

function RolesSelect({ onSelectRole, selectedRole }) {
  const [roleOptions, setRoleOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRolesOptions = async () => {
    setIsLoading(true)
    try {
      const response = await apiGetRoles()

      const ROLES_LABEL = {
        user: 'Usuário',
        owner: 'Dono',
        admin: 'Administrador',
      }

      const formattedResponse = response.data.roles.map((role) => ({
        label: ROLES_LABEL[role],
        value: role,
      }))

      setRoleOptions(formattedResponse)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getRolesOptions();
  }, []);

  return (
    <Select
      selectedValue={selectedRole}
      accessibilityLabel="Choose Role"
      placeholder="Selecione um cargo"
      size={'lg'}
      // dropdownIcon={} // ALTERAR ISSO TÁ FEIO DEMAIS
      mt={1}
      onValueChange={(itemValue) => onSelectRole(itemValue)}
      isDisabled={isLoading}
    >
      {roleOptions.map((role) => (
        <Select.Item key={role.value} label={role.label} value={role.value} />
      ))}
    </Select>
  );
}

export default RolesSelect;
