import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import type { UserCredentials } from '@/features/login/types';
import Form from '@/components/form';
import { login } from '@/features/login/services'
import { useAuth } from "../hooks/useAuth";
import { toast } from '@/common/components/toast';

const LoginForm = () => {
  const { control, handleSubmit } = useForm<UserCredentials>();
  const navigate = useNavigate();
  const { saveUserAndToken } = useAuth();

  const onSubmit = async (data: UserCredentials) => {
    try {
      const response = await login(data);
      saveUserAndToken(data.username, response?.access_token);
      navigate(`/profile`)
    } catch(err) {
      toast.add({
        type: "error",
        description: "Invalid data"
      })
    }
  }; 

  return (
    <div className="auth-screen">
      <Form 
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        control={control}
        submitButtonTxt="Sign In"
      >
        <Form.Title title="Welcome Back" subtitle="Please sign in to your account to continue" />
        <Form.Fields id="login" control={control} />
      </Form>
    </div>
  ); 
};

export default LoginForm;