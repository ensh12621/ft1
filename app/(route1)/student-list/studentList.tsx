import { getStudentList } from "@/app/lib/student";
import SearchStudentContainer from "./searchStudentContainer";
import { Suspense } from "react";

export default async function StudentList({
    searchParams
} : { searchParams : Promise<{keyword: string}> }){

    // 1. searchParams를 안전하게 await 해서 키워드 추출
    const resolvedParams = await searchParams;
    const keyword = resolvedParams?.keyword || "";
    const deptNo = resolvedParams?.deptNo || "";

    // 2. 서버에서 학생 데이터 가져오기
    const data = await getStudentList(keyword, deptNo);
    const list = data?.list || [];

    console.log(data);
    
    return (
        <section>
            <h1 className="hidden">학생목록</h1>

            {/* 검색창 컴포넌트 렌더링 */}
            <SearchStudentContainer />

            <table>
                <thead>
                    <tr>
                        <th className="p-2 border">학번</th>
                        <th className="p-2 border">학과</th>
                        <th className="p-2 border">학년</th>
                        <th className="p-2 border">이름</th>
                        <th className="p-2 border">키</th>
                        <th className="p-2 border">담임교수</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(item => (
                        <tr key={item.stuno}>
                            <td className="p-2 border">{item.stuno}</td>
                            <td className="p-2 border">{item.deptName}</td>
                            <td className="p-2 border">{item.grade}</td>
                            <td className="p-2 border">{item.name}</td>
                            <td className="p-2 border">{item.height}</td>
                            <td className="p-2 border">{item.professorName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}