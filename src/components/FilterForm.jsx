const FilterForm = (props) => {
  const { filterValue, setFilterValue } = props;
  const handleFilterChange = (event) => setFilterValue(event.target.value)
  return (
    <div className="flex justify-center">
      <input value={filterValue} title="Filter" onChange={handleFilterChange} className="input-style-2 rounded-md" />
    </div>
  );
};

export default FilterForm;
