interface ISelectOption {
  label: string;
  value: string;
}

export default function Select({
  options,
  label,
  name,
  defaultValue = '',
  onChange,
}: {
  options: ISelectOption[];
  label: string;
  name: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <select onChange={onChange} name={name} defaultValue={defaultValue}>
        <option value="" disabled>
          {label}
        </option>
        {options.map((option, key) => (
          <option key={key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
