import { TodoItem } from "./TodoItem"
import type { Todo } from "../App"

type Props =
{
    filteredTodos : Todo[];
    search : string;
    toggleStatus : (task: string, checked: boolean) => void;
    modifyTodo : (taskTitle : string) => void;
    deleteTodo : (task : string) => void;
}

export const AddTask = ({filteredTodos, search, toggleStatus, modifyTodo, deleteTodo} : Props) =>
{
    return (
        <ul className="task-list">
          {filteredTodos.filter((todo) =>
            (todo.task ?? "").toLowerCase().includes(search.toLowerCase())).map((todo) => (
            <TodoItem key={todo.task} todo={todo} toggleStatus={toggleStatus} modifyTodo={modifyTodo} deleteTodo={deleteTodo} />
          ))}
        </ul>
    )
}
