<template>
  <div class="language-selector">
    <select
      :value="currentLocale"
      @change="changeLanguage($event)"
      aria-label="언어 선택"
      class="language-select"
    >
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'

const i18n = useI18n()
const currentLocale = ref(i18n.locale.value)

// 언어 변경 함수
const changeLanguage = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const locale = target.value as 'ko' | 'en'
  setLocale(locale)
  currentLocale.value = locale
}

// 컴포넌트 마운트 시 HTML lang 속성 설정
onMounted(() => {
  document.querySelector('html')?.setAttribute('lang', currentLocale.value)
})
</script>

<style scoped>
.language-selector {
  display: inline-block;
  margin: 0 10px;
}

.language-select {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
}
</style>