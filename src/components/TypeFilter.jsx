


const TypeFilter = ({ types, onSelect }) => {
  return (
    <select
      className="select select-bordered w-full max-w-xs"
      onChange={(e) => onSelect(e.target.value)}
      defaultValue=""
    >
      <option value="">All Types</option>
      {types.map((type) => (
        <option key={type.name} value={type.name}>
          {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default TypeFilter;
