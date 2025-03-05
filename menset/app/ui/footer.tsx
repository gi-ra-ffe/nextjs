"use client"
import { Button } from "@/app/ui/button"
import { signOut } from "next-auth/react"

export default function Footer() {
    const doLogout = async () => {
        try {
            await signOut({ redirect: true, callbackUrl: "/" });
            console.log("ログアウトしました");
        } catch (error) {
            console.error("ログアウトエラー:", error);
        }
    };

    return (
        <footer>
            <Button onClick={doLogout}
                style={{ width: 220 }}>
                ログアウト
            </Button>
        </footer>
    )
}