"use client"
import React, {useEffect, useState} from 'react';
import CreateTemplateModal from "@/components/modals/create-template-modal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }


    return (
        <>
            <CreateTemplateModal/>
        </>
    );
};

export default ModalProvider;