# Table

조합형이지만 **슬롯이 루트에 붙어 있지 않다.** 전부 barrel에서 따로 import한다.

`Table.Header`는 없다. `TableHeader`다.

## 슬롯

```
Table                      size / variant. <table>을 스크롤 wrapper로 감싼다
├─ TableHeader             <thead>
│  └─ TableRow             <tr>
│     └─ TableColumnHeaderCell   <th scope="col">. align
└─ TableBody               <tbody>
   └─ TableRow
      └─ TableCell         <td>. align
```

## 예시

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableColumnHeaderCell,
  TableCell,
} from "src/components";

<Table size="2">
  <TableHeader>
    <TableRow>
      <TableColumnHeaderCell>이름</TableColumnHeaderCell>
      <TableColumnHeaderCell align="right">금액</TableColumnHeaderCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map((r) => (
      <TableRow key={r.id}>
        <TableCell>{r.name}</TableCell>
        <TableCell align="right">{r.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>;
```

## 함정

- **`Table`의 `className` / `style` / `...rest`는 `<table>`에 붙는다.** 바깥의 스크롤 wrapper `<div>`에는 닿지 않는다. 표 전체의 높이나 최대 너비를 제한하려면 `Table`을 `Box` / `Flex`로 한 번 더 감싼다.
- **이 폴더의 컴포넌트들은 `ref`를 전달하지 않는다.** 일반 함수 컴포넌트라 `forwardRef`가 없다(다른 컴포넌트의 전역 규칙에 대한 예외). 특정 행으로 스크롤해야 하면 `TableRow` 안에 `ref`를 가진 요소를 넣는다.
- **행 머리글 셀(`TableRowHeaderCell`)은 없다.** 첫 칸을 머리글로 쓰고 싶어도 `TableCell`을 쓴다.
- **좁아지면 표가 줄지 않고 가로 스크롤된다.** `wrapper`에 `overflow-x: auto`가 걸려 있다. 모바일에서 칸이 많으면 스크롤이 생기는 게 정상이고, 그게 싫으면 칸을 줄이거나 카드 목록으로 바꾼다.
- `align`은 `TableColumnHeaderCell`과 `TableCell`에만 있다. 헤더와 본문의 정렬을 맞추려면 **양쪽 모두에** 같은 `align`을 준다. 숫자 열에서 흔히 빠뜨린다.
- `size`와 `variant`는 `Table`에만 준다. 셀에 주는 게 아니다.
