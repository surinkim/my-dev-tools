<script setup lang="ts">
// Vue Router 사용
</script>

<template>
  <div class="app">
    <router-view />
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
</style>
