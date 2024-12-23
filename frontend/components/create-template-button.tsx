"use client"
import React from 'react';
import {Button} from "@/components/ui/button";
import {useModal} from "@/hooks/use-modal";

const CreateTemplateButton = () => {
    const modalHook = useModal();
    const handleCreateTemplate = () => {
        modalHook.onOpen("createTemplate");
    }
    return (
        <Button variant="link" onClick={handleCreateTemplate}>创建新模板</Button>
    );
};

export default CreateTemplateButton;