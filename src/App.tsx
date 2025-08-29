import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FiltersMenu } from './components/FiltersBar';
import { TodoItem } from './components/TodoItem';
import React from 'react';

library.add(faPlus, faTrash, faPen)

type Status = "Done" | "Todo";
type Priorities = "High" | "Medium" | "Low";

type Todo =
{
  task: string;
  statut: Status;
  priority: Priorities;
};
 
export default function App()
{
  const [input, setInput] = React.useState<string>("");
  const [statut, setStatus] = React.useState<Status>("Todo");
  const [priority, setPriority] = React.useState<Priorities>("Medium");
  const [filter, setFilter] = React.useState<Priorities | "All">("All");

  const savedTodos = localStorage.getItem("todos");
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];
  const [todos, setTodos] = React.useState<Todo[]>(initialTodos);

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  function verifyExist(tasks: Todo[], task: string): boolean
  {
    for (let t of tasks) {
      if (t.task.toLowerCase() === task.toLowerCase())
        return false;
    }
    return true;
  }

  function toggleStatus(task: string, checked: boolean)
  {
    setTodos(prev => {
      return prev.map(t => {
        if (t.task === task)
          return {...t, statut: checked ? "Done" : "Todo"};
        return t;
      });
    });
  }

  function addTodo()
  {
    const task = input.trim();
    if (!task) return;
    if(!verifyExist(todos, task)) return(alert(`"${task}" already exist !`));

    const newTodo: Todo =
    {
      task,
      statut: "Todo",
      priority,
    };
    setTodos(prev => [newTodo, ...prev]);
    setInput("");
    setStatus("Todo");
    setPriority("Medium");
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

  let filteredTodos: Todo[] = [];

  if (filter === "All") {
    filteredTodos = todos;
  } else {
    filteredTodos = todos.filter((todo) => todo.priority === filter)
  }

  const lowCount = todos.filter((t) => t.priority === "Low").length
  const mediumCount = todos.filter((t) => t.priority === "Medium").length
  const highCount = todos.filter((t) => t.priority === "High").length


  return (
    <div className='todo-container'>
      <div className="todo-app">

        <h1>ToDo App :</h1>

        <div className='input-area'>
          <input required type="text" placeholder="Add a new task..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTodo()}/>
          <select required className="select" value={priority} onChange={(e) => setPriority(e.target.value as Priorities)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={addTodo} type="button" id="task-add">
            <FontAwesomeIcon icon="plus" />
          </button>
        </div>

        <FiltersMenu lowCount={lowCount} mediumCount={mediumCount} highCount={highCount} setFilter={setFilter}></FiltersMenu>

        <ul className="task-list">
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.task} todo={todo} toggleStatus={toggleStatus} modifyTodo={modifyTodo} deleteTodo={deleteTodo}/>
          ))}
        </ul>

      </div>
    </div>
  );
}
