import React, { useEffect, useState } from "react";
import qs from "qs";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import { cleanObject } from "utils";
import useMount from "hooks/useMount";
import useDebounce from "hooks/useDebounce";
import { useHttp } from "hooks/useHttp";

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({ name: "", personId: "" });
  const debounceParam = useDebounce(param, 500);
  const [list, setList] = useState([]);
  const request = useHttp();

  useMount(() => {
    request("/users").then(setUsers);
  });

  useEffect(() => {
    request("/project", {
      data: cleanObject(debounceParam),
    }).then(setList);
  }, [debounceParam]);

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
