"use client"
import { Button } from "@/app/ui/button"
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase"
import { useRouter } from "next/navigation";
export default function Footer() {
    // ログアウトの処理を追記
    const auth = getAuth(app);
    const router = useRouter();

    const doLogout = async () => {
        try {
            await signOut(auth);
            console.log("ログアウトしました");
            router.push("/"); 
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