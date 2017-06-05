const {
  BannerPlugin, UglifyJSPlugin,
  FuseBox, SVGPlugin, CSSPlugin, SassPlugin,
  TypeScriptHelpers, BabelPlugin, JSONPlugin, HTMLPlugin,
  EnvPlugin, ReplacePlugin, UglifyESPlugin,
} = require("fuse-box");

const fuseBox = FuseBox.init({
  hash: true,
  homeDir: 'src/',
  sourceMaps: true,
  outFile: './dist/app.js',
  tsConfig : './tsconfig.json',
  plugins: [
    EnvPlugin({ NODE_ENV: "magic" }),
    ReplacePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
    [
      SassPlugin({ outputStyle: 'compressed' }),
      CSSPlugin({})
    ],
    UglifyJSPlugin(),
    UglifyESPlugin(),
    TypeScriptHelpers(),
    JSONPlugin(),
    HTMLPlugin({ useDefault: false }),
  ]
});

fuseBox.devServer('>app.ts', {
  port: 4446,
  httpServer: false,
  hmr: false,
});
