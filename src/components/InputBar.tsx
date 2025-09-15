import { faPlus, faTrash, faPen, faFilter} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { TaskButton } from './TodoItem';
import type { Priorities } from '../App';

library.add(faPlus, faTrash, faPen, faFilter)

type Props =
{
    input : string;
    priority : Priorities;
    addTodo : () => void;
    setInput : (value : string) => void;
    setPriority : (value : Priorities) => void;
    toggleFilters : () => void;
    filtersVisible : boolean;
}

export const InputBar = ({ input, priority, addTodo, setInput, setPriority, toggleFilters, filtersVisible } : Props) => {
  return (
    <div className='input-area'>
        <input required type="text" placeholder="Add a new task..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTodo()} aria-label="Add a new task" />
        <select required className="select" value={priority} onChange={(e) => setPriority(e.target.value)} aria-label="priority-select">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <TaskButton icon={faFilter} onClick={toggleFilters} className="filter-hide" name={filtersVisible ? "Hide filters" : "Show filters"}/>
        <TaskButton icon={faPlus} onClick={() => addTodo()} className="task-add" name={`add-button`}/>
    </div>
  );
};
