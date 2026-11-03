import { Button } from "@/common/components/button";
import { type FieldValues, type Control, type SubmitHandler, type UseFormHandleSubmit } from "react-hook-form";

interface FormContainerProps<T extends FieldValues> {
  control: Control<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  onSubmit: SubmitHandler<T>;     
  submitButtonTxt: string;
  children: React.ReactNode;
}

export const FormContainer = <T extends FieldValues>(props: FormContainerProps<T>) => {
  return (
    <form 
        className="auth-card" 
        onSubmit={props.handleSubmit(props.onSubmit)}
    >
        {props.children}
        <Button className="btn-primary btn-block" type="submit">
            {props.submitButtonTxt}
        </Button>
    </form>
  );
};