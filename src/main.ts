import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './assets/main.css'

// 다크 모드 감지 및 적용
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (prefersDarkScheme.matches) {
  document.body.classList.add("dark-mode");
} else {
  document.body.classList.remove("dark-mode");
}

// 다크 모드 수동 전환 함수
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("dark-mode", isDarkMode ? "true" : "false");
};

// 사용자 설정 저장 및 불러오기
const loadUserPreference = () => {
  const isDarkMode = localStorage.getItem("dark-mode") === "true";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
};

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')

loadUserPreference();
