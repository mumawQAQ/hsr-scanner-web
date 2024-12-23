import {currentProfile} from "@/lib/current-profile";
import {db} from "@/lib/db";
import {NextResponse} from "next/server";

export async function DELETE(req: Request) {
    try {
        const profile = await currentProfile();
        const {templateId} = await req.json();

        if (!profile) {
            return new Response("Unauthorized", {status: 401});
        }

        // check if template belongs to user
        const template = await db.hSRScannerTemplate.findUnique({
            where: {
                id: templateId,
                profile: {
                    userId: profile.userId
                }
            }
        });

        if (!template) {
            return new Response("Unauthorized", {status: 401});
        }

        await db.hSRScannerTemplate.delete({
            where: {
                id: templateId
            }
        })

        return new Response("OK", {status: 200});
    } catch (error) {
        console.log("delete template", error);
        return new Response("Internal Server Error", {status: 500});
    }
}

export async function POST(req: Request) {
    try {
        const profile = await currentProfile();
        const {title, description, code} = await req.json();

        if (!profile) {
            return new Response("Unauthorized", {status: 401});
        }

        if (!title) {
            return new Response("Title is required", {status: 400});
        }

        if (!description) {
            return new Response("Description is required", {status: 400});
        }

        if (!code) {
            return new Response("Code is required", {status: 400});
        }

        const template = await db.hSRScannerTemplate.create({
            data: {
                title,
                desc: description,
                code,
                profileId: profile.id
            }
        });

        return NextResponse.json(template)

    } catch (error) {
        console.log("create template", error);
        return new Response("Internal Server Error", {status: 500});
    }
}