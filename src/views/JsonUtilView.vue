<script setup lang="ts">
import { ref, computed } from 'vue';

// 유틸리티 상태 관리
const inputJson = ref('');
const outputJson = ref('');
const errorMessage = ref('');
const selectedAction = ref('pretty'); // 기본값: pretty

// 포맷팅 스페이스 옵션
const indentSpaces = ref(2);

// JSON 처리 함수
const processJson = () => {
  try {
    errorMessage.value = '';
    
    if (!inputJson.value.trim()) {
      errorMessage.value = '처리할 JSON을 입력해주세요';
      return;
    }

    // 입력값 파싱
    const parsedJson = JSON.parse(inputJson.value);
    
    // 선택된 작업에 따라 처리
    switch (selectedAction.value) {
      case 'pretty':
        outputJson.value = JSON.stringify(parsedJson, null, indentSpaces.value);
        break;
      case 'minify':
        outputJson.value = JSON.stringify(parsedJson);
        break;
      case 'validate':
        outputJson.value = '유효한 JSON 입니다!';
        break;
    }
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = `오류: ${error.message}`;
    } else {
      errorMessage.value = '알 수 없는 오류가 발생했습니다';
    }
    outputJson.value = '';
  }
};

// 샘플 데이터 로드
const loadSample = () => {
  inputJson.value = JSON.stringify({
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com",
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "zipcode": "12345"
    },
    "hobbies": ["reading", "gaming", "traveling"]
  }, null, 2);
};

// 복사 기능
const copyOutput = () => {
  if (outputJson.value) {
    navigator.clipboard.writeText(outputJson.value)
      .then(() => {
        alert('클립보드에 복사되었습니다!');
      })
      .catch(err => {
        console.error('클립보드 복사 실패:', err);
      });
  }
};

// 입력창 초기화
const clearInput = () => {
  inputJson.value = '';
  outputJson.value = '';
  errorMessage.value = '';
};
</script>

<template>
  <div class="json-utility">
    <header>
      <h1>JSON 유틸리티</h1>
      <router-link to="/" class="back-link">← 홈으로 돌아가기</router-link>
    </header>

    <div class="options-bar">
      <div class="radio-group">
        <label>
          <input type="radio" v-model="selectedAction" value="pretty">
          예쁘게 포맷팅
        </label>
        <label>
          <input type="radio" v-model="selectedAction" value="minify">
          압축
        </label>
        <label>
          <input type="radio" v-model="selectedAction" value="validate">
          유효성 검사
        </label>
      </div>
      
      <div v-if="selectedAction === 'pretty'" class="indent-options">
        <label>들여쓰기 공백:
          <select v-model.number="indentSpaces">
            <option :value="2">2 spaces</option>
            <option :value="4">4 spaces</option>
            <option :value="6">6 spaces</option>
            <option :value="8">8 spaces</option>
          </select>
        </label>
      </div>
    </div>

    <div class="json-container">
      <div class="input-section">
        <div class="text-header">
          <h3>입력 JSON</h3>
          <div class="actions">
            <button @click="loadSample" class="btn">샘플 로드</button>
            <button @click="clearInput" class="btn">초기화</button>
          </div>
        </div>
        <textarea 
          v-model="inputJson"
          placeholder="여기에 JSON을 입력하세요..."
          class="json-textarea"
        ></textarea>
      </div>
      
      <div class="action-center">
        <button @click="processJson" class="process-btn">
          처리 →
        </button>
      </div>
      
      <div class="output-section">
        <div class="text-header">
          <h3>결과</h3>
          <button @click="copyOutput" class="btn" :disabled="!outputJson">복사</button>
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <textarea 
          v-model="outputJson"
          readonly
          class="json-textarea"
          :class="{ 'has-error': errorMessage }"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.json-utility {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  margin: 0;
  color: #2c3e50;
}

.back-link {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}

.options-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.radio-group label {
  margin-right: 1.5rem;
  cursor: pointer;
}

.json-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  height: 60vh;
}

.input-section, .output-section {
  display: flex;
  flex-direction: column;
}

.text-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.text-header h3 {
  margin: 0;
}

.json-textarea {
  flex: 1;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ced4da;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  resize: none;
}

.action-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.process-btn {
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}

.process-btn:hover {
  background-color: #2980b9;
}

.btn {
  padding: 0.5rem 0.75rem;
  background-color: #e9ecef;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 0.5rem;
  color: #495057;
}

.btn:hover {
  background-color: #ced4da;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.actions {
  display: flex;
}

.error-message {
  color: #e74c3c;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: #fae2e2;
}

.has-error {
  border-color: #e74c3c;
}
</style>