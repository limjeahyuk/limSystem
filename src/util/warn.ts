// 개발 모드에서만 잘못된 사용을 알린다. 번들러가 process.env.NODE_ENV를 치환한다.
export const warnDev = (condition: boolean, message: string) => {
  if (process.env.NODE_ENV !== "production" && condition)
    console.warn(`[limsystem] ${message}`);
};
