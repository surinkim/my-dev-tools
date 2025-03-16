<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LanguageSelector from '@/components/LanguageSelector.vue'
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="header-container">
        <h1 class="logo">
          <RouterLink to="/">{{ $t('home.title') }}</RouterLink>
        </h1>
        <nav class="nav">
          <RouterLink to="/">{{ $t('nav.home') }}</RouterLink>
          <RouterLink to="/json">{{ $t('nav.jsonUtil') }}</RouterLink>
          <RouterLink to="/base64">{{ $t('nav.base64Util') }}</RouterLink>
          <RouterLink to="/url">{{ $t('nav.urlUtil') }}</RouterLink>
        </nav>
        <div class="language-container">
          <LanguageSelector />
        </div>
      </div>
    </header>
    <main class="main">
      <router-view />
    </main>
    <footer class="footer">
      <div class="footer-container">
        <p>© 2025 DevBuddy</p>
      </div>
    </footer>
  </div>
</template>

<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  font-weight: normal;
}

body {
  min-height: 100vh;
  background: #f5f7fa;
  line-height: 1.6;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a {
  text-decoration: none;
  color: #3498db;
  transition: color 0.3s ease;
}

a:hover {
  color: #2980b9;
}

.header {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0;
}

.logo a {
  color: #2c3e50;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.language-container {
  margin-left: 1rem;
}

.main {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.footer {
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
  background-color: #f8f9fa;
  font-size: 0.9rem;
  color: #777;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    padding: 1rem;
  }
  
  .nav {
    margin-top: 1rem;
    justify-content: center;
  }
  
  .language-container {
    margin-top: 0.5rem;
    margin-left: 0;
  }
}
</style>
