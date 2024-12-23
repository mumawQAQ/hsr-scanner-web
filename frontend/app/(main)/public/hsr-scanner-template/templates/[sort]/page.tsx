import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import TemplateCode from "@/components/template-code";
import {Button} from "@/components/ui/button";
import {ThumbsUp} from "lucide-react";
import TemplateSortButton from "@/components/template-sort-button";
import {db} from "@/lib/db";
import CreateTemplateButton from "@/components/create-template-button";

type TemplatesPageProps = {
    params: Promise<{
        sort: string
    }>
}

const TemplatesPage = async ({params}: TemplatesPageProps) => {
    const {sort} = await params;
    const sortBy = sort === "hot" ? "likes" : "createAt";


    const templates = await db.hSRScannerTemplate.findMany({
        orderBy: {
            [sortBy]: "desc"
        }
    })


    return (
        <div>
            <div className="flex justify-end mr-3 items-center">
                <CreateTemplateButton/>
                <TemplateSortButton sort={sort}/>
            </div>
            <div className="flex flex-wrap gap-4">
                {
                    templates.map((template) => (
                        <Card key={template.id} className="w-[350px]">
                            <CardHeader>
                                <CardTitle>{template.title}</CardTitle>
                                <CardDescription>{template.desc}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-center">
                                <TemplateCode code={template.code}/>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <div className="flex items-center">
                                    <Button variant="outline" size="icon">
                                        <ThumbsUp className="w-4 h-4"/>
                                    </Button>
                                    <span className="px-2">{template.likes}</span>
                                </div>
                                <Button variant="destructive">删除</Button>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </div>
    );
};

export default TemplatesPage;