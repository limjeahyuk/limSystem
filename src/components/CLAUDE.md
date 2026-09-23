# limSystem 컴포넌트

이 프로젝트의 UI는 이 폴더(`src/components`)의 컴포넌트로 만든다.
네이티브 HTML 요소 `<div>` / `<button>` / `<p>`와 직접 작성한 CSS 대신 여기 있는 것을 먼저 찾아 쓴다.
여기에 없는 것만 직접 만든다.

**prop는 각 컴포넌트 `.tsx`의 TS 타입이다.** 이 문서에 prop 목록은 없다. 타입에 없는 prop을 지어내지 않고, 확실하지 않으면 해당 파일을 연다.
아래에는 타입만 봐서는 틀리기 쉬운 것(데이터 prop 이름, 조합형 export 형태, 규칙의 예외)만 적는다.

## 처음 한 번 (프로젝트에 붙일 때)

**같이 복사할 파일**

| 경로 | 왜 |
| --- | --- |
| `src/util/` | `theme.css`(토큰) / `theme.ts`(`Color`, `Radius`) / `warn.ts`. 컴포넌트가 직접 import한다 |
| `src/css-reset/reset.css` | 앱 루트에서 import |
| `src/hooks/useMediaQuery.ts` | `Dialog` ↔ `BottomSheet` 분기에 쓴다 |
| `src/assets/icons/` | 아이콘을 **추가**할 때만 필요. 기존 아이콘은 `icon/icon-data.ts`에 들어 있어서 이것 없이도 동작한다 |

**설치**

```
npm i @floating-ui/react react-date-picker @wojtekmaj/react-daterange-picker react-time-picker react-datetime-picker react-calendar
```

`react-calendar`는 `DateTimePicker`가 직접 import한다. 다른 피커의 전이 의존성으로 우연히 잡히는 경우가 있지만 pnpm·Yarn PnP에서는 해결되지 않으니 직접 설치한다.

**tsconfig**

```jsonc
{
  "compilerOptions": {
    // *.module.css 타입. Next는 next-env.d.ts가 대신하므로 불필요
    "types": ["vite/client", "node"],
    "paths": {
      "src/*": ["./src/*"],
      "util/*": ["./src/util/*"],
      "assets/*": ["./src/assets/*"]
    }
  }
}
```

- alias가 싫으면 import를 전부 상대경로로 바꾼다.
- `node` 타입은 `util/warn.ts`의 `process.env.NODE_ENV` 때문에 필요하다. Next는 기본 포함된다.
- 이게 없으면 `*.module.css` import에서 컴포넌트 대부분이 컴파일 에러가 난다.

**앱 루트**

- `reset.css`와 `src/util/theme.css`를 import한다.
- 앱 전체를 `<ToastProvider>`로 감싼다.
- Next.js App Router라면 이 컴포넌트를 쓰는 페이지에 `"use client"`가 필요하다(대부분 상태·floating-ui를 쓴다).

## import

```tsx
import { Button, Flex, Text, Color } from "src/components";
```

- 컴포넌트·타입·상태 훅·`Color`·`Radius`는 전부 barrel(`src/components`)에서 가져온다. 개별 파일 경로 import 금지.
- **예외**: `useMediaQuery`는 barrel에 없다. named export다 — `import { useMediaQuery } from "src/hooks/useMediaQuery"`.

## 무엇을 쓸까

