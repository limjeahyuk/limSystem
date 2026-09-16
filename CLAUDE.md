# limSystem

여러 프로젝트에서 공용으로 쓰기 좋은 디자인 시스템.
AI를 이용하는 여러 프로젝트에서도 가져다 쓰기 좋은 프로젝트를 만드는 것을 목표로 합니다.

## STACK & Cmd

- Stack: React 19 + TypeScript 6 + CSS Modules + Vite(빌드/Storybook) + `@floating-ui/react`
- `npm run storybook` | `npm run build-storybook` | `npm run lint` | `npm run typecheck` | `npm run check` | `npm run generate:icons`
  - `storybook`/`build-storybook`는 실행 전 `generate:icons`를 자동 실행한다.
  - 테스트 러너 없음. `npm run check` = typecheck + lint + build-storybook.
- 데모/플레이그라운드는 Storybook(`*.stories.tsx`)이다. 앱 페이지는 없다.
- 이 레포는 다른 프로젝트에 `src/components` + `src/util`을 복사해서 쓴다. 소스에 번들러 전용 기능(`next/*`, `import.meta.env`, `?raw`)을 넣지 않는다.

## Coding Conventions & Agent Rules

- 불변성 유지: 상태는 불변(Immutable) 객체로 다루고, 핵심 함수는 새 객체를 반환한다.
- 매직 넘버 금지: CSS에서는 `var(--ls-*)` 토큰, TS에서는 `util/theme`의 `Color`/`Radius`(같은 변수의 미러)를 참조한다.
- 주석 규칙: 주석은 한국어로 작성하되 2줄 이하로 제한한다. (이모티콘 절대 금지)
- Git Commit: 기능 구현이나 버그 수정이 "완전히" 끝났을 때만 자동으로 커밋을 진행하며, 메시지는 한 줄로 간결하게 작성한다.
- 답변 형식 (No Yapping): 인사말과 이모티콘을 생략하고, 다음 3가지만 개조식으로 간결히 출력하라.
  1. 수정한 파일명 (단, 수정 코드가 5줄 이하일 경우에만 해당 코드를 포함)
  2. 무엇을, 왜 수정했는지
  3. 수정 후 예상되는 동작 변화 (또는 확인이 필요한 터미널 검증 명령어)
- 새 색이 필요하면 `theme.css`의 primitive에 변수를 추가하고 `theme.ts`에 미러를 추가한 뒤 사용한다. hex 직접 사용 금지.
- 스타일링은 CSS Modules(`Foo.module.css`)만 사용한다. Emotion / Tailwind / 인라인 hex 금지.
  - 유한한 선택지(`size`, `variant`, `color`)는 `data-*` 속성 + CSS 선택자로, 임의 값(`width`, `height`)은 인라인 `style`로, 파생/전파가 필요한 값은 인라인 CSS 변수(`--size`)로 넘긴다.
- 훅, 상태, floating-ui를 쓰는 파일은 첫 줄에 `"use client"`를 둔다. 복사 대상이 Next App Router일 수 있다.
- Import 경로: `tsconfig.json`의 `util/*`, `assets/*` alias 사용. 컴포넌트는 `src/components/...` 절대 경로. (`@/` alias 없음)

## Components (`src/components/`)

### 파일 구조 패턴

- `Foo.tsx` — 컴포넌트. `className={styles.foo}` + `data-size`/`data-variant`/`data-color`
- `Foo.module.css` — `.foo[data-size="2"]`, `.foo[data-variant="solid"]` 선택자로 variant 분기. 색은 `var(--ls-accent-*)`와 semantic 변수만 참조
- `src/components/index.ts` — 단일 진입점. 컴포넌트/타입은 전부 여기서 export한다
- 사이즈는 문자열 enum `"1" | "2" | "3" | ...` (Radix 스타일)
- `color` prop은 `ColorType`(`RED | BLUE | GRAY | TEAL | ORANGE | GREEN`) 중 하나. 생략하면 테마 기본 accent(`--ls-accent-*`)를 쓴다. `data-color` 속성이 accent 스케일을 재바인딩한다.

