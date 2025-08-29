type Props =
{
  lowCount : number;
  mediumCount : number;
  highCount : number;
  setFilter : (value: "High" | "Medium" | "Low" | "All") => void;
};

export const FiltersMenu = ({ lowCount, mediumCount, highCount, setFilter } : Props) =>
{
  let allCount = lowCount + mediumCount + highCount;

  return (
    <div className="filter-area">
      <button onClick={() => setFilter("All")}>All ({allCount})</button>
      <button onClick={() => setFilter("High")}>High ({highCount})</button>
      <button onClick={() => setFilter("Medium")}>Medium ({mediumCount})</button>
      <button onClick={() => setFilter("Low")}>Low ({lowCount})</button>
    </div>
  );
};
