module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-paper/babel'],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@constants": "./src/constants",
            "@hooks": "./src/hooks",
            "@assets": "./src/assets",
            "@context": "./src/context",
            "@services": "./src/services"
          },
        },
      ],
    ],
  };
};
