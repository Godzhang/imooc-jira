import { useState } from "react";

const useArray = <T = unknown>(val: T[]) => {
  const [arr, setArr] = useState(val);

  const clear = () => setArr([]);

  const removeIndex = (index: number) =>
    setArr(arr.filter((item, i) => i !== index));

  const add = (newVal: T) => setArr([...arr, newVal]);

  return { arr, clear, removeIndex, add };
};

export default useArray;
