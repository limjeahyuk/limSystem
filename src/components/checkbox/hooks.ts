import { useCallback, useMemo, useState } from "react";

export const useCheckboxGroup = (initialValue: string[] = []) => {
  const [selected, setSelected] = useState(initialValue);

  const isChecked = useCallback(
    (value: string) => selected.includes(value),
    [selected],
  );

  const toggle = useCallback((value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }, []);

  const check = useCallback((value: string) => {
    setSelected((prev) => (prev.includes(value) ? prev : [...prev, value]));
  }, []);

  const uncheck = useCallback((value: string) => {
    setSelected((prev) => prev.filter((v) => v !== value));
  }, []);

  const checkAll = useCallback((values: string[]) => {
    setSelected(values);
  }, []);

  const clear = useCallback(() => {
    setSelected([]);
  }, []);

  const helpers = useMemo(() => {
    return {
      count: selected.length,
      isEmpty: selected.length === 0,
    };
  }, [selected]);

  return {
    selected,
    setSelected,

    isChecked,
    toggle,
    check,
    uncheck,

    checkAll,
    clear,

    ...helpers,
  };
};
