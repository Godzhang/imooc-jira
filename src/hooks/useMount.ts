import { EffectCallback, useEffect } from "react";

const useMount = (callback: EffectCallback) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMount;
