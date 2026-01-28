import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

export async function deleteTodo(id: string) {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Delete todo failed");
  const data: Todo = await res.json();
  return data;
}
