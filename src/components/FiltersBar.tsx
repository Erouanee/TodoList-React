type Props =
{
  lowCount : number;
  mediumCount : number;
  highCount : number;
  setFilter : (value: "High" | "Medium" | "Low" | "All") => void;
  currentFilter : "High" | "Medium" | "Low" | "All";
};

type FilterButtonProps =
{
  name:  string;
  count : number;
  onClick : () => void;
  isActive? : boolean;
};

type SearchBarProps =
{
  searchItem : (e: any) => void;
}

type FilterStatusProps =
{
  todoCount : number;
  doneCount : number;
  setStatus : (value: "Todo" | "Done") => void;
  currentStatus : "Todo" | "Done";
}

const FilterButton = ({ name, count, onClick, isActive}: FilterButtonProps) =>
{
  return (
    <button onClick={onClick} className={isActive ? "selected" : ""}>{name} ({count})</button>
  );
};

export const FiltersBar = ({ lowCount, mediumCount, highCount, setFilter, currentFilter}: Props) =>
{
  let allCount = lowCount + mediumCount + highCount;

  return (
    <div className="filter-area">
      <FilterButton name="All" count={allCount} onClick={() => setFilter("All")} isActive={currentFilter === "All"} />
      <FilterButton name="High" count={highCount} onClick={() => setFilter("High")} isActive={currentFilter === "High"}/>
      <FilterButton name="Medium" count={mediumCount} onClick={() => setFilter("Medium")} isActive={currentFilter === "Medium"}/>
      <FilterButton name="Low" count={lowCount} onClick={() => setFilter("Low")} isActive={currentFilter === "Low"}/>
    </div>
  );
};

export const SearchBar = ({ searchItem } : SearchBarProps) =>
{
  return (
    <div className="search-area">
      <input type="text" name="searchBar" id="searchBar" placeholder="Search" onChange={searchItem}></input>
    </div>
  );
};

export const FilterStatus = ({todoCount, doneCount, setStatus} : FilterStatusProps) =>
{
  return (
    <p className="filter-area">
      <FilterButton name="Todo" count={todoCount} onClick={() => setStatus("Todo")} />
      <FilterButton name="Done" count={doneCount} onClick={() => setStatus("Done")} />
    </p>
  )
}
