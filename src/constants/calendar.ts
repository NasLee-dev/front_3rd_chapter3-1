export const CATEGORIES = ['업무', '개인', '가족', '기타'] as const;

export const NOTIFICATION_OPTIONS = [
  { value: 1, label: '1분 전' },
  { value: 10, label: '10분 전' },
  { value: 60, label: '1시간 전' },
  { value: 120, label: '2시간 전' },
  { value: 1440, label: '1일 전' },
] as const;

export const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const REPEAT_TYPES = {
  NONE: 'none',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
} as const;

export type Category = (typeof CATEGORIES)[number];
export type RepeatType = (typeof REPEAT_TYPES)[keyof typeof REPEAT_TYPES];
export type WeekDay = (typeof WEEK_DAYS)[number];

export const DATE_FORMAT = {
  FULL_DATE: 'YYYY-MM-DD',
  YEAR_MONTH: 'YYYY년 M월',
  WEEK: 'YYYY년 M월 W주',
} as const;

export const TIME_FORMAT = {
  HH_MM: 'HH:mm',
  HH_MM_SS: 'HH:mm:ss',
} as const;

export const ERROR_MESSAGES = {
  REQUIRED: {
    TITLE: '제목을 입력해주세요',
    DATE: '날짜를 선택해주세요',
    START_TIME: '시작 시간을 선택해주세요',
    END_TIME: '종료 시간을 선택해주세요',
  },
  INVALID: {
    TIME_RANGE: '종료 시간은 시작 시간보다 늦어야 합니다',
    DATE_RANGE: '종료일은 시작일보다 늦어야 합니다',
  },
} as const;
