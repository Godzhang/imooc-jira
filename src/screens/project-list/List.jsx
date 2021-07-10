import React from "react";

export const List = ({ users, list }) => {
  const getUserName = (id) => {
    return users.find((user) => user.id === id)?.name || "未知";
  };

  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{getUserName(project.id)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
