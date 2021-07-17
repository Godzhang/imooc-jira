import React from "react";
import useUsers from "screens/project-list/useUser";
import { IdSelect } from "./IdSelect";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props}></IdSelect>;
};
