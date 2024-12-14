'use client'
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Check, Copy} from "lucide-react";

const code = "_Td6WFoAAATm1rRGAgAhARwAAAAQz1jM4BkiA89dAEIoScqSVOZ0UWmgyqScPHWMPFGRa7nOsi-XIpusXknkuqKgDkHEFMFS5JIW0enJZ6hBCDsFXx1eCaZjsOl0vXZDO_rr0eH_i7aujl4-qgNSjVHy1IW18baXkpdMkr_Zx49GK6lL_ojANITjTtxfcbxPE9OU1sLFCZ-uvCzWKAmhjFOdjoPFcIkY2sr8Twt4I08Ej4ab-Xgi-pX7N49Z7Ij0UmJVWXpbSt0nl5XLPypb6-rib2skxrdm7j72fTjjDPApo2DlIYlWrxLxXcQ8xiCTecCXKdhDkwqb6abzA4TRZggofQNx_cAF21b1HsooivUL_kE9gbmI9OJQMwj6lxsmQe7zbCdS8UeOCYlClcLhXjLzKSZjG14G7JEDZzIA1jDVYmMryuLY0UTO77jJcxterPH1u6cq8ewLrtaiFp8LgLm5QW1oEBlGeLmPV5Y0yg77bFgYPmmnGkzoSXyzaQDBzqJXzzASQZxxNB8Wiu-hA5J6XOvMFHs1Kf5z_SYU533D5-tfXSeNSey9QR7BY_F5Kb8hPthoESyksSPrdLTt_WPdMkd9o3N9adH1T4dq4gcNnkxlOhqn9RqiOX6HtKPCM0OC9Obj8R67SJ7HAw_I0HiAxob1QdaRW0-SdEv1oMEVxqqXNhl_6tQpUSU_vcfFLMG314Z11XjdQDAwJGMnGKDfQh5hCJArf3mChELN6-YFy4wn-Lze0s0Ve7_9oJVT4OpRH2d9zTkKlkVpE3cM-IkAzSx7Q3Y2hJlzKNfhk7Eahr8-6kayy_mX3yUuVjWO_Od_8g2LPckWyFT4BbNVRcjin0sbg9o2DSfcpoiqytLScNyiyYLPjPUCOdy8uimTwqCSTo5r75kBtN5kf-iow9amf72Be3pD8DpUW4p4DAifdX9q4ueE6ZLtBi5-kYfJ1lBWmaO0lNz2cV6QDqP_xmKpzMW3McWHw29MfGhJzqyNV0WPFcRSVc9gxXafbNLacLtyZvWTZTxoWLVibBmwXUC_DdnZkptqjGt8xV4yCB1r2TVQeQqH0hFJUdQOIucCkh4N49xaGQ6ObE1MktZ1zyK2TykhhSZu1GvWXyJPJI5tuLyaLZMI80K3oTpiZ4BxDCFe7jxws0KixfRkD9DjTwi70BTEf0bsPDI73Rzh8hBmgyKBvp1S77ckZZY0gnbJyNcZVnbPnuvmmPBtTIpPp5MVhDb836aXRGkKiKfqZLycmaZ9iN524MHJzNhw53ZMKbZ7u4aUwWta2kaOP3bl7kjQ7yxk6siw_W57DNhrjDbzDTQ8SKAtmUXOxKx9_QAAWcPt-1JiAfMAAesHozIAAJlkx3WxxGf7AgAAAAAEWVo="

const TemplateCode = () => {
    const [copied, setCopied] = useState(false);

    const onCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <Button onClick={onCopy}>
            {copied
                ? <Check className="w-4 h-4"/>
                : <Copy className="w-4 h-4"/>
            }
            点击复制模板代码 (暂时放在这里，以后会移到模板列表)
        </Button>
    );
};

export default TemplateCode;