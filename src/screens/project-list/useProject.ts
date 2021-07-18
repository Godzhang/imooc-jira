import useAsync from "hooks/useAsync";
import { useHttp } from "hooks/useHttp";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { Project } from "./List";

export const useProject = (param?: Partial<Project>) => {
  const request = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  const fetchProjects = () =>
    request("projects", {
      data: cleanObject(param || {}),
    });

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return { mutate, ...asyncResult };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return { mutate, ...asyncResult };
};
