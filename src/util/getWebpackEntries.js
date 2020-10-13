const path = require("path");

/**
 * Turns our bundle config into a webpack entries configuration object
 *
 * @param {string} src Source directory
 * @param {string} path Folder name within src and dest directory
 * @param {object} bundles Bundles to create
 * @returns {{}} Webpack entries object
 */
function getWebpackEntries(src, folderName, bundles) {
  return Object.keys(bundles).reduce((acc, bundleName) => {
    const bundleFiles = bundles[bundleName];

    /**
     * If the bundle files were given as an array, resolve all of them to a
     * relative path
     */
    if (Array.isArray(bundleFiles)) {
      acc[bundleName] = bundles[bundleName].map(fileName => {
        return path.resolve(process.cwd(), src, folderName, fileName);
      });
    } else {
      acc[bundleName] = path.resolve(process.cwd(), src, folderName, bundleFiles);
    }

    return acc;
  }, {});
}

module.exports = getWebpackEntries;
