<template>
  <div class="language-selector">
    <div class="language-icon" @click="toggleLanguage">
      <span class="icon">🌐</span>
      <span class="language-code">{{ currentLocale }}</span> <!-- 현재 언어 코드 표시 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { setLocale } from '@/i18n'

const currentLocale = ref(localStorage.getItem('locale') || 'ko')

const toggleLanguage = () => {
  const newLocale = currentLocale.value === 'ko' ? 'en' : 'ko'
  setLocale(newLocale)
  currentLocale.value = newLocale
}
</script>

<style scoped>
.language-selector {
  display: inline-block;
  margin: 0 10px;
}

.language-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px; /* 크기 조정 */
  height: 50px; /* 크기 조정 */
  background-color: #4CAF50; /* 현대적인 감각에 어울리는 색상 */
  border-radius: 50%;
  cursor: pointer;
}

.language-icon .icon {
  color: white;
}

.language-icon .language-code {
  margin-left: 5px; /* 여백 조정 */
  color: white;
  font-weight: bold;
}

.language-icon:hover {
  background-color: #45A049; /* 호버 시 색상 변경 */
}
</style>