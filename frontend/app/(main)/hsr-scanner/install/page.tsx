import React from 'react';
import {Button} from "@/components/ui/button";
import {db} from "@/lib/db";
import CustomTypewriter from "@/components/custom-typewrite";

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
        <div className="flex flex-col items-center gap-2">
            <div>
                <CustomTypewriter/>
            </div>
            <div>
                <Button disabled={downloadDisable}>
                    {
                        latestDownloadUrl === "" ? (
                            <span>暂无下载方式</span>
                        ): (
                            <a href={latestDownloadUrl} download>
                                立即下载
                            </a>
                        )
                    }
                </Button>
            </div>
        </div>
    );
};

export default InstallPage;