import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import useDebounce from "hooks/useDebounce";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "./useProject";
import useUsers from "./useUser";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useProjectSearchParams } from "./util";
import { Row } from "components/lib";
import { FC } from "react";

interface IProjectListScreenProps {
  projectButton: JSX.Element;
}

export const ProjectListScreen: FC<IProjectListScreenProps> = (props) => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProject(useDebounce(param, 300));
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>

      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
        projectButton={props.projectButton}
      />
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
