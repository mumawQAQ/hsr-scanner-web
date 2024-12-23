import {currentProfile} from "@/lib/current-profile";
import {db} from "@/lib/db";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    try {
        const profile = await currentProfile();
        const {templateId} = await req.json();

        if (!profile) {
            return new Response("Unauthorized", {status: 401});
        }

        if (!templateId) {
            return new Response("Template ID is required", {status: 400});
        }

        const existingLike = await db.profileLikeTemplate.findUnique({
            where: {
                profileId_templateId: {
                    profileId: profile.id,
                    templateId: templateId
                }
            }
        });

        let newLiked: boolean;
        let newLikeCount: number;

        if (existingLike) {
            // Unlike the template
            await db.profileLikeTemplate.delete({
                where: {
                    id: existingLike.id,
                },
            });

            // Decrement the likes count
            await db.hSRScannerTemplate.update({
                where: {id: templateId},
                data: {likes: {decrement: 1}},
            });

            // Get the updated like count
            const updatedTemplate = await db.hSRScannerTemplate.findUnique({
                where: {id: templateId},
                select: {likes: true},
            });

            newLiked = false;
            newLikeCount = updatedTemplate?.likes || 0;
        } else {
            // Like the template
            await db.profileLikeTemplate.create({
                data: {
                    profileId: profile.id,
                    templateId: templateId,
                },
            });

            // Increment the likes count
            await db.hSRScannerTemplate.update({
                where: {id: templateId},
                data: {likes: {increment: 1}},
            });

            // Get the updated like count
            const updatedTemplate = await db.hSRScannerTemplate.findUnique({
                where: {id: templateId},
                select: {likes: true},
            });

            newLiked = true;
            newLikeCount = updatedTemplate?.likes || 1;
        }

        return NextResponse.json({
            isLiked: newLiked,
            likeCount: newLikeCount
        })


    } catch (error) {
        console.log("[TEMPLATE_LIKE_POST]", error);
        return new Response("Internal Error", {status: 500});
    }

}