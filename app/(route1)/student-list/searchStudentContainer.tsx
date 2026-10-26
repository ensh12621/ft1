"use client";

import { ChangeEvent, Suspense } from "react";
import Button1 from "@/app/component/button1";
import Input1 from "@/app/component/input1";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface DepartmentType{
    deptno: number;
    dname: string;
    build: string;
}


// 1. 실제 검색 로직과 useSearchParams를 사용하는 내부 컴포넌트
function SearchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const searchParamsKeyword = searchParams.get("keyword") || "";

    const searchParamsDepartment = searchParams.get("deptNo") || "";

    const [deptNo, setDeptNo] = useState("");
    const [departmentList, setDepartmentList] = useState<DepartmentType[]>([]);

    const [keyword, setKeyword] = useState(searchParamsKeyword);

    useEffect(() => {
        setKeyword(searchParamsKeyword);
    }, [searchParamsKeyword]);

    useEffect(() => {
        setDeptNo(searchParamsDepartment);
    }, [searchParamsDepartment]);

    const submitKeyword = () => {
        //if (keyword.trim().length === 0) return;
        router.push(`/student-list?keyword=${encodeURIComponent(keyword)}&deptNo=${deptNo}`);
    };

    
    useEffect(() => {
        async function fetchDepartment(){
            try{
                const response = await fetch("/api/student/get-departments");
                const data = await response.json();
                const list = data.data.list;
                setDepartmentList(list);
            }catch(err){
                console.log(err);
            }
        }

        fetchDepartment();
    }, []);

    const handleDepartmentChange = (e:ChangeEvent<HTMLSelectElement>) => {
        router.push(`/student-list?keyword=${encodeURIComponent(keyword)}&deptNo=${e.target.value}`);
    };

    


    return (
        <div>


            <div className="flex gap-2 items-center">
                <label htmlFor="search">검색</label>
                <Input1
                    id="search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submitKeyword()}
                />

                <Button1
                    value="검색"
                    onClick={submitKeyword}
                    extraCss="bg-blue-500 text-white"
                />
            </div>
            <div>
                <select
                    value={deptNo}
                    onChange={handleDepartmentChange}>
                        <option value="">전체</option>


                    {departmentList && departmentList.map((item, index) => (
                        <option 
                            key={item.deptno}
                            value={item.deptno}>
                            {item.dname}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

// 2. 다른 곳에서 불러다 쓰는 메인 컴포넌트 (반드시 Suspense로 감싸야 함)
export default function SearchStudentContainer() {
    return (
        <div className="my-5">
            <h1 className="hidden">검색 영역</h1>
            <Suspense fallback={<div>검색창 로딩 중...</div>}>
                <SearchContent />
            </Suspense>
        </div>
    );
}