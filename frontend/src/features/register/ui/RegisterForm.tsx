/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import type { UserRegisterForm } from '@/features/register/types';
import { Form } from '@/components/form';
import registerUser from '@/features/register/services'

const RegisterForm = () => {
    const { control, handleSubmit, watch } = useForm<UserRegisterForm>();
    const passwordValue = watch("password");

    const onSubmit = (data: UserRegisterForm) => {
      const {'password-validation': password_validation, ...body} = data;
      registerUser(body);
    }; 

    return (
      <div className="auth-screen">
        <Form 
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          control={control}
          submitButtonTxt="Sign Up"
        >
          <Form.Title title="Create an Account" subtitle="Please fill in the form to create an account" />
          <Form.Fields id="register" control={control} />
        </Form>
      </div>
    ); 
};

export default RegisterForm;