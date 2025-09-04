import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { TaskButton } from './TodoItem';

library.add(faPlus, faTrash, faPen)

type Priorities = "High" | "Medium" | "Low";

type Props =
{
    input : string;
    priority : Priorities;
    addTodo : () => void;
    setInput : () => string;
    setPriority : () => Priorities;
}

export const InputBar = ({ input, priority, addTodo, setInput, setPriority  } : Props) => {
  return (
    <div className='input-area'>
        <input required type="text" placeholder="Add a new task..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTodo()}/>
        <select required className="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
        </select>
        <TaskButton icon={faPlus} onClick={() => addTodo()} className="task-add" name={`Ajouter ${input}`}/>
    </div>
  );
};
