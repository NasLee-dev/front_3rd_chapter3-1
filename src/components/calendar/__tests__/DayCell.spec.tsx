import { ChakraProvider, Table, Tbody, Tr } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import { DayCell } from '../DayCell';

const renderDayCell = (props: any) => {
  return render(
    <ChakraProvider>
      <Table>
        <Tbody>
          <Tr>
            <DayCell {...props} />
          </Tr>
        </Tbody>
      </Table>
    </ChakraProvider>
  );
};

describe('DayCell 컴포넌트 테스트', () => {
  const defaultProps = {
    currentDate: new Date('2024-03-08'),
    day: 8,
    events: [],
    onEventClick: () => {},
    isCurrentMonth: true,
  };

  it('DayCell이 정상적으로 렌더링된다', () => {
    const { container } = renderDayCell(defaultProps);
    const cell = container.querySelector('td');
    expect(cell).toBeInTheDocument();
  });

  it('이벤트가 없는 날은 날짜만 렌더링한다', () => {
    const { container } = renderDayCell(defaultProps);
    const cell = container.querySelector('td');
    expect(cell).toHaveTextContent('8');
  });
});
