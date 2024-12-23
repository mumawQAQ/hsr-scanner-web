"use client"
import React from 'react';
import {useModal} from "@/hooks/use-modal";

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useAuth} from "@clerk/nextjs";
import {toast} from "react-toastify";
import axios from "axios";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "模板名称不能为空"
    }).max(10, {
        message: "模板名称不能超过10个字符"
    }),

    description: z.string().min(1, {
        message: "模板描述不能为空"
    }).max(10, {
        message: "模板描述不能超过10个字符"
    }),

    code: z.string().min(1, {
        message: "模板代码不能为空"
    })

})

const CreateTemplateModal = () => {
    const {isOpen, onClose, type} = useModal();
    const router = useRouter();
    const isModalOpen = isOpen && type === "createTemplate";
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            code: ""
        }
    })
    const isLoading = form.formState.isSubmitting
    const {userId} = useAuth()

    if (!userId && isModalOpen) {
        toast.warning("请先登录后创建模板");
        return;
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/templates", values);
            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            toast.error("创建失败,请稍后重试")
            console.log(error)
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className=" p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">创建模板</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>模板名称</FormLabel>
                                        <FormControl>
                                            <Input placeholder="输入模板名称" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>模板描述</FormLabel>
                                        <FormControl>
                                            <Input placeholder="输入模板描述" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="code"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>模板代码</FormLabel>
                                        <FormControl>
                                            <Input placeholder="输入模板代码" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="px-6 py-4">
                            <Button type='submit' variant="secondary" disabled={isLoading}>
                                创建
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTemplateModal;