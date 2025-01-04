import React from 'react';
import Image from "next/image";

const InstructionPage = () => {
    return (
        <div className="container mx-auto px-4 py-4">
            <article className="prose prose-stone dark:prose-invert max-w-none">
                <h1>开始使用HSR Scanner</h1>
                <p>
                    HSR Scanner是一款基于计算机视觉的遗器分析工具，可以根据模板对遗器进行分析，帮助你更快的清理遗器。
                </p>
                <h2>如何安装</h2>
                <ol>
                    <li>在左侧导航栏中选择快速开始下的安装，点击立即下载获取最新的安装包。</li>
                    <li>双击安装包，并开始安装。</li>
                    <li>在看到这个界面时，注意安装的路径中不要包含任何中文包括中文字符，否则在后续过程中可能会报错。
                        <Image src="/images/hsr-scanner-install.png" alt={"安装图片"} height={600} width={600}/>
                    </li>
                    <li>然后一路点击next和install即可完成安装。</li>
                    <li>在安装完成后，在桌面双击打开hsr-scanner程序，如果在桌面找不到hsr-scanner，可以在安装目录中找。</li>
                    <li>
                        在看到这个界面时，说明程序以及成功安装，并开始下载相关依赖了，由于程序使用的是tauri加fastapi，因此需要下载依赖，取决与你的网络速度，可能在这个界面等待5-30分钟。
                        <Image src={"/images/hsr-scanner-requirement-install.png"} alt={"依赖安装"} height={600}
                               width={600}/>
                    </li>
                    <li>
                        在依赖安装完成后，会自动进入主界面，上一步依赖安装只会在首次打开的时候运行很久，之后将会很快完成依赖检查。
                        <Image src={"/images/hsr-scanner-main.png"} alt={"主界面"} height={600} width={600}/>
                    </li>
                </ol>
                <h2>如何导入模板</h2>
                <p>在主界面点击选择模板按钮，点击导入模板，此时你会看到请输入模板代码以导入模板的提示，如果你并没有看到这个文字，说明你可能使用的是旧版，请下载最新版本。</p>
                <p>在网站侧边栏的HSR
                    Scanner模板配置工具中的工具，模板列表中可以找到一些常用的模板，点击复制，并在模板代码输入框中导入代码即可。</p>
                <p>
                    在成功导入后你会看到这个界面，点击启动即可启用选择的模板，此时软件会用模板中的配置对遗器进行评分。
                    <Image src={"/images/template-modal.png"} alt={"模板导入"} height={600} width={600}/>
                </p>
                <h2>如何查看模板或对模板进行更改</h2>
                <p>
                    在软件顶部，你可以看到模板管理按钮，点击该按钮，并点击你想要查看的模板，就可以看到模板的详细信息了。
                </p>
                <p>
                    在模板的详细页面，你可以选择对不同角色需要的主属性，副属性，以及副属性评分占比进行修改。在修改完成后，记得点击保存按钮。
                </p>
                <p>
                    你也可以下拉到模板详细页的最下面，添加新的评分规则，点击+按钮即可，首先选择角色和遗物套装，头部和手部主属性默认是未选择状态，如果需要考虑这些属性需要点击+按钮。
                </p>
                <p>
                    在配置完全部主属性和副属性以及副属性评分占比后，点击保存即可。
                </p>
                <p>当然，也可以创建新的模板，在模板管理主页面点击+按钮,在弹出的对话框中输入所需要的内容，然后点击进入你新创建的模板，添加规则。</p>
                <p>
                    在创建完模板后，你也可以点击导出，将模板导出为模板代码。然后上传到网站上让更多的人可以使用你创建的模板。
                </p>
                <h2>如何使用</h2>
                <p>
                    在软件的扫描器界面，你可以看到很多按钮，下面会对这些按钮做大概的介绍。
                </p>
                <ol>
                    <li>窗口指定：将窗口置顶到所以应用的前端</li>
                    <li>小窗模式：将窗口缩小到一个预定的小窗大小，并只保留一些必要的按钮和功能</li>
                    <li>手动扫描：通常配合窗口置顶使用，手动点击遗器，进行扫描</li>
                    <li>自动扫描：自动扫描背包里的遗器，并且根据设置里的评分，自动点击弃置按钮。</li>
                    <li>全部日志：查看后端全部的log等级日志，可以用于调试</li>
                    <li>跟随底部：将日志移动到底部并保持跟随</li>
                </ol>
                <h3>手动扫描</h3>
                <p>在手动扫描模式下，扫描器会适配更多的游戏界面，你可以在遗器背包界面，或遗器弃置界面使用。</p>
                <p>在使用前，请将<strong>游戏语言切换为英语</strong>, 尽量保证游戏的背景为<strong>暗色背景</strong>，尽量使用高分辨率和全屏的游戏设置，并打开遗器背包界面或者遗器弃置界面。
                </p>
                <p>手动选择你需要扫描的遗器，即可显示评分。</p>
                <h3>自动扫描</h3>
                <p>在自动扫描模式下，扫描器只支持遗器背包界面，需要保证和手动扫描一样的设置，英语，暗色背景，高分辨率和全屏。</p>
                <p>打开背包界面，选择你需要开始的遗器，并点击该遗器，然后点击软件里的自动扫描按钮即可。</p>
                <p>如果需要停止扫描，可以将游戏切到后台，然后再次点击自动扫描即可。</p>
                <h2>常见设置</h2>
                <p>在设置界面里有一些可能会用到的设置以及软件的更新，通常不需要更改，但是在模型识别极差的情况下，可以尝试手动调节</p>
            </article>
        </div>
    );
};

export default InstructionPage;