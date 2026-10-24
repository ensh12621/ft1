

import { ReactNode } from "react";



export default function Layout({
    children 
} : { children : ReactNode} ){
    return (
        <div>
            <header>
                <h1 className="hidden">헤더</h1>
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