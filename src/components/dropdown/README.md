# Dropdown

메뉴 / 더보기 / 커스텀 선택. 위치는 floating-ui가 계산한다(`flip` + `shift` 포함).

폼 입력용 선택은 `Select`를 쓴다. `Dropdown`에는 방향키 탐색이 없다.

## 슬롯

```
Dropdown                     placement / triggerMode / offset / open / onOpenChange
├─ Dropdown.Trigger          자식 하나에 주입
└─ Dropdown.Content          width / height / padding / radius — 전부 string
   └─ Dropdown.Item          onClick / selected / startIcon / endIcon / closeOnClick
```

## 예시

```tsx
import { Dropdown, Button, Icon } from "src/components";

<Dropdown placement="bottom-end">
  <Dropdown.Trigger>
    <Button variant="ghost">더보기</Button>
  </Dropdown.Trigger>
  <Dropdown.Content width="200px">
    <Dropdown.Item startIcon={<Icon name="edit-pen" />} onClick={edit}>
      수정
    </Dropdown.Item>
    <Dropdown.Item selected={sort === "new"} onClick={() => setSort("new")}>
      최신순
    </Dropdown.Item>
    <Dropdown.Item closeOnClick={false} onClick={toggleAll}>
      전체 선택
    </Dropdown.Item>
  </Dropdown.Content>
</Dropdown>;
```

## 함정

- **`Content`의 `width` / `height` / `padding` / `radius`는 `string`만 받는다.** `width={200}`은 타입 에러다. `width="200px"`로 쓴다. (`Box` / `Flex`가 숫자를 px로 바꿔주는 것과 다르다.)
- **`Item`의 `startIcon` / `endIcon`은 `ReactNode`만 받는다.** `Button`과 달리 `IconName` 문자열이 안 된다. `startIcon="edit-pen"`은 "edit-pen"이라는 글자가 그대로 찍힌다. `startIcon={<Icon name="edit-pen" />}`로 넘긴다.
- **`selected`를 주면 체크 아이콘이 오른쪽에 자동으로 붙는다.** `endIcon`을 같이 주면 두 개가 나란히 나온다. 선택 표시에는 `selected`만 쓴다.
- **`Item`은 클릭하면 자동으로 닫힌다.** 메뉴를 열어둔 채 상태만 바꾸려면 `closeOnClick={false}`.
- `Item`의 children은 내부에서 `<Text size="2">`로 감싸진다. `Text`를 또 넣지 않는다.
- `Item`은 `<button>`이다. 링크로 쓰려면 `Item` 대신 `Content` 안에 직접 넣는다.
- `Content`는 닫히면 언마운트된다.
- 기본 `placement`는 `"bottom-start"`, 기본 `offset`은 `4`, `Content` 기본 `padding`은 `"4px"`.
- `triggerMode="hover"`로 호버 메뉴가 된다(`"click"` 기본, `"both"` 가능).
- 부모에 `overflow: hidden`이 있어도 포털로 나가서 잘리지 않는다. 잘린다면 `strategy="fixed"`를 검토한다.
