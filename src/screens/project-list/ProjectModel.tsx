import { Button, Drawer } from "antd";
import { FC } from "react";

interface IProjectModelProps {
  projectModelOpen: boolean;
  onClose: () => void;
}

export const ProjectModel: FC<IProjectModelProps> = (props) => {
  const { projectModelOpen, onClose } = props;
  return (
    <Drawer onClose={onClose} visible={projectModelOpen} width="100%">
      <h1>project model</h1>
    </Drawer>
  );
};
