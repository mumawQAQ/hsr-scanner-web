import React from 'react';
import {Button} from "@/components/ui/button";
import {db} from "@/lib/db";
import CustomTypewriter from "@/components/custom-typewrite";
import Image from "next/image";

export const dynamic = 'force-dynamic'
const InstallPage = async () => {

    let latestVersion = await db.hSRScannerVersion.findFirst({
        where: {
            isLatest: true
        }
    });

    if (!latestVersion) {
        console.warn("No latest version marked. Falling back to the most recently created version.");

        // Find the most recently created version
        latestVersion = await db.hSRScannerVersion.findFirst({
            orderBy: {
                createAt: 'desc'
            }
        });
    }

    const latestDownloadUrl = latestVersion ? latestVersion.downloadUrl : ""
    const downloadDisable = latestDownloadUrl === ""


    return (
        <div className="flex flex-col items-center gap-4">
            <div>
                <CustomTypewriter/>
            </div>
            <div>
                <Button disabled={downloadDisable}>
                    {
                        latestDownloadUrl === "" ? (
                            <span>暂无下载方式</span>
                        ) : (
                            <a href={latestDownloadUrl} download>
                                立即下载
                            </a>
                        )
                    }
                </Button>
            </div>
            <div className="shadow-2xl rounded-md overflow-hidden shadow-black dark:shadow-white">
                <Image
                    src="/images/hsr-scanner-preview.png"
                    alt="preview"
                    width={900}
                    height={900}
                />
            </div>
        </div>
    );
};

export default InstallPage;