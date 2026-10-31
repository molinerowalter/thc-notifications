import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Button } from "@/common/components/button";
import type { UserCredentials } from '@/features/login/types';
import { FormField } from '@/common/components/formField';
import login from '@/features/login/services'
import { useAuth } from "../hooks/useAuth";
import { toast } from '@/common/components/toast';

const LoginForm = () => {
    const { control, handleSubmit } = useForm<UserCredentials>();
    const navigate = useNavigate();
    const { setToken } = useAuth();

    // Form submission handler
    const onSubmit = async (data: UserCredentials) => {
        alert(`Form submitted with data: ${JSON.stringify(data)}`);
        try {
            const response = await login(data);
            setToken(response?.access_token);
            navigate(`/${data.username}`)
        } catch(err) {
            console.log("singinERROR: ", err)
            toast.add({
                type: "error",
                description: "Invalid data"
            })
        }
    }; 

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
            <form 
                className="auth-card flex flex-col space-y-5 bg-white shadow-2xl" 
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="text-center mb-2">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Please sign in to your account to continue
                    </p>
                </div>
                <FormField
                    name="username"
                    control={control}
                    label="Username"
                    type="text"
                    placeholder="john.doe"
                    rules={{ 
                        required: "UserName is required"
                    }}
                />
                <FormField
                    name="password"
                    control={control}
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    rules={{ 
                        required: "Password is required", 
                        pattern: { 
                            value: /^(?=.*[!@#$%^&*])/,
                            message: "Password must include a special character" 
                        } 
                    }}
                />

                <Button className="btn-primary w-full mt-2 cursor-pointer" type="submit">
                    Sign In
                </Button>
            </form>
        </div>
    ); 
};

export default LoginForm;