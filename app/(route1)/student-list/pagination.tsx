import Link from "next/link";

interface PaginationProps{
    pageSize: number;
    totalPosts: number;
    currentPage:number;
    keyword:string;
    deptNo:string;
    orderBy:string;
}

export default function Pagination({pageSize, totalPosts, currentPage, deptNo, orderBy, keyword} : PaginationProps){


    const pageNumbers = [];

    console.log(`totalPosts: ${totalPosts}, pageSize: ${pageSize}`);

    const pageGroup = Math.ceil(currentPage / pageSize);
    console.log(`page group: ${pageGroup}`);
    let endPageNo = pageSize * pageGroup;
    let startPageNo = endPageNo - pageSize;
    const totalPages = Math.ceil(totalPosts / pageSize);
    if(endPageNo > totalPages){
        endPageNo = totalPages;
    }
    if(startPageNo < 1){
        startPageNo = 1;
    }

    for(let i=startPageNo; i<=totalPages;  i++){
        pageNumbers.push(i);

    }


    return (
        <div className="mt-10">
            <h1 className="hidden">페이지네이션</h1>

            <ul className="flex gap-5">
                {pageNumbers && pageNumbers.map((num, idx) =>
                    <li key={idx}
                        >
                        <Link
                            href={`?currentPage=${num}&deptNo=${deptNo}&keyword=${keyword}&orderBy=${orderBy}`}
                            className={num == currentPage? "text-green-500 font-bold" : ""}
                            >
                            {num}
                        </Link>
                    </li>
                )}
            </ul>

        </div>
    );
}

/*
pageSize={5}
                    totalPosts={count}
                    currentPage={currentPage}
                    keyword={keyword}
                    deptNo={deptNo}
                    orderBy={orderBy}
*/