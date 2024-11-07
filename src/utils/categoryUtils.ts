import { Category } from '../constants/calendar';

interface CategoryColorScheme {
  light: string;
  border: string;
  text: string;
  badge: string;
}

export const getCategoryColorScheme = (category: Category): CategoryColorScheme => {
  switch (category) {
    case '업무':
      return {
        light: 'blue.50',
        border: 'blue.500',
        text: 'blue.700',
        badge: 'blue',
      };
    case '개인':
      return {
        light: 'green.50',
        border: 'green.500',
        text: 'green.700',
        badge: 'green',
      };
    case '가족':
      return {
        light: 'purple.50',
        border: 'purple.500',
        text: 'purple.700',
        badge: 'purple',
      };
    case '기타':
    default:
      return {
        light: 'gray.50',
        border: 'gray.500',
        text: 'gray.700',
        badge: 'gray',
      };
  }
};

// 간단히 배지 색상만 필요할 때
export const getCategoryColor = (category: Category): string => {
  return getCategoryColorScheme(category).badge;
};
