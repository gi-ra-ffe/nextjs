import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { db, firebaseAuth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Email & Password",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    // Firebase のログイン処理
                    const userCredential = await signInWithEmailAndPassword(
                        firebaseAuth,
                        credentials.email,
                        credentials.password
                    );
                    return { id: userCredential.user.uid, email: credentials.email };
                } catch (error) {
                    console.error("ログインエラー:", error);
                    return null;
                }
            },
        }),
    ],
    adapter: FirestoreAdapter(db), // Firestore にユーザー情報を保存！
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login", // カスタムログインページ
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; // ✅ APIルートを作成
