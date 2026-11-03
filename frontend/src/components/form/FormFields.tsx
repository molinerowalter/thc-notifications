import { FORMS_FIELDS, FIELDS, type FormsFieldsStructure } from "@/common/constants";
import { Controller, type Control, type RegisterOptions, type FieldValues, type Path } from "react-hook-form";
import { Input } from '@/common/components/input';
import { Label } from '@/common/components/label';
import { Textarea } from '@/common/components/textarea';
import { FieldError } from '@/common/components/field'; 
import { RadioGroup, RadioGroupItem } from "@/common/components/radio-group";

type FormId =
  | "login"
  | "register"
  | "notifications.sms"
  | "notifications.web";

const getFieldByPath = (obj: FormsFieldsStructure, path: string): unknown => {
  return path.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && acc !== null && part in acc) {
        return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
};

export interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  placeholder?: string;
  rules?: RegisterOptions<T, Path<T>>;
}

interface FieldComponentProps<T extends FieldValues> {
  name: Path<T>;
  value: any;
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  type?: string;
  placeholder?: string;
}

// 2. Transforma FieldComponent en un componente genérico <T>
function FieldComponent<T extends FieldValues>({ 
  type, 
  name, 
  value, 
  onChange, 
  onBlur, 
  placeholder 
}: FieldComponentProps<T>) {
  
  if (type === "textarea") {
    return (
      <Textarea 
        id={name} 
        value={value ?? ""} 
        onChange={onChange} 
        onBlur={onBlur} 
        placeholder={placeholder}
        className="auth-textarea w-full" 
      />
    );
  }

  if (type === "radio") {
    return (
      <RadioGroup
        name={name}
        value={value ?? ""}
        onValueChange={(nextValue) => onChange(nextValue)}
        className="w-fit flex self-center mt-4 hover:cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem value="EMAIL" id={`${name}-email`} />
          <Label htmlFor={`${name}-email`}>Email</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="PUSH" id={`${name}-push`} />
          <Label htmlFor={`${name}-push`}>Push Notification</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="SMS" id={`${name}-sms`} />
          <Label htmlFor={`${name}-sms`}>SMS</Label>
        </div>
      </RadioGroup>
    );
  }

  return (
    <Input 
      id={name} 
      value={value ?? ""}
      type={type} 
      onChange={onChange} 
      onBlur={onBlur} 
      placeholder={placeholder}
      className="auth-input w-full" 
    />
  );
}

function FormField<T extends FieldValues>({
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
            <FieldComponent
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              type={type}
              placeholder={placeholder}
            />
            {error && (
              <FieldError className="field-error">
                {error.message}
              </FieldError>
            )}
          </>
        )}
      />
    </div>
  );
}

interface FormFieldsProps<T extends FieldValues> {
  id: FormId;
  control: Control<T>;
}

export const FormFields = <T extends FieldValues>({ id, control }: FormFieldsProps<T>) => {
  const fields = getFieldByPath(FORMS_FIELDS, id) as string[];

  if (!Array.isArray(fields)) {
    return null;
  }

  return (
    <>
      {fields.map((fieldId: string) => {
        const fieldConfig = FIELDS[fieldId as keyof typeof FIELDS];
        
        if (!fieldConfig) return null;

        return (
          <FormField 
            key={fieldId}
            name={fieldConfig.id as Path<T>}
            control={control}
            label={fieldConfig.label}
            type={fieldConfig.type}
            placeholder={fieldConfig?.placeholder}
            rules={fieldConfig?.rules}
          />
        );
      })}
    </>
  );
}