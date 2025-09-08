import type { Todo } from "../App";

export function loadTodosFromLocalStorage()
{
  const raw = localStorage.getItem("todos");
  return raw ? JSON.parse(raw) : [];
}

export function saveTodosToLocalStorage(todos: Todo[])
{
  localStorage.setItem("todos", JSON.stringify(todos));
}
