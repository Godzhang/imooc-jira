import styled from "@emotion/styled";
import { Popover, Typography, List, Divider } from "antd";
import { FC } from "react";
import { useProject } from "screens/project-list/useProject";
import { ButtonNoPadding } from "./lib";

interface IProjectPopover {
  projectButton: JSX.Element;
}

export const ProjectPopover: FC<IProjectPopover> = (props) => {
  const { data: projects, isLoading } = useProject();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((item) => (
          <List.Item key={item.id}>
            <List.Item.Meta title={item.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <Divider></Divider>
      {props.projectButton}
      {/* <ButtonNoPadding type="link">创建项目</ButtonNoPadding> */}
    </ContentContainer>
  );

  return (
    <Popover placement="bottom" content={content}>
      项目
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
