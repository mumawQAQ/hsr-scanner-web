'use client'
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Check, Copy} from "lucide-react";

type TemplateCodeProps = {
    code: string
}

const TemplateCode = ({code}: TemplateCodeProps) => {
    const [copied, setCopied] = useState(false);

    const onCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <Button onClick={onCopy}>
            {copied
                ? <Check className="w-4 h-4"/>
                : <Copy className="w-4 h-4"/>
            }
            点击复制
        </Button>
    );
};

export default TemplateCode;