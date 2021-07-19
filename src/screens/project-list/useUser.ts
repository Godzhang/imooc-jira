import useAsync from "hooks/useAsync";
import { useHttp } from "hooks/useHttp";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { User } from "./SearchPanel";

const useUsers = (param?: Partial<User>) => {
  const request = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(
      request("users", {
        data: cleanObject(param || {}),
      })
    );
  }, [param, request, run]);

  return result;
};

export default useUsers;
