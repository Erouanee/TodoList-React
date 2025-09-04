import { faPlus, faTrash, faPen, type IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faPlus, faTrash, faPen)

type Status = "Done" | "Todo";
type Priorities = "High" | "Medium" | "Low";

type Todo = {
  task : string;
  status : Status;
  priority : Priorities;
};

type Props = {
  todo : Todo;
  toggleStatus : (task: string, checked: boolean) => void;
  modifyTodo : (taskTitle: string) => void;
  deleteTodo : (task: string) => void;
};

type TaskButtonProps = {
  icon : IconDefinition;
  onClick : () => void;
  className? : string;
  name : string;
};

export const TaskButton = ({ icon, onClick, className, name }: TaskButtonProps) =>
{
  return (
    <button onClick={onClick} type="button" className={className} aria-label={name}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export const TodoItem = ({ todo, toggleStatus, modifyTodo, deleteTodo }: Props) => {
  return (
    <li>
      <input type="checkbox" className="checkbox" checked={todo.status === "Done"} onChange={(e) => toggleStatus(todo.task, e.target.checked)}/>

      <span className={`task-text ${todo.status === "Done" ? "completed" : ""}`}>{todo.task}</span>
      <span className="priority-badge" data-priority={todo.priority}>{todo.priority}</span>

      <TaskButton icon={faPen} onClick={() => modifyTodo(todo.task)} className="modify" name={`Modifier ${todo.task}`}/>
      <TaskButton icon={faTrash} onClick={() => deleteTodo(todo.task)} className="delete" name={`Supprimer ${todo.task}`}/>
    </li>
  );
};
