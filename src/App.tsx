import { saveTodosToLocalStorage, loadTodosFromLocalStorage } from './utils/storage.ts';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { FiltersBar, SearchBar } from './components/FilterBar.tsx';
import { library } from '@fortawesome/fontawesome-svg-core';
import { AddTask } from './components/AddTask.tsx';
import { InputBar } from "./components/InputBar";
import React from 'react';

library.add(faPlus, faTrash, faPen);

export type Status = "Done" | "Todo";
export type Priorities = "High" | "Medium" | "Low";

export type Todo =
  {
    task: string;
    status: Status;
    priority: Priorities;
  };

export default function App() {
  const [search, setSearchItem] = React.useState<string>("");
  const [input, setInput] = React.useState<string>("");
  const [, setStatus] = React.useState<Status>("Todo");
  const [priority, setPriority] = React.useState<Priorities>("Medium");
  const [filter, setFilter] = React.useState<Priorities | "All">("All");
  const [showFilters, setShowFilters] = React.useState<boolean>(false);
  const toggleFilters = () => setShowFilters(prev => !prev);
  const [todos, setTodos] = React.useState<Todo[]>(loadTodosFromLocalStorage);

  React.useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  function verifyExist(tasks: Todo[], task: string): boolean {
    for (const t of tasks) {
      if (t.task.toLowerCase() === task.toLowerCase())
        return false;
    }
    return true;
  }

  function toggleStatus(task: string, checked: boolean) {
    setTodos(prev => {
      return prev.map(t => {
        if (t.task === task)
          return { ...t, status: checked ? "Done" : "Todo" };
        return t;
      });
    });
  }

  function addTodo() {
    const task = input.trim();
    if (!task) return;
    if (!verifyExist(todos, task)) return (alert(`"${task}" already exist !`));

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

  function deleteTodo(task: string) {
    setTodos(prev => prev.filter(t => t.task !== task));
    console.info(`"${task}" has been deleted.`);
  }

  function modifyTodo(taskTitle: string) {
    console.log("Modifier la tâche :", taskTitle);
  }

  let filteredTodos: Todo[] = React.useMemo(() => {
    return (
      filter === "All" ? todos : todos.filter((todo) => todo.priority === filter)
    )
  }, [todos, filter]);

  filteredTodos = filteredTodos.filter((todo) =>
    todo.task.toLowerCase().includes(search.toLowerCase()))

  const lowCount = todos.filter((t) => t.priority === "Low").length
  const mediumCount = todos.filter((t) => t.priority === "Medium").length
  const highCount = todos.filter((t) => t.priority === "High").length

  return (
    <div className='todo-container'>
      <div className="todo-app">

        <h1>ToDo App :</h1>

        <InputBar input={input} priority={priority} addTodo={addTodo} setInput={setInput} setPriority={setPriority} toggleFilters={toggleFilters} filtersVisible={showFilters} />
        {showFilters && (
          <>
            <FiltersBar lowCount={lowCount} mediumCount={mediumCount} highCount={highCount} setFilter={setFilter} currentFilter={filter} />
            <SearchBar searchItem={setSearchItem} />
          </>
        )}
        <AddTask filteredTodos={filteredTodos} toggleStatus={toggleStatus} modifyTodo={modifyTodo} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
}
