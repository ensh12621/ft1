import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {


    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const response = await fetch("http://localhost:8080/student/department-list", {
        method: "get",
        headers: {
            "Content-Type": "applicaiton/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        NextResponse.json({
            result: "failed",
        }, { status: response.status })

    }

    const data = await response.json();

    return NextResponse.json({
        data: data
    }, { status: 200});
}