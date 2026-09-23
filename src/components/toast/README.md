# Toast

액션 결과 알림. 조합형이 아니라 **Provider + 훅**이다.

## 세팅

앱 루트를 한 번만 감싼다. Next.js App Router면 `"use client"` 컴포넌트에 둔다.

```tsx
<ToastProvider position="bottom-right" duration={4000}>
  <App />
</ToastProvider>
```

`position`과 `duration`은 **Provider에서만** 정한다. `position`은 `"top-right" | "bottom-right" | "bottom-center"`.

## 예시

```tsx
import { useToast } from "src/components";

const { toast, dismiss } = useToast();

toast({ title: "저장했습니다" });
toast({ title: "삭제 실패", description: "권한이 없습니다", color: "RED" });

// 수동으로 닫을 때까지 유지
const id = toast({ title: "업로드 중...", duration: 0, icon: null });
await upload();
dismiss(id);
```

## 함정

- **`duration: 0`이면 자동으로 닫히지 않는다.** `toast()`가 돌려주는 `id`를 들고 있다가 직접 `dismiss(id)`를 불러야 한다. 안 그러면 영원히 남는다.
- **`icon`을 생략하면 `"circle-info"`가 붙는다.** 아이콘을 없애려면 `undefined`가 아니라 **`icon: null`**을 명시해야 한다.
- **개별 토스트는 위치를 못 바꾼다.** `position`은 Provider 단위다.
- `title`은 필수다. 본문만 있는 토스트는 만들 수 없으니 `title`에 넣는다.
- `duration`을 토스트마다 넘기면 Provider 기본값을 덮어쓴다.
- `useToast()`를 `<ToastProvider>` 바깥에서 부르면 throw한다. 화면만 만들고 Provider를 빠뜨리는 실수가 가장 흔하다.
- 확인·취소가 필요한 흐름은 토스트가 아니라 `Dialog`다. 토스트에는 버튼이 없다(닫기 X만 있다).
- `color`는 다른 컴포넌트와 같은 `ColorType`(`RED` 등)이고, `icon`은 `IconSlot`이라 `IconName` 문자열과 `ReactNode` 둘 다 된다.
