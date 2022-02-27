const fs = require("fs-extra");
const chokidar = require("chokidar");
const { build } = require("esbuild");

const generateBuild = async () => {
  // await fs.rm("./build/static", { recursive: true });

  await build({
    entryPoints: ["./src/index.jsx"],
    outdir: "./build/static/js",
    minify: true,
    bundle: true,
    sourcemap: true,
    target: ["chrome58", "firefox57", "edge16"],
    // loader: { ".svg": "dataurl", ".png": "dataurl" },
    define: {
      "process.env.NODE_ENV": "'production'",
    },
  }).catch(() => process.exit(1));

  // await fs.move(
  //   "./build/static/js/index.css",
  //   "./build/static/css/index.css",
  //   (err) => {
  //     if (err) return console.error(err);
  //     console.log("success!");
  //     return null;
  //   }
  // );
};

chokidar
  .watch(".", { ignored: /build|node_modules|.git/ })
  .on("all", (event, path) => {
    console.log(event, path);
    generateBuild();
  });
