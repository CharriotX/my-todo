import { instance } from "@/common/instance/instance"

export const authApi = {
    login() {
        return instance.get('/auth/me')
    }
}