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

export const useBlogs = () => {
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
};

export const useLikeBlog = () => {
  const queryClient = useQueryClient();
  const likeBlog = (blog) => ({ ...blog, likes: blog.likes + 1 });
  const mutationFn = (blog) => {
    return blogService.update({ id: blog.id, updatedBlog: likeBlog(blog) });
  };
  return useMutation({
    onMutate: async (blog) => {
      await queryClient.cancelQueries({ queryKey: ["blogs"] });
      queryClient.setQueryData(["blogs"], (blogs) =>
        blogs.map((b) => (b.id === blog.id ? likeBlog(blog) : b))
      );
    },
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
};

export const useAddComment = (id) => {
  const queryClient = useQueryClient();
  const mutationFn = (comment) => blogService.addComment({ id, comment });
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs", id] }),
  });
};
