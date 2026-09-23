# FileUploader

파일 첨부. **완전 controlled다** — 내부에 파일 목록 상태가 없다.

`onChange`가 없다. `onSelect(files)` / `onRemove(id)`를 쓴다.

## 동작 흐름

컴포넌트는 고르는 UI만 담당한다. 목록을 들고 있는 건 호출자다.

```
사용자가 고름 → onSelect(File[]) → 호출자가 검증·업로드·id 부여 → files prop 갱신 → 화면에 표시
```

**`files`를 갱신하지 않으면 파일을 골라도 화면에 아무것도 안 나온다.** 가장 흔한 실수다.

## 예시

```tsx
import { FileUploader, FormField, type UploadFile } from "src/components";

const [files, setFiles] = useState<UploadFile[]>([]);

<FormField label="첨부" description="10MB 이하" descriptionPlacement="top">
  <FileUploader
    variant="dropzone"
    multiple
    accept="image/*"
    files={files}
    onSelect={(picked) =>
      setFiles((prev) => [
        ...prev,
        ...picked.map((f) => ({ id: crypto.randomUUID(), name: f.name })),
      ])
    }
    onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
  />
</FormField>;
```

## 두 가지 파일 타입을 헷갈리지 말 것

| | 타입 | 누가 만드나 |
| --- | --- | --- |
| `onSelect(files)` | 브라우저 `File[]` | 브라우저 |
| `files` prop | `UploadFile[]` = `{ id, name, status?, error? }` | **호출자가 변환** |

`id`는 컴포넌트가 만들어 주지 않는다. 호출자가 붙인다.

## variant

| variant | 모양 | 다중 선택 | 파일 목록 |
| --- | --- | --- | --- |
| `button` (기본) | 첨부 버튼만 | O | O |
| `dropzone` | 끌어다 놓는 영역 | O | O |
| `input` | 입력 칸 모양 | **X** | **X** |
| `button-input` | 버튼 + 입력 칸 | **X** | **X** |

- **`input` / `button-input`은 단일 파일 전용이다.** `multiple`을 줘도 무시되고, 파일 목록도 렌더되지 않는다. `files[0]`만 칸에 표시된다.
- **드래그 앤 드롭은 `dropzone`에서만 된다.**

## 함정

- **`status`가 `"uploading"`이나 `"success"`면 삭제 버튼이 사라진다.** 업로드가 끝난 파일도 지우게 하려면 `status`를 `"success"`로 바꾸지 말고 비워 둔다(`undefined` = `"idle"`).
- **`onRemove`를 안 넘기면 삭제 버튼이 아예 안 나온다.**
- **`error` 문구는 `status: "error"`일 때만 보인다.** `error`만 넣고 `status`를 안 바꾸면 아무것도 안 뜬다.
- **크기·확장자 검증은 컴포넌트가 하지 않는다.** `accept`는 파일 선택 창의 필터일 뿐이고 드롭은 막지 못한다. 실제 검증은 `onSelect` 안에서 한다.
- 같은 파일을 연속으로 다시 고를 수 있다(내부에서 input 값을 비운다). 중복 방지는 호출자 몫이다.
- `disabled`와 `readOnly`는 둘 다 상호작용을 막는다.
- `width` 기본값은 `"100%"`라 부모 폭을 꽉 채운다.
- `FormField`와 쓸 때 안내 문구는 `descriptionPlacement="top"`으로 입력 위에 둔다.
