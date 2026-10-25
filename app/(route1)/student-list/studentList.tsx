import { getStudentList } from "@/app/lib/student";
import { redirect } from "next/navigation";

export default async function StudentList(){


    const list = await getStudentList();
    if(list == null){
        redirect("/login");
    }
    console.log(list);

    return (
        <section>
            <h1>학생목록</h1>
        </section>
    );
}