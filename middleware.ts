import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    console.log("🔥 미들웨어 진입: /student-list");

    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    let newAccessToken = accessToken;

    // accessToken이 없고 refreshToken이 있는 경우 재발급 시도
    if (!accessToken && refreshToken) {
        console.log("미들웨어: AccessToken 만료 감지, Refreshing...");
        try {
            const formData = new URLSearchParams();
            formData.append("refreshToken", refreshToken);

            const refreshResponse = await fetch("http://localhost:8080/auth/refresh", {
                method: "post",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formData
            });

            if (refreshResponse.ok) {
                const data = await refreshResponse.json();
                newAccessToken = data.accessToken;
                console.log("미들웨어: 토큰 재발급 성공!");
            }
        } catch (err) {
            console.error("middleware refresh error", err);
        }
    }

    // 다음 컴포넌트로 요청을 넘길 때, 새로 발급받은 토큰을 헤더(혹은 쿠키)에 담아서 전달
    const response = NextResponse.next();
    
    if (newAccessToken && newAccessToken !== accessToken) {
        // 브라우저 쿠키도 갱신되도록 세팅
        response.cookies.set({
            name: "accessToken",
            value: newAccessToken,
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 30,
        });
    }

    return response;
}

export const config = {
    matcher: ['/student-list'],
};