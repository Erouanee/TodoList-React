import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useState } from 'react';

library.add(faPlus, faTrash, faPen)

type Status = "Done" | "Todo";
type Priorities = "Urgente" | "Moyenne" | "Basse";

type Todo =
{
  task: string;
  statut: Status;
  priority: Priorities;
};

export default function App()
{
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statut, setStatus] = useState<Status>("Todo");
  const [priority, setPriority] = useState<Priorities>("Moyenne");

  function verify_exit(tasks: Todo[], task: string): boolean
  {
    for (let t of tasks) {
      if (t.task.toLowerCase() === task.toLowerCase())
        return false;
    }
    return true;
  }

  function toggleStatus(task: string, checked: boolean)
  {
    setTodos(prev =>
      prev.map(t => t.task === task ? { ...t, statut: checked ? "Done" : "Todo" } : t)
    );
  }

  function addTodo()
  {
    const task = input.trim();
    if (!task) return;
    if(!verify_exit(todos, task)) return(alert(`"${task}" already exist !`));

    const newTodo: Todo =
    {
      task,
      statut: "Todo",
      priority,
    };
    setTodos(prev => [newTodo, ...prev]);
    setInput("");
    setStatus("Todo");
    setPriority("Moyenne");
    console.info(`"${task}" has been added.`);
  }

  function deleteTodo(task: string)
  {
    setTodos(prev => prev.filter(t => t.task !== task));
    console.info(`"${task}" has been deleted.`);
  }

  function modifyTodo(taskTitle: string)
  {
    console.log("Modifier la tâche :", taskTitle);
  }

  return (
    <div className='todo-container'>
      <div className="todo-app">
        <h1>ToDo App :</h1>

        <div className='input-area'>
          <input required type="text" placeholder="Add a new task..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTodo()}/>
          <select required className="select" value={priority} onChange={(e) => setPriority(e.target.value as Priorities)}>
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button onClick={addTodo} type="button" id="task-add">
            <FontAwesomeIcon icon="plus" />
          </button>
        </div>

        <div className="filter-area">
          <button className='all-filter'>All</button>
          <button className='all-filter'>Urgente</button>
          <button className='all-filter'>Moyenne</button>
          <button className='all-filter'>Basse</button>
        </div>

        <div className="todos-container">
          <ul className="task-list">
            {todos.map((t) => (
              <li key={t.task}>
                <input type="checkbox" className="checkbox" checked={t.statut === "Done"} onChange={(e) => toggleStatus(t.task, e.target.checked)}/>
                <span className="task-text">{t.task}</span>
                <span className="priority-badge" data-priority={t.priority}>
                  {t.priority}
                </span>
                <button onClick={() => modifyTodo(t.task)} type="button" className="modify" aria-label={`Modifier ${t.task}`}>
                  <FontAwesomeIcon icon="pen" />
                </button>
                <button onClick={() => deleteTodo(t.task)} type="button" className="delete" aria-label={`Supprimer ${t.task}`}>
                  <FontAwesomeIcon icon="trash" />
                </button>
              </li>
            ))}
          </ul>
        </div> 

      </div>
    </div>
  );
}
