# limSystem

여러 프로젝트에서 공용으로 쓰기 좋은 디자인 시스템.
AI를 이용하는 여러 프로젝트에서도 가져다 쓰기 좋은 프로젝트를 만드는 것을 목표로 합니다.

컴포넌트/토큰 사용 규칙은 `src/components/CLAUDE.md`에 있다. 그 파일은 `src/components`와 함께 다른 프로젝트로 복사되므로, 소비 프로젝트에서도 지켜야 하는 규칙은 거기에만 적고 여기서 중복하지 않는다. 이 파일은 이 레포를 개발할 때만 필요한 규칙을 담는다.

## Stack & Cmd

- Stack: React 19 + TypeScript 6 + CSS Modules + Vite(빌드/Storybook) + `@floating-ui/react`
- `npm run storybook` | `npm run build-storybook` | `npm run lint` | `npm run typecheck` | `npm run check` | `npm run generate:icons`
  - `storybook`/`build-storybook`는 실행 전 `generate:icons`를 자동 실행한다.
  - 테스트 러너 없음. `npm run check` = typecheck + lint + build-storybook.
- 데모/플레이그라운드는 Storybook(`*.stories.tsx`)이다. 앱 페이지는 없다.
- 이 레포는 다른 프로젝트에 `src/components` + `src/util`(+ `src/hooks`, `src/css-reset/reset.css`, `src/assets/icons`, `generate-icon-types.ts`)을 복사해서 쓴다. 복사 대상은 Next App Router일 수 있다.

## Agent Rules

- Git Commit: 기능 구현이나 버그 수정이 "완전히" 끝났을 때만 자동으로 커밋을 진행하며, 메시지는 한 줄로 간결하게 작성한다.
- 답변 형식 (No Yapping): 인사말과 이모티콘을 생략하고, 다음 3가지만 개조식으로 간결히 출력하라.
  1. 수정한 파일명 (단, 수정 코드가 5줄 이하일 경우에만 해당 코드를 포함)
  2. 무엇을, 왜 수정했는지
  3. 수정 후 예상되는 동작 변화 (또는 확인이 필요한 터미널 검증 명령어)
- 규칙이 바뀌면 같은 커밋에서 `CLAUDE.md` / `src/components/CLAUDE.md`를 함께 고친다. 과도기 상태는 적지 않고 현재 참인 규칙만 남긴다.

## 레포 구조

- `src/components/index.ts` — 단일 진입점. 컴포넌트/타입은 전부 여기서 export한다. 새 컴포넌트를 만들면 여기에 추가한다.
- `src/css-reset/reset.css` + `src/util/theme.css`를 `.storybook/preview.ts`에서 import. (`josh-reset.css`, `modern-reset.css`는 미사용 대안)
- `src/util/warn.ts` — `warnDev(condition, message)`: 개발 모드 전용 잘못된 사용 경고.

## 주의사항 (Gotchas)

- 디렉토리 이름을 바꿀 때는 반드시 `git mv`를 사용한다. macOS에서 대소문자만 바꾸면 git이 변경을 감지하지 못한다.
- `README.md`에 컴포넌트별 요약 표가 있다. 컴포넌트를 추가/변경하면 README도 갱신한다.
- `.next/`, `tsconfig.tsbuildinfo`는 Next 시절 산출물이다. 남아 있으면 지운다.
