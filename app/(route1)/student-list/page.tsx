import { Suspense } from "react";
import StudentList from "./studentList";

export default async function Page({
    searchParams
}: { searchParams: Promise<{keyword: string}>}){

    return (
        <div>
            <Suspense fallback={<span>로딩중...</span>}>
                <StudentList searchParams={searchParams} />
            </Suspense>
        </div>
    );
}