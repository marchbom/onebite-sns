import { Button } from "../ui/button";
import { Link } from "react-router";
import type { Todo } from "@/types";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutation";

export default function TodoItem({ id, content, isDone }: Todo) {
  const { mutate } = useUpdateTodoMutation();
  // todo 삭제
  const handleDeleteTodo = () => {};
  const handleCheckboxClick = () => {
    mutate({
      id,
      isDone: !isDone,
    });
  };
  return (
    <div className="flex items-center justify-between border p-2">
      <div className="ml-2 flex gap-5">
        <input
          onClick={handleCheckboxClick}
          type={"checkbox"}
          checked={isDone}
        />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      <Button onClick={handleDeleteTodo} variant={"destructive"}>
        삭제
      </Button>
    </div>
  );
}