### 공용 유틸 (`src/util/`)

- `theme.css` — 토큰의 원본. primitive(`--ls-gray-500`, `--ls-blue-500`...) → semantic(`--ls-accent-*`, `--ls-bg-*`, `--ls-border-*`, `--ls-text-*`, `--ls-space-*`, `--ls-font-size-*`, `--ls-radius-*`). 프로젝트별 룩은 semantic 블록만 바꾼다. `[data-color="X"]` 규칙이 accent 스케일을 재바인딩한다. `.ls-interactive`: hover/pressed/focus/disabled 공용 상태 클래스.
- `theme.ts` — `theme.css`의 TS 미러(`Color.BLUE_500 === "var(--ls-blue-500)"`), `Radius`, `ColorType`, `RadiusType`. 인라인 style에 쓸 때 사용.
- 소비 프로젝트는 `reset.css`와 `theme.css`를 루트에서 한 번 import한다.

### 레이아웃 (`layouts/`)

- `Box`, `Flex`, `Grid` — `system.ts`의 `LayoutsProps`(`p/px/py/pt/pr/pb/pl`, `m/mx/...`, `width`, `height`, `fullWidth`, `bg`, `radius`) 공통 사용
- 숫자는 `px`로 변환, 문자열은 그대로 통과(`toCssValue`)
- 임의의 wrapper div 대신 이 프리미티브를 사용한다.

### 아이콘 (`icon/`, `svg-icon/`)

- **`Icon`** (`icon/Icon.tsx`) — 메인 아이콘 시스템. 사용 시 `<Icon name="..." />`
  - `generate-icon-types.ts`가 `src/assets/icons/*.svg`를 스캔해 `viewBox` + 모든 `<path d>`를 추출, `icon/icon-data.ts`(`ICON_DATA`, `IconName`)를 생성한다.
  - `icon-data.ts`는 자동 생성 파일이므로 직접 수정 금지. SVG 추가/삭제 후 `npm run generate:icons`.
  - 아이콘 이름 = SVG 파일명(확장자 제외). `<path>`만 추출하므로 `<circle>`, `<rect>`, stroke 기반 SVG는 빈 아이콘이 된다.

### Floating UI 기반 (`dropdown/`, `tooltip/`, `dialog/`)

- `@floating-ui/react`의 `useFloating`, `FloatingPortal`, interaction 훅 사용
- `Dropdown`은 compound 컴포넌트: `Dropdown` + `DropdownTrigger` + `DropdownContent` + `DropdownItem`. `children`은 `closeDropdown`을 받는 render 함수도 허용.

### 상태 훅

- `checkbox/hooks.ts` — `useCheckboxGroup(initial)`: `selected`, `toggle/check/uncheck/checkAll/clear`, `isChecked`, `count`, `isEmpty`
- `radio/hooks.ts` — 라디오 그룹 상태 훅
- `hooks/useMediaQuery.ts` — 반응형 분기용

### 전역 CSS

- `src/css-reset/reset.css` + `src/util/theme.css`를 `.storybook/preview.ts`에서 import. (`josh-reset.css`, `modern-reset.css`는 미사용 대안)

## 주의사항 (Gotchas)

- **대소문자 함정**: 컴포넌트 디렉토리는 전부 소문자다. macOS는 대소문자를 무시하므로 `Badge/`처럼 잘못 써도 로컬에선 동작하지만 Linux CI에서 깨진다. 디렉토리 이름을 바꿀 때는 반드시 `git mv`를 사용한다.
- 그림자/오버레이의 `rgba(...)`는 `theme.css`에만 있다. 컴포넌트 CSS에 새 rgba를 쓰지 말고 변수를 추가한다.
- `README.md`에 컴포넌트별 요약 표가 있다. 컴포넌트를 추가/변경하면 README도 갱신한다.
- `.next/`, `tsconfig.tsbuildinfo`는 Next 시절 산출물이다. 남아 있으면 지운다.
