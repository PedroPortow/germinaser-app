import { useMemo } from 'react'

const useFormFilled = (fields) => {
  const areAllFieldsFilled = useMemo(() => Object.values(fields).every((value) => value), [fields])

  return areAllFieldsFilled
}

export default useFormFilled
