import { createI18n } from 'vue-i18n'
import ko from './locales/ko'
import en from './locales/en'

// 브라우저 언어 설정 감지 함수
function detectBrowserLanguage(): string {
  // 브라우저의 언어 설정 가져오기
  const browserLang = navigator.language || (navigator as any).userLanguage
  // 'en-US'와 같은 형식에서 'en'만 추출
  const lang = browserLang.split('-')[0]
  
  // 지원하는 언어인지 확인 (현재는 'ko'와 'en'만 지원)
  if (['ko', 'en'].includes(lang)) {
    return lang
  }
  
  return 'ko' // 기본값은 한국어
}

// 언어 설정 우선순위:
// 1. 로컬 스토리지에 저장된 언어 설정
// 2. 브라우저 언어 설정
// 3. 기본 언어(ko)
const savedLocale = localStorage.getItem('locale') || detectBrowserLanguage() || 'ko'

// i18n 인스턴스 생성
const i18n = createI18n({
  legacy: false, // Composition API 모드 활성화
  globalInjection: true, // 전역 주입 활성화
  locale: savedLocale,
  fallbackLocale: 'ko', // 기본 언어 설정
  messages: {
    ko,
    en
  },
  numberFormats: {
    'ko': {
      currency: {
        style: 'currency',
        currency: 'KRW',
        notation: 'standard'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      },
      percent: {
        style: 'percent',
        useGrouping: true
      }
    },
    'en': {
      currency: {
        style: 'currency',
        currency: 'USD',
        notation: 'standard'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      },
      percent: {
        style: 'percent',
        useGrouping: true
      }
    }
  },
  datetimeFormats: {
    'ko': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      },
      time: {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }
    },
    'en': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      },
      time: {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }
    }
  }
})

// 언어 변경 함수
export function setLocale(locale: 'ko' | 'en') {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale) // 로컬 스토리지에 언어 설정 저장
  document.querySelector('html')?.setAttribute('lang', locale) // HTML lang 속성 업데이트
}

// 날짜 형식화 유틸리티 함수
export function formatDate(date: Date, format: 'short' | 'long' = 'short'): string {
  return i18n.global.d(date, format)
}

// 시간 형식화 유틸리티 함수
export function formatTime(date: Date): string {
  return i18n.global.d(date, 'time')
}

// 숫자 형식화 유틸리티 함수
export function formatNumber(number: number, format: 'currency' | 'decimal' | 'percent' = 'decimal'): string {
  return i18n.global.n(number, format)
}

// 초기 HTML lang 속성 설정
document.querySelector('html')?.setAttribute('lang', savedLocale)

export default i18n