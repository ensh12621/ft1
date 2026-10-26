import { Suspense } from "react";
import StudentList from "./studentList";

export default async function Page({
    searchParams
}: { searchParams: Promise<{keyword: string}>}){

    const resolvedParams = await searchParams;
    const keyword = resolvedParams?.keyword || "";

    return (
        <div>
            <Suspense fallback={<span>로딩중...</span>}>
                <StudentList keyword={keyword} />
            </Suspense>
        </div>
    );
}