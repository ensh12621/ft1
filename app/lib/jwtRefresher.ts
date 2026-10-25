import { cookies } from "next/headers";

export async function refreshAccessToken() {


    const cookieStore = await cookies();
    const refreshCookie = cookieStore.get("refreshToken");
    if (!refreshCookie) {
        return null;
    }

    const refreshToken = refreshCookie.value;

    const formData = new URLSearchParams();
    formData.append("refreshToken", refreshToken);

    const response = await fetch(`http://localhost:8080/auth/refresh`, {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData

    });

    console.log("refresh 결과 대기 중..");
    if (response.ok) {
        
        const data = await response.json();
        const newAccessToken = data.accessToken;
       
        if(newAccessToken){
            cookieStore.set({
                name: "accessToken",
                value:newAccessToken,
                httpOnly:true,
                secure:false,
                sameSite:"lax",
                path:"/",
                maxAge: 30
            });
        }
        console.log("access token 재발급 완료");

        return true;
    }

    console.log("access token 재발급 실패");
    return false;

}