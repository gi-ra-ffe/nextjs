"use server";
import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import { firebaseAuth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { redirect } from "next/navigation";

export async function signup(prevState: any, formData: FormData) {
    // フォームの検証
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        type: formData.get('type'),
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
    const { name, type, email, password } = validatedFields.data;
    if (!type) {
        console.error("エラー: type が undefined");
        return { errors: { type: ["アカウントの種類を選択してください"] } };
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const user = userCredential.user;

        // 🔥 Firestore にユーザー情報を保存
        await setDoc(doc(collection(db, "users"), user.uid), {
            name,
            email,
            type,
            uid: user.uid,
            createdAt: new Date(),
        });

        return { success: true, redirectUrl: "/calendar" };

    } catch (error) {
        console.error("Firebase登録エラー:", error);
        return { errors: { email: ["このメールアドレスはすでに登録されています"] } };
    }
}
export async function login(prevState: any, formData: FormData) {

    // フォームの検証
    const validatedFields = SignupFormSchema.safeParse({
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
    const { email, password } = validatedFields.data

    try {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const firebaseUser = userCredential.user;

        return { success: true, userId: firebaseUser.uid };
    } catch (error) {
        console.error("ログインエラー:", error);

        // return { errors: { email: ["このメールアドレスはすでに登録されています"] } };
    }
}