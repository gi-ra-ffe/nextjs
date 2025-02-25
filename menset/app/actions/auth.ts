"use server";
import { SignupFormSchema, FormState } from '@/app/lib/definitions'

export async function signup(formData: FormData) {
    // フォームの検証
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // フォームが無効なとき
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // ユーザーを作成
}