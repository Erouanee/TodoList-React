import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faPlus, faTrash, faPen)

type Status = "Done" | "Todo";
type Priorities = "High" | "Medium" | "Low";

type Todo = {
  task : string;
  statut : Status;
  priority : Priorities;
};

type Props = {
  todo : Todo;
  toggleStatus : (task: string, checked: boolean) => void;
  modifyTodo : (taskTitle: string) => void;
  deleteTodo : (task: string) => void;
};

export const TodoItem = ({ todo, toggleStatus, modifyTodo, deleteTodo } : Props) => {
  return (
    <li>
      <input type="checkbox" className="checkbox" checked={todo.statut === "Done"} onChange={(e) => toggleStatus(todo.task, e.target.checked)}/>
      <span className="task-text">{todo.task}</span>
      <span className="priority-badge" data-priority={todo.priority}>
        {todo.priority}
      </span>
      <button onClick={() => modifyTodo(todo.task)} type="button" className="modify" aria-label={`Modifier ${todo.task}`}>
        <FontAwesomeIcon icon="pen" />
      </button>
      <button onClick={() => deleteTodo(todo.task)} type="button" className="delete" aria-label={`Supprimer ${todo.task}`}>
        <FontAwesomeIcon icon="trash" />
      </button>
    </li>
  );
};
