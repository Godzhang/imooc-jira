import { useAuth } from "context/auth-context";
import { useCallback } from "react";
import { http } from "utils/http";

export const useHttp = () => {
  const { user } = useAuth();
  return useCallback(
    (...[endPoint, config]: Parameters<typeof http>) =>
      http(endPoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
