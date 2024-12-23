'use client'
import React from 'react';
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "react-toastify";

type TemplateDeleteButtonProps = {
    templateId: string
}

const TemplateDeleteButton = ({templateId}: TemplateDeleteButtonProps) => {
    const router = useRouter();

    const handleDelete = async (templateId: string) => {
        try {
            await axios.delete("/api/templates", {data: {templateId}});
            router.refresh();
        } catch (error) {
            toast.error("删除失败,请稍后重试")
        }
    }
    return (
        <Button variant="destructive"
                onClick={() => handleDelete(templateId)}>删除</Button>
    );
};

export default TemplateDeleteButton;