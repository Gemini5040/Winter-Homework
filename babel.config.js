module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset", // Vue CLI Ĭ��Ԥ��
    '@babel/preset-env',            // ������ JavaScript
    '@babel/preset-typescript',     // �����ʹ�� TypeScript���������
  ],
  plugins: [
    '@babel/plugin-transform-class-static-block',
  ],
};
