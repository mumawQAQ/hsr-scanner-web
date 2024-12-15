"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {ChevronDown} from "lucide-react";
import React from "react";
import {useRouter} from "next/navigation";
import {ModeToggle} from "@/components/node-toggle";
import {UserButton} from "@clerk/nextjs";


export function AppSidebar() {
    const router = useRouter()


    const handleRoute = (path: string) => {
        router.push(path)
    }


    return (
        <Sidebar variant="inset">
            <SidebarHeader/>
            <SidebarContent>
                <Collapsible defaultOpen>
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                HSR Scanner
                                <ChevronDown
                                    className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"/>
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <Collapsible defaultOpen>
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton>
                                                    快速开始
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    <SidebarMenuSubItem>
                                                        <SidebarMenuButton onClick={() => {
                                                            handleRoute('/public/hsr-scanner/install')
                                                        }}>
                                                            安装
                                                        </SidebarMenuButton>
                                                    </SidebarMenuSubItem>
                                                </SidebarMenuSub>
                                                <SidebarMenuSub>
                                                    <SidebarMenuSubItem>
                                                        <SidebarMenuButton>
                                                            使用教程
                                                        </SidebarMenuButton>
                                                    </SidebarMenuSubItem>
                                                </SidebarMenuSub>
                                                <SidebarMenuSub>
                                                    <SidebarMenuSubItem>
                                                        <SidebarMenuButton>
                                                            常见问题
                                                        </SidebarMenuButton>
                                                    </SidebarMenuSubItem>
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                    <Collapsible defaultOpen>
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton>
                                                    开发指南
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    <SidebarMenuSubItem>
                                                        <SidebarMenuButton>
                                                            项目架构介绍
                                                        </SidebarMenuButton>
                                                    </SidebarMenuSubItem>
                                                </SidebarMenuSub>
                                                <SidebarMenuSub>
                                                    <SidebarMenuSubItem>
                                                        <SidebarMenuButton>
                                                            环境配置
                                                        </SidebarMenuButton>
                                                    </SidebarMenuSubItem>
                                                </SidebarMenuSub>
                                                <SidebarMenuSub>
                                                    <SidebarMenuSubItem>
                                                        <SidebarMenuButton>
                                                            常见问题
                                                        </SidebarMenuButton>
                                                    </SidebarMenuSubItem>
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                    <Collapsible defaultOpen>
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton>
                                                    关于
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    <SidebarMenuSubItem>
                                                        <SidebarMenuButton>
                                                            更新日志
                                                        </SidebarMenuButton>
                                                    </SidebarMenuSubItem>
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>

                    </SidebarGroup>
                </Collapsible>
                <Collapsible defaultOpen>
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                HSR Scanner 模板配置工具
                                <ChevronDown
                                    className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"/>
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <Collapsible defaultOpen>
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton>
                                                    工具
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    <SidebarMenuSubItem>
                                                        <SidebarMenuButton>
                                                            模板列表
                                                        </SidebarMenuButton>
                                                    </SidebarMenuSubItem>
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                    <Collapsible defaultOpen>
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton>
                                                    关于
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    <SidebarMenuSubItem>
                                                        <SidebarMenuButton>
                                                            更新日志
                                                        </SidebarMenuButton>
                                                    </SidebarMenuSubItem>
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>
            <SidebarFooter className="flex items-center">
                <ModeToggle/>
                <div>
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: {
                                    avatarBox: "h-[48px] w-[48px]",
                                }
                            }
                        }}
                    />
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
