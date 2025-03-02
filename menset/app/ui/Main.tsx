"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/app/ui/button";
import { useSession } from "next-auth/react";

export default function Main() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/calendar"); // ✅ ログイン済みならカレンダーへリダイレクト
        }
    }, [status, router]);

    if (status === "loading") return <p>Loading...</p>;

    return (
        <main>
            {!session ? (
                <>
                    <p className="mb-[40px]">面接日程調整アプリです</p>
                    <div className="flex">
                        <Button><Link href="/register">登録する</Link></Button>
                        <Button className="ml-[8px]"><Link href="/login">ログインする</Link></Button>
                    </div>
                </>
            ) : (
                <p>リダイレクト中...</p> // ✅ ログイン済みなら何も表示しない
            )}
        </main>
    );
}
