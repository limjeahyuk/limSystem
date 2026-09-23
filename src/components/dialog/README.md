# Dialog

데스크톱 모달. 모바일은 `BottomSheet`(슬롯 이름이 거의 같다).

## 슬롯

```
Dialog                       open / defaultOpen / onOpenChange / dimming
├─ Dialog.Trigger            자식 하나에 클릭 핸들러 주입
└─ Dialog.Content            열렸을 때만 렌더. 포털 + 포커스 트랩
   ├─ Dialog.CloseButton     우상단 X. 자체적으로 닫는다
   ├─ Dialog.Title
   ├─ Dialog.Description
   ├─ Dialog.Body            height 기본 "200px"
   └─ Dialog.Footer
      └─ Dialog.Close        자식 하나를 닫기 버튼으로 만든다
```

`Trigger` 없이 `open`만으로도 열 수 있다.

## 예시

```tsx
import { Dialog, Button, Text } from "src/components";

<Dialog>
  <Dialog.Trigger>
    <Button color="RED">삭제</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.CloseButton />
    <Dialog.Title>정말 삭제할까요?</Dialog.Title>
    <Dialog.Description>되돌릴 수 없습니다.</Dialog.Description>
    <Dialog.Body height="auto">
      <Text>선택한 항목 3개가 영구 삭제됩니다.</Text>
    </Dialog.Body>
    <Dialog.Footer>
      <Dialog.Close>
        <Button variant="ghost" color="GRAY">취소</Button>
      </Dialog.Close>
      <Button color="RED" onClick={remove}>삭제</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>;
```

## 함정

- **`Body`의 `height` 기본값이 `"200px"`다.** 내용이 두 줄이어도 200px를 차지한다. 짧은 내용이면 `height="auto"`를 넘긴다.
- **`Title` / `Description` / `Footer`는 `children`만 받는다.** `className`, `style`, `...rest`가 없다(다른 컴포넌트의 전역 규칙에 대한 예외). 여백을 바꾸려면 안에 `Box`를 넣는다.
- **닫히면 `Content`가 언마운트된다.** 내부 입력값은 닫을 때 사라진다. 값을 유지하려면 상태를 `Dialog` 바깥에 둔다.
- **`Close`는 즉시 닫는다.** `await` 후에 닫아야 하면 `Close` 대신 제어형으로 쓴다.
  ```tsx
  <Dialog open={open} onOpenChange={setOpen}>
    ...
    <Button onClick={async () => { await save(); setOpen(false); }}>저장</Button>
  ```
- `Trigger` / `Close`는 `cloneElement`로 자식 하나에 props를 주입한다. Fragment, 자식 여럿, 문자열 모두 금지.
- `Close`는 자식의 `onClick`을 **먼저 부르고** 닫는다. 둘 다 동작한다.
- `dimming={false}`면 배경을 어둡게 하지 않는다(오버레이 자체는 남아서 바깥 클릭은 여전히 닫는다).
- `useDialog()`를 `<Dialog>` 바깥에서 부르면 throw한다.

## BottomSheet와 다른 점

| | Dialog | BottomSheet |
| --- | --- | --- |
| `Description` 슬롯 | 있음 | **없음** |
| 루트 prop | `dimming` | `dismissible` |
| `Content` prop | 없음 | `snapPoints`, `defaultSnap`, `width` |
| `Body` 높이 | `height` 기본 `"200px"` | 내용에 맞춤 |
