# limSystem

여러 프로젝트에서 공용으로 쓰기 좋은 React 디자인 시스템.
`src/components` + `src/util` 폴더를 다른 프로젝트에 복사해서 쓴다. Vite / Next 어디서든 동작한다.

- Stack: React 19 · TypeScript · CSS Modules · @floating-ui/react · Storybook(Vite)
- 데모/플레이그라운드는 Storybook(`src/stories/`). 앱 페이지는 없다.

## 실행

```bash
npm run storybook        # 아이콘 데이터 생성 후 Storybook (localhost:6006)
npm run build-storybook  # 정적 Storybook 빌드
npm run check            # typecheck + lint + build-storybook
npm run generate:icons   # src/assets/icons/*.svg → src/components/icon/icon-data.ts
```

## 다른 프로젝트에 넣기

1. `src/components`, `src/util`, `src/css-reset/reset.css`, `src/assets/icons`, `generate-icon-types.ts` 복사
2. `tsconfig.json`의 `paths`에 `src/*`, `util/*`, `assets/*` 추가
3. 앱 루트에서 `reset.css`와 `src/util/theme.css`를 한 번 import
4. 루트 CLAUDE.md에 `@src/components/CLAUDE.md` 한 줄 추가

## 공용 토큰 (`src/util/`)

| 파일        | 내용                                                                                                                                                                                                                         |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `theme.css` | 토큰의 원본. primitive(`--ls-gray-500`, `--ls-blue-500` …) → semantic(`--ls-accent-*`, `--ls-bg-*`, `--ls-border-*`, `--ls-text-*`, `--ls-space-*`, `--ls-font-size-*`, `--ls-radius-*`). `.ls-interactive` 공용 상태 클래스 |
| `theme.ts`  | semantic 변수의 TS 미러. `Color.ACCENT_500 === "var(--ls-accent-500)"`, `Radius`, `ColorType`, `RadiusType`. 인라인 style에서 쓸 때 참조                                                                                     |
| `warn.ts`   | `warnDev(condition, message)` — 개발 모드 전용 경고                                                                                                                                                                          |

- 프로젝트별 룩은 `theme.css`의 semantic 블록만 바꾼다. `--ls-accent-*`가 기본 강조색.
- `color` prop을 주면 `[data-color]` 규칙이 그 요소 하위의 accent 스케일을 재바인딩한다. 생략하면 테마 기본 accent.
- 컴포넌트 CSS / TS는 semantic 변수만 참조한다. primitive(`--ls-gray-*`), hex, rgba 직접 사용 금지. 새 값은 `theme.css` semantic 블록에 추가한 뒤 참조한다.

## 공통 규칙

- `size`는 `"1" | "2" | "3" …` 문자열 enum. `variant`, `color: ColorType`, `radius: RadiusType`.
- `onChange`는 항상 새 값을 받는다: 텍스트 입력 `(value, event)`, 체크/스위치 `(checked, event)`, 선택류 `(value)`.
- 내용은 `children`. 아이콘 슬롯(`startIcon`, `endIcon`, `icon`)은 `IconName` 문자열 또는 `ReactNode`.
- 모든 컴포넌트가 `className`, `style`, `...rest`를 루트 요소로 넘기고 `ref`를 전달한다.
- 스타일은 `Foo.module.css` + `data-size` / `data-variant` / `data-color` 선택자. 임의 값(`width`, `height`)은 인라인 style.
- `import { Button, Flex, Color } from "src/components"` 한 곳에서 전부 가져온다.

## 컴포넌트 (`src/components/`)

### 레이아웃

| 컴포넌트                                | 설명                                                                            |
| --------------------------------------- | ------------------------------------------------------------------------------- |
| `Box`                                   | 기본 블록. `p/m/width/height/bg/radius` 등 `LayoutsProps`                       |
| `Flex`                                  | flexbox 컨테이너. `row`, `align`, `justify`, `wrap`, `gap/gapX/gapY`            |
| `Grid`                                  | grid 컨테이너. `columns`, `rows`, `flow`, `align`, `justify`, `gap`             |
| `HorizontalDivider` / `VerticalDivider` | 1px 구분선. `width`/`height`, `color`                                           |
| `ScrollBox`                             | 커스텀 스크롤바 영역. `variant(list/popover/body/grid)`, `height`               |
| `Card`                                  | 콘텐츠 묶음 컨테이너. `variant(surface/outline/ghost)`, `size`, `Box` prop 전부 |

### 타이포그래피

| 컴포넌트  | 설명                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------- |
| `Text`    | 본문. `as(span/div/label/p)`, `size("1"~"9")`, `weight`, `color`, `truncate`, `lineClamp`, `trim` |
| `Heading` | 제목(`h1`~`h6`). `Text`와 동일한 prop                                                             |

### 버튼 / 액션

| 컴포넌트           | 설명                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `Button`           | `children` + `startIcon/endIcon`. `size("1"~"4")`, `variant(solid/outline/surface/ghost)`, `color`, `radius`, `width` |
| `IconButton`       | 아이콘 전용 정사각 버튼. `name`, `Button`과 같은 `size/variant/color/radius`                                          |
| `SegmentedControl` | 단일 선택 세그먼트. `options`, `value`, `onChange`, `size("1"~"3")`, `radius`                                         |

