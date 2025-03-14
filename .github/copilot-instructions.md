# My Dev Tools - 개발 지침서

## 프로젝트 개요

이 프로젝트는 개발자를 위한 유틸리티 도구 모음을 Vue.js와 TypeScript를 사용하여 구현한 웹 애플리케이션입니다.
현재 포함된 기능:
- JSON 유틸리티
- Base64 인코딩/디코딩 유틸리티

## 기술 스택

- Vue 3
- TypeScript
- Vite
- Vue Router

## 개발 컨벤션

### 파일 및 폴더 구조

```
src/
  ├── assets/        # 정적 자산(CSS, 이미지)
  ├── components/    # 재사용 가능한 컴포넌트
  │    └── icons/    # 아이콘 컴포넌트
  ├── router/        # 라우팅 설정
  ├── views/         # 페이지 단위의 뷰 컴포넌트
  ├── App.vue        # 최상위 앱 컴포넌트
  └── main.ts        # 앱 진입점
```

### 네이밍 컨벤션

- 컴포넌트 파일: PascalCase (예: `HelloWorld.vue`, `JsonUtilView.vue`)
- 함수/변수: camelCase
- 상수: UPPER_SNAKE_CASE
- CSS 클래스: kebab-case

### 라우팅

새로운 라우트 추가 시 `/src/router/index.ts` 파일에 다음과 같이 추가:

```typescript
{
  path: '/경로',
  name: '이름',
  component: () => import('../views/이름View.vue')
}
```

코드 분할을 위해 지연 로딩 방식을 사용합니다.

### 컴포넌트 구조

Vue 단일 파일 컴포넌트(SFC) 구조:

```vue
<template>
  <!-- 템플릿 마크업 -->
</template>

<script setup lang="ts">
// 컴포넌트 로직
</script>

<style scoped>
/* 컴포넌트 스타일 */
</style>
```

## 새로운 유틸리티 추가 방법

1. `src/views` 폴더에 `[기능명]UtilView.vue` 파일 생성
2. `src/router/index.ts`에 새로운 라우트 추가
3. 필요한 경우 `src/components`에 관련 컴포넌트 추가
4. 홈 화면에 새 기능 링크 추가

## 에러 처리 가이드라인

### 사용자 입력 유효성 검사

- 유틸리티 도구에서 사용자 입력은 항상 검증되어야 합니다
- 오류 메시지는 친절하고 명확하게 작성
- 예:

```typescript
const validateJson = (input: string): { isValid: boolean; message?: string } => {
  try {
    if (!input.trim()) {
      return { isValid: false, message: '입력값이 비어 있습니다.' };
    }
    JSON.parse(input);
    return { isValid: true };
  } catch (error) {
    return { 
      isValid: false, 
      message: `유효하지 않은 JSON 형식입니다: ${(error as Error).message}` 
    };
  }
};
```

### 에러 표시 방법

- 인라인 에러 메시지 활용
- 심각한 오류는 Toast 메시지 또는 모달 사용
- 사용자가 오류를 해결할 수 있는 방법 제시

## 상태 관리

프로젝트 규모가 커질 경우 상태 관리에 다음 패턴 활용:

### 컴포넌트 내부 상태 관리

간단한 컴포넌트 내부 상태는 `ref` 또는 `reactive`로 관리:

```typescript
import { ref, reactive } from 'vue';

// 간단한 값
const count = ref(0);

// 복잡한 객체
const state = reactive({
  items: [],
  loading: false,
  error: null
});
```

### 컴포넌트 간 상태 공유

여러 컴포넌트 간 상태 공유가 필요한 경우 Composition API 활용:

```typescript
// useMyState.ts
import { ref } from 'vue';

export function useMyState() {
  const sharedState = ref(0);
  
  function updateState(newValue) {
    sharedState.value = newValue;
  }
  
  return {
    sharedState,
    updateState
  };
}
```

## 접근성 지침

모든 유틸리티 도구는 다음 접근성 지침을 준수해야 합니다:

- 폼 요소에는 항상 적절한 `label` 연결
- 의미있는 시맨틱 HTML 사용 (`<button>` vs. `<div onclick>`)
- 키보드 네비게이션 지원
- 색상 대비 검사 통과 (WCAG AA 기준)
- 스크린 리더 지원을 위한 ARIA 속성 사용

## 국제화(i18n) 지원

앱이 여러 언어를 지원해야 할 경우:

- 텍스트는 직접 하드코딩하지 않고 키 기반으로 관리
- Vue I18n 라이브러리 활용
- 날짜, 시간, 숫자 형식 로컬라이제이션 고려

## 성능 최적화 지침

- 큰 라이브러리 사용 시 정적 임포트보다 동적 임포트 활용
- 이미지 최적화: 적절한 형식(WebP 등) 및 크기 사용
- 긴 목록은 가상 스크롤링 고려 
- 무거운 계산은 웹 워커 사용 검토
- computed 속성 활용으로 불필요한 재계산 방지

## 빌드 및 배포

### 개발 서버 시작
```bash
npm run dev
```

### 프로덕션용 빌드
```bash
npm run build
```

### 테스트
```bash
npm run test
```

## 코드 품질 관리

- 일관된 코드 스타일 유지
- 함수는 단일 책임 원칙 준수
- 재사용 가능한 컴포넌트 적극 활용
- 필요한 주석 추가 (특히 복잡한 로직)
- TypeScript 타입 적극 활용

## 기여 방법

1. 기능 추가 전 BACKLOG.md 파일 확인
2. 새로운 기능은 별도 브랜치에서 개발
3. 코드 리뷰 후 메인 브랜치에 머지