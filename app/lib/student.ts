import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getStudentList(keyword: string, deptNo: string, orderBy: string, currentPage: number, pageSize: number) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    //console.log("lib/student.ts - 사용할 accessToken:", accessToken);

    const response = await fetch(`http://localhost:8080/student/search?keyword=${keyword}&deptNo=${deptNo}&orderBy=${orderBy}&currentPage=${currentPage}&pageSize=${pageSize}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });


    if (!response.ok) {
        console.log("여기 에러");
        console.log(response.status)
        console.log(response.statusText);
        //redirect("/login");
    }



    return await response.json();
}

export async function getStudentCount(keyword: string, deptNo: string) {

    console.log("frontend - getstudentCount() 호출중..");
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;


    const res = await fetch(`http://localhost:8080/student/search-count?keyword=${keyword}&deptNo=${deptNo}`, {
        method: "get",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    if (!res.ok) {
        console.log("getStudentCount 에러")
        console.log(res.status);
        console.log(res.statusText);
        return null;
    }

    const data = await res.json();
    // console.log(data);
    return data;
}