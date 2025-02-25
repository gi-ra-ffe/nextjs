import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "新規アカウント登録",
    description: "MensetはメールアドレスとGoogleアカウントで登録できます。",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ja">
            <body>
                {children} {/* これがないとページが表示されない */}
            </body>
        </html>
    );
}