### 표시

| 컴포넌트     | 설명                                                                                                        |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| `Badge`      | `children` 뱃지. `size`, `variant(solid/surface/outline)`, `color`, `startIcon/endIcon`                     |
| `Avatar`     | `src` 이미지, 없으면 `fallback`. `size`, `radius`, `color`(배경)                                            |
| `Callout`    | 안내 박스. `children`, `icon`(기본 `circle-info`, `null`이면 없음), `size`, `variant`, `color`, `fullWidth` |
| `Tooltip`    | hover 툴팁. `content`, `placement`, `delay`, `isArrow`, `offsetValue`                                       |
| `Icon`       | `src/assets/icons` SVG 아이콘. `name: IconName`, `size`, `color`                                            |
| `Spinner`    | 로딩 스피너. `size("1"~"3")`, `color`                                                                       |
| `Skeleton`   | 로딩 자리표시. `width/height/radius`, 또는 `loading` + `children`으로 내용 자리만큼 표시                    |
| `EmptyState` | 빈 상태 안내. `icon`, `title`, `description`, `size`, `children`(액션 버튼)                                 |

### 입력

| 컴포넌트           | 설명                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `TextInput`        | 텍스트 입력. `size("1"~"3")`, `leftIcon/rightIcon`, `fullWidth`, `textAlign`, `onChange(value)`                                      |
| `SearchInput`      | 검색 입력. `onClear` 주면 지우기 버튼 표시                                                                                           |
| `Textarea`         | 여러 줄 입력. `size`, `variant(classic/surface/soft)`, `color`, `radius`, `resize`                                                   |
| `Checkbox`         | `checked`, `indeterminate`, `label`, `size`, `variant(classic/surface)`, `color`, `onChange(checked)`                                |
| `CheckboxGroup`    | `options` 기반 다중 체크. `value: string[]`, `onChange(value[])`                                                                     |
| `MasterCheckbox`   | 전체 선택. 하위 상태에 따라 checked / indeterminate 자동                                                                             |
| `useCheckboxGroup` | 선택 상태 훅. `selected`, `toggle/check/uncheck/checkAll/clear`, `isChecked`, `count`                                                |
| `RadioGroup`       | `options` 라디오. `value`, `onChange(value)`, `direction`, `size`, `color`                                                           |
| `useRadioGroup`    | 라디오 상태 훅                                                                                                                       |
| `Switch`           | 토글. `checked`, `onChange(checked)`, `size("1"~"3")`, `color`                                                                       |
| `FormField`        | `label` / `description` / `error` / `required`를 입력 컴포넌트에 묶는다. 자식에 `id`, `aria-*` 자동 주입                             |
| `Select`           | 드롭다운 셀렉트(floating-ui, 키보드 탐색). `options`(그룹 지원), `value/defaultValue`, `onChange(value)`, `size`, `variant`, `color` |

### 오버레이

| 컴포넌트   | 설명                                                                                                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Dropdown` | 조합형 팝오버. `Dropdown` → `Dropdown.Trigger` / `Content` / `Item`. `placement`, `triggerMode(click/hover/both)`, `open/onOpenChange`. `Item`은 클릭 시 자동 닫힘(`closeOnClick`) |
| `Toast`    | `ToastProvider`로 감싸고 `useToast().toast({ title, description, color, icon, duration })`. `position`, 기본 `duration` 4000ms                                                     |
| `Dialog`   | 조합형 모달. `Dialog` → `Dialog.Trigger` / `Content` / `CloseButton` / `Title` / `Description` / `Body` / `Footer` / `Close`. `open/onOpenChange`, `dimming`                       |

```tsx
<Dialog>
  <Dialog.Trigger>
    <Button>열기</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.CloseButton />
    <Dialog.Title>제목</Dialog.Title>
    <Dialog.Body>내용</Dialog.Body>
    <Dialog.Footer>
      <Dialog.Close>
        <Button variant="ghost" color="GRAY">
          취소
        </Button>
      </Dialog.Close>
      <Button onClick={submit}>확인</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>
```

### 내비게이션 / 데이터

| 컴포넌트   | 설명                                                                                                            |
| ---------- | --------------------------------------------------------------------------------------------------------------- |
| `Tab`      | 상태 기반 탭. `list`, `value`, `onChange(value)`, `size("1"/"2")`, `color`                                      |
| `TabNav`   | 링크 기반 탭. `list({label, href})`, `currentPath`, `linkComponent`(Next `Link` 등 주입)                        |
| `Table`    | `Table / TableHeader / TableBody / TableRow / TableColumnHeaderCell / TableCell`. `size`, `variant`, 셀 `align` |
| `DataList` | 라벨-값 목록. `DataList / DataListItem / DataListLabel / DataListValue`. `orientation`, `size`                  |

## 훅 (`src/hooks/`)

| 훅                     | 설명                                          |
| ---------------------- | --------------------------------------------- |
| `useMediaQuery(query)` | 미디어쿼리 매칭 여부. 서버에서는 항상 `false` |

## 아이콘 추가

1. `src/assets/icons/이름.svg` 추가 (`<path d="">`만 추출되므로 path 기반 SVG 사용)
2. `npm run generate:icons`
3. `<Icon name="이름" />`
