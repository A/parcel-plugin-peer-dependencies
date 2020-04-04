const readPkg = require('read-pkg-up');
const resolve = require('resolve-from');

const EXTENSION = 'external';

module.exports = function(bundler) {
  const { rootDir } = bundler.options;
  const { packageJson: pkg } = readPkg.sync(rootDir);
  const { peerDependencies } = pkg;
  if (!peerDependencies) return;

  // Add handlers for external asset types
  bundler.addAssetType(EXTENSION, require.resolve("./ExternalAsset"));
  bundler.addPackager(EXTENSION, require.resolve("./ExternalPackager"));

  console.log('Peer Dependencies detected:', peerDependencies);
  const names = Object.keys(peerDependencies);
  const modules = names.reduce((acc, name) => {
    // I believe all packages in monorepo should be on the same level
    const p = resolve(rootDir, name);
    acc[p] = name;
    return acc;
  }, {});

  // Monkeypatch asset loader to process external files
  const superResolver = bundler.__proto__.getLoadedAsset;
  bundler.__proto__.getLoadedAsset = function(p) {
    p = modules[p]
      ? `./${modules[p]}.${EXTENSION}`
      : p;
    return superResolver.call(this, p);
  };
};
