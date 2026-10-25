import { NextResponse } from "next/server";

export async function POST(request: Request) {


    const body = await request.json();
    const { userId, userPwd } = body;

    if (!userId || !userPwd) {
        return NextResponse.json({
            result: "failed", message: "empty field"
        }, { status: 400 });
    }

    
    const response = await fetch("http://localhost:8080/auth/login", {
        method:"post",
        headers: {
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
            userId,
            userPwd
        })
    });

    
    if(!response.ok){
        console.log("여기:" + response.status);
        console.log("여기: " + response.statusText);
        return NextResponse.json({
            result: "failed",
            message: response.statusText
        });
    }
    
    const data = await response.json();
    console.log("시작");
    console.log(data);

    if(data.result != "success"){
        return NextResponse.json({
            result: "failed",
            message: response.statusText
        });
    }

    const responseApi = NextResponse.json({
        result: "success"
    }, { status:200});

    responseApi.cookies.set({
        name: "accessToken",
        value: data.accessToken,
        httpOnly: true,
        secure : false,
        sameSite: "lax",
        path:"/",
        maxAge: 30
    });

    responseApi.cookies.set({
        name: "refreshToken",
        value: data.refreshToken,
        httpOnly : true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 10
    });
 
    return responseApi;
}