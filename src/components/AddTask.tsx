import { TodoItem } from "./TodoItem";
import type { Todo } from "../App";

type Props = {
  filteredTodos: Todo[];
  toggleStatus: (task: string, checked: boolean) => void;
  modifyTodo: (taskTitle: string) => void;
  deleteTodo: (task: string) => void;
};

export default function AddTask({
  filteredTodos,
  toggleStatus,
  modifyTodo,
  deleteTodo,
}: Props) {
  return (
    <ul className="task-list" aria-label="Tasks-list">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.task}
          todo={todo}
          toggleStatus={toggleStatus}
          modifyTodo={modifyTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}
