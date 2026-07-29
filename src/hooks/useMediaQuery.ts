import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  // 🚀 핵심: 초기값을 무조건 false로 고정합니다. (서버와 클라이언트의 첫 렌더링 일치)
  // window 객체를 여기서 검사해서 초기값을 넣으면 Hydration 에러가 발생할 확률이 높습니다.
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // useEffect 내부는 무조건 클라이언트(브라우저)에서만 실행되므로 안전합니다.
    const mediaQueryList = window.matchMedia(query);

    // 컴포넌트가 화면에 마운트되는 순간, 실제 브라우저의 크기를 계산해서 업데이트합니다.
    setMatches(mediaQueryList.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", listener);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}
