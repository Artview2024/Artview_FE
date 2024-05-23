// const {getDefaultConfig, mergeConfig} = require('metro-config');

// module.exports = (async () => {
//   const defaultConfig = await getDefaultConfig(__dirname);
//   const {
//     resolver: {sourceExts, assetExts},
//   } = defaultConfig;

//   // react-native-svg-transformer 설정
//   const svgTransformerConfig = {
//     transformer: {
//       babelTransformerPath: require.resolve('react-native-svg-transformer'),
//     },
//     resolver: {
//       assetExts: assetExts.filter(ext => ext !== 'svg'),
//       sourceExts: [...sourceExts, 'svg'],
//     },
//   };

// 기존 설정과 react-native-svg-transformer 설정 병합
//   return mergeConfig(defaultConfig, svgTransformerConfig);
// })();

// const { getDefaultConfig } = require("metro-config");

// module.exports = (async () => {
//   const {
//     resolver: { sourceExts, assetExts }
//   } = await getDefaultConfig();
//   return {
//     transformer: {
//       babelTransformerPath: require.resolve("react-native-svg-transformer")
//     },
//     resolver: {
//       assetExts: assetExts.filter(ext => ext !== "svg"),
//       sourceExts: [...sourceExts, "svg"]
//     }
//   };
// })();

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
