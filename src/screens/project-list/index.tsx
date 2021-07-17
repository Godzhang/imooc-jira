import { useState } from "react";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import useDebounce from "hooks/useDebounce";
import styled from "@emotion/styled";
import { Typography } from "antd";
import useProject from "./useProject";
import useUsers from "./useUser";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useUrlQueryParam } from "utils/url";

export const ProjectListScreen = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const debounceParam = useDebounce(param, 500);
  const { isLoading, error, data: list } = useProject(debounceParam);
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
