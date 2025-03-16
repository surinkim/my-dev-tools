<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// 유틸리티 상태 관리
const inputText = ref('');
const outputText = ref('');
const errorMessage = ref('');
const operation = ref('encode'); // 기본값: 인코딩

// URL 처리 함수
const processUrl = () => {
  try {
    errorMessage.value = '';
    
    if (!inputText.value) {
      errorMessage.value = t('common.empty');
      return;
    }

    if (operation.value === 'encode') {
      // 텍스트를 URL 인코딩
      outputText.value = encodeURIComponent(inputText.value);
    } else {
      // URL을 디코딩
      try {
        outputText.value = decodeURIComponent(inputText.value);
      } catch (e) {
        throw new Error(t('common.invalid'));
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = `${t('common.error')}: ${error.message}`;
    } else {
      errorMessage.value = t('common.error');
    }
    outputText.value = '';
  }
};

// 복사 기능
const copyOutput = () => {
  if (outputText.value) {
    navigator.clipboard.writeText(outputText.value)
      .then(() => {
        alert(t('common.copied'));
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
    inputText.value = 'https://example.com/path?param1=안녕하세요&param2=Hello World';
  } else {
    inputText.value = 'https%3A%2F%2Fexample.com%2Fpath%3Fparam1%3D%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94%26param2%3DHello%20World';
  }
};
</script>

<template>
  <div class="url-utility">
    <header>
      <h1>{{ $t('urlUtil.title') }}</h1>
      <router-link to="/" class="back-link">← {{ $t('nav.home') }}</router-link>
    </header>

    <div class="options-bar">
      <div class="radio-group">
        <label>
          <input type="radio" v-model="operation" value="encode">
          {{ $t('common.encode') }}
        </label>
        <label>
          <input type="radio" v-model="operation" value="decode">
          {{ $t('common.decode') }}
        </label>
      </div>
    </div>

    <div class="url-container">
      <div class="input-section">
        <div class="text-header">
          <h3>{{ $t('common.input') }}</h3>
          <div class="actions">
            <button @click="loadSample" class="btn">{{ $t('common.sample') }}</button>
            <button @click="clearInput" class="btn">{{ $t('common.clear') }}</button>
          </div>
        </div>
        <textarea 
          v-model="inputText"
          :placeholder="$t('urlUtil.description')"
          class="text-textarea"
        ></textarea>
      </div>
      
      <div class="action-center">
        <button @click="processUrl" class="process-btn">
          {{ operation === 'encode' ? $t('common.encode') : $t('common.decode') }} →
        </button>
      </div>
      
      <div class="output-section">
        <div class="text-header">
          <h3>{{ $t('common.output') }}</h3>
          <button @click="copyOutput" class="btn" :disabled="!outputText">{{ $t('common.copy') }}</button>
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
.url-utility {
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

.url-container {
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