'use client'
import React from 'react';
import Typewriter from 'typewriter-effect';


const CustomTypewriter = () => {
    return (
        <div className="font-bold text-2xl">
            <Typewriter
                options={{
                    strings: ['HSR Scanner', '自动化崩铁遗器分析工具'],
                    autoStart: true,
                    loop: true,
                }}
            />
        </div>
    );
};

export default CustomTypewriter;