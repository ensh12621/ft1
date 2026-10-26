

import Link from "next/link";
import { ReactNode } from "react";



export default function Layout({
    children 
} : { children : ReactNode} ){
    return (
        <div>
            <header className="flex gap-5">
                <h1 className="hidden">헤더</h1>
                <Link href="/login">
                    로그인
                </Link>
                
                <Link href="/join">
                    회원가입
                </Link>

            </header>

            <main>
                {children}
            </main>

            <footer>
                <h1 className="hidden">푸터</h1>
            </footer>

        </div>
    );
}