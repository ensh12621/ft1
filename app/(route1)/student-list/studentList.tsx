import { getStudentList } from "@/app/lib/student";
import { redirect } from "next/navigation";
import SearchStudentContainer from "./searchStudentContainer";
import { Suspense } from "react";

interface StudentType{
    stuno : string;
    birthday: string;
    deptName: string;
    grade: number;
    height: number;
    weight: number;
    id: string;
    jumin: string;
    name: string;
    professorName: string;
    tel: string;
}

interface StudentListProps{
    keyword: string;
}

export default async function StudentList({keyword} : StudentListProps){


    console.log("StudentList - keyword 값: " + keyword);


    const data = await getStudentList(keyword);
    let list = null;
    if(data){
        list = data.list;
    }
    
    return (
        <section>
            <h1 className="hidden">학생목록</h1>

            <Suspense fallback={<div>로딩중..</div>}>
                <SearchStudentContainer />
            </Suspense>

            <table>
                <thead>
                    <tr>
                        <th className="p-2 border">
                            학번
                        </th>
                        <th className="p-2 border">
                            학과
                        </th>
                        <th className="p-2 border">
                            학년
                        </th>
                        <th className="p-2  border" >
                            이름
                        </th>
                        <th className="p-2 border">
                            키
                        </th>
                        <th className="p-2 border">
                            담임교수
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {list && list.map(item => (
                        <tr key={item.stuno}>
                            <td  className="p-2 border">
                                {item.stuno}
                            </td>
                            <td className="p-2 border">
                                {item.deptName}
                            </td>
                            <td className="p-2 border">
                                {item.grade}
                            </td>
                            <td className="p-2 border">
                                {item.name}
                            </td>
                            <td className="p-2 border">
                                {item.height}
                            </td>
                            <td className="p-2 border">
                                {item.professorName}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </section>
    );
}