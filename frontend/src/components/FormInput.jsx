const FormInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  options = [],
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}*
      </label>

      {type === "select" ? (
        <select
          id={id}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          value={value}
          onChange={onChange}
        >
          <option value={""} disabled>
            Select an option
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          required
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
};

export default FormInput;
