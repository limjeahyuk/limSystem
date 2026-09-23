# Checkbox / CheckboxGroup / MasterCheckbox / useCheckboxGroup

여러 개 선택. 네 조각이 한 세트로 움직인다.

| | 역할 |
| --- | --- |
| `Checkbox` | 낱개 하나 |
| `CheckboxGroup` | `options` 배열을 받아 여러 개를 그린다 |
| `MasterCheckbox` | 전체 선택 / 해제 |
| `useCheckboxGroup` | 위 둘에 물릴 상태를 만들어 주는 훅 |

## 예시

```tsx
import {
  CheckboxGroup,
  MasterCheckbox,
  useCheckboxGroup,
  Flex,
} from "src/components";

const options = [
  { value: "a", label: "약관 동의" },
  { value: "b", label: "마케팅 수신" },
  { value: "c", label: "탈퇴 회원", disabled: true },
];

const { selected, setSelected, count, isEmpty } = useCheckboxGroup();

<Flex direction="column" gap={8}>
  <MasterCheckbox options={options} value={selected} onChange={setSelected} />
  <CheckboxGroup options={options} value={selected} onChange={setSelected} />
</Flex>;
```

## 함정

- **`CheckboxGroup`은 Fragment를 렌더한다. 감싸는 요소가 없다.** 그냥 두면 항목들이 부모 레이아웃에 그대로 쏟아진다. 세로로 쌓으려면 반드시 `<Flex direction="column">`으로 감싼다.
- **`CheckboxGroup`은 controlled 전용이다.** `value`, `onChange`가 필수라 둘을 안 주면 타입 에러다.
- **`useCheckboxGroup`의 `checkAll(values)`는 인자를 받는다.** 이름과 달리 "전부 체크"가 아니라 `setSelected(values)`다. 전체 선택은 `checkAll(options.map(o => o.value))`처럼 목록을 직접 넘기거나, 그냥 `MasterCheckbox`를 쓴다.
- **`MasterCheckbox`는 `disabled` 옵션을 건드리지 않는다.** 전체 선택해도 `disabled` 항목은 빠지고, 전체 해제해도 `options`에 없는 값은 `value`에 그대로 남는다.
- `MasterCheckbox`와 `CheckboxGroup`에는 **같은 `options`와 같은 `value`를 넘겨야** 전체 선택 상태가 맞는다.
- `useCheckboxGroup`이 주는 것: `selected`, `setSelected`, `isChecked(v)`, `toggle(v)`, `check(v)`, `uncheck(v)`, `checkAll(values)`, `clear()`, `count`, `isEmpty`.
- `MasterCheckbox`의 기본 라벨은 `"전체 선택"`이다.
- `onChange`는 `(value: string[])`를 받는다. 이벤트가 아니다. 낱개 `Checkbox`만 `(checked, event)`다.
- 폼 제출용 on/off는 `Checkbox`, 즉시 반영되는 설정은 `Switch`.
