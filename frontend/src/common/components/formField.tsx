import { Controller, type Control, type RegisterOptions, type FieldValues, type Path } from "react-hook-form";
import { Input } from '@/common/components/input';
import { FieldError } from '@/common/components/field';

export interface FormFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    type?: string;
    placeholder?: string;
    rules?: RegisterOptions<T, Path<T>>;
}

export function FormField<T extends FieldValues>({
    name,
    control,
    label,
    type = "text",
    placeholder,
    rules
}: FormFieldProps<T>) {
    return (
        <div className="auth-field-group">
            <label className="auth-label" htmlFor={name}>
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Input 
                            id={name}
                            type={type} 
                            className="auth-input w-full" 
                            placeholder={placeholder} 
                            {...field} 
                        />
                        {error && (
                            <FieldError className="text-rose-500 text-xs mt-1">
                                {error.message}
                            </FieldError>
                        )}
                    </>
                )}
            />
        </div>
    );
}