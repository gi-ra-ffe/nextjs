"use server";
import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import { firebaseAuth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "@/lib/firebase";

export async function signup(prevState: any, formData: FormData) {
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

    // データベースに挿入する準備
    const { name, email, password } = validatedFields.data

    try {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const firebaseUser = userCredential.user;

        // 🔥 **ユーザーをデータベースに挿入**
        const data = await db
            .insert(users)
            .values({
                id: firebaseUser.uid,  // FirebaseのIDをDBに保存
                name,
                email,
            })
            .returning({ id: users.id });
        console.log("Firebase登録成功:", userCredential.user);
        return { success: true, userId: data[0].id };
    } catch (error) {
        console.error("Firebase登録エラー:", error); 
        return { errors: { email: ["このメールアドレスはすでに登録されています"] } };
    }
}