"use client"

import { Button } from 'reactstrap';
import { useAuth } from '@/context/AuthContext'
import { getAuth, signOut } from "firebase/auth";
import Link from 'next/link';

const Header = () => {
    // 現在ログインしているユーザーを取得する
    const { currentUser } = useAuth();
    // console.log(currentUser);

    // ログアウトの処理を追記
    const doLogout = () => {
        const auth = getAuth();

        signOut(auth)
            .then(() => {
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // ログアウトボタンを追加
    return (
        <div style={{ padding: "1rem 0" }} >
            {currentUser ? (
                <div suppressHydrationWarning={true}>
                    <div style={{ paddingBottom: "1rem" }}>{currentUser.email} でログインしています。</div>
                    <div>
                        <Button onClick={() => {
                            doLogout();
                        }} 
                        style={{ width: 220 }}>
                            ログアウト
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <div suppressHydrationWarning={true}>ログインしていません。</div>
                    <div>
                        <Link href="/login">
                            <Button 
                                className="mt-3"
                                style={{ width: 220 }}
                                color="primary"
                            >
                                ログイン
                            </Button>
                        </Link>
                    </div>
                    <div>
                        <Link href="/register">
                            <Button 
                                className="mt-3"
                                style={{ width: 220 }}
                                color="success"
                            >
                                登録
                            </Button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default Header;
