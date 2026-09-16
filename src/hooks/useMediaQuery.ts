import { useSyncExternalStore } from "react";

// 서버에서는 항상 false. 클라이언트 첫 렌더링과 일치시켜 hydration 불일치를 막는다
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
