<script setup lang="ts">
import { useRouter } from 'vue-router';

// 유틸리티 목록 데이터 정의
const utilities = [
  { 
    id: 'json',
    name: 'JSON 유틸리티',
    description: 'JSON 데이터 인코딩/디코딩, 포맷팅, 유효성 검사',
    path: '/json'
  },
  { 
    id: 'base64',
    name: 'Base64 유틸리티',
    description: 'Base64 인코딩/디코딩 기능',
    path: '/base64'
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
      <h1>개발자 유틸리티 도구</h1>
      <p>개발 작업에 유용한 다양한 유틸리티 기능을 제공합니다</p>
    </header>
    
    <div class="utility-grid">
      <div 
        v-for="util in utilities" 
        :key="util.id" 
        class="utility-card" 
        @click="() => navigateTo(util.path)"
      >
        <h2>{{ util.name }}</h2>
        <p>{{ util.description }}</p>
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