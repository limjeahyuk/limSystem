# DatePicker / DateRangePicker / TimePicker / DateTimePicker

네 개가 각각 다른 외부 라이브러리를 감싼 것이라 **`value` 타입이 서로 다르다.**

## value 타입 — 가장 많이 틀리는 곳

| 컴포넌트 | `value` | `onChange` |
| --- | --- | --- |
| `DatePicker` | `Date \| null` | `(value: Date \| null)` |
| `DateRangePicker` | `DateRange \| null` = `[Date \| null, Date \| null]` | `(value: DateRange \| null)` |
| `TimePicker` | **`string \| null`** (`"14:30"`) | `(value: string \| null)` |
| `DateTimePicker` | `Date \| null` | `(value: Date \| null)` |

**`TimePicker`만 `Date`가 아니라 문자열이다.** `new Date()`를 넣으면 안 된다.

## 예시

```tsx
import { DatePicker, DateRangePicker, TimePicker, type DateRange } from "src/components";

const [date, setDate] = useState<Date | null>(null);
const [range, setRange] = useState<DateRange | null>(null);
const [time, setTime] = useState<string | null>(null);

<DatePicker value={date} onChange={setDate} />
<DateRangePicker value={range} onChange={setRange} showDoubleView />
<TimePicker value={time} onChange={setTime} minuteStep={30} />
```

## 공통 prop (`PickerBaseProps`)

`size` / `variant`(`"outline" | "underline" | "bubble"`) / `format` / `locale` / `minDate` / `maxDate` / `error` / `readOnly` / `disabled` / `fullWidth`

- `format`은 Unicode TR35다. `y`, `MM`, `dd`, `HH`, `mm`. 기본값은 `DatePicker`·`DateRangePicker`가 `"y-MM-dd"`, `DateTimePicker`가 `"y-MM-dd HH:mm"`.
- **`locale` 기본값이 `"en-US"`다.** 한국어 달력을 원하면 `locale="ko-KR"`을 명시한다. 기본값에 기대지 않는다.
- `TimePicker`에는 `minDate` / `maxDate`가 없다(타입에서 제외돼 있다).

## 함정

- **`onChange`는 값만 받는다.** 이벤트가 아니다. `setDate`를 그대로 넘기면 된다.
- **사용자가 입력을 지우면 `null`이 온다.** 상태 타입을 `Date`가 아니라 `Date | null`로 잡는다. `DateRangePicker`는 한쪽만 고른 중간 상태에서 `[Date, null]`도 올 수 있다.
- **`DateRangePicker`의 종료일은 그 날의 끝으로 맞춰진다.** 자정으로 두면 마지막 날이 기간에 반쯤 걸친 것처럼 그려지기 때문이다. 서버로 보낼 때 이 시각을 그대로 쓸지 확인한다.
- **라이브러리 고유 옵션은 `pickerProps`로 넘긴다.** 루트에 없는 prop을 지어내지 말고 여기에 넣는다. 단 `value` / `onChange` / `disabled`는 제외돼 있다(컴포넌트가 관리한다).
- 필드형이라 부모 폭에 맞춰 줄어든다. 꽉 채우려면 `fullWidth`.
- 라벨과 에러 문구는 `FormField`가 붙인다. `error`는 여기선 빨간 테두리만 그리는 boolean이다.
- 이 네 개는 외부 패키지가 필요하다 — `react-date-picker`, `@wojtekmaj/react-daterange-picker`, `react-time-picker`, `react-datetime-picker`.
