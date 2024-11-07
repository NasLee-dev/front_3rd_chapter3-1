import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { NotificationList } from '../NotificationList';

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe('NotificationList 컴포넌트 테스트', () => {
  const mockNotifications = [
    {
      id: '1',
      message: '테스트 알림 1',
      type: 'info' as const,
    },
    {
      id: '2',
      message: '테스트 알림 2',
      type: 'warning' as const,
    },
  ];

  it('NotificationList가 정상적으로 렌더링된다', () => {
    const { container } = renderWithChakra(
      <NotificationList notifications={mockNotifications} onClose={() => {}} />
    );
    expect(container).toBeInTheDocument();
  });

  it('알림 닫기 버튼이 동작한다', () => {
    const handleClose = vi.fn();
    renderWithChakra(<NotificationList notifications={mockNotifications} onClose={handleClose} />);

    const closeButtons = screen.getAllByRole('button');
    fireEvent.click(closeButtons[0]);

    expect(handleClose).toHaveBeenCalledWith(0);
  });

  it('알림 메시지가 올바르게 표시된다', () => {
    renderWithChakra(<NotificationList notifications={mockNotifications} onClose={() => {}} />);

    expect(screen.getByText('테스트 알림 1')).toBeInTheDocument();
    expect(screen.getByText('테스트 알림 2')).toBeInTheDocument();
  });
});
