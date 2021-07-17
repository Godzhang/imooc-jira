import { useMemo } from "react";
import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
import { cleanObject } from "utils";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev: { [key in K]: string }, key: K) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams]
    ),
    // setSearchParams,
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      console.log(o);
      return setSearchParams(o);
    },
  ] as const;
};
