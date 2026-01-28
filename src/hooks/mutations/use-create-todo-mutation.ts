import { createTodo } from "@/api/create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: (newTodo) => {
      // // 새로운 데이터가 추가되면 todos 무효화하여 새로 fetch를 진행하도록 함
      // queryClient.invalidateQueries({
      //   queryKey: QUERY_KEYS.todo.list,
      // });

      // 모든 데이터를 전부 불러올 필요가 없기 때문에
      // 기존의 todo 뒤에 newTodo를 추가하는 방식으로 수정
      // queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
      //   if (!prevTodos) return [newTodo];
      //   return [...prevTodos, newTodo];
      // });

      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(newTodo.id),
        newTodo,
      );
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          if (!prevTodoIds) return [newTodo.id];
          return [...prevTodoIds, newTodo.id];
        },
      );
    },
    onError: () => {},
  });
}
