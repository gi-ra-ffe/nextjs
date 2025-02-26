"use client"

import React, { useContext, useState, useEffect, useRef } from 'react'
import { firebaseAuth, db } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
// import { doc, getDoc } from 'firebase/firestore'

// AuthContext の型を定義
interface AuthContextType {
    currentUser: User | null;
}

// コンテキストを作成
const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth() {
    // useContextで作成したコンテキストを呼び出す
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // 第2引数に[]を指定して、初回レンダリングのみ関数を実行させる
    useEffect(() => {
        // onAuthStateChangedでログインの状態を監視する
        const unsubscribe = onAuthStateChanged(firebaseAuth, async user => {
            // ユーザー情報をcurrentUserに格納する
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser
    }

    // _app.jsで全コンポーネントをラッピングするためのプロバイダー
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
