import useAsync from "hooks/useAsync";
import { useHttp } from "hooks/useHttp";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { Project } from "./List";

const useProject = (param?: Partial<Project>) => {
  const request = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(
      request("projects", {
        data: cleanObject(param || {}),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};

export default useProject;