| 만들 것        | 쓸 것                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------- |
| 레이아웃       | `Flex` / `Grid` / `Box`. wrapper `<div>` 금지                                            |
| 카드·섹션 박스 | `Card`. `Box`에 배경·테두리를 직접 주지 않는다                                           |
| 글자           | `Text`(본문) / `Heading`(h1~h6). 날것 `<p>`, `<h2>` 금지                                 |
| 폼 한 칸       | `FormField`(label/description/error/required)로 입력을 감싼다. 라벨을 따로 붙이지 않는다 |
| 텍스트 입력    | `TextInput` / `Textarea`                                                                 |
| 선택 하나      | 2~5개는 `SegmentedControl` 또는 `RadioGroup`, 그보다 많으면 `Select`                     |
| 선택 여러 개   | `CheckboxGroup` + `useCheckboxGroup`. 전체 선택은 `MasterCheckbox`                       |
| on/off         | 즉시 반영되는 설정은 `Switch`, 폼 제출용은 `Checkbox`                                    |
| 날짜·시간      | `DatePicker` / `DateRangePicker` / `TimePicker` / `DateTimePicker`                       |
| 파일 첨부      | `FileUploader`                                                                           |
| 버튼           | `Button`. 아이콘만 있으면 `IconButton`                                                   |
| 메뉴·더보기    | `Dropdown`                                                                               |
| 힌트           | `Tooltip`. 필수 정보를 툴팁에 넣지 않는다                                                |
| 모달           | 데스크톱은 `Dialog`, 모바일은 `BottomSheet`. `useMediaQuery`로 분기                      |
| 액션 결과 알림 | `useToast().toast({ title })`                                                            |
| 안내 박스      | `Callout`                                                                                |
| 상태 표시      | `Badge`                                                                                  |
| 사람           | `Avatar`                                                                                 |
| 로딩           | 동작 중은 `Spinner`, 데이터 자리는 `Skeleton`                                            |
| 빈 목록        | `EmptyState`. 액션 버튼은 children                                                       |
| 표             | `Table`(조합형). 좁으면 자체적으로 가로 스크롤한다                                       |
| 키-값 나열     | `DataList`(조합형)                                                                       |
| 탭             | 화면 안 전환은 `Tab`, 라우트 이동은 `TabNav`                                             |
| 트리           | `TreeView`                                                                               |
| 스크롤 영역    | `ScrollBox`                                                                              |
| 구분선         | `HorizontalDivider` / `VerticalDivider`                                                  |
| 아이콘         | `<Icon name="..." />`. `name`은 `IconName`(= `src/assets/icons/*.svg` 파일명)            |
| 반응형 분기    | `useMediaQuery(query)`. 서버에서는 항상 `false`                                          |

## 목록을 넘기는 컴포넌트 — prop 이름이 셋으로 갈린다

children으로 `<option>`이나 항목을 넣지 않는다. 배열 prop으로 넘긴다.

| prop      | 컴포넌트                                                    | 항목 모양                                                             |
| --------- | ----------------------------------------------------------- | --------------------------------------------------------------------- |
| `options` | `Select`, `RadioGroup`, `CheckboxGroup`, `SegmentedControl` | `{ value, label, disabled? }`                                         |
| `list`    | `Tab`, `TabNav`                                             | `Tab`: `string` 또는 `{ value, label }` / `TabNav`: `{ href, label }` |
| `data`    | `TreeView`                                                  | `TreeNode`                                                            |

```tsx
<Select
  options={[{ value: "a", label: "A" }, { value: "b", label: "B" }]}
  value={value}
  onChange={setValue}          // (value: string) => void
  placeholder="선택"
/>

<Tab list={["전체", "진행중"]} value={tab} onChange={setTab} />
<TabNav list={[{ href: "/users", label: "사용자" }]} currentPath={pathname} />
```

- `Select`는 `options`에 `{ label, options: [...] }`를 넣으면 그룹이 된다.
- `RadioGroup` / `CheckboxGroup` / `Tab`은 `value`, `onChange`가 **필수**(controlled 전용)다.

## 조합형 컴포넌트 — export 형태가 두 종류다

| 형태                    | 컴포넌트                            | 쓰는 법                                 |
| ----------------------- | ----------------------------------- | --------------------------------------- |
| 루트에 슬롯이 붙어 있음 | `Dialog`, `BottomSheet`, `Dropdown` | `<Dialog.Content>`                      |
| 슬롯이 따로 export 됨   | `Table`, `DataList`                 | `<TableHeader>` — `Table.Header`는 없다 |

**아래 컴포넌트는 쓰기 전에 폴더의 `README.md`를 먼저 읽는다.** 타입에 안 드러나는 함정이 거기 있다. 목록에 없는 컴포넌트는 타입만 봐도 된다.

| 컴포넌트 | 읽을 파일 |
| --- | --- |
| `Dialog` | `dialog/README.md` |
| `BottomSheet` | `bottom-sheet/README.md` |
| `Dropdown` | `dropdown/README.md` |
| `Toast` / `useToast` | `toast/README.md` |
| `FormField` | `form-field/README.md` |
| `Select` | `select/README.md` |
| `Table` 계열 | `table/README.md` |
| `TreeView` | `tree-view/README.md` |
| `FileUploader` | `file-uploader/README.md` |
| `CheckboxGroup` / `MasterCheckbox` / `useCheckboxGroup` | `checkbox/README.md` |
| `DatePicker` 계열 | `date-picker/README.md` |

```tsx
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "src/components";

<DataList orientation="horizontal">
  <DataListItem>
    <DataListLabel minWidth="88px">상태</DataListLabel>
    <DataListValue>
      <Badge color="GREEN">활성</Badge>
    </DataListValue>
  </DataListItem>
</DataList>;
```

