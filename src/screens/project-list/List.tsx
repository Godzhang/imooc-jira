import React from "react";
import { User } from "./SearchPanel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  pin: string;
  created: number;
  key: string;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          key: "name",
          render(value, project) {
            return <Link to={`${project.id}`}>{value}</Link>;
          },
        },
        {
          title: "部门",
          key: "organization",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          key: "personId",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          key: "created",
          render(value, project) {
            return project.created
              ? dayjs(project.created).format("YYYY-MM-DD")
              : "无";
          },
        },
      ]}
      {...props}
    />
  );
};
