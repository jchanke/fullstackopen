import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import blogService from "../services/blogs";

// Queries

export const useBlogsQuery = (select) => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    select,
  });
};

export const useBlogsSorted = () => {
  return useBlogsQuery((blogs) => blogs.sort((a, b) => b.likes - a.likes));
};

export const useBlogIds = () => {
  return useBlogsQuery((blogs) =>
    blogs.sort((a, b) => b.likes - a.likes).map((blog) => blog.id)
  );
};

export const useBlog = (id) => {
  return useQuery({
    queryKey: ["blogs", id],
    queryFn: () => blogService.getById(id),
  });
};

// Mutations

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogService.update,
    onSuccess: ({ id }) =>
      queryClient.invalidateQueries({ queryKey: ["blogs", id] }),
  });
};
