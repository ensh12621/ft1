import { cookies } from "next/headers";
import { refreshAccessToken } from "./jwtRefresher";

export async function getStudentList(keyword : string) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    //console.log("lib/student.ts - 사용할 accessToken:", accessToken);

    const response = await fetch(`http://localhost:8080/student/search?keyword=${keyword}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });


    return await response.json();
}