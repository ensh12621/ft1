import { NextResponse } from "next/server";

export async function POST(request : Request){
    
    const body = await request.json();    
    const {userId, userPwd} = body;

    if(!userId || !userPwd){
        return NextResponse.json({
            result:"failed", message:"empty field"
        }, { status: 400});
    }

    const response = await fetch("http://localhost:8080/auth/join", {
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
        console.log(response.status);
        console.log(response.statusText);
        return NextResponse.json({
            result: "failed",
            message: response.statusText
        });
    }

    const data = await response.json();
    console.log(data);

    return NextResponse.json({
        result: data.result
    }, {
        status: 200
    });

}