- `Trigger`와 `Close`는 자식 하나에 props를 주입한다. Fragment나 자식 여럿 금지.
- 열고 닫기는 루트의 `open` / `defaultOpen` / `onOpenChange`. 슬롯 컴포넌트와 `useDialog` / `useBottomSheet`를 루트 바깥에서 쓰면 throw한다.
- 팝오버 위치는 내부에서 계산한다. 직접 `position`을 계산하지 않는다.

## 공통 API

- `size`는 문자열 enum `"1" | "2" | "3" …`. 숫자 `2`가 아니라 문자열 `"2"`.
- `color`는 `RED | BLUE | GRAY | TEAL | ORANGE | GREEN`. 생략하면 테마 accent. 그 외 `variant`, `radius: RadiusType`.
- `onChange`는 항상 새 값을 받는다. `e.target.value`를 꺼내지 않는다.
  - 텍스트 입력 `(value, event)` / 체크·스위치 `(checked, event)` / 선택류·피커 `(value)`
  - **예외**: `FileUploader`에는 `onChange`가 없다. `onSelect(files)` / `onRemove(id)`.
- 내용은 `children`. 아이콘 슬롯(`startIcon`, `endIcon`, `icon`)은 `IconName` 문자열 또는 `ReactNode`.
- 모든 컴포넌트가 `className`, `style`, `...rest`를 루트 요소로 넘기고 `ref`를 전달한다.
- `Box` / `Flex` / `Grid`는 `LayoutsProps`(`p/px/py`, `m/mx`, `width`, `height`, `fullWidth`, `bg`, `radius`) 공통. 숫자는 px, 문자열은 그대로.

## 크기 동작

- 리프 컨트롤(`Button`, `Badge`, `Checkbox`, `Radio`, `Switch`, `Avatar`, `Icon`, `Spinner`, `SegmentedControl`, `Tab`)은 자기 크기를 유지한다. 좁으면 찌그러지지 않고 넘친다.
- 필드(`TextInput`, `Select`, `DatePicker` 계열)는 부모 폭에 맞춰 줄어든다.
- 넘침 처리는 레이아웃 몫이다. `<Flex wrap="wrap">`, `ScrollBox`, 세로 스택으로 푼다.

## 색·간격

- CSS에 쓰는 색·간격·반경은 `theme.css`의 semantic 변수(`--ls-accent-*`, `--ls-bg-*`, `--ls-text-*`, `--ls-border-*`, `--ls-space-*`, `--ls-radius-*` …)만 쓴다. hex, rgba, primitive(`--ls-gray-500`) 직접 참조 금지.
- 인라인 style의 색에는 `Color`, `Radius`를 쓴다. `Color.ACCENT_500 === "var(--ls-accent-500)"`.
- **간격은 예외**: `Flex`/`Box`의 `gap`, `p`, `m`에는 숫자를 넘긴다(`gap={16}`). `var(--ls-space-*)` 문자열을 넣지 않는다.
- 프로젝트 테마를 바꾸려면 `theme.css`의 semantic 블록만 덮어쓴다.
- 직접 쓰는 CSS는 CSS Modules(`Foo.module.css`). Tailwind, Emotion, 인라인 hex 금지.
- hover/pressed/focus/disabled가 필요한 직접 만든 요소에는 공용 클래스 `.ls-interactive`를 붙인다.

## 하지 말 것 → 대신

| 금지                                                | 대신                                      |
| --------------------------------------------------- | ----------------------------------------- |
| `<div style={{ display: "flex" }}>`                 | `<Flex>`                                  |
| `<Box>`에 배경·테두리                               | `<Card>`                                  |
| `<label>` + `<TextInput>`                           | `<FormField label>`                       |
| `<div>Loading...</div>`                             | `Spinner` / `Skeleton`                    |
| `alert()` / `window.confirm()`                      | `useToast()` / `Dialog`                   |
| `<Select><option/></Select>`                        | `<Select options={[...]} />`              |
| `<Table.Header>`                                    | `<TableHeader>`                           |
| `size={2}`                                          | `size="2"`                                |
| `#333`, `rgba(...)`, `--ls-gray-500`                | semantic 토큰                             |
| `import Button from "src/components/button/Button"` | `import { Button } from "src/components"` |
| 직접 position을 계산한 팝오버                       | `Dropdown` / `Tooltip`                    |

## 작성 후 확인

- 날것 `<div>`, `<button>`, `<p>`를 쓰지 않았는가
- 색·간격이 전부 semantic 토큰인가
- 입력이 `FormField` 안에 있는가
- import가 barrel 하나로 모여 있는가
- 목록형 컴포넌트에 children 대신 `options` / `list` / `data`를 넘겼는가
