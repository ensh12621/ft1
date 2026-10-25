"use client"

import Button1 from "@/app/component/button1";
import ColorButton1 from "@/app/component/button1";
import Input1 from "@/app/component/input1";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";


function Wrapper({
    children
}: { children: ReactNode }) {
    return (
        <div className="w-full flex flex-col">
            {children}
        </div>
    );
}

export default function JoinForm() {

    const [userId, setUserId] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [userPwd2, setUserPwd2] = useState("");

    const router = useRouter();


    const submitForm = async () => {
        if (userId == "" || userPwd == "" || userPwd2 == "") {
            alert("모든 값을 입력해주세요");
            return;
        }

        if (userPwd != userPwd2) {
            alert("비밀번호와 비밀번호 재입력 값을 똑같이 해주세요.");
            return;
        }

        const response = await fetch("/api/auth/join", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                userPwd
            })

        });

        const data = await response.json();

        console.log(data.result);

        if (data.result == "success") {
            alert("가입 완료");
            router.push("/login");
        } else {
            alert("가입 실패");

        }
    };

    const goToLogin = () => {
        router.push("/login")
    };

    return (
        <section>
            <h1 className="hidden">조인</h1>


            <div className="flex flex-col gap-5 w-2/10 m-auto mt-10 ">
                <span className="text-4xl font-bold">
                    회원가입
                </span>

                <Wrapper>

                    <label htmlFor="user-id" className="text-2xl font-bold">
                        아이디
                    </label>
                    <Input1
                        type="text"
                        id="user-id"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                        placeholder="아이디 입력"
                    />
                </Wrapper>

                <Wrapper>
                    <label htmlFor="user-pwd" className="text-2xl font-bold">
                        비밀번호
                    </label>
                    <Input1
                        type="password"
                        id="user-pwd"
                        placeholder="비밀번호 입력"
                        value={userPwd}
                        onChange={e => setUserPwd(e.target.value)}
                    />
                </Wrapper>

                <Wrapper>
                    <label htmlFor="user-pwd2" className="text-2xl font-bold">
                        비밀번호 재입력
                    </label>
                    <Input1
                        type="password"
                        id="user-pwd2"
                        placeholder="비밀번호 재입력"
                        value={userPwd2}
                        onChange={e => setUserPwd2(e.target.value)}
                    />
                </Wrapper>

                <Wrapper >
                    <div className="flex flex-col gap-2">
                        <Button1
                            value="가입하기"
                            onClick={submitForm}
                            extraCss="bg-blue-500 text-white" />

                        <Button1
                            value="로그인하러 가기"
                            onClick={goToLogin}
                            extraCss="bg-green-500 text-white" />
                    </div>

                </Wrapper>
            </div>



        </section>
    );
}