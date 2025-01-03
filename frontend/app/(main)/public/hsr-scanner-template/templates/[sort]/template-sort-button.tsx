'use client'
import React from 'react';
import {AlignJustify} from "lucide-react";
import {useRouter} from "next/navigation";

type TemplateSortButtonProps = {
    sort: string;
}

const TemplateSortButton = ({sort}: TemplateSortButtonProps) => {
    const router = useRouter();
    const handleSort = () => {
        if (sort === "hot") {
            router.push("/public/hsr-scanner-template/templates/time");
        } else {
            router.push("/public/hsr-scanner-template/templates/hot");
        }
    }

    return (
        <div>
            {
                sort === "hot" ?
                    <div className="flex items-center gap-2 ml-4 hover:cursor-pointer select-none"
                         onClick={handleSort}>
                        <AlignJustify className="w-4 h-4"></AlignJustify>
                        <span>按热度</span>
                    </div> :
                    <div className="flex items-center gap-2 ml-4 hover:cursor-pointer select-none"
                         onClick={handleSort}>
                        <AlignJustify className="w-4 h-4"></AlignJustify>
                        <span>按时间</span>
                    </div>
            }

        </div>
    );
};

export default TemplateSortButton;