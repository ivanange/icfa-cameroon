import { series, parallel, src, dest } from "gulp";
import algoliasearch from 'algoliasearch';
import config from "./config";

const rm = require("rimraf");
const imagemin = require("gulp-imagemin");
// const _ = require("lodash");
const fs = require("fs");
const glob = require("glob");
const webpack = require("webpack");
const prod = require("./webpack.prod");
const exec = require("child_process").exec;

const ASSETS_DIR: string = `./src/assets`;
const DIST: string = `./docs`;
const ENTRIES: Array<{
  [index: string]: string[];
}> = require("./deps").default;

/**
 * delete dist directory
 *
 * @param cb
 */
function clean(cb: () => void) {
  rm(DIST, cb);
}

/**
 * bundle npm + tailwind assets
 *
 * @param cb
 */

function bundle(cb: () => void) {
  // exec("npm run build:scripts", cb);

  let compiler = webpack(
    ENTRIES.map((entry) => {
      let config = prod(entry);
      // console.log(config);
      return config;
    })
    // prod(ENTRIES[0])
  );

  compiler.run((err, stats) => {
    // console.log(stats.toJson("verbose"));
    cb();
  });

  // compiler.run(cb);
}

/**
 * Update bundle.json with new file names
 *
 * @param cb
 */

function UpdateBundleInfo(cb: () => void) {
  glob(`${DIST}/assets/bundles/**/*.@(js|css)`, { nodir: true }, function (
    err,
    files
  ) {
    let bundle = files.reduce(
      (acc, file: string) => {
        if (file.match("/css/")) {
          // css file
          let radical = getRadical(file);
          acc.css[radical] = file.replace("./dist", "");
        } else {
          // js file
          let radical = getRadical(file);
          acc.js[radical] = file.replace("./dist", "");
        }
        return acc;
      },
      {
        css: {},
        js: {},
      }
    );

    fs.writeFile("./src/_data/bundle.json", JSON.stringify(bundle), cb);
  });
}

/**
 * Optimize images
 *
 * @param cb
 */
function optimizeImages() {
  return src("src/assets/img/**")
    .pipe(imagemin())
    .pipe(dest("dist/assets/img/"));
}

/**
 * Generate site
 *
 * @param cb
 */
function buildSite(cb: () => void) {
  exec("npm run build:11ty", cb);
}

/**
 * Upload site index
 *
 * @param cb
 */
function pushSearchIndex(cb: () => void) {
  const client = algoliasearch(config.algolia.id, config.algolia.admin_key);
  const index = client.initIndex('articles');
  const articles = require(`${DIST}/articles.json`);

  index.saveObjects(articles, {
    autoGenerateObjectIDIfNotExist: true
  }).then(({ objectIDs }) => {
    // console.log(objectIDs);
    cb();
  }).catch((error) => {
    // throw "Something went wrong when saving index";
    onError(error, cb);
  });
}


/**
 * Run tests
 *
 * @param cb
 */
function test(cb: () => void) {
  cb();
}

/**
 * Run all finishing stuff
 *
 * @param cb
 */
function deploy(cb: () => void) {
  // delete public dir
  rm(`public`, function () {
    // rename dist to public
    fs.rename(DIST, "public", cb);
  });
}

function getRadical(file: string): string {
  return file.replace(/.+\/([^\/\\\.]+)\..+$/g, "$1");
}

function onError(error, cb) {
  // log error
  console.log(error);
  fs.writeFile("./log", JSON.stringify(error), function (err) {
    //restore dist.old to dist
    // fs.rename(`${DIST}.old`, DIST, cb);
  });
}

exports.default = series(
  clean,
  parallel(
    series(
      buildSite,
      // pushSearchIndex,
    ),
    bundle,
    optimizeImages
  ),
  test,
  // deploy
);

// exports.default = series(
//   clean,
//   parallel(
//     series(
//       bundle,
//       UpdateBundleInfo,
//       buildSite,
//       pushSearchIndex,
//       test
//     ),
//     optimizeImages
//   ),
//   deploy
// );
