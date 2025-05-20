import { Button } from "@/common/components/Button/Button"
import styles from "./Login.module.css"
import { Input } from "@/common/components/Input/Input"
import { Checkbox } from "@/common/components/Checkbox/Checkbox"
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "../../lib/schemas";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";

type Inputs = z.infer<typeof loginSchema>

export const Login = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "", rememberMe: false },
    })

    const onSubmit: SubmitHandler<Inputs> = _data => {
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