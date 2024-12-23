import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import TemplateCode from "@/components/template/template-code";
import TemplateSortButton from "@/components/template/template-sort-button";
import {db} from "@/lib/db";
import CreateTemplateButton from "@/components/create-template-button";
import TemplateDeleteButton from "@/components/template/template-delete-button";
import {auth} from "@clerk/nextjs/server";
import TemplateLikeButton from "@/components/template/template-like-button";

type TemplatesPageProps = {
    params: Promise<{
        sort: string;
    }>;
};

const TemplatesPage = async ({params}: TemplatesPageProps) => {
    const {sort} = await params;
    const {userId} = await auth();

    const sortBy = sort === "hot" ? "likes" : "createAt";

    const templates = await db.hSRScannerTemplate.findMany({
        orderBy: {
            [sortBy]: "desc",
        },
        include: {
            profile: true,
            likedBy: userId
                ? {
                    where: {profile: {userId: userId}},
                    select: {id: true},
                }
                : false,
        },
    });

    return (
        <div>
            <div className="flex justify-end mr-3 items-center">
                <CreateTemplateButton/>
                <TemplateSortButton sort={sort}/>
            </div>
            <div className="flex flex-wrap gap-4">
                {templates.map((template) => (
                    <Card key={template.id} className="w-[350px]">
                        <CardHeader>
                            <CardTitle>{template.title}</CardTitle>
                            <CardDescription>{template.desc}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <TemplateCode code={template.code}/>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <div>
                                <TemplateLikeButton
                                    templateId={template.id}
                                    liked={template.likedBy?.length > 0}
                                    likeCount={template.likes}
                                />
                            </div>
                            {template.profile.userId === userId && (
                                <TemplateDeleteButton templateId={template.id}/>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TemplatesPage;
