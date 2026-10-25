"use client"

import Button1 from "@/app/component/button1";
import Input1 from "@/app/component/input1";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {

    const [userId, setUserId] = useState("");
    const [userPwd, setUserPwd] = useState("");

    const router = useRouter();



    const handleLogin = async () => {
        if(userId == "" || userPwd == ""){
            alert("아이디와 비밀번호 모두 입력해주세요");
            return;
        }

        const response = await fetch("api/auth/login",{
            method: "post",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                userId,
                userPwd
            })

        });

        const data = await response.json();
        

        if(data.result == "success"){
            alert("로그인 성공");
            router.push("/student-list");
        }

    };

    return (
        <section>
            <h1 className="hidden">로그인 폼</h1>

            <div className="flex flex-col gap-3 w-2/10 m-auto mt-15">
                <span className="text-2xl font-bold">
                    로그인
                </span>

                <div>
                    <label htmlFor="user-id">
                        아이디:
                    </label>
                    <Input1
                        placeholder="아이디를 입력해주세요"
                        id="user-id"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                        type="text"
                    />
                </div>

                <div>
                    <label htmlFor="user-pwd">
                        비밀번호:
                    </label>
                    <Input1
                        placeholder="비밀번호를 입력해주세요"
                        id="user-pwd"
                        value={userPwd}
                        onChange={e => setUserPwd(e.target.value)}
                        type="password"
                    />
                </div>

                <div className="flex gap-3 items-center">
                    <Button1 
                        value="로그인"
                        onClick={handleLogin}
                        extraCss="bg-blue-500 text-white"
                    />
                    <Link href={"/join"}
                        className="text-green-500">
                        가입하러 가기
                    </Link>

                    

                </div>


            </div>




        </section>

    );
}
