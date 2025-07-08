import {
  FieldErrors,
  Path,
  UseFormRegister,
  FieldValues,
} from 'react-hook-form';
import { cn } from '@/lib/utils';
interface FormFieldProps<T extends FieldValues> {
  id: string;
  type?: string;
  disabled?: boolean;
  placeholder: string;
  label?: string;
  inputClassNames?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors;
}

const FormField = <T extends FieldValues>({
  id,
  type,
  disabled,
  placeholder,
  label,
  inputClassNames,
  register,
  errors,
}: FormFieldProps<T>) => {
  const message = errors[id] && (errors[id]?.message as string);

  return (
    <div>
      {label && <span className='block text-sm'>{label}</span>}
      <input
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        {...register(id as Path<T>)}
        className={cn(
          'my-2 w-full rounded-md border border-b-slate-300 p-3 outline-none disabled:cursor-not-allowed disabled:opacity-70 dark:border-b-slate-700 dark:bg-primary/10',
          errors[id] && 'border-rose-400',
          inputClassNames
        )}
      />
      {message && <span className='text-sm text-rose-400'>{message}</span>}
    </div>
  );
};

export default FormField;
