<script setup lang="ts">
import { ref } from 'vue';

// 유틸리티 상태 관리
const inputText = ref('');
const outputText = ref('');
const errorMessage = ref('');
const operation = ref('encode'); // 기본값: 인코딩

// Base64 처리 함수
const processBase64 = () => {
  try {
    errorMessage.value = '';
    
    if (!inputText.value) {
      errorMessage.value = '처리할 텍스트를 입력해주세요';
      return;
    }

    if (operation.value === 'encode') {
      // 텍스트를 Base64로 인코딩
      outputText.value = btoa(encodeURIComponent(inputText.value).replace(/%([0-9A-F]{2})/g,
        (match, p1) => String.fromCharCode(parseInt(p1, 16))
      ));
    } else {
      // Base64를 텍스트로 디코딩
      const decoded = decodeURIComponent(Array.prototype.map.call(atob(inputText.value), (c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      outputText.value = decoded;
    }
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = `오류: ${error.message}`;
    } else {
      errorMessage.value = '알 수 없는 오류가 발생했습니다';
    }
    outputText.value = '';
  }
};

// 복사 기능
const copyOutput = () => {
  if (outputText.value) {
    navigator.clipboard.writeText(outputText.value)
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
  inputText.value = '';
  outputText.value = '';
  errorMessage.value = '';
};

// 샘플 데이터 로드
const loadSample = () => {
  if (operation.value === 'encode') {
    inputText.value = 'Hello, World! 안녕하세요!';
  } else {
    inputText.value = 'SGVsbG8lMkMlMjBXb3JsZCUyMSUyMCVFQyU5NSU4OCVFQyU5NSU4OSVFRCVOTSVBQyVFQyU4RiVBNCUyMQ==';
  }
};
</script>

<template>
  <div class="base64-utility">
    <header>
      <h1>Base64 유틸리티</h1>
      <router-link to="/" class="back-link">← 홈으로 돌아가기</router-link>
    </header>

    <div class="options-bar">
      <div class="radio-group">
        <label>
          <input type="radio" v-model="operation" value="encode">
          텍스트를 Base64로 인코딩
        </label>
        <label>
          <input type="radio" v-model="operation" value="decode">
          Base64를 텍스트로 디코딩
        </label>
      </div>
    </div>

    <div class="base64-container">
      <div class="input-section">
        <div class="text-header">
          <h3>{{ operation === 'encode' ? '인코딩할 텍스트' : '디코딩할 Base64' }}</h3>
          <div class="actions">
            <button @click="loadSample" class="btn">샘플 로드</button>
            <button @click="clearInput" class="btn">초기화</button>
          </div>
        </div>
        <textarea 
          v-model="inputText"
          :placeholder="operation === 'encode' ? '텍스트를 입력하세요...' : 'Base64 문자열을 입력하세요...'"
          class="text-textarea"
        ></textarea>
      </div>
      
      <div class="action-center">
        <button @click="processBase64" class="process-btn">
          {{ operation === 'encode' ? '인코딩 →' : '디코딩 →' }}
        </button>
      </div>
      
      <div class="output-section">
        <div class="text-header">
          <h3>결과</h3>
          <button @click="copyOutput" class="btn" :disabled="!outputText">복사</button>
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <textarea 
          v-model="outputText"
          readonly
          class="text-textarea"
          :class="{ 'has-error': errorMessage }"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.base64-utility {
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

.base64-container {
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

.text-textarea {
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