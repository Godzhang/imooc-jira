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
import { useProjectSearchParams } from "./util";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectSearchParams();
  const { isLoading, error, data: list } = useProject(useDebounce(param, 300));
  const { data: users } = useUsers();

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
