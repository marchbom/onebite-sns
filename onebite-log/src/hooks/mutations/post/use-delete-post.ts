import { deleteImagesInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMutationCallback } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePost(callbacks: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletePost) => {
      if (callbacks.onSuccess) callbacks.onSuccess();

      // 이미지도 함께 삭제되도록
      if (deletePost.image_url && deletePost.image_url.length > 0) {
        await deleteImagesInPath(`${deletePost.author_id}/${deletePost.id}`);
      }

      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks.onError) callbacks.onError(error);
    },
  });
}
