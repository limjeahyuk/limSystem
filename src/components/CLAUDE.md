# limSystem 컴포넌트 사용 규칙

이 폴더(`src/components`)와 `src/util`은 limSystem 디자인 시스템에서 복사해 온 것이다.
여기 있는 컴포넌트를 쓰거나 고칠 때 아래 규칙을 따른다.

## 세팅

- 앱 루트에서 `reset.css`와 `src/util/theme.css`를 한 번 import한다.
- import 경로는 `tsconfig.json` paths의 `src/*`, `util/*`, `assets/*` alias를 전제한다. alias가 없으면 추가하거나 상대경로로 바꾼다.
- 컴포넌트/타입/훅은 전부 `src/components/index.ts`에서 가져온다. 개별 파일 경로 import 금지.
- 소스에 번들러 전용 기능(`next/*`, `import.meta.env`, `?raw`)을 넣지 않는다. Vite / Next 어디서든 동작해야 한다.
- 훅, 상태, floating-ui를 쓰는 파일은 첫 줄에 `"use client"`를 둔다.

## 토큰 (`src/util/`)

- `theme.css` — 토큰의 원본. primitive(`--ls-gray-500`, `--ls-blue-500` …) → semantic(`--ls-accent-*`, `--ls-bg-*`, `--ls-border-*`, `--ls-text-*`, `--ls-overlay-*`, `--ls-shadow-*`, `--ls-space-*`, `--ls-font-size-*`, `--ls-radius-*`). 프로젝트별 룩은 semantic 블록만 바꾼다.
- `theme.ts` — semantic 변수의 TS 미러(`Color.ACCENT_500 === "var(--ls-accent-500)"`), `Radius`, `ColorType`, `RadiusType`. 인라인 style에 쓸 때 참조.
- 매직 넘버 금지. CSS와 TS 모두 semantic 변수만 참조한다(primitive `--ls-gray-*` 직접 참조 금지). hex / rgba / 그림자 직접 사용 금지. 새 값은 `theme.css` semantic 블록에 변수 추가 → 필요하면 `theme.ts`에 미러 추가 → 사용.
- `.ls-interactive`: hover/pressed/focus/disabled 공용 상태 클래스.

## 컴포넌트 공통 API

- `size`는 문자열 enum `"1" | "2" | "3" …`(Radix 스타일). `variant`, `color: ColorType`, `radius: RadiusType`.
- `color`는 `RED | BLUE | GRAY | TEAL | ORANGE | GREEN`. 생략하면 테마 기본 accent. `data-color` 속성이 하위의 accent 스케일을 재바인딩한다.
- `onChange`는 항상 새 값을 받는다: 텍스트 입력 `(value, event)`, 체크/스위치 `(checked, event)`, 선택류 `(value)`.
- 내용은 `children`. 아이콘 슬롯(`startIcon`, `endIcon`, `icon`)은 `IconName` 문자열 또는 `ReactNode`.
- 모든 컴포넌트가 `className`, `style`, `...rest`를 루트 요소로 넘기고 `ref`를 전달한다.
- 임의의 wrapper div 대신 `Box`, `Flex`, `Grid`를 쓴다. `LayoutsProps`(`p/px/py/…`, `m/mx/…`, `width`, `height`, `fullWidth`, `bg`, `radius`) 공통. 숫자는 `px`, 문자열은 그대로.

## 스타일링

- CSS Modules(`Foo.module.css`)만 사용한다. Emotion / Tailwind / 인라인 hex 금지.
- 유한한 선택지(`size`, `variant`, `color`)는 `data-*` 속성 + `.foo[data-size="2"]` 선택자. 임의 값(`width`, `height`)은 인라인 `style`. 파생/전파가 필요한 값은 인라인 CSS 변수(`--size`).
- 컴포넌트 CSS의 색은 `var(--ls-accent-*)`와 semantic 변수만 참조한다.

## 아이콘

- `<Icon name="..." />`. `name`은 `src/assets/icons/*.svg` 파일명(확장자 제외).
- `icon/icon-data.ts`는 `generate-icon-types.ts`가 만드는 자동 생성 파일이다. 직접 수정 금지. SVG 추가/삭제 후 `node generate-icon-types.ts`.
- `<path d>`만 추출한다. `<circle>`, `<rect>`, stroke 기반 SVG는 빈 아이콘이 된다.

## Floating UI (`dropdown/`, `tooltip/`, `dialog/`, `bottom-sheet/`, `select/`)

- `@floating-ui/react`의 `useFloating`, `FloatingPortal`, interaction 훅 사용. 직접 position 계산 금지.
- `Dropdown`은 조합형: `Dropdown.Trigger / Content / Item`. `Item`은 클릭 시 자동으로 닫힌다(`closeOnClick={false}`로 유지).
- `Select`도 floating-ui 기반. 키보드 탐색(`useListNavigation`)과 `role="listbox"` 내장.
- `Dialog`는 조합형: `Dialog.Trigger / Content / CloseButton / Title / Description / Body / Footer / Close`.
- `BottomSheet`는 `Dialog`와 같은 조합형(모바일 하단 시트). 응답이 필수인 흐름(약관 동의)은 `dismissible={false}` + `CloseButton` 생략. `Footer` 버튼은 `width="100%"`.

## 화면 조립용 컴포넌트

- 카드/섹션 박스는 `Card`. `Box`에 배경/테두리를 직접 주지 않는다.
- 폼 입력은 `FormField`로 감싼다(`label`, `description`, `error`, `required`). 입력 컴포넌트에 라벨을 따로 붙이지 않는다.
- 로딩은 `Spinner`(동작 중) / `Skeleton`(데이터 자리), 빈 목록은 `EmptyState`. 즉석 `<div>Loading...</div>` 금지.
- 액션 결과 알림은 `Toast`. 앱 루트를 `ToastProvider`로 감싸고 `useToast()`로 호출한다.

## 상태 훅

- `useCheckboxGroup(initial)`: `selected`, `toggle/check/uncheck/checkAll/clear`, `isChecked`, `count`, `isEmpty`
- `useRadioGroup`: 라디오 그룹 상태
- `useMediaQuery(query)`: 반응형 분기. 서버에서는 항상 `false`

## 코드 규칙

- 상태는 불변 객체로 다루고 핵심 함수는 새 객체를 반환한다.
- 주석은 한국어, 2줄 이하, 이모티콘 금지.
- 컴포넌트 디렉토리는 전부 소문자.
