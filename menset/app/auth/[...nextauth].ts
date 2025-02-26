import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { db } from "@/lib/firebase"; // Firebase の Firestore を使う
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '@/lib/firebase';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    adapter: FirestoreAdapter(db), // Firestore にユーザー情報を保存
    secret: process.env.NEXTAUTH_SECRET,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
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
                // 🔥 Firebaseのログイン処理
                const userCredential = await signInWithEmailAndPassword(firebaseAuth, credentials.email, credentials.password);
                return { id: userCredential.user.uid, email: credentials.email };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
});