'use client'

import { Button } from '@/app/ui/button';
import { useState } from 'react';
import Link from "next/link";
import { signIn } from "next-auth/react"; 

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // ユーザーがログインボタンを押したときにdoLogin関数が実行される
    const doLogin = async () => {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: true,
            callbackUrl: "/calendar"
        });

        if (result?.error) {
            console.error("❌ ログイン失敗:", result.error);
        } else {
        }
    }

    return (
        <div className="login-types flex">
            <div>
                <form action={doLogin}>
                    <div className='mb-[8px]'>
                        <label htmlFor="email">メールアドレス</label>
                        <input id="email" name="email" type="email" placeholder="taro@sample.com"
                            className="peer block w-[20em] rounded-md border border-gray-200 py-[8px] pl-[8px] text-sm outline-2 placeholder:text-gray-500" 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-[24px]'>
                        <label htmlFor="password">パスワード</label>
                        <input id="password" name="password" type="password"
                            className="peer block w-[20em] rounded-md border border-gray-200 py-[8px] pl-[8px] text-sm outline-2 placeholder:text-gray-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit">ログインする</Button>
                </form>

                <p>パスワードを忘れた方は<Link href={'#'} className="text-blue-700 underline">再設定</Link>を行ってください</p>
            </div>
            <div>
            </div>
        </div>
    )
}