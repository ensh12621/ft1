import { cookies } from "next/headers";

export async function getStudentList() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    console.log("lib/student.ts - 사용할 accessToken:", accessToken);

    const response = await fetch("http://localhost:8080/student/list", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        console.log("학생 목록 조회 실패:", response.status);
        return null;
    }

    return await response.json();
}