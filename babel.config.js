module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset", // Vue CLI 默认预设
    '@babel/preset-env',            // 适用于 JavaScript
    '@babel/preset-typescript',     // 如果你使用 TypeScript，保留这个
  ],
  plugins: [
    '@babel/plugin-transform-class-static-block',
  ],
};
