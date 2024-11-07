import { Input as ChakraInput, InputProps, FormErrorMessage, FormControl } from '@chakra-ui/react';

interface CustomInputProps extends InputProps {
  error?: string;
}

export const Input = ({ error, ...props }: CustomInputProps) => {
  return (
    <FormControl isInvalid={!!error}>
      <ChakraInput
        {...props}
        borderColor={error ? 'red.500' : 'inherit'}
        _hover={{ borderColor: error ? 'red.600' : 'gray.300' }}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
