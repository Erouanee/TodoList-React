import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { FiltersBar, SearchBar } from './components/FiltersBar';
import { library } from '@fortawesome/fontawesome-svg-core'
import { InputBar } from "./components/InputBar"
import { TodoItem } from './components/TodoItem';
import React from 'react';

library.add(faPlus, faTrash, faPen)

type Status = "Done" | "Todo";
type Priorities = "High" | "Medium" | "Low";

type Todo =
{
  task : string;
  status : Status;
  priority : Priorities;
};

export default function App()
{
  const [search, setSearchItem] = React.useState("");
  const [input, setInput] = React.useState<string>("");
  const [status, setStatus] = React.useState<Status>("Todo");
  const [priority, setPriority] = React.useState<Priorities>("Medium");
  const [filter, setFilter] = React.useState<Priorities | "All">("All");

  const savedTodos = localStorage.getItem("todos");
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];
  const [todos, setTodos] = React.useState<Todo[]>(initialTodos);

  React.useEffect(() =>
  {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const searchItem = (e: { target: { value: any; }; }) =>
  {
    let value = e.target.value;
  
    setSearchItem(value)
  }

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
          return {...t, status: checked ? "Done" : "Todo"};
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
      status: "Todo",
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

        <InputBar input={input} priority={priority} addTodo={addTodo} setInput={setInput} setPriority={setPriority}/>
        <FiltersBar lowCount={lowCount} mediumCount={mediumCount} highCount={highCount} setFilter={setFilter} currentFilter={filter}/>
        <SearchBar searchItem={searchItem}></SearchBar>
        <ul className="task-list">
          {filteredTodos.filter((todo) =>
            (todo.task ?? "").toLowerCase().includes(search.toLowerCase())).map((todo) => (
            <TodoItem key={todo.task} todo={todo} toggleStatus={toggleStatus} modifyTodo={modifyTodo} deleteTodo={deleteTodo} />
          ))}
        </ul>
      </div>
    </div>
  );
}
