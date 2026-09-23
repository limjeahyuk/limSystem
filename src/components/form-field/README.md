# FormField

라벨 / 설명 / 에러를 입력 하나에 묶고, `id`와 `aria-*`를 자식에 자동 주입한다.

폼의 모든 입력은 이걸로 감싼다. `<label>`을 직접 쓰지 않는다.

## 예시

```tsx
import { FormField, TextInput, FileUploader } from "src/components";

<FormField label="이메일" required error={errors.email}>
  <TextInput value={email} onChange={setEmail} />
</FormField>

<FormField label="첨부" description="10MB 이하" descriptionPlacement="top">
  <FileUploader onSelect={add} onRemove={remove} />
</FormField>
```

## 자동으로 하는 것

자식에 다음을 `cloneElement`로 주입한다. 직접 쓰지 않는다.

| 주입 | 조건 |
| --- | --- |
| `id` | 자식에 `id`가 없으면 `useId()`로 생성. 있으면 그대로 둔다 |
| `aria-describedby` | `description` 또는 `error`가 있을 때 |
| `aria-invalid` | `error`가 있을 때 |
| `aria-required` | `required`일 때 |

`label`은 이 `id`로 `htmlFor`가 연결된다. `required`면 라벨 뒤에 빨간 `*`가 붙는다.

## 함정

- **`error`가 있으면 `description`이 사라진다.** 둘은 같은 자리를 쓰고 `error`가 이긴다. 에러 중에도 안내를 남기려면 그 문구를 `error`에 합쳐 쓰거나 `FormField` 바깥에 둔다.
- **자식은 요소 하나여야 한다.** `cloneElement`를 쓰므로 Fragment, 자식 여럿, 문자열은 모두 깨진다. 입력 두 개를 한 라벨로 묶으려면 `Flex`로 감싸고, `id` 연결은 포기하거나 직접 준다.
- **`error`가 있으면 래퍼에 `data-color="RED"`가 붙어 자식의 accent 색이 빨강으로 바뀐다.** 자식에 `color`를 따로 주면 그게 이긴다.
- `description`은 기본적으로 입력 **아래**에 나온다. 입력 전에 읽어야 하는 안내(파일 크기 제한 등)는 `descriptionPlacement="top"`.
- `error`에 `false`나 `""`를 넘기면 에러 없음으로 친다. `errors.email` 같은 값을 그대로 넘겨도 된다.
- 라벨이 필요 없으면 `label`을 생략한다. 그래도 `aria` 주입과 에러 표시는 동작한다.
