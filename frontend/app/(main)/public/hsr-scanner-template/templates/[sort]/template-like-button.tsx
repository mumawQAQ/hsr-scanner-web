'use client';
import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {ThumbsUp} from "lucide-react";
import {cn} from "@/lib/utils";
import axios from "axios";
import {toast} from "react-toastify";
import {useAuth} from "@clerk/nextjs";

type TemplateLikeButtonProps = {
    templateId: string
    liked: boolean
    likeCount: number
}

const TemplateLikeButton = ({templateId, liked, likeCount}: TemplateLikeButtonProps) => {
    const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
    const [isLiked, setIsLiked] = useState(liked);
    const [loading, setLoading] = useState(false);
    const {userId} = useAuth()

    useEffect(() => {
        setCurrentLikeCount(likeCount);
        setIsLiked(liked);
    }, [likeCount, liked]);

    const handleLike = async () => {
        // check if user is logged in
        if (!userId) {
            toast.warning("请先登录, 再进行该操作");
            return;
        }

        if (loading) return;
        setLoading(true);
        try {
            const response = await axios.post('/api/templates/like', {templateId});
            const {isLiked: newLiked, likeCount: newLikeCount} = response.data;
            setIsLiked(newLiked);
            setCurrentLikeCount(newLikeCount);
        } catch (err) {
            console.error(err);
            toast.error("操作失败,请稍后重试");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center">
            <Button
                variant="link"
                size="icon"
                className={cn(isLiked && "text-red-600")}
                onClick={handleLike}
            >
                <ThumbsUp className="w-4 h-4"/>
            </Button>
            <span className="px-2">{currentLikeCount}</span>
        </div>
    );
};


export default TemplateLikeButton;