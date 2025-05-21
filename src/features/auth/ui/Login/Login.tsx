import { Button } from "@/common/components/Button/Button"
import styles from "./Login.module.css"
import { Input } from "@/common/components/Input/Input"
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs, loginSchema } from "../../lib/schemas";
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from "@/common/components/Checkbox/Checkbox";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { login } from "../../model/auth-slice";


export const Login = () => {
    const dispatch = useAppDispatch()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "", rememberMe: false },
    })

    const onSubmit: SubmitHandler<Inputs> = data => {
        dispatch(login(data))
        reset()
    }

    return (
        <div className={styles.loginBlock}>
            <form action="/submit" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <label>Email:</label>
                    <Input {...register("email")}
                        error={errors.email?.message} />
                </div>
                <div className={styles.formGroup}>
                    <label>Password:</label>
                    <Input
                        type="password"
                        id="password" {...register("password")}
                        error={errors.password?.message} />
                </div>
                <div className={styles.checkboxGroup}>
                    <Checkbox type="checkbox" id="remember" {...register("rememberMe")} />
                    <label>Remember me</label>
                </div>
                <div className={styles.loginButton}>
                    <Button type="submit">Login</Button>
                </div>
            </form>
        </div>
    )
}