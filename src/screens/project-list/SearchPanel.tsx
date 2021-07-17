import { FC } from "react";
import { Form, Input, Select } from "antd";
import { Project } from "./List";
import { UserSelect } from "components/UserSelect";

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}
interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel: FC<SearchPanelProps> = ({
  users,
  param,
  setParam,
}) => {
  return (
    <Form layout="inline" style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value: number | undefined) =>
            setParam({ ...param, personId: value })
          }
        ></UserSelect>
      </Form.Item>
    </Form>
  );
};
