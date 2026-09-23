# Select

옵션이 많을 때(6개 이상) 쓰는 선택 컨트롤. 2~5개면 `SegmentedControl` / `RadioGroup`.

네이티브 `<select>`가 아니라 floating-ui로 만든 커스텀 리스트박스다.

## 예시

```tsx
import { Select } from "src/components";

// 평평한 목록
<Select
  options={[
    { value: "seoul", label: "서울" },
    { value: "busan", label: "부산", disabled: true },
  ]}
  value={city}
  onChange={setCity}        // (value: string) => void
  placeholder="도시 선택"
/>

// 그룹
<Select
  options={[
    { label: "수도권", options: [{ value: "seoul", label: "서울" }] },
    { label: "영남", options: [{ value: "busan", label: "부산" }] },
  ]}
  value={city}
  onChange={setCity}
/>
```

## 함정

- **네이티브 `<select>`가 아니라서 `name`으로 폼 전송이 안 된다.** `<form>` 제출에 값을 실으려면 상태를 직접 읽어 보내거나 `<input type="hidden">`을 같이 둔다.
- **그룹의 `label`은 `string`이어야 한다.** 옵션의 `label`은 `ReactNode`지만 그룹 라벨은 아니다.
- **그룹 판정은 객체에 `options` 키가 있는지로 한다.** 일반 옵션에 `options`라는 이름의 필드를 넣으면 그룹으로 오인된다.
- **`value`가 `options`에 없으면 개발 모드에서 경고가 뜨고 placeholder가 보인다.** 비동기로 옵션을 늦게 받아오는 화면에서 자주 겪는다. 옵션이 빈 동안은 `value`를 `""`로 둔다.
- `RadioGroup` / `CheckboxGroup`과 달리 **controlled·uncontrolled 둘 다 된다.** `value` 없이 `defaultValue`만 줘도 동작한다.
- `onChange`는 값만 받는다. `e.target.value`가 아니다.
- 메뉴 최소 너비는 트리거 너비에 맞춰지고 최대 높이는 280px다. 그보다 길면 메뉴 안에서 스크롤된다.
- 기본 `placeholder`는 `"선택하세요"`, `size`는 `"2"`, `variant`는 `"surface"`, `radius`는 `"medium"`.
- 방향키·Enter·Space로 탐색된다(`Dropdown`에는 없는 기능이다).
- `className` / `style` / `...rest`는 트리거가 아니라 **바깥 wrapper**에 붙는다. 폭을 주려면 wrapper에 준다.
