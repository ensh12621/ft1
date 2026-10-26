"use client"

import Button1 from "@/app/component/button1";
import Input1 from "@/app/component/input1";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchStudentContainer() {

    const searchParams = useSearchParams();
    const searchParamsKeyword = searchParams.get("keyword");
    let keywordInitialValue = "";
    if (searchParamsKeyword) {
        keywordInitialValue = searchParamsKeyword;
    }

    const [keyword, setKeyword] = useState(keywordInitialValue);
    const router = useRouter();

    const searchKeyword = () => {

        submitKeyword();
    };

    const handleEnter = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key == "Enter"){
            submitKeyword();
        }
    };

    const submitKeyword = () => {
        if (keyword && keyword.length == 0) {
            return;
        }

        router.push(`/student-list?keyword=${keyword}`);
    };

    return (
        <div className="my-5">
            <h1 className="hidden">검색 영역</h1>

            <div className="flex gap-2 items-center">
                <label htmlFor="search">
                    검색
                </label>
                <Input1
                    id="search"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    onKeyDown={handleEnter}
                />
                <Button1
                    value="검색"
                    onClick={searchKeyword}
                    extraCss="bg-blue-500 text-white"
                />
            </div>
        </div>
    );

}