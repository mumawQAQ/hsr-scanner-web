import React from 'react';
import {db} from "@/lib/db";
import ReactMarkdown from "react-markdown";

export const dynamic = 'force-dynamic'

const UpdateLogPage = async () => {
    const hsr_scanner_update_logs = await db.hSRScannerUpdateLog.findMany()

    return (
        <div className="px-5">
            <article className="prose prose-stone dark:prose-invert divide-y"> {
                hsr_scanner_update_logs.map((log) => {
                    return (
                        <div key={log.id}>
                            <h3>
                                v{log.version} - {log.createAt.toDateString()}
                            </h3>
                            <ReactMarkdown>
                                {log.log}
                            </ReactMarkdown>
                        </div>
                    )
                })
            }
            </article>
        </div>
    );
};

export default UpdateLogPage;