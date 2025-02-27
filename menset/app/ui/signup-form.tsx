"use client"
import { signup } from '@/app/actions/auth'
import { Button } from './button';
import { useActionState, useEffect } from 'react'
import { FaCircleQuestion } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined)
    const router = useRouter();

    useEffect(() => {
        if (state?.success && state.redirectUrl) {
            router.push(state.redirectUrl);
        }
    }, [state, router]); // `state` が更新されたら実行


    return (
        <form action={action}>
            <div className='mb-[16px]'>
                <label htmlFor="name" className='font-bold mb-[8px]'>名前</label>
                <input id="name" name="name" placeholder="面接 太郎"
                    className="peer block w-[10em] rounded-md border border-gray-200 py-[8px] pl-[8px] text-sm outline-2 placeholder:text-gray-500" />
                {state?.errors?.name && <p>{state.errors.name}</p>}
            </div>
            <div className='mb-[16px]'>
                <label htmlFor="type" className='font-bold mb-[8px]'>アカウントの種類</label>
                <p className='flex'>
                    <input id="type-job_seeker" name="type" type='radio' value={'job_seeker'}
                        className="mr-[8px]" required />
                    <label htmlFor="type-job_seeker">求職者</label>
                </p>
                <p className='flex'>
                    <input id="type-agent" name="type" type='radio' value={'agent'}
                        className="mr-[8px]" required />
                    <label htmlFor="type-agent">エージェント</label>

                </p>
                <p className='flex'>
                    <input id="type-recruiter" name="type" type='radio' value={'recruiter'}
                        className="mr-[8px]" required />
                    <label htmlFor="type-recruiter">採用者</label>
                </p>
                {/* {state?.errors?.name && <p>{state.errors.name}</p>} */}
            </div>
            <div className='mb-[16px]'>
                <label htmlFor="email" className='font-bold mb-[8px]'>メールアドレス</label>
                <input id="email" name="email" type="email" placeholder="taro@sample.com"
                    className="peer block w-[20em] rounded-md border border-gray-200 py-[8px] pl-[8px] text-sm outline-2 placeholder:text-gray-500" />
                {state?.errors?.email && <p>{state.errors.email}</p>}
            </div>
            <div className='mb-[24px]'>
                <label htmlFor="password" className='font-bold mb-[8px]' title='パスワードは8文字以上かつ英数字を各1文字以上使用してください'>パスワード <FaCircleQuestion className='inline align-text-top' /></label>
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