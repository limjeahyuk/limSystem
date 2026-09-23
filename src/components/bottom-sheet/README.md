# BottomSheet

모바일 하단 시트. 데스크톱은 `Dialog`. `useMediaQuery`로 분기한다.

## 슬롯

```
BottomSheet                  open / defaultOpen / onOpenChange / dismissible
├─ BottomSheet.Trigger
└─ BottomSheet.Content       snapPoints / defaultSnap / width. 핸들 자동 포함
   ├─ BottomSheet.CloseButton
   ├─ BottomSheet.Title
   ├─ BottomSheet.Body
   └─ BottomSheet.Footer
      └─ BottomSheet.Close
```

**`Description` 슬롯은 없다.** `Dialog`에만 있다. 설명이 필요하면 `Body` 안에 `Text`를 넣는다.

## 예시

```tsx
import { BottomSheet, Button, Text } from "src/components";
import { useMediaQuery } from "src/hooks/useMediaQuery";

const isMobile = useMediaQuery("(max-width: 768px)");

<BottomSheet>
  <BottomSheet.Trigger>
    <Button>약관 보기</Button>
  </BottomSheet.Trigger>
  <BottomSheet.Content snapPoints={["40%", "90vh"]}>
    <BottomSheet.CloseButton />
    <BottomSheet.Title>이용약관</BottomSheet.Title>
    <BottomSheet.Body>
      <Text>전문...</Text>
    </BottomSheet.Body>
    <BottomSheet.Footer>
      <BottomSheet.Close>
        <Button width="100%">동의</Button>
      </BottomSheet.Close>
    </BottomSheet.Footer>
  </BottomSheet.Content>
</BottomSheet>;
```

## 함정

- **`snapPoints`를 생략하면 높이가 내용에 맞춰진다.** 단계를 두려면 배열로 넘긴다. `"40%"` / `"90vh"`는 `window.innerHeight` 기준으로 px 환산되고, 숫자는 px다.
- **`defaultSnap`은 높이가 아니라 `snapPoints`의 인덱스다.** `defaultSnap={1}` = 두 번째 값으로 시작.
- **핸들을 시트 높이의 1/4 이상 아래로 끌면 닫힌다.** 이게 기본 동작이다. 응답이 필수인 흐름(약관 동의 등)은 `dismissible={false}`로 막고 `CloseButton`도 생략한다. `dismissible={false}`는 바깥 클릭·ESC·드래그 닫기를 한 번에 끈다.
- **`Footer` 버튼에는 `width="100%"`를 준다.** 리프 컨트롤이라 기본값으로는 내용 폭만 차지해서 하단에 작게 뜬다.
- **`Content`의 `width` 기본값은 `"100%"`다.** 태블릿에서 좁히려면 `width="480px"`.
- 닫기 애니메이션(250ms) 동안 마운트를 유지한다. 닫자마자 부모를 언마운트하면 애니메이션이 잘린다.
- `Trigger` / `Close`는 `cloneElement`로 자식 하나에 주입한다. Fragment, 자식 여럿 금지.
- `dimming` prop은 없다(`Dialog` 전용).
- `useBottomSheet()`를 `<BottomSheet>` 바깥에서 부르면 throw한다.
