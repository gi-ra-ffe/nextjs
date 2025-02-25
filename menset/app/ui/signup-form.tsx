"use client"
import { signup } from '@/app/actions/auth'
import { Button } from './button';
import { useActionState } from 'react'

export function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined)

    return (
        <form action={action}>
            <div className='mb-[8px]'>
                <label htmlFor="name">名前</label>
                <input id="name" name="name" placeholder="面接 太郎"
                    className="peer block w-[10em] rounded-md border border-gray-200 py-[8px] pl-[8px] text-sm outline-2 placeholder:text-gray-500" />
                {state?.errors?.name && <p>{state.errors.name}</p>}
            </div>
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
            <Button type="submit">登録する</Button>
        </form>
    )
}