import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react';

interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = ({ variant = 'primary', ...props }: CustomButtonProps) => {
  const getColorScheme = () => {
    switch (variant) {
      case 'primary':
        return 'blue';
      case 'secondary':
        return 'gray';
      case 'danger':
        return 'red';
      default:
        return 'blue';
    }
  };

  return <ChakraButton colorScheme={getColorScheme()} {...props} />;
};
