import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getStudentList(keyword : string, deptNo: string, orderBy: string) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    //console.log("lib/student.ts - 사용할 accessToken:", accessToken);

    const response = await fetch(`http://localhost:8080/student/search?keyword=${keyword}&deptNo=${deptNo}&orderBy=${orderBy}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });


    if(!response.ok){
        console.log("여기 에러");
        console.error(response.status)
        console.error(response.statusText);
        //redirect("/login");
    }
    


    return await response.json();
}