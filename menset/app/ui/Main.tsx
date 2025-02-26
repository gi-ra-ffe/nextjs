"use client"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/app/ui/button"
import { useAuth } from '@/context/AuthContext'

export default function Main() {
    // 現在ログインしているユーザーを取得する
    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            router.push("/calendar"); // ログイン済みならカレンダーへリダイレクト
        }
    }, [currentUser, router]);

    if (currentUser) return null; // ログイン済みなら何も表示しない

    return (
        <main>
            <p className="mb-[40px]">面接日程調整アプリです</p>
            <div className="flex">
                <Button><Link href="/register">登録する</Link></Button>
                <Button className="ml-[8px]"><Link href="/login">ログインする</Link></Button>
            </div>
        </main>
    )
};