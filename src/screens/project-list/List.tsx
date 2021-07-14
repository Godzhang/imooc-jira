import React from "react";
import { User } from "./SearchPanel";
import { Table } from "antd";
import dayjs from "dayjs";

interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  pin: string;
  created: number;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ users, list }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          key: "name",
        },
        {
          title: "部门",
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
          dataIndex: "created",
          render(value, project) {
            return project.created ? dayjs(value).format("YYYY-MM-DD") : "无";
          },
        },
      ]}
      dataSource={list}
    />
  );
};
