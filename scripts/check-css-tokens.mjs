// *.module.css에서 hex / rgba / primitive 변수 직접 사용을 잡는다. 토큰 원본 theme.css는 제외.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const RAW = /#[0-9a-fA-F]{3,8}\b|rgba?\(|--ls-(gray|blue|red|teal|orange|green|white|black)\b/;

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith(".module.css") ? [p] : [];
  });

const errors = walk("src").flatMap((file) =>
  readFileSync(file, "utf8")
    .split("\n")
    .flatMap((line, i) =>
      RAW.test(line) ? [`${file}:${i + 1}  ${line.trim()}`] : [],
    ),
);

if (errors.length) {
  console.error("semantic 토큰만 허용됩니다 (src/components/CLAUDE.md):\n" + errors.join("\n"));
  process.exit(1);
}
