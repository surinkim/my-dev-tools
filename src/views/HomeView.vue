<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// 유틸리티 목록 데이터 정의
const utilities = [
  { 
    id: 'json',
    name: 'nav.jsonUtil',
    description: 'jsonUtil.description',
    path: '/json'
  },
  { 
    id: 'base64',
    name: 'nav.base64Util',
    description: 'base64Util.description',
    path: '/base64'
  },
  { 
    id: 'url',
    name: 'nav.urlUtil',
    description: 'urlUtil.description',
    path: '/url'
  }
];

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="home">
    <header>
      <h1>{{ $t('home.title') }}</h1>
      <p>{{ $t('home.description') }}</p>
    </header>
    
    <div class="utility-grid">
      <div 
        v-for="util in utilities" 
        :key="util.id" 
        class="utility-card" 
        @click="() => navigateTo(util.path)"
      >
        <h2>{{ $t(util.name) }}</h2>
        <p>{{ $t(util.description) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 3rem;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
}

.utility-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.utility-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border: 1px solid #e9ecef;
}

.utility-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #3498db;
  margin-bottom: 0.75rem;
}
</style>