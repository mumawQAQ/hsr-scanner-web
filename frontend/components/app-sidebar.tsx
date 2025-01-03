"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import React from "react";
import {useRouter} from "next/navigation";
import {ModeToggle} from "@/components/node-toggle";
import {SignInButton, useAuth, UserButton} from "@clerk/nextjs";
import {ChevronDown} from "lucide-react";
import {Button} from "@/components/ui/button";


const HSR_SCANNER_PATH = '/public/hsr-scanner'

const HSR_SCANNER_MAP = {
    install: `${HSR_SCANNER_PATH}/install`,
    update_log: `${HSR_SCANNER_PATH}/update-log`,
    instruction: `${HSR_SCANNER_PATH}/instruction`,
}

const HSR_SCANNER_TEMPLATE_PATH = '/public/hsr-scanner-template'

const HSR_SCANNER_TEMPLATE_MAP = {
    templates: `${HSR_SCANNER_TEMPLATE_PATH}/templates/hot`,
    update_log: `${HSR_SCANNER_TEMPLATE_PATH}/update-log`,
}

type sidebarRouteType = { name: string, subTriggers: { name: string, routes: { name: string, path: string }[] }[] }

const SIDEBAR_ROUTES: sidebarRouteType[] = [
    {
        name: 'HSR Scanner',
        subTriggers: [
            {
                name: '快速开始',
                routes: [
                    {
                        name: '安装',
                        path: HSR_SCANNER_MAP.install
                    },
                    {
                        name: '使用教程',
                        path: HSR_SCANNER_MAP.instruction
                    },
                    {
                        name: '常见问题',
                        path: ''
                    }
                ]
            },
            {
                name: '开发指南',
                routes: [
                    {
                        name: '项目架构介绍',
                        path: ''
                    },
                    {
                        name: '环境配置',
                        path: ''
                    },
                    {
                        name: '常见问题',
                        path: ''
                    }
                ]

            },
            {
                name: '关于',
                routes: [
                    {
                        name: '更新日志',
                        path: HSR_SCANNER_MAP.update_log
                    }
                ]
            }
        ]
    },
    {
        name: 'HSR Scanner 模板配置工具',
        subTriggers: [
            {
                name: '工具',
                routes: [
                    {
                        name: '模板列表',
                        'path': HSR_SCANNER_TEMPLATE_MAP.templates
                    },
                ]
            },
            {
                name: '关于',
                routes: [
                    {
                        name: '更新日志',
                        path: HSR_SCANNER_TEMPLATE_MAP.update_log
                    }
                ]
            }
        ]
    }
]

export function AppSidebar() {
    const router = useRouter()
    const {userId} = useAuth()


    const handleRoute = (path: string) => {
        router.push(path)
    }

    return (
        <Sidebar variant="inset">
            <SidebarHeader/>
            <SidebarContent>
                {SIDEBAR_ROUTES.map((route, index) => (
                    <Collapsible key={index} defaultOpen>
                        <SidebarGroup>

                            <SidebarGroupLabel asChild>
                                <CollapsibleTrigger>
                                    {route.name}
                                    <ChevronDown
                                        className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"/>
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {route.subTriggers.map((sub, subIndex) => (
                                        <Collapsible key={subIndex} defaultOpen>
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton>{sub.name}</SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {sub.routes.map((item, itemIndex) => (
                                                            <SidebarMenuSubItem key={itemIndex}>
                                                                <SidebarMenuButton
                                                                    onClick={() => handleRoute(item.path)}>
                                                                    {item.name}
                                                                </SidebarMenuButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))}
            </SidebarContent>
            <SidebarFooter className="flex items-center">
                <ModeToggle/>
                <div>
                    {
                        userId ? (<UserButton
                            appearance={{
                                elements: {
                                    avatarBox: {
                                        avatarBox: "h-[48px] w-[48px]",
                                    }
                                }
                            }}
                        />) : (
                            <SignInButton>
                                <Button variant="link">登录</Button>
                            </SignInButton>
                        )
                    }

                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
