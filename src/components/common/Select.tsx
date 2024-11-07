import { Select as ChakraSelect, SelectProps, FormControl, FormLabel } from '@chakra-ui/react';

interface CustomSelectProps extends SelectProps {
  label?: string;
  error?: string;
}

export const Select = ({ label, error, children, ...props }: CustomSelectProps) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel>{label}</FormLabel>}
      <ChakraSelect {...props}>{children}</ChakraSelect>
    </FormControl>
  );
};
