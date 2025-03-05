import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Email & Password",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log("🚀 `authorize` が実行された！", credentials);
                if (!credentials?.email || !credentials?.password) {
                    console.error("🚨 認証エラー: credentials が不足しています");
                    return null;
                }
                try {
                    const userCredential = await signInWithEmailAndPassword(
                        firebaseAuth,
                        credentials.email,
                        credentials.password
                    );
                    return { id: userCredential.user.uid, email: credentials.email };
                } catch (error) {
                    console.error("🚨 認証エラー:", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; 
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = { id: token.id, email: token.email }; // ✅ session に id を追加
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };