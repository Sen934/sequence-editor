import { type FieldValues, type Path, useController } from 'react-hook-form';
import get from 'lodash/get';
import React from 'react';

type FormInputProps<TFieldValues extends FieldValues> = {
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  'data-testid'?: string;
  namePath: Path<TFieldValues>;
  label?: string;
  className?: string;
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
    <div className={props.className} data-testid={props['data-testid']}>
      {props.label && (
        <label className="block text-sm font-medium text-gray-700">
          {props.label}
        </label>
      )}
      <input
        {...field}
        {...props.inputProps}
        className={`mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${props.inputProps?.className ?? ''}`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600" data-testid="error-message">
          {String(error?.message)}
        </p>
      )}
    </div>
  );
}

export { FormInput };
