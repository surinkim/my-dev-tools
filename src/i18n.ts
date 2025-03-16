import { createI18n } from 'vue-i18n'
import ko from './locales/ko'
import en from './locales/en'

// 브라우저 로컬 스토리지에서 언어 설정 불러오기
const savedLocale = localStorage.getItem('locale') || 'ko'

// i18n 인스턴스 생성
const i18n = createI18n({
  legacy: false, // Composition API 모드 활성화
  globalInjection: true, // 전역 주입 활성화
  locale: savedLocale,
  fallbackLocale: 'ko', // 기본 언어 설정
  messages: {
    ko,
    en
  }
})

// 언어 변경 함수
export function setLocale(locale: string) {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale) // 로컬 스토리지에 언어 설정 저장
  document.querySelector('html')?.setAttribute('lang', locale) // HTML lang 속성 업데이트
}

export default i18n