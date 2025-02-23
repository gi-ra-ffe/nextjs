'use client'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
// 現時点で使わないものもあるが今後のことを考えて入れておく
// import { Col, Container, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";

// Firebaseの初期化を行うためfirebaseAppをインポート
import { firebaseApp } from '../../lib/FirebaseConfig';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); 

    // ユーザーがログインボタンを押したときにdoLogin関数が実行される
    const doLogin = () => {
        const auth = getAuth(firebaseApp);
        // const auth = getAuth();

        // Firebaseで用意されているメールアドレスとパスワードでログインするための関数
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // ログインができたかどうかをわかりやすくするためのアラート
                // alert('ログインOK!');
                console.log(user);
                router.push("/"); 
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className={'max-w-md'}>
            <h1>ログイン</h1>
            <div style={{ paddingBottom: "1rem" }}>
                <Form>
                    <FormGroup>
                        <Label>
                            メールアドレス：
                        </Label>
                        <Input
                            type="email"
                            name="email"
                            style={{ height: 40, fontSize: "1.2rem" }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            パスワード：
                        </Label>
                        <Input
                            type="password"
                            name="password"
                            autoComplete="current-password" 
                            style={{ height: 40, fontSize: "1.2rem" }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <Button
                        className="mt-3"
                        style={{ width: 220 }}
                        color="primary"
                        // ログインボタンがクリックされたときdoRegister関数が実行されるようにする
                        onClick={() => {
                            doLogin();
                        }}
                    >
                        ログイン
                    </Button>
                </Form>
            </div>
            <Link
                className="text-blue-500"
                href="/forgot_password">
                パスワードを忘れた場合
            </Link>
        </div>
    )
}