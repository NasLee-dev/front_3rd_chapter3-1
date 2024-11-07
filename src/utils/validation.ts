export const validateEventData = (eventData: any) => {
  const errors: Record<string, string> = {};

  if (!eventData.title?.trim()) {
    errors.title = '제목을 입력해주세요';
  }

  if (!eventData.date) {
    errors.date = '날짜를 선택해주세요';
  }

  if (!eventData.startTime) {
    errors.startTime = '시작 시간을 선택해주세요';
  }

  if (!eventData.endTime) {
    errors.endTime = '종료 시간을 선택해주세요';
  }

  if (eventData.startTime && eventData.endTime) {
    const start = new Date(`2000-01-01T${eventData.startTime}`);
    const end = new Date(`2000-01-01T${eventData.endTime}`);
    if (end <= start) {
      errors.endTime = '종료 시간은 시작 시간보다 늦어야 합니다';
    }
  }

  return errors;
};
