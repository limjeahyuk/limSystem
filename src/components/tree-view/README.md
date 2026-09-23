# TreeView

계층 목록. 항목은 children이 아니라 `data: TreeNode[]`로 넘긴다.

```ts
interface TreeNode {
  id: string;
  label: ReactNode;
  icon?: IconSlot;       // IconName 문자열 OK
  badge?: ReactNode;
  disabled?: boolean;
  children?: TreeNode[];
}
```

## 예시

```tsx
import { TreeView } from "src/components";

<TreeView
  data={[
    {
      id: "docs",
      label: "문서",
      icon: "folder",
      children: [
        { id: "a", label: "기획서", icon: "file-document" },
        { id: "b", label: "회의록", badge: 3 },
      ],
    },
  ]}
  defaultExpanded={["docs"]}
  selected={selected}
  onSelect={setSelected}
/>;
```

## 체크박스로 쓸 때

```tsx
const [checked, setChecked] = useState<string[]>([]);

<TreeView data={data} checkable checked={checked} onCheckedChange={setChecked} />;
```

- **`checked`에는 leaf(자식 없는 노드)의 id만 들어간다.** 부모 id를 넣으면 무시된다. 부모의 체크 상태는 자식으로부터 계산된다(전부 체크 = 체크, 일부 = indeterminate).
- **`checkable`은 controlled 전용이다.** 내부 상태가 없어서 `onCheckedChange`로 받아 `checked`에 돌려주지 않으면 클릭해도 아무 변화가 없다.
- 부모를 토글하면 그 아래 leaf 전체가 한 번에 켜지거나 꺼진다.

## 함정

- **`badge`에 문자열이나 숫자를 주면 빨간 solid `Badge`로 자동 변환된다.** 다른 색이 필요하면 엘리먼트를 직접 넣는다 — `badge={<Badge color="BLUE">2</Badge>}`.
- **`disabled`는 그 노드에만 걸리고 자식으로 내려가지 않는다.** 부모가 `disabled`라도 이미 펼쳐져 있으면 자식은 여전히 클릭된다. 가지 전체를 막으려면 자식에도 각각 `disabled`를 준다.
- **`onSelect`는 선택 해제를 주지 않는다.** 같은 노드를 다시 눌러도 `onSelect(id)`가 그대로 온다. 토글이 필요하면 호출자가 `id === selected ? null : id`로 처리한다.
- `label`은 `<Text truncate>`로 감싸져 **길면 말줄임된다.** 전체를 보여주려면 `Tooltip`을 같이 쓴다.
- `expanded`는 controlled / uncontrolled 둘 다 된다(`defaultExpanded`). 반면 `checked`는 controlled만 된다.
- 방향키 탐색은 없다. 클릭으로만 조작한다.
- `id`는 트리 전체에서 유일해야 한다. 중복되면 체크·선택이 엉킨다.
