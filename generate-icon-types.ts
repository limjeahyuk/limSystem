import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, "src/assets/icons");
const OUTPUT_DIR = path.join(__dirname, "src/components/Icon");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "icon-data.ts"); // 파일명 변경

try {
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs
    .readdirSync(ICONS_DIR)
    .filter((file) => file.endsWith(".svg"));

  const iconData: Record<string, { viewBox: string; paths: string[] }> = {};

  files.forEach((file) => {
    const name = file.replace(".svg", "");
    const svgContent = fs.readFileSync(path.join(ICONS_DIR, file), "utf-8");

    // viewBox 추출
    const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";

    // 모든 <path> 태그의 d 속성 추출
    const pathMatches = [...svgContent.matchAll(/d="([^"]+)"/g)];
    const paths = pathMatches.map((match) => match[1]);

    // 아이콘 데이터 객체에 저장
    iconData[name] = {
      viewBox,
      paths,
    };
  });

  // TS 코드 생성
  const fileContent = `// 이 파일은 스크립트에 의해 자동 생성됩니다. 직접 수정하지 마세요!

export const ICON_DATA = ${JSON.stringify(iconData, null, 2)} as const;

export type IconName = keyof typeof ICON_DATA;
`;

  fs.writeFileSync(OUTPUT_FILE, fileContent);

  console.log(
    `성공: ${Object.keys(iconData).length}개의 아이콘 데이터와 타입이 생성되었습니다!`,
  );
} catch (error) {
  console.error("에러 발생:", error);
}
