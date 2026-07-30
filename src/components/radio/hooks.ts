import { useState } from "react";

const useRadioGroup = <T extends string>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = (nextValue: T) => {
    setValue(nextValue);
  };

  return {
    value,
    setValue,
    onChange,
  };
};

export { useRadioGroup };
