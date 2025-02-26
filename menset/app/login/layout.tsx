import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ログイン",
    description: "面接時間を調整します。",
};

export default function RootLayout({ children }) {
    return (
        <>
            {children} {/* これがないとページが表示されない */}
        </>
    );
}