import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";

export const useUsersQuery = (select) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: userService.fetch,
    select,
  });
};

export const useUsersBlogCount = () => {
  const selectWithBlogCount = (users) =>
    users.map(({ id, name, blogs }) => ({ id, name, n_blogs: blogs.length }));
  return useUsersQuery(selectWithBlogCount);
};

export const useUserQuery = (select) => {
  const useUserById = (id) =>
    useQuery({
      queryKey: ["users", id],
      queryFn: async () => userService.fetchById(id),
      select,
    });
  return useUserById;
};

export const useUser = (id) => {
  const useUserWithId = useUserQuery((data) => data);
  return useUserWithId(id);
};
