import { getStudentCount, getStudentList } from "@/app/lib/student";
import SearchStudentContainer from "./searchStudentContainer";
import { Suspense } from "react";
import Pagination from "./pagination";

interface StudentType{
    stuno : string;
    deptName: string;
    grade : string;
    name : string;
    height: number;
    professorName: string;
}

export default async function StudentList({
    searchParams
} : { searchParams : Promise<{keyword: string, deptNo: string, orderBy: string, currentPage:number, pageSize: number}> }){

    // 1. searchParams를 안전하게 await 해서 키워드 추출
    const resolvedParams = await searchParams;
    const keyword = resolvedParams?.keyword || "";
    const deptNo = resolvedParams?.deptNo || "";
    const orderBy = resolvedParams?.orderBy || "dept";

    const currentPage = resolvedParams?.currentPage || 1;
    // const offset = resolvedParams?.offset || 0;
    const pageSize = resolvedParams?.pageSize || 3;

    // 2. 서버에서 학생 데이터 가져오기
    const data = await getStudentList(keyword, deptNo, orderBy, currentPage, pageSize);
    const list : StudentType[] = data?.list || [];

    

    const data2 = await getStudentCount(keyword, deptNo);
    let count = 0;
    if(data2){
        count = data2.count;
    }

    console.log(count);

    
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

            <div>
                <Pagination 
                    pageSize={3}
                    totalPosts={count}
                    currentPage={currentPage}
                    keyword={keyword}
                    deptNo={deptNo}
                    orderBy={orderBy}
                />

            </div>
        </section>
    );
}