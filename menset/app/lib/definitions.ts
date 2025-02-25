import { z } from 'zod'

export const SignupFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: '2文字以上入力してください' })
        .trim(),
    email: z.string().email({ message: '有効なメールアドレスを入力してください' }).trim(),
    password: z
        .string()
        .min(8, { message: '8文字以上入力してください' })
        .regex(/[a-zA-Z]/, { message: '1文字以上の英字を入れてください' })
        .regex(/[0-9]/, { message: '1文字以上の数字を入れてください' })
        .regex(/[^a-zA-Z0-9]/, {
            message: '1文字以上の大文字を入れてください.',
        })
        .trim(),
})

export type FormState =
    | {
        errors?: {
            name?: string[]
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined