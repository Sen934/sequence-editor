import { type FieldValues, type Path, useController } from 'react-hook-form';
import get from 'lodash/get';

type FormInputProps<TFieldValues extends FieldValues> = {
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  namePath: Path<TFieldValues>;
  label: string;
};

function FormInput<TFieldValues extends FieldValues>(
  props: FormInputProps<TFieldValues>,
) {
  const {
    field,
    formState: { errors },
  } = useController<TFieldValues>({ name: props.namePath });

  const error = get(errors, props.namePath);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <input
        className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        {...field}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{String(error?.message)}</p>
      )}
    </div>
  );
}

export { FormInput };
