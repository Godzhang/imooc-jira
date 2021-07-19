import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { ButtonNoPadding, Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list/index";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectModel } from "screens/project-list/ProjectModel";
import { useState } from "react";
import { ProjectPopover } from "components/ProjectPopover";

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 */

export const AuthenticatedApp = () => {
  const [modelVisible, setModelVisible] = useState(false);

  const projectButton = (
    <ButtonNoPadding type="link" onClick={() => setModelVisible(true)}>
      创建项目
    </ButtonNoPadding>
  );

  return (
    <div>
      <Container>
        <PageHeader projectButton={projectButton}></PageHeader>
        <Main>
          <Router>
            <Routes>
              <Route
                path="/projects"
                element={<ProjectListScreen projectButton={projectButton} />}
              ></Route>
              <Route
                path="/projects/:projectId/*"
                element={<ProjectScreen />}
              ></Route>
              <Navigate to="/projects" />
            </Routes>
          </Router>
        </Main>
        <ProjectModel
          projectModelOpen={modelVisible}
          onClose={() => setModelVisible(false)}
        ></ProjectModel>
      </Container>
    </div>
  );
};

const PageHeader = (props: { projectButton: JSX.Element }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <SoftwareLogo width="18rem" color="rgb(38,132,255)" />
        </ButtonNoPadding>
        <ProjectPopover projectButton={props.projectButton}>
          <span>项目</span>
        </ProjectPopover>
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { user, logout } = useAuth();

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="logout">
            <Button type="link" onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link">Hi, {user?.name}</Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderItem = styled.h3`
  margin-right: 3rem;
`;
const HeaderRight = styled.div``;

const Main = styled.main``;
