import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { EventForm } from '../EventForm';

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe('EventForm 컴포넌트 테스트', () => {
  const mockProps = {
    title: '',
    setTitle: vi.fn(),
    date: '',
    setDate: vi.fn(),
    startTime: '',
    endTime: '',
    description: '',
    setDescription: vi.fn(),
    location: '',
    setLocation: vi.fn(),
    category: '',
    setCategory: vi.fn(),
    isRepeating: false,
    setIsRepeating: vi.fn(),
    repeatType: 'none',
    setRepeatType: vi.fn(),
    repeatInterval: 1,
    setRepeatInterval: vi.fn(),
    repeatEndDate: '',
    setRepeatEndDate: vi.fn(),
    notificationTime: 60,
    setNotificationTime: vi.fn(),
    timeErrors: { startTimeError: '', endTimeError: '' },
    editingEvent: null,
    onSubmit: vi.fn(),
    handleStartTimeChange: vi.fn(),
    handleEndTimeChange: vi.fn(),
  };

  it('EventForm이 정상적으로 렌더링된다', () => {
    renderWithChakra(<EventForm {...mockProps} />);

    // 필수 폼 요소들이 존재하는지 확인
    expect(screen.getByLabelText('제목')).toBeInTheDocument();
    expect(screen.getByLabelText('날짜')).toBeInTheDocument();
    expect(screen.getByLabelText('시작 시간')).toBeInTheDocument();
    expect(screen.getByLabelText('종료 시간')).toBeInTheDocument();
  });

  it('편집 모드에서는 수정 버튼이 표시된다', () => {
    renderWithChakra(<EventForm {...mockProps} editingEvent={{ id: '1', ...mockProps }} />);
    const submitButton = screen.getByRole('button', { name: '일정 수정' });
    expect(submitButton).toBeInTheDocument();
  });
});
