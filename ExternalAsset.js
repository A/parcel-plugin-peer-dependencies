const { Asset } = require("parcel-bundler");
const { createHash } = require("crypto");
const resolve = require('resolve-from');
const path = require('path');

function computeMd5(content) {
  return createHash("md5")
    .update(content || "")
    .digest("hex");
}

class ExternalAsset extends Asset {
  constructor(p, options) {
    super(p, options);
    const { rootDir } = options;
    const name = p
      .replace(/^\.\//, '')
      .replace(/\.external/, '');

    const require = path.relative(rootDir, resolve(rootDir, name));

    this.content = `module.exports=require('${require}')`
  }

  load() {}

  generate() {
    return {
      js: this.content
    };
  }

  generateHash() {
    return Promise.resolve(computeMd5(this.content));
  }
}

module.exports = ExternalAsset;
