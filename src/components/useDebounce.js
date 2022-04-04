import { useState, useEffect } from "react";

const useDebounce = (value) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debounceValue;
};

export default useDebounce;
