const {
  BannerPlugin, UglifyJSPlugin,
    FuseBox, SVGPlugin, CSSPlugin, SassPlugin,
    TypeScriptHelpers, BabelPlugin, JSONPlugin, HTMLPlugin,
    EnvPlugin, ReplacePlugin, UglifyESPlugin,
} = require("fuse-box");


// Create FuseBox Instance
let fuse = new FuseBox({
    // 入口文件路径
    homeDir: "src/",
    sourcemaps: true,
    sourceMap: {
        bundleReference: 'app.js.map',
        outFile: './dist/app.js.map'
    },
    // 默认情况下，缓存处于开启状态。FuseBox将.fusebox在您的项目路径中创建一个文件夹，并存储相关文件。
    cache: true,
    // 您可以将您的包变量公开window（在浏览器中）或exports（在Node中）。
    package: {
        name: 'myLibrary',
        main: 'index.js'
    },
    globals: {
        myLibrary: 'myLibrary'
    },
    //typescript配置文件
    tsConfig: path.join(projectRoot, 'tsconfig.json'),
    // 输出文件
    outFile: "./build/out.js",
    // 启用的日志和调试功能，它们会降低性能。
    log: true,
    debug: true,
    // 你可能想要一天测试一个包，或者只是在你的代码之上有一个抽象。为此，您可以使用modulesFolder属性。它的行为与另一个npm模块完全一样，就在自定义文件夹中。
    modulesFolder: "src/modules",
    // 插件
    plugins: [
        // 创建全局变量，只能在后面的plugins js 里面使用，所以需要提到前面执行 console.log(process.env.NODE_ENV)
        EnvPlugin({ NODE_ENV: "production" }),
        // 替换变量
        ReplacePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
        // 使用UglifyJS2压缩 JavaScript代码
        UglifyJSPlugin(options),
        // 在包的顶部添加带有静态文本的注释
        BannerPlugin('// Hey this is my banner! Copyright 2016!'),
        // SVG插件 允许将svg图形文件导入到javascript源中，用于样式和图像源。
        SVGPlugin(),
        // CSS 插件 CSSPlugin用于处理.css语法。
        CSSPlugin(),
        // CSS 插件 SassPlugin用于处理.css语法。
        [
            SassPlugin({ outputStyle: 'compressed' }),
            // [SassPlugin({ /* options */ }), CSSPlugin()],
            // @import '$homeDir/test2.scss';
            // @import '$appRoot/src/test.scss';
            // [ SassPlugin({ macros: { "$homeDir": "custom/dir/" }}), CSSPlugin() ]
            CSSPlugin({})
        ],
        // 该插件将需要的typescript函数添加到包中。
        TypeScriptHelpers(),
        // Babel插件 用于将代码转换成浏览器可识别的javascript
        BabelPlugin(),
        // JSON插件 允许将.json文件导入为JavaScript对象
        JSONPlugin(),
        // 切换useDefault使HTML文件将字符串导出为default属性。例如，useDefault: true您将能够导入如下所示的HTML文件：
        HTMLPlugin({ useDefault: false })
    ]
});

fuse.devServer(">index.jsx", {
    // 在此配置中port: 8080对应于套接字服务器端口，httpServer: false使其仅在socket模式下工作。一旦你页面加载，FuseBox API将尝试连接到:8080端口开始听事件。
    port: 4446,
    httpServer: false,
    // 热启
    hmr: false,
});
