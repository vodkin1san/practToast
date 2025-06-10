import type { StorybookConfig } from '@storybook/react-webpack5';

// .storybook/main.js

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-docs', // Важно для документации
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  // --- ВОТ ТУТ ГЛАВНОЕ ИЗМЕНЕНИЕ ---
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader', // Добавляет CSS в DOM как <style> теги
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]', // Настройка для CSS Modules
            },
          },
        },
        'sass-loader', // Компилирует SCSS в CSS
      ],
      include: require('path').resolve(__dirname, '../src'), // Важно: указываем где искать .scss
    });

    // Если у тебя уже есть правило для CSS, убедись, что оно не конфликтует
    // или что оно тоже настроено на modules
    // Если ты используешь Create React App, то его CSS-лоадеры уже есть,
    // и тебе нужно убедиться, что они работают с модулями или добавить новое правило
    // для .module.scss и .scss

    return config;
  },
  // --- КОНЕЦ ИЗМЕНЕНИЯ ---
};
export default config;
