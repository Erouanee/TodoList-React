type FilterBarProps = {
  lowCount: number;
  mediumCount: number;
  highCount: number;
  setFilter: (value: "High" | "Medium" | "Low" | "All") => void;
  currentFilter: "High" | "Medium" | "Low" | "All";
};

type FilterButtonProps = {
  name: string;
  count: number;
  onClick: () => void;
  isActive?: boolean;
  ariaLabel: string;
};

type SearchBarProps = {
  searchItem: (e: string) => void;
};

function FilterButton({
  name,
  count,
  onClick,
  isActive,
  ariaLabel,
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={isActive ? "selected" : ""}
      aria-label={ariaLabel}
    >
      {name} ({count})
    </button>
  );
}

export function FiltersBar({
  lowCount,
  mediumCount,
  highCount,
  setFilter,
  currentFilter,
}: FilterBarProps) {
  const allCount = lowCount + mediumCount + highCount;

  return (
    <div className="filter-area">
      <FilterButton
        name="All"
        count={allCount}
        onClick={() => setFilter("All")}
        isActive={currentFilter === "All"}
        ariaLabel="All-Filter"
      />
      <FilterButton
        name="High"
        count={highCount}
        onClick={() => setFilter("High")}
        isActive={currentFilter === "High"}
        ariaLabel="High-Filter"
      />
      <FilterButton
        name="Medium"
        count={mediumCount}
        onClick={() => setFilter("Medium")}
        isActive={currentFilter === "Medium"}
        ariaLabel="Medium-Filter"
      />
      <FilterButton
        name="Low"
        count={lowCount}
        onClick={() => setFilter("Low")}
        isActive={currentFilter === "Low"}
        ariaLabel="LowFilter"
      />
    </div>
  );
}

export function SearchBar({ searchItem }: SearchBarProps) {
  return (
    <div className="search-area">
      <input
        type="text"
        name="searchBar"
        id="searchBar"
        placeholder="Search"
        onChange={(event) => searchItem(event.target.value)}
        aria-label="search-bar"
      />
      {/* <select required className="select" value="High" onChange={(e) => setPriority(e.target.value)}>
          <option value="High">Ascending</option>
          <option value="Medium">Descending</option>
          <option value="Low">Date</option>
      </select> */}
    </div>
  );
}
