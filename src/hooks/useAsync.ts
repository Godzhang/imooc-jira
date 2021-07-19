import { useCallback, useReducer, useState } from "react";
import useMountRef from "./useMountedRef";

interface State<T> {
  error: Error | null;
  data: T | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountRef();

  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, dispatch] = useReducer(
    (state: State<T>, action: Partial<State<T>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  const safeDispatch = useSafeDispatch(dispatch);
  const config = { ...defaultConfig, ...initialConfig };
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: T) => {
      safeDispatch({
        data,
        stat: "success",
        error: null,
      });
    },
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: "error",
        data: null,
      }),
    [safeDispatch]
  );

  // run 用来触发异步请求
  const run = useCallback(
    (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig.retry(), runConfig);
        }
      });
      safeDispatch({ stat: "loading" });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, safeDispatch, setData, setError]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    retry,
    setData,
    setError,
    ...state,
  };
};

export default useAsync;
