"use client"
import { useActionState } from 'react'
import Link from 'next/link';
import { login } from '@/app/actions/auth'
import { Button } from './button';

export function LoginForm() {
    const [state, action, pending] = useActionState(login, undefined);

    return (
        <>
            <div className="login-types flex">
                <div>
                    <form action={action}>
                        <div className='mb-[8px]'>
                            <label htmlFor="email">メールアドレス</label>
                            <input id="email" name="email" type="email" placeholder="taro@sample.com"
                                className="peer block w-[20em] rounded-md border border-gray-200 py-[8px] pl-[8px] text-sm outline-2 placeholder:text-gray-500" />
                            {state?.errors?.email && <p>{state.errors.email}</p>}
                        </div>
                        <div className='mb-[24px]'>
                            <label htmlFor="password">パスワード</label>
                            <input id="password" name="password" type="password"
                                className="peer block w-[20em] rounded-md border border-gray-200 py-[8px] pl-[8px] text-sm outline-2 placeholder:text-gray-500" />
                            {state?.errors?.password && (
                                <div>
                                    <p>パスワードの条件:</p>
                                    <ul>
                                        {state.errors.password.map((error) => (
                                            <li key={error}>- {error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <Button type="submit">ログインする</Button>
                    </form>

                    <p>パスワードを忘れた方は<Link href={'#'} className="text-blue-700 underline">再設定</Link>を行ってください</p>
                </div>
                <div>
                </div>
            </div>
        </>
    )
}