'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Contextを作成
const LikesContext = createContext();

// Contextプロバイダーを作成
export function LikesProvider({ children }) {
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        // ローカルストレージから値を取得
        const savedLikes = localStorage.getItem('likes');
        if (savedLikes !== null) {
            setLikes(Number(savedLikes));
        }
    }, []);

    useEffect(() => {
        // likesが変更されたらローカルストレージに保存
        localStorage.setItem('likes', likes);
    }, [likes]);

    return (
        <LikesContext.Provider value={{ likes, setLikes }}>
            {children}
        </LikesContext.Provider>
    );
}

// カスタムフックを作成
export function useLikes() {
    return useContext(LikesContext);
